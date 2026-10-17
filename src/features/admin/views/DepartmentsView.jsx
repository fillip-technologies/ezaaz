import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Pencil, Plus, Trash2, X } from 'lucide-react'
import { adminDepartmentsApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Field, Link, Spinner, Switch } from '../components/ui'
import { ADMIN_PATHS } from '../navigation'

const EMPTY = { en: '', hi: '', slug: '', order: '' }

const toPayload = (draft) => ({
  name: { en: draft.en.trim(), hi: draft.hi.trim() },
  ...(draft.slug.trim() && { slug: draft.slug.trim().toLowerCase() }),
  ...(draft.order !== '' && { order: Number(draft.order) }),
})

// Departments are the "Department / Specialty" dropdown on the website's contact form
export default function DepartmentsView({ path }) {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [newDraft, setNewDraft] = useState(EMPTY)
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState('')
  const [editDraft, setEditDraft] = useState(EMPTY)
  const [busyId, setBusyId] = useState('')

  useEffect(() => {
    let cancelled = false
    adminDepartmentsApi
      .list()
      .then((list) => !cancelled && setDepartments(list))
      .catch((err) => !cancelled && setStatus({ type: 'error', message: err.message }))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  const reload = async () => setDepartments(await adminDepartmentsApi.list())

  const onAdd = async (e) => {
    e.preventDefault()
    if (!newDraft.en.trim()) return setStatus({ type: 'error', message: 'Enter the department name in English.' })
    setAdding(true)
    try {
      const created = await adminDepartmentsApi.create(toPayload(newDraft))
      await reload()
      setNewDraft(EMPTY)
      setStatus({ type: 'success', message: `"${created.name.en}" was added.` })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setAdding(false)
    }
  }

  const startEdit = (d) => {
    setEditingId(d._id)
    setEditDraft({ en: d.name.en, hi: d.name.hi || '', slug: d.slug, order: String(d.order) })
  }

  const onSaveEdit = async (d) => {
    if (!editDraft.en.trim()) return setStatus({ type: 'error', message: 'Enter the department name in English.' })
    setBusyId(d._id)
    try {
      const updated = await adminDepartmentsApi.update(d._id, toPayload(editDraft))
      await reload()
      setEditingId('')
      setStatus({ type: 'success', message: `"${updated.name.en}" was updated.` })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setBusyId('')
    }
  }

  const onToggleActive = async (d, isActive) => {
    setBusyId(d._id)
    try {
      await adminDepartmentsApi.update(d._id, { isActive })
      setDepartments((list) => list.map((x) => (x._id === d._id ? { ...x, isActive } : x)))
      setStatus({
        type: 'success',
        message: isActive ? `"${d.name.en}" now shows on the contact form.` : `"${d.name.en}" is hidden from the contact form.`,
      })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setBusyId('')
    }
  }

  const onDelete = async (d) => {
    const note = d.enquiryCount ? ` Its ${d.enquiryCount} past enquir${d.enquiryCount === 1 ? 'y keeps' : 'ies keep'} the department name.` : ''
    if (!window.confirm(`Delete the department "${d.name.en}"?${note}`)) return
    setBusyId(d._id)
    try {
      await adminDepartmentsApi.remove(d._id)
      setDepartments((list) => list.filter((x) => x._id !== d._id))
      setStatus({ type: 'success', message: `"${d.name.en}" was deleted.` })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setBusyId('')
    }
  }

  return (
    <AdminLayout
      path={path}
      title="Departments"
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
          <h2 className="text-base font-semibold text-slate-900">Add department</h2>
          <p className="mt-1 text-sm text-slate-500">
            Active departments appear in the "Department / Specialty" dropdown on the website's contact form, in display order.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Name (English) *" value={newDraft.en} onChange={(e) => setNewDraft((d) => ({ ...d, en: e.target.value }))} />
            <Field label="Name (हिन्दी)" lang="hi" value={newDraft.hi} onChange={(e) => setNewDraft((d) => ({ ...d, hi: e.target.value }))} hint="Optional" />
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit" loading={adding}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Add department
            </Button>
          </div>
        </form>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <Spinner label="Loading departments…" />
          ) : departments.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-slate-500">No departments yet. Add one above.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {departments.map((d) =>
                editingId === d._id ? (
                  <li key={d._id} className="space-y-3 bg-sky-50/50 px-4 py-4 sm:px-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Name (English) *" value={editDraft.en} onChange={(e) => setEditDraft((x) => ({ ...x, en: e.target.value }))} />
                      <Field label="Name (हिन्दी)" lang="hi" value={editDraft.hi} onChange={(e) => setEditDraft((x) => ({ ...x, hi: e.target.value }))} />
                      <Field label="Key" value={editDraft.slug} onChange={(e) => setEditDraft((x) => ({ ...x, slug: e.target.value }))} hint="Lowercase letters, numbers and hyphens" />
                      <Field label="Display order" type="number" min="0" value={editDraft.order} onChange={(e) => setEditDraft((x) => ({ ...x, order: e.target.value }))} hint="Lower numbers appear first" />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => setEditingId('')}>
                        <X className="h-4 w-4" aria-hidden="true" /> Cancel
                      </Button>
                      <Button loading={busyId === d._id} onClick={() => onSaveEdit(d)}>
                        <Check className="h-4 w-4" aria-hidden="true" /> Save
                      </Button>
                    </div>
                  </li>
                ) : (
                  <li key={d._id} className="flex items-center gap-4 px-4 py-3 sm:px-5">
                    <div className="min-w-0 flex-1">
                      <p className={`truncate font-semibold ${d.isActive ? 'text-slate-900' : 'text-slate-400'}`}>{d.name.en}</p>
                      <p className="truncate text-xs text-slate-500">
                        {d.name.hi && <span lang="hi">{d.name.hi} · </span>}
                        {d.enquiryCount} enquir{d.enquiryCount === 1 ? 'y' : 'ies'} · order {d.order}
                        {!d.isActive && ' · hidden'}
                      </p>
                    </div>
                    <Switch
                      checked={d.isActive}
                      disabled={busyId === d._id}
                      onChange={(value) => onToggleActive(d, value)}
                      label={d.isActive ? `Hide ${d.name.en} from the contact form` : `Show ${d.name.en} on the contact form`}
                    />
                    <Button variant="ghost" size="icon" onClick={() => startEdit(d)} aria-label={`Edit ${d.name.en}`}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="dangerGhost"
                      size="icon"
                      disabled={busyId === d._id}
                      onClick={() => onDelete(d)}
                      aria-label={`Delete ${d.name.en}`}
                      title="Delete department"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
