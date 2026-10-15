import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { authApi } from '../../../api'
import AuthLayout from '../components/AuthLayout'
import { Alert, Button, Field, Link } from '../components/ui'
import { ADMIN_PATHS } from '../navigation'

export default function ForgotPasswordView() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      setMessage(await authApi.forgotPassword(email.trim()))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your admin email and we'll send you a link to reset your password."
    >
      {message ? (
        <div className="space-y-5">
          <Alert type="success">{message}</Alert>
          <p className="text-sm text-slate-500">The link expires shortly. Check your spam folder if you don't see it.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <Alert>{error}</Alert>
          <Field
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <Button type="submit" loading={loading} disabled={!email} className="w-full">
            Send reset link
          </Button>
        </form>
      )}
      <Link
        to={ADMIN_PATHS.login}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#0091da] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
    </AuthLayout>
  )
}
