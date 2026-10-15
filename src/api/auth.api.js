import { http } from './client'

export const authApi = {
  login: (email, password) =>
    http.post('/auth/login', { email, password }, { auth: false }).then((res) => res.data),

  me: () => http.get('/auth/me').then((res) => res.data),

  updateProfile: ({ name, email }) => http.patch('/auth/profile', { name, email }).then((res) => res.data),

  changePassword: (currentPassword, newPassword) =>
    http.patch('/auth/change-password', { currentPassword, newPassword }).then((res) => res.data),

  forgotPassword: (email) =>
    http.post('/auth/forgot-password', { email }, { auth: false }).then((res) => res.message),

  resetPassword: (token, password) =>
    http.post('/auth/reset-password', { token, password }, { auth: false }).then((res) => res.data),
}
