import { useState, useMemo, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ArrowRight, X, Calendar, Clock, Phone, CheckCircle2, AlertCircle, Search } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useDoctors, toDoctorCard } from '../../doctors/useDoctors'
import { normalizeSpecialty, specialtyLabel } from '../../doctors/specialtyTags'

const MAX_INITIAL_DOCTORS = 6 // Exactly 2 rows on desktop (3 cols x 2)

export default function DoctorsSection({
  isAppointmentPage = false,
  showAll = false,
  hideSeeMore = false,
  showSearch = true,
  selectedSpecialtyFilter = 'all',
  onClearSpecialtyFilter,
  title,
  subtitle
} = {}) {
  const { i18n, t } = useTranslation('home')
  const isHindi = i18n.language === 'hi'
  const sectionRef = useRef(null)

  const [selectedFilter, setSelectedFilter] = useState('all')
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navigateToBooking = (doctorId) => {
    const url = doctorId ? `/appointment-booking?doctorId=${doctorId}` : '/appointment-booking'
    if (window.history?.pushState) {
      window.history.pushState(null, '', url)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: url }))
    } else {
      window.location.href = url
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Doctors managed in the admin panel (only active ones are returned)
  const { doctors, loading: doctorsLoading } = useDoctors()

  // Filter categories
  const filterTabs = useMemo(() => [
    { id: 'all', label: t('doctorsSection.allFilter') || 'All Specialists' },
    { id: 'surgical', label: t('doctorsSection.filterSurgical') || 'Surgical Specialists' },
    { id: 'medicine', label: t('doctorsSection.filterMedicine') || 'Medicine & Critical Care' },
    { id: 'super', label: t('doctorsSection.filterSuper') || 'Super Specialists' }
  ], [t])

  const navigateToProfile = (id) => {
    if (window.history?.pushState) {
      window.history.pushState(null, '', `/doctor-profile?id=${id}`)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: `/doctor-profile?id=${id}` }))
    } else {
      window.location.href = `/doctor-profile?id=${id}`
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const activeDoctors = useMemo(() => doctors.map((doc) => toDoctorCard(doc, isHindi)).filter(Boolean), [doctors, isHindi])

  const filteredDoctors = useMemo(() => {
    let list = activeDoctors
    if (selectedFilter !== 'all') {
      list = list.filter(doc => doc.departmentId === selectedFilter)
    }
    // Specialties are ticked per doctor in the admin panel (Doctors > Specialty filters)
    if (selectedSpecialtyFilter && selectedSpecialtyFilter !== 'all') {
      const tag = normalizeSpecialty(selectedSpecialtyFilter)
      list = list.filter(doc => doc.specialtyTags.includes(tag))
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(doc => {
        const nameMatch = doc.name?.toLowerCase().includes(q)
        const specMatch = doc.specialty?.toLowerCase().includes(q)
        const subSpecMatch = doc.subSpecialty?.toLowerCase().includes(q)
        const deptMatch = doc.department?.toLowerCase().includes(q)
        const degMatch = doc.degrees?.toLowerCase().includes(q)
        const bioMatch = doc.bio?.toLowerCase().includes(q)
        return nameMatch || specMatch || subSpecMatch || deptMatch || degMatch || bioMatch
      })
    }
    return list
  }, [activeDoctors, selectedFilter, selectedSpecialtyFilter, searchQuery])

  // Show all doctors if on appointment page or expanded, otherwise show 2 rows (6 cards) on home
  const displayedDoctors = useMemo(() => {
    if (isAppointmentPage || showAll || isExpanded) return filteredDoctors
    return filteredDoctors.slice(0, MAX_INITIAL_DOCTORS)
  }, [filteredDoctors, isExpanded, isAppointmentPage, showAll])

  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId)
    setIsExpanded(false)
  }

  // Subtle entrance animation on filter change / initial view / expanding
  useGSAP(() => {
    if (!sectionRef.current) return
    gsap.fromTo(
      '.doctor-card',
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all'
      }
    )
  }, { dependencies: [displayedDoctors], scope: sectionRef })

  return (
    <section
      id="doctors"
      ref={sectionRef}
      className="relative w-full bg-white text-slate-800 py-16 sm:py-20 lg:py-24 border-t border-slate-100 overflow-hidden scroll-mt-24"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header with Category Filters */}
        <div className="doctors-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              {title || (isAppointmentPage
                ? (isHindi ? 'विशेषज्ञ डॉक्टर चुनें एवं अपॉइंटमेंट बुक करें' : 'Choose Your Doctor & Book an Appointment')
                : (t('doctorsSection.title') || 'Meet Our Renowned Medical Specialists'))}
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed">
              {subtitle || (isAppointmentPage
                ? (isHindi ? 'अपनी पसंदीदा विशेषज्ञता के अनुसार डॉक्टर चुनें और तुरंत परामर्श शेड्यूल करें।' : 'Filter by clinical department and schedule priority consultation with our experienced medical faculty.')
                : t('doctorsSection.subtitle'))}
            </p>
          </div>

          {/* Right Header Controls: Category Filters */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar py-1 -my-1">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-slate-100 p-1 sm:p-1.5 rounded-full border border-slate-200/70 min-w-max">
              {filterTabs.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleFilterChange(tab.id)}
                  className={`shrink-0 whitespace-nowrap px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer select-none ${
                    selectedFilter === tab.id
                      ? isAppointmentPage
                        ? 'bg-[#d9532f] text-white shadow-sm'
                        : 'bg-[#c12532] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Typing Filter Bar */}
        {(showSearch || isAppointmentPage) && (
          <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHindi ? 'डॉक्टर का नाम, विशेषज्ञता या समस्या टाइप करके खोजें...' : 'Type doctor name, specialty, or condition to filter...'}
                className="w-full pl-11 pr-10 py-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#ea580c] focus:ring-4 focus:ring-[#ea580c]/15 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all shadow-xs outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results count indicator & Active Specialty filter badge */}
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center px-1">
              {selectedSpecialtyFilter && selectedSpecialtyFilter !== 'all' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-[#205493] rounded-full text-xs font-semibold shadow-2xs">
                  <span>{isHindi ? 'विशेषज्ञता: ' : 'Speciality: '}<strong>{specialtyLabel(selectedSpecialtyFilter, isHindi)}</strong></span>
                  {onClearSpecialtyFilter && (
                    <button
                      type="button"
                      onClick={onClearSpecialtyFilter}
                      className="p-0.5 hover:bg-blue-200/60 rounded-full cursor-pointer transition-colors ml-0.5"
                      aria-label="Clear specialty filter"
                    >
                      <X className="w-3 h-3 text-[#205493]" />
                    </button>
                  )}
                </div>
              )}
              <span className="text-xs font-semibold text-slate-500">
                {isHindi ? (
                  <>कुल <strong>{filteredDoctors.length}</strong> विशेषज्ञ डॉक्टर</>
                ) : (
                  <>Showing <strong>{filteredDoctors.length}</strong> Specialist{filteredDoctors.length === 1 ? '' : 's'}</>
                )}
              </span>
            </div>
          </div>
        )}

        {/* 3-Column Responsive Doctors Grid or Empty Search State */}
        {doctorsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-44 rounded-xl sm:rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : activeDoctors.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate-500">
            {isHindi ? 'डॉक्टरों की जानकारी जल्द ही उपलब्ध होगी।' : 'Doctor profiles will be available soon.'}
          </p>
        ) : displayedDoctors.length === 0 ? (
          <div className="py-14 sm:py-16 px-4 text-center bg-slate-50/70 border border-slate-200/80 rounded-2xl sm:rounded-3xl max-w-md mx-auto my-6">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-[#ea580c] flex items-center justify-center mx-auto mb-3.5">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {isHindi ? 'कोई डॉक्टर नहीं मिला' : 'No specialists found'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              {searchQuery.trim()
                ? (isHindi
                  ? `"${searchQuery}" के लिए कोई डॉक्टर उपलब्ध नहीं है। कृपया कोई अन्य नाम या विभाग खोजें।`
                  : `We couldn't find any specialist matching "${searchQuery}". Try a different keyword or reset filters.`)
                : (isHindi
                  ? 'चुने गए फ़िल्टर के लिए अभी कोई डॉक्टर उपलब्ध नहीं है।'
                  : 'No specialist is listed for the selected filters yet.')}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedFilter('all')
                onClearSpecialtyFilter?.()
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#ea580c] hover:bg-[#d9532f] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              {isHindi ? 'सभी डॉक्टर देखें' : 'Clear Search & Show All'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {displayedDoctors.map((doctor) => {
            const photoSrc = doctor.photo
            return (
              <div
                key={doctor.id}
                className="doctor-card group bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 xl:p-6 flex flex-col justify-between text-left"
              >
                {/* Top Section: Photo + View Profile on Left, Info on Right */}
                <div className="flex items-start gap-3.5 sm:gap-4 xl:gap-5 flex-1">
                  
                  {/* Left Column: Doctor Photo + View Profile link directly underneath */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-20 h-20 sm:w-22 sm:h-22 xl:w-26 xl:h-26 rounded-lg sm:rounded-xl overflow-hidden bg-slate-50 border border-slate-200/70 shadow-xs">
                      <img
                        src={photoSrc}
                        alt={doctor.name}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateToProfile(doctor.id)}
                      className="mt-2.5 text-[#003a70] hover:text-[#ea580c] text-[11.5px] sm:text-xs xl:text-[13px] font-semibold underline underline-offset-3 transition-colors cursor-pointer text-center"
                    >
                      {isHindi ? 'प्रोफाइल देखें' : 'View Profile'}
                    </button>
                  </div>

                  {/* Right Column: Name, Title, Separator Line, Specs + Bottom-Right CTA */}
                  <div className="flex-1 flex flex-col justify-between min-w-0 h-full">
                    <div>
                      {/* Doctor Name */}
                      <h3 className="text-sm sm:text-base xl:text-[17px] font-bold text-[#003a70] tracking-tight leading-snug truncate">
                        {doctor.name}
                      </h3>

                      {/* Designation / Role */}
                      <p className="text-[11.5px] sm:text-xs xl:text-[12.5px] text-slate-700 font-medium mt-0.5 truncate">
                        {doctor.specialty}
                      </p>

                      {/* Thin Horizontal Divider Line */}
                      <div className="w-full h-px bg-slate-200/80 my-2" />

                      {/* Department, Experience, Gender Specs */}
                      <div className="space-y-0.5 sm:space-y-1 text-[11.5px] sm:text-xs xl:text-[12.5px] leading-snug">
                        <p className="text-slate-700 font-medium truncate">
                          {doctor.department || doctor.subSpecialty}
                        </p>
                        <p className="text-slate-600 truncate">
                          <strong className="font-bold text-slate-800">{isHindi ? 'अनुभव: ' : 'Experience: '}</strong>
                          <span className="text-slate-700 font-normal">{doctor.experience}</span>
                        </p>
                        <p className="text-slate-600 truncate">
                          <strong className="font-bold text-slate-800">{isHindi ? 'लिंग: ' : 'Gender: '}</strong>
                          <span className="text-slate-700 font-normal">{doctor.gender}</span>
                        </p>
                      </div>
                    </div>

                    {/* Bottom-right Action Button: Book an Appointment */}
                    <div className="mt-3.5 pt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => navigateToBooking(doctor.id)}
                        className="inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md bg-[#d9532f] hover:bg-[#c44322] text-white font-bold text-[11.5px] sm:text-xs xl:text-[12.5px] tracking-wide shadow-sm hover:shadow-md hover:shadow-[#d9532f]/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                      >
                        <span>{isHindi ? 'अपॉइंटमेंट लें' : 'Book an Appointment'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
        )}

        {/* "See More" / Expand Controls (Hidden on Appointment page) */}
        {!isAppointmentPage && !hideSeeMore && filteredDoctors.length > MAX_INITIAL_DOCTORS && (
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => {
                if (isExpanded) {
                  setIsExpanded(false)
                  const sectionEl = document.getElementById('doctors')
                  if (sectionEl) {
                    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                } else {
                  setIsExpanded(true)
                }
              }}
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white hover:bg-slate-50 text-[#003a70] hover:text-[#c12532] border-2 border-slate-200 hover:border-[#c12532]/40 font-bold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer select-none active:scale-95"
            >
              <span>
                {isExpanded
                  ? (t('doctorsSection.seeLess') || (isHindi ? 'कम देखें' : 'See Less'))
                  : (t('doctorsSection.seeMore') || (isHindi ? 'और देखें' : 'See More'))}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180 text-[#c12532]' : 'group-hover:translate-y-0.5 text-slate-500 group-hover:text-[#c12532]'
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.history?.pushState) {
                  window.history.pushState(null, '', '/doctors')
                  window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
                  window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/doctors' }))
                } else {
                  window.location.href = '/doctors'
                }
                window.scrollTo({ top: 0, behavior: 'instant' })
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-slate-500 hover:text-[#003a70] transition-colors cursor-pointer py-2 px-3"
            >
              <span>{t('doctorsSection.viewAll') || (isHindi ? 'सभी डॉक्टर देखें' : 'View All Doctors')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

