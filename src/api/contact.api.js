import { http } from './client'

// Website: department dropdown + contact form submission
export const contactApi = {
  departments: () => http.get('/departments', { auth: false }).then((res) => res.data),
  submit: (data) => http.post('/contact', data, { auth: false }).then((res) => res.data),
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
