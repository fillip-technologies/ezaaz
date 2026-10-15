import { useEffect, useMemo } from 'react'
import { ArrowDown, ArrowUp, ImagePlus, Plus, Trash2, X } from 'lucide-react'
import { assetUrl } from '../../../api'
import { Button, Field } from './ui'

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const inputClass =
  'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40'

export function Section({ title, description, actions, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {actions}
      </div>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  )
}

// English + Hindi inputs side by side. Hindi is optional; the website falls back to English.
// `value` is { en, hi }; `onChange(lang, text)`; errors are looked up as `${errorKey}.en` / `.hi`.
export function LocalizedField({ label, value, onChange, errors = {}, errorKey, required, as, rows, placeholder, hint }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field
        label={`${label} (English)${required ? ' *' : ''}`}
        value={value?.en ?? ''}
        onChange={(e) => onChange('en', e.target.value)}
        error={errorKey && errors[`${errorKey}.en`]}
        hint={hint}
        as={as}
        rows={rows}
        placeholder={placeholder}
        required={required}
      />
      <Field
        label={`${label} (हिन्दी)`}
        value={value?.hi ?? ''}
        onChange={(e) => onChange('hi', e.target.value)}
        error={errorKey && errors[`${errorKey}.hi`]}
        hint="Optional, English is shown if empty"
        as={as}
        rows={rows}
        lang="hi"
      />
    </div>
  )
}

// Repeatable { en, hi } rows (e.g. specializations, key highlights, bullet points)
export function LocalizedListEditor({ items, onChange, itemLabel, addLabel, emptyText, placeholder = 'English', max }) {
  const update = (index, lang, text) => onChange(items.map((row, i) => (i === index ? { ...row, [lang]: text } : row)))
  return (
    <div className="space-y-3">
      {items.length === 0 && emptyText && <p className="text-sm text-slate-500">{emptyText}</p>}
      {items.map((row, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="grid flex-1 gap-2 sm:grid-cols-2">
            <input
              aria-label={`${itemLabel} ${index + 1} (English)`}
              value={row.en}
              onChange={(e) => update(index, 'en', e.target.value)}
              placeholder={placeholder}
              className={inputClass}
            />
            <input
              aria-label={`${itemLabel} ${index + 1} (Hindi)`}
              lang="hi"
              value={row.hi}
              onChange={(e) => update(index, 'hi', e.target.value)}
              placeholder="हिन्दी (optional)"
              className={inputClass}
            />
          </div>
          <Button
            variant="dangerGhost"
            size="icon"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
            aria-label={`Remove ${itemLabel.toLowerCase()} ${index + 1}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      {(!max || items.length < max) && (
        <Button variant="secondary" size="sm" onClick={() => onChange([...items, { en: '', hi: '' }])}>
          <Plus className="h-4 w-4" aria-hidden="true" /> {addLabel}
        </Button>
      )}
    </div>
  )
}

// Up / down / remove buttons for an item in an ordered list
export function ReorderButtons({ index, count, onMove, onRemove, label }) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" disabled={index === 0} onClick={() => onMove(index, index - 1)} aria-label={`Move ${label} up`}>
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" disabled={index === count - 1} onClick={() => onMove(index, index + 1)} aria-label={`Move ${label} down`}>
        <ArrowDown className="h-4 w-4" />
      </Button>
      <Button variant="dangerGhost" size="icon" onClick={() => onRemove(index)} aria-label={`Remove ${label}`}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

/**
 * Image chooser whose change is applied when the form is saved.
 * `image` = { current: savedUrl, file: File | null, remove: boolean }; `onChange(nextImage)`; `onError(message)`.
 */
export function ImagePicker({ image, onChange, onError, maxMb, noun = 'photo', placeholder, previewClassName }) {
  const previewUrl = useMemo(() => (image.file ? URL.createObjectURL(image.file) : ''), [image.file])
  useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl])

  const shown = previewUrl || (!image.remove && image.current ? assetUrl(image.current) : '')

  const onPick = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!IMAGE_TYPES.includes(file.type)) return onError(`The ${noun} must be a JPG, PNG or WebP image.`)
    if (file.size > maxMb * 1024 * 1024) return onError(`The ${noun} must be ${maxMb} MB or smaller.`)
    onError('')
    onChange({ ...image, file, remove: false })
  }

  return (
    <div className="flex flex-wrap items-center gap-5">
      {shown || placeholder ? (
        <img src={shown || placeholder} alt="" className={previewClassName} />
      ) : (
        <div className={`${previewClassName} flex items-center justify-center text-slate-400`}>
          <ImagePlus className="h-8 w-8" aria-hidden="true" />
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-within:ring-2 focus-within:ring-[#0091da]">
          <ImagePlus className="h-4 w-4" aria-hidden="true" />
          {shown ? `Change ${noun}` : `Upload ${noun}`}
          <input type="file" accept={IMAGE_TYPES.join(',')} onChange={onPick} className="sr-only" />
        </label>
        {image.file && (
          <Button variant="ghost" onClick={() => onChange({ ...image, file: null })}>
            <X className="h-4 w-4" aria-hidden="true" /> Undo
          </Button>
        )}
        {!image.file && image.current && !image.remove && (
          <Button variant="dangerGhost" onClick={() => onChange({ ...image, remove: true })}>
            <Trash2 className="h-4 w-4" aria-hidden="true" /> Remove
          </Button>
        )}
        {image.remove && (
          <Button variant="ghost" onClick={() => onChange({ ...image, remove: false })}>
            <X className="h-4 w-4" aria-hidden="true" /> Keep current {noun}
          </Button>
        )}
      </div>
      {(image.file || image.remove) && (
        <p className="w-full text-xs text-slate-500">The {noun} change is applied when you save.</p>
      )}
    </div>
  )
}
