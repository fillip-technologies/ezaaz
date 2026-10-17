import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { adminDoctorsApi, adminSlotPlansApi } from '../../../api'
import placeholderPhoto from '../../../assets/doctor-placeholder.svg'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Field, Link, Spinner, Switch } from '../components/ui'
import { ImagePicker, LocalizedField, LocalizedListEditor, Section } from '../components/formParts'
import ScheduleEditor from '../components/ScheduleEditor'
import { EMPTY_SCHEDULE, describeSchedule, sameSchedule, scheduleToForm, scheduleToPayload, validateSchedule } from '../scheduleOptions'
import { CATEGORY_OPTIONS, GENDER_OPTIONS } from '../doctorOptions'
import { ADMIN_PATHS, navigate, setFlash } from '../navigation'
import { SPECIALTY_TAGS } from '../../doctors/specialtyTags'

const MAX_PHOTO_MB = 3
const LOCALIZED = ['name', 'degrees', 'specialty', 'subSpecialty', 'department', 'timing', 'hospital', 'bio', 'about']

const emptyLocalized = () => ({ en: '', hi: '' })

const EMPTY_FORM = {
  name: emptyLocalized(),
  slug: '',
  gender: 'male',
  category: 'surgical',
  specialtyTags: [],
  regNo: '',
  degrees: emptyLocalized(),
  specialty: emptyLocalized(),
  subSpecialty: emptyLocalized(),
  department: emptyLocalized(),
  experienceYears: '',
  languages: 'English, Hindi',
  timing: emptyLocalized(),
  hospital: { en: 'Ejaz Clinic & Advanced Surgical Hospital, Patna', hi: 'एजाज क्लिनिक एवं एडवांस्ड सर्जिकल हॉस्पिटल, पटना' },
  bio: emptyLocalized(),
  about: emptyLocalized(),
  specializations: [],
  education: [],
  schedule: EMPTY_SCHEDULE,
  schedulePlan: '',
  isActive: true,
  order: '',
}

const slugify = (text) =>
  text.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)

// API document -> form state
function toForm(doctor) {
  const form = { ...EMPTY_FORM }
  for (const key of LOCALIZED) form[key] = { en: doctor[key]?.en || '', hi: doctor[key]?.hi || '' }
  return {
    ...form,
    slug: doctor.slug,
    gender: doctor.gender,
    category: doctor.category,
    specialtyTags: doctor.specialtyTags || [],
    regNo: doctor.regNo || '',
    experienceYears: doctor.experienceYears ? String(doctor.experienceYears) : '',
    languages: doctor.languages || '',
    specializations: (doctor.specializations || []).map((s) => ({ en: s.en || '', hi: s.hi || '' })),
    education: (doctor.education || []).map((e) => ({ degree: e.degree || '', institution: e.institution || '' })),
    schedule: scheduleToForm(doctor.schedule),
    schedulePlan: doctor.schedulePlan || '',
    isActive: doctor.isActive,
    order: String(doctor.order ?? ''),
  }
}

// Form state -> API payload
function toPayload(form) {
  const trimLocalized = (v) => ({ en: v.en.trim(), hi: v.hi.trim() })
  const payload = {
    slug: form.slug.trim(),
    gender: form.gender,
    category: form.category,
    specialtyTags: form.specialtyTags,
    regNo: form.regNo.trim(),
    experienceYears: Number(form.experienceYears) || 0,
    languages: form.languages.trim(),
    isActive: form.isActive,
    specializations: form.specializations.map(trimLocalized).filter((s) => s.en),
    education: form.education
      .map((e) => ({ degree: e.degree.trim(), institution: e.institution.trim() }))
      .filter((e) => e.degree),
    schedule: scheduleToPayload(form.schedule),
    schedulePlan: form.schedulePlan || null,
  }
  for (const key of LOCALIZED) payload[key] = trimLocalized(form[key])
  if (form.order !== '') payload.order = Number(form.order)
  if (!payload.slug) delete payload.slug
  return payload
}

function validate(form) {
  const errors = {}
  if (!form.name.en.trim()) errors['name.en'] = 'Name is required'
  if (!form.specialty.en.trim()) errors['specialty.en'] = 'Specialty is required'
  if (form.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug.trim())) {
    errors.slug = 'Use lowercase letters, numbers and hyphens only'
  }
  const years = Number(form.experienceYears)
  if (form.experienceYears !== '' && (!Number.isFinite(years) || years < 0 || years > 80)) {
    errors.experienceYears = 'Enter a number between 0 and 80'
  }
  return { ...errors, ...validateSchedule(form.schedule) }
}

export default function DoctorFormView({ path, id }) {
  const isEdit = Boolean(id)

  const [form, setForm] = useState(EMPTY_FORM)
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(isEdit)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)

  // Slot plans for the "Online appointments" picker
  const [plans, setPlans] = useState([])
  useEffect(() => {
    let cancelled = false
    adminSlotPlansApi
      .list()
      .then((list) => !cancelled && setPlans(list))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])
  const currentPlan = plans.find((p) => p._id === form.schedulePlan)
  const followsPlan = useMemo(
    () => Boolean(currentPlan) && sameSchedule(scheduleToPayload(form.schedule), currentPlan.schedule),
    [currentPlan, form.schedule],
  )

  // Picking a plan copies its hours into the editor; "own hours" keeps whatever is there
  const choosePlan = (planId) => {
    const plan = plans.find((p) => p._id === planId)
    setForm((f) => ({ ...f, schedulePlan: planId, ...(plan && { schedule: scheduleToForm(plan.schedule) }) }))
    setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !k.startsWith('schedule'))))
  }

  // Photo: `current` is what's saved; `file` is a new pick waiting for Save; `remove` clears it on Save
  const [photo, setPhoto] = useState({ current: '', file: null, remove: false })

  useEffect(() => {
    if (!isEdit) return
    let cancelled = false
    adminDoctorsApi
      .get(id)
      .then((doctor) => {
        if (cancelled) return
        setForm(toForm(doctor))
        setPhoto({ current: doctor.photo || '', file: null, remove: false })
        setLoading(false)
      })
      .catch((err) => {
        if (cancelled) return
        setLoadError(err.message)
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, isEdit])

  const clearError = (key) => setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))

  const setValue = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    clearError(key)
  }

  const setLocalized = (key, lang, value) => {
    setForm((f) => {
      const next = { ...f, [key]: { ...f[key], [lang]: value } }
      // Keep the URL slug in sync with the English name until the admin edits it
      if (key === 'name' && lang === 'en' && !slugTouched) next.slug = slugify(value)
      return next
    })
    clearError(`${key}.${lang}`)
  }

  const updateRow = (key, index, field, value) =>
    setForm((f) => ({ ...f, [key]: f[key].map((row, i) => (i === index ? { ...row, [field]: value } : row)) }))
  const addRow = (key, row) => setForm((f) => ({ ...f, [key]: [...f[key], row] }))
  const removeRow = (key, index) => setForm((f) => ({ ...f, [key]: f[key].filter((_, i) => i !== index) }))

  const onSubmit = async (e) => {
    e.preventDefault()
    const clientErrors = validate(form)
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors)
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' })
      return
    }

    setSaving(true)
    setStatus({ type: '', message: '' })
    let saved
    try {
      saved = isEdit ? await adminDoctorsApi.update(id, toPayload(form)) : await adminDoctorsApi.create(toPayload(form))
    } catch (err) {
      if (err.details?.length) setErrors(Object.fromEntries(err.details.map((d) => [d.field, d.message])))
      setStatus({ type: 'error', message: err.message })
      setSaving(false)
      return
    }

    // The doctor is saved at this point; a photo problem shouldn't lose the rest
    let photoError = ''
    try {
      if (photo.file) saved = await adminDoctorsApi.uploadPhoto(saved._id, photo.file)
      else if (photo.remove && photo.current) saved = await adminDoctorsApi.removePhoto(saved._id)
    } catch (err) {
      photoError = err.message
    }

    const name = saved.name.en
    if (!isEdit) {
      setFlash(photoError ? `${name} was added, but the photo wasn't saved: ${photoError}` : `${name} was added.`)
      navigate(ADMIN_PATHS.doctors, { replace: true })
      return
    }

    setForm(toForm(saved))
    setPhoto({ current: saved.photo || '', file: null, remove: false })
    setErrors({})
    setStatus(
      photoError
        ? { type: 'error', message: `Details saved, but the photo wasn't: ${photoError}` }
        : { type: 'success', message: 'Changes saved. The website is updated.' },
    )
    setSaving(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const title = isEdit ? (form.name.en ? `Edit ${form.name.en}` : 'Edit doctor') : 'Add doctor'

  return (
    <AdminLayout
      path={path}
      title={title}
      actions={
        <Link
          to={ADMIN_PATHS.doctors}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">All doctors</span>
        </Link>
      }
    >
      {loading ? (
        <Spinner label="Loading doctor…" />
      ) : loadError ? (
        <div className="max-w-xl space-y-4">
          <Alert>{loadError}</Alert>
          <Link to={ADMIN_PATHS.doctors} className="text-sm font-medium text-[#0091da] hover:underline">
            Back to all doctors
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mx-auto max-w-5xl space-y-6 pb-24">
          <Alert type={status.type || 'error'}>{status.message}</Alert>

          <Section title="Photo" description={`Portrait works best (3:4). JPG, PNG or WebP, up to ${MAX_PHOTO_MB} MB.`}>
            <ImagePicker
              image={photo}
              onChange={setPhoto}
              onError={(message) => setStatus({ type: message ? 'error' : '', message })}
              maxMb={MAX_PHOTO_MB}
              placeholder={placeholderPhoto}
              previewClassName="h-36 w-28 rounded-xl border border-slate-200 bg-slate-100 object-cover object-top"
            />
          </Section>

          <Section title="Basic information">
            <LocalizedField label="Full name" value={form.name} onChange={(lang, v) => setLocalized('name', lang, v)} errorKey="name" errors={errors} required placeholder="Dr. Firstname Lastname" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Profile URL"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true)
                  setValue('slug', e.target.value.toLowerCase())
                }}
                error={errors.slug}
                hint={form.slug ? `/doctor-profile?id=${form.slug}` : 'Generated from the English name'}
              />
              <Field label="Registration number" value={form.regNo} onChange={(e) => setValue('regNo', e.target.value)} placeholder="BMC-12345" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field as="select" label="Gender" value={form.gender} onChange={(e) => setValue('gender', e.target.value)}>
                {GENDER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Field>
              <Field
                as="select"
                label="Category"
                value={form.category}
                onChange={(e) => setValue('category', e.target.value)}
                hint="Filter tab on the website"
              >
                {CATEGORY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Field>
              <Field
                label="Experience (years)"
                type="number"
                min="0"
                max="80"
                inputMode="numeric"
                value={form.experienceYears}
                onChange={(e) => setValue('experienceYears', e.target.value)}
                error={errors.experienceYears}
                hint='Shown as "18+ Years"'
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Languages spoken" value={form.languages} onChange={(e) => setValue('languages', e.target.value)} placeholder="English, Hindi, Urdu" />
              <Field
                label="Display order"
                type="number"
                min="0"
                value={form.order}
                onChange={(e) => setValue('order', e.target.value)}
                hint={isEdit ? 'Lower numbers appear first' : 'Leave empty to add at the end'}
              />
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
              <Switch checked={form.isActive} onChange={(v) => setValue('isActive', v)} label="Show on website" />
              <div>
                <p className="text-sm font-medium text-slate-900">{form.isActive ? 'Visible on the website' : 'Hidden from the website'}</p>
                <p className="text-xs text-slate-500">Hidden doctors stay saved here but don't appear anywhere on the site.</p>
              </div>
            </div>
          </Section>

          <Section title="Role & qualifications">
            <LocalizedField label="Specialty / title" value={form.specialty} onChange={(lang, v) => setLocalized('specialty', lang, v)} errorKey="specialty" errors={errors} required placeholder="Senior Laparoscopic & GI Surgeon" />
            <LocalizedField label="Sub-specialty" value={form.subSpecialty} onChange={(lang, v) => setLocalized('subSpecialty', lang, v)} errorKey="subSpecialty" errors={errors} placeholder="Advanced GI & Laparoscopic Surgery" />
            <LocalizedField label="Department" value={form.department} onChange={(lang, v) => setLocalized('department', lang, v)} errorKey="department" errors={errors} placeholder="Laparoscopic & General Surgery" />
            <LocalizedField label="Degrees" value={form.degrees} onChange={(lang, v) => setLocalized('degrees', lang, v)} errorKey="degrees" errors={errors} placeholder="MBBS, MS (General Surgery)" />
          </Section>

          <Section
            title="Specialty filters"
            description='Tick every specialty this doctor should appear under in the "Select Speciality" filter on the Book Appointment page.'
          >
            <fieldset>
              <legend className="sr-only">Specialty filters</legend>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {SPECIALTY_TAGS.map((tag) => {
                  const checked = form.specialtyTags.includes(tag.id)
                  return (
                    <label
                      key={tag.id}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                        checked ? 'border-[#0091da] bg-sky-50 text-slate-900' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setValue(
                            'specialtyTags',
                            checked ? form.specialtyTags.filter((t) => t !== tag.id) : [...form.specialtyTags, tag.id],
                          )
                        }
                        className="h-4 w-4 rounded border-slate-300 accent-[#003a70]"
                      />
                      {tag.en}
                    </label>
                  )
                })}
              </div>
            </fieldset>
            {form.specialtyTags.length === 0 && (
              <p className="text-xs text-amber-700">
                With nothing ticked, this doctor only appears when no specialty is selected.
              </p>
            )}
          </Section>

          <Section title="OPD details">
            <LocalizedField label="OPD timing" value={form.timing} onChange={(lang, v) => setLocalized('timing', lang, v)} errorKey="timing" errors={errors} placeholder="10:00 - 16:00 • Mon - Sat" />
            <LocalizedField label="Hospital / clinic" value={form.hospital} onChange={(lang, v) => setLocalized('hospital', lang, v)} errorKey="hospital" errors={errors} />
          </Section>

          <Section
            title="Online appointments"
            description="These hours create the bookable time slots on the website's Book Appointment page. Use Settings → Leave & holidays to block specific dates."
          >
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <Field
                as="select"
                label="Slot plan"
                value={form.schedulePlan}
                onChange={(e) => choosePlan(e.target.value)}
                error={errors.schedulePlan}
                hint={
                  plans.length === 0 ? (
                    <>
                      No plans yet. Create reusable plans in{' '}
                      <Link to={ADMIN_PATHS.slotPlans} className="font-medium text-[#0091da] hover:underline">
                        Settings → Slot plans
                      </Link>
                      .
                    </>
                  ) : (
                    'Choosing a plan copies its hours below.'
                  )
                }
              >
                <option value="">No plan (this doctor's own hours)</option>
                {plans.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </Field>
              {currentPlan &&
                (followsPlan ? (
                  <p className="mt-3 text-sm text-emerald-700">
                    Following <strong>{currentPlan.name}</strong>: when the plan is edited, this doctor's hours update too.
                  </p>
                ) : (
                  <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-900">
                    <p className="min-w-0 flex-1">
                      <strong>Customized</strong> from {currentPlan.name}: this doctor keeps the hours below and won't get plan updates.
                      <span className="mt-0.5 block text-xs text-amber-800">Plan: {describeSchedule(currentPlan.schedule)}</span>
                    </p>
                    <Button variant="secondary" size="sm" onClick={() => choosePlan(currentPlan._id)}>
                      <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset to plan
                    </Button>
                  </div>
                ))}
            </div>
            <ScheduleEditor
              value={form.schedule}
              onChange={(schedule) => {
                setForm((f) => ({ ...f, schedule }))
                setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !k.startsWith('schedule.'))))
              }}
              errors={errors}
            />
          </Section>

          <Section title="About" description="The short bio is used for search on the doctors list; the full profile appears on the doctor's page.">
            <LocalizedField label="Short bio" value={form.bio} onChange={(lang, v) => setLocalized('bio', lang, v)} errorKey="bio" errors={errors} as="textarea" rows={3} />
            <LocalizedField label="Full profile" value={form.about} onChange={(lang, v) => setLocalized('about', lang, v)} errorKey="about" errors={errors} as="textarea" rows={7} />
          </Section>

          <Section title="Key specializations" description="Shown as a checklist on the doctor's profile page.">
            <LocalizedListEditor
              items={form.specializations}
              onChange={(items) => setValue('specializations', items)}
              itemLabel="Specialization"
              addLabel="Add specialization"
              emptyText="No specializations added yet."
              max={30}
            />
          </Section>

          <Section title="Education & fellowships">
            {form.education.length === 0 && <p className="text-sm text-slate-500">No qualifications added yet.</p>}
            {form.education.map((row, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="grid flex-1 gap-2 sm:grid-cols-2">
                  <input
                    aria-label={`Qualification ${index + 1}`}
                    value={row.degree}
                    onChange={(e) => updateRow('education', index, 'degree', e.target.value)}
                    placeholder="Degree or fellowship, e.g. MS (General Surgery)"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40"
                  />
                  <input
                    aria-label={`Institution ${index + 1}`}
                    value={row.institution}
                    onChange={(e) => updateRow('education', index, 'institution', e.target.value)}
                    placeholder="Institution"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40"
                  />
                </div>
                <Button variant="dangerGhost" size="icon" onClick={() => removeRow('education', index)} aria-label={`Remove qualification ${index + 1}`}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="secondary" size="sm" onClick={() => addRow('education', { degree: '', institution: '' })}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Add qualification
            </Button>
          </Section>

          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:left-64">
            <div className="mx-auto flex max-w-5xl items-center justify-end gap-3">
              <Button variant="secondary" onClick={() => navigate(ADMIN_PATHS.doctors)}>
                Cancel
              </Button>
              <Button type="submit" loading={saving}>
                {isEdit ? 'Save changes' : 'Add doctor'}
              </Button>
            </div>
          </div>
        </form>
      )}
    </AdminLayout>
  )
}
