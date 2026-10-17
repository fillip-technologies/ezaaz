import { useEffect, useState } from 'react'
import { CalendarClock } from 'lucide-react'
import { adminAppointmentsApi } from '../../../api'
import { Alert, Button, Field, Spinner } from './ui'
import { clinicToday, formatTime } from '../appointmentOptions'

const STATUS_TEXT = {
  closed: "The doctor has no OPD hours on this day (or it's in the past).",
  leave: 'The doctor is on leave (or it is a hospital holiday) on this day.',
  full: 'Every slot on this day is booked.',
}

// Pick a doctor, date and free slot, then move the appointment there.
// Uses the admin slot rules: any future date, no minimum-notice limit. The booking's own seat counts as free.
export default function RescheduleForm({ appointment, doctors, onDone, onCancel }) {
  const [doctor, setDoctor] = useState(String(appointment.doctor))
  const [date, setDate] = useState(appointment.date >= clinicToday() ? appointment.date : clinicToday())
  const [time, setTime] = useState('')
  const [result, setResult] = useState({ key: '', status: '', slots: [], error: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)

  const key = `${doctor}|${date}|${reload}`
  useEffect(() => {
    if (!doctor || !date) return
    let cancelled = false
    adminAppointmentsApi
      .slots(doctor, date, appointment._id)
      .then((data) => !cancelled && setResult({ key: `${doctor}|${date}|${reload}`, status: data.status, slots: data.slots, error: '' }))
      .catch((err) => !cancelled && setResult({ key: `${doctor}|${date}|${reload}`, status: '', slots: [], error: err.message }))
    return () => {
      cancelled = true
    }
  }, [doctor, date, reload, appointment._id])

  const loading = result.key !== key
  const isCurrent = (t) => doctor === String(appointment.doctor) && date === appointment.date && t === appointment.time

  const onSave = async () => {
    setSaving(true)
    setError('')
    try {
      onDone(await adminAppointmentsApi.reschedule(appointment._id, { doctor, date, time }))
    } catch (err) {
      setError(err.message)
      setTime('')
      setReload((n) => n + 1) // fresh slots after a conflict
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <Alert>{error}</Alert>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          as="select"
          label="Doctor"
          value={doctor}
          onChange={(e) => {
            setDoctor(e.target.value)
            setTime('')
          }}
        >
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name.en}
              {!d.isActive ? ' (hidden)' : ''}
            </option>
          ))}
        </Field>
        <Field
          label="Date"
          type="date"
          min={clinicToday()}
          value={date}
          onChange={(e) => {
            setDate(e.target.value)
            setTime('')
          }}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Time</p>
        {loading ? (
          <Spinner label="Loading slots…" />
        ) : result.error ? (
          <p className="text-sm text-red-600">{result.error}</p>
        ) : result.slots.length === 0 || result.status === 'full' ? (
          <p className="rounded-lg bg-slate-50 px-3.5 py-2.5 text-sm text-slate-600">{STATUS_TEXT[result.status] || STATUS_TEXT.closed}</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {result.slots.map((slot) => {
              const full = slot.remaining <= 0
              const selected = time === slot.time
              const current = isCurrent(slot.time)
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={full || current}
                  onClick={() => setTime(slot.time)}
                  aria-pressed={selected}
                  title={current ? 'Current time' : full ? 'Booked' : undefined}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    selected
                      ? 'bg-[#003a70] text-white'
                      : current
                        ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
                        : full
                          ? 'cursor-not-allowed bg-slate-50 text-slate-300 line-through'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {formatTime(slot.time)}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500">
        The old time becomes free for other patients.{appointment.email ? ' The patient gets an email with the new time.' : ''}
      </p>
      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={onCancel}>
          Back
        </Button>
        <Button loading={saving} disabled={!time} onClick={onSave}>
          <CalendarClock className="h-4 w-4" aria-hidden="true" /> Move appointment
        </Button>
      </div>
    </div>
  )
}
