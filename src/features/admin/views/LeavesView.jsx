import { useEffect, useState } from 'react'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { adminDoctorsApi, adminLeavesApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Field, Link, Spinner } from '../components/ui'
import { ADMIN_PATHS } from '../navigation'
import { clinicToday, formatDay, formatTime } from '../appointmentOptions'

const emptyDraft = () => ({ doctor: '', date: clinicToday(), wholeDay: true, from: '13:00', to: '15:00', reason: '' })

// Blocks appointment slots: a doctor's leave, or a hospital holiday for every doctor
export default function LeavesView({ path }) {
  const [leaves, setLeaves] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [draft, setDraft] = useState(emptyDraft)
  const [errors, setErrors] = useState({})
  const [adding, setAdding] = useState(false)
  const [busyId, setBusyId] = useState('')

  useEffect(() => {
    let cancelled = false
    Promise.all([adminLeavesApi.list(), adminDoctorsApi.list()])
      .then(([leaveList, doctorList]) => {
        if (cancelled) return
        setLeaves(leaveList)
        setDoctors(doctorList)
      })
      .catch((err) => !cancelled && setStatus({ type: 'error', message: err.message }))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  const set = (key, value) => {
    setDraft((d) => ({ ...d, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onAdd = async (e) => {
    e.preventDefault()
    if (!draft.wholeDay && draft.from >= draft.to) {
      setErrors({ to: 'End time must be after the start time' })
      return
    }
    setAdding(true)
    setStatus({ type: '', message: '' })
    try {
      const { leave, affectedBookings } = await adminLeavesApi.create({
        doctor: draft.doctor || null,
        date: draft.date,
        from: draft.wholeDay ? '' : draft.from,
        to: draft.wholeDay ? '' : draft.to,
        reason: draft.reason.trim(),
      })
      setLeaves((list) => [...list, leave].sort((a, b) => a.date.localeCompare(b.date) || a.from.localeCompare(b.from)))
      setDraft((d) => ({ ...emptyDraft(), doctor: d.doctor }))
      setStatus(
        affectedBookings
          ? {
              type: 'error',
              message: `Leave added. ${affectedBookings} existing appointment${affectedBookings === 1 ? ' falls' : 's fall'} in this time and still need to be rescheduled or cancelled in Appointments.`,
            }
          : { type: 'success', message: 'Leave added. Those slots are no longer offered on the website.' },
      )
    } catch (err) {
      if (err.details?.length) setErrors(Object.fromEntries(err.details.map((d) => [d.field, d.message])))
      setStatus({ type: 'error', message: err.message })
    } finally {
      setAdding(false)
    }
  }

  const onDelete = async (leave) => {
    if (!window.confirm('Remove this leave entry? Its slots become bookable again.')) return
    setBusyId(leave._id)
    try {
      await adminLeavesApi.remove(leave._id)
      setLeaves((list) => list.filter((l) => l._id !== leave._id))
      setStatus({ type: 'success', message: 'Leave removed. Those slots are bookable again.' })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setBusyId('')
    }
  }

  return (
    <AdminLayout
      path={path}
      title="Leave & holidays"
      actions={
        <Link
          to={ADMIN_PATHS.settings}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Settings</span>
        </Link>
      }
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <Alert type={status.type || 'error'}>{status.message}</Alert>

        <form onSubmit={onAdd} noValidate className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">Block dates</h2>
          <p className="mt-1 text-sm text-slate-500">
            Slots on these dates disappear from the Book Appointment page. Existing appointments aren't cancelled automatically.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field as="select" label="Who" value={draft.doctor} onChange={(e) => set('doctor', e.target.value)} error={errors.doctor}>
              <option value="">All doctors (hospital holiday)</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name.en}
                </option>
              ))}
            </Field>
            <Field label="Date" type="date" min={clinicToday()} value={draft.date} onChange={(e) => set('date', e.target.value)} error={errors.date} />
          </div>
          <div className="mt-4 flex flex-wrap items-end gap-4">
            <label className="flex items-center gap-2 pb-2.5 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={draft.wholeDay}
                onChange={(e) => set('wholeDay', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-[#003a70]"
              />
              Whole day
            </label>
            {!draft.wholeDay && (
              <>
                <Field label="From" type="time" step="300" value={draft.from} onChange={(e) => set('from', e.target.value)} error={errors.from} className="w-36" />
                <Field label="To" type="time" step="300" value={draft.to} onChange={(e) => set('to', e.target.value)} error={errors.to} className="w-36" />
              </>
            )}
          </div>
          <Field
            className="mt-4"
            label="Reason (optional)"
            maxLength={200}
            value={draft.reason}
            onChange={(e) => set('reason', e.target.value)}
            placeholder="e.g. Conference, Eid holiday"
            hint="Only visible to admins"
          />
          <div className="mt-4 flex justify-end">
            <Button type="submit" loading={adding}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Add leave
            </Button>
          </div>
        </form>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <h2 className="border-b border-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">Upcoming</h2>
          {loading ? (
            <Spinner label="Loading leave…" />
          ) : leaves.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-slate-500">No upcoming leave or holidays.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {leaves.map((l) => (
                <li key={l._id} className="flex items-center gap-4 px-4 py-3 sm:px-5">
                  <div className="w-32 shrink-0">
                    <p className="text-sm font-semibold text-slate-900">{formatDay(l.date)}</p>
                    <p className="text-xs text-slate-500">{l.from ? `${formatTime(l.from)} – ${formatTime(l.to)}` : 'Whole day'}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm font-medium ${l.doctor ? 'text-slate-900' : 'text-[#003a70]'}`}>
                      {l.doctor ? l.doctor.name.en : 'All doctors · hospital holiday'}
                    </p>
                    {l.reason && <p className="truncate text-xs text-slate-500">{l.reason}</p>}
                  </div>
                  <Button
                    variant="dangerGhost"
                    size="icon"
                    disabled={busyId === l._id}
                    onClick={() => onDelete(l)}
                    aria-label={`Remove leave on ${formatDay(l.date)}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
