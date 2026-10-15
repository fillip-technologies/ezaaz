import { useState } from 'react'
import { authApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Field } from '../components/ui'
import { useAuth } from '../auth/useAuth'

const MIN_LENGTH = 8

function ProfileForm() {
  const { admin, setAdmin } = useAuth()
  const [form, setForm] = useState({ name: admin?.name ?? '', email: admin?.email ?? '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [saving, setSaving] = useState(false)

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: undefined }))
  }
  const unchanged = form.name.trim() === admin?.name && form.email.trim().toLowerCase() === admin?.email

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: '', message: '' })
    setSaving(true)
    try {
      setAdmin(await authApi.updateProfile({ name: form.name.trim(), email: form.email.trim() }))
      setStatus({ type: 'success', message: 'Profile updated.' })
    } catch (err) {
      if (err.details?.length) setErrors(Object.fromEntries(err.details.map((d) => [d.field, d.message])))
      setStatus({ type: 'error', message: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Profile</h2>
      <p className="mt-1 text-sm text-slate-500">Password reset links are sent to this email.</p>
      <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
        <Alert type={status.type || 'error'}>{status.message}</Alert>
        <Field label="Full name" name="name" value={form.name} onChange={onChange} error={errors.name} required />
        <Field
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={onChange}
          error={errors.email}
          required
        />
        <div className="flex justify-end">
          <Button type="submit" loading={saving} disabled={unchanged || !form.name.trim() || !form.email.trim()}>
            Save profile
          </Button>
        </div>
      </form>
    </section>
  )
}

function PasswordForm() {
  const { startSession } = useAuth()
  const empty = { currentPassword: '', newPassword: '', confirm: '' }
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [saving, setSaving] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const tooShort = form.newPassword && form.newPassword.length < MIN_LENGTH
  const mismatch = form.confirm && form.newPassword !== form.confirm

  const onSubmit = async (e) => {
    e.preventDefault()
    if (tooShort || mismatch) return
    setStatus({ type: '', message: '' })
    setSaving(true)
    try {
      // Changing the password invalidates old sessions, so store the fresh token
      startSession(await authApi.changePassword(form.currentPassword, form.newPassword))
      setForm(empty)
      setStatus({ type: 'success', message: 'Password changed. Other devices have been signed out.' })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Change password</h2>
      <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
        <Alert type={status.type || 'error'}>{status.message}</Alert>
        <Field
          label="Current password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          value={form.currentPassword}
          onChange={onChange}
          required
        />
        <Field
          label="New password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          value={form.newPassword}
          onChange={onChange}
          error={tooShort ? `Use at least ${MIN_LENGTH} characters` : ''}
          hint={`At least ${MIN_LENGTH} characters`}
          required
        />
        <Field
          label="Confirm new password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={onChange}
          error={mismatch ? "Passwords don't match" : ''}
          required
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            loading={saving}
            disabled={!form.currentPassword || !form.newPassword || !form.confirm || tooShort || mismatch}
          >
            Change password
          </Button>
        </div>
      </form>
    </section>
  )
}

export default function AccountView({ path }) {
  return (
    <AdminLayout path={path} title="Account">
      <div className="grid max-w-5xl gap-6 lg:grid-cols-2">
        <ProfileForm />
        <PasswordForm />
      </div>
    </AdminLayout>
  )
}
