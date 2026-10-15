import { http } from './client'

// Website: active doctors only
export const doctorsApi = {
  list: () => http.get('/doctors', { auth: false }).then((res) => res.data),
  get: (slug) => http.get(`/doctors/${encodeURIComponent(slug)}`, { auth: false }).then((res) => res.data),
}

// Admin panel: every doctor, including hidden ones
export const adminDoctorsApi = {
  list: () => http.get('/admin/doctors').then((res) => res.data),
  get: (id) => http.get(`/admin/doctors/${id}`).then((res) => res.data),
  create: (data) => http.post('/admin/doctors', data).then((res) => res.data),
  update: (id, data) => http.patch(`/admin/doctors/${id}`, data).then((res) => res.data),
  remove: (id) => http.delete(`/admin/doctors/${id}`),

  uploadPhoto: (id, file) => {
    const form = new FormData()
    form.append('photo', file)
    return http.post(`/admin/doctors/${id}/photo`, form).then((res) => res.data)
  },
  removePhoto: (id) => http.delete(`/admin/doctors/${id}/photo`).then((res) => res.data),
}
