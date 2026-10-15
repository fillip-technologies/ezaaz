import { useCallback, useEffect, useMemo, useState } from 'react'
import { ExternalLink, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { adminDoctorsApi } from '../../../api'
import { doctorPhoto } from '../../doctors/useDoctors'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Link, Modal, Spinner, Switch } from '../components/ui'
import { ADMIN_PATHS, doctorEditPath, navigate, takeFlash } from '../navigation'
import { CATEGORY_LABELS } from '../doctorOptions'

export default function DoctorsView({ path }) {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState(takeFlash)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [togglingId, setTogglingId] = useState('')

  const [deleting, setDeleting] = useState(null)
  const [deleteError, setDeleteError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    adminDoctorsApi
      .list()
      .then((list) => !cancelled && setDoctors(list))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return doctors.filter((d) => {
      if (statusFilter === 'active' && !d.isActive) return false
      if (statusFilter === 'hidden' && d.isActive) return false
      if (!q) return true
      return [d.name?.en, d.name?.hi, d.specialty?.en, d.department?.en, d.slug]
        .some((v) => v?.toLowerCase().includes(q))
    })
  }, [doctors, search, statusFilter])

  const activeCount = doctors.filter((d) => d.isActive).length

  const toggleActive = async (doctor) => {
    setTogglingId(doctor._id)
    setError('')
    try {
      const updated = await adminDoctorsApi.update(doctor._id, { isActive: !doctor.isActive })
      setDoctors((list) => list.map((d) => (d._id === updated._id ? updated : d)))
      setNotice(`${updated.name.en} is now ${updated.isActive ? 'visible on' : 'hidden from'} the website.`)
    } catch (err) {
      setError(err.message)
    } finally {
      setTogglingId('')
    }
  }

  const closeDelete = useCallback(() => {
    setDeleting(null)
    setDeleteError('')
  }, [])

  const confirmDelete = async () => {
    setDeleteLoading(true)
    setDeleteError('')
    try {
      await adminDoctorsApi.remove(deleting._id)
      setDoctors((list) => list.filter((d) => d._id !== deleting._id))
      setNotice(`${deleting.name.en} was deleted.`)
      setDeleting(null)
    } catch (err) {
      setDeleteError(err.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <AdminLayout
      path={path}
      title="Doctors"
      actions={
        <Button onClick={() => navigate(ADMIN_PATHS.newDoctor)}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Add doctor</span>
        </Button>
      }
    >
      <div className="space-y-4">
        <Alert type="success">{notice}</Alert>
        <Alert>{error}</Alert>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search doctors</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, specialty or department"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40"
            />
          </label>
          <label>
            <span className="sr-only">Filter by visibility</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40 sm:w-44"
            >
              <option value="all">All ({doctors.length})</option>
              <option value="active">Visible ({activeCount})</option>
              <option value="hidden">Hidden ({doctors.length - activeCount})</option>
            </select>
          </label>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <Spinner label="Loading doctors…" />
          ) : doctors.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="font-medium text-slate-900">No doctors yet</p>
              <p className="mt-1 text-sm text-slate-500">Doctors you add here appear on the website.</p>
              <Button className="mt-5" onClick={() => navigate(ADMIN_PATHS.newDoctor)}>
                <Plus className="h-4 w-4" aria-hidden="true" /> Add the first doctor
              </Button>
            </div>
          ) : visible.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-slate-500">No doctors match your filters.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {visible.map((doctor) => (
                <li key={doctor._id} className="flex flex-wrap items-center gap-4 px-4 py-3 sm:flex-nowrap sm:px-5">
                  <img
                    src={doctorPhoto(doctor)}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-lg border border-slate-200 bg-slate-100 object-cover object-top"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to={doctorEditPath(doctor._id)}
                      className="block truncate font-semibold text-slate-900 hover:text-[#0091da]"
                    >
                      {doctor.name.en}
                    </Link>
                    <p className="truncate text-sm text-slate-500">{doctor.specialty?.en}</p>
                    <p className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-slate-400">
                      <span>{CATEGORY_LABELS[doctor.category]}</span>
                      {doctor.experienceYears > 0 && <span>{doctor.experienceYears}+ yrs</span>}
                      <span>Order {doctor.order}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={doctor.isActive}
                      disabled={togglingId === doctor._id}
                      onChange={() => toggleActive(doctor)}
                      label={`Show ${doctor.name.en} on the website`}
                    />
                    <span className={`w-14 text-xs font-medium ${doctor.isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                      {doctor.isActive ? 'Visible' : 'Hidden'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {doctor.isActive && (
                      <a
                        href={`/doctor-profile?id=${doctor.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        aria-label={`View ${doctor.name.en} on the website`}
                        title="View on website"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(doctorEditPath(doctor._id))}
                      aria-label={`Edit ${doctor.name.en}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="dangerGhost"
                      size="icon"
                      onClick={() => setDeleting(doctor)}
                      aria-label={`Delete ${doctor.name.en}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Modal
        open={Boolean(deleting)}
        title="Delete doctor"
        onClose={closeDelete}
        footer={
          <>
            <Button variant="secondary" onClick={closeDelete}>
              Cancel
            </Button>
            <Button variant="danger" loading={deleteLoading} onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Alert>{deleteError}</Alert>
          <p className="text-sm text-slate-600">
            Delete <strong className="text-slate-900">{deleting?.name?.en}</strong> and their photo? They will be removed
            from the website immediately. This can't be undone. To take a doctor off the website temporarily, switch
            them to <em>Hidden</em> instead.
          </p>
        </div>
      </Modal>
    </AdminLayout>
  )
}
