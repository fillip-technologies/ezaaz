import { useEffect, useState } from 'react'
import { adminInboxApi } from '../../../../api'
import { Alert, Button, Field, Modal, Spinner } from '../ui'
import { WA } from './format'

const STATUS_BADGE = {
  APPROVED: ['Approved', 'bg-emerald-50 text-emerald-700'],
  PENDING: ['Waiting for Meta approval', 'bg-amber-50 text-amber-700'],
  REJECTED: ['Rejected by Meta', 'bg-red-50 text-red-700'],
  MISSING: ['Not created yet: run npm run whatsapp:templates', 'bg-red-50 text-red-700'],
  NOT_CONFIGURED: ['WhatsApp not connected: will only be logged', 'bg-slate-100 text-slate-600'],
  UNKNOWN: ['Status unknown', 'bg-slate-100 text-slate-600'],
}

// Approved message templates: the only way to message a patient more than 24 hours after their last message
export default function TemplatePicker({ open, onClose, conversation, defaultName, onSent }) {
  const [templates, setTemplates] = useState(null)
  const [key, setKey] = useState('')
  const [values, setValues] = useState({})
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return undefined
    let alive = true
    adminInboxApi
      .templates()
      .then((list) => {
        if (!alive) return
        setTemplates(list)
        setKey((k) => k || list[0]?.key || '')
      })
      .catch((err) => alive && setError(err.message))
    return () => {
      alive = false
    }
  }, [open])

  const template = templates?.find((t) => t.key === key)
  const valueOf = (field) => values[field.key] ?? (field.key === 'name' ? defaultName || '' : '')
  const preview = template
    ? template.body.replace(/\{\{(\d+)\}\}/g, (_, i) => valueOf(template.fields[i - 1]) || `[${template.fields[i - 1]?.label}]`)
    : ''

  const send = async () => {
    setSending(true)
    setError('')
    try {
      const filled = Object.fromEntries(template.fields.map((f) => [f.key, valueOf(f).trim()]))
      const message = await adminInboxApi.sendTemplate(conversation._id, key, filled)
      setValues({})
      onSent(message)
    } catch (err) {
      setError(err.details?.map((d) => d.message).join('. ') || err.message)
    } finally {
      setSending(false)
    }
  }

  const [statusLabel, statusClass] = STATUS_BADGE[template?.status] || STATUS_BADGE.UNKNOWN

  return (
    <Modal
      open={open}
      title="Send a template"
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={sending} disabled={!template} onClick={send} className="bg-[#00a884]! hover:bg-[#008069]! focus-visible:ring-[#00a884]!">
            Send template
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Alert>{error}</Alert>
        {!templates ? (
          <Spinner />
        ) : (
          <>
            <Field as="select" label="Template" value={key} onChange={(e) => setKey(e.target.value)}>
              {templates.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </Field>
            {template && (
              <>
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass}`}>{statusLabel}</span>
                {template.fields.map((f) => (
                  <Field
                    key={f.key}
                    label={f.label}
                    placeholder={f.placeholder}
                    maxLength={200}
                    value={valueOf(f)}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  />
                ))}
                <div>
                  <p className="mb-1.5 text-sm font-medium text-slate-700">Preview</p>
                  <div className="rounded-lg p-3" style={{ background: WA.chat }}>
                    <p className="ml-auto max-w-[90%] whitespace-pre-wrap rounded-lg rounded-tr-none px-3 py-2 text-sm text-[#111b21] shadow-sm" style={{ background: WA.outgoing }}>
                      {preview}
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  )
}
