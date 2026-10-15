import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  ArrowLeft,
  ArrowRight
} from 'lucide-react'

// Import facility photos from assets/home/procedures and assets
import emergencyImg from '../../../assets/home/procedures/emergency-image.png'
import icuImg from '../../../assets/home/procedures/icu.png'
import radiologyImg from '../../../assets/home/procedures/radiology-image.png'
import diagnosisImg from '../../../assets/home/procedures/diagnostic-library.png'
import physiotherapyImg from '../../../assets/home/procedures/physioteraphy.jpg'
import modularOtImg from '../../../assets/home/choose-2.png'
import generalWardImg from '../../../assets/home/procedures/general-ward.png'

gsap.registerPlugin(ScrollTrigger)

const FACILITY_IMAGES = {
  'emergency': emergencyImg,
  'icu': icuImg,
  'radiology': radiologyImg,
  'diagnosis': diagnosisImg,
  'physiotherapy': physiotherapyImg,
  'operation-theatres': modularOtImg,
  'general-ward': generalWardImg
}

export default function TopProceduresSection() {
  const { t } = useTranslation('home')

  const sectionRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)

  // Get localized facilities/procedures data
  const rawItems = t('topProcedures.items', { returnObjects: true })
  const facilities = Array.isArray(rawItems) ? rawItems : []

  // Determine items per view according to screen width
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleCount(1)
      } else if (width < 1024) {
        setVisibleCount(2)
      } else if (width < 1280) {
        setVisibleCount(3)
      } else {
        setVisibleCount(4)
      }
    }
    updateVisible()
    window.addEventListener('resize', updateVisible)
    return () => window.removeEventListener('resize', updateVisible)
  }, [])

  const maxIndex = Math.max(0, facilities.length - visibleCount)

  // Carousel controls
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  // Touch Swipe for mobile devices
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (diff > 50) handleNext()
    if (diff < -50) handlePrev()
    setTouchStart(null)
  }

  // Smooth routing handler
  const handleFacilityNavigate = (e, href) => {
    if (!href) return
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetElement = document.querySelector(href)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }
    if (href.startsWith('/')) {
      e.preventDefault()
      if (window.history?.pushState) {
        window.history.pushState(null, '', href)
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: href }))
      } else {
        window.location.href = href
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }

  // GSAP Entrance Animations
  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true
      }
    })

    tl.fromTo(
      '.fac-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', clearProps: 'all' }
    )
      .fromTo(
        '.fac-card-item',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power2.out', clearProps: 'all' },
        '-=0.3'
      )
  }, { scope: sectionRef })

  return (
    <section
      id="facilities"
      ref={sectionRef}
      className="relative w-full bg-white text-slate-800 py-16 sm:py-20 lg:py-24 border-t border-slate-200/80 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header matching Reference Screenshot */}
        <div className="fac-header text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#d9532f] tracking-tight leading-tight">
            {t('topProcedures.title') || 'Our Facilities'}
          </h2>
          <p className="mt-3.5 text-slate-600 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed max-w-3xl mx-auto font-normal">
            {t('topProcedures.subtitle') ||
              'At Ejaz Hospital, we provide world-class medical infrastructure, advanced diagnostic imaging, modern intensive care units, and 24/7 emergency response dedicated to patient safety and recovery.'}
          </p>
        </div>

        {/* Carousel Container with Overlapping Navigation Arrows */}
        <div className="relative w-full">

          {/* Left Arrow Button matching screenshot (Outline circle with orange arrow) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous facility"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-5 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#d9532f] text-[#d9532f] hover:bg-[#d9532f] hover:text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-90 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>

          {/* Right Arrow Button matching screenshot (Filled orange circle with white arrow) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next facility"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-5 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#d9532f] hover:bg-[#c44322] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-90 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>

          {/* Cards Track Window */}
          <div
            className="overflow-hidden px-1 py-2"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out gap-4 sm:gap-5 lg:gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount + (visibleCount > 1 ? 0.35 : 0))}%)`
              }}
            >
              {facilities.map((fac) => {
                const imageSrc = FACILITY_IMAGES[fac.id] || emergencyImg

                return (
                  <div
                    key={fac.id}
                    onClick={(e) => handleFacilityNavigate(e, fac.href)}
                    className="fac-card-item shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-18px)] bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-[0_4px_18px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                  >
                    {/* Top Facility Image matching 16:10 banner format */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={imageSrc}
                        alt={fac.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>

                    {/* Middle & Bottom: Facility Title and Short Descriptive Paragraph */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-start">
                      <h3
                        title={fac.title}
                        className="font-heading font-semibold text-slate-800 text-sm sm:text-[15px] leading-snug line-clamp-2 tracking-tight group-hover:text-[#d9532f] transition-colors duration-200"
                      >
                        {fac.title}
                      </h3>
                      {fac.desc && (
                        <p className="mt-2 text-xs sm:text-[13px] text-slate-500 leading-relaxed line-clamp-3">
                          {fac.desc}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}
