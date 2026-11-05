import { useState, useEffect, useMemo } from 'react'
import {
  CalendarCheck,
  Calendar,
  Clock,
  Stethoscope,
  Inbox,
  Newspaper,
  Plus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  UserCog,
  RefreshCw,
  Building2,
  Phone,
  Mail,
  ChevronRight,
  Activity,
  CheckCircle2,
  AlertCircle,
  User,
  Sparkles,
  FileText,
  BadgeCheck,
} from 'lucide-react'
import {
  adminAppointmentsApi,
  adminDoctorsApi,
  adminEnquiriesApi,
  adminBlogsApi,
} from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Link } from '../components/ui'
import { useAuth } from '../auth/useAuth'
import { ADMIN_PATHS, navigate } from '../navigation'
import { clinicToday, formatDay, formatTime } from '../appointmentOptions'

const formatDateTime = (value) =>
  value
    ? new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }).format(new Date(value))
    : '—'

const getAppointmentBadge = (status) => {
  switch (status) {
    case 'confirmed':
      return {
        label: 'Confirmed',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
        dot: 'bg-emerald-500',
      }
    case 'completed':
      return {
        label: 'Completed',
        className: 'bg-sky-50 text-sky-700 border-sky-200/90',
        dot: 'bg-sky-500',
      }
    case 'cancelled':
    case 'no_show':
      return {
        label: status === 'no_show' ? 'No-show' : 'Cancelled',
        className: 'bg-slate-100 text-slate-600 border-slate-200',
        dot: 'bg-slate-400',
      }
    default:
      return {
        label: status,
        className: 'bg-slate-100 text-slate-600 border-slate-200',
        dot: 'bg-slate-400',
      }
  }
}

const getEnquiryBadge = (status) => {
  switch (status) {
    case 'contacted':
      return {
        label: 'Contacted',
        className: 'bg-sky-50 text-sky-700 border-sky-200/90',
      }
    case 'closed':
      return {
        label: 'Closed',
        className: 'bg-slate-100 text-slate-600 border-slate-200',
      }
    case 'new':
    default:
      return {
        label: 'New',
        className: 'bg-amber-50 text-amber-700 border-amber-200/90',
      }
  }
}

export default function DashboardView({ path }) {
  const { admin } = useAuth()
  const today = clinicToday()

  const [loading, setLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [blogs, setBlogs] = useState([])

  // Fetch all administrative metrics in parallel safely
  useEffect(() => {
    let cancelled = false
    setLoading(true)

    Promise.allSettled([
      adminAppointmentsApi.list().catch(() => []),
      adminDoctorsApi.list().catch(() => []),
      adminEnquiriesApi.list().catch(() => []),
      adminBlogsApi.list().catch(() => []),
    ]).then(([apptsRes, docsRes, enqsRes, blogsRes]) => {
      if (cancelled) return
      const appts = apptsRes.status === 'fulfilled' && Array.isArray(apptsRes.value) ? apptsRes.value : []
      const docs = docsRes.status === 'fulfilled' && Array.isArray(docsRes.value) ? docsRes.value : []
      const enqs = enqsRes.status === 'fulfilled' && Array.isArray(enqsRes.value) ? enqsRes.value : []
      const blogsList = blogsRes.status === 'fulfilled' && Array.isArray(blogsRes.value) ? blogsRes.value : []

      setAppointments(appts)
      setDoctors(docs)
      setEnquiries(enqs)
      setBlogs(blogsList)
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  // Calculated metrics
  const stats = useMemo(() => {
    const todayAppts = appointments.filter((a) => a.date === today).length
    const activeDocs = doctors.filter((d) => d.isActive !== false).length
    const newEnqs = enquiries.filter((e) => e.status === 'new' || !e.status).length
    const publishedBlogs = blogs.filter((b) => b.isPublished !== false).length

    return {
      totalAppointments: appointments.length,
      todayAppts,
      totalDoctors: doctors.length,
      activeDocs,
      totalEnquiries: enquiries.length,
      newEnqs,
      totalBlogs: blogs.length,
      publishedBlogs,
    }
  }, [appointments, doctors, enquiries, blogs, today])

  // Recent 5 appointments sorted by latest
  const recentAppointments = useMemo(() => {
    return [...appointments]
      .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
      .slice(0, 5)
  }, [appointments])

  // Recent 4 enquiries sorted by latest
  const recentEnquiries = useMemo(() => {
    return [...enquiries]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 4)
  }, [enquiries])

  // Quick Action Header Buttons
  const headerActions = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setReloadKey((k) => k + 1)}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        title="Refresh Dashboard Data"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-[#0091da]' : 'text-slate-500'}`} />
        <span className="hidden sm:inline">Refresh</span>
      </button>

      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg bg-[#003a70] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#00284d] transition-colors shadow-xs"
      >
        <span>Live Site</span>
        <ExternalLink className="h-3.5 w-3.5 text-sky-200" />
      </a>
    </div>
  )

  const adminInitials = useMemo(() => {
    if (!admin?.name) return 'AD'
    return admin.name
      .split(' ')
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }, [admin?.name])

  return (
    <AdminLayout path={path} title="Dashboard" actions={headerActions}>
      <div className="w-full space-y-6 sm:space-y-8">
        
        {/* ======================================================== */}
        {/* 1. CLEAN REFINED WELCOME HEADER                          */}
        {/* Minimalist, balanced, and seamless with the light theme  */}
        {/* ======================================================== */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Welcome back, {admin?.name || 'Administrator'}
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  System Online
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500">
                Ejaz Clinic & Advanced Surgical Hospital • Operational Overview & Management Portal
              </p>

              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 pt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {formatDay(today)}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  {admin?.email}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  Last login: {formatDateTime(admin?.lastLoginAt)}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2.5 pt-1 sm:pt-0">
              <Link
                to={ADMIN_PATHS.appointments}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
              >
                <CalendarCheck className="h-3.5 w-3.5 text-[#003a70]" />
                <span>View Schedule</span>
              </Link>

              <Link
                to={ADMIN_PATHS.newDoctor}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#003a70] hover:bg-[#00284d] px-3.5 py-2 text-xs font-semibold text-white transition-all shadow-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Specialist</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. KEY METRIC KPI CARDS (4 Columns)                      */}
        {/* High visual fidelity cards with live numbers & badges    */}
        {/* ======================================================== */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          
          {/* KPI 1: Appointments */}
          <Link
            to={ADMIN_PATHS.appointments}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Appointments
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {loading ? '—' : stats.totalAppointments}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <CalendarCheck className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 font-bold text-amber-700 border border-amber-200/70">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {stats.todayAppts} Today
              </span>
              <span className="font-semibold text-blue-600 group-hover:underline inline-flex items-center gap-0.5">
                Manage <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </Link>

          {/* KPI 2: Doctors & Faculty */}
          <Link
            to={ADMIN_PATHS.doctors}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Doctors & Specialists
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {loading ? '—' : stats.totalDoctors}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <Stethoscope className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700 border border-emerald-200/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {stats.activeDocs} Active in OPD
              </span>
              <span className="font-semibold text-emerald-600 group-hover:underline inline-flex items-center gap-0.5">
                Directory <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </Link>

          {/* KPI 3: Patient Enquiries */}
          <Link
            to={ADMIN_PATHS.enquiries}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Patient Inquiries
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {loading ? '—' : stats.totalEnquiries}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                <Inbox className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 font-bold text-indigo-700 border border-indigo-200/70">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                {stats.newEnqs} New Submissions
              </span>
              <span className="font-semibold text-indigo-600 group-hover:underline inline-flex items-center gap-0.5">
                Review <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </Link>

          {/* KPI 4: Published Articles */}
          <Link
            to={ADMIN_PATHS.blogs}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Articles & Insights
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  {loading ? '—' : stats.totalBlogs}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-[#d9532f] transition-colors group-hover:bg-[#d9532f] group-hover:text-white">
                <Newspaper className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 font-bold text-amber-700 border border-amber-200/70">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {stats.publishedBlogs} Published
              </span>
              <span className="font-semibold text-amber-700 group-hover:underline inline-flex items-center gap-0.5">
                Articles <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </Link>

        </section>

        {/* ======================================================== */}
        {/* 3. TWO-COLUMN OPERATIONAL DASHBOARD LAYOUT               */}
        {/* Left: Recent Activity Feed | Right: Actions & Profile   */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* ====================================================== */}
          {/* LEFT COLUMN (8 cols): Appointments & Patient Enquiries  */}
          {/* ====================================================== */}
          <div className="space-y-6 lg:col-span-8">
            
            {/* Recent Appointments Table / List */}
            <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4 text-[#003a70]" />
                    Recent Appointments & Consultation Requests
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live appointment requests submitted through the patient booking portal
                  </p>
                </div>
                <Link
                  to={ADMIN_PATHS.appointments}
                  className="text-xs font-semibold text-[#0091da] hover:text-[#0070a8] transition-colors flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>View All Bookings</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="p-4 sm:p-6">
                {loading ? (
                  <div className="space-y-3 py-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-14 rounded-xl bg-slate-100 animate-pulse" />
                    ))}
                  </div>
                ) : recentAppointments.length === 0 ? (
                  <div className="py-10 text-center space-y-2.5">
                    <div className="h-12 w-12 rounded-full bg-blue-50 text-[#003a70] flex items-center justify-center mx-auto">
                      <CalendarCheck className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">No appointments recorded yet</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      When patients book appointments on the website, their details and booked dates will show up here.
                    </p>
                    <Link
                      to={ADMIN_PATHS.appointments}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#003a70] hover:underline pt-2"
                    >
                      Open Appointment Calendar <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 overflow-x-auto">
                    {recentAppointments.map((appt) => {
                      const badge = getAppointmentBadge(appt.status)
                      return (
                        <div
                          key={appt._id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 gap-3 hover:bg-slate-50/70 rounded-xl px-2.5 transition-colors"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="h-10 w-10 rounded-full bg-[#003a70]/10 text-[#003a70] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              {appt.patientName ? appt.patientName[0].toUpperCase() : 'P'}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-slate-900 truncate">
                                  {appt.patientName}
                                </p>
                                {appt.ref && (
                                  <span className="text-[11px] font-mono text-slate-400">
                                    #{appt.ref}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500 mt-0.5">
                                <span className="flex items-center gap-1 text-slate-700">
                                  <Stethoscope className="h-3 w-3 text-emerald-600" />
                                  {appt.doctorName || 'Specialist'}
                                </span>
                                {appt.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="h-3 w-3 text-slate-400" />
                                    {appt.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pl-13 sm:pl-0">
                            <div className="text-left sm:text-right">
                              <p className="text-xs font-semibold text-slate-800">
                                {formatDay(appt.date)}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {formatTime(appt.time)}
                              </p>
                            </div>

                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${badge.className}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                              {badge.label}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Contact Form Enquiries */}
            <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <Inbox className="h-4 w-4 text-[#003a70]" />
                    Latest Patient Inquiries & Messages
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Messages submitted from contact, home, and specialty inquiry forms
                  </p>
                </div>
                <Link
                  to={ADMIN_PATHS.enquiries}
                  className="text-xs font-semibold text-[#0091da] hover:text-[#0070a8] transition-colors flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>View All Inquiries</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="p-4 sm:p-6">
                {loading ? (
                  <div className="space-y-3 py-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-16 rounded-xl bg-slate-100 animate-pulse" />
                    ))}
                  </div>
                ) : recentEnquiries.length === 0 ? (
                  <div className="py-8 text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                      <Inbox className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">No new inquiries at this moment</p>
                    <p className="text-xs text-slate-500">
                      When visitors send inquiries through the website, they will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {recentEnquiries.map((enq) => {
                      const badge = getEnquiryBadge(enq.status)
                      return (
                        <div
                          key={enq._id}
                          className="py-3.5 hover:bg-slate-50/70 rounded-xl px-2.5 transition-colors space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-slate-900">{enq.name}</p>
                              {enq.department && (
                                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                                  {enq.department}
                                </span>
                              )}
                            </div>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold border ${badge.className}`}
                            >
                              {badge.label}
                            </span>
                          </div>

                          {enq.message && (
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              "{enq.message}"
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-400 pt-0.5">
                            {enq.email && <span>{enq.email}</span>}
                            {enq.phone && <span>• {enq.phone}</span>}
                            <span>• {formatDateTime(enq.createdAt)}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN (4 cols): Fast Actions & Security Profile  */}
          {/* ====================================================== */}
          <div className="space-y-6 lg:col-span-4">
            
            {/* Quick Actions Grid */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Quick Management
                </h3>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">
                  Fast Actions
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <Link
                  to={ADMIN_PATHS.newDoctor}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-[#003a70] hover:bg-slate-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Stethoscope className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-[#003a70]">
                        Add Specialist Doctor
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Create bio, OPD slots & credentials
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#003a70] group-hover:translate-x-0.5 transition-all" />
                </Link>

                <Link
                  to={ADMIN_PATHS.appointments}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-emerald-600 hover:bg-slate-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <CalendarCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                        Manage Appointments
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Confirm, reschedule or cancel
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <Link
                  to={ADMIN_PATHS.newBlog}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-amber-600 hover:bg-slate-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <Newspaper className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-amber-800">
                        Write Health Article
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Publish news and medical blogs
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <Link
                  to={ADMIN_PATHS.leaves}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-rose-600 hover:bg-slate-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-rose-700">
                        Doctor Leaves & Holidays
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Block calendar dates & absence
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <Link
                  to={ADMIN_PATHS.slotPlans}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-sky-600 hover:bg-slate-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-sky-700">
                        OPD Slot Rosters
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Reusable schedule templates
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <Link
                  to={ADMIN_PATHS.departments}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-purple-600 hover:bg-slate-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-purple-700">
                        Clinical Departments
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Manage specialty categories
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </div>

            {/* Admin Profile & Security Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#002244] to-[#0091da] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                  {adminInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {admin?.name || 'Administrator'}
                    </h4>
                    <BadgeCheck className="h-4 w-4 text-sky-600 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{admin?.email}</p>
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700 border border-emerald-200 mt-1.5">
                    <ShieldCheck className="h-3 w-3" />
                    Super Administrator
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 text-xs space-y-1.5 text-slate-500">
                <p>
                  <span className="font-semibold text-slate-700">Hospital: </span>
                  Ejaz Clinic & Advanced Surgical Hospital
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Last sign-in: </span>
                  {formatDateTime(admin?.lastLoginAt)}
                </p>
              </div>

              <Link
                to={ADMIN_PATHS.account}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-50 hover:bg-[#003a70] text-slate-700 hover:text-white border border-slate-200 hover:border-[#003a70] py-2.5 px-3 text-xs font-bold transition-all cursor-pointer"
              >
                <UserCog className="h-3.5 w-3.5" />
                <span>Account & Password Settings</span>
              </Link>
            </div>

            {/* Hospital Contact & Emergency Reference Card */}
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-sky-50/40 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#003a70]">
                <Activity className="h-4 w-4 text-emerald-600 shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Hospital Quick Reference
                </h4>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-800">Helpline: +91 6203 770 070</span>
                </p>
                <p className="flex items-start gap-2">
                  <Building2 className="h-3.5 w-3.5 text-[#003a70] shrink-0 mt-0.5" />
                  <span>Ashok Rajpath, Near PMCH, Patna, Bihar 800006</span>
                </p>
              </div>

              <div className="pt-1">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 py-2 text-xs font-semibold text-[#003a70] shadow-2xs transition-colors"
                >
                  <span>Open Public Website</span>
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  )
}
