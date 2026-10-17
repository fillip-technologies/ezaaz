import { useCallback, useEffect, useMemo, useState } from 'react'
import { CalendarClock, Check, Mail, Phone, Search, Stethoscope, User, X } from 'lucide-react'
import { adminAppointmentsApi, adminDoctorsApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Field, Modal, Spinner } from '../components/ui'
import RescheduleForm from '../components/RescheduleForm'
import {
  APPOINTMENT_STATUS,
  RANGE_PRESETS,
  STATUS_TABS,
  clinicToday,
  formatDay,
  formatTime,
} from '../appointmentOptions'

const formatDateTime = (value) =>
  value
    ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(value))
    : ''

const selectClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40'

// Bookings made on the website's Book Appointment page
export default function AppointmentsView({ path }) {
  const today = clinicToday()
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const [tab, setTab] = useState('requested')
  const [preset, setPreset] = useState('upcoming')
  const [custom, setCustom] = useState({ from: today, to: '' })
  const [doctorFilter, setDoctorFilter] = useState('')
  const [search, setSearch] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const [open, setOpen] = useState(null)
  const [mode, setMode] = useState('details') // details | cancel | reschedule
  const [draft, setDraft] = useState({ status: 'requested', adminNote: '', cancelReason: '' })
  const [saving, setSaving] = useState(false)
  const [modalError, setModalError] = useState('')
  const [busyId, setBusyId] = useState('')

  const range = useMemo(() => {
    const p = RANGE_PRESETS.find((r) => r.key === preset)
    return p?.range ? p.range(today) : custom
  }, [preset, custom, today])

  useEffect(() => {
    let cancelled = false
    adminDoctorsApi
      .list()
      .then((list) => !cancelled && setDoctors(list))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    adminAppointmentsApi
      .list({ from: range.from, to: range.to, doctor: doctorFilter })
      .then((list) => {
        if (cancelled) return
        setAppointments(list)
        setError('')
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [range.from, range.to, doctorFilter, reloadKey])

  const tabCounts = useMemo(() => {
    const c = Object.fromEntries(STATUS_TABS.map((t) => [t.key, 0]))
    for (const a of appointments) {
      for (const t of STATUS_TABS) if (!t.statuses || t.statuses.includes(a.status)) c[t.key]++
    }
    return c
  }, [appointments])

  const visible = useMemo(() => {
    const statuses = STATUS_TABS.find((t) => t.key === tab)?.statuses
    const q = search.trim().toLowerCase()
    return appointments.filter((a) => {
      if (statuses && !statuses.includes(a.status)) return false
      if (!q) return true
      return [a.patientName, a.phone, a.email, a.ref, a.doctorName].some((v) => v?.toLowerCase().includes(q))
    })
  }, [appointments, tab, search])

  // Group rows under a heading per day
  const byDay = useMemo(() => {
    const groups = new Map()
    for (const a of visible) groups.set(a.date, [...(groups.get(a.date) || []), a])
    return [...groups.entries()]
  }, [visible])

  const replace = (updated) => setAppointments((list) => list.map((a) => (a._id === updated._id ? { ...a, ...updated } : a)))

  const openAppointment = (a, nextMode = 'details') => {
    setOpen(a)
    setMode(nextMode)
    setDraft({ status: a.status, adminNote: a.adminNote || '', cancelReason: a.cancelReason || '' })
    setModalError('')
  }

  const closeModal = useCallback(() => setOpen(null), [])

  const quickConfirm = async (a) => {
    setBusyId(a._id)
    setError('')
    try {
      replace(await adminAppointmentsApi.update(a._id, { status: 'confirmed' }))
      setNotice(`${a.patientName}'s appointment is confirmed${a.email ? ' and they were emailed' : ''}.`)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId('')
    }
  }

  const save = async (changes, message) => {
    setSaving(true)
    setModalError('')
    try {
      const updated = await adminAppointmentsApi.update(open._id, changes)
      replace(updated)
      setNotice(message(updated))
      setOpen(null)
    } catch (err) {
      setModalError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const onSaveDetails = () =>
    save({ status: draft.status, adminNote: draft.adminNote.trim() }, (u) => `${u.patientName}'s appointment was updated.`)

  const onConfirmCancel = () =>
    save(
      { status: 'cancelled', cancelReason: draft.cancelReason.trim() },
      (u) => `${u.patientName}'s appointment was cancelled${u.email ? ' and they were emailed' : ''}. The slot is free again.`,
    )

  const onRescheduled = (updated) => {
    replace(updated)
    setNotice(`${updated.patientName} moved to ${formatDay(updated.date)} at ${formatTime(updated.time)}.`)
    setOpen(null)
    setReloadKey((k) => k + 1)
  }

  const isActive = (a) => a.status === 'requested' || a.status === 'confirmed'

  return (
    <AdminLayout path={path} title="Appointments">
      <div className="space-y-4">
        <Alert type="success">{notice}</Alert>
        <Alert>{error}</Alert>

        <div className="overflow-x-auto border-b border-slate-200">
          <nav className="-mb-px flex gap-1" aria-label="Filter by status">
            {STATUS_TABS.map((t) => {
              const active = tab === t.key
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                    active ? 'border-[#0091da] text-[#003a70]' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  {t.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      t.key === 'requested' && tabCounts[t.key] > 0
                        ? 'bg-amber-100 font-semibold text-amber-800'
                        : active
                          ? 'bg-[#0091da]/10 text-[#003a70]'
                          : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tabCounts[t.key]}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="relative lg:col-span-1">
            <span className="sr-only">Search appointments</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, phone or reference"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40"
            />
          </label>
          <label>
            <span className="sr-only">Date range</span>
            <select value={preset} onChange={(e) => setPreset(e.target.value)} className={selectClass}>
              {RANGE_PRESETS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Doctor</span>
            <select value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)} className={selectClass}>
              <option value="">All doctors</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name.en}
                </option>
              ))}
            </select>
          </label>
          {preset === 'custom' && (
            <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
              <input
                type="date"
                aria-label="From"
                value={custom.from}
                onChange={(e) => setCustom((c) => ({ ...c, from: e.target.value }))}
                className={selectClass}
              />
              <span className="text-sm text-slate-400">to</span>
              <input
                type="date"
                aria-label="To"
                value={custom.to}
                min={custom.from}
                onChange={(e) => setCustom((c) => ({ ...c, to: e.target.value }))}
                className={selectClass}
              />
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <Spinner label="Loading appointments…" />
          ) : visible.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="font-medium text-slate-900">No appointments here</p>
              <p className="mt-1 text-sm text-slate-500">
                {appointments.length === 0
                  ? "Bookings from the website's Book Appointment page appear here. Try another date range."
                  : 'Try another tab, date range or search.'}
              </p>
            </div>
          ) : (
            byDay.map(([date, rows]) => (
              <section key={date}>
                <h2 className="sticky top-0 border-y border-slate-100 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 first:border-t-0 sm:px-5">
                  {formatDay(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  {date === today && <span className="ml-2 rounded bg-[#0091da] px-1.5 py-0.5 text-[10px] text-white">Today</span>}
                  <span className="ml-2 font-normal normal-case tracking-normal">· {rows.length}</span>
                </h2>
                <ul className="divide-y divide-slate-100">
                  {rows.map((a) => {
                    const status = APPOINTMENT_STATUS[a.status]
                    return (
                      <li key={a._id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:flex-nowrap sm:px-5">
                        <span className="w-20 shrink-0 font-mono text-sm font-semibold text-[#003a70]">{formatTime(a.time)}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openAppointment(a)}
                              className="truncate text-left font-semibold text-slate-900 hover:text-[#0091da]"
                            >
                              {a.patientName}
                            </button>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}>{status.label}</span>
                          </div>
                          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                            <a href={`tel:${a.phone.replace(/[\s-]/g, '')}`} className="font-medium text-slate-700 hover:text-[#0091da]">
                              {a.phone}
                            </a>
                            <span>{a.doctorName}</span>
                            <span className="font-mono">{a.ref}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {a.status === 'requested' && (
                            <Button size="sm" loading={busyId === a._id} onClick={() => quickConfirm(a)}>
                              <Check className="h-4 w-4" aria-hidden="true" /> Confirm
                            </Button>
                          )}
                          {isActive(a) && (
                            <Button variant="dangerGhost" size="sm" onClick={() => openAppointment(a, 'cancel')}>
                              Cancel
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => openAppointment(a)}>
                            View
                          </Button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))
          )}
        </div>
      </div>

      <Modal
        open={Boolean(open)}
        title={
          !open ? '' : mode === 'cancel' ? `Cancel ${open.patientName}'s appointment` : mode === 'reschedule' ? 'Reschedule appointment' : `Appointment ${open.ref}`
        }
        onClose={closeModal}
        footer={
          mode === 'cancel' ? (
            <>
              <Button variant="ghost" onClick={() => setMode('details')}>
                Back
              </Button>
              <Button variant="danger" loading={saving} onClick={onConfirmCancel}>
                <X className="h-4 w-4" aria-hidden="true" /> Cancel appointment
              </Button>
            </>
          ) : mode === 'details' ? (
            <>
              {open && isActive(open) && (
                <Button variant="secondary" className="mr-auto" onClick={() => setMode('reschedule')}>
                  <CalendarClock className="h-4 w-4" aria-hidden="true" /> Reschedule
                </Button>
              )}
              <Button variant="ghost" onClick={closeModal}>
                Close
              </Button>
              <Button loading={saving} onClick={onSaveDetails}>
                Save
              </Button>
            </>
          ) : null
        }
      >
        {open && (
          <div className="space-y-5 text-sm">
            <Alert>{modalError}</Alert>

            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <p className="font-semibold text-slate-900">
                {formatDay(open.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {formatTime(open.time)}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-slate-600">
                <Stethoscope className="h-4 w-4 text-slate-400" aria-hidden="true" /> {open.doctorName}
              </p>
            </div>

            {mode === 'reschedule' ? (
              <RescheduleForm appointment={open} doctors={doctors} onDone={onRescheduled} onCancel={() => setMode('details')} />
            ) : mode === 'cancel' ? (
              <>
                <p className="text-slate-600">
                  The time slot becomes free for other patients.
                  {open.email ? ` ${open.patientName} will get a cancellation email.` : ''}
                </p>
                <Field
                  label="Reason (optional)"
                  hint={open.email ? 'Included in the email to the patient' : 'Kept with the appointment'}
                  maxLength={300}
                  value={draft.cancelReason}
                  onChange={(e) => setDraft((d) => ({ ...d, cancelReason: e.target.value }))}
                  placeholder="e.g. Doctor unavailable, patient asked to cancel"
                />
              </>
            ) : (
              <>
                <dl className="space-y-2.5">
                  <Detail icon={User} label="Patient">
                    {open.patientName}
                    <span className="text-slate-500">
                      {' '}
                      · {open.age ?? '—'} yrs · {open.gender}
                    </span>
                  </Detail>
                  <Detail icon={Phone} label="Phone">
                    <a href={`tel:${open.phone.replace(/[\s-]/g, '')}`} className="font-medium text-[#0091da] hover:underline">
                      {open.phone}
                    </a>
                  </Detail>
                  <Detail icon={Mail} label="Email">
                    <span className="break-all">{open.email || '—'}</span>
                  </Detail>
                </dl>
                <div>
                  <p className="mb-1 font-medium text-slate-700">Symptoms / reason</p>
                  <p className="whitespace-pre-wrap rounded-lg bg-slate-50 px-3.5 py-2.5 text-slate-700">{open.notes || '—'}</p>
                  <p className="mt-1.5 text-xs text-slate-400">
                    Booked {formatDateTime(open.createdAt)} · Ref <span className="font-mono">{open.ref}</span>
                    {open.cancelReason && ` · Cancel reason: ${open.cancelReason}`}
                  </p>
                </div>
                <Field as="select" label="Status" value={draft.status} onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value }))}
                  hint={
                    draft.status === 'confirmed' && open.status !== 'confirmed' && open.email
                      ? 'The patient will get a confirmation email'
                      : draft.status === 'cancelled' && open.status !== 'cancelled'
                        ? 'Frees the slot' + (open.email ? ' and emails the patient' : '')
                        : undefined
                  }
                >
                  {Object.entries(APPOINTMENT_STATUS).map(([key, { label }]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </Field>
                <Field
                  as="textarea"
                  rows={3}
                  label="Internal note"
                  hint="Only visible to admins"
                  maxLength={1000}
                  value={draft.adminNote}
                  onChange={(e) => setDraft((d) => ({ ...d, adminNote: e.target.value }))}
                />
              </>
            )}
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}

function Detail({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
      <dt className="w-20 shrink-0 text-slate-500">{label}</dt>
      <dd className="min-w-0 flex-1 text-slate-900">{children}</dd>
    </div>
  )
}
