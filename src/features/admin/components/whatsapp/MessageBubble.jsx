import { useCallback, useState } from 'react'
import { AlertCircle, Bot, Check, CheckCheck, Clock, Download, FileText, MapPin, MousePointerClick, Play } from 'lucide-react'
import { adminInboxApi } from '../../../../api'
import { WA, downloadBlob, fileSize, openBlob, timeOf, useBlobUrl } from './format'

const URL_PATTERN = /(https?:\/\/[^\s]+)/g

// Plain text with clickable links (WhatsApp *bold* is shown as typed)
function Linkified({ text }) {
  return text.split(URL_PATTERN).map((part, i) =>
    i % 2 ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all text-[#027eb5] hover:underline">
        {part}
      </a>
    ) : (
      part
    ),
  )
}

export function StatusTicks({ status, className = '' }) {
  if (status === 'read') return <CheckCheck className={`h-4 w-4 ${className}`} style={{ color: WA.read }} aria-label="Read" />
  if (status === 'delivered') return <CheckCheck className={`h-4 w-4 text-slate-500 ${className}`} aria-label="Delivered" />
  if (status === 'sent') return <Check className={`h-4 w-4 text-slate-500 ${className}`} aria-label="Sent" />
  if (status === 'failed') return <AlertCircle className={`h-4 w-4 text-red-500 ${className}`} aria-label="Failed" />
  if (status === 'skipped') return <Clock className={`h-3.5 w-3.5 text-amber-600 ${className}`} aria-label="Not sent" />
  if (status === 'queued') return <Clock className={`h-3.5 w-3.5 text-slate-400 ${className}`} aria-label="Sending" />
  return null
}

function ImageMedia({ message }) {
  const load = useCallback(() => adminInboxApi.media(message._id), [message._id])
  const { url, error } = useBlobUrl(load, Boolean(message.media?.storedName))
  if (!message.media?.storedName) return <p className="px-1 py-6 text-center text-xs text-slate-500">Photo (downloading…)</p>
  if (error) return <p className="px-1 py-6 text-center text-xs text-red-600">{error}</p>
  return url ? (
    <button type="button" onClick={() => openBlob(load)} className="block overflow-hidden rounded-md">
      <img src={url} alt={message.text || 'Photo'} className="max-h-72 w-full object-cover" />
    </button>
  ) : (
    <div className="h-40 w-60 animate-pulse rounded-md bg-black/5" />
  )
}

function AudioMedia({ message }) {
  const [enabled, setEnabled] = useState(false)
  const load = useCallback(() => adminInboxApi.media(message._id), [message._id])
  const { url, error } = useBlobUrl(load, enabled)
  if (!message.media?.storedName) return <p className="text-xs text-slate-500">🎤 Voice message (downloading…)</p>
  if (error) return <p className="text-xs text-red-600">{error}</p>
  if (!enabled)
    return (
      <button type="button" onClick={() => setEnabled(true)} className="flex items-center gap-2 text-sm text-slate-700">
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ background: WA.accent }}>
          <Play className="h-4 w-4" aria-hidden="true" />
        </span>
        Voice message
      </button>
    )
  return url ? <audio controls autoPlay src={url} className="h-10 w-60 max-w-full" /> : <p className="text-xs text-slate-500">Loading…</p>
}

function DocumentMedia({ message }) {
  const [busy, setBusy] = useState(false)
  const { media } = message
  const available = Boolean(media?.storedName)
  const load = () => adminInboxApi.media(message._id)
  const run = async (action) => {
    setBusy(true)
    try {
      await action()
    } catch {
      /* the button simply stays available */
    } finally {
      setBusy(false)
    }
  }
  const isPdf = media?.mime === 'application/pdf'
  return (
    <div className="flex items-center gap-3 rounded-md bg-black/[0.04] p-2.5">
      <button
        type="button"
        disabled={!available || busy}
        onClick={() => run(() => (isPdf ? openBlob(load) : downloadBlob(load, media.filename)))}
        className="flex min-w-0 flex-1 items-center gap-3 text-left disabled:cursor-default"
      >
        <span className="flex h-10 w-8 shrink-0 items-center justify-center rounded bg-red-500 text-[9px] font-bold uppercase text-white">
          {isPdf ? 'PDF' : <FileText className="h-4 w-4" aria-hidden="true" />}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-slate-800">{media?.filename || 'Document'}</span>
          <span className="block text-xs text-slate-500">{available ? fileSize(media.size) || 'Document' : 'Downloading…'}</span>
        </span>
      </button>
      {available && (
        <button
          type="button"
          disabled={busy}
          onClick={() => run(() => downloadBlob(load, media.filename))}
          className="rounded-full p-1.5 text-slate-500 hover:bg-black/5"
          aria-label="Download"
        >
          <Download className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default function MessageBubble({ message, showTail }) {
  const out = message.direction === 'out'
  const automatic = out && !message.sentBy
  const { type, text, location } = message
  const tapped = type === 'button' || type === 'interactive'

  return (
    <div className={`flex ${out ? 'justify-end' : 'justify-start'} ${showTail ? 'mt-2' : 'mt-0.5'}`}>
      <div
        className={`relative max-w-[85%] rounded-lg px-2 pb-1.5 pt-1.5 text-[14.2px] leading-[19px] text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] sm:max-w-[65%] ${
          showTail ? (out ? 'rounded-tr-none' : 'rounded-tl-none') : ''
        }`}
        style={{ background: out ? WA.outgoing : '#ffffff' }}
      >
        {showTail && (
          <span
            aria-hidden="true"
            className={`absolute top-0 h-3 w-2 ${out ? '-right-2' : '-left-2'}`}
            style={{ background: out ? WA.outgoing : '#ffffff', clipPath: out ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%)' }}
          />
        )}

        {automatic && (message.label || type === 'template') && (
          <p className="mb-1 flex items-center gap-1 px-1 text-[11px] font-medium text-[#008069]">
            <Bot className="h-3 w-3" aria-hidden="true" /> Automated{message.label ? ` · ${message.label}` : ''}
          </p>
        )}
        {!automatic && out && type === 'template' && <p className="mb-1 px-1 text-[11px] font-medium text-[#008069]">Template{message.label ? ` · ${message.label}` : ''}</p>}
        {tapped && !out && (
          <p className="mb-0.5 flex items-center gap-1 px-1 text-[11px] font-medium text-slate-500">
            <MousePointerClick className="h-3 w-3" aria-hidden="true" /> Tapped a button
          </p>
        )}

        {type === 'image' && <ImageMedia message={message} />}
        {type === 'document' && <DocumentMedia message={message} />}
        {(type === 'audio' || type === 'video') && (type === 'audio' ? <AudioMedia message={message} /> : <DocumentMedia message={message} />)}
        {type === 'template' && message.media?.storedName && <DocumentMedia message={message} />}
        {type === 'location' && location && (
          <a
            href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md bg-black/[0.04] p-3 text-sm text-[#027eb5] hover:underline"
          >
            <MapPin className="h-5 w-5 text-red-500" aria-hidden="true" /> Open shared location in Google Maps
          </a>
        )}
        {type === 'sticker' && <p className="px-1 text-sm text-slate-500">Sticker</p>}
        {type === 'unsupported' && <p className="px-1 text-sm italic text-slate-500">This message type can't be shown here.</p>}

        {text && type !== 'location' && (
          <p className={`whitespace-pre-wrap break-words px-1 ${tapped ? 'font-medium' : ''} ${type === 'reaction' ? 'text-2xl' : ''}`}>
            <Linkified text={text} />
          </p>
        )}

        <div className="float-right ml-3 mt-1 flex items-center gap-1 pl-1 text-[11px] leading-none text-slate-500">
          {timeOf(message.createdAt)}
          {out && <StatusTicks status={message.status} />}
        </div>
        <div className="clear-both" />
        {out && (message.status === 'failed' || message.status === 'skipped') && message.error && (
          <p className={`mt-1 px-1 text-[11px] ${message.status === 'failed' ? 'text-red-600' : 'text-amber-700'}`}>
            {message.status === 'failed' ? 'Not delivered: ' : 'Not sent: '}
            {message.error}
          </p>
        )}
      </div>
    </div>
  )
}
