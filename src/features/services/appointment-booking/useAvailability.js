import { useCallback, useEffect, useState } from 'react'
import { appointmentsApi } from '../../../api'

// '14:30' -> '2:30 PM'
export function formatSlotTime(time) {
  const [h, m] = time.split(':').map(Number)
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

// 'YYYY-MM-DD' -> parts for the date strip / summary (dates are clinic-local, so format in UTC)
export function formatSlotDate(date, isHindi, options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!date) return ''
  return new Intl.DateTimeFormat(isHindi ? 'hi-IN' : 'en-IN', { ...options, timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
}

// Morning < 12:00 ≤ Afternoon < 16:00 ≤ Evening
export function groupSlots(slots) {
  const groups = [
    { key: 'morning', en: 'Morning', hi: 'सुबह', slots: [] },
    { key: 'afternoon', en: 'Afternoon', hi: 'दोपहर', slots: [] },
    { key: 'evening', en: 'Evening', hi: 'शाम', slots: [] },
  ]
  for (const slot of slots) {
    const hour = Number(slot.time.slice(0, 2))
    groups[hour < 12 ? 0 : hour < 16 ? 1 : 2].slots.push(slot)
  }
  return groups.filter((g) => g.slots.length)
}

/**
 * Live availability for one doctor (slug): the date strip and the selected day's slots.
 * Returns { bookable, capacity, days, date, setDate, slots, loadingDays, loadingSlots, error, refresh }
 */
export function useAvailability(doctorSlug) {
  const [daysState, setDaysState] = useState({ slug: null, bookable: true, capacity: 1, days: [], error: '' })
  const [date, setDate] = useState('')
  const [slotsState, setSlotsState] = useState({ key: '', slots: [], error: '' })
  const [version, setVersion] = useState(0)

  // Days for the doctor; picks the first day with a free slot
  useEffect(() => {
    if (!doctorSlug) return
    let cancelled = false
    appointmentsApi
      .days(doctorSlug)
      .then((data) => {
        if (cancelled) return
        setDaysState({ slug: doctorSlug, bookable: data.bookable, capacity: data.capacity || 1, days: data.days, error: '' })
        setDate((current) => {
          const stillOpen = data.days.find((d) => d.date === current && d.status === 'available')
          return stillOpen ? current : data.days.find((d) => d.status === 'available')?.date || ''
        })
      })
      .catch((err) => !cancelled && setDaysState({ slug: doctorSlug, bookable: true, capacity: 1, days: [], error: err.message }))
    return () => {
      cancelled = true
    }
  }, [doctorSlug, version])

  // Slots for the selected day
  useEffect(() => {
    if (!doctorSlug || !date) return
    let cancelled = false
    const key = `${doctorSlug}|${date}|${version}`
    appointmentsApi
      .slots(doctorSlug, date)
      .then((data) => !cancelled && setSlotsState({ key, slots: data.slots, error: '' }))
      .catch((err) => !cancelled && setSlotsState({ key, slots: [], error: err.message }))
    return () => {
      cancelled = true
    }
  }, [doctorSlug, date, version])

  const refresh = useCallback(() => setVersion((v) => v + 1), [])

  const daysReady = daysState.slug === doctorSlug
  const slotsReady = slotsState.key === `${doctorSlug}|${date}|${version}`
  return {
    bookable: daysReady ? daysState.bookable : true,
    capacity: daysState.capacity,
    days: daysReady ? daysState.days : [],
    date: daysReady ? date : '',
    setDate,
    slots: slotsReady && date ? slotsState.slots : [],
    loadingDays: Boolean(doctorSlug) && !daysReady,
    loadingSlots: Boolean(date) && daysReady && !slotsReady,
    error: (daysReady && daysState.error) || (slotsReady && slotsState.error) || '',
    refresh,
  }
}
