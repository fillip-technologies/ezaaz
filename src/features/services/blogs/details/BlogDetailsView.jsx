import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Building2,
  Phone
} from 'lucide-react'
import { getBlogById, getAllBlogs } from '../data/blogsData'
import SuggestedBlogsSection from './SuggestedBlogsSection'

export default function BlogDetailsView() {
  const { i18n } = useTranslation('home')
  const isHindi = i18n?.language === 'hi'

  const [copied, setCopied] = useState(false)

  // Retrieve blog ID from URL query params
  const [activeBlogId, setActiveBlogId] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      return params.get('id') || params.get('blog') || 'laparoscopic-gi-advances'
    } catch {
      return 'laparoscopic-gi-advances'
    }
  })

  // Listen to popstate or route events to re-read blog id
  useEffect(() => {
    const handleUrlChange = () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const id = params.get('id') || params.get('blog')
        if (id) setActiveBlogId(id)
      } catch {
        // ignore
      }
    }
    window.addEventListener('popstate', handleUrlChange)
    window.addEventListener('app-route-change', handleUrlChange)
    return () => {
      window.removeEventListener('popstate', handleUrlChange)
      window.removeEventListener('app-route-change', handleUrlChange)
    }
  }, [])

  const blog = useMemo(() => {
    return getBlogById(activeBlogId)
  }, [activeBlogId])

  const title = isHindi ? blog.titleHi : blog.title
  const category = isHindi ? blog.categoryHi : blog.category
  const date = isHindi ? blog.dateHi : blog.date
  const readTime = isHindi ? blog.readTimeHi : blog.readTime
  const author = isHindi ? blog.authorHi : blog.author
  const authorRole = isHindi ? blog.authorRoleHi : blog.authorRole
  const highlights = isHindi ? blog.keyHighlightsHi : blog.keyHighlights

  const handleShare = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const navigateTo = (e, url) => {
    if (e) e.preventDefault()
    if (window.history?.pushState) {
      window.history.pushState(null, '', url)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: url }))
    } else {
      window.location.href = url
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleSelectSuggestedBlog = (newBlogId) => {
    setActiveBlogId(newBlogId)
    const newUrl = `/blog-details?id=${newBlogId}`
    if (window.history?.pushState) {
      window.history.pushState(null, '', newUrl)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: newUrl }))
    } else {
      window.location.href = newUrl
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="w-full min-h-screen bg-[#f8f9fc] text-slate-800 pt-20 sm:pt-24">

      {/* Top Breadcrumb & Back Bar */}
      <div className="bg-white border-b border-slate-200/90 py-3 sm:py-3.5 px-4 sm:px-6 lg:px-10 sticky top-16 sm:top-20 z-30 shadow-2xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs sm:text-sm">
          
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 truncate mr-3">
            <button
              type="button"
              onClick={(e) => navigateTo(e, '/')}
              className="hover:text-[#ea580c] transition-colors cursor-pointer flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isHindi ? 'होम' : 'Home'}</span>
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={(e) => navigateTo(e, '/services/blogs')}
              className="hover:text-[#ea580c] transition-colors cursor-pointer font-medium"
            >
              {isHindi ? 'ब्लॉग' : 'Blogs'}
            </button>
            <span>/</span>
            <span className="text-[#003a70] font-bold truncate max-w-[200px] sm:max-w-md">
              {title}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => navigateTo(e, '/services/blogs')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#003a70] hover:text-[#ea580c] transition-colors cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{isHindi ? 'सभी ब्लॉग पर वापस जाएं' : 'Back to All Blogs'}</span>
            <span className="sm:hidden">{isHindi ? 'सभी ब्लॉग' : 'All Blogs'}</span>
          </button>

        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Article Meta Header */}
        <header className="mb-8 sm:mb-10 text-left">
          
          {/* Category Pill & Read Time */}
          <div className="flex items-center gap-2.5 flex-wrap mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#003a70] text-white tracking-wide shadow-2xs">
              {category}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-[#ea580c]">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{date}</span>
            </span>
          </div>

          {/* Main Title Heading */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#003a70] leading-[1.2] tracking-tight">
            {title}
          </h1>

          {/* Author Doctor Card + Share Row */}
          <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Author details */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-xs shrink-0">
                <img
                  src={blog.authorPhoto}
                  alt={author}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{author}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider">
                    {isHindi ? 'सत्यापित विशेषज्ञ' : 'Verified Doctor'}
                  </span>
                </div>
                <p className="text-xs text-[#ea580c] font-medium">{authorRole}</p>
              </div>
            </div>

            {/* Share and Action */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                title="Copy Article Link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">{isHindi ? 'लिंक कॉपी हो गया!' : 'Link Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'शेयर करें' : 'Share'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={(e) => navigateTo(e, `/appointment-booking?doctorId=${blog.authorDoctorId}`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-[#d9532f] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{isHindi ? 'डॉक्टर से परामर्श लें' : 'Consult Author'}</span>
              </button>
            </div>

          </div>

        </header>

        {/* Featured Big Image */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-200 shadow-md mb-8 sm:mb-10 border border-slate-200/80">
          <img
            src={blog.image}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Key Highlights / Takeaways Box */}
        {highlights && highlights.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50/80 via-white to-orange-50/40 rounded-2xl p-5 sm:p-7 border border-blue-200/80 shadow-xs mb-8 sm:mb-10">
            <h3 className="text-sm sm:text-base font-extrabold text-[#003a70] flex items-center gap-2 mb-3.5">
              <ShieldCheck className="w-5 h-5 text-[#ea580c]" />
              <span>{isHindi ? 'मुख्य बिंदु एवं क्लिनिकल सारांश' : 'Key Clinical Takeaways & Highlights'}</span>
            </h3>

            <ul className="space-y-2.5">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Full Rich Article Content Sections */}
        <div className="space-y-8 sm:space-y-10 text-left">
          {blog.sections?.map((section, idx) => {
            const heading = isHindi ? section.headingHi : section.heading
            const content = isHindi ? section.contentHi : section.content
            const callout = isHindi ? section.calloutHi : section.callout
            const bullets = isHindi ? section.bulletsHi : section.bullets

            return (
              <section key={idx} className="space-y-3.5">
                {heading && (
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#003a70] tracking-tight leading-snug">
                    {heading}
                  </h2>
                )}

                {content && (
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                    {content}
                  </p>
                )}

                {/* Callout Quote Box */}
                {callout && (
                  <div className="my-5 p-4 sm:p-5 rounded-2xl bg-orange-50/70 border-l-4 border-[#ea580c] text-xs sm:text-sm text-slate-800 font-medium italic leading-relaxed">
                    "{callout}"
                  </div>
                )}

                {/* Bullet Points */}
                {bullets && bullets.length > 0 && (
                  <ul className="space-y-2 pt-1 pl-1">
                    {bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-[14px] text-slate-700 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shrink-0 mt-2" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>

        {/* Tags Row */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-slate-200 flex items-center gap-2 flex-wrap text-left">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              {isHindi ? 'टैग:' : 'Tags:'}
            </span>
            {blog.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Doctor Consultation Banner at the Bottom of Article */}
        <div className="mt-12 bg-gradient-to-r from-[#003a70] via-[#002d59] to-[#001e3d] text-white rounded-3xl p-6 sm:p-8 shadow-xl text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-white/10 shrink-0 border-2 border-white/20">
              <img
                src={blog.authorPhoto}
                alt={author}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                {isHindi ? 'विशेषज्ञ परामर्श उपलब्ध' : 'Schedule Direct Consultation'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                {isHindi ? `${author} से परामर्श लें` : `Consult ${author}`}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {isHindi
                  ? 'एजाज अस्पताल में व्यक्तिगत जांच एवं उच्चस्तरीय परामर्श के लिए अपना स्लॉट बुक करें।'
                  : 'Book a priority OPD slot at Ejaz Clinic & Advanced Surgical Hospital, Patna.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={(e) => navigateTo(e, `/appointment-booking?doctorId=${blog.authorDoctorId}`)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#ea580c] hover:bg-[#d9532f] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isHindi ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+918002003000"
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/30 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+91 80020 03000</span>
            </a>
          </div>
        </div>

      </article>

      {/* Suggested Blogs Section at the Bottom */}
      <SuggestedBlogsSection
        currentBlogId={blog.id}
        onSelectBlog={handleSelectSuggestedBlog}
      />

    </div>
  )
}
