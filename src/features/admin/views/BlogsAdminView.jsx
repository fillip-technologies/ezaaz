import { useCallback, useEffect, useMemo, useState } from 'react'
import { ExternalLink, FolderCog, ImageOff, Pencil, Plus, Search, Star, Trash2 } from 'lucide-react'
import { adminBlogsApi, assetUrl } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Modal, Spinner } from '../components/ui'
import { ADMIN_PATHS, blogEditPath, navigate, takeFlash } from '../navigation'
import { blogStatus } from '../blogOptions'

const formatDate = (value) =>
  value ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value)) : '—'

export default function BlogsAdminView({ path }) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState(takeFlash)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [busyId, setBusyId] = useState('')

  const [deleting, setDeleting] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    adminBlogsApi
      .list()
      .then((list) => !cancelled && setBlogs(list))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return blogs.filter((b) => {
      if (statusFilter !== 'all' && blogStatus(b).key !== statusFilter) return false
      if (!q) return true
      return [b.title?.en, b.title?.hi, b.slug, b.category?.name?.en, ...(b.tags || [])].some((v) => v?.toLowerCase().includes(q))
    })
  }, [blogs, search, statusFilter])

  const counts = useMemo(() => {
    const c = { all: blogs.length, published: 0, scheduled: 0, draft: 0 }
    for (const b of blogs) c[blogStatus(b).key]++
    return c
  }, [blogs])

  const patchBlog = async (blog, changes, message) => {
    setBusyId(blog._id)
    setError('')
    try {
      const updated = await adminBlogsApi.update(blog._id, changes)
      setBlogs((list) => list.map((b) => (b._id === blog._id ? { ...b, ...changes } : b)))
      setNotice(message(updated))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId('')
    }
  }

  const closeDelete = useCallback(() => {
    setDeleting(null)
    setDeleteError('')
  }, [])

  const confirmDelete = async () => {
    setDeleteLoading(true)
    setDeleteError('')
    try {
      await adminBlogsApi.remove(deleting._id)
      setBlogs((list) => list.filter((b) => b._id !== deleting._id))
      setNotice(`"${deleting.title.en}" was deleted.`)
      setDeleting(null)
    } catch (err) {
      setDeleteError(err.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <AdminLayout
      path={path}
      title="Blogs"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => navigate(ADMIN_PATHS.blogCategories)}>
            <FolderCog className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Categories</span>
          </Button>
          <Button onClick={() => navigate(ADMIN_PATHS.newBlog)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">New article</span>
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Alert type="success">{notice}</Alert>
        <Alert>{error}</Alert>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search articles</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, category or tag"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40"
            />
          </label>
          <label>
            <span className="sr-only">Filter by status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40 sm:w-48"
            >
              <option value="all">All ({counts.all})</option>
              <option value="published">Published ({counts.published})</option>
              <option value="scheduled">Scheduled ({counts.scheduled})</option>
              <option value="draft">Drafts ({counts.draft})</option>
            </select>
          </label>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <Spinner label="Loading articles…" />
          ) : blogs.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="font-medium text-slate-900">No articles yet</p>
              <p className="mt-1 text-sm text-slate-500">Published articles appear on the website's blog and home page.</p>
              <Button className="mt-5" onClick={() => navigate(ADMIN_PATHS.newBlog)}>
                <Plus className="h-4 w-4" aria-hidden="true" /> Write the first article
              </Button>
            </div>
          ) : visible.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-slate-500">No articles match your filters.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {visible.map((blog) => {
                const status = blogStatus(blog)
                return (
                  <li key={blog._id} className="flex flex-wrap items-center gap-4 px-4 py-3 sm:flex-nowrap sm:px-5">
                    {blog.coverImage ? (
                      <img src={assetUrl(blog.coverImage)} alt="" className="h-14 w-20 shrink-0 rounded-lg border border-slate-200 bg-slate-100 object-cover" />
                    ) : (
                      <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-400">
                        <ImageOff className="h-5 w-5" aria-hidden="true" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => navigate(blogEditPath(blog._id))}
                        className="block max-w-full truncate text-left font-semibold text-slate-900 hover:text-[#0091da]"
                      >
                        {blog.title.en}
                      </button>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className={`rounded-full px-2 py-0.5 font-medium ${status.className}`}>{status.label}</span>
                        <span>{blog.category?.name?.en || 'No category'}</span>
                        <span>{formatDate(blog.publishedAt)}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={busyId === blog._id}
                        onClick={() =>
                          patchBlog(blog, { isFeatured: !blog.isFeatured }, (b) =>
                            b.isFeatured ? `"${b.title.en}" is now featured first on the home page.` : `"${b.title.en}" is no longer featured.`,
                          )
                        }
                        aria-label={blog.isFeatured ? `Unfeature ${blog.title.en}` : `Feature ${blog.title.en} on the home page`}
                        aria-pressed={blog.isFeatured}
                        title={blog.isFeatured ? 'Featured on the home page' : 'Feature on the home page'}
                      >
                        <Star className={`h-4 w-4 ${blog.isFeatured ? 'fill-amber-400 text-amber-500' : ''}`} />
                      </Button>
                      {status.key === 'published' && (
                        <a
                          href={`/blog-details?id=${blog.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                          aria-label={`View ${blog.title.en} on the website`}
                          title="View on website"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => navigate(blogEditPath(blog._id))} aria-label={`Edit ${blog.title.en}`}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="dangerGhost" size="icon" onClick={() => setDeleting(blog)} aria-label={`Delete ${blog.title.en}`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <Modal
        open={Boolean(deleting)}
        title="Delete article"
        onClose={closeDelete}
        footer={
          <>
            <Button variant="secondary" onClick={closeDelete}>
              Cancel
            </Button>
            <Button variant="danger" loading={deleteLoading} onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Alert>{deleteError}</Alert>
          <p className="text-sm text-slate-600">
            Delete <strong className="text-slate-900">"{deleting?.title?.en}"</strong> and its cover image? It will be removed
            from the website immediately. This can't be undone. To take it off the website temporarily, set it to{' '}
            <em>Draft</em> instead.
          </p>
        </div>
      </Modal>
    </AdminLayout>
  )
}

