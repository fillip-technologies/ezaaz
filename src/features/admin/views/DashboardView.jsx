import { UserCog } from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import { Link } from '../components/ui'
import { useAuth } from '../auth/useAuth'
import { ADMIN_PATHS } from '../navigation'

const formatDateTime = (value) =>
  value ? new Date(value).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—'

export default function DashboardView({ path }) {
  const { admin } = useAuth()

  return (
    <AdminLayout path={path} title="Dashboard">
      <div className="max-w-3xl space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Welcome, {admin?.name}</h2>
          <p className="mt-1 text-sm text-slate-500">You're signed in to the Ejaz Hospital admin panel.</p>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="mt-0.5 font-medium text-slate-900">{admin?.email}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Last sign-in</dt>
              <dd className="mt-0.5 font-medium text-slate-900">{formatDateTime(admin?.lastLoginAt)}</dd>
            </div>
          </dl>
        </section>

        <Link
          to={ADMIN_PATHS.account}
          className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-[#0091da]"
        >
          <span className="rounded-lg bg-[#003a70]/10 p-2.5 text-[#003a70]">
            <UserCog className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-semibold text-slate-900">Account settings</span>
            <span className="block text-sm text-slate-500">Update your name, email and password</span>
          </span>
        </Link>
      </div>
    </AdminLayout>
  )
}
