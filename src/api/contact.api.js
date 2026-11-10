import { http } from './client'
import i18n from '../i18n/i18n'

// Website: department dropdown + contact form submission
export const contactApi = {
  departments: () => http.get('/departments', { auth: false }).then((res) => res.data),
  // The site language picks the English or Hindi WhatsApp acknowledgement
  submit: (data) => http.post('/contact', { language: i18n.language === 'hi' ? 'hi' : 'en', ...data }, { auth: false }).then((res) => res.data),
}

// Admin panel: departments shown in the contact form's dropdown
export const adminDepartmentsApi = {
  list: () => http.get('/admin/departments').then((res) => res.data),
  create: (data) => http.post('/admin/departments', data).then((res) => res.data),
  update: (id, data) => http.patch(`/admin/departments/${id}`, data).then((res) => res.data),
  remove: (id) => http.delete(`/admin/departments/${id}`),
}

// Admin panel: contact form submissions
export const adminEnquiriesApi = {
  list: () => http.get('/admin/enquiries').then((res) => res.data),
  update: (id, data) => http.patch(`/admin/enquiries/${id}`, data).then((res) => res.data),
  remove: (id) => http.delete(`/admin/enquiries/${id}`),
}
