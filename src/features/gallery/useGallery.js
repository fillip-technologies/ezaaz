import { useEffect, useState } from 'react'
import { assetUrl, galleryApi } from '../../api'

// Photos, videos and photo categories are managed in the admin panel (/master/gallery).
// Fetched once per page load and shared by the home page section and the gallery pages.
let galleryPromise = null

function loadGallery() {
  if (!galleryPromise) {
    galleryPromise = galleryApi.list().catch((err) => {
      galleryPromise = null // allow a retry on the next mount
      throw err
    })
  }
  return galleryPromise
}

const text = (field, isHindi) => (isHindi && field?.hi) || field?.en || ''

export const youtubeEmbedUrl = (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`

// { photos, videos, categories, loading, error } — raw items; map them with toPhotoCard / toVideoCard
export function useGallery() {
  const [state, setState] = useState({ photos: [], videos: [], categories: [], loading: true, error: '' })

  useEffect(() => {
    let cancelled = false
    loadGallery()
      .then(({ photos, videos, categories }) => !cancelled && setState({ photos, videos, categories, loading: false, error: '' }))
      .catch((err) => !cancelled && setState({ photos: [], videos: [], categories: [], loading: false, error: err.message }))
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

// Flat, single-language shape used by the photo tiles and lightboxes
export function toPhotoCard(photo, isHindi) {
  const categoryName = text(photo.category?.name, isHindi)
  const title = text(photo.title, isHindi)
  return {
    id: photo._id,
    title,
    alt: title || categoryName || (isHindi ? 'एजाज़ हॉस्पिटल' : 'Ejaz Hospital'),
    category: photo.category?.slug || '',
    categoryLabel: text(photo.label, isHindi) || categoryName,
    image: assetUrl(photo.image),
    position: photo.position || 'center center',
    showOnHome: Boolean(photo.showOnHome),
  }
}

export function toVideoCard(video, isHindi) {
  return {
    id: video._id,
    title: text(video.title, isHindi),
    duration: video.duration || '',
    thumbnail: video.image ? assetUrl(video.image) : video.youtubeId ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : '',
    videoSrc: video.videoFile ? assetUrl(video.videoFile) : '',
    youtubeId: video.youtubeId || '',
  }
}
