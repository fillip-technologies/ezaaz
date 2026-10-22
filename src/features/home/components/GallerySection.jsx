import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, Video, ArrowRight } from 'lucide-react'
import galleryBg from '../../../assets/home/gallery-bg.jpg'

// Real Laboratory Images
import labImg27 from '../../../assets/Laboratory/27.png'
import labImg33 from '../../../assets/Laboratory/33.jpg'
import labImg34 from '../../../assets/Laboratory/34.jpg'
import labImg35 from '../../../assets/Laboratory/35.jpg'
import labImg36 from '../../../assets/Laboratory/36.jpg'
import labImg37 from '../../../assets/Laboratory/37.jpg'

// Real Nursing Images
import nursingTeam from '../../../assets/Nursing/team-portrait.png'
import nursingImg14 from '../../../assets/Nursing/14.jpg'
import nursingImg16 from '../../../assets/Nursing/16.jpg'
import nursingImg44 from '../../../assets/Nursing/44.jpg'
import nursingImg45 from '../../../assets/Nursing/45.jpg'
import nursingImg46 from '../../../assets/Nursing/46.jpg'
import nursingImg47 from '../../../assets/Nursing/47.jpg'

// Local Facility Images
import modularOtImg from '../../../assets/home/choose-2.png'
import icuImg from '../../../assets/home/procedures/icu.png'
import radiologyImg from '../../../assets/home/procedures/radiology-image.png'

const ROW_1_IMAGES = [
  {
    id: 'nurse-team',
    title: 'Hospital Care & Clinical Nursing Team',
    category: 'Clinical Care Team',
    image: nursingTeam,
    position: 'center center'
  },
  {
    id: 'lab-27',
    title: 'Mindray Immunoassay Diagnostics',
    category: 'Laboratory Pathology',
    image: labImg27,
    position: 'center 20%'
  },
  {
    id: 'ot-1',
    title: 'Modular Operation Theatre',
    category: 'Surgical Suite',
    image: modularOtImg,
    position: 'center center'
  },
  {
    id: 'nurse-14',
    title: 'Inpatient Clinical Records Review',
    category: 'Nursing Care',
    image: nursingImg14,
    position: 'center 20%'
  },
  {
    id: 'lab-33',
    title: 'Biochemical Diagnostics Pipetting',
    category: 'Diagnostic Lab',
    image: labImg33,
    position: 'center 25%'
  },
  {
    id: 'nurse-44',
    title: 'Specialized Hand Bandaging & Wound Care',
    category: 'Patient Care',
    image: nursingImg44,
    position: 'center 25%'
  },
  {
    id: 'lab-35',
    title: 'Microscopic Cellular Pathology Analysis',
    category: 'Diagnostic Lab',
    image: labImg35,
    position: 'center 25%'
  },
  {
    id: 'nurse-46',
    title: 'Multi-Para Vital Sign Telemetry',
    category: 'Critical Nursing',
    image: nursingImg46,
    position: 'center 25%'
  }
]

const ROW_2_IMAGES = [
  {
    id: 'nurse-45',
    title: 'Intravenous (IV) Infusion Therapy',
    category: 'Nursing Care',
    image: nursingImg45,
    position: 'center 20%'
  },
  {
    id: 'lab-34',
    title: 'Automated Chemistry Analyzer Station',
    category: 'Laboratory Pathology',
    image: labImg34,
    position: 'center 25%'
  },
  {
    id: 'icu-1',
    title: 'Advanced Critical Care (ICU)',
    category: 'Intensive Care',
    image: icuImg,
    position: 'center center'
  },
  {
    id: 'nurse-16',
    title: 'Compassionate Bedside Patient Nursing',
    category: 'Patient Support',
    image: nursingImg16,
    position: 'center 20%'
  },
  {
    id: 'lab-36',
    title: 'Precision Micro-Pipette Hematology',
    category: 'Diagnostic Lab',
    image: labImg36,
    position: 'center 25%'
  },
  {
    id: 'mri-1',
    title: 'Advanced 128-Slice CT & MRI',
    category: 'Radiology & Imaging',
    image: radiologyImg,
    position: 'center center'
  },
  {
    id: 'nurse-47',
    title: 'Post-Operative Recovery Patient Monitoring',
    category: 'Nursing Care',
    image: nursingImg47,
    position: 'center 25%'
  },
  {
    id: 'lab-37',
    title: 'Blood Specimen Verification & Testing',
    category: 'Clinical Pathology',
    image: labImg37,
    position: 'center 25%'
  }
]

const ALL_GALLERY_PHOTOS = [...ROW_1_IMAGES, ...ROW_2_IMAGES]

export default function GallerySection() {
  const { t, i18n } = useTranslation('home')
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return
      if (e.key === 'Escape') setSelectedPhotoIndex(null)
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % ALL_GALLERY_PHOTOS.length)
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + ALL_GALLERY_PHOTOS.length) % ALL_GALLERY_PHOTOS.length)
      }
    }

    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPhotoIndex])

  // Duplicated arrays for seamless continuous infinite marquee
  const trackRow1 = [...ROW_1_IMAGES, ...ROW_1_IMAGES]
  const trackRow2 = [...ROW_2_IMAGES, ...ROW_2_IMAGES]

  const openLightbox = (item) => {
    const idx = ALL_GALLERY_PHOTOS.findIndex((p) => p.id === item.id)
    setSelectedPhotoIndex(idx !== -1 ? idx : 0)
  }

  const selectedPhoto = selectedPhotoIndex !== null ? ALL_GALLERY_PHOTOS[selectedPhotoIndex] : null

  return (
    <section
      id="gallery"
      className="relative w-full bg-white text-slate-800 py-18 sm:py-24 lg:py-28 border-t border-slate-200/80 overflow-hidden scroll-mt-24"
    >
      {/* Halftone Pattern Background Image */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img
          src={galleryBg}
          alt=""
          className="w-full h-full object-cover object-center opacity-90"
        />
      </div>

      {/* Header Container: Only Gallery */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mb-8 sm:mb-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t('gallery.title') || 'Gallery'}
          </h2>
        </div>
      </div>

      {/* Dual Row Continuous Infinite Marquee Gallery */}
      <div className="relative z-10 w-full space-y-4 sm:space-y-6 overflow-hidden">
        {/* Row 1: Scrolling Left */}
        <div className="relative w-full overflow-hidden">
          <div className="gallery-track-left gap-4 sm:gap-6 px-3">
            {trackRow1.map((item, index) => (
              <div
                key={`r1-${item.id}-${index}`}
                onClick={() => openLightbox(item)}
                className="group relative shrink-0 w-[240px] sm:w-[300px] md:w-[340px] h-[170px] sm:h-[210px] md:h-[230px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-200 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-blue-900/15 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="eager"
                  decoding="async"
                  style={{ objectPosition: item.position || 'center' }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Subtle Hover Gradient & Information Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
                  <div className="self-end">
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-blue-200 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-white text-sm sm:text-base font-bold drop-shadow-sm line-clamp-1 mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="relative w-full overflow-hidden">
          <div className="gallery-track-right gap-4 sm:gap-6 px-3">
            {trackRow2.map((item, index) => (
              <div
                key={`r2-${item.id}-${index}`}
                onClick={() => openLightbox(item)}
                className="group relative shrink-0 w-[240px] sm:w-[300px] md:w-[340px] h-[170px] sm:h-[210px] md:h-[230px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-200 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-blue-900/15 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="eager"
                  decoding="async"
                  style={{ objectPosition: item.position || 'center' }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Subtle Hover Gradient & Information Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
                  <div className="self-end">
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-blue-200 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-white text-sm sm:text-base font-bold drop-shadow-sm line-clamp-1 mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions linking to dedicated Photo & Video Gallery pages */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => {
            if (window.history?.pushState) {
              window.history.pushState(null, '', '/gallery/photos')
              window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
              window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/gallery/photos' }))
            } else {
              window.location.href = '/gallery/photos'
            }
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
          }}
          className="px-5 py-2.5 rounded-full bg-[#003a70] hover:bg-[#00284d] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all hover:scale-102 cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>{i18n?.language === 'hi' ? 'सभी फोटो गैलरी देखें' : 'View Full Photo Gallery'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => {
            if (window.history?.pushState) {
              window.history.pushState(null, '', '/gallery/videos')
              window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
              window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/gallery/videos' }))
            } else {
              window.location.href = '/gallery/videos'
            }
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
          }}
          className="px-5 py-2.5 rounded-full bg-[#ea580c] hover:bg-[#c44322] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all hover:scale-102 cursor-pointer"
        >
          <Video className="w-4 h-4" />
          <span>{i18n?.language === 'hi' ? 'अस्पताल वीडियो गैलरी देखें' : 'Watch Hospital Videos'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all duration-300"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-60 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPhotoIndex((prev) => (prev - 1 + ALL_GALLERY_PHOTOS.length) % ALL_GALLERY_PHOTOS.length)
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-60 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPhotoIndex((prev) => (prev + 1) % ALL_GALLERY_PHOTOS.length)
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-60 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
          >
            {/* Modal Image */}
            <div className="relative w-full max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-t border-white/10">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  {selectedPhoto.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold tracking-tight mt-0.5">
                  {selectedPhoto.title}
                </h3>
              </div>
              <div className="text-white/60 text-xs font-medium px-3 py-1 rounded-full bg-white/10">
                {selectedPhotoIndex + 1} / {ALL_GALLERY_PHOTOS.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
