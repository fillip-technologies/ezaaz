import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { adminSlotPlansApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import ScheduleEditor from '../components/ScheduleEditor'
import { Section } from '../components/formParts'
import { Alert, Button, Field, Link, Spinner } from '../components/ui'
import { ADMIN_PATHS, navigate, setFlash } from '../navigation'
import { EMPTY_SCHEDULE, scheduleToForm, scheduleToPayload, validateSchedule } from '../scheduleOptions'

const EMPTY_FORM = { name: '', description: '', schedule: EMPTY_SCHEDULE }

// Create / edit one slot plan. Saving an existing plan updates every doctor still following it.
export default function SlotPlanFormView({ path, id }) {
  const isEdit = Boolean(id)
  const [form, setForm] = useState(EMPTY_FORM)
  const [usage, setUsage] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(isEdit)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    let cancelled = false
    // The list endpoint carries the "doctors following" counts shown above Save
    Promise.all([adminSlotPlansApi.get(id), adminSlotPlansApi.list()])
      .then(([plan, list]) => {
        if (cancelled) return
        setForm({ name: plan.name, description: plan.description || '', schedule: scheduleToForm(plan.schedule) })
        const row = list.find((p) => p._id === id)
        setUsage(row ? { following: row.followingCount, customized: row.customizedCount } : null)
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

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const clientErrors = validateSchedule(form.schedule)
    if (!form.name.trim()) clientErrors.name = 'Enter a plan name'
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors)
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' })
      return
    }

    setSaving(true)
    setStatus({ type: '', message: '' })
    const payload = { name: form.name.trim(), description: form.description.trim(), schedule: scheduleToPayload(form.schedule) }
    try {
      if (!isEdit) {
        const plan = await adminSlotPlansApi.create(payload)
        setFlash(`"${plan.name}" was created. Use Assign to give it to doctors.`)
      } else {
        const { plan, doctorsUpdated, customizedSkipped, bookingsOutsideHours } = await adminSlotPlansApi.update(id, payload)
        const parts = [`"${plan.name}" was saved.`]
        if (doctorsUpdated) parts.push(`${doctorsUpdated} doctor${doctorsUpdated === 1 ? '' : 's'} updated.`)
        if (customizedSkipped) parts.push(`${customizedSkipped} customized doctor${customizedSkipped === 1 ? ' was' : 's were'} not changed.`)
        if (bookingsOutsideHours)
          parts.push(`${bookingsOutsideHours} upcoming appointment${bookingsOutsideHours === 1 ? ' is' : 's are'} now outside the new hours: check them in Appointments.`)
        setFlash(parts.join(' '))
      }
      navigate(ADMIN_PATHS.slotPlans, { replace: true })
    } catch (err) {
      if (err.details?.length) setErrors(Object.fromEntries(err.details.map((d) => [d.field, d.message])))
      setStatus({ type: 'error', message: err.message.startsWith('Duplicate') ? 'A plan with this name already exists.' : err.message })
      setSaving(false)
    }
  }

  return (
    <AdminLayout
      path={path}
      title={isEdit ? (form.name ? `Edit ${form.name}` : 'Edit slot plan') : 'New slot plan'}
      actions={
        <Link
          to={ADMIN_PATHS.slotPlans}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">All plans</span>
        </Link>
      }
    >
      {loading ? (
        <Spinner label="Loading plan…" />
      ) : loadError ? (
        <div className="max-w-xl space-y-4">
          <Alert>{loadError}</Alert>
          <Link to={ADMIN_PATHS.slotPlans} className="text-sm font-medium text-[#0091da] hover:underline">
            Back to slot plans
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mx-auto max-w-5xl space-y-6 pb-24">
          <Alert type={status.type || 'error'}>{status.message}</Alert>

          <Section title="Plan">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Plan name *"
                maxLength={80}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                error={errors.name}
                placeholder="e.g. Morning OPD (Mon–Sat)"
              />
              <Field
                label="Description"
                maxLength={200}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                hint="Optional, only visible to admins"
              />
            </div>
          </Section>

          <Section title="Hours & slots" description="Doctors assigned to this plan get these bookable slots on the website.">
            <ScheduleEditor
              value={form.schedule}
              onChange={(schedule) => {
                setForm((f) => ({ ...f, schedule }))
                setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !k.startsWith('schedule.'))))
              }}
              errors={errors}
            />
          </Section>

          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:left-64">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-end gap-3">
              {isEdit && usage && usage.following + usage.customized > 0 && (
                <p className="mr-auto text-xs text-slate-500">
                  Saving updates {usage.following} doctor{usage.following === 1 ? '' : 's'} following this plan
                  {usage.customized ? ` (${usage.customized} customized will keep their own hours)` : ''}.
                </p>
              )}
              <Button variant="secondary" onClick={() => navigate(ADMIN_PATHS.slotPlans)}>
                Cancel
              </Button>
              <Button type="submit" loading={saving}>
                {isEdit ? 'Save plan' : 'Create plan'}
              </Button>
            </div>
          </div>
        </form>
      )}
    </AdminLayout>
  )
}
