import { useCallback, useEffect, useRef, useState } from 'react'
import { Lock, MessageCircle } from 'lucide-react'
import { adminInboxApi, adminPatientsApi, openInboxStream } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Spinner } from '../components/ui'
import ConversationList from '../components/whatsapp/ConversationList'
import ChatPane from '../components/whatsapp/ChatPane'
import PatientPanel from '../components/whatsapp/PatientPanel'
import TemplatePicker from '../components/whatsapp/TemplatePicker'
import { WA, chatName, formatPhone } from '../components/whatsapp/format'
import { chatPath } from '../navigation'
import { setWhatsAppUnread } from '../whatsappUnread'

const POLL_MS = 15000
const chatFromUrl = () => new URLSearchParams(window.location.search).get('chat') || ''
const byLatest = (a, b) => new Date(b.lastMessageAt || 0) - new Date(a.lastMessageAt || 0)

function matchesFilter(c, filter) {
  if (filter === 'staff') return c.staff
  if (c.staff) return false
  if (filter === 'unread') return c.unreadCount > 0
  if (filter === 'attention') return c.needsAttention
  return true
}

const upsertMessage = (list, message) => {
  const i = list.findIndex((m) => m._id === message._id)
  if (i === -1) return [...list, message].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  const next = [...list]
  next[i] = { ...next[i], ...message }
  return next
}

const REPORT_NOTICE = {
  document: 'Report sent on WhatsApp.',
  template: 'Report sent on WhatsApp (as an approved template, because the chat was closed).',
  notice:
    "This number hasn't been confirmed yet, so the patient got a \"report ready\" message first. The file is sent automatically when they tap \"Send my report\".",
}

// WhatsApp Web-style inbox: chat list, conversation, and the patient's details
export default function WhatsAppInboxView({ path }) {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [list, setList] = useState({ conversations: [], hasMore: false, loaded: false })
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedId, setSelectedId] = useState(chatFromUrl)
  const [detail, setDetail] = useState(null)
  const [thread, setThread] = useState({ id: '', messages: [], hasMore: false })
  const [panelOpen, setPanelOpen] = useState(() => window.matchMedia?.('(min-width: 1280px)').matches ?? false)
  const [templateOpen, setTemplateOpen] = useState(false)
  const [live, setLive] = useState('connecting')
  const [configured, setConfigured] = useState(true)
  const [toast, setToast] = useState({ type: 'success', text: '' })
  const selectedRef = useRef(selectedId)
  const filterRef = useRef(filter)

  useEffect(() => {
    selectedRef.current = selectedId
  }, [selectedId])
  useEffect(() => {
    filterRef.current = filter
  }, [filter])

  const refreshUnread = useCallback(() => {
    adminInboxApi
      .summary()
      .then((s) => {
        setWhatsAppUnread(s.unread)
        setConfigured(s.configured)
      })
      .catch(() => {})
  }, [])

  useEffect(() => refreshUnread(), [refreshUnread])

  // Chat list (search is debounced)
  useEffect(() => {
    let alive = true
    const timer = setTimeout(
      () => {
        adminInboxApi
          .conversations({ filter, q: query.trim() })
          .then((data) => alive && setList({ ...data, loaded: true }))
          .catch((err) => alive && setToast({ type: 'error', text: err.message }))
      },
      query ? 300 : 0,
    )
    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [filter, query, reloadKey])

  const loadMoreChats = () => {
    const last = list.conversations[list.conversations.length - 1]
    adminInboxApi
      .conversations({ filter, q: query.trim(), before: last?.lastMessageAt })
      .then((data) => setList((l) => ({ ...data, conversations: [...l.conversations, ...data.conversations], loaded: true })))
      .catch((err) => setToast({ type: 'error', text: err.message }))
  }

  const markRead = useCallback(
    (id) => {
      adminInboxApi
        .update(id, { read: true })
        .then((c) => {
          setList((l) => ({ ...l, conversations: l.conversations.map((x) => (x._id === c._id ? { ...x, ...c } : x)) }))
          refreshUnread()
        })
        .catch(() => {})
    },
    [refreshUnread],
  )

  // Open chat: details + latest messages
  const loadChat = useCallback(
    (id) => {
      Promise.all([adminInboxApi.get(id), adminInboxApi.messages(id)])
        .then(([d, m]) => {
          if (selectedRef.current !== id) return
          setDetail(d)
          setThread({ id, ...m })
          if (d.conversation.unreadCount > 0) markRead(id)
        })
        .catch((err) => setToast({ type: 'error', text: err.message }))
    },
    [markRead],
  )

  useEffect(() => {
    if (selectedId) loadChat(selectedId)
  }, [selectedId, loadChat])

  // Following a "chat" link while already on this page
  useEffect(() => {
    const onRoute = () => setSelectedId(chatFromUrl())
    window.addEventListener('popstate', onRoute)
    window.addEventListener('app-route-change', onRoute)
    return () => {
      window.removeEventListener('popstate', onRoute)
      window.removeEventListener('app-route-change', onRoute)
    }
  }, [])

  // Live updates
  useEffect(() => {
    const onEvent = (event, data) => {
      if (event === 'conversation') {
        setList((l) => {
          const exists = l.conversations.some((c) => c._id === data._id)
          if (!exists && !matchesFilter(data, filterRef.current)) return l
          const conversations = exists ? l.conversations.map((c) => (c._id === data._id ? { ...c, ...data } : c)) : [data, ...l.conversations]
          return { ...l, conversations: conversations.sort(byLatest) }
        })
        setDetail((d) => (d && d.conversation._id === data._id ? { ...d, conversation: { ...d.conversation, ...data } } : d))
        if (data._id === selectedRef.current && data.unreadCount > 0 && document.visibilityState === 'visible') markRead(data._id)
        else if (data.unreadCount > 0) refreshUnread()
      }
      if (event === 'message') {
        const { conversation, message } = data
        if (conversation === selectedRef.current) setThread((t) => (t.id === conversation ? { ...t, messages: upsertMessage(t.messages, message) } : t))
        setList((l) => ({
          ...l,
          conversations: l.conversations.map((c) =>
            c._id === conversation && c.lastMessageAt && new Date(c.lastMessageAt).getTime() === new Date(message.createdAt).getTime()
              ? { ...c, lastMessageStatus: message.status }
              : c,
          ),
        }))
      }
    }
    return openInboxStream(onEvent, setLive)
  }, [markRead, refreshUnread])

  // Without the live stream, refresh every 15 s
  useEffect(() => {
    if (live === 'live') return undefined
    const timer = setInterval(() => {
      setReloadKey((k) => k + 1)
      if (selectedRef.current) loadChat(selectedRef.current)
    }, POLL_MS)
    return () => clearInterval(timer)
  }, [live, loadChat])

  const select = (id, conversation) => {
    if (conversation) setList((l) => (l.conversations.some((c) => c._id === id) ? l : { ...l, conversations: [conversation, ...l.conversations] }))
    setSelectedId(id)
    window.history.replaceState(null, '', chatPath(id))
  }

  const back = () => {
    setSelectedId('')
    window.history.replaceState(null, '', path)
  }

  const loadOlder = () => {
    const first = thread.messages[0]
    adminInboxApi
      .messages(selectedId, first?._id)
      .then((m) => setThread((t) => (t.id === selectedId ? { ...t, messages: [...m.messages, ...t.messages], hasMore: m.hasMore } : t)))
      .catch((err) => setToast({ type: 'error', text: err.message }))
  }

  const onSent = (message) => setThread((t) => ({ ...t, messages: upsertMessage(t.messages, message) }))

  const resolve = () =>
    adminInboxApi
      .update(selectedId, { needsAttention: false })
      .then((c) => setDetail((d) => (d ? { ...d, conversation: { ...d.conversation, ...c } } : d)))
      .catch((err) => setToast({ type: 'error', text: err.message }))

  const current = detail && detail.conversation._id === selectedId ? detail : null

  const sendReport = async (report) => {
    const patient = current?.patients.find((p) => p._id === report.patient)
    const to = current ? formatPhone(current.conversation.waId) : ''
    if (!window.confirm(`Send "${report.title}"${patient ? ` (${patient.name})` : ''} on WhatsApp to ${to}?\n\nCheck this is the right patient and number: reports contain medical information.`)) return
    try {
      const { method, message } = await adminPatientsApi.sendReport(report._id)
      onSent(message)
      setToast(
        message.status === 'failed'
          ? { type: 'error', text: `Report not sent: ${message.error}` }
          : { type: 'success', text: REPORT_NOTICE[method] },
      )
      loadChat(selectedId)
    } catch (err) {
      setToast({ type: 'error', text: err.message })
    }
  }

  const messages = thread.id === selectedId ? thread.messages : []

  return (
    <AdminLayout path={path} title="WhatsApp" fullHeight>
      <div className="relative flex h-full overflow-hidden" style={{ background: WA.panel }}>
        <ConversationList
          className={selectedId ? 'hidden md:flex md:w-[340px] lg:w-[380px]' : 'flex w-full md:w-[340px] lg:w-[380px]'}
          conversations={list.conversations}
          hasMore={list.hasMore}
          loading={!list.loaded}
          selectedId={selectedId}
          onSelect={select}
          filter={filter}
          onFilter={setFilter}
          query={query}
          onQuery={setQuery}
          onLoadMore={loadMoreChats}
          live={live}
        />

        {selectedId ? (
          current ? (
            <>
              <ChatPane
                className="flex"
                detail={current}
                messages={messages}
                hasMore={thread.id === selectedId && thread.hasMore}
                onLoadOlder={loadOlder}
                onBack={back}
                panelOpen={panelOpen}
                onTogglePanel={() => setPanelOpen((p) => !p)}
                onSent={onSent}
                onResolve={resolve}
                onOpenTemplate={() => setTemplateOpen(true)}
                onSendReport={sendReport}
                configured={configured}
              />
              {panelOpen && (
                <PatientPanel
                  className="absolute inset-y-0 right-0 z-20 flex w-full shadow-xl sm:w-[360px] xl:static xl:z-auto xl:w-[360px] xl:shadow-none"
                  detail={current}
                  onClose={() => setPanelOpen(false)}
                  onSendReport={sendReport}
                />
              )}
              <TemplatePicker
                open={templateOpen}
                onClose={() => setTemplateOpen(false)}
                conversation={current.conversation}
                defaultName={chatName(current.conversation)}
                onSent={(m) => {
                  setTemplateOpen(false)
                  onSent(m)
                }}
              />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center bg-white">
              <Spinner label="Opening chat…" />
            </div>
          )
        ) : (
          <div className="hidden flex-1 flex-col items-center justify-center border-b-[6px] border-[#25d366] px-6 text-center md:flex" style={{ background: '#f8f9fa' }}>
            <span className="flex h-20 w-20 items-center justify-center rounded-full text-white" style={{ background: WA.accent }}>
              <MessageCircle className="h-10 w-10" aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-3xl font-light text-[#41525d]">Ejaz Hospital WhatsApp</h2>
            <p className="mt-3 max-w-md text-sm text-[#667781]">
              Patients' booking updates, reminders and replies all appear here. Choose a chat to reply, send a report or call the patient.
            </p>
            <p className="mt-8 flex items-center gap-1.5 text-xs text-[#8696a0]">
              <Lock className="h-3 w-3" aria-hidden="true" /> Only signed-in hospital staff can see these chats
            </p>
          </div>
        )}

        {toast.text && (
          <div className="absolute bottom-24 left-1/2 z-30 w-[min(92%,28rem)] -translate-x-1/2" role="status">
            <div className="relative">
              <Alert type={toast.type}>{toast.text}</Alert>
              <button
                type="button"
                onClick={() => setToast({ type: 'success', text: '' })}
                className="absolute right-2 top-2 text-xs text-slate-500 hover:text-slate-700"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
