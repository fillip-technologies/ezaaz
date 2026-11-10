import { http } from './client'

// Website: { introVideo, heroVideo, heroStats } — '' / [] = use the built-in video / numbers bundled with the website
export const siteApi = {
  get: () => http.get('/site-settings', { auth: false }).then((res) => res.data),
}

// Admin panel: Settings → Website videos (`key` = 'intro' | 'hero') and Home page stats
export const adminSiteApi = {
  get: () => http.get('/admin/site-settings').then((res) => res.data),
  uploadVideo: (key, file) => {
    const form = new FormData()
    form.append('video', file)
    return http.post(`/admin/site-settings/videos/${key}`, form).then((res) => res.data)
  },
  resetVideo: (key) => http.delete(`/admin/site-settings/videos/${key}`).then((res) => res.data),
  // [{ icon, value, label: { en, hi } }]; [] = back to the built-in numbers
  saveHeroStats: (heroStats) => http.put('/admin/site-settings/hero-stats', { heroStats }).then((res) => res.data),
}
