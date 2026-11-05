import { http } from './client'

// Website: visible photos and videos. Returns { categories, photos, videos }
export const galleryApi = {
  list: () => http.get('/gallery', { auth: false }).then((res) => res.data),
}

// Admin panel: every photo and video (hidden ones included), and the photo categories
export const adminGalleryApi = {
  list: () => http.get('/admin/gallery').then((res) => res.data),
  update: (id, data) => http.patch(`/admin/gallery/${id}`, data).then((res) => res.data),
  remove: (id) => http.delete(`/admin/gallery/${id}`),
  // `ids` = all items of one type in the new display order
  reorder: (ids) => http.patch('/admin/gallery/reorder', { ids }),

  // One photo item per file; `options` = { category, position, showOnHome }
  uploadPhotos: (files, options = {}) => {
    const form = new FormData()
    for (const [key, value] of Object.entries(options)) if (value !== undefined && value !== null) form.append(key, String(value))
    for (const file of files) form.append('photos', file)
    return http.post('/admin/gallery/photos', form).then((res) => res.data)
  },
  // Video details as JSON; the file and thumbnail are uploaded afterwards
  createVideo: (data) => http.post('/admin/gallery/videos', data).then((res) => res.data),

  uploadImage: (id, file) => {
    const form = new FormData()
    form.append('image', file)
    return http.post(`/admin/gallery/${id}/image`, form).then((res) => res.data)
  },
  removeImage: (id) => http.delete(`/admin/gallery/${id}/image`).then((res) => res.data),
  uploadVideo: (id, file) => {
    const form = new FormData()
    form.append('video', file)
    return http.post(`/admin/gallery/${id}/video`, form).then((res) => res.data)
  },
}

export const adminGalleryCategoriesApi = {
  list: () => http.get('/admin/gallery-categories').then((res) => res.data),
  create: (data) => http.post('/admin/gallery-categories', data).then((res) => res.data),
  update: (id, data) => http.patch(`/admin/gallery-categories/${id}`, data).then((res) => res.data),
  remove: (id) => http.delete(`/admin/gallery-categories/${id}`),
}
