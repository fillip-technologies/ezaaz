import { useCallback, useEffect, useMemo, useState } from 'react'
import { Building2, Calendar, FileText, Mail, Phone, Search, Stethoscope, Trash2 } from 'lucide-react'
import { adminEnquiriesApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Field, Modal, Spinner } from '../components/ui'

const ENQUIRY_STATUS = {
  new: { label: 'New', className: 'bg-amber-100 text-amber-800' },
  contacted: { label: 'Contacted', className: 'bg-sky-100 text-sky-800' },
  closed: { label: 'Closed', className: 'bg-slate-100 text-slate-600' },
}

// Tabs: which website form the enquiries came from
const FORM_TABS = [
  { key: 'all', label: 'All forms' },
  { key: 'contact', label: 'Contact page' },
  { key: 'home', label: 'Home page' },
  { key: 'specialty', label: 'Specialty pages' },
  { key: 'doctors', label: 'Doctors page' },
]
const FORM_NAMES = {
  contact: 'Contact page form',
  home: 'Home page form',
  specialty: 'Specialty page enquiry form',
  doctors: 'Doctors page enquiry form',
}
const SOURCE_LABELS = { contact: 'Contact page', home: 'Home page', specialty: 'Specialty page', doctors: 'Doctors page' }

const formatDate = (value) =>
  value ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value)) : ''

const formatDateTime = (value) =>
  value
    ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(
        new Date(value),
      )
    : ''

// Submissions of the website's enquiry forms (contact page + home page)
export default function EnquiriesView({ path }) {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [formTab, setFormTab] = useState('all')
  const [pageFilter, setPageFilter] = useState('all')

  const [open, setOpen] = useState(null)
  const [draft, setDraft] = useState({ status: 'new', adminNote: '' })
  const [saving, setSaving] = useState(false)
  const [modalError, setModalError] = useState('')
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let cancelled = false
    adminEnquiriesApi
      .list()
      .then((list) => !cancelled && setEnquiries(list))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  // Per form: total and how many are still new
  const tabCounts = useMemo(() => {
    const c = Object.fromEntries(FORM_TABS.map((t) => [t.key, { total: 0, new: 0 }]))
    for (const e of enquiries) {
      for (const key of ['all', e.source]) {
        if (!c[key]) continue
        c[key].total++
        if (e.status === 'new') c[key].new++
      }
    }
    return c
  }, [enquiries])

  // Specialty pages tab: narrow down to one specialty
  const specialtyPages = useMemo(
    () => [...new Set(enquiries.filter((e) => e.source === 'specialty' && e.page).map((e) => e.page))].sort(),
    [enquiries],
  )

  const inTab = useMemo(
    () =>
      enquiries.filter((e) => {
        if (formTab !== 'all' && e.source !== formTab) return false
        if (formTab === 'specialty' && pageFilter !== 'all' && e.page !== pageFilter) return false
        return true
      }),
    [enquiries, formTab, pageFilter],
  )

  const counts = useMemo(() => {
    const c = { all: inTab.length, new: 0, contacted: 0, closed: 0 }
    for (const e of inTab) c[e.status]++
    return c
  }, [inTab])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return inTab.filter((e) => {
      if (statusFilter !== 'all' && e.status !== statusFilter) return false
      if (!q) return true
      return [e.fullName, e.phone, e.email, e.departmentName, e.doctorName, e.page, e.message].some((v) => v?.toLowerCase().includes(q))
    })
  }, [inTab, search, statusFilter])

  const openEnquiry = (enquiry) => {
    setOpen(enquiry)
    setDraft({ status: enquiry.status, adminNote: enquiry.adminNote || '' })
    setModalError('')
    setConfirmingDelete(false)
  }

  const closeModal = useCallback(() => {
    setOpen(null)
    setConfirmingDelete(false)
  }, [])

  const replace = (updated) => setEnquiries((list) => list.map((e) => (e._id === updated._id ? { ...e, ...updated } : e)))

  const onSave = async () => {
    setSaving(true)
    setModalError('')
    try {
      const updated = await adminEnquiriesApi.update(open._id, { status: draft.status, adminNote: draft.adminNote.trim() })
      replace(updated)
      setNotice(`Enquiry from ${updated.fullName} was updated.`)
      setOpen(null)
    } catch (err) {
      setModalError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // Quick action from the list: mark a new enquiry as contacted
  const markContacted = async (enquiry) => {
    setError('')
    try {
      replace(await adminEnquiriesApi.update(enquiry._id, { status: 'contacted' }))
      setNotice(`${enquiry.fullName} marked as contacted.`)
    } catch (err) {
      setError(err.message)
    }
  }

  const onDelete = async () => {
    setDeleting(true)
    setModalError('')
    try {
      await adminEnquiriesApi.remove(open._id)
      setEnquiries((list) => list.filter((e) => e._id !== open._id))
      setNotice(`Enquiry from ${open.fullName} was deleted.`)
      setOpen(null)
    } catch (err) {
      setModalError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AdminLayout
      path={path}
      title="Contact forms"
    >
      <div className="space-y-4">
        <Alert type="success">{notice}</Alert>
        <Alert>{error}</Alert>

        <div className="overflow-x-auto border-b border-slate-200">
          <nav className="-mb-px flex gap-1" aria-label="Choose a form">
            {FORM_TABS.map((tab) => {
              const active = formTab === tab.key
              const { total, new: newCount } = tabCounts[tab.key]
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setFormTab(tab.key)
                    setPageFilter('all')
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                    active ? 'border-[#0091da] text-[#003a70]' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                  <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-[#0091da]/10 text-[#003a70]' : 'bg-slate-100 text-slate-600'}`}>
                    {total}
                  </span>
                  {newCount > 0 && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800" title={`${newCount} new`}>
                      {newCount} new
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search enquiries</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, department, doctor or specialty"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40"
            />
          </label>
          {formTab === 'specialty' && (
            <label>
              <span className="sr-only">Filter by specialty</span>
              <select
                value={pageFilter}
                onChange={(e) => setPageFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40 sm:w-56"
              >
                <option value="all">All specialties</option>
                {specialtyPages.map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            <span className="sr-only">Filter by status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-[#0091da] focus:outline-none focus:ring-2 focus:ring-[#0091da]/40 sm:w-48"
            >
              <option value="all">All ({counts.all})</option>
              <option value="new">New ({counts.new})</option>
              <option value="contacted">Contacted ({counts.contacted})</option>
              <option value="closed">Closed ({counts.closed})</option>
            </select>
          </label>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <Spinner label="Loading enquiries…" />
          ) : inTab.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="font-medium text-slate-900">No enquiries yet</p>
              <p className="mt-1 text-sm text-slate-500">
                {formTab === 'all'
                  ? "Requests sent from any of the website's forms appear here."
                  : `Requests sent from the ${FORM_NAMES[formTab].toLowerCase()} appear here.`}
              </p>
            </div>
          ) : visible.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-slate-500">No enquiries match your filters.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {visible.map((e) => {
                const status = ENQUIRY_STATUS[e.status]
                return (
                  <li key={e._id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:flex-nowrap sm:px-5">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEnquiry(e)}
                          className="truncate text-left font-semibold text-slate-900 hover:text-[#0091da]"
                        >
                          {e.fullName}
                        </button>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}>{status.label}</span>
                        {formTab === 'all' && (
                          <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
                            {SOURCE_LABELS[e.source] || SOURCE_LABELS.contact}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <a href={`tel:${e.phone.replace(/[\s-]/g, '')}`} className="font-medium text-slate-700 hover:text-[#0091da]">
                          {e.phone}
                        </a>
                        {e.source === 'specialty' && e.page && <span className="font-medium text-[#003a70]">{e.page}</span>}
                        {e.departmentName && <span>{e.departmentName}</span>}
                        {e.doctorName && <span>{e.doctorName}</span>}
                        {e.preferredDate && <span>Wants {formatDate(e.preferredDate)}</span>}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 sm:w-36 sm:text-right">{formatDateTime(e.createdAt)}</span>
                    <div className="flex items-center gap-2">
                      {e.status === 'new' && (
                        <Button variant="secondary" size="sm" onClick={() => markContacted(e)}>
                          Mark contacted
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => openEnquiry(e)}>
                        View
                      </Button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <Modal
        open={Boolean(open)}
        title={open ? `Enquiry from ${open.fullName}` : ''}
        onClose={closeModal}
        footer={
          confirmingDelete ? (
            <>
              <Button variant="ghost" onClick={() => setConfirmingDelete(false)}>
                Cancel
              </Button>
              <Button variant="danger" loading={deleting} onClick={onDelete}>
                Delete enquiry
              </Button>
            </>
          ) : (
            <>
              <Button variant="dangerGhost" className="mr-auto" onClick={() => setConfirmingDelete(true)}>
                <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
              </Button>
              <Button variant="ghost" onClick={closeModal}>
                Close
              </Button>
              <Button loading={saving} onClick={onSave}>
                Save
              </Button>
            </>
          )
        }
      >
        {open && (
          <div className="space-y-5 text-sm">
            <Alert>{modalError}</Alert>
            {confirmingDelete && (
              <Alert>This enquiry will be permanently deleted. This can't be undone.</Alert>
            )}

            <dl className="space-y-2.5">
              <Detail icon={Phone} label="Phone">
                <a href={`tel:${open.phone.replace(/[\s-]/g, '')}`} className="font-medium text-[#0091da] hover:underline">
                  {open.phone}
                </a>
              </Detail>
              {open.email && (
                <Detail icon={Mail} label="Email">
                  <span className="break-all">{open.email}</span>
                </Detail>
              )}
              <Detail icon={FileText} label="Form">{FORM_NAMES[open.source] || FORM_NAMES.contact}</Detail>
              {open.source === 'specialty' && <Detail icon={Building2} label="Specialty">{open.page || '—'}</Detail>}
              {/* Only the contact page and home page forms ask for a department */}
              {['contact', 'home'].includes(open.source) && (
                <Detail icon={Building2} label="Department">{open.departmentName || '—'}</Detail>
              )}
              {/* Only the contact page form asks for a doctor and date */}
              {open.source === 'contact' && (
                <>
                  <Detail icon={Stethoscope} label="Doctor">{open.doctorName || 'Any available specialist'}</Detail>
                  <Detail icon={Calendar} label="Preferred date">{formatDate(open.preferredDate) || '—'}</Detail>
                </>
              )}
            </dl>

            <div>
              <p className="mb-1 font-medium text-slate-700">Message</p>
              <p className="whitespace-pre-wrap rounded-lg bg-slate-50 px-3.5 py-2.5 text-slate-700">{open.message || '—'}</p>
              <p className="mt-1.5 text-xs text-slate-400">Received {formatDateTime(open.createdAt)}</p>
            </div>

            <Field
              as="select"
              label="Status"
              value={draft.status}
              onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value }))}
            >
              {Object.entries(ENQUIRY_STATUS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Field>
            <Field
              as="textarea"
              rows={3}
              label="Internal note"
              hint="Only visible to admins, e.g. appointment booked for 22 Oct"
              maxLength={1000}
              value={draft.adminNote}
              onChange={(e) => setDraft((d) => ({ ...d, adminNote: e.target.value }))}
            />
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}

function Detail({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
      <dt className="w-28 shrink-0 text-slate-500">{label}</dt>
      <dd className="min-w-0 flex-1 text-slate-900">{children}</dd>
    </div>
  )
}
