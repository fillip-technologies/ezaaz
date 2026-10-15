import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Maximize2, X, Camera, Video, ArrowRight } from 'lucide-react'
import galleryBg from '../../../assets/home/gallery-bg.jpg'
// Gallery background texture

const ROW_1_IMAGES = [
  {
    id: 'ot-1',
    title: 'Modular Operation Theatre',
    category: 'Surgical Suite',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'icu-1',
    title: 'Advanced Critical Care (ICU)',
    category: 'Intensive Care',
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'consult-1',
    title: 'Specialist Consultation Clinic',
    category: 'Outpatient OPD',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'emergency-1',
    title: '24×7 Emergency & Trauma',
    category: 'Emergency Care',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lab-1',
    title: 'Diagnostic Pathology Lab',
    category: 'Laboratory',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ward-1',
    title: 'Deluxe Patient Recovery Room',
    category: 'Inpatient Care',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80'
  }
]

const ROW_2_IMAGES = [
  {
    id: 'mri-1',
    title: 'Advanced 128-Slice CT & MRI',
    category: 'Radiology & Imaging',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nurse-1',
    title: 'Dedicated Nursing & Patient Care',
    category: 'Patient Support',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'laparo-1',
    title: 'Minimally Invasive Laparoscopy',
    category: 'Surgical Precision',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hospital-1',
    title: 'Hospital Central Architecture',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'monitor-1',
    title: 'Digital High-Precision Telemetry',
    category: 'Medical Technology',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'doctor-meet-1',
    title: 'Senior Clinical Consultation',
    category: 'Clinical Care',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80'
  }
]

export default function GallerySection() {
  const { t, i18n } = useTranslation('home')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null)
    }
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPhoto])

  // Duplicated arrays for seamless continuous infinite marquee
  const trackRow1 = [...ROW_1_IMAGES, ...ROW_1_IMAGES]
  const trackRow2 = [...ROW_2_IMAGES, ...ROW_2_IMAGES]

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
                onClick={() => setSelectedPhoto(item)}
                className="group relative shrink-0 w-[240px] sm:w-[300px] md:w-[340px] h-[170px] sm:h-[210px] md:h-[230px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-200 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-blue-900/15 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
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
                onClick={() => setSelectedPhoto(item)}
                className="group relative shrink-0 w-[240px] sm:w-[300px] md:w-[340px] h-[170px] sm:h-[210px] md:h-[230px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-200 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-xl hover:shadow-blue-900/15 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
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
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-t border-white/10">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  {selectedPhoto.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight mt-0.5">
                  {selectedPhoto.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
