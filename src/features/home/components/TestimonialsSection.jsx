import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  User,
  ChevronLeft,
  ChevronRight,
  X,
  BadgeCheck,
  HeartHandshake
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function TestimonialsSection() {
  const { t, i18n } = useTranslation('home')
  const isHindi = i18n?.language === 'hi'

  const sectionRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedStory, setSelectedStory] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  // Localized Stories
  const rawStories = t('testimonials.stories', { returnObjects: true })
  const stories = Array.isArray(rawStories) ? rawStories : []

  // Items per view responsive calculation
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

  const maxIndex = Math.max(0, stories.length - visibleCount)

  // Carousel Controls
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

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused || stories.length <= visibleCount) return
    const timer = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(timer)
  }, [currentIndex, isPaused, visibleCount, stories.length])

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedStory(null)
    }
    if (selectedStory) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedStory])

  // GSAP Smooth Scroll Entrance
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
      '.testimonials-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', clearProps: 'all' }
    )
    .fromTo(
      '.story-card-item',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power2.out', clearProps: 'all' },
      '-=0.3'
    )
  }, { scope: sectionRef })

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full bg-white text-slate-800 py-16 sm:py-20 lg:py-24 border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header matching Screenshot */}
        <div className="testimonials-header text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#d9532f] tracking-tight leading-tight">
            {t('testimonials.title') || "Patients’ Stories"}
          </h2>
          <p className="mt-3.5 text-slate-600 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed max-w-3xl mx-auto font-normal">
            {t('testimonials.subtitle') ||
              "Our patients' voices echo the heart of our dedication. From heartfelt gratitude to stories of transformation, their words speak volumes about our commitment to personalized care and a seamless travel experience."}
          </p>
        </div>

        {/* Carousel Slider Window */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Previous Arrow Button */}
          {stories.length > visibleCount && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous story"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-5 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#d9532f] text-[#d9532f] hover:bg-[#d9532f] hover:text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
          )}

          {/* Next Arrow Button */}
          {stories.length > visibleCount && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next story"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-5 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#d9532f] hover:bg-[#c44322] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          )}

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
              {stories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => setSelectedStory(story)}
                  className="story-card-item shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-18px)] bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between min-h-[195px] text-left group cursor-pointer"
                >
                  {/* Testimonial Quote */}
                  <div className="flex-1">
                    <p className="text-slate-700 text-[13.5px] sm:text-[14px] leading-relaxed font-normal">
                      &ldquo;{story.quote || story.headline}&rdquo;
                    </p>
                  </div>

                  {/* Bottom: Patient Profile with Icon Avatar */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                    {/* User Icon Avatar */}
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:bg-[#d9532f]/10 group-hover:text-[#d9532f] group-hover:border-[#d9532f]/30 transition-colors shrink-0 shadow-2xs">
                      <User className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    {/* Name & Indian City/State */}
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-slate-900 text-sm leading-snug truncate">
                        {story.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-normal leading-tight truncate mt-0.5">
                        {story.location}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Full Patient Story Modal */}
      {selectedStory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-[#d9532f]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg">
                      {selectedStory.name}
                    </h3>
                    <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500">
                    {selectedStory.location} {selectedStory.procedure ? `• ${selectedStory.procedure}` : ''}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer border border-slate-200 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#d9532f] uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>{selectedStory.procedure || 'Clinical Care & Recovery'}</span>
              </div>

              <h4 className="font-heading font-bold text-slate-900 text-lg leading-snug">
                &ldquo;{selectedStory.quote || selectedStory.headline}&rdquo;
              </h4>

              <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed font-normal whitespace-pre-line">
                {selectedStory.fullStory || selectedStory.quote || selectedStory.headline}
              </p>

              {selectedStory.doctor && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{isHindi ? 'उपचारक चिकित्सक:' : 'Treating Specialist:'}</span>
                  <span className="font-semibold text-[#003a70]">{selectedStory.doctor}</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                className="px-6 py-2 rounded-xl bg-[#003a70] hover:bg-[#002b54] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
              >
                {t('testimonials.close') || 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}
