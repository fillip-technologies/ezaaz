// Must match the backend (server/src/modules/gallery)
export const PHOTO_MAX_MB = 15
export const PHOTOS_PER_UPLOAD = 20
// Photos are sent in requests of at most this size, so a proxy's body limit isn't hit
export const UPLOAD_BATCH_MB = 20
export const VIDEO_MAX_MB = 100
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const VIDEO_TYPES = ['video/mp4', 'video/webm']

// Which part of the photo stays visible when a tile crops it (CSS object-position)
export const POSITIONS = [
  { value: 'center center', label: 'Center' },
  { value: 'center top', label: 'Top' },
  { value: 'center 20%', label: 'Upper (20%)' },
  { value: 'center 25%', label: 'Upper (25%)' },
  { value: 'center 75%', label: 'Lower (75%)' },
  { value: 'center bottom', label: 'Bottom' },
]

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/

// Client-side check for the preview only; the server parses the link again
export function parseYoutubeId(input) {
  const value = String(input ?? '').trim()
  if (!value) return ''
  if (YOUTUBE_ID.test(value)) return value
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    const host = url.hostname.replace(/^(www\.|m\.)/, '')
    let id = null
    if (host === 'youtu.be') id = url.pathname.split('/')[1]
    else if (['youtube.com', 'youtube-nocookie.com', 'music.youtube.com'].includes(host)) {
      id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/)?.[1]
    }
    return id && YOUTUBE_ID.test(id) ? id : null
  } catch {
    return null
  }
}

export const youtubeThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

// 162.4 seconds -> "2:42"; 3725 -> "1:02:05"
export function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return ''
  const total = Math.round(seconds)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = String(total % 60).padStart(2, '0')
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`
}

// Reads a local video file's length in the browser (there is no video processing on the server)
export function readVideoDuration(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const video = document.createElement('video')
    const done = (value) => {
      URL.revokeObjectURL(url)
      resolve(value)
    }
    video.preload = 'metadata'
    video.onloadedmetadata = () => done(formatDuration(video.duration))
    video.onerror = () => done('')
    video.src = url
  })
}

// Splits files into upload requests of at most PHOTOS_PER_UPLOAD files / UPLOAD_BATCH_MB (a larger single file goes alone)
export function uploadBatches(files) {
  const batches = []
  let current = []
  let size = 0
  for (const file of files) {
    if (current.length && (current.length >= PHOTOS_PER_UPLOAD || size + file.size > UPLOAD_BATCH_MB * 1024 * 1024)) {
      batches.push(current)
      current = []
      size = 0
    }
    current.push(file)
    size += file.size
  }
  if (current.length) batches.push(current)
  return batches
}

// Moves the item at `from` to `to` within `visible` (a filtered view of `all`) and returns the new full order
export function moveWithin(all, visible, from, to) {
  const a = all.indexOf(visible[from])
  const b = all.indexOf(visible[to])
  const next = [...all]
  ;[next[a], next[b]] = [next[b], next[a]]
  return next
}
