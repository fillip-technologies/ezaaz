import { useEffect, useState } from 'react'
import { Plus, Search, ShieldCheck, Users } from 'lucide-react'
import { adminPatientsApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Link, Spinner } from '../components/ui'
import { ADMIN_PATHS, patientPath } from '../navigation'

const formatUpdated = (value) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value))

// Patient records: created automatically from bookings, or added at the desk
export default function PatientsView({ path }) {
  const [query, setQuery] = useState('')
  const [patients, setPatients] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    const timer = setTimeout(
      () =>
        adminPatientsApi
          .list(query.trim())
          .then((list) => alive && setPatients(list))
          .catch((err) => alive && setError(err.message)),
      query ? 300 : 0,
    )
    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [query])

  return (
    <AdminLayout
      path={path}
      title="Patients"
      actions={
        <Link to={ADMIN_PATHS.newPatient}>
          <Button size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" /> New patient
          </Button>
        </Link>
      }
    >
      <div className="space-y-4">
        <Alert>{error}</Alert>
        <label className="flex max-w-xl items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 focus-within:border-[#0091da] focus-within:ring-2 focus-within:ring-[#0091da]/40">
          <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
          <span className="sr-only">Search patients</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, mobile number or patient ID (EJZ-P-…)"
            className="w-full bg-transparent py-2.5 text-sm focus:outline-none"
          />
        </label>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          {!patients ? (
            <Spinner />
          ) : !patients.length ? (
            <div className="flex flex-col items-center px-6 py-14 text-center text-sm text-slate-500">
              <Users className="mb-3 h-8 w-8 text-slate-300" aria-hidden="true" />
              {query ? 'No patients match your search.' : 'No patients yet. A record is created for each new booking, or add one at the desk.'}
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {patients.map((p) => (
                <li key={p._id}>
                  <Link to={patientPath(p._id)} className="flex flex-wrap items-center gap-x-6 gap-y-1 px-4 py-3 hover:bg-slate-50 sm:px-5">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-slate-900">{p.name}</span>
                      <span className="block font-mono text-xs text-slate-500">{p.uhid}</span>
                    </span>
                    <span className="w-36 text-sm text-slate-700">{p.phone}</span>
                    <span className="w-24 text-sm capitalize text-slate-600">
                      {p.age != null ? `${p.age} y · ` : ''}
                      {p.gender}
                    </span>
                    <span className="flex w-28 items-center gap-1 text-xs text-slate-500">
                      {p.consent?.reports?.at && <ShieldCheck className="h-4 w-4 text-emerald-600" aria-label="Reports on WhatsApp allowed" />}
                      {formatUpdated(p.updatedAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {patients?.length === 50 && <p className="text-xs text-slate-500">Showing the 50 most recent. Search to find others.</p>}
      </div>
    </AdminLayout>
  )
}
