import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Pencil, Plus, Trash2, X } from 'lucide-react'
import { adminBlogCategoriesApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Field, Link, Spinner } from '../components/ui'
import { ADMIN_PATHS } from '../navigation'

const EMPTY = { en: '', hi: '', slug: '', order: '' }

const toPayload = (draft) => ({
  name: { en: draft.en.trim(), hi: draft.hi.trim() },
  ...(draft.slug.trim() && { slug: draft.slug.trim().toLowerCase() }),
  ...(draft.order !== '' && { order: Number(draft.order) }),
})

// Categories are the filter tabs on the website's blog page
export default function BlogCategoriesView({ path }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [newDraft, setNewDraft] = useState(EMPTY)
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState('')
  const [editDraft, setEditDraft] = useState(EMPTY)
  const [busyId, setBusyId] = useState('')

  useEffect(() => {
    let cancelled = false
    adminBlogCategoriesApi
      .list()
      .then((list) => !cancelled && setCategories(list))
      .catch((err) => !cancelled && setStatus({ type: 'error', message: err.message }))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  const reload = async () => setCategories(await adminBlogCategoriesApi.list())

  const onAdd = async (e) => {
    e.preventDefault()
    if (!newDraft.en.trim()) return setStatus({ type: 'error', message: 'Enter the category name in English.' })
    setAdding(true)
    try {
      const created = await adminBlogCategoriesApi.create(toPayload(newDraft))
      await reload()
      setNewDraft(EMPTY)
      setStatus({ type: 'success', message: `"${created.name.en}" was added.` })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setAdding(false)
    }
  }

  const startEdit = (c) => {
    setEditingId(c._id)
    setEditDraft({ en: c.name.en, hi: c.name.hi || '', slug: c.slug, order: String(c.order) })
  }

  const onSaveEdit = async (c) => {
    if (!editDraft.en.trim()) return setStatus({ type: 'error', message: 'Enter the category name in English.' })
    setBusyId(c._id)
    try {
      const updated = await adminBlogCategoriesApi.update(c._id, toPayload(editDraft))
      await reload()
      setEditingId('')
      setStatus({ type: 'success', message: `"${updated.name.en}" was updated.` })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setBusyId('')
    }
  }

  const onDelete = async (c) => {
    if (!window.confirm(`Delete the category "${c.name.en}"?`)) return
    setBusyId(c._id)
    try {
      await adminBlogCategoriesApi.remove(c._id)
      setCategories((list) => list.filter((x) => x._id !== c._id))
      setStatus({ type: 'success', message: `"${c.name.en}" was deleted.` })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setBusyId('')
    }
  }

  return (
    <AdminLayout
      path={path}
      title="Blog categories"
      actions={
        <Link
          to={ADMIN_PATHS.blogs}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">All articles</span>
        </Link>
      }
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <Alert type={status.type || 'error'}>{status.message}</Alert>

        <form onSubmit={onAdd} noValidate className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">Add category</h2>
          <p className="mt-1 text-sm text-slate-500">Categories appear as filter tabs on the website's blog page, in display order.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Name (English) *" value={newDraft.en} onChange={(e) => setNewDraft((d) => ({ ...d, en: e.target.value }))} />
            <Field label="Name (हिन्दी)" lang="hi" value={newDraft.hi} onChange={(e) => setNewDraft((d) => ({ ...d, hi: e.target.value }))} hint="Optional" />
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit" loading={adding}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Add category
            </Button>
          </div>
        </form>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <Spinner label="Loading categories…" />
          ) : categories.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-slate-500">No categories yet. Add one above.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {categories.map((c) =>
                editingId === c._id ? (
                  <li key={c._id} className="space-y-3 bg-sky-50/50 px-4 py-4 sm:px-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Name (English) *" value={editDraft.en} onChange={(e) => setEditDraft((d) => ({ ...d, en: e.target.value }))} />
                      <Field label="Name (हिन्दी)" lang="hi" value={editDraft.hi} onChange={(e) => setEditDraft((d) => ({ ...d, hi: e.target.value }))} />
                      <Field label="URL key" value={editDraft.slug} onChange={(e) => setEditDraft((d) => ({ ...d, slug: e.target.value }))} hint="Lowercase letters, numbers and hyphens" />
                      <Field label="Display order" type="number" min="0" value={editDraft.order} onChange={(e) => setEditDraft((d) => ({ ...d, order: e.target.value }))} hint="Lower numbers appear first" />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => setEditingId('')}>
                        <X className="h-4 w-4" aria-hidden="true" /> Cancel
                      </Button>
                      <Button loading={busyId === c._id} onClick={() => onSaveEdit(c)}>
                        <Check className="h-4 w-4" aria-hidden="true" /> Save
                      </Button>
                    </div>
                  </li>
                ) : (
                  <li key={c._id} className="flex items-center gap-4 px-4 py-3 sm:px-5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">{c.name.en}</p>
                      <p className="truncate text-xs text-slate-500">
                        {c.name.hi && <span lang="hi">{c.name.hi} · </span>}
                        {c.postCount} article{c.postCount === 1 ? '' : 's'} · order {c.order}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => startEdit(c)} aria-label={`Edit ${c.name.en}`}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="dangerGhost"
                      size="icon"
                      disabled={busyId === c._id || c.postCount > 0}
                      onClick={() => onDelete(c)}
                      aria-label={`Delete ${c.name.en}`}
                      title={c.postCount > 0 ? 'Move its articles to another category first' : 'Delete category'}
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
