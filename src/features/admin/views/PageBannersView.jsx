import { useEffect, useState } from 'react'
import { ArrowLeft, RotateCcw, Upload, X } from 'lucide-react'
import { adminSiteApi, assetUrl } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Link, Spinner } from '../components/ui'
import { ADMIN_PATHS } from '../navigation'
import { BANNER_MAX_MB, IMAGE_TYPES } from '../galleryOptions'
import { PAGE_BANNERS } from '../../site/pageBanners'

const GROUPS = [...new Set(PAGE_BANNERS.map((b) => b.group))]

// The image at the top of each inner page. Each can be replaced with an upload or put back to the built-in image.
export default function PageBannersView({ path }) {
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
      title="Page banners"
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
      <div className="mx-auto max-w-6xl space-y-6">
        <p className="text-sm text-slate-500">
          The wide image at the top of each page. The page title is drawn over its left side, so keep that area plain.
          Best size: about 1920 × 400 px. JPG, PNG or WebP, up to {BANNER_MAX_MB} MB.
        </p>

        <Alert type={status.type || 'error'}>{status.message}</Alert>

        {loading ? (
          <Spinner label="Loading banners…" />
        ) : (
          settings &&
          GROUPS.map((group) => (
            <section key={group} className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{group}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {PAGE_BANNERS.filter((b) => b.group === group).map((banner) => (
                  <BannerCard
                    key={banner.key}
                    banner={banner}
                    uploaded={settings.pageBanners?.[banner.key] || ''}
                    onSaved={(data, message) => {
                      setSettings(data)
                      setStatus({ type: 'success', message })
                    }}
                    onError={(message) => setStatus({ type: 'error', message })}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </AdminLayout>
  )
}

function BannerCard({ banner, uploaded, onSaved, onError }) {
  const { key, title, image: builtIn } = banner
  // The chosen file and its local preview URL, until it is uploaded
  const [picked, setPicked] = useState(null)
  const [busy, setBusy] = useState('')
  const file = picked?.file

  useEffect(() => () => picked && URL.revokeObjectURL(picked.url), [picked])

  const setFile = (next) => setPicked(next ? { file: next, url: URL.createObjectURL(next) } : null)

  const onPick = (e) => {
    const next = e.target.files?.[0]
    e.target.value = ''
    if (!next) return
    if (!IMAGE_TYPES.includes(next.type)) return onError('The banner must be a JPG, PNG or WebP image.')
    if (next.size > BANNER_MAX_MB * 1024 * 1024) return onError(`The banner must be ${BANNER_MAX_MB} MB or smaller.`)
    setFile(next)
  }

  const onUpload = async () => {
    setBusy('upload')
    try {
      const data = await adminSiteApi.uploadPageBanner(key, file)
      setFile(null)
      onSaved(data, `${title} banner updated. The website now shows the new image.`)
    } catch (err) {
      onError(err.message)
    } finally {
      setBusy('')
    }
  }

  const onReset = async () => {
    if (!window.confirm(`Put the built-in ${title} banner back? The uploaded image will be deleted.`)) return
    setBusy('reset')
    try {
      const data = await adminSiteApi.resetPageBanner(key)
      onSaved(data, `${title} banner is back to the built-in image.`)
    } catch (err) {
      onError(err.message)
    } finally {
      setBusy('')
    }
  }

  const src = picked?.url || (uploaded ? assetUrl(uploaded) : builtIn)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 truncate text-sm font-semibold text-slate-900">{title}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            file ? 'bg-sky-50 text-sky-700' : uploaded ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {file ? 'Preview' : uploaded ? 'Uploaded' : 'Built-in'}
        </span>
      </div>

      <img
        src={src}
        alt={`${title} banner`}
        className="mt-3 aspect-[5/1] w-full rounded-lg border border-slate-200 bg-slate-100 object-cover"
      />

      {file ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="min-w-0 truncate text-xs text-slate-600">
            {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" disabled={Boolean(busy)} onClick={() => setFile(null)}>
              <X className="h-4 w-4" aria-hidden="true" /> Cancel
            </Button>
            <Button loading={busy === 'upload'} onClick={onUpload}>
              <Upload className="h-4 w-4" aria-hidden="true" /> Publish
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap justify-end gap-2">
          {uploaded && (
            <Button variant="secondary" loading={busy === 'reset'} onClick={onReset}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Use built-in
            </Button>
          )}
          <label
            className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#003a70] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#002b54] focus-within:ring-2 focus-within:ring-[#0091da] focus-within:ring-offset-2 ${
              busy ? 'pointer-events-none opacity-60' : ''
            }`}
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            {uploaded ? 'Replace' : 'Upload new'}
            <input type="file" accept={IMAGE_TYPES.join(',')} onChange={onPick} className="sr-only" />
          </label>
        </div>
      )}
    </div>
  )
}
