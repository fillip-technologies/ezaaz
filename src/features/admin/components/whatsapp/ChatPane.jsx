import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AlertTriangle, ArrowLeft, BellOff, FileText, Info, Lock, Paperclip, Phone, Send, Sparkles, X } from 'lucide-react'
import { adminInboxApi } from '../../../../api'
import { Alert, Button } from '../ui'
import MessageBubble from './MessageBubble'
import { Avatar } from './ConversationList'
import { CHAT_BACKGROUND, WA, chatName, dayLabel, formatPhone, telHref, windowLeft } from './format'

const MAX_FILE_MB = 10

function Composer({ detail, onSent, onOpenTemplate, onSendReport }) {
  const { conversation, reports } = detail
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [menu, setMenu] = useState(false)
  const fileInput = useRef(null)
  const textarea = useRef(null)

  const open = Boolean(windowLeft(conversation.windowExpiresAt))

  const run = async (action) => {
    setSending(true)
    setError('')
    try {
      const message = await action()
      if (message) onSent(message)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSending(false)
    }
  }

  const sendText = async () => {
    const body = text.trim()
    if (!body || sending) return
    if (await run(() => adminInboxApi.sendText(conversation._id, body))) {
      setText('')
      textarea.current?.focus()
    }
  }

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`Files can be up to ${MAX_FILE_MB} MB`)
      return
    }
    await run(() => adminInboxApi.sendFile(conversation._id, file, text.trim()))
    setText('')
  }

  if (conversation.optedOut) {
    return (
      <div className="flex items-center justify-center gap-2 px-4 py-4 text-sm text-[#54656f]" style={{ background: WA.panel }}>
        <BellOff className="h-4 w-4" aria-hidden="true" /> This patient replied STOP. They have to send START before you can message them.
      </div>
    )
  }

  if (!open) {
    return (
      <div className="px-4 py-3" style={{ background: WA.panel }}>
        <Alert>{error}</Alert>
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
          <p className="flex-1 text-sm text-[#54656f]">
            <Lock className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
            More than 24 hours since the patient's last message. WhatsApp only allows an approved template until they reply.
          </p>
          <Button size="sm" onClick={onOpenTemplate} className="bg-[#00a884]! hover:bg-[#008069]!">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> Send template
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-3 py-2" style={{ background: WA.panel }}>
      {error && (
        <div className="mb-2">
          <Alert>{error}</Alert>
        </div>
      )}
      <div className="flex items-end gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            className="rounded-full p-2.5 text-[#54656f] hover:bg-black/5"
            aria-label="Attach"
            aria-expanded={menu}
            disabled={sending}
          >
            {menu ? <X className="h-6 w-6" /> : <Paperclip className="h-6 w-6" />}
          </button>
          {menu && (
            <div className="absolute bottom-14 left-0 z-20 w-64 rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5">
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-[#f5f6f6]"
                onClick={() => {
                  setMenu(false)
                  fileInput.current?.click()
                }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7f66ff] text-white">
                  <Paperclip className="h-4 w-4" aria-hidden="true" />
                </span>
                Document or photo (PDF, JPG, PNG)
              </button>
              <p className="px-4 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wide text-[#667781]">Patient reports</p>
              {!reports.length && <p className="px-4 py-1 text-xs text-slate-500">No reports for patients on this number.</p>}
              <div className="max-h-56 overflow-y-auto">
                {reports.map((r) => (
                  <button
                    key={r._id}
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-[#f5f6f6]"
                    onClick={() => {
                      setMenu(false)
                      run(async () => {
                        await onSendReport(r)
                        return null
                      })
                    }}
                  >
                    <FileText className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
                    <span className="truncate">{r.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <input ref={fileInput} type="file" accept="application/pdf,image/jpeg,image/png" className="hidden" onChange={onFile} />
        </div>
        <label className="flex-1">
          <span className="sr-only">Type a message</span>
          <textarea
            ref={textarea}
            rows={1}
            value={text}
            maxLength={4096}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendText()
              }
            }}
            placeholder="Type a message"
            className="field-sizing-content block max-h-36 min-h-[42px] w-full resize-none rounded-lg bg-white px-3 py-2.5 text-[15px] text-[#111b21] placeholder:text-[#667781] focus:outline-none"
          />
        </label>
        <button
          type="button"
          onClick={sendText}
          disabled={!text.trim() || sending}
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-50"
          style={{ background: WA.accent }}
          aria-label="Send"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-1 flex justify-between px-1 text-[11px] text-[#667781]">
        <span>Enter to send · Shift+Enter for a new line</span>
        <button type="button" onClick={onOpenTemplate} className="hover:text-[#008069] hover:underline">
          Templates
        </button>
      </div>
    </div>
  )
}

export default function ChatPane({ detail, messages, hasMore, onLoadOlder, onBack, panelOpen, onTogglePanel, onSent, onResolve, onOpenTemplate, onSendReport, configured, className }) {
  const { conversation } = detail
  const scroller = useRef(null)
  const restore = useRef(null)
  const lastId = messages[messages.length - 1]?._id
  const left = windowLeft(conversation.windowExpiresAt)

  // Keep the view where it was when older messages are added on top
  useLayoutEffect(() => {
    const el = scroller.current
    if (el && restore.current != null) {
      el.scrollTop = el.scrollHeight - restore.current
      restore.current = null
    }
  }, [messages])

  // New message at the bottom: follow it if the user was already near the bottom
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 240
    if (nearBottom || messages[messages.length - 1]?.direction === 'out') el.scrollTop = el.scrollHeight
  }, [lastId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [conversation._id])

  const loadOlder = () => {
    if (scroller.current) restore.current = scroller.current.scrollHeight - scroller.current.scrollTop
    onLoadOlder()
  }

  return (
    <section className={`min-h-0 min-w-0 flex-1 flex-col ${className}`} aria-label={`Chat with ${chatName(conversation)}`}>
      <header className="flex items-center gap-3 border-b border-[#d1d7db] px-3 py-2 sm:px-4" style={{ background: WA.panel }}>
        <button type="button" onClick={onBack} className="rounded-full p-1.5 text-[#54656f] hover:bg-black/5 md:hidden" aria-label="Back to chats">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={onTogglePanel} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <Avatar conversation={conversation} size="h-10 w-10 text-sm" />
          <span className="min-w-0">
            <span className="block truncate text-[16px] text-[#111b21]">{chatName(conversation)}</span>
            <span className="block truncate text-xs text-[#667781]">
              {formatPhone(conversation.waId)}
              {' · '}
              {conversation.optedOut ? 'replied STOP' : left ? `chat open, ${left}` : 'chat closed (templates only)'}
            </span>
          </span>
        </button>
        <a href={telHref(conversation.waId)} className="rounded-full p-2 text-[#54656f] hover:bg-black/5" aria-label={`Call ${formatPhone(conversation.waId)}`} title="Call">
          <Phone className="h-5 w-5" />
        </a>
        <button
          type="button"
          onClick={onTogglePanel}
          className={`rounded-full p-2 hover:bg-black/5 ${panelOpen ? 'text-[#00a884]' : 'text-[#54656f]'}`}
          aria-label="Patient details"
          aria-pressed={panelOpen}
          title="Patient details"
        >
          <Info className="h-5 w-5" />
        </button>
      </header>

      {conversation.needsAttention && (
        <div className="flex flex-wrap items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex-1">{conversation.attentionReason || 'Needs attention'}</span>
          <a href={telHref(conversation.waId)} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200 hover:bg-amber-100">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Call now
          </a>
          <button type="button" onClick={onResolve} className="rounded-full px-3 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100">
            Mark as handled
          </button>
        </div>
      )}
      {!configured && (
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-1.5 text-center text-xs text-slate-600">
          WhatsApp isn't connected yet: messages are saved here but not delivered. See server/WHATSAPP_SETUP.md.
        </div>
      )}

      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-[6%]" style={CHAT_BACKGROUND}>
        {hasMore && (
          <div className="mb-3 text-center">
            <button type="button" onClick={loadOlder} className="rounded-full bg-white/90 px-3 py-1 text-xs text-[#54656f] shadow-sm hover:bg-white">
              Load older messages
            </button>
          </div>
        )}
        <p className="mx-auto mb-3 max-w-md rounded-lg bg-[#ffeecd] px-3 py-1.5 text-center text-[12px] leading-snug text-[#54656f]">
          <Lock className="mr-1 inline h-3 w-3" aria-hidden="true" />
          Messages with patients may contain medical information. Only share reports with the right patient.
        </p>
        {messages.map((m, i) => {
          const prev = messages[i - 1]
          const newDay = !prev || new Date(prev.createdAt).toDateString() !== new Date(m.createdAt).toDateString()
          const showTail = newDay || prev.direction !== m.direction
          return (
            <Fragment key={m._id}>
              {newDay && (
                <div className="my-3 text-center">
                  <span className="rounded-lg bg-white px-3 py-1 text-[12.5px] uppercase text-[#54656f] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
                    {dayLabel(m.createdAt)}
                  </span>
                </div>
              )}
              <MessageBubble message={m} showTail={showTail} />
            </Fragment>
          )
        })}
        {!messages.length && <p className="mt-10 text-center text-sm text-[#54656f]">No messages yet. Start with a template.</p>}
      </div>

      <Composer key={conversation._id} detail={detail} onSent={onSent} onOpenTemplate={onOpenTemplate} onSendReport={onSendReport} />
    </section>
  )
}
