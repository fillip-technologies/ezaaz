import { useEffect } from 'react'
import AuthProvider from './auth/AuthProvider'
import { useAuth } from './auth/useAuth'
import { Spinner } from './components/ui'
import { ADMIN_PATHS, navigate, useAdminPath } from './navigation'
import LoginView from './views/LoginView'
import ForgotPasswordView from './views/ForgotPasswordView'
import ResetPasswordView from './views/ResetPasswordView'
import DashboardView from './views/DashboardView'
import AccountView from './views/AccountView'
import DoctorsView from './views/DoctorsView'
import DoctorFormView from './views/DoctorFormView'
import BlogsAdminView from './views/BlogsAdminView'
import BlogFormView from './views/BlogFormView'
import BlogCategoriesView from './views/BlogCategoriesView'

const PUBLIC_VIEWS = {
  [ADMIN_PATHS.login]: LoginView,
  [ADMIN_PATHS.forgotPassword]: ForgotPasswordView,
  [ADMIN_PATHS.resetPassword]: ResetPasswordView,
}

const PRIVATE_VIEWS = {
  [ADMIN_PATHS.dashboard]: DashboardView,
  [ADMIN_PATHS.doctors]: DoctorsView,
  [ADMIN_PATHS.newDoctor]: DoctorFormView,
  [ADMIN_PATHS.blogs]: BlogsAdminView,
  [ADMIN_PATHS.newBlog]: BlogFormView,
  [ADMIN_PATHS.blogCategories]: BlogCategoriesView,
  [ADMIN_PATHS.account]: AccountView,
}

// Routes with a parameter, e.g. /master/doctors/<id>
const PRIVATE_PATTERNS = [
  { pattern: /^\/master\/doctors\/([a-f0-9]{24})$/, View: DoctorFormView, param: 'id' },
  { pattern: /^\/master\/blogs\/([a-f0-9]{24})$/, View: BlogFormView, param: 'id' },
]

function matchPrivate(path) {
  if (PRIVATE_VIEWS[path]) return { View: PRIVATE_VIEWS[path], params: {} }
  for (const { pattern, View, param } of PRIVATE_PATTERNS) {
    const match = path.match(pattern)
    if (match) return { View, params: { [param]: match[1] } }
  }
  return null
}

function AdminRoutes() {
  const path = useAdminPath()
  const { status } = useAuth()

  const PublicView = PUBLIC_VIEWS[path]
  const privateMatch = matchPrivate(path)
  const PrivateView = privateMatch?.View

  // Signed-in admins skip the login page; guests can only see the public auth pages
  const redirectTo =
    status === 'loading'
      ? null
      : status === 'authenticated'
        ? path === ADMIN_PATHS.login || (!PublicView && !PrivateView) ? ADMIN_PATHS.dashboard : null
        : !PublicView ? ADMIN_PATHS.login : null

  useEffect(() => {
    if (redirectTo) navigate(redirectTo, { replace: true })
  }, [redirectTo])

  if (status === 'loading' || redirectTo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <Spinner />
      </div>
    )
  }

  if (PrivateView) return <PrivateView key={path} path={path} {...privateMatch.params} />
  return <PublicView path={path} />
}

export default function AdminApp() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Admin | Ejaz Hospital'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <AuthProvider>
        <AdminRoutes />
      </AuthProvider>
    </div>
  )
}
