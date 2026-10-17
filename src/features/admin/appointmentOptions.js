// Appointment statuses, clinic-local dates and filter presets for the admin panel
export { formatSlotTime as formatTime } from '../services/appointment-booking/useAvailability'

export const APPOINTMENT_STATUS = {
  requested: { label: 'Requested', className: 'bg-amber-100 text-amber-800' },
  confirmed: { label: 'Confirmed', className: 'bg-emerald-100 text-emerald-800' },
  completed: { label: 'Completed', className: 'bg-sky-100 text-sky-800' },
  cancelled: { label: 'Cancelled', className: 'bg-slate-100 text-slate-600' },
  no_show: { label: 'No-show', className: 'bg-red-100 text-red-700' },
}

// Tabs: Cancelled and No-show share one
export const STATUS_TABS = [
  { key: 'requested', label: 'Requested', statuses: ['requested'] },
  { key: 'confirmed', label: 'Confirmed', statuses: ['confirmed'] },
  { key: 'completed', label: 'Completed', statuses: ['completed'] },
  { key: 'cancelled', label: 'Cancelled / No-show', statuses: ['cancelled', 'no_show'] },
  { key: 'all', label: 'All', statuses: null },
]

// Today's date at the hospital (IST), as YYYY-MM-DD
export function clinicToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
}

export function addDays(date, n) {
  const d = new Date(`${date}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

export function formatDay(date, options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-IN', { ...options, timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
}

// Date range presets -> { from, to } (empty = open-ended)
export const RANGE_PRESETS = [
  { key: 'upcoming', label: 'Upcoming', range: (today) => ({ from: today, to: '' }) },
  { key: 'today', label: 'Today', range: (today) => ({ from: today, to: today }) },
  { key: 'tomorrow', label: 'Tomorrow', range: (today) => ({ from: addDays(today, 1), to: addDays(today, 1) }) },
  { key: 'week', label: 'Next 7 days', range: (today) => ({ from: today, to: addDays(today, 6) }) },
  { key: 'past', label: 'Past 30 days', range: (today) => ({ from: addDays(today, -30), to: addDays(today, -1) }) },
  { key: 'custom', label: 'Custom dates', range: null },
]
