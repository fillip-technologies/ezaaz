import { useEffect, useState } from 'react'
import { assetUrl, blogsApi } from '../../../api'

// Blog articles and categories are managed in the admin panel (/master/blogs).
// The list is fetched once per page load and shared by every section that uses it.
let listPromise = null
const postPromises = new Map()

function loadList() {
  if (!listPromise) {
    listPromise = blogsApi.list().catch((err) => {
      listPromise = null
      throw err
    })
  }
  return listPromise
}

function loadPost(slug) {
  if (!postPromises.has(slug)) {
    postPromises.set(
      slug,
      blogsApi.get(slug).catch((err) => {
        postPromises.delete(slug)
        throw err
      }),
    )
  }
  return postPromises.get(slug)
}

// { posts, categories, loading, error } — posts are mapped with toBlogCard
export function useBlogs() {
  const [state, setState] = useState({ posts: [], categories: [], loading: true, error: '' })

  useEffect(() => {
    let cancelled = false
    loadList()
      .then(({ posts, categories }) => {
        if (!cancelled) setState({ posts: posts.map(toBlogCard), categories, loading: false, error: '' })
      })
      .catch((err) => !cancelled && setState({ posts: [], categories: [], loading: false, error: err.message }))
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

// Full article by slug: { post, loading, notFound, error }
export function useBlogPost(slug) {
  const [state, setState] = useState({ slug: null, post: null, notFound: false, error: '' })

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    loadPost(slug)
      .then((post) => !cancelled && setState({ slug, post: toBlogCard(post), notFound: false, error: '' }))
      .catch((err) => !cancelled && setState({ slug, post: null, notFound: err.status === 404, error: err.message }))
    return () => {
      cancelled = true
    }
  }, [slug])

  // While a new slug is loading, don't show the previous article
  const current = state.slug === slug
  return {
    post: current ? state.post : null,
    loading: Boolean(slug) && !current,
    notFound: !slug || (current && state.notFound),
    error: current ? state.error : '',
  }
}

const en = (field) => field?.en || ''
const hi = (field) => field?.hi || field?.en || ''

export function formatBlogDate(value, isHindi) {
  if (!value) return ''
  return new Intl.DateTimeFormat(isHindi ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(value),
  )
}

// Flat bilingual shape the blog components use (title / titleHi, sections[].headingHi, …)
export function toBlogCard(post) {
  const minutes = post.readTimeMinutes || 1
  return {
    id: post.slug,
    slug: post.slug,
    title: en(post.title),
    titleHi: hi(post.title),
    excerpt: en(post.excerpt),
    excerptHi: hi(post.excerpt),
    category: en(post.category?.name),
    categoryHi: hi(post.category?.name),
    categoryId: post.category?.slug || '',
    date: formatBlogDate(post.publishedAt, false),
    dateHi: formatBlogDate(post.publishedAt, true),
    readTime: `${minutes} min read`,
    readTimeHi: `${minutes} मिनट पढ़ें`,
    image: assetUrl(post.coverImage),
    isFeatured: Boolean(post.isFeatured),
    authorDoctor: post.authorDoctor || null,
    tags: post.tags || [],
    keyHighlights: (post.keyHighlights || []).map(en),
    keyHighlightsHi: (post.keyHighlights || []).map(hi),
    sections: (post.sections || []).map((s) => ({
      heading: en(s.heading),
      headingHi: hi(s.heading),
      content: en(s.content),
      contentHi: hi(s.content),
      callout: en(s.callout),
      calloutHi: hi(s.callout),
      bullets: (s.bullets || []).map(en),
      bulletsHi: (s.bullets || []).map(hi),
    })),
  }
}
