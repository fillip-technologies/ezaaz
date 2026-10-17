import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowLeft, CalendarClock, Pencil, Plus, Search, Trash2, UserPlus } from 'lucide-react'
import { adminDoctorsApi, adminSlotPlansApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Link, Modal, Spinner } from '../components/ui'
import { ADMIN_PATHS, navigate, slotPlanEditPath, takeFlash } from '../navigation'
import { describeSchedule } from '../scheduleOptions'

const bookingsWarning = (n) =>
  n ? ` ${n} upcoming appointment${n === 1 ? ' is' : 's are'} now outside the new hours: check them in Appointments.` : ''

// Reusable schedules ("slot packages") that can be assigned to many doctors at once
export default function SlotPlansView({ path }) {
  const [plans, setPlans] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState(takeFlash)

  const [assigning, setAssigning] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const load = useCallback(() => Promise.all([adminSlotPlansApi.list(), adminDoctorsApi.list()]), [])

  useEffect(() => {
    let cancelled = false
    load()
      .then(([planList, doctorList]) => {
        if (cancelled) return
        setPlans(planList)
        setDoctors(doctorList)
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [load])

  const reload = async () => {
    const [planList, doctorList] = await load()
    setPlans(planList)
    setDoctors(doctorList)
  }

  const planNames = useMemo(() => new Map(plans.map((p) => [p._id, p.name])), [plans])
  const unassigned = doctors.filter((d) => !d.schedulePlan).length

  return (
    <AdminLayout
      path={path}
      title="Slot plans"
      actions={
        <div className="flex items-center gap-2">
          <Link
            to={ADMIN_PATHS.settings}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Settings</span>
          </Link>
          <Button onClick={() => navigate(ADMIN_PATHS.newSlotPlan)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">New plan</span>
          </Button>
        </div>
      }
    >
      <div className="mx-auto max-w-4xl space-y-4">
        <Alert type="success">{notice}</Alert>
        <Alert>{error}</Alert>

        <p className="text-sm text-slate-500">
          Create a plan once (weekly hours, slot length, patients per slot) and assign it to many doctors. Editing a plan updates every
          doctor following it. A doctor whose hours you change on their own page becomes <em>customized</em> and keeps their own hours.
        </p>

        {loading ? (
          <Spinner label="Loading slot plans…" />
        ) : plans.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <CalendarClock className="mx-auto h-8 w-8 text-slate-300" aria-hidden="true" />
            <p className="mt-3 font-medium text-slate-900">No slot plans yet</p>
            <p className="mt-1 text-sm text-slate-500">For example "Morning OPD", "Evening OPD" or "Surgeon – 3 days a week".</p>
            <Button className="mt-5" onClick={() => navigate(ADMIN_PATHS.newSlotPlan)}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Create the first plan
            </Button>
          </div>
        ) : (
          <ul className="space-y-3">
            {plans.map((plan) => (
              <li key={plan._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => navigate(slotPlanEditPath(plan._id))}
                      className="text-left font-semibold text-slate-900 hover:text-[#0091da]"
                    >
                      {plan.name}
                    </button>
                    {plan.description && <p className="text-sm text-slate-500">{plan.description}</p>}
                    <p className="mt-1.5 text-sm text-slate-700">{describeSchedule(plan.schedule)}</p>
                    <p className="mt-1.5 text-xs text-slate-500">
                      {plan.followingCount + plan.customizedCount === 0
                        ? 'Not assigned to any doctor'
                        : `${plan.followingCount} doctor${plan.followingCount === 1 ? '' : 's'} following`}
                      {plan.customizedCount > 0 && ` · ${plan.customizedCount} customized`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="secondary" size="sm" onClick={() => setAssigning(plan)}>
                      <UserPlus className="h-4 w-4" aria-hidden="true" /> Assign
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => navigate(slotPlanEditPath(plan._id))} aria-label={`Edit ${plan.name}`}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="dangerGhost" size="icon" onClick={() => setDeleting(plan)} aria-label={`Delete ${plan.name}`}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!loading && plans.length > 0 && unassigned > 0 && (
          <p className="text-xs text-slate-500">
            {unassigned} doctor{unassigned === 1 ? ' has' : 's have'} their own hours without a plan.
          </p>
        )}
      </div>

      <AssignModal
        plan={assigning}
        doctors={doctors}
        planNames={planNames}
        onClose={() => setAssigning(null)}
        onDone={async (result, plan) => {
          setAssigning(null)
          setNotice(`"${plan.name}" assigned to ${result.assigned} doctor${result.assigned === 1 ? '' : 's'}.${bookingsWarning(result.bookingsOutsideHours)}`)
          await reload().catch((err) => setError(err.message))
        }}
      />

      <DeleteModal
        plan={deleting}
        onClose={() => setDeleting(null)}
        onDone={async (result, plan) => {
          setDeleting(null)
          setNotice(
            `"${plan.name}" was deleted.${
              result.doctorsUnlinked ? ` ${result.doctorsUnlinked} doctor${result.doctorsUnlinked === 1 ? ' keeps' : 's keep'} the same hours as their own.` : ''
            }`,
          )
          await reload().catch((err) => setError(err.message))
        }}
      />
    </AdminLayout>
  )
}

function doctorPlanLabel(doctor, planNames) {
  if (doctor.schedulePlan) {
    const name = planNames.get(doctor.schedulePlan) || 'a plan'
    return doctor.scheduleCustomized ? `Customized from ${name}` : `Following ${name}`
  }
  return doctor.schedule?.weekly?.length ? 'Own hours' : 'No online hours'
}

// Tick doctors -> they all get this plan's hours
function AssignModal({ plan, doctors, planNames, onClose, onDone }) {
  const [selected, setSelected] = useState(() => new Set())
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [openFor, setOpenFor] = useState(null)

  // Fresh state each time the modal opens for a plan: pre-tick doctors already following it
  if (plan && openFor !== plan._id) {
    setOpenFor(plan._id)
    setSelected(new Set(doctors.filter((d) => d.schedulePlan === plan._id && !d.scheduleCustomized).map((d) => d._id)))
    setSearch('')
    setError('')
  }
  if (!plan && openFor !== null) setOpenFor(null)

  const visible = doctors.filter((d) => {
    const q = search.trim().toLowerCase()
    return !q || [d.name?.en, d.specialty?.en].some((v) => v?.toLowerCase().includes(q))
  })
  const toggle = (id) =>
    setSelected((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const allVisibleSelected = visible.length > 0 && visible.every((d) => selected.has(d._id))
  const toggleAll = () =>
    setSelected((s) => {
      const next = new Set(s)
      for (const d of visible) {
        if (allVisibleSelected) next.delete(d._id)
        else next.add(d._id)
      }
      return next
    })

  // Doctors whose current hours will be replaced
  const replacing = doctors.filter(
    (d) => selected.has(d._id) && !(d.schedulePlan === plan?._id && !d.scheduleCustomized) && d.schedule?.weekly?.length,
  ).length

  const onAssign = async () => {
    setSaving(true)
    setError('')
    try {
      onDone(await adminSlotPlansApi.assign(plan._id, [...selected]), plan)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={Boolean(plan)}
      title={plan ? `Assign "${plan.name}"` : ''}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={saving} disabled={selected.size === 0} onClick={onAssign}>
            Assign to {selected.size} doctor{selected.size === 1 ? '' : 's'}
          </Button>
        </>
      }
    >
      {plan && (
        <div className="space-y-3 text-sm">
          <Alert>{error}</Alert>
          <p className="rounded-lg bg-slate-50 px-3.5 py-2.5 text-slate-700">{describeSchedule(plan.schedule)}</p>
          <div className="flex items-center gap-2">
            <label className="relative flex-1">
              <span className="sr-only">Search doctors</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctors"
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40"
              />
            </label>
            <Button variant="ghost" size="sm" onClick={toggleAll} disabled={visible.length === 0}>
              {allVisibleSelected ? 'Clear all' : 'Select all'}
            </Button>
          </div>
          <ul className="max-h-72 divide-y divide-slate-100 overflow-y-auto rounded-lg border border-slate-200">
            {visible.map((d) => (
              <li key={d._id}>
                <label className="flex cursor-pointer items-center gap-3 px-3.5 py-2.5 hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={selected.has(d._id)}
                    onChange={() => toggle(d._id)}
                    className="h-4 w-4 rounded border-slate-300 accent-[#003a70]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-slate-900">
                      {d.name.en}
                      {!d.isActive && <span className="ml-1.5 text-xs font-normal text-slate-400">(hidden)</span>}
                    </span>
                    <span className="block truncate text-xs text-slate-500">{doctorPlanLabel(d, planNames)}</span>
                  </span>
                </label>
              </li>
            ))}
            {visible.length === 0 && <li className="px-3.5 py-6 text-center text-slate-500">No doctors match.</li>}
          </ul>
          {replacing > 0 && (
            <p className="rounded-lg bg-amber-50 px-3.5 py-2.5 text-amber-800">
              {replacing} selected doctor{replacing === 1 ? "'s" : "s'"} current hours will be replaced by this plan. Upcoming bookings are
              kept.
            </p>
          )}
        </div>
      )}
    </Modal>
  )
}

function DeleteModal({ plan, onClose, onDone }) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const used = plan ? plan.followingCount + plan.customizedCount : 0

  const onDelete = async () => {
    setSaving(true)
    setError('')
    try {
      onDone(await adminSlotPlansApi.remove(plan._id), plan)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={Boolean(plan)}
      title="Delete slot plan"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" loading={saving} onClick={onDelete}>
            Delete plan
          </Button>
        </>
      }
    >
      {plan && (
        <div className="space-y-3 text-sm text-slate-600">
          <Alert>{error}</Alert>
          <p>
            Delete <strong className="text-slate-900">{plan.name}</strong>?
          </p>
          {used > 0 && (
            <p>
              {used} doctor{used === 1 ? ' uses' : 's use'} it. They keep their current hours and appointments; they're just no longer linked
              to a plan.
            </p>
          )}
        </div>
      )}
    </Modal>
  )
}
