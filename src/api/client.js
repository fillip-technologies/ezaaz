/**
 * Single HTTP client used by every API module in this folder.
 * In development (`npm run dev`), we always use `/api` relative URL so requests
 * go through the Vite proxy. This avoids browser CORS errors when connecting to the backend.
 * In production (`npm run build`), VITE_API_URL is used directly if specified.
 */

const rawEnvUrl = (import.meta.env.VITE_API_URL || '').trim()
const isDev = import.meta.env.DEV

const BASE_URL = (isDev ? '/api' : (rawEnvUrl || '/api')).replace(/\/+$/, '')
const TOKEN_KEY = 'ejaz_admin_token'

// In dev, uploaded assets like /uploads/... are proxied by Vite (so ASSET_ORIGIN is empty).
// In production with a remote VITE_API_URL, ASSET_ORIGIN is the API host origin.
const ASSET_ORIGIN = isDev
  ? ''
  : /^https?:\/\//.test(BASE_URL)
    ? new URL(BASE_URL).origin
    : ''

// Turns a stored upload path like /uploads/doctors/x.jpg into a URL the browser can load
export function assetUrl(path) {
  if (!path) return ''
  if (/^(https?:|data:|blob:)/.test(path)) return path
  return `${ASSET_ORIGIN}${path}`
}

export const UNAUTHORIZED_EVENT = 'api:unauthorized'

export const tokenStore = {
  get() {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },
  set(token) {
    try {
      localStorage.setItem(TOKEN_KEY, token)
    } catch {
      /* storage unavailable */
    }
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY)
    } catch {
      /* storage unavailable */
    }
  },
}

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

function buildUrl(path, params) {
  const url = `${BASE_URL}${path}`
  if (!params) return url
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  ).toString()
  return query ? `${url}?${query}` : url
}

export async function request(path, { method = 'GET', body, params, auth = true } = {}) {
  const headers = { Accept: 'application/json' }
  // FormData (file uploads) is sent as-is so the browser sets the multipart boundary
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData
  if (body !== undefined && !isFormData) headers['Content-Type'] = 'application/json'

  const token = auth ? tokenStore.get() : null
  if (token) headers.Authorization = `Bearer ${token}`

  let response
  try {
    response = await fetch(buildUrl(path, params), {
      method,
      headers,
      body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
    })
  } catch {
    throw new ApiError('Unable to reach the server. Check your connection and try again.', 0)
  }

  const json = await response.json().catch(() => null)

  if (!response.ok) {
    if (response.status === 401 && token) {
      tokenStore.clear()
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
    }
    throw new ApiError(json?.message || `Request failed (${response.status})`, response.status, json?.details)
  }

  return json
}

export const http = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}
