// Published posts with a future date are scheduled: they appear on the website on that date
export function blogStatus(blog) {
  if (blog.status !== 'published') return { key: 'draft', label: 'Draft', className: 'bg-slate-100 text-slate-600' }
  if (new Date(blog.publishedAt) > new Date()) return { key: 'scheduled', label: 'Scheduled', className: 'bg-amber-100 text-amber-800' }
  return { key: 'published', label: 'Published', className: 'bg-emerald-100 text-emerald-800' }
}

// Blog dates are calendar days, stored at 12:00 UTC so they read the same day in every timezone
export function toDateInput(value) {
  const d = value ? new Date(value) : new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function fromDateInput(value) {
  if (!value) return undefined
  const noonUtc = `${value}T12:00:00.000Z`
  // "Today" must go live now, not at 12:00 UTC (17:30 IST)
  if (value === toDateInput() && new Date(noonUtc) > new Date()) return new Date().toISOString()
  return noonUtc
}
