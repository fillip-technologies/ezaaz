import { http } from './client'

// Website: { introVideo, heroVideo, heroStats, pageBanners } — '' / [] = use the built-in video / numbers / image bundled with the website
export const siteApi = {
  get: () => http.get('/site-settings', { auth: false }).then((res) => res.data),
}

// Admin panel: Settings → Website videos (`key` = 'intro' | 'hero'), Home page stats and Page banners
export const adminSiteApi = {
  get: () => http.get('/admin/site-settings').then((res) => res.data),
  uploadVideo: (key, file) => {
    const form = new FormData()
    form.append('video', file)
    return http.post(`/admin/site-settings/videos/${key}`, form).then((res) => res.data)
  },
  resetVideo: (key) => http.delete(`/admin/site-settings/videos/${key}`).then((res) => res.data),
  // [{ icon, value, label: { en, hi } }]; [] = back to the built-in numbers
  // `key` = a page key from features/site/pageBanners.js
  uploadPageBanner: (key, file) => {
    const form = new FormData()
    form.append('image', file)
    return http.post(`/admin/site-settings/banners/${key}`, form).then((res) => res.data)
  },
  resetPageBanner: (key) => http.delete(`/admin/site-settings/banners/${key}`).then((res) => res.data),
  saveHeroStats: (heroStats) => http.put('/admin/site-settings/hero-stats', { heroStats }).then((res) => res.data),
}
