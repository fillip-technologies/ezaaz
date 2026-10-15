import { useState, useEffect } from 'react'
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

// Pure high-resolution hospital photography collection
const GALLERY_PHOTOS = [
  {
    id: 'ot-1',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'ot-2',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'icu-1',
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'icu-2',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'diag-1',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'diag-2',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'inpatient-1',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'inpatient-2',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'infra-1',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'infra-2',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'infra-3',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'infra-4',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=85'
  }
]

export default function PhotosView() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return
      if (e.key === 'Escape') setSelectedPhotoIndex(null)
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length)
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhotoIndex])

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedPhotoIndex])

  const selectedPhoto = selectedPhotoIndex !== null ? GALLERY_PHOTOS[selectedPhotoIndex] : null

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24">
      
      {/* Pure Photos Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg hover:shadow-2xl hover:border-orange-500/40 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            >
              <img
                src={photo.image}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />

              {/* Minimal Dark Hover Overlay with Expand Icon */}
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="w-11 h-11 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Maximize2 className="w-5 h-5 text-[#003a70]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-60 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPhotoIndex((prev) => (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length)
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-60 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPhotoIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length)
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-60 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-transparent rounded-2xl overflow-hidden"
          >
            <div className="relative flex-1 flex items-center justify-center max-h-[85vh]">
              <img
                src={selectedPhoto.image}
                alt=""
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="text-center pt-3 text-white/60 text-xs font-medium">
              {selectedPhotoIndex + 1} / {GALLERY_PHOTOS.length}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
