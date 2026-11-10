import { useState } from 'react'
import { BellOff, CalendarCheck, CheckCircle2, ExternalLink, FileText, Phone, Send, ShieldCheck, ShieldOff, X } from 'lucide-react'
import { Link } from '../ui'
import { ADMIN_PATHS, patientPath } from '../../navigation'
import { formatDay, formatTime } from '../../appointmentOptions'
import { Avatar } from './ConversationList'
import { WA, chatName, formatPhone, telHref, windowLeft } from './format'

const REPORT_TYPES = { lab: 'Lab', radiology: 'Radiology', prescription: 'Prescription', discharge_summary: 'Discharge summary', bill: 'Bill', other: 'Other' }

function Section({ title, children, action }) {
  return (
    <section className="bg-white px-5 py-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm text-[#008069]">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}

// Right-hand panel of a chat: who is on this number, their bookings and reports
export default function PatientPanel({ detail, onClose, onSendReport, className }) {
  const [sending, setSending] = useState('')
  const { conversation, patients, upcoming, pastAppointments, reports } = detail
  const left = windowLeft(conversation.windowExpiresAt)

  const send = async (report) => {
    setSending(report._id)
    try {
      await onSendReport(report)
    } finally {
      setSending('')
    }
  }

  return (
    <aside className={`min-h-0 flex-col overflow-y-auto border-l border-[#d1d7db] ${className}`} style={{ background: WA.panel }} aria-label="Patient details">
      <div className="flex items-center gap-4 bg-white px-5 py-3">
        <button type="button" onClick={onClose} className="rounded-full p-1.5 text-[#54656f] hover:bg-black/5" aria-label="Close patient details">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-base font-medium text-[#111b21]">Contact info</h2>
      </div>

      <div className="mb-2 flex flex-col items-center bg-white px-5 pb-5 pt-2 text-center">
        <Avatar conversation={conversation} size="h-24 w-24 text-3xl" />
        <p className="mt-3 text-xl text-[#111b21]">{chatName(conversation)}</p>
        <p className="text-sm text-[#667781]">{formatPhone(conversation.waId)}</p>
        {conversation.profileName && conversation.profileName !== chatName(conversation) && (
          <p className="text-xs text-[#667781]">WhatsApp name: ~{conversation.profileName}</p>
        )}
        <a
          href={telHref(conversation.waId)}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#d1d7db] px-5 py-2 text-sm font-medium text-[#008069] hover:bg-[#f0f2f5]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> Call {formatPhone(conversation.waId)}
        </a>
        <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
          {conversation.optedOut ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-red-700">
              <BellOff className="h-3 w-3" aria-hidden="true" /> Replied STOP
            </span>
          ) : left ? (
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">Chat open · {left}</span>
          ) : (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">Chat closed · templates only</span>
          )}
        </div>
      </div>

      <div className="space-y-2 pb-4">
        <Section
          title={`Patients on this number (${patients.length})`}
          action={
            <Link to={ADMIN_PATHS.newPatient} className="text-xs font-medium text-[#008069] hover:underline">
              + Add
            </Link>
          }
        >
          {!patients.length && <p className="text-sm text-slate-500">No patient record yet. One is created when this number books.</p>}
          <ul className="space-y-2">
            {patients.map((p) => (
              <li key={p._id}>
                <Link to={patientPath(p._id)} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-[#f5f6f6]">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-[#111b21]">{p.name}</span>
                    <span className="block text-xs text-[#667781]">
                      {p.uhid}
                      {p.age != null ? ` · ${p.age} y` : ''} · {p.gender}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    {p.consent?.reports?.at ? (
                      <ShieldCheck className="h-4 w-4 text-emerald-600" aria-label="Agreed to get reports on WhatsApp" />
                    ) : (
                      <ShieldOff className="h-4 w-4 text-slate-400" aria-label="No report consent yet" />
                    )}
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Upcoming appointments">
          {!upcoming.length && <p className="text-sm text-slate-500">None.</p>}
          <ul className="space-y-2">
            {upcoming.map((a) => (
              <li key={a._id} className="rounded-lg border border-[#e9edef] px-3 py-2 text-sm">
                <p className="flex items-center gap-1.5 font-medium text-[#111b21]">
                  <CalendarCheck className="h-4 w-4 text-[#008069]" aria-hidden="true" />
                  {formatDay(a.date)} · {formatTime(a.time)}
                </p>
                <p className="text-xs text-[#667781]">
                  {a.patientName} · {a.doctorName} · <span className="font-mono">{a.ref}</span>
                </p>
                {a.changeRequestedAt ? (
                  <p className="mt-1 text-xs font-medium text-amber-700">Asked to change the time: call to rebook</p>
                ) : a.patientConfirmedAt ? (
                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> Confirmed they're coming
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
          {pastAppointments.length > 0 && <p className="mt-2 text-xs text-[#667781]">{pastAppointments.length} earlier / closed booking(s) on the patient pages.</p>}
        </Section>

        <Section title="Reports">
          {!reports.length && <p className="text-sm text-slate-500">No reports uploaded. Add them on the patient page.</p>}
          <ul className="space-y-2">
            {reports.map((r) => (
              <li key={r._id} className="flex items-center gap-2 rounded-lg border border-[#e9edef] px-3 py-2">
                <FileText className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-[#111b21]">{r.title}</span>
                  <span className="block text-xs text-[#667781]">
                    {REPORT_TYPES[r.type] || r.type}
                    {r.sends?.length ? ` · sent ${r.sends.length}×` : ''}
                  </span>
                </span>
                <button
                  type="button"
                  disabled={Boolean(sending) || conversation.optedOut}
                  onClick={() => send(r)}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-white disabled:opacity-50"
                  style={{ background: WA.accent }}
                >
                  <Send className="h-3 w-3" aria-hidden="true" /> {sending === r._id ? 'Sending…' : 'Send'}
                </button>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </aside>
  )
}
