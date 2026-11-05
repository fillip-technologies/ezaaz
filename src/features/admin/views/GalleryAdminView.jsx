import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  FolderCog,
  House,
  ImagePlus,
  Pencil,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
  Upload,
  X,
} from 'lucide-react'
import { adminGalleryApi, adminGalleryCategoriesApi, assetUrl } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import GalleryItemModal from '../components/GalleryItemModal'
import { Alert, Button, Modal, Spinner } from '../components/ui'
import { ADMIN_PATHS, navigate } from '../navigation'
import { IMAGE_TYPES, PHOTO_MAX_MB, moveWithin, uploadBatches, youtubeThumb } from '../galleryOptions'

const byOrder = (a, b) => a.order - b.order || new Date(b.createdAt) - new Date(a.createdAt)
const upsert = (list, item) => [...list.filter((i) => i._id !== item._id), item].sort(byOrder)
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`

const selectClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40'

// Why a video isn't on the website even though it's visible
function videoProblem(video) {
  if (video.youtubeId) return ''
  if (!video.videoFile) return 'No video yet: add a YouTube link or upload a file'
  if (!video.image) return 'Add a thumbnail to show it on the website'
  return ''
}

const videoThumb = (video) => (video.image ? assetUrl(video.image) : video.youtubeId ? youtubeThumb(video.youtubeId) : '')

function PhotoUploader({ categories, onUploaded }) {
  const [files, setFiles] = useState([])
  const [category, setCategory] = useState('')
  const [showOnHome, setShowOnHome] = useState(false)
  const [progress, setProgress] = useState('')
  const [error, setError] = useState('')

  const onPick = (e) => {
    const picked = Array.from(e.target.files || [])
    e.target.value = ''
    const rejected = picked.filter((f) => !IMAGE_TYPES.includes(f.type) || f.size > PHOTO_MAX_MB * 1024 * 1024)
    setError(
      rejected.length
        ? `Skipped ${rejected.map((f) => f.name).join(', ')}: only JPG, PNG or WebP images up to ${PHOTO_MAX_MB} MB are allowed.`
        : '',
    )
    setFiles((list) => [...list, ...picked.filter((f) => !rejected.includes(f))])
  }

  const onUpload = async () => {
    setError('')
    let done = 0
    try {
      for (const batch of uploadBatches(files)) {
        setProgress(`Uploading ${done + batch.length} of ${files.length}…`)
        const created = await adminGalleryApi.uploadPhotos(batch, { category, showOnHome })
        done += batch.length
        onUploaded(created)
      }
      setFiles([])
    } catch (err) {
      setFiles((list) => list.slice(done))
      setError(done ? `${done} uploaded, then: ${err.message}` : err.message)
    } finally {
      setProgress('')
    }
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-semibold text-slate-900">Upload photos</h2>
      <p className="mt-1 text-sm text-slate-500">
        Choose one or more JPG, PNG or WebP images (up to {PHOTO_MAX_MB} MB each). New photos appear first; add titles afterwards with the edit button.
      </p>
      <div className="mt-4 space-y-4">
        <Alert>{error}</Alert>
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-within:ring-2 focus-within:ring-[#0091da]">
            <ImagePlus className="h-4 w-4" aria-hidden="true" />
            {files.length ? 'Add more' : 'Choose photos'}
            <input type="file" multiple accept={IMAGE_TYPES.join(',')} onChange={onPick} className="sr-only" disabled={Boolean(progress)} />
          </label>
          {files.length > 0 && (
            <>
              <span className="text-sm text-slate-600">
                {files.length} photo{files.length === 1 ? '' : 's'} selected ({mb(totalSize)})
              </span>
              <Button variant="ghost" size="sm" onClick={() => setFiles([])} disabled={Boolean(progress)}>
                <X className="h-4 w-4" aria-hidden="true" /> Clear
              </Button>
            </>
          )}
        </div>

        {files.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-end">
            <label className="block sm:w-64">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
                <option value="">No category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name.en}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 py-2.5 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showOnHome}
                onChange={(e) => setShowOnHome(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#003a70] focus:ring-[#0091da]"
              />
              Show on home page
            </label>
            <div className="flex flex-1 items-center justify-end gap-3">
              {progress && <span className="text-xs text-slate-500">{progress}</span>}
              <Button onClick={onUpload} loading={Boolean(progress)}>
                <Upload className="h-4 w-4" aria-hidden="true" /> Upload {files.length}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function GalleryAdminView({ path }) {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [tab, setTab] = useState(() => (new URLSearchParams(window.location.search).get('tab') === 'videos' ? 'video' : 'photo'))
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [busyId, setBusyId] = useState('')
  const [editing, setEditing] = useState(null) // { item, type }

  const [deleting, setDeleting] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all([adminGalleryApi.list(), adminGalleryCategoriesApi.list()])
      .then(([list, cats]) => {
        if (cancelled) return
        setItems([...list].sort(byOrder))
        setCategories(cats)
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  const reloadItems = () =>
    adminGalleryApi
      .list()
      .then((list) => setItems([...list].sort(byOrder)))
      .catch(() => {})

  const switchTab = (next) => {
    setTab(next)
    setSearch('')
    setCategoryFilter('all')
    window.history.replaceState(null, '', next === 'video' ? `${ADMIN_PATHS.gallery}?tab=videos` : ADMIN_PATHS.gallery)
  }

  const photos = useMemo(() => items.filter((i) => i.type === 'photo'), [items])
  const videos = useMemo(() => items.filter((i) => i.type === 'video'), [items])
  const tabItems = tab === 'photo' ? photos : videos

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tabItems.filter((i) => {
      if (tab === 'photo' && categoryFilter !== 'all') {
        const id = i.category?._id || ''
        if (categoryFilter === 'none' ? id : id !== categoryFilter) return false
      }
      if (!q) return true
      return [i.title?.en, i.title?.hi, i.label?.en, i.category?.name?.en].some((v) => v?.toLowerCase().includes(q))
    })
  }, [tabItems, tab, categoryFilter, search])

  const homeCount = photos.filter((p) => p.showOnHome && p.isActive).length

  const patchItem = async (item, changes, message) => {
    setBusyId(item._id)
    setError('')
    try {
      const updated = await adminGalleryApi.update(item._id, changes)
      setItems((list) => upsert(list, updated))
      setNotice(message)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId('')
    }
  }

  const move = async (from, to) => {
    const next = moveWithin(tabItems, visible, from, to).map((item, order) => ({ ...item, order }))
    const others = items.filter((i) => i.type !== tab)
    setItems([...others, ...next].sort(byOrder))
    setError('')
    try {
      await adminGalleryApi.reorder(next.map((i) => i._id))
    } catch (err) {
      setError(`The new order wasn't saved: ${err.message}`)
      reloadItems()
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
      await adminGalleryApi.remove(deleting._id)
      setItems((list) => list.filter((i) => i._id !== deleting._id))
      setNotice(`The ${deleting.type} was deleted.`)
      setDeleting(null)
    } catch (err) {
      setDeleteError(err.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  const name = (item) => item.title?.en || (item.type === 'photo' ? 'Untitled photo' : 'Untitled video')
  const closeEditor = useCallback(() => setEditing(null), [])

  const reorderButtons = (index, label) => (
    <>
      <Button variant="ghost" size="icon" disabled={index === 0} onClick={() => move(index, index - 1)} aria-label={`Move ${label} earlier`} title="Move earlier">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        disabled={index === visible.length - 1}
        onClick={() => move(index, index + 1)}
        aria-label={`Move ${label} later`}
        title="Move later"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </>
  )

  const visibilityButton = (item) => (
    <Button
      variant="ghost"
      size="icon"
      disabled={busyId === item._id}
      onClick={() =>
        patchItem(item, { isActive: !item.isActive }, item.isActive ? `"${name(item)}" is now hidden from the website.` : `"${name(item)}" is now visible on the website.`)
      }
      aria-pressed={!item.isActive}
      aria-label={item.isActive ? `Hide ${name(item)}` : `Show ${name(item)}`}
      title={item.isActive ? 'Visible on website (click to hide)' : 'Hidden (click to show)'}
    >
      {item.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-slate-400" />}
    </Button>
  )

  return (
    <AdminLayout
      path={path}
      title="Gallery"
      actions={
        <div className="flex items-center gap-2">
          <a
            href={tab === 'photo' ? '/gallery/photos' : '/gallery/videos'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">View on website</span>
          </a>
          {tab === 'photo' ? (
            <Button variant="secondary" onClick={() => navigate(ADMIN_PATHS.galleryCategories)}>
              <FolderCog className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Categories</span>
            </Button>
          ) : (
            <Button onClick={() => setEditing({ item: null, type: 'video' })}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Add video</span>
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:w-fit" role="tablist">
          {[
            { key: 'photo', label: 'Photos', count: photos.length },
            { key: 'video', label: 'Videos', count: videos.length },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => switchTab(t.key)}
              className={`flex-1 rounded-lg px-5 py-2 text-sm font-semibold transition-colors sm:flex-none ${
                tab === t.key ? 'bg-[#003a70] text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t.label} <span className={tab === t.key ? 'text-sky-100' : 'text-slate-400'}>({t.count})</span>
            </button>
          ))}
        </div>

        <Alert type="success">{notice}</Alert>
        <Alert>{error}</Alert>

        {tab === 'photo' && !loading && (
          <>
            <PhotoUploader
              categories={categories}
              onUploaded={(created) => {
                setItems((list) => [...list, ...created].sort(byOrder))
                setNotice(`${created.length} photo${created.length === 1 ? '' : 's'} uploaded.`)
              }}
            />
            {photos.length > 0 && homeCount === 0 && (
              <p className="text-sm text-slate-500">
                No visible photo is marked <House className="inline h-3.5 w-3.5" aria-label="show on home page" /> for the home page, so the
                home page shows all photos.
              </p>
            )}
          </>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tab === 'photo' ? 'Search by title, badge or category' : 'Search by title'}
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40"
            />
          </label>
          {tab === 'photo' && (
            <label>
              <span className="sr-only">Filter by category</span>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={`${selectClass} sm:w-60`}>
                <option value="all">All categories ({photos.length})</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name.en} ({photos.filter((p) => p.category?._id === c._id).length})
                  </option>
                ))}
                <option value="none">No category ({photos.filter((p) => !p.category).length})</option>
              </select>
            </label>
          )}
        </div>

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <Spinner label="Loading gallery…" />
          </div>
        ) : tabItems.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <p className="font-medium text-slate-900">{tab === 'photo' ? 'No photos yet' : 'No videos yet'}</p>
            <p className="mt-1 text-sm text-slate-500">
              {tab === 'photo'
                ? "Uploaded photos appear on the website's photo gallery and home page."
                : "Add a YouTube link or upload a video file to show it on the website's video gallery."}
            </p>
            {tab === 'video' && (
              <Button className="mt-5" onClick={() => setEditing({ item: null, type: 'video' })}>
                <Plus className="h-4 w-4" aria-hidden="true" /> Add the first video
              </Button>
            )}
          </div>
        ) : visible.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500 shadow-sm">
            Nothing matches your filters.
          </p>
        ) : tab === 'photo' ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((photo, index) => (
              <li key={photo._id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <button type="button" onClick={() => setEditing({ item: photo, type: 'photo' })} className="relative block w-full" aria-label={`Edit ${name(photo)}`}>
                  <img
                    src={assetUrl(photo.image)}
                    alt=""
                    loading="lazy"
                    style={{ objectPosition: photo.position }}
                    className={`aspect-[4/3] w-full bg-slate-100 object-cover ${photo.isActive ? '' : 'opacity-40 grayscale'}`}
                  />
                  <span className="absolute left-2 top-2 flex gap-1">
                    {!photo.isActive && <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-semibold text-white">Hidden</span>}
                    {photo.showOnHome && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#003a70]/90 px-2 py-0.5 text-[11px] font-semibold text-white">
                        <House className="h-3 w-3" aria-hidden="true" /> Home
                      </span>
                    )}
                  </span>
                </button>
                <div className="px-3 pt-2.5">
                  <p className={`truncate text-sm font-semibold ${photo.title?.en ? 'text-slate-900' : 'italic text-slate-400'}`}>{name(photo)}</p>
                  <p className="truncate text-xs text-slate-500">{photo.label?.en || photo.category?.name?.en || 'No category'}</p>
                </div>
                <div className="flex items-center gap-0.5 px-1.5 py-1.5">
                  {reorderButtons(index, name(photo))}
                  <span className="flex-1" />
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={busyId === photo._id}
                    onClick={() =>
                      patchItem(
                        photo,
                        { showOnHome: !photo.showOnHome },
                        photo.showOnHome ? `"${name(photo)}" was removed from the home page.` : `"${name(photo)}" now shows on the home page.`,
                      )
                    }
                    aria-pressed={photo.showOnHome}
                    aria-label={photo.showOnHome ? `Remove ${name(photo)} from the home page` : `Show ${name(photo)} on the home page`}
                    title={photo.showOnHome ? 'On the home page (click to remove)' : 'Show on the home page'}
                  >
                    <House className={`h-4 w-4 ${photo.showOnHome ? 'text-[#0091da]' : ''}`} />
                  </Button>
                  {visibilityButton(photo)}
                  <Button variant="ghost" size="icon" onClick={() => setEditing({ item: photo, type: 'photo' })} aria-label={`Edit ${name(photo)}`}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="dangerGhost" size="icon" onClick={() => setDeleting(photo)} aria-label={`Delete ${name(photo)}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {visible.map((video, index) => {
              const problem = videoProblem(video)
              const thumb = videoThumb(video)
              return (
                <li key={video._id} className="flex flex-wrap items-center gap-4 px-4 py-3 sm:flex-nowrap sm:px-5">
                  {thumb ? (
                    <img src={thumb} alt="" className={`h-16 w-28 shrink-0 rounded-lg border border-slate-200 bg-slate-100 object-cover ${video.isActive ? '' : 'opacity-40 grayscale'}`} />
                  ) : (
                    <div className="flex h-16 w-28 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-400">
                      <ImagePlus className="h-5 w-5" aria-hidden="true" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setEditing({ item: video, type: 'video' })}
                      className={`block max-w-full truncate text-left font-semibold hover:text-[#0091da] ${video.title?.en ? 'text-slate-900' : 'italic text-slate-400'}`}
                    >
                      {name(video)}
                    </button>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span>{video.youtubeId ? 'YouTube' : video.videoFile ? 'Uploaded file' : 'No source'}</span>
                      {video.duration && <span>{video.duration}</span>}
                      {!video.isActive && <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">Hidden</span>}
                      {problem && (
                        <span className="inline-flex items-center gap-1 text-amber-700">
                          <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" /> {problem}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {reorderButtons(index, name(video))}
                    {visibilityButton(video)}
                    <Button variant="ghost" size="icon" onClick={() => setEditing({ item: video, type: 'video' })} aria-label={`Edit ${name(video)}`}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="dangerGhost" size="icon" onClick={() => setDeleting(video)} aria-label={`Delete ${name(video)}`}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {editing && (
        <GalleryItemModal
          key={editing.item?._id || 'new'}
          open
          item={editing.item}
          type={editing.type}
          categories={categories}
          onClose={closeEditor}
          onChange={(saved) => setItems((list) => upsert(list, saved))}
          onDone={(saved, message) => {
            setEditing(null)
            setNotice(message)
          }}
        />
      )}

      <Modal
        open={Boolean(deleting)}
        title={deleting?.type === 'video' ? 'Delete video' : 'Delete photo'}
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
          {deleting && (deleting.image || deleting.youtubeId) && (
            <img
              src={deleting.type === 'photo' ? assetUrl(deleting.image) : videoThumb(deleting)}
              alt=""
              className="aspect-video w-full rounded-lg border border-slate-200 object-cover"
            />
          )}
          <p className="text-sm text-slate-600">
            Delete <strong className="text-slate-900">"{deleting && name(deleting)}"</strong>
            {deleting?.type === 'video' && deleting.videoFile ? ' and its video file' : ''}? It will be removed from the website immediately.
            This can't be undone. To take it off the website temporarily, hide it instead.
          </p>
        </div>
      </Modal>
    </AdminLayout>
  )
}
