import { useEffect, useId } from 'react'
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react'
import { navigate } from '../navigation'

const cx = (...classes) => classes.filter(Boolean).join(' ')

const BUTTON_VARIANTS = {
  primary: 'bg-[#003a70] text-white hover:bg-[#002b54] focus-visible:ring-[#0091da]',
  secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  ghost: 'text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-400',
  dangerGhost: 'text-red-600 hover:bg-red-50 focus-visible:ring-red-500',
}

const BUTTON_SIZES = {
  md: 'px-4 py-2.5',
  sm: 'px-3 py-1.5',
  icon: 'p-2',
}

export function Button({ variant = 'primary', size = 'md', loading = false, className, children, disabled, ...props }) {
  return (
    <button
      type="button"
      {...props}
      disabled={disabled || loading}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        BUTTON_SIZES[size],
        BUTTON_VARIANTS[variant],
        className,
      )}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  )
}

export function Field({ label, error, hint, className, inputClassName, as = 'input', children, ...props }) {
  const id = useId()
  const Control = as
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <Control
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? `${id}-msg` : undefined}
        className={cx(
          'block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-[#0091da]/40 focus:border-[#0091da]',
          error ? 'border-red-400' : 'border-slate-300',
          inputClassName,
        )}
        {...props}
      >
        {children}
      </Control>
      {(error || hint) && (
        <p id={`${id}-msg`} className={cx('mt-1.5 text-xs', error ? 'text-red-600' : 'text-slate-500')}>
          {error || hint}
        </p>
      )}
    </div>
  )
}

export function Alert({ type = 'error', children }) {
  if (!children) return null
  const isError = type === 'error'
  const Icon = isError ? AlertCircle : CheckCircle2
  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={cx(
        'flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm',
        isError ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700',
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  )
}

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500">
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      {label}
    </div>
  )
}

export function Link({ to, className, children, ...props }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        navigate(to)
      }}
      {...props}
    >
      {children}
    </a>
  )
}

export function Switch({ checked, onChange, label, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cx(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0091da] focus-visible:ring-offset-2 disabled:opacity-60',
        checked ? 'bg-emerald-500' : 'bg-slate-300',
      )}
    >
      <span
        className={cx(
          'inline-block h-5 w-5 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5',
        )}
      />
    </button>
  )
}

export function Modal({ open, title, onClose, children, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">{footer}</div>}
      </div>
    </div>
  )
}
