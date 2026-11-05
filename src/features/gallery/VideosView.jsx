import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Play,
  X,
  Clock,
  ArrowLeft,
  Loader2,
  VideoOff
} from 'lucide-react'
import { toVideoCard, useGallery, youtubeEmbedUrl } from './useGallery'

export default function VideosView() {
  const { i18n } = useTranslation('home')
  const isHindi = i18n?.language === 'hi'
  // Videos are managed in the admin panel (/master/gallery)
  const { videos, loading, error } = useGallery()
  const galleryVideos = useMemo(() => videos.map((v) => toVideoCard(v, isHindi)), [videos, isHindi])
  const [selectedVideo, setSelectedVideo] = useState(null)

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedVideo(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock scroll when video modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedVideo])

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24">
      {/* Top Header & Navigation */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <a
                href="/"
                className="text-xs sm:text-sm font-semibold text-[#003a70] hover:text-[#00284d] flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </a>
              <span className="text-slate-300 text-xs">/</span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">Video Gallery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Hospital Video Gallery
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              Watch insightful clinical overviews, facility walk-throughs, and surgical procedures at Ejaz Hospital.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-white text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs">
              {galleryVideos.length} {galleryVideos.length === 1 ? 'Video' : 'Videos'}
            </span>
          </div>
        </div>
      </div>

      {/* Pure Videos Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-24 text-sm text-slate-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading videos…
          </div>
        ) : galleryVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
            <VideoOff className="w-10 h-10 text-slate-300" />
            <p className="text-sm sm:text-base text-slate-500">
              {error ? 'The video gallery could not be loaded. Please try again later.' : 'Videos will be added here soon.'}
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {galleryVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 opacity-90 group-hover:opacity-100"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-[#ea580c]/90 group-hover:bg-[#ea580c] text-white flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-115">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </span>
              </div>

              {video.title && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-8 pb-3 pr-20 pointer-events-none">
                  <h3 className="text-sm font-bold text-white drop-shadow line-clamp-2">{video.title}</h3>
                </div>
              )}

              {/* Duration Pill */}
              {video.duration && (
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Fullscreen Video Modal Player */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-60 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full aspect-[16/9] bg-black rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
          >
            {selectedVideo.youtubeId ? (
              <iframe
                src={youtubeEmbedUrl(selectedVideo.youtubeId)}
                title={selectedVideo.title || 'Ejaz Hospital video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <video
                src={selectedVideo.videoSrc}
                poster={selectedVideo.thumbnail}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      )}

    </div>
  )
}
