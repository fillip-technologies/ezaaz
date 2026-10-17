import { http } from './client'

const qs = (params) =>
  new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')).toString()

// Website: live availability + booking (doctor = slug)
export const appointmentsApi = {
  // { bookable, capacity, slotMinutes, days: [{ date, status, free }] }
  days: (doctor) => http.get(`/appointments/days?${qs({ doctor })}`, { auth: false }).then((res) => res.data),
  // { bookable, capacity, status, slots: [{ time, remaining }] }
  slots: (doctor, date) => http.get(`/appointments/slots?${qs({ doctor, date })}`, { auth: false }).then((res) => res.data),
  book: (data) => http.post('/appointments', data, { auth: false }).then((res) => res.data),
}

// Admin panel: bookings (doctor = id)
export const adminAppointmentsApi = {
  list: (filters = {}) => http.get(`/admin/appointments?${qs(filters)}`).then((res) => res.data),
  slots: (doctor, date, exclude) => http.get(`/admin/appointments/slots?${qs({ doctor, date, exclude })}`).then((res) => res.data),
  update: (id, data) => http.patch(`/admin/appointments/${id}`, data).then((res) => res.data),
  reschedule: (id, data) => http.post(`/admin/appointments/${id}/reschedule`, data).then((res) => res.data),
}

// Admin panel: doctor leave and hospital holidays
export const adminLeavesApi = {
  list: () => http.get('/admin/leaves').then((res) => res.data),
  create: (data) => http.post('/admin/leaves', data).then((res) => res.data),
  remove: (id) => http.delete(`/admin/leaves/${id}`),
}

// Admin panel: reusable schedules assigned to many doctors at once
export const adminSlotPlansApi = {
  list: () => http.get('/admin/slot-plans').then((res) => res.data),
  get: (id) => http.get(`/admin/slot-plans/${id}`).then((res) => res.data),
  create: (data) => http.post('/admin/slot-plans', data).then((res) => res.data),
  // Returns { plan, doctorsUpdated, customizedSkipped, bookingsOutsideHours }
  update: (id, data) => http.patch(`/admin/slot-plans/${id}`, data).then((res) => res.data),
  // Returns { doctorsUnlinked }
  remove: (id) => http.delete(`/admin/slot-plans/${id}`).then((res) => res.data),
  // Returns { assigned, bookingsOutsideHours }
  assign: (id, doctors) => http.post(`/admin/slot-plans/${id}/assign`, { doctors }).then((res) => res.data),
}
