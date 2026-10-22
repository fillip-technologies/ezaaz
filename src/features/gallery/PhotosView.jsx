import { useState, useEffect } from 'react'
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowLeft
} from 'lucide-react'

// Real Laboratory Images
import labImg27 from '../../assets/Laboratory/27.png'
import labImg33 from '../../assets/Laboratory/33.jpg'
import labImg34 from '../../assets/Laboratory/34.jpg'
import labImg35 from '../../assets/Laboratory/35.jpg'
import labImg36 from '../../assets/Laboratory/36.jpg'
import labImg37 from '../../assets/Laboratory/37.jpg'

// Real Nursing Images
import nursingTeam from '../../assets/Nursing/team-portrait.png'
import nursingImg14 from '../../assets/Nursing/14.jpg'
import nursingImg16 from '../../assets/Nursing/16.jpg'
import nursingImg44 from '../../assets/Nursing/44.jpg'
import nursingImg45 from '../../assets/Nursing/45.jpg'
import nursingImg46 from '../../assets/Nursing/46.jpg'
import nursingImg47 from '../../assets/Nursing/47.jpg'

// Local Facility Images
import modularOtImg from '../../assets/home/choose-2.png'
import icuImg from '../../assets/home/procedures/icu.png'
import radiologyImg from '../../assets/home/procedures/radiology-image.png'
import emergencyImg from '../../assets/home/procedures/emergency-image.png'
import generalWardImg from '../../assets/home/procedures/general-ward.png'
import whyChooseImg from '../../assets/home/why-choose-ejaz.jpg'

const CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'laboratory', label: 'Laboratory & Diagnostics' },
  { id: 'nursing', label: 'Nursing & Patient Care' },
  { id: 'surgical', label: 'Modular OT & Surgical' },
  { id: 'icu', label: 'ICU & Critical Care' },
  { id: 'facilities', label: 'Facilities & Imaging' }
]

// High-resolution hospital photography collection
const GALLERY_PHOTOS = [
  // Care Team & Nursing
  {
    id: 'nurse-team',
    category: 'nursing',
    categoryLabel: 'Care Team',
    title: 'Ejaz Hospital Care Team & Clinical Staff',
    image: nursingTeam,
    position: 'center center'
  },
  {
    id: 'nurse-14',
    category: 'nursing',
    categoryLabel: 'Nursing Care',
    title: 'Ward Nurse Reviewing Inpatient Chart & Medication',
    image: nursingImg14,
    position: 'center 20%'
  },
  {
    id: 'nurse-16',
    category: 'nursing',
    categoryLabel: 'Nursing Care',
    title: 'Compassionate Bedside Patient Care & Monitoring',
    image: nursingImg16,
    position: 'center 20%'
  },
  {
    id: 'nurse-44',
    category: 'nursing',
    categoryLabel: 'Nursing Care',
    title: 'Specialized Hand Bandaging & Wound Dressing Care',
    image: nursingImg44,
    position: 'center 25%'
  },
  {
    id: 'nurse-45',
    category: 'nursing',
    categoryLabel: 'Nursing Care',
    title: 'Intravenous (IV) Infusion Therapy Administration',
    image: nursingImg45,
    position: 'center 20%'
  },
  {
    id: 'nurse-46',
    category: 'nursing',
    categoryLabel: 'Critical Nursing',
    title: 'Continuous Multi-Para Vital Signs Telemetry',
    image: nursingImg46,
    position: 'center 25%'
  },
  {
    id: 'nurse-47',
    category: 'nursing',
    categoryLabel: 'Nursing Care',
    title: 'Post-Operative Recovery Patient Comfort Care',
    image: nursingImg47,
    position: 'center 25%'
  },

  // Diagnostic Laboratory
  {
    id: 'lab-27',
    category: 'laboratory',
    categoryLabel: 'Laboratory',
    title: 'Mindray Immunoassay Automated Diagnostics Analyzer',
    image: labImg27,
    position: 'center 20%'
  },
  {
    id: 'lab-33',
    category: 'laboratory',
    categoryLabel: 'Laboratory',
    title: 'Biochemical Diagnostics & Precision Sample Pipetting',
    image: labImg33,
    position: 'center 25%'
  },
  {
    id: 'lab-34',
    category: 'laboratory',
    categoryLabel: 'Laboratory',
    title: 'Automated Chemistry Analyzer Workstation',
    image: labImg34,
    position: 'center 25%'
  },
  {
    id: 'lab-35',
    category: 'laboratory',
    categoryLabel: 'Laboratory',
    title: 'High-Power Microscopic Cellular Pathology Examination',
    image: labImg35,
    position: 'center 25%'
  },
  {
    id: 'lab-36',
    category: 'laboratory',
    categoryLabel: 'Laboratory',
    title: 'Micro-Pipetting for Precision Hematology Testing',
    image: labImg36,
    position: 'center 25%'
  },
  {
    id: 'lab-37',
    category: 'laboratory',
    categoryLabel: 'Laboratory',
    title: 'Blood Specimen Verification & Diagnostic Testing',
    image: labImg37,
    position: 'center 25%'
  },

  // Surgical Suite & ICU
  {
    id: 'ot-1',
    category: 'surgical',
    categoryLabel: 'Operation Theatre',
    title: 'Advanced Modular Operation Theatre',
    image: modularOtImg,
    position: 'center center'
  },
  {
    id: 'ot-2',
    category: 'surgical',
    categoryLabel: 'Operation Theatre',
    title: 'Modern Sterile Surgical Facility',
    image: modularOtImg,
    position: 'center center'
  },
  {
    id: 'icu-1',
    category: 'icu',
    categoryLabel: 'Intensive Care',
    title: 'Critical Care ICU Multi-Bed Setup',
    image: icuImg,
    position: 'center center'
  },
  {
    id: 'icu-2',
    category: 'icu',
    categoryLabel: 'Intensive Care',
    title: 'High-Precision ICU Patient Telemetry',
    image: icuImg,
    position: 'center center'
  },

  // Infrastructure & Diagnostic Facilities
  {
    id: 'diag-1',
    category: 'facilities',
    categoryLabel: 'Radiology',
    title: 'Advanced 128-Slice CT & MRI Diagnostic Suite',
    image: radiologyImg,
    position: 'center center'
  },
  {
    id: 'inpatient-1',
    category: 'facilities',
    categoryLabel: 'Inpatient Care',
    title: 'Deluxe Patient Recovery Room & Private Ward',
    image: generalWardImg,
    position: 'center center'
  },
  {
    id: 'infra-1',
    category: 'facilities',
    categoryLabel: 'Infrastructure',
    title: 'Hospital Central Facilities & Patient Care',
    image: whyChooseImg,
    position: 'center center'
  },
  {
    id: 'infra-2',
    category: 'facilities',
    categoryLabel: 'Emergency Care',
    title: '24×7 Emergency & Trauma Resuscitation Bay',
    image: emergencyImg,
    position: 'center center'
  }
]

const ITEMS_PER_PAGE = 16 // 4 rows × 4 columns

export default function PhotosView() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPhotos = activeCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory)

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

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return
      if (e.key === 'Escape') setSelectedPhotoIndex(null)
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => {
          const nextIdx = (prev + 1) % filteredPhotos.length
          setCurrentPage(Math.floor(nextIdx / ITEMS_PER_PAGE) + 1)
          return nextIdx
        })
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => {
          const prevIdx = (prev - 1 + filteredPhotos.length) % filteredPhotos.length
          setCurrentPage(Math.floor(prevIdx / ITEMS_PER_PAGE) + 1)
          return prevIdx
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhotoIndex, filteredPhotos])

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
              Authentic glimpses of Ejaz Hospital's diagnostic laboratory, dedicated nursing team, modern ICU, and state-of-the-art facilities.
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
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            const count = cat.id === 'all'
              ? GALLERY_PHOTOS.length
              : GALLERY_PHOTOS.filter((p) => p.category === cat.id).length

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
                  alt={photo.title || 'Ejaz Hospital'}
                  loading="eager"
                  decoding="async"
                  style={{ objectPosition: photo.position || 'center' }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />

                {/* Badges & Overlay */}
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-slate-800 backdrop-blur-md border border-slate-200/80 shadow-xs">
                    {photo.categoryLabel}
                  </span>
                </div>

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
              setSelectedPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)
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
              setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length)
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
                alt={selectedPhoto.title || ''}
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

