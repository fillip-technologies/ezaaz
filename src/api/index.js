// All backend calls go through this folder. Add one `<resource>.api.js` per backend module.
export { http, request, tokenStore, assetUrl, ApiError, UNAUTHORIZED_EVENT } from './client'
export { authApi } from './auth.api'
export { doctorsApi, adminDoctorsApi } from './doctors.api'
export { blogsApi, adminBlogsApi, adminBlogCategoriesApi } from './blogs.api'
export { contactApi, adminDepartmentsApi, adminEnquiriesApi } from './contact.api'
export { appointmentsApi, adminAppointmentsApi, adminLeavesApi, adminSlotPlansApi } from './appointments.api'
