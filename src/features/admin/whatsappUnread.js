import { useEffect, useState } from 'react'
import { adminInboxApi } from '../../api'

// Unread WhatsApp chats for the sidebar badge: refreshed every 30 s, and pushed by the inbox when it marks chats read
const UNREAD_EVENT = 'admin:whatsapp-unread'

export const setWhatsAppUnread = (count) => window.dispatchEvent(new CustomEvent(UNREAD_EVENT, { detail: count }))

export function useWhatsAppUnread() {
  const [unread, setUnread] = useState(0)
  useEffect(() => {
    let alive = true
    const load = () =>
      adminInboxApi
        .summary()
        .then((s) => alive && setUnread(s.unread))
        .catch(() => {})
    load()
    const timer = setInterval(load, 30000)
    const onSet = (e) => setUnread(e.detail)
    window.addEventListener(UNREAD_EVENT, onSet)
    return () => {
      alive = false
      clearInterval(timer)
      window.removeEventListener(UNREAD_EVENT, onSet)
    }
  }, [])
  return unread
}
