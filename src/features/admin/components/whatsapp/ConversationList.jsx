import { useState } from 'react'
import { AlertTriangle, BellOff, MessageSquarePlus, Search } from 'lucide-react'
import { adminInboxApi } from '../../../../api'
import { Alert, Button, Field, Modal } from '../ui'
import { StatusTicks } from './MessageBubble'
import { WA, avatarColor, chatName, formatPhone, initials, listTime } from './format'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'attention', label: 'Needs attention' },
  { key: 'staff', label: 'Staff alerts' },
]

export function Avatar({ conversation, size = 'h-12 w-12 text-base' }) {
  const name = chatName(conversation)
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${size}`}
      style={{ background: avatarColor(conversation?.waId) }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}

function NewChatModal({ open, onClose, onStarted }) {
  const [form, setForm] = useState({ phone: '', name: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const conversation = await adminInboxApi.start({ phone: form.phone.trim(), name: form.name.trim() })
      setForm({ phone: '', name: '' })
      onStarted(conversation)
    } catch (err) {
      setError(err.details?.[0]?.message || err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal open={open} title="New WhatsApp chat" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <Alert>{error}</Alert>
        <Field
          label="Mobile number"
          required
          inputMode="tel"
          placeholder="98765 43210"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          hint="10-digit numbers get +91 added"
        />
        <Field label="Name (optional)" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        <p className="text-xs text-slate-500">
          WhatsApp only lets a business start a chat with an approved template. After the patient replies, you can type freely for 24 hours.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            Open chat
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default function ConversationList({ conversations, selectedId, onSelect, filter, onFilter, query, onQuery, hasMore, onLoadMore, loading, live, className }) {
  const [newChat, setNewChat] = useState(false)

  return (
    <section className={`min-h-0 flex-col border-r border-[#d1d7db] bg-white ${className}`} aria-label="Chats">
      <div className="flex items-center justify-between px-4 py-3" style={{ background: WA.panel }}>
        <div>
          <h2 className="text-lg font-semibold text-[#111b21]">Chats</h2>
          <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className={`h-1.5 w-1.5 rounded-full ${live === 'live' ? 'bg-emerald-500' : 'bg-amber-500'}`} aria-hidden="true" />
            {live === 'live' ? 'Live' : 'Reconnecting… (refreshing every 15 s)'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setNewChat(true)}
          className="rounded-full p-2 text-[#54656f] hover:bg-black/5"
          aria-label="New chat"
          title="New chat"
        >
          <MessageSquarePlus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-2 border-b border-[#e9edef] px-3 py-2">
        <label className="flex items-center gap-3 rounded-lg px-3 py-1.5" style={{ background: WA.panel }}>
          <Search className="h-4 w-4 text-[#54656f]" aria-hidden="true" />
          <span className="sr-only">Search chats</span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search name, number or patient ID"
            className="w-full bg-transparent py-1 text-sm placeholder:text-[#667781] focus:outline-none"
          />
        </label>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5" role="tablist" aria-label="Filter chats">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => onFilter(f.key)}
              className={`shrink-0 rounded-full px-3 py-1 text-[13px] transition-colors ${
                filter === f.key ? 'bg-[#e7fce3] font-medium text-[#008069]' : 'bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="min-h-0 flex-1 overflow-y-auto">
        {!loading && !conversations.length && (
          <li className="px-6 py-12 text-center text-sm text-slate-500">
            {query ? 'No chats match your search.' : filter === 'all' ? 'No WhatsApp chats yet. They appear here when patients book, enquire or message you.' : 'Nothing here.'}
          </li>
        )}
        {conversations.map((c) => {
          const active = c._id === selectedId
          const unread = c.unreadCount > 0
          return (
            <li key={c._id}>
              <button
                type="button"
                onClick={() => onSelect(c._id)}
                aria-current={active ? 'true' : undefined}
                className={`flex w-full items-center gap-3 px-3 text-left transition-colors ${active ? 'bg-[#f0f2f5]' : 'hover:bg-[#f5f6f6]'}`}
              >
                <Avatar conversation={c} />
                <span className="min-w-0 flex-1 border-b border-[#e9edef] py-3 pr-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[16px] text-[#111b21]">{chatName(c)}</span>
                    <span className={`shrink-0 text-xs ${unread ? 'font-medium text-[#1fa855]' : 'text-[#667781]'}`}>{listTime(c.lastMessageAt)}</span>
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5">
                    {c.lastMessageDirection === 'out' && <StatusTicks status={c.lastMessageStatus} className="shrink-0" />}
                    <span className="truncate text-sm text-[#667781]">{c.lastMessagePreview || formatPhone(c.waId)}</span>
                    <span className="ml-auto flex shrink-0 items-center gap-1.5">
                      {c.optedOut && <BellOff className="h-3.5 w-3.5 text-slate-400" aria-label="Opted out" />}
                      {c.needsAttention && <AlertTriangle className="h-3.5 w-3.5 text-amber-500" aria-label={c.attentionReason || 'Needs attention'} />}
                      {unread && (
                        <span className="min-w-5 rounded-full px-1.5 py-0.5 text-center text-[11px] font-bold leading-none text-white" style={{ background: '#25d366' }}>
                          {c.unreadCount}
                        </span>
                      )}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          )
        })}
        {hasMore && (
          <li className="p-3 text-center">
            <Button variant="ghost" size="sm" onClick={onLoadMore}>
              Load older chats
            </Button>
          </li>
        )}
      </ul>

      <NewChatModal
        open={newChat}
        onClose={() => setNewChat(false)}
        onStarted={(c) => {
          setNewChat(false)
          onSelect(c._id, c)
        }}
      />
    </section>
  )
}
