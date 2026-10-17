// Doctor online-appointment schedule: editor state <-> API `schedule`, plus validation

// Website order Mon → Sun; values are JS weekday numbers (0 = Sunday)
export const WEEKDAYS = [
  { day: 1, label: 'Monday' },
  { day: 2, label: 'Tuesday' },
  { day: 3, label: 'Wednesday' },
  { day: 4, label: 'Thursday' },
  { day: 5, label: 'Friday' },
  { day: 6, label: 'Saturday' },
  { day: 0, label: 'Sunday' },
]

export const toMinutes = (hhmm) => (/^\d{2}:\d{2}$/.test(hhmm) ? Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3)) : NaN)

export const EMPTY_SCHEDULE = {
  slotMinutes: '15',
  capacity: '1',
  bookingWindowDays: '30',
  minNoticeMinutes: '60',
  // { [weekday]: [{ start, end }] }
  days: Object.fromEntries(WEEKDAYS.map(({ day }) => [day, []])),
}

// API `schedule` -> editor state
export function scheduleToForm(schedule = {}) {
  const days = Object.fromEntries(WEEKDAYS.map(({ day }) => [day, []]))
  for (const r of schedule.weekly || []) days[r.day]?.push({ start: r.start, end: r.end })
  for (const list of Object.values(days)) list.sort((a, b) => toMinutes(a.start) - toMinutes(b.start))
  const str = (v, fallback) => String(v ?? fallback)
  return {
    slotMinutes: str(schedule.slotMinutes, 15),
    capacity: str(schedule.capacity, 1),
    bookingWindowDays: str(schedule.bookingWindowDays, 30),
    minNoticeMinutes: str(schedule.minNoticeMinutes, 60),
    days,
  }
}

// Editor state -> API `schedule`
export function scheduleToPayload(form) {
  return {
    slotMinutes: Number(form.slotMinutes),
    capacity: Number(form.capacity),
    bookingWindowDays: Number(form.bookingWindowDays),
    minNoticeMinutes: Number(form.minNoticeMinutes),
    weekly: WEEKDAYS.flatMap(({ day }) => form.days[day].map((r) => ({ day, start: r.start, end: r.end }))),
  }
}

const NUMBER_RULES = [
  ['slotMinutes', 'Slot length', 5, 120],
  ['capacity', 'Patients per slot', 1, 20],
  ['bookingWindowDays', 'Booking window', 1, 180],
  ['minNoticeMinutes', 'Minimum notice', 0, 10080],
]

// Returns { 'schedule.<field>' | 'schedule.day.<n>': message }
export function validateSchedule(form) {
  const errors = {}
  for (const [key, label, min, max] of NUMBER_RULES) {
    const n = Number(form[key])
    if (form[key] === '' || !Number.isInteger(n) || n < min || n > max) errors[`schedule.${key}`] = `${label}: enter ${min}–${max}`
  }
  for (const { day } of WEEKDAYS) {
    const ranges = form.days[day]
    const sorted = [...ranges].sort((a, b) => toMinutes(a.start) - toMinutes(b.start))
    for (const [i, r] of sorted.entries()) {
      const start = toMinutes(r.start)
      const end = toMinutes(r.end)
      if (Number.isNaN(start) || Number.isNaN(end)) errors[`schedule.day.${day}`] = 'Enter both a start and an end time'
      else if (start >= end) errors[`schedule.day.${day}`] = 'End time must be after the start time'
      else if (i > 0 && start < toMinutes(sorted[i - 1].end)) errors[`schedule.day.${day}`] = 'Time ranges overlap'
    }
  }
  return errors
}

export function slotsInDay(ranges, slotMinutes) {
  const step = Number(slotMinutes)
  if (!step) return 0
  return ranges.reduce((total, r) => {
    const span = toMinutes(r.end) - toMinutes(r.start)
    return total + (span > 0 ? Math.floor(span / step) : 0)
  }, 0)
}

// Comparable form of an API schedule (defaults filled in, ranges sorted) — mirrors the server's check
// for whether a doctor still matches their slot plan
function normalizeSchedule(s = {}) {
  return {
    slotMinutes: Number(s.slotMinutes ?? 15),
    capacity: Number(s.capacity ?? 1),
    bookingWindowDays: Number(s.bookingWindowDays ?? 30),
    minNoticeMinutes: Number(s.minNoticeMinutes ?? 60),
    weekly: [...(s.weekly || [])]
      .map((r) => ({ day: Number(r.day), start: r.start, end: r.end }))
      .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start)),
  }
}

export const sameSchedule = (a, b) => JSON.stringify(normalizeSchedule(a)) === JSON.stringify(normalizeSchedule(b))

const SHORT_DAY = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }

// API schedule -> "Mon–Sat 10:00–16:00 · 15 min · 1 per slot" (days with the same hours are grouped)
export function describeSchedule(schedule) {
  const weekly = schedule?.weekly || []
  if (!weekly.length) return 'No online hours'
  const hoursFor = (day) =>
    weekly
      .filter((r) => r.day === day)
      .sort((a, b) => a.start.localeCompare(b.start))
      .map((r) => `${r.start}–${r.end}`)
      .join(', ')

  // Days with identical hours share one entry, in Mon → Sun order
  const groups = new Map()
  for (const { day } of WEEKDAYS) {
    const hours = hoursFor(day)
    if (hours) groups.set(hours, [...(groups.get(hours) || []), day])
  }

  // [1,2,3,5] -> "Mon–Wed, Fri" (positions in Mon → Sun order, so Sat–Sun also joins up)
  const order = WEEKDAYS.map((w) => w.day)
  const dayList = (list) => {
    const runs = []
    for (const day of list) {
      const last = runs[runs.length - 1]
      if (last && order.indexOf(day) === order.indexOf(last.to) + 1) last.to = day
      else runs.push({ from: day, to: day })
    }
    return runs
      .map((r) =>
        r.from === r.to
          ? SHORT_DAY[r.from]
          : order.indexOf(r.to) - order.indexOf(r.from) === 1
            ? `${SHORT_DAY[r.from]}, ${SHORT_DAY[r.to]}`
            : `${SHORT_DAY[r.from]}–${SHORT_DAY[r.to]}`,
      )
      .join(', ')
  }

  const days = [...groups.entries()].map(([hours, list]) => `${dayList(list)} ${hours}`).join('; ')
  const capacity = schedule.capacity || 1
  return `${days} · ${schedule.slotMinutes || 15} min · ${capacity} per slot`
}
