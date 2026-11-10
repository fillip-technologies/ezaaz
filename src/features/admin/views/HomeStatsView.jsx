import { useEffect, useState } from 'react'
import { ArrowLeft, Plus, RotateCcw, Save } from 'lucide-react'
import { adminSiteApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Field, Link, Spinner } from '../components/ui'
import { ReorderButtons } from '../components/formParts'
import { ADMIN_PATHS } from '../navigation'
import { STAT_ICONS, statIcon } from '../../site/statIcons'
import enHome from '../../../i18n/locales/en/home/data.json'
import hiHome from '../../../i18n/locales/hi/home/data.json'

// Keep in sync with MAX_HERO_STATS in the server's site.model.js
const MAX_STATS = 6

// The numbers the website shows until the admin saves their own
const BUILT_IN = enHome.hero.stats.map((s, i) => ({
  icon: s.id,
  value: s.value,
  label: { en: s.label, hi: hiHome.hero.stats[i]?.label || '' },
}))

const copy = (stats) => stats.map((s) => ({ icon: s.icon, value: s.value, label: { en: s.label?.en || '', hi: s.label?.hi || '' } }))

function validate(stats) {
  const errors = {}
  stats.forEach((s, i) => {
    if (!s.value.trim()) errors[`${i}.value`] = 'Enter the number, e.g. 15,000+'
    if (!s.label.en.trim()) errors[`${i}.label.en`] = 'Enter the label in English'
  })
  return errors
}

// Server validation details look like { field: 'heroStats.0.label.en', message }
const serverErrors = (details) =>
  Object.fromEntries((details || []).map(({ field, message }) => [String(field).replace(/^heroStats\./, ''), message]))

// The stats bar at the bottom of the home page header
export default function HomeStatsView({ path }) {
  const [stats, setStats] = useState([])
  const [isCustom, setIsCustom] = useState(false)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })

  const apply = (settings) => {
    const custom = settings?.heroStats || []
    setIsCustom(custom.length > 0)
    setStats(copy(custom.length ? custom : BUILT_IN))
    setErrors({})
  }

  useEffect(() => {
    let cancelled = false
    adminSiteApi
      .get()
      .then((data) => !cancelled && apply(data))
      .catch((err) => !cancelled && setStatus({ type: 'error', message: err.message }))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  const change = (index, patch) => setStats((list) => list.map((s, i) => (i === index ? { ...s, ...patch } : s)))
  const changeLabel = (index, lang, text) => setStats((list) => list.map((s, i) => (i === index ? { ...s, label: { ...s.label, [lang]: text } } : s)))
  const move = (from, to) =>
    setStats((list) => {
      const next = [...list]
      next.splice(to, 0, next.splice(from, 1)[0])
      return next
    })
  const remove = (index) => setStats((list) => list.filter((_, i) => i !== index))
  const add = () => setStats((list) => [...list, { icon: 'award', value: '', label: { en: '', hi: '' } }])

  const onSave = async (e) => {
    e.preventDefault()
    if (!stats.length) return setStatus({ type: 'error', message: 'Add at least one stat, or use the built-in numbers.' })
    const found = validate(stats)
    setErrors(found)
    if (Object.keys(found).length) return setStatus({ type: 'error', message: 'Fix the highlighted fields.' })
    setBusy('save')
    try {
      apply(await adminSiteApi.saveHeroStats(stats.map((s) => ({ ...s, value: s.value.trim() }))))
      setStatus({ type: 'success', message: 'Stats saved. The home page now shows these numbers.' })
    } catch (err) {
      setErrors(serverErrors(err.details))
      setStatus({ type: 'error', message: err.message })
    } finally {
      setBusy('')
    }
  }

  const onReset = async () => {
    if (!window.confirm('Go back to the built-in numbers? Your saved stats will be removed.')) return
    setBusy('reset')
    try {
      apply(await adminSiteApi.saveHeroStats([]))
      setStatus({ type: 'success', message: 'The home page is back to the built-in numbers.' })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setBusy('')
    }
  }

  return (
    <AdminLayout
      path={path}
      title="Home page stats"
      actions={
        <Link
          to={ADMIN_PATHS.settings}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Settings</span>
        </Link>
      }
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <Alert type={status.type || 'error'}>{status.message}</Alert>

        {loading ? (
          <Spinner label="Loading stats…" />
        ) : (
          <form onSubmit={onSave} noValidate className="space-y-6">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-slate-900">Stats bar</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Shown at the bottom of the home page header, in this order. Numbers count up when the page opens, so start the value with
                    a number, e.g. "15,000+" or "35+".
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isCustom ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isCustom ? 'Your numbers' : 'Built-in numbers'}
                </span>
              </div>

              {/* Preview in the website's colours */}
              <div className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 px-4 py-3">
                <div className="flex min-w-max items-center gap-6">
                  {stats.map((s, i) => {
                    const Icon = statIcon(s.icon, i)
                    return (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-400/30 bg-orange-500/15 text-orange-400">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-lg font-black leading-tight text-white">{s.value || '—'}</span>
                          <span className="block text-xs font-semibold text-slate-300">{s.label.en || 'Label'}</span>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <ol className="mt-5 space-y-4">
                {stats.map((s, i) => (
                  <li key={i} className="rounded-lg border border-slate-200 p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-700">Stat {i + 1}</p>
                      <ReorderButtons index={i} count={stats.length} onMove={move} onRemove={remove} label={`stat ${i + 1}`} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Number *"
                        value={s.value}
                        maxLength={20}
                        placeholder="15,000+"
                        error={errors[`${i}.value`]}
                        onChange={(e) => change(i, { value: e.target.value })}
                      />
                      <Field label="Icon" as="select" value={s.icon} onChange={(e) => change(i, { icon: e.target.value })}>
                        {Object.entries(STAT_ICONS).map(([key, { label }]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </Field>
                      <Field
                        label="Label (English) *"
                        value={s.label.en}
                        maxLength={60}
                        placeholder="Total Successful Operations"
                        error={errors[`${i}.label.en`]}
                        onChange={(e) => changeLabel(i, 'en', e.target.value)}
                      />
                      <Field
                        label="Label (हिन्दी)"
                        lang="hi"
                        value={s.label.hi}
                        maxLength={60}
                        hint="Optional, English is shown if empty"
                        error={errors[`${i}.label.hi`]}
                        onChange={(e) => changeLabel(i, 'hi', e.target.value)}
                      />
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-4">
                <Button variant="secondary" disabled={stats.length >= MAX_STATS} onClick={add}>
                  <Plus className="h-4 w-4" aria-hidden="true" /> Add stat
                </Button>
                {stats.length >= MAX_STATS && <span className="ml-3 text-xs text-slate-500">Up to {MAX_STATS} stats fit in the bar.</span>}
              </div>
            </section>

            <div className="flex flex-wrap justify-end gap-2">
              {isCustom && (
                <Button variant="secondary" loading={busy === 'reset'} disabled={Boolean(busy)} onClick={onReset}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" /> Use built-in numbers
                </Button>
              )}
              <Button type="submit" loading={busy === 'save'} disabled={Boolean(busy)}>
                <Save className="h-4 w-4" aria-hidden="true" /> Save stats
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  )
}
