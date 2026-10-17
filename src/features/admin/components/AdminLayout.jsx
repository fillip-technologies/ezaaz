import { useState } from 'react'
import { CalendarCheck, Inbox, LayoutDashboard, LogOut, Menu, Newspaper, Settings, Stethoscope, UserCog, X } from 'lucide-react'
import logoWhiteImg from '../../../assets/Logo_white_text.png'
import { useAuth } from '../auth/useAuth'
import { ADMIN_PATHS, navigate } from '../navigation'
import { Link } from './ui'

const NAV_ITEMS = [
  { to: ADMIN_PATHS.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { to: ADMIN_PATHS.doctors, label: 'Doctors', icon: Stethoscope },
  { to: ADMIN_PATHS.appointments, label: 'Appointments', icon: CalendarCheck },
  { to: ADMIN_PATHS.blogs, label: 'Blogs', icon: Newspaper },
  { to: ADMIN_PATHS.enquiries, label: 'Contact Forms', icon: Inbox },
  { to: ADMIN_PATHS.settings, label: 'Settings', icon: Settings },
  { to: ADMIN_PATHS.account, label: 'Account', icon: UserCog },
]

export default function AdminLayout({ path, title, actions, children }) {
  const { admin, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const onLogout = () => {
    logout()
    navigate(ADMIN_PATHS.login, { replace: true })
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-[#002244] text-white">
      <div className="flex items-center justify-between px-5 py-5">
        <img src={logoWhiteImg} alt="Ejaz Hospital" className="h-12 w-auto" />
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="rounded-md p-1 text-sky-100/70 hover:bg-white/10 lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-3" aria-label="Admin">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const active = path === to || path.startsWith(`${to}/`)
          return (
            <Link
              key={to}
              to={to}
              onClickCapture={() => setMenuOpen(false)}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? 'bg-[#0091da] text-white' : 'text-sky-100/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <p className="truncate text-sm font-semibold">{admin?.name}</p>
        <p className="truncate text-xs text-sky-100/60">{admin?.email}</p>
        <button
          type="button"
          onClick={onLogout}
          className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-sky-100/80 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">{sidebar}</aside>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <aside className="relative h-full w-64">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="flex-1 truncate text-lg font-semibold sm:text-xl">{title}</h1>
          {actions}
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
