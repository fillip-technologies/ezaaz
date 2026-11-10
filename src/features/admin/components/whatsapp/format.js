import { useEffect, useState } from 'react'

// WhatsApp Web's light palette, used across the inbox
export const WA = {
  panel: '#f0f2f5',
  chat: '#efeae2',
  outgoing: '#d9fdd3',
  accent: '#00a884',
  accentDark: '#008069',
  read: '#53bdeb',
}

// Faint doodle pattern behind the chat, like WhatsApp's wallpaper
const DOODLE = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="#d6cfc4" stroke-width="1.4" stroke-linecap="round">' +
    '<circle cx="18" cy="20" r="6"/><path d="M60 12h10M65 7v10"/><path d="M96 22c4-6 12-6 14 0"/><rect x="12" y="70" width="14" height="10" rx="2"/>' +
    '<path d="M52 64c6 8 14 8 20 0"/><circle cx="100" cy="76" r="3"/><path d="M30 104l8-8 8 8"/><path d="M80 104h14"/><path d="M84 44l6 6"/></svg>',
)
export const CHAT_BACKGROUND = { backgroundColor: WA.chat, backgroundImage: `url("data:image/svg+xml,${DOODLE}")` }

// 919876543210 -> +91 98765 43210
export function formatPhone(waId) {
  const digits = String(waId || '').replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  return digits ? `+${digits}` : ''
}

export const telHref = (waId) => `tel:+${String(waId || '').replace(/\D/g, '')}`

export const chatName = (c) => c?.displayName || c?.profileName || formatPhone(c?.waId)

export function initials(name) {
  const parts = String(name || '').replace(/[^\p{L}\s]/gu, '').trim().split(/\s+/).filter(Boolean)
  return (parts.slice(0, 2).map((p) => p[0]).join('') || '#').toUpperCase()
}

const AVATAR_COLORS = ['#25d366', '#34b7f1', '#a259ff', '#f58a42', '#ef5a75', '#2fb5a3', '#5b7cfa', '#c0874f']
export function avatarColor(seed) {
  let hash = 0
  for (const ch of String(seed || '')) hash = (hash * 31 + ch.charCodeAt(0)) | 0
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

const sameDay = (a, b) => a.toDateString() === b.toDateString()

// Chat list time: 10:42 today, "Yesterday", weekday this week, else 12/10/26
export function listTime(value) {
  if (!value) return ''
  const date = new Date(value)
  const now = new Date()
  if (sameDay(date, now)) return timeOf(date)
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (sameDay(date, yesterday)) return 'Yesterday'
  if (now - date < 6 * 86400000) return date.toLocaleDateString('en-IN', { weekday: 'long' })
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

export const timeOf = (value) => new Date(value).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })

// Separator between days in a chat
export function dayLabel(value) {
  const date = new Date(value)
  const now = new Date()
  if (sameDay(date, now)) return 'Today'
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (sameDay(date, yesterday)) return 'Yesterday'
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function fileSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

// "14 h left" / "35 min left" for the 24-hour reply window
export function windowLeft(expiresAt, now = Date.now()) {
  if (!expiresAt) return ''
  const ms = new Date(expiresAt).getTime() - now
  if (ms <= 0) return ''
  const hours = Math.floor(ms / 3600000)
  return hours >= 1 ? `${hours} h left` : `${Math.max(1, Math.round(ms / 60000))} min left`
}

// Loads a signed-in file (report / WhatsApp media) into an object URL; revoked when no longer needed
export function useBlobUrl(load, enabled = true) {
  const [state, setState] = useState({ url: '', error: '' })
  useEffect(() => {
    if (!enabled) return undefined
    let url = ''
    let alive = true
    load()
      .then((blob) => {
        url = URL.createObjectURL(blob)
        if (alive) setState({ url, error: '' })
      })
      .catch((err) => alive && setState({ url: '', error: err.message }))
    return () => {
      alive = false
      if (url) URL.revokeObjectURL(url)
    }
  }, [load, enabled])
  return state
}

// Downloads a signed-in file under the given name
export async function downloadBlob(load, filename) {
  const blob = await load()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename || 'file'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// Opens a signed-in file in a new tab (PDF / image)
export async function openBlob(load) {
  const tab = window.open('', '_blank')
  const blob = await load()
  const url = URL.createObjectURL(blob)
  if (tab) tab.location.href = url
  else window.location.href = url
  setTimeout(() => URL.revokeObjectURL(url), 60000)
}
