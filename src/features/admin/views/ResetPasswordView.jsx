import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { authApi } from '../../../api'
import AuthLayout from '../components/AuthLayout'
import { Alert, Button, Field, Link } from '../components/ui'
import { useAuth } from '../auth/useAuth'
import { ADMIN_PATHS, navigate } from '../navigation'

const MIN_LENGTH = 8

export default function ResetPasswordView() {
  const { startSession } = useAuth()
  const [token] = useState(() => new URLSearchParams(window.location.search).get('token') || '')
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const tooShort = form.password && form.password.length < MIN_LENGTH
  const mismatch = form.confirm && form.password !== form.confirm

  const onSubmit = async (e) => {
    e.preventDefault()
    if (tooShort || mismatch) return
    setError('')
    setLoading(true)
    try {
      startSession(await authApi.resetPassword(token, form.password))
      navigate(ADMIN_PATHS.dashboard, { replace: true })
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="You'll be signed in once your password is updated.">
      {!token ? (
        <Alert>This reset link is missing its token. Request a new link and try again.</Alert>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <Alert>{error}</Alert>
          <Field
            label="New password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={onChange}
            error={tooShort ? `Use at least ${MIN_LENGTH} characters` : ''}
            hint={`At least ${MIN_LENGTH} characters`}
            required
            autoFocus
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
          <Button
            type="submit"
            loading={loading}
            disabled={!form.password || !form.confirm || tooShort || mismatch}
            className="w-full"
          >
            Reset password
          </Button>
        </form>
      )}
      <div className="mt-6 flex flex-wrap justify-between gap-3 text-sm font-medium">
        <Link to={ADMIN_PATHS.login} className="inline-flex items-center gap-1.5 text-[#0091da] hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
        <Link to={ADMIN_PATHS.forgotPassword} className="text-[#0091da] hover:underline">
          Request a new link
        </Link>
      </div>
    </AuthLayout>
  )
}
