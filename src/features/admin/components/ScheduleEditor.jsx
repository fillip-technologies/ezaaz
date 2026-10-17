import { Copy, Plus, Trash2 } from 'lucide-react'
import { Button, Field } from './ui'
import { WEEKDAYS, slotsInDay } from '../scheduleOptions'

const timeInputClass =
  'w-28 rounded-lg border border-slate-300 px-2.5 py-2 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40'

/**
 * Weekly OPD hours + slot settings that the website turns into bookable time slots.
 * `value` is the editor state (see EMPTY_SCHEDULE); `onChange(next)`; `errors` from validateSchedule / the server.
 */
export default function ScheduleEditor({ value, onChange, errors = {} }) {
  const set = (key, v) => onChange({ ...value, [key]: v })
  const setDay = (day, ranges) => onChange({ ...value, days: { ...value.days, [day]: ranges } })

  const updateRange = (day, index, field, v) =>
    setDay(day, value.days[day].map((r, i) => (i === index ? { ...r, [field]: v } : r)))

  // A new block starts where the previous one ended (or 10:00 on an empty day)
  const addRange = (day) => {
    const list = value.days[day]
    const last = list[list.length - 1]
    setDay(day, [...list, last ? { start: last.end, end: '' } : { start: '10:00', end: '14:00' }])
  }

  const copyMondayToWeekdays = () => {
    const monday = value.days[1].map((r) => ({ ...r }))
    const days = { ...value.days }
    for (const d of [2, 3, 4, 5, 6]) days[d] = monday.map((r) => ({ ...r }))
    onChange({ ...value, days })
  }

  const totalRanges = WEEKDAYS.reduce((n, { day }) => n + value.days[day].length, 0)
  const capacity = Number(value.capacity) || 1

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field
          label="Slot length (minutes)"
          type="number"
          min="5"
          max="120"
          step="5"
          value={value.slotMinutes}
          onChange={(e) => set('slotMinutes', e.target.value)}
          error={errors['schedule.slotMinutes']}
          hint="Time per appointment"
        />
        <Field
          label="Patients per slot"
          type="number"
          min="1"
          max="20"
          value={value.capacity}
          onChange={(e) => set('capacity', e.target.value)}
          error={errors['schedule.capacity']}
          hint="1 = one patient per time"
        />
        <Field
          label="Booking window (days)"
          type="number"
          min="1"
          max="180"
          value={value.bookingWindowDays}
          onChange={(e) => set('bookingWindowDays', e.target.value)}
          error={errors['schedule.bookingWindowDays']}
          hint="How far ahead patients can book"
        />
        <Field
          label="Minimum notice (minutes)"
          type="number"
          min="0"
          max="10080"
          step="15"
          value={value.minNoticeMinutes}
          onChange={(e) => set('minNoticeMinutes', e.target.value)}
          error={errors['schedule.minNoticeMinutes']}
          hint="Latest a slot can be booked before it starts"
        />
      </div>

      <div className="rounded-lg border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
          <p className="text-sm font-medium text-slate-700">Weekly OPD hours</p>
          <Button variant="ghost" size="sm" onClick={copyMondayToWeekdays} disabled={value.days[1].length === 0}>
            <Copy className="h-4 w-4" aria-hidden="true" /> Copy Monday to Tue–Sat
          </Button>
        </div>
        <ul className="divide-y divide-slate-100">
          {WEEKDAYS.map(({ day, label }) => {
            const ranges = value.days[day]
            const slots = slotsInDay(ranges, value.slotMinutes)
            const error = errors[`schedule.day.${day}`]
            return (
              <li key={day} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-start">
                <div className="w-32 shrink-0 pt-2">
                  <p className="text-sm font-semibold text-slate-900">{label}</p>
                  <p className="text-xs text-slate-500">
                    {ranges.length === 0 ? 'Closed' : `${slots} slot${slots === 1 ? '' : 's'}${capacity > 1 ? ` × ${capacity}` : ''}`}
                  </p>
                </div>
                <div className="flex-1 space-y-2">
                  {ranges.map((r, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-2">
                      <input
                        type="time"
                        step="300"
                        aria-label={`${label} block ${i + 1} start`}
                        value={r.start}
                        onChange={(e) => updateRange(day, i, 'start', e.target.value)}
                        className={timeInputClass}
                      />
                      <span className="text-sm text-slate-400">to</span>
                      <input
                        type="time"
                        step="300"
                        aria-label={`${label} block ${i + 1} end`}
                        value={r.end}
                        onChange={(e) => updateRange(day, i, 'end', e.target.value)}
                        className={timeInputClass}
                      />
                      <Button
                        variant="dangerGhost"
                        size="icon"
                        onClick={() => setDay(day, ranges.filter((_, j) => j !== i))}
                        aria-label={`Remove ${label} block ${i + 1}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {error && <p className="text-xs text-red-600">{error}</p>}
                  <Button variant="ghost" size="sm" onClick={() => addRange(day)}>
                    <Plus className="h-4 w-4" aria-hidden="true" /> {ranges.length ? 'Add another block' : 'Add hours'}
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {errors['schedule.weekly'] && <p className="text-sm text-red-600">{errors['schedule.weekly']}</p>}
      {totalRanges === 0 && (
        <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          No hours set: patients can't book this doctor online. The booking page will ask them to call instead.
        </p>
      )}
    </div>
  )
}
