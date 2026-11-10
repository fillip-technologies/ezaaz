import { useEffect, useState } from 'react'
import { ArrowLeft, RotateCcw, Upload, X } from 'lucide-react'
import { adminSiteApi, assetUrl } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Link, Spinner } from '../components/ui'
import { ADMIN_PATHS } from '../navigation'
import { VIDEO_MAX_MB, VIDEO_TYPES } from '../galleryOptions'
import { DEFAULT_VIDEOS } from '../../site/useSiteSettings'

const VIDEOS = [
  {
    key: 'intro',
    title: 'Welcome intro video',
    description:
      'Plays full screen behind the logo and the "Explore Ejaz Hospital" button the first time a visitor opens the home page in a browser session.',
  },
  {
    key: 'hero',
    title: 'Home page header video',
    description: 'Plays in the background of the home page header, behind the stats bar.',
  },
]

// The website's two background videos. Each can be replaced with an upload or put back to the built-in video.
export default function SiteVideosView({ path }) {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    let cancelled = false
    adminSiteApi
      .get()
      .then((data) => !cancelled && setSettings(data))
      .catch((err) => !cancelled && setStatus({ type: 'error', message: err.message }))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <AdminLayout
      path={path}
      title="Website videos"
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

        {loading ? (
          <Spinner label="Loading videos…" />
        ) : (
          settings &&
          VIDEOS.map((video) => (
            <VideoCard
              key={video.key}
              videoKey={video.key}
              title={video.title}
              description={video.description}
              uploaded={settings[`${video.key}Video`]}
              onSaved={(data, message) => {
                setSettings(data)
                setStatus({ type: 'success', message })
              }}
              onError={(message) => setStatus({ type: 'error', message })}
            />
          ))
        )}
      </div>
    </AdminLayout>
  )
}

function VideoCard({ videoKey: key, title, description, uploaded, onSaved, onError }) {
  // The chosen file and its local preview URL, until it is uploaded
  const [picked, setPicked] = useState(null)
  const [busy, setBusy] = useState('')
  const file = picked?.file
  const previewUrl = picked?.url || ''

  useEffect(() => () => picked && URL.revokeObjectURL(picked.url), [picked])

  const setFile = (next) => setPicked(next ? { file: next, url: URL.createObjectURL(next) } : null)

  const onPick = (e) => {
    const picked = e.target.files?.[0]
    e.target.value = ''
    if (!picked) return
    if (!VIDEO_TYPES.includes(picked.type)) return onError('The video must be an MP4 or WebM file.')
    if (picked.size > VIDEO_MAX_MB * 1024 * 1024) return onError(`The video must be ${VIDEO_MAX_MB} MB or smaller.`)
    setFile(picked)
  }

  const onUpload = async () => {
    setBusy('upload')
    try {
      const data = await adminSiteApi.uploadVideo(key, file)
      setFile(null)
      onSaved(data, `${title} updated. The website now plays the new video.`)
    } catch (err) {
      onError(err.message)
    } finally {
      setBusy('')
    }
  }

  const onReset = async () => {
    if (!window.confirm(`Put the built-in ${title.toLowerCase()} back? The uploaded video will be deleted.`)) return
    setBusy('reset')
    try {
      const data = await adminSiteApi.resetVideo(key)
      onSaved(data, `${title} is back to the built-in video.`)
    } catch (err) {
      onError(err.message)
    } finally {
      setBusy('')
    }
  }

  const currentSrc = uploaded ? assetUrl(uploaded) : DEFAULT_VIDEOS[key]

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            uploaded ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {uploaded ? 'Uploaded video' : 'Built-in video'}
        </span>
      </div>

      <video
        key={previewUrl || currentSrc}
        src={previewUrl || currentSrc}
        controls
        muted
        playsInline
        preload="metadata"
        className="mt-4 aspect-video w-full rounded-lg border border-slate-200 bg-black object-cover"
      />

      {file ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-sky-50 px-4 py-3">
          <p className="min-w-0 text-sm text-slate-700">
            <span className="font-medium">{file.name}</span> ({(file.size / 1024 / 1024).toFixed(1)} MB) — preview above.
            {busy === 'upload' && ' Uploading… this can take a few minutes.'}
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" disabled={Boolean(busy)} onClick={() => setFile(null)}>
              <X className="h-4 w-4" aria-hidden="true" /> Cancel
            </Button>
            <Button loading={busy === 'upload'} onClick={onUpload}>
              <Upload className="h-4 w-4" aria-hidden="true" /> Upload & publish
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">MP4 or WebM, up to {VIDEO_MAX_MB} MB. Smaller files load faster for visitors.</p>
          <div className="flex gap-2">
            {uploaded && (
              <Button variant="secondary" loading={busy === 'reset'} onClick={onReset}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Use built-in video
              </Button>
            )}
            <label
              className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#003a70] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#002b54] focus-within:ring-2 focus-within:ring-[#0091da] focus-within:ring-offset-2 ${
                busy ? 'pointer-events-none opacity-60' : ''
              }`}
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              {uploaded ? 'Replace video' : 'Upload new video'}
              <input type="file" accept={VIDEO_TYPES.join(',')} onChange={onPick} className="sr-only" />
            </label>
          </div>
        </div>
      )}
    </section>
  )
}
