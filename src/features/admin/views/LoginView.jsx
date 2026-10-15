import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { Alert, Button, Field, Link } from '../components/ui'
import { useAuth } from '../auth/useAuth'
import { ADMIN_PATHS, navigate } from '../navigation'

export default function LoginView() {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email.trim(), form.password)
      navigate(ADMIN_PATHS.dashboard, { replace: true })
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Sign in" subtitle="Welcome back. Sign in to manage Ejaz Hospital.">
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <Alert>{error}</Alert>
        <Field
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          required
          autoFocus
        />
        <div>
          <div className="relative">
            <Field
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              inputClassName="pr-10"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={onChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute bottom-2 right-2 rounded-md p-1 text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div className="mt-2 text-right">
            <Link to={ADMIN_PATHS.forgotPassword} className="text-sm font-medium text-[#0091da] hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type="submit" loading={loading} disabled={!form.email || !form.password} className="w-full">
          Sign in
        </Button>
      </form>
    </AuthLayout>
  )
}
