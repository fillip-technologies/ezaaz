import { useEffect, useState } from 'react'

export const ADMIN_PATHS = {
  login: '/master',
  forgotPassword: '/master/forgot-password',
  resetPassword: '/master/reset-password',
  dashboard: '/master/dashboard',
  doctors: '/master/doctors',
  newDoctor: '/master/doctors/new',
  blogs: '/master/blogs',
  newBlog: '/master/blogs/new',
  blogCategories: '/master/blogs/categories',
  enquiries: '/master/contact-forms',
  appointments: '/master/appointments',
  settings: '/master/settings',
  departments: '/master/settings/departments',
  leaves: '/master/settings/leave',
  slotPlans: '/master/settings/slot-plans',
  newSlotPlan: '/master/settings/slot-plans/new',
  account: '/master/account',
}

export const doctorEditPath = (id) => `${ADMIN_PATHS.doctors}/${id}`
export const blogEditPath = (id) => `${ADMIN_PATHS.blogs}/${id}`
export const slotPlanEditPath = (id) => `${ADMIN_PATHS.slotPlans}/${id}`

// One-time message shown on the next page (e.g. "Doctor added") after a redirect
let flashMessage = ''
export function setFlash(message) {
  flashMessage = message
}
export function takeFlash() {
  const message = flashMessage
  flashMessage = ''
  return message
}

// Same mechanism as the public site: history API + the `app-route-change` event App.jsx listens to
export function navigate(to, { replace = false } = {}) {
  if (replace) window.history.replaceState(null, '', to)
  else window.history.pushState(null, '', to)
  window.dispatchEvent(new CustomEvent('app-route-change', { detail: to }))
}

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '').toLowerCase() || '/'
}

export function useAdminPath() {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const update = () => setPath(currentPath())
    window.addEventListener('popstate', update)
    window.addEventListener('app-route-change', update)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('app-route-change', update)
    }
  }, [])

  return path
}
