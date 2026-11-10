import { useCallback, useEffect, useState } from 'react'
import {
  AlertTriangle,
  CalendarCheck,
  Download,
  Eye,
  FileText,
  MessageCircle,
  Pencil,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Stethoscope,
  Trash2,
  Upload,
} from 'lucide-react'
import { adminDoctorsApi, adminInboxApi, adminPatientsApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Field, Link, Modal, Spinner, Switch } from '../components/ui'
import { APPOINTMENT_STATUS, clinicToday, formatDay, formatTime } from '../appointmentOptions'
import { ADMIN_PATHS, chatPath, navigate, patientPath, setFlash, takeFlash } from '../navigation'
import { downloadBlob, openBlob, telHref } from '../components/whatsapp/format'

const GENDERS = [
  ['male', 'Male'],
  ['female', 'Female'],
  ['other', 'Other'],
]
const BLOOD_GROUPS = ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const REPORT_TYPES = [
  ['lab', 'Lab test'],
  ['radiology', 'Radiology / scan'],
  ['prescription', 'Prescription'],
  ['discharge_summary', 'Discharge summary'],
  ['bill', 'Bill'],
  ['other', 'Other'],
]
const reportTypeLabel = (t) => REPORT_TYPES.find(([k]) => k === t)?.[1] || t
const SEND_RESULT = {
  document: 'Report sent on WhatsApp.',
  template: 'Report sent on WhatsApp as an approved template (the chat was closed).',
  notice: 'The number hasn\'t been checked at the desk, so the patient got a "report ready" message. The file goes out when they tap "Send my report".',
}

const emptyPatient = {
  name: '',
  phone: '',
  email: '',
  age: '',
  dob: '',
  gender: 'male',
  bloodGroup: '',
  address: '',
  allergies: '',
  chronicConditions: '',
  language: 'en',
  notes: '',
}
const emptyVisit = () => ({
  date: clinicToday(),
  doctor: '',
  appointment: '',
  chiefComplaint: '',
  vitals: { bp: '', pulse: '', temperature: '', spo2: '', weight: '' },
  diagnosis: '',
  prescription: [{ medicine: '', dose: '', frequency: '', days: '', notes: '' }],
  advice: '',
  followUpDate: '',
})

const fieldErrors = (err) => Object.fromEntries((err.details || []).map((d) => [d.field, d.message]))
const toNumberOrNull = (v) => (v === '' || v === null || v === undefined ? null : Number(v))

function PatientForm({ initial, onSubmit, onCancel, submitLabel, showConsent }) {
  const [form, setForm] = useState({ ...emptyPatient, ...initial, age: initial?.age ?? '' })
  const [consent, setConsent] = useState({ whatsappConsent: true, reportsConsent: false, phoneVerified: false })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setErrors({})
    try {
      const data = { ...form, age: form.age === '' ? '' : Number(form.age) }
      for (const key of ['_id', 'uhid', 'waId', 'phoneKey', 'consent', 'phoneVerifiedAt', 'phoneVerifiedBy', 'createdAt', 'updatedAt']) delete data[key]
      await onSubmit(showConsent ? { ...data, ...consent } : data)
    } catch (err) {
      setError(err.message)
      setErrors(fieldErrors(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Alert>{error}</Alert>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required value={form.name} onChange={set('name')} error={errors.name} className="sm:col-span-2" />
        <Field label="Mobile number (WhatsApp)" required inputMode="tel" value={form.phone} onChange={set('phone')} error={errors.phone} />
        <Field label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} />
        <Field label="Age" type="number" min="0" max="120" value={form.age} onChange={set('age')} error={errors.age} />
        <Field label="Date of birth" type="date" max={clinicToday()} value={form.dob} onChange={set('dob')} error={errors.dob} />
        <Field as="select" label="Gender" value={form.gender} onChange={set('gender')}>
          {GENDERS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </Field>
        <Field as="select" label="Blood group" value={form.bloodGroup} onChange={set('bloodGroup')}>
          {BLOOD_GROUPS.map((g) => (
            <option key={g} value={g}>
              {g || 'Not known'}
            </option>
          ))}
        </Field>
        <Field as="select" label="WhatsApp language" value={form.language} onChange={set('language')}>
          <option value="en">English</option>
          <option value="hi">हिन्दी (Hindi)</option>
        </Field>
        <Field label="Address" value={form.address} onChange={set('address')} maxLength={300} />
        <Field as="textarea" rows={2} label="Allergies" value={form.allergies} onChange={set('allergies')} maxLength={500} placeholder="e.g. Penicillin" />
        <Field as="textarea" rows={2} label="Long-term conditions" value={form.chronicConditions} onChange={set('chronicConditions')} maxLength={500} placeholder="e.g. Diabetes, BP" />
        <Field as="textarea" rows={2} label="Notes (staff only)" value={form.notes} onChange={set('notes')} maxLength={2000} className="sm:col-span-2" />
      </div>
      {showConsent && (
        <div className="space-y-3 rounded-lg border border-slate-200 p-4">
          {[
            ['whatsappConsent', 'WhatsApp messages to this number (bookings, reminders)'],
            ['reportsConsent', 'Patient agreed to get reports on WhatsApp'],
            ['phoneVerified', 'Patient confirmed in person this is their WhatsApp number'],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center justify-between gap-3 text-sm text-slate-700">
              {label}
              <Switch checked={consent[key]} onChange={(v) => setConsent((c) => ({ ...c, [key]: v }))} label={label} />
            </label>
          ))}
        </div>
      )}
      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={saving}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

function VisitModal({ open, onClose, patientId, appointments, doctors, initial, onSaved }) {
  const [visit, setVisit] = useState(() => initial || emptyVisit())
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const set = (key) => (e) => setVisit((v) => ({ ...v, [key]: e.target.value }))
  const setVital = (key) => (e) => setVisit((v) => ({ ...v, vitals: { ...v.vitals, [key]: e.target.value } }))
  const setRx = (i, key, value) => setVisit((v) => ({ ...v, prescription: v.prescription.map((p, j) => (j === i ? { ...p, [key]: value } : p)) }))

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      const data = {
        ...visit,
        vitals: {
          bp: visit.vitals.bp,
          pulse: toNumberOrNull(visit.vitals.pulse),
          temperature: toNumberOrNull(visit.vitals.temperature),
          spo2: toNumberOrNull(visit.vitals.spo2),
          weight: toNumberOrNull(visit.vitals.weight),
        },
        prescription: visit.prescription.filter((p) => p.medicine.trim()).map((p) => ({ ...p, days: toNumberOrNull(p.days) })),
      }
      if (!data.appointment) delete data.appointment
      const saved = initial?._id ? await adminPatientsApi.updateVisit(initial._id, data) : await adminPatientsApi.createVisit(patientId, data)
      onSaved(saved)
    } catch (err) {
      setError(err.details?.map((d) => d.message).join('. ') || err.message)
    } finally {
      setSaving(false)
    }
  }

  const input = 'w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40'

  return (
    <Modal
      open={open}
      title={initial?._id ? 'Edit visit' : 'Add visit'}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={saving} onClick={save}>
            Save visit
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Alert>{error}</Alert>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Visit date" type="date" value={visit.date} onChange={set('date')} />
          <Field
            as="select"
            label="From booking (optional)"
            value={visit.appointment || ''}
            onChange={(e) => {
              const a = appointments.find((x) => x._id === e.target.value)
              setVisit((v) => ({ ...v, appointment: e.target.value, ...(a && { date: a.date, doctor: a.doctor || v.doctor }) }))
            }}
          >
            <option value="">None</option>
            {appointments.map((a) => (
              <option key={a._id} value={a._id}>
                {formatDay(a.date)} · {a.doctorName}
              </option>
            ))}
          </Field>
          <Field as="select" label="Doctor" value={visit.doctor || ''} onChange={set('doctor')} className="sm:col-span-2">
            <option value="">Not listed</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name?.en}
              </option>
            ))}
          </Field>
        </div>
        <Field as="textarea" rows={2} label="Complaint" value={visit.chiefComplaint} onChange={set('chiefComplaint')} maxLength={1000} />
        <div>
          <p className="mb-1.5 text-sm font-medium text-slate-700">Vitals</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {[
              ['bp', 'BP', '120/80'],
              ['pulse', 'Pulse', '/min'],
              ['temperature', 'Temp °F', '98.6'],
              ['spo2', 'SpO₂ %', '98'],
              ['weight', 'Weight kg', '70'],
            ].map(([key, label, placeholder]) => (
              <label key={key} className="text-xs text-slate-500">
                {label}
                <input className={input} inputMode={key === 'bp' ? 'text' : 'decimal'} placeholder={placeholder} value={visit.vitals[key] ?? ''} onChange={setVital(key)} />
              </label>
            ))}
          </div>
        </div>
        <Field as="textarea" rows={2} label="Diagnosis" value={visit.diagnosis} onChange={set('diagnosis')} maxLength={1000} />
        <div>
          <p className="mb-1.5 text-sm font-medium text-slate-700">Prescription</p>
          <div className="space-y-2">
            {visit.prescription.map((p, i) => (
              <div key={i} className="grid grid-cols-6 gap-1.5 rounded-lg bg-slate-50 p-2">
                <input className={`${input} col-span-6 sm:col-span-2`} placeholder="Medicine" value={p.medicine} onChange={(e) => setRx(i, 'medicine', e.target.value)} aria-label="Medicine" />
                <input className={`${input} col-span-2 sm:col-span-1`} placeholder="Dose" value={p.dose} onChange={(e) => setRx(i, 'dose', e.target.value)} aria-label="Dose" />
                <input className={`${input} col-span-2 sm:col-span-1`} placeholder="1-0-1" value={p.frequency} onChange={(e) => setRx(i, 'frequency', e.target.value)} aria-label="How often" />
                <input className={`${input} col-span-1`} placeholder="Days" inputMode="numeric" value={p.days ?? ''} onChange={(e) => setRx(i, 'days', e.target.value)} aria-label="Days" />
                <button
                  type="button"
                  onClick={() => setVisit((v) => ({ ...v, prescription: v.prescription.filter((_, j) => j !== i) }))}
                  className="col-span-1 rounded-md text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label="Remove medicine"
                >
                  <Trash2 className="mx-auto h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-1"
            onClick={() => setVisit((v) => ({ ...v, prescription: [...v.prescription, { medicine: '', dose: '', frequency: '', days: '', notes: '' }] }))}
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> Add medicine
          </Button>
        </div>
        <Field as="textarea" rows={2} label="Advice" value={visit.advice} onChange={set('advice')} maxLength={2000} />
        <Field label="Follow-up date" type="date" min={clinicToday()} value={visit.followUpDate} onChange={set('followUpDate')} />
      </div>
    </Modal>
  )
}

function ReportModal({ open, onClose, patientId, visits, onSaved }) {
  const [file, setFile] = useState(null)
  const [fields, setFields] = useState({ title: '', type: 'lab', reportDate: clinicToday(), visit: '', notes: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }))

  const save = async () => {
    if (!file) {
      setError('Choose a PDF, JPG or PNG file')
      return
    }
    setSaving(true)
    setError('')
    try {
      onSaved(await adminPatientsApi.uploadReport(patientId, file, fields))
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      title="Upload report"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={saving} onClick={save}>
            <Upload className="h-4 w-4" aria-hidden="true" /> Upload
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Alert>{error}</Alert>
        <label className="block rounded-lg border-2 border-dashed border-slate-300 p-5 text-center text-sm text-slate-600 hover:border-[#0091da]">
          <FileText className="mx-auto mb-2 h-6 w-6 text-slate-400" aria-hidden="true" />
          {file ? file.name : 'Choose the report (PDF, JPG or PNG, up to 15 MB)'}
          <input
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0] || null
              setFile(f)
              if (f && !fields.title) setFields((x) => ({ ...x, title: f.name.replace(/\.[^.]+$/, '') }))
            }}
          />
        </label>
        <Field label="Title" placeholder="e.g. CBC blood test report" value={fields.title} onChange={set('title')} maxLength={120} hint="The patient sees this in the WhatsApp message" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field as="select" label="Type" value={fields.type} onChange={set('type')}>
            {REPORT_TYPES.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </Field>
          <Field label="Report date" type="date" value={fields.reportDate} onChange={set('reportDate')} />
        </div>
        {visits.length > 0 && (
          <Field as="select" label="For visit (optional)" value={fields.visit} onChange={set('visit')}>
            <option value="">None</option>
            {visits.map((v) => (
              <option key={v._id} value={v._id}>
                {formatDay(v.date)} · {v.doctorName || 'Visit'}
                {v.diagnosis ? ` · ${v.diagnosis.slice(0, 40)}` : ''}
              </option>
            ))}
          </Field>
        )}
        <Field as="textarea" rows={2} label="Notes (staff only)" value={fields.notes} onChange={set('notes')} maxLength={1000} />
      </div>
    </Modal>
  )
}

function NewPatientView({ path }) {
  return (
    <AdminLayout path={path} title="New patient">
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <PatientForm
          showConsent
          submitLabel="Create patient"
          onCancel={() => navigate(ADMIN_PATHS.patients)}
          onSubmit={async (data) => {
            const patient = await adminPatientsApi.create(data)
            setFlash(`${patient.name} added as ${patient.uhid}.`)
            navigate(patientPath(patient._id), { replace: true })
          }}
        />
      </div>
    </AdminLayout>
  )
}

// One patient's record: profile, WhatsApp consent, and the history of bookings, visits and reports
function PatientRecordView({ path, id }) {
  const [data, setData] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [error, setError] = useState('')
  const [notice, setNotice] = useState(takeFlash)
  const [modal, setModal] = useState('') // edit | visit | report
  const [editingVisit, setEditingVisit] = useState(null)
  const [busy, setBusy] = useState('')

  const load = useCallback(
    () =>
      adminPatientsApi
        .get(id)
        .then(setData)
        .catch((err) => setError(err.message)),
    [id],
  )

  useEffect(() => {
    load()
    adminDoctorsApi
      .list()
      .then(setDoctors)
      .catch(() => {})
  }, [load])

  if (!data) {
    return (
      <AdminLayout path={path} title="Patient">
        {error ? <Alert>{error}</Alert> : <Spinner />}
      </AdminLayout>
    )
  }

  const { patient, appointments, visits, reports, conversation } = data
  const reportsAllowed = Boolean(patient.consent?.reports?.at)

  const updateFlags = async (changes, message) => {
    setError('')
    try {
      await adminPatientsApi.update(patient._id, changes)
      setNotice(message)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const openChat = async () => {
    try {
      const c = conversation || (await adminInboxApi.start({ phone: patient.phone, name: patient.name }))
      navigate(chatPath(c._id))
    } catch (err) {
      setError(err.message)
    }
  }

  const sendReport = async (report) => {
    if (!window.confirm(`Send "${report.title}" to ${patient.name} on WhatsApp at ${patient.phone}?\n\nCheck this is the right patient and number: reports contain medical information.`)) return
    setBusy(report._id)
    setError('')
    setNotice('')
    try {
      const { method, message } = await adminPatientsApi.sendReport(report._id)
      if (message.status === 'failed') setError(`Report not sent: ${message.error}`)
      else setNotice(message.status === 'skipped' ? `Not sent: ${message.error}` : SEND_RESULT[method])
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  const removeReport = async (report) => {
    if (!window.confirm(`Delete "${report.title}"? The file is removed for good.`)) return
    try {
      await adminPatientsApi.removeReport(report._id)
      setNotice('Report deleted.')
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const removeVisit = async (visit) => {
    if (!window.confirm('Delete this visit?')) return
    try {
      await adminPatientsApi.removeVisit(visit._id)
      setNotice('Visit deleted.')
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  // One timeline, newest first
  const timeline = [
    ...appointments.map((a) => ({ kind: 'appointment', key: `a${a._id}`, date: a.date, sort: `${a.date} ${a.time}`, item: a })),
    ...visits.map((v) => ({ kind: 'visit', key: `v${v._id}`, date: v.date, sort: `${v.date} 99`, item: v })),
    ...reports.map((r) => ({ kind: 'report', key: `r${r._id}`, date: r.reportDate || r.createdAt.slice(0, 10), sort: `${r.reportDate || r.createdAt.slice(0, 10)} 98`, item: r })),
  ].sort((a, b) => b.sort.localeCompare(a.sort))

  return (
    <AdminLayout
      path={path}
      title={patient.name}
      actions={
        <div className="flex gap-2">
          <a href={telHref(patient.waId || patient.phone)} className="hidden sm:block">
            <Button variant="secondary" size="sm">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call
            </Button>
          </a>
          <Button size="sm" onClick={openChat} className="bg-[#00a884]! hover:bg-[#008069]!">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
          </Button>
        </div>
      }
    >
      <div className="mx-auto max-w-5xl space-y-4">
        <Alert type="success">{notice}</Alert>
        <Alert>{error}</Alert>

        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-slate-500">{patient.uhid}</p>
                <h2 className="text-xl font-semibold text-slate-900">{patient.name}</h2>
                <p className="mt-0.5 text-sm capitalize text-slate-600">
                  {[patient.age != null && `${patient.age} years`, patient.gender, patient.bloodGroup && `Blood ${patient.bloodGroup}`].filter(Boolean).join(' · ')}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setModal('edit')}>
                <Pencil className="h-4 w-4" aria-hidden="true" /> Edit
              </Button>
            </div>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-slate-500">Mobile</dt>
                <dd>
                  <a href={telHref(patient.waId || patient.phone)} className="font-medium text-[#003a70] hover:underline">
                    {patient.phone}
                  </a>
                </dd>
              </div>
              {patient.email && (
                <div>
                  <dt className="text-xs text-slate-500">Email</dt>
                  <dd className="truncate">{patient.email}</dd>
                </div>
              )}
              {patient.address && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-slate-500">Address</dt>
                  <dd>{patient.address}</dd>
                </div>
              )}
              {patient.chronicConditions && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-slate-500">Long-term conditions</dt>
                  <dd>{patient.chronicConditions}</dd>
                </div>
              )}
              {patient.notes && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-slate-500">Staff notes</dt>
                  <dd className="whitespace-pre-wrap">{patient.notes}</dd>
                </div>
              )}
            </dl>
            {patient.allergies && (
              <p className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> Allergies: {patient.allergies}
              </p>
            )}
          </section>

          <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 text-sm">
            <h3 className="font-semibold text-slate-900">WhatsApp</h3>
            <label className="flex items-center justify-between gap-3">
              <span>
                WhatsApp messages to this number
                <span className="block text-xs text-slate-500">Off = nothing is sent (same as STOP), for everyone on {patient.phone}</span>
              </span>
              <Switch
                checked={!conversation?.optedOut}
                onChange={(v) =>
                  updateFlags({ whatsappConsent: v }, v ? 'WhatsApp messages to this number are on.' : 'WhatsApp messages to this number are off.')
                }
                label="WhatsApp messages to this number"
              />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span>
                Reports on WhatsApp
                <span className="block text-xs text-slate-500">Only after the patient agrees</span>
              </span>
              <Switch
                checked={reportsAllowed}
                onChange={(v) => updateFlags({ reportsConsent: v }, v ? 'Recorded: the patient agreed to get reports on WhatsApp.' : 'Report consent removed.')}
                label="Reports on WhatsApp"
              />
            </label>
            <div className="border-t border-slate-100 pt-3">
              {patient.phoneVerifiedBy === 'desk' ? (
                <p className="flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Number checked with the patient at the desk
                </p>
              ) : (
                <>
                  <p className="text-xs text-slate-500">
                    {patient.phoneVerifiedAt ? 'Someone has messaged us from this number, but it' : 'This number'} hasn't been checked with the patient.
                    Until it is, a report sent while the chat is closed goes out as a "tap to receive" message.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      if (window.confirm(`Did ${patient.name} confirm in person that ${patient.phone} is their WhatsApp number?`)) {
                        updateFlags({ phoneVerified: true }, 'Number marked as checked at the desk.')
                      }
                    }}
                  >
                    Number checked at desk
                  </Button>
                </>
              )}
            </div>
            {conversation?.optedOut && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">No WhatsApp messages go to this number (the patient replied STOP, or staff turned them off).</p>
            )}
          </section>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-5 py-3">
            <h3 className="font-semibold text-slate-900">History</h3>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setEditingVisit(null)
                  setModal('visit')
                }}
              >
                <Stethoscope className="h-4 w-4" aria-hidden="true" /> Add visit
              </Button>
              <Button size="sm" onClick={() => setModal('report')}>
                <Upload className="h-4 w-4" aria-hidden="true" /> Upload report
              </Button>
            </div>
          </div>

          {!timeline.length && <p className="px-5 py-10 text-center text-sm text-slate-500">No history yet.</p>}
          <ol className="divide-y divide-slate-100">
            {timeline.map(({ kind, key, item }) => (
              <li key={key} className="flex gap-3 px-5 py-4">
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    kind === 'appointment' ? 'bg-sky-50 text-sky-700' : kind === 'visit' ? 'bg-violet-50 text-violet-700' : 'bg-red-50 text-red-600'
                  }`}
                  aria-hidden="true"
                >
                  {kind === 'appointment' ? <CalendarCheck className="h-4 w-4" /> : kind === 'visit' ? <Stethoscope className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1 text-sm">
                  {kind === 'appointment' && (
                    <>
                      <p className="font-medium text-slate-900">
                        Appointment · {formatDay(item.date)} {formatTime(item.time)}
                        <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${APPOINTMENT_STATUS[item.status]?.className}`}>
                          {APPOINTMENT_STATUS[item.status]?.label}
                        </span>
                      </p>
                      <p className="text-slate-600">
                        {item.doctorName} · <span className="font-mono text-xs">{item.ref}</span>
                        {item.notes ? ` · "${item.notes}"` : ''}
                      </p>
                    </>
                  )}
                  {kind === 'visit' && (
                    <>
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-slate-900">
                          Visit · {formatDay(item.date)}
                          {item.doctorName ? ` · ${item.doctorName}` : ''}
                        </p>
                        <span className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            onClick={() => {
                              setEditingVisit({
                                ...emptyVisit(),
                                ...item,
                                doctor: item.doctor || '',
                                appointment: item.appointment || '',
                                vitals: { ...emptyVisit().vitals, ...Object.fromEntries(Object.entries(item.vitals || {}).map(([k, v]) => [k, v ?? ''])) },
                                prescription: item.prescription?.length ? item.prescription : emptyVisit().prescription,
                              })
                              setModal('visit')
                            }}
                            aria-label="Edit visit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button type="button" className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600" onClick={() => removeVisit(item)} aria-label="Delete visit">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </span>
                      </div>
                      {item.chiefComplaint && <p className="text-slate-600">Complaint: {item.chiefComplaint}</p>}
                      {Object.values(item.vitals || {}).some((v) => v !== null && v !== '') && (
                        <p className="text-xs text-slate-500">
                          {[
                            item.vitals.bp && `BP ${item.vitals.bp}`,
                            item.vitals.pulse != null && `Pulse ${item.vitals.pulse}`,
                            item.vitals.temperature != null && `Temp ${item.vitals.temperature}°F`,
                            item.vitals.spo2 != null && `SpO₂ ${item.vitals.spo2}%`,
                            item.vitals.weight != null && `${item.vitals.weight} kg`,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      )}
                      {item.diagnosis && <p className="mt-1 text-slate-800">Diagnosis: {item.diagnosis}</p>}
                      {item.prescription?.length > 0 && (
                        <ul className="mt-2 space-y-0.5 rounded-lg bg-slate-50 px-3 py-2 text-slate-700">
                          {item.prescription.map((p, i) => (
                            <li key={i}>
                              ℞ <span className="font-medium">{p.medicine}</span>
                              {[p.dose, p.frequency, p.days != null && `${p.days} days`].filter(Boolean).map((x) => ` · ${x}`)}
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.advice && <p className="mt-1 text-slate-600">Advice: {item.advice}</p>}
                      {item.followUpDate && <p className="mt-1 text-xs font-medium text-violet-700">Follow-up on {formatDay(item.followUpDate)}</p>}
                    </>
                  )}
                  {kind === 'report' && (
                    <>
                      <p className="font-medium text-slate-900">
                        {item.title}
                        <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{reportTypeLabel(item.type)}</span>
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.reportDate ? formatDay(item.reportDate) : 'Uploaded'}
                        {item.sends?.length ? ` · sent on WhatsApp ${item.sends.length}×, last ${new Date(item.sends[item.sends.length - 1].at).toLocaleString('en-IN')}` : ' · not sent yet'}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Button variant="secondary" size="sm" onClick={() => openBlob(() => adminPatientsApi.reportFile(item._id)).catch((err) => setError(err.message))}>
                          <Eye className="h-4 w-4" aria-hidden="true" /> View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadBlob(() => adminPatientsApi.reportFile(item._id), item.file?.originalName || item.title).catch((err) => setError(err.message))}
                        >
                          <Download className="h-4 w-4" aria-hidden="true" /> Download
                        </Button>
                        <Button
                          size="sm"
                          loading={busy === item._id}
                          disabled={!reportsAllowed || conversation?.optedOut}
                          title={reportsAllowed ? undefined : 'Turn on "Reports on WhatsApp" after the patient agrees'}
                          onClick={() => sendReport(item)}
                          className="bg-[#00a884]! hover:bg-[#008069]!"
                        >
                          <Send className="h-4 w-4" aria-hidden="true" /> Send on WhatsApp
                        </Button>
                        <Button variant="dangerGhost" size="sm" onClick={() => removeReport(item)}>
                          <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
                        </Button>
                      </div>
                      {!reportsAllowed && <p className="mt-1 text-xs text-amber-700">Turn on "Reports on WhatsApp" once the patient agrees.</p>}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <Modal open={modal === 'edit'} title="Edit patient" onClose={() => setModal('')}>
        <PatientForm
          initial={patient}
          submitLabel="Save"
          onCancel={() => setModal('')}
          onSubmit={async (changes) => {
            await adminPatientsApi.update(patient._id, changes)
            setModal('')
            setNotice('Patient updated.')
            await load()
          }}
        />
      </Modal>
      {modal === 'visit' && (
        <VisitModal
          open
          onClose={() => setModal('')}
          patientId={patient._id}
          appointments={appointments}
          doctors={doctors}
          initial={editingVisit}
          onSaved={async () => {
            setModal('')
            setNotice('Visit saved.')
            await load()
          }}
        />
      )}
      {modal === 'report' && (
        <ReportModal
          open
          onClose={() => setModal('')}
          patientId={patient._id}
          visits={visits}
          onSaved={async (r) => {
            setModal('')
            setNotice(`"${r.title}" uploaded.${reportsAllowed ? ' Use "Send on WhatsApp" to share it.' : ''}`)
            await load()
          }}
        />
      )}
      <p className="sr-only">
        <Link to={ADMIN_PATHS.patients}>Back to patients</Link>
      </p>
    </AdminLayout>
  )
}

export default function PatientDetailView({ path, id }) {
  return id ? <PatientRecordView path={path} id={id} /> : <NewPatientView path={path} />
}
