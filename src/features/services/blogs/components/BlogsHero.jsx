import { useTranslation } from 'react-i18next'
import {
  Search,
  ChevronRight,
  Home,
  ShieldCheck,
  Clock,
  Sparkles,
  BookOpen,
  X
} from 'lucide-react'
import heroBg from '../../../../assets/appointment/appointment-hero.jpg'

export default function BlogsHero({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories = []
}) {
  const { i18n } = useTranslation('home')
  const isHindi = i18n?.language === 'hi'

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

  return (
    <section className="relative w-full pt-20 sm:pt-22 bg-[#f8f9fc]">

      {/* Main Crisp Banner matching hospital brand design standard */}
      <div className="relative w-full h-[230px] sm:h-[270px] md:h-[300px] lg:h-[330px] overflow-hidden bg-slate-950">
        
        {/* Background Image */}
        <img
          src={heroBg}
          alt={isHindi ? 'स्वास्थ्य ब्लॉग - एजाज हॉस्पिटल' : 'Health Blogs - Ejaz Hospital'}
          className="w-full h-full object-cover block"
          style={{ objectPosition: 'center 25%' }}
        />

        {/* High-Contrast Gradient Overlay for Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Content Container (Left-aligned matching site standard) */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
            <div className="max-w-3xl text-left">

              {/* Breadcrumb row */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-xs text-slate-300 mb-2.5 sm:mb-3 flex-wrap">
                <button
                  type="button"
                  onClick={(e) => navigateTo(e, '/')}
                  className="flex items-center gap-1 text-slate-300 hover:text-[#ea580c] transition-colors cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'होम' : 'Home'}</span>
                </button>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <button
                  type="button"
                  onClick={(e) => navigateTo(e, '/services/book-appointment')}
                  className="text-slate-300 hover:text-[#ea580c] transition-colors cursor-pointer"
                >
                  <span>{isHindi ? 'सेवाएं' : 'Services'}</span>
                </button>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-orange-400 font-semibold">
                  {isHindi ? 'स्वास्थ्य ब्लॉग एवं लेख' : 'Health Blogs'}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                {isHindi ? (
                  <>
                    स्वास्थ्य ब्लॉग एवं <span className="text-[#ea580c]">चिकित्सीय सलाह</span>
                  </>
                ) : (
                  <>
                    Health Blogs & <span className="text-[#ea580c]">Medical Insights</span>
                  </>
                )}
              </h1>

              {/* Signature Orange Accent Bar */}
              <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-[#ea580c] rounded-full mt-2 sm:mt-2.5 shadow-xs" />

              {/* Subtitle */}
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-[14.5px] text-slate-200/90 leading-relaxed max-w-2xl font-normal">
                {isHindi
                  ? 'एजाज अस्पताल के वरिष्ठ सर्जनों और विशेषज्ञों द्वारा सत्यापित स्वास्थ्य मार्गदर्शिका, निवारक देखभाल और आधुनिक सर्जरी तकनीकों की विस्तृत जानकारी।'
                  : 'Verified clinical advice, preventive wellness guides, and surgical breakthroughs authored by senior specialists at Ejaz Hospital.'}
              </p>

              {/* Trust Badges Row */}
              <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-slate-200 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{isHindi ? 'डॉक्टरों द्वारा सत्यापित' : 'Doctor-Authored'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{isHindi ? 'साप्ताहिक नए लेख' : 'Weekly Updates'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                  <span>{isHindi ? 'प्रमाणित चिकित्सा ज्ञान' : 'Evidence-Based'}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Floating Interactive Filter & Search Control Panel */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 -mt-6 sm:-mt-8 mb-2">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.08)] p-4 sm:p-5 lg:p-6">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input Bar with Clear Button */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isHindi
                    ? 'ब्लॉग शीर्षक, बीमारी या डॉक्टर के नाम से खोजें...'
                    : 'Search blogs by title, specialty, disease, or doctor...'
                }
                className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/25 focus:border-[#ea580c] transition-all font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Total Articles Count Pill */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold shrink-0 self-end lg:self-auto">
              <BookOpen className="w-4 h-4 text-[#ea580c]" />
              <span>
                {isHindi ? 'विशेषज्ञ स्वास्थ्य मार्गदर्शिका' : 'Clinical Health Library'}
              </span>
            </div>

          </div>

          {/* Category Filter Pills Row */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[#ea580c] text-white shadow-sm shadow-[#ea580c]/30 scale-[1.02]'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                  }`}
                >
                  {isHindi ? cat.labelHi : cat.label}
                </button>
              )
            })}
          </div>

        </div>
      </div>

    </section>
  )
}
