import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowLeft,
  Loader2,
  ImageOff
} from 'lucide-react'
import { toPhotoCard, useGallery } from './useGallery'

const ITEMS_PER_PAGE = 16 // 4 rows × 4 columns

export default function PhotosView() {
  const { i18n } = useTranslation('home')
  const isHindi = i18n?.language === 'hi'
  // Photos and categories are managed in the admin panel (/master/gallery)
  const { photos, categories: galleryCategories, loading, error } = useGallery()
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const allPhotos = useMemo(() => photos.map((p) => toPhotoCard(p, isHindi)), [photos, isHindi])

  // Only categories that have photos get a filter pill
  const categories = useMemo(
    () => [
      { id: 'all', label: isHindi ? 'सभी फोटो' : 'All Photos', count: allPhotos.length },
      ...galleryCategories
        .map((c) => ({
          id: c.slug,
          label: (isHindi && c.name.hi) || c.name.en,
          count: allPhotos.filter((p) => p.category === c.slug).length,
        }))
        .filter((c) => c.count > 0),
    ],
    [galleryCategories, allPhotos, isHindi],
  )

  const filteredPhotos = useMemo(
    () => (activeCategory === 'all' ? allPhotos : allPhotos.filter((photo) => photo.category === activeCategory)),
    [allPhotos, activeCategory],
  )

  const totalPages = Math.ceil(filteredPhotos.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredPhotos.length)
  const currentPhotos = filteredPhotos.slice(startIndex, endIndex)

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId)
    setCurrentPage(1)
    setSelectedPhotoIndex(null)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      const gridEl = document.getElementById('photos-grid-top')
      if (gridEl) {
        gridEl.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Lightbox navigation wraps around and keeps the grid on the page of the photo being viewed
  const showPhoto = (index) => {
    const next = (index + filteredPhotos.length) % filteredPhotos.length
    setSelectedPhotoIndex(next)
    setCurrentPage(Math.floor(next / ITEMS_PER_PAGE) + 1)
  }

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return
      if (e.key === 'Escape') setSelectedPhotoIndex(null)
      if (e.key === 'ArrowRight') showPhoto(selectedPhotoIndex + 1)
      if (e.key === 'ArrowLeft') showPhoto(selectedPhotoIndex - 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

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

  const selectedPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null

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
              <span className="text-xs sm:text-sm text-slate-500 font-medium">Photo Gallery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Hospital Photo Gallery
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              Authentic glimpses of Ejaz Hospital's advanced orthopedic surgeries, modular operation theatre, diagnostic laboratory, and dedicated nursing care.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-white text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs">
              {filteredPhotos.length} {filteredPhotos.length === 1 ? 'Photo' : 'Photos'}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-4 scrollbar-none no-scrollbar">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1 hidden sm:block" />
          {categories.length > 1 && categories.map((cat) => {
            const isActive = activeCategory === cat.id
            const count = cat.count

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#003a70] text-white shadow-md shadow-blue-900/20 ring-2 ring-blue-500/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Pure Photos Grid with Anchor for Smooth Page Navigation */}
      <div id="photos-grid-top" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 scroll-mt-28">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-24 text-sm text-slate-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading photos…
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
            <ImageOff className="w-10 h-10 text-slate-300" />
            <p className="text-sm sm:text-base text-slate-500">
              {error ? 'The photo gallery could not be loaded. Please try again later.' : 'Photos will be added here soon.'}
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {currentPhotos.map((photo, index) => {
            const actualIndex = startIndex + index

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(actualIndex)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: photo.position || 'center' }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />

                {/* Badges & Overlay */}
                {photo.categoryLabel && (
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-slate-800 backdrop-blur-md border border-slate-200/80 shadow-xs">
                    {photo.categoryLabel}
                  </span>
                </div>
                )}

                {/* Hover Overlay with Title and Expand Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <div className="self-end">
                    <span className="w-10 h-10 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <Maximize2 className="w-4 h-4 text-[#003a70]" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-blue-300 tracking-wider">
                      {photo.categoryLabel}
                    </span>
                    <h3 className="text-sm font-bold text-white drop-shadow line-clamp-2 mt-0.5">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        )}

        {/* Pagination Controls directly after the 4th row */}
        {totalPages > 1 && (
          <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Range Info */}
            <div className="text-xs sm:text-sm text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-800">{startIndex + 1}</span> to{' '}
              <span className="font-bold text-slate-800">{endIndex}</span> of{' '}
              <span className="font-bold text-slate-800">{filteredPhotos.length}</span> photos
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Previous Page Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                  currentPage === 1
                    ? 'text-slate-300 bg-slate-100/60 cursor-not-allowed border border-slate-200/50'
                    : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs cursor-pointer hover:scale-102'
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Page Number Pills */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = currentPage === pageNum
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-[#003a70] text-white shadow-md shadow-blue-900/20 ring-2 ring-blue-500/25'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs hover:text-slate-900'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}

              {/* Next Page Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'text-slate-300 bg-slate-100/60 cursor-not-allowed border border-slate-200/50'
                    : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs cursor-pointer hover:scale-102'
                }`}
                aria-label="Next page"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
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
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-60 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showPhoto(selectedPhotoIndex - 1)
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-60 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showPhoto(selectedPhotoIndex + 1)
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-60 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-slate-900/90 rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="relative flex-1 flex items-center justify-center max-h-[78vh] bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.alt}
                className="w-full h-auto max-h-[78vh] object-contain rounded-t-2xl shadow-2xl"
              />
            </div>
            
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-t border-white/10">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  {selectedPhoto.categoryLabel}
                </span>
                <h3 className="text-base sm:text-lg font-bold tracking-tight mt-0.5">
                  {selectedPhoto.title}
                </h3>
              </div>
              <div className="text-white/60 text-xs font-medium px-3 py-1 rounded-full bg-white/10">
                {selectedPhotoIndex + 1} / {filteredPhotos.length}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

