import { http, requestBlob } from './client'

// Admin panel: patient records (profile, visits, reports)
export const adminPatientsApi = {
  list: (q) => http.get('/admin/patients', { params: { q } }).then((res) => res.data),
  // { patient, appointments, visits, reports, conversation }
  get: (id) => http.get(`/admin/patients/${id}`).then((res) => res.data),
  create: (data) => http.post('/admin/patients', data).then((res) => res.data),
  // Also takes reportsConsent / whatsappConsent (true | false) and phoneVerified (true)
  update: (id, data) => http.patch(`/admin/patients/${id}`, data).then((res) => res.data),

  createVisit: (patientId, data) => http.post(`/admin/patients/${patientId}/visits`, data).then((res) => res.data),
  updateVisit: (id, data) => http.patch(`/admin/visits/${id}`, data).then((res) => res.data),
  removeVisit: (id) => http.delete(`/admin/visits/${id}`),

  uploadReport: (patientId, file, fields) => {
    const form = new FormData()
    form.append('file', file)
    for (const [key, value] of Object.entries(fields)) if (value) form.append(key, value)
    return http.post(`/admin/patients/${patientId}/reports`, form).then((res) => res.data)
  },
  updateReport: (id, data) => http.patch(`/admin/reports/${id}`, data).then((res) => res.data),
  removeReport: (id) => http.delete(`/admin/reports/${id}`),
  reportFile: (id) => requestBlob(`/admin/reports/${id}/file`),
  // { method: 'document' | 'template' | 'notice', message }
  sendReport: (id) => http.post(`/admin/reports/${id}/send-whatsapp`).then((res) => res.data),
}
