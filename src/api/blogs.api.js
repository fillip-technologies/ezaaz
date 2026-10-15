import { http } from './client'

// Website: published articles only
export const blogsApi = {
  // Returns { categories, posts } — posts without the article body
  list: () => http.get('/blogs', { auth: false }).then((res) => res.data),
  get: (slug) => http.get(`/blogs/${encodeURIComponent(slug)}`, { auth: false }).then((res) => res.data),
}

// Admin panel: all articles (drafts included) and categories
export const adminBlogsApi = {
  list: () => http.get('/admin/blogs').then((res) => res.data),
  get: (id) => http.get(`/admin/blogs/${id}`).then((res) => res.data),
  create: (data) => http.post('/admin/blogs', data).then((res) => res.data),
  update: (id, data) => http.patch(`/admin/blogs/${id}`, data).then((res) => res.data),
  remove: (id) => http.delete(`/admin/blogs/${id}`),

  uploadCover: (id, file) => {
    const form = new FormData()
    form.append('cover', file)
    return http.post(`/admin/blogs/${id}/cover`, form).then((res) => res.data)
  },
  removeCover: (id) => http.delete(`/admin/blogs/${id}/cover`).then((res) => res.data),
}

export const adminBlogCategoriesApi = {
  list: () => http.get('/admin/blog-categories').then((res) => res.data),
  create: (data) => http.post('/admin/blog-categories', data).then((res) => res.data),
  update: (id, data) => http.patch(`/admin/blog-categories/${id}`, data).then((res) => res.data),
  remove: (id) => http.delete(`/admin/blog-categories/${id}`),
}
