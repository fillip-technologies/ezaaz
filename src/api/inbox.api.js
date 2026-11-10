import { apiUrl, http, requestBlob, tokenStore } from './client'

// Admin panel: WhatsApp inbox (one conversation per WhatsApp number)
export const adminInboxApi = {
  // { unread, attention, configured }
  summary: () => http.get('/admin/inbox/summary').then((res) => res.data),
  // { conversations, hasMore }; filter = all | unread | attention | staff
  conversations: (params) => http.get('/admin/inbox/conversations', { params }).then((res) => res.data),
  start: (data) => http.post('/admin/inbox/conversations', data).then((res) => res.data),
  // { conversation, patients, upcoming, pastAppointments, reports }
  get: (id) => http.get(`/admin/inbox/conversations/${id}`).then((res) => res.data),
  update: (id, data) => http.patch(`/admin/inbox/conversations/${id}`, data).then((res) => res.data),
  // { messages (oldest first), hasMore }
  messages: (id, before) => http.get(`/admin/inbox/conversations/${id}/messages`, { params: { before } }).then((res) => res.data),
  sendText: (id, text) => http.post(`/admin/inbox/conversations/${id}/messages`, { type: 'text', text }).then((res) => res.data),
  sendTemplate: (id, key, values) =>
    http.post(`/admin/inbox/conversations/${id}/messages`, { type: 'template', key, values }).then((res) => res.data),
  sendReport: (id, reportId) => http.post(`/admin/inbox/conversations/${id}/messages`, { type: 'report', reportId }).then((res) => res.data),
  sendFile: (id, file, caption) => {
    const form = new FormData()
    form.append('file', file)
    if (caption) form.append('caption', caption)
    return http.post(`/admin/inbox/conversations/${id}/files`, form).then((res) => res.data)
  },
  templates: () => http.get('/admin/inbox/templates').then((res) => res.data),
  media: (messageId) => requestBlob(`/admin/inbox/media/${messageId}`),
}

// Live inbox updates over server-sent events. fetch (not EventSource) so the sign-in token can be sent.
// Calls onEvent(name, data) and reconnects after drops; returns a function that stops it.
export function openInboxStream(onEvent, onStatus = () => {}) {
  let stopped = false
  let controller
  let retryMs = 2000

  const connect = async () => {
    controller = new AbortController()
    try {
      const response = await fetch(apiUrl('/admin/inbox/stream'), {
        headers: { Authorization: `Bearer ${tokenStore.get()}`, Accept: 'text/event-stream' },
        signal: controller.signal,
      })
      if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`)
      onStatus('live')
      retryMs = 2000
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
      let buffer = ''
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += value
        let end
        while ((end = buffer.indexOf('\n\n')) !== -1) {
          const chunk = buffer.slice(0, end)
          buffer = buffer.slice(end + 2)
          let event = 'message'
          let data = ''
          for (const line of chunk.split('\n')) {
            if (line.startsWith('event:')) event = line.slice(6).trim()
            else if (line.startsWith('data:')) data += line.slice(5).trim()
          }
          if (data) {
            try {
              onEvent(event, JSON.parse(data))
            } catch {
              /* ignore a malformed event */
            }
          }
        }
      }
    } catch {
      /* dropped: reconnect below */
    }
    if (stopped) return
    onStatus('offline')
    setTimeout(connect, retryMs)
    retryMs = Math.min(retryMs * 2, 30000)
  }

  connect()
  return () => {
    stopped = true
    controller?.abort()
  }
}
