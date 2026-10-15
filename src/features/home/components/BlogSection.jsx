import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  X,
  Share2,
  Check,
  BookOpen
} from 'lucide-react'

// Import generated realistic blog photos
import whiteCoatImg from '../../../assets/home/blog/white-coat-ceremony.jpg'
import heatIllnessImg from '../../../assets/home/blog/heat-illness.jpg'
import slippingRibImg from '../../../assets/home/blog/slipping-rib.jpg'
import optimismImg from '../../../assets/home/blog/cultivate-optimism.jpg'
import fallPreventionImg from '../../../assets/home/blog/fall-prevention.jpg'

gsap.registerPlugin(ScrollTrigger)

const ARTICLE_IMAGES = {
  'white-coat': whiteCoatImg,
  'heat-illness': heatIllnessImg,
  'slipping-rib': slippingRibImg,
  'cultivate-optimism': optimismImg,
  'fall-prevention': fallPreventionImg
}

export default function BlogSection() {
  const { t, i18n } = useTranslation('home')
  const isHindi = i18n?.language === 'hi'

  const sectionRef = useRef(null)
  const [activeArticle, setActiveArticle] = useState(null)
  const [copied, setCopied] = useState(false)
  const [visibleCount, setVisibleCount] = useState(3)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [isPaused, setIsPaused] = useState(false)

  // Localized data
  const rawFeatured = t('blog.featured', { returnObjects: true }) || {}
  const rawArticles = t('blog.articles', { returnObjects: true })
  const articles = Array.isArray(rawArticles) ? rawArticles : []

  // Fallback featured data
  const featured = {
    id: rawFeatured.id || 'white-coat',
    title: rawFeatured.title || 'Different paths, same calling: Ejaz Hospital welcomes newest medical students & fellows',
    excerpt: rawFeatured.excerpt || 'Nearly 175 incoming medical students and fellows donned white coats at the annual White Coat Ceremony this summer to mark the start of their medical education and advanced surgical training.',
    date: rawFeatured.date || 'September 3, 2026',
    readTime: rawFeatured.readTime || '3 min read',
    category: rawFeatured.category || (isHindi ? 'चिकित्सा शिक्षा एवं प्रशिक्षण' : 'Medical Education & Training'),
    author: rawFeatured.author || 'Dr. Shahzad Ejaz',
    fullContent: rawFeatured.fullContent || rawFeatured.excerpt
  }

  // Combined articles list for the scroller
  const allArticles = [
    featured,
    ...articles.filter((a) => a.id !== featured.id)
  ]

  // Update visible card count based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth
      if (width >= 1024) setVisibleCount(3)
      else if (width >= 640) setVisibleCount(2)
      else setVisibleCount(1)
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const maxIndex = Math.max(0, allArticles.length - visibleCount)

  // Ensure index remains in bounds on viewport resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [maxIndex, currentIndex])

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
    if (diff > 45) handleNext()
    if (diff < -45) handlePrev()
    setTouchStart(null)
  }

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused || allArticles.length <= visibleCount) return
    const timer = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(timer)
  }, [currentIndex, isPaused, visibleCount, allArticles.length, maxIndex])

  // Navigate to dedicated blog details page
  const navigateToBlogDetails = (id) => {
    const url = `/blog-details?id=${id}`
    if (window.history?.pushState) {
      window.history.pushState(null, '', url)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: url }))
    } else {
      window.location.href = url
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const navigateToAllBlogs = (e) => {
    if (e) e.preventDefault()
    const url = '/services/blogs'
    if (window.history?.pushState) {
      window.history.pushState(null, '', url)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: url }))
    } else {
      window.location.href = url
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Handle Share link copy
  const handleShare = (article) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  // Modal Escape key support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveArticle(null)
    }
    if (activeArticle) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeArticle])

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
      '.blog-title',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out', clearProps: 'all' }
    ).fromTo(
      '.blog-scroller-container',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', clearProps: 'all' },
      '-=0.3'
    )
  }, { scope: sectionRef })

  return (
    <section
      id="latest-news"
      ref={sectionRef}
      className="relative w-full bg-[#f9f8f4] text-slate-800 py-14 sm:py-20 lg:py-24 border-t border-stone-200/80 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Heading & Scroller Controls matching Client Request */}
        <div className="blog-title mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#003a70] tracking-tight leading-tight">
              {t('blog.title') || 'Latest News'}
            </h2>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 self-stretch sm:self-auto justify-between sm:justify-end">
            <button
              type="button"
              onClick={navigateToAllBlogs}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ea580c] hover:text-[#d9532f] transition-colors cursor-pointer group"
            >
              <span>{isHindi ? 'सभी ब्लॉग देखें' : 'View All Blogs'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Navigation Arrow Buttons */}
            {allArticles.length > visibleCount && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous article"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-300 hover:border-[#003a70] bg-white text-slate-700 hover:text-[#003a70] flex items-center justify-center shadow-xs hover:shadow-md transition-all active:scale-90 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next article"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#003a70] hover:bg-[#002b54] text-white flex items-center justify-center shadow-xs hover:shadow-md transition-all active:scale-90 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scroller Slider Container */}
        <div
          className="blog-scroller-container relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards Track Window */}
          <div
            className="overflow-hidden px-0.5 py-2"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out gap-5"
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% + 20px) / ${visibleCount}))`
              }}
            >
              {allArticles.map((article, idx) => {
                const imageSrc = ARTICLE_IMAGES[article.id] || whiteCoatImg

                return (
                  <div
                    key={article.id || idx}
                    onClick={() => navigateToBlogDetails(article.id)}
                    style={{
                      width: `calc((100% - ${(visibleCount - 1) * 20}px) / ${visibleCount})`
                    }}
                    className="shrink-0 bg-white rounded-2xl border border-stone-200/90 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer text-left"
                  >
                    {/* Top Image with Category Tag */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={imageSrc}
                        alt={article.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      {article.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-[#003a70] shadow-xs backdrop-blur-xs">
                          {article.category}
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-[#003a70] group-hover:text-[#0b5c92] text-lg sm:text-[20px] leading-snug line-clamp-2 tracking-tight mb-2.5 transition-colors">
                          {article.title}
                        </h3>

                        {article.excerpt && (
                          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed line-clamp-3 font-normal mb-5">
                            {article.excerpt}
                          </p>
                        )}
                      </div>

                      {/* Meta info row: Calendar & Clock + Read Link */}
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-3.5 border-t border-slate-100/90 mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 font-semibold text-[#ea580c] group-hover:translate-x-1 transition-transform">
                          <span>{isHindi ? 'पढ़ें' : 'Read'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          {allArticles.length > visibleCount && (
            <div className="flex items-center justify-center gap-2 mt-7 sm:mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-7 bg-[#003a70]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-56 sm:h-72 w-full shrink-0 overflow-hidden bg-slate-900">
              <img
                src={activeArticle.imageSrc}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border border-white/20 active:scale-95 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 left-5 sm:left-7 right-5 text-white text-left">
                {activeArticle.category && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#0b5c92] text-white mb-2 shadow-xs">
                    {activeArticle.category}
                  </span>
                )}
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-tight drop-shadow-sm">
                  {activeArticle.title}
                </h3>
              </div>
            </div>

            {/* Modal Scrollable Article Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-left text-slate-700">
              
              {/* Author & Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs sm:text-sm text-slate-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{activeArticle.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{activeArticle.readTime}</span>
                  </div>
                </div>

                {activeArticle.author && (
                  <span className="text-slate-700 font-semibold">
                    {activeArticle.author}
                  </span>
                )}
              </div>

              {/* Article Content */}
              <div className="prose prose-slate max-w-none space-y-4 text-sm sm:text-base leading-relaxed">
                {(activeArticle.fullContent || activeArticle.excerpt)
                  .split('\n\n')
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>

              {/* Clinical Advisory Notice */}
              <div className="bg-[#f9f8f4] border border-stone-200 rounded-xl p-4 mt-6">
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong className="text-slate-700">{isHindi ? 'चिकित्सीय सूचना:' : 'Medical Advisory:'}</strong>{' '}
                  {isHindi
                    ? 'यह लेख केवल सूचनात्मक उद्देश्य के लिए है। किसी भी स्वास्थ्य स्थिति या उपचार के लिए हमेशा योग्य डॉक्टर से परामर्श करें।'
                    : 'This article is published for general educational information. Always consult a qualified physician or specialist at Ejaz Hospital for medical advice, diagnosis, or personalized treatment.'}
                </p>
              </div>

            </div>

            {/* Modal Footer: Close & Share */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleShare(activeArticle)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#003a70]" />}
                <span>{copied ? (isHindi ? 'लिंक कॉपी हो गया!' : 'Link Copied!') : (t('blog.shareArticle') || 'Share Article')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-[#003a70] hover:bg-[#002b54] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
              >
                <span>{t('blog.close') || 'Close'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}
