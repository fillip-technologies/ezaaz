import { useEffect, useMemo, useState } from 'react'
import { Film, SquarePlay, Upload, X } from 'lucide-react'
import { adminGalleryApi, assetUrl } from '../../../api'
import { ImagePicker, LocalizedField } from './formParts'
import { Alert, Button, Field, Modal, Switch } from './ui'
import {
  PHOTO_MAX_MB,
  POSITIONS,
  VIDEO_MAX_MB,
  VIDEO_TYPES,
  parseYoutubeId,
  readVideoDuration,
  youtubeThumb,
} from '../galleryOptions'

const text = (field) => ({ en: field?.en || '', hi: field?.hi || '' })

function initialDraft(item) {
  return {
    title: text(item?.title),
    label: text(item?.label),
    category: item?.category?._id || item?.category || '',
    position: item?.position || 'center center',
    duration: item?.duration || '',
    showOnHome: Boolean(item?.showOnHome),
    isActive: item ? item.isActive !== false : true,
    source: item?.videoFile && !item?.youtubeId ? 'file' : 'youtube',
    youtube: item?.youtubeId ? `https://youtu.be/${item.youtubeId}` : '',
  }
}

function ToggleRow({ label, hint, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 px-3.5 py-3">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      </div>
      <Switch checked={checked} onChange={onChange} label={label} />
    </div>
  )
}

/**
 * Edit a photo, or add / edit a video. Changes (including file uploads) are sent when Save is pressed.
 * `onChange(item)` is called after every successful request so the list stays in sync even if a later step fails.
 */
export default function GalleryItemModal({ open, item, type, categories, onClose, onChange, onDone }) {
  const [target, setTarget] = useState(item)
  const [draft, setDraft] = useState(() => initialDraft(item))
  const [image, setImage] = useState({ current: item?.image || '', file: null, remove: false })
  const [videoFile, setVideoFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  const [saving, setSaving] = useState('')

  const isVideo = type === 'video'
  const set = (key, value) => setDraft((d) => ({ ...d, [key]: value }))
  const setLocalized = (key) => (lang, value) => setDraft((d) => ({ ...d, [key]: { ...d[key], [lang]: value } }))

  // Preview of how the photo is cropped on the website's tiles
  const filePreview = useMemo(() => (image.file ? URL.createObjectURL(image.file) : ''), [image.file])
  useEffect(() => () => filePreview && URL.revokeObjectURL(filePreview), [filePreview])
  const tilePreview = filePreview || (image.current && !image.remove ? assetUrl(image.current) : '')

  const youtubeId = draft.source === 'youtube' ? parseYoutubeId(draft.youtube) : ''
  const hasVideoFile = Boolean(videoFile || target?.videoFile)
  const hasThumbnail = Boolean(image.file || (image.current && !image.remove))

  const onPickVideo = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!VIDEO_TYPES.includes(file.type)) return setError('The video must be an MP4 or WebM file.')
    if (file.size > VIDEO_MAX_MB * 1024 * 1024) {
      return setError(`The video must be ${VIDEO_MAX_MB} MB or smaller. For longer videos, upload them to YouTube and paste the link instead.`)
    }
    setError('')
    setVideoFile(file)
    const duration = await readVideoDuration(file)
    if (duration) setDraft((d) => ({ ...d, duration }))
  }

  const validate = () => {
    const next = {}
    if (isVideo && draft.source === 'youtube' && !youtubeId) next.youtube = 'Paste a YouTube video link'
    if (isVideo && draft.source === 'file' && !hasVideoFile) next.videoFile = 'Choose a video file to upload'
    if (isVideo && draft.source === 'file' && !hasThumbnail) next.image = 'Uploaded videos need a thumbnail image'
    if (draft.duration && !/^(?:\d{1,2}:)?\d{1,2}:\d{2}$/.test(draft.duration.trim())) next.duration = 'Use m:ss, e.g. 2:40'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSave = async () => {
    if (!validate()) return setError('Please fix the highlighted fields.')
    setError('')
    const payload = {
      title: draft.title,
      label: draft.label,
      position: draft.position,
      showOnHome: draft.showOnHome,
      isActive: draft.isActive,
      ...(isVideo
        ? {
            duration: draft.duration.trim(),
            // When a new file replaces a YouTube link, the upload clears the link, so a failed upload keeps the video playable
            ...(draft.source === 'youtube' ? { youtube: draft.youtube.trim() } : !videoFile && { youtube: '' }),
          }
        : { category: draft.category || null }),
    }

    let saved = target
    try {
      setSaving('Saving…')
      saved = saved ? await adminGalleryApi.update(saved._id, payload) : await adminGalleryApi.createVideo(payload)
      setTarget(saved)
      onChange(saved)

      if (isVideo && draft.source === 'file' && videoFile) {
        setSaving('Uploading video… this can take a few minutes')
        saved = await adminGalleryApi.uploadVideo(saved._id, videoFile)
        setTarget(saved)
        setVideoFile(null)
        onChange(saved)
      }

      if (image.file) {
        setSaving(isVideo ? 'Uploading thumbnail…' : 'Uploading photo…')
        saved = await adminGalleryApi.uploadImage(saved._id, image.file)
      } else if (image.remove && saved.image) {
        saved = await adminGalleryApi.removeImage(saved._id)
      }
      setImage({ current: saved.image || '', file: null, remove: false })
      setTarget(saved)
      onChange(saved)
      onDone(saved, item ? 'Changes saved.' : 'Video added.')
    } catch (err) {
      setError(err.message)
      if (err.details) setErrors(Object.fromEntries(err.details.map((d) => [d.field, d.message])))
    } finally {
      setSaving('')
    }
  }

  const title = isVideo ? (item ? 'Edit video' : 'Add video') : 'Edit photo'

  return (
    <Modal
      open={open}
      title={title}
      onClose={saving ? () => {} : onClose}
      footer={
        <>
          {saving && <p className="mr-auto self-center text-xs text-slate-500">{saving}</p>}
          <Button variant="secondary" onClick={onClose} disabled={Boolean(saving)}>
            Cancel
          </Button>
          <Button loading={Boolean(saving)} onClick={onSave}>
            Save
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        <Alert>{error}</Alert>

        {isVideo && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">Video source</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'youtube', label: 'YouTube link', icon: SquarePlay },
                { value: 'file', label: 'Upload file', icon: Film },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set('source', value)}
                  aria-pressed={draft.source === value}
                  className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors ${
                    draft.source === value
                      ? 'border-[#0091da] bg-sky-50 text-[#003a70]'
                      : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" /> {label}
                </button>
              ))}
            </div>

            {draft.source === 'youtube' ? (
              <>
                <Field
                  label="YouTube link *"
                  value={draft.youtube}
                  onChange={(e) => set('youtube', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=…"
                  error={errors.youtube}
                  hint="Watch, share (youtu.be) or Shorts links all work"
                />
                {youtubeId && (
                  <img src={youtubeThumb(youtubeId)} alt="" className="aspect-video w-full rounded-lg border border-slate-200 object-cover" />
                )}
                {target?.videoFile && youtubeId && (
                  <p className="text-xs text-amber-700">Saving with a YouTube link deletes the uploaded video file.</p>
                )}
              </>
            ) : (
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-within:ring-2 focus-within:ring-[#0091da]">
                    <Upload className="h-4 w-4" aria-hidden="true" />
                    {hasVideoFile ? 'Replace video' : 'Choose video'}
                    <input type="file" accept={VIDEO_TYPES.join(',')} onChange={onPickVideo} className="sr-only" />
                  </label>
                  {videoFile && (
                    <Button variant="ghost" onClick={() => setVideoFile(null)}>
                      <X className="h-4 w-4" aria-hidden="true" /> Undo
                    </Button>
                  )}
                </div>
                <p className={`mt-1.5 text-xs ${errors.videoFile ? 'text-red-600' : 'text-slate-500'}`}>
                  {errors.videoFile ||
                    (videoFile
                      ? `${videoFile.name} (${(videoFile.size / 1024 / 1024).toFixed(1)} MB) will be uploaded when you save.`
                      : target?.videoFile
                        ? 'A video file is uploaded.'
                        : `MP4 or WebM, up to ${VIDEO_MAX_MB} MB.`)}
                </p>
              </div>
            )}
          </div>
        )}

        <div>
          <p className="mb-1.5 text-sm font-medium text-slate-700">
            {isVideo ? `Thumbnail${draft.source === 'file' ? ' *' : ''}` : 'Photo'}
          </p>
          <ImagePicker
            image={image}
            onChange={setImage}
            onError={setError}
            maxMb={PHOTO_MAX_MB}
            noun={isVideo ? 'thumbnail' : 'photo'}
            removable={isVideo}
            placeholder={isVideo && youtubeId && !hasThumbnail ? youtubeThumb(youtubeId) : undefined}
            previewClassName="h-24 w-36 rounded-lg border border-slate-200 bg-slate-100 object-cover"
          />
          {errors.image && <p className="mt-1.5 text-xs text-red-600">{errors.image}</p>}
          {isVideo && draft.source === 'youtube' && (
            <p className="mt-1.5 text-xs text-slate-500">Optional: YouTube's own thumbnail is used if you don't upload one.</p>
          )}
        </div>

        <LocalizedField
          label="Title"
          value={draft.title}
          onChange={setLocalized('title')}
          errors={errors}
          errorKey="title"
          hint={isVideo ? 'Shown on the video tile' : 'Shown on hover and in the full-screen view'}
        />

        {!isVideo && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category" as="select" value={draft.category} onChange={(e) => set('category', e.target.value)} error={errors.category}>
                <option value="">No category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name.en}
                  </option>
                ))}
              </Field>
              <Field label="Crop focus" as="select" value={draft.position} onChange={(e) => set('position', e.target.value)} hint="Part kept visible on tiles">
                {POSITIONS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </Field>
            </div>
            {tilePreview && (
              <div>
                <p className="mb-1.5 text-xs font-medium text-slate-500">Tile preview</p>
                <img
                  src={tilePreview}
                  alt=""
                  style={{ objectPosition: draft.position }}
                  className="aspect-[4/3] w-48 rounded-xl border border-slate-200 object-cover"
                />
              </div>
            )}
            <LocalizedField
              label="Badge"
              value={draft.label}
              onChange={setLocalized('label')}
              errors={errors}
              errorKey="label"
              placeholder="e.g. Joint Replacement"
              hint="Small tag on the tile. Empty = category name"
            />
          </>
        )}

        {isVideo && (
          <Field
            label="Duration"
            value={draft.duration}
            onChange={(e) => set('duration', e.target.value)}
            placeholder="2:40"
            error={errors.duration}
            hint="Optional. Filled in automatically for uploaded files"
            className="sm:w-48"
          />
        )}

        <div className="space-y-2">
          <ToggleRow
            label="Visible on website"
            hint="Turn off to hide it without deleting"
            checked={draft.isActive}
            onChange={(v) => set('isActive', v)}
          />
          {!isVideo && (
            <ToggleRow
              label="Show on home page"
              hint="Included in the scrolling gallery on the home page"
              checked={draft.showOnHome}
              onChange={(v) => set('showOnHome', v)}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}
