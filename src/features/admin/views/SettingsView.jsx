import { Building2, CalendarClock, CalendarOff, ChevronRight } from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import { Link } from '../components/ui'
import { ADMIN_PATHS } from '../navigation'

// Website settings managed from the admin panel. Add a card here for each new settings page.
const SETTINGS = [
  {
    to: ADMIN_PATHS.departments,
    icon: Building2,
    title: 'Departments',
    description: 'The "Department / Specialty" options on the website\'s contact form',
  },
  {
    to: ADMIN_PATHS.slotPlans,
    icon: CalendarClock,
    title: 'Slot plans',
    description: 'Reusable appointment hours and slot settings, assigned to many doctors at once',
  },
  {
    to: ADMIN_PATHS.leaves,
    icon: CalendarOff,
    title: 'Leave & holidays',
    description: 'Block appointment slots when a doctor is away or the hospital is closed',
  },
]

export default function SettingsView({ path }) {
  return (
    <AdminLayout path={path} title="Settings">
      <div className="max-w-3xl space-y-3">
        {SETTINGS.map(({ to, icon: Icon, title, description }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-[#0091da]"
          >
            <span className="rounded-lg bg-[#003a70]/10 p-2.5 text-[#003a70]">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-slate-900">{title}</span>
              <span className="block text-sm text-slate-500">{description}</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </AdminLayout>
  )
}
