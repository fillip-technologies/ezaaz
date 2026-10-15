import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Share2,
  Globe,
  Clock,
  ArrowUpRight,
  Phone,
  CheckCircle2,
  GraduationCap,
  Award,
  ChevronLeft,
  Sparkles,
  Check,
  Calendar,
  Loader2
} from 'lucide-react'
import { useDoctors, toDoctorProfile } from '../useDoctors'

// Doctor slug from ?id=... (or /doctor-profile/<slug>)
const getDoctorIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search)
  const qId = params.get('id')
  if (qId) return qId.toLowerCase()
  const lastPart = window.location.pathname.split('/').pop()
  return lastPart && lastPart !== 'doctor-profile' ? lastPart.toLowerCase() : ''
}

export default function DoctorProfileView({ doctorId = '' }) {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Doctors are managed in the admin panel and loaded from the API
  const { doctors, loading, error } = useDoctors()
  const [currentDoctorId, setCurrentDoctorId] = useState(() => getDoctorIdFromUrl() || doctorId)

  // Synchronize on browser history popstate
  useEffect(() => {
    const handleUrlChange = () => {
      const qId = getDoctorIdFromUrl()
      if (qId) setCurrentDoctorId(qId)
    }
    window.addEventListener('popstate', handleUrlChange)
    return () => window.removeEventListener('popstate', handleUrlChange)
  }, [])

  // Doctor details object (null while loading or if the doctor doesn't exist / is hidden)
  const doctor = useMemo(() => {
    const found = currentDoctorId ? doctors.find((d) => d.slug === currentDoctorId) : doctors[0]
    return found ? toDoctorProfile(found) : null
  }, [doctors, currentDoctorId])

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: 'Morning OPD'
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = isHindi ? 'कृपया नाम दर्ज करें।' : 'Name field is required.'
    }
    if (!formData.phone.trim()) {
      errors.phone = isHindi ? 'कृपया मोबाइल नंबर दर्ज करें।' : 'Mobile number is required.'
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = isHindi ? 'मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.'
    }
    if (!formData.date) {
      errors.date = isHindi ? 'कृपया अपॉइंटमेंट की तारीख चुनें।' : 'Please select an appointment date.'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors({})
    setIsSubmitted(true)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${doctor.name} - Ejaz Clinic`,
          text: `Consult with ${doctor.name} (${doctor.specialty}) at Ejaz Clinic.`,
          url: window.location.href
        })
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard?.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    }
  }

  const handleNavigateToDoctor = (id) => {
    setCurrentDoctorId(id)
    if (window.history?.pushState) {
      window.history.pushState(null, '', `/doctor-profile?id=${id}`)
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: `/doctor-profile?id=${id}` }))
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = (e) => {
    if (e) e.preventDefault()
    if (window.history?.pushState) {
      window.history.pushState(null, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/' }))
    } else {
      window.location.href = '/'
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleBackToDoctors = (e) => {
    if (e) e.preventDefault()
    if (window.history?.pushState) {
      window.history.pushState(null, '', '/doctors')
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/doctors' }))
    } else {
      window.location.href = '/doctors'
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const otherDoctors = useMemo(() => {
    return doctors.filter((d) => d.slug !== doctor?.id).map(toDoctorProfile)
  }, [doctors, doctor?.id])

  if (loading || !doctor) {
    return (
      <div className="w-full bg-[#f8f9fc] text-slate-800 min-h-screen pt-20 sm:pt-22 flex items-center justify-center px-4">
        {loading ? (
          <Loader2 className="w-8 h-8 text-[#003a70] animate-spin" aria-label={isHindi ? 'लोड हो रहा है' : 'Loading'} />
        ) : (
          <div className="text-center max-w-md py-16">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {error
                ? (isHindi ? 'डॉक्टर की जानकारी लोड नहीं हो सकी' : "Couldn't load doctor details")
                : (isHindi ? 'डॉक्टर नहीं मिले' : 'Doctor not found')}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {error
                ? (isHindi ? 'कृपया थोड़ी देर बाद पुनः प्रयास करें।' : 'Please try again in a moment.')
                : (isHindi ? 'यह प्रोफ़ाइल उपलब्ध नहीं है। हमारे सभी डॉक्टर्स देखें।' : 'This profile is not available. Browse all our doctors instead.')}
            </p>
            <button
              type="button"
              onClick={handleBackToDoctors}
              className="mt-5 px-5 py-2.5 bg-[#003a70] hover:bg-[#00284d] text-white rounded-xl text-sm font-semibold cursor-pointer transition-colors"
            >
              {isHindi ? 'सभी डॉक्टर्स देखें' : 'View All Doctors'}
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full bg-[#f8f9fc] text-slate-800 min-h-screen pt-20 sm:pt-22">
      
      {/* Top Clean Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 py-2.5 sm:py-3 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 truncate mr-2">
            <button
              type="button"
              onClick={handleBackToHome}
              className="hover:text-[#ea580c] font-medium transition-colors cursor-pointer"
            >
              {isHindi ? 'होम' : 'Home'}
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={handleBackToDoctors}
              className="hover:text-[#ea580c] font-medium transition-colors cursor-pointer"
            >
              {isHindi ? 'डॉक्टर्स' : 'Doctors'}
            </button>
            <span className="hidden sm:inline">/</span>
            <span className="hidden sm:inline text-[#003a70] font-bold truncate">
              {isHindi ? doctor.nameHi : doctor.name}
            </span>
          </div>

          <button
            type="button"
            onClick={handleBackToDoctors}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#003a70] hover:text-[#ea580c] transition-colors cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{isHindi ? 'सभी डॉक्टर्स देखें' : 'Back to All Doctors'}</span>
            <span className="sm:hidden">{isHindi ? 'सभी डॉक्टर्स' : 'All Doctors'}</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CLEAN DOCTOR HERO BANNER                                 */}
      {/* Deep Navy Gradient with soft subtle waveform lines       */}
      {/* Contains Doctor Info on Left and Clean Card on Right     */}
      {/* ======================================================== */}
      <section className="relative w-full bg-gradient-to-r from-[#00284d] via-[#003a70] to-[#004d94] text-white pt-5 sm:pt-10 lg:pt-12 pb-6 sm:pb-14 lg:pb-16">
        
        {/* Subtle Waveform SVGs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 400">
            <path d="M0,100 C300,180 600,20 1200,120 L1200,400 L0,400 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0,150 C400,240 700,60 1200,180 L1200,400 L0,400 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0,200 C350,280 800,90 1200,240 L1200,400 L0,400 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-start">
            
            {/* LEFT COLUMN (8 cols): Clean Doctor Portrait & Information */}
            <div className="lg:col-span-8">
              
              {/* =================================================== */}
              {/* MOBILE VIEW (< sm): Clean, compact, balanced layout */}
              {/* Photo + Primary details side-by-side, no gaping gap */}
              {/* =================================================== */}
              <div className="sm:hidden">
                <div className="flex items-start gap-3.5">
                  {/* Compact Doctor Portrait */}
                  <div className="shrink-0 w-28 xs:w-32 aspect-[3/4] bg-white rounded-2xl p-1 shadow-[0_10px_25px_rgba(0,0,0,0.35)] border-2 border-white/80 overflow-hidden">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top rounded-xl"
                    />
                  </div>

                  {/* Primary Info beside portrait */}
                  <div className="flex-1 min-w-0 flex flex-col justify-start space-y-1.5 pt-0.5">
                    {/* Reg No */}
                    <p className="text-[11px] font-normal tracking-wide text-white/80">
                      {isHindi ? 'पंजीकरण: ' : 'Reg. No: '}
                      <span className="text-white font-semibold">{doctor.regNo}</span>
                    </p>

                    {/* Doctor Name + Share */}
                    <div className="flex items-start justify-between gap-1.5">
                      <h1 className="text-lg xs:text-xl font-bold text-white tracking-tight leading-tight">
                        {isHindi ? doctor.nameHi : doctor.name}
                      </h1>
                      <button
                        type="button"
                        onClick={handleShare}
                        title="Share Doctor Profile"
                        className="p-1 rounded-full hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer shrink-0"
                      >
                        {copiedLink ? (
                          <span className="text-emerald-300 text-[11px] font-semibold flex items-center gap-0.5">
                            <Check className="w-3 h-3" />
                          </span>
                        ) : (
                          <Share2 className="w-4 h-4 text-white/90" />
                        )}
                      </button>
                    </div>

                    {/* Primary Specialty */}
                    <p className="text-xs font-semibold text-white/95 leading-snug">
                      {isHindi ? doctor.specialtyHi : doctor.specialty}
                    </p>

                    {/* Experience */}
                    <p className="text-xs text-white/90">
                      <span className="text-white font-semibold">{isHindi ? 'अनुभव: ' : 'Experience: '}</span>
                      {isHindi ? doctor.experienceHi : doctor.experience}
                    </p>
                  </div>
                </div>

                {/* Secondary Credentials (Full width below photo on mobile) */}
                <div className="mt-3.5 pt-3 border-t border-white/15 space-y-2 text-xs text-white/90">
                  <p className="leading-relaxed">
                    <span className="text-white font-semibold">{isHindi ? 'शिक्षा: ' : 'Education: '}</span>
                    {isHindi ? doctor.degreesHi : doctor.degrees}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5">
                    <div className="flex items-center gap-1.5 text-white/90">
                      <Globe className="w-3.5 h-3.5 text-white/80 shrink-0" />
                      <span>{doctor.languages}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-white/90">
                      <Clock className="w-3.5 h-3.5 text-white/80 shrink-0" />
                      <span>{isHindi ? doctor.timingHi : doctor.timing}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================== */}
              {/* TABLET & DESKTOP VIEW (sm: and up): Preserved Layout*/}
              {/* =================================================== */}
              <div className="hidden sm:flex items-start gap-6 sm:gap-8">
                
                {/* Doctor Portrait Card: Clean white rounded frame with no obscuring overlays */}
                <div className="shrink-0 w-44 sm:w-52 md:w-56 aspect-[3/4] bg-white rounded-2xl sm:rounded-3xl p-1 shadow-[0_12px_36px_rgba(0,0,0,0.35)] border-2 border-white/80 overflow-hidden group">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Doctor Credentials & Clean Text Hierarchy */}
                <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2.5">
                  
                  {/* Registration Number */}
                  <p className="text-xs sm:text-[13px] font-normal tracking-wide text-white/80">
                    {isHindi ? 'पंजीकरण सं. : ' : 'Reg. No : '}
                    <span className="text-white font-semibold">{doctor.regNo}</span>
                  </p>

                  {/* Doctor Name + Share Button */}
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-tight">
                      {isHindi ? doctor.nameHi : doctor.name}
                    </h1>

                    <button
                      type="button"
                      onClick={handleShare}
                      title="Share Doctor Profile"
                      className="p-1 rounded-full hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer shrink-0"
                    >
                      {copiedLink ? (
                        <span className="text-emerald-300 text-xs font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Copied!
                        </span>
                      ) : (
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                      )}
                    </button>
                  </div>

                  {/* Primary Specialty / Title */}
                  <p className="text-sm sm:text-base font-semibold text-white/95 tracking-wide">
                    {isHindi ? doctor.specialtyHi : doctor.specialty}
                  </p>

                  {/* Experience & Education */}
                  <div className="space-y-1 text-xs sm:text-[13.5px] text-white/90 pt-1">
                    <p>
                      <span className="text-white font-semibold">{isHindi ? 'अनुभव: ' : 'Experience: '}</span>
                      {isHindi ? doctor.experienceHi : doctor.experience}
                    </p>
                    <p>
                      <span className="text-white font-semibold">{isHindi ? 'शिक्षा: ' : 'Education: '}</span>
                      {isHindi ? doctor.degreesHi : doctor.degrees}
                    </p>
                  </div>

                  {/* Languages Spoken */}
                  <div className="flex items-center gap-2 pt-1 text-xs sm:text-sm text-white/90">
                    <Globe className="w-4 h-4 text-white/80 shrink-0" />
                    <span>{doctor.languages}</span>
                  </div>

                  {/* OPD Timing */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                    <Clock className="w-4 h-4 text-white/80 shrink-0" />
                    <span>{isHindi ? doctor.timingHi : doctor.timing}</span>
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT COLUMN (4 cols): CLEAN FLOATING BOOK APPOINTMENT CARD */}
            <div className="lg:col-span-4 w-full lg:-mb-36 lg:relative z-20">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_16px_45px_rgba(0,0,0,0.18)] border border-slate-100 overflow-hidden text-slate-800">
                
                <div className="p-4.5 xs:p-5 sm:p-7">
                  
                  {/* Clean Card Heading */}
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight mb-3.5 sm:mb-5">
                    {isHindi ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}
                  </h3>

                  {isSubmitted ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                        <Check className="w-7 h-7 stroke-[2.5]" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">
                        {isHindi ? 'अनुरोध सफलतापूर्वक प्राप्त हुआ!' : 'Appointment Requested!'}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isHindi
                          ? `धन्यवाद ${formData.name}। ${doctor.nameHi} के लिए ${formData.date ? formData.date : ''} (${formData.timeSlot}) का आपका अपॉइंटमेंट अनुरोध प्राप्त हुआ है। हमारी टीम जल्द ही आपसे संपर्क करेगी।`
                          : `Thank you, ${formData.name}. Your appointment request with ${doctor.name} for ${formData.date ? formData.date : 'the requested date'} (${formData.timeSlot}) has been received. Our OPD team will call you shortly to confirm your slot.`}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false)
                          setFormData({ name: '', phone: '', date: '', timeSlot: 'Morning OPD' })
                        }}
                        className="mt-3 px-5 py-2.5 bg-[#003a70] hover:bg-[#00284d] text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                      >
                        {isHindi ? 'अन्य अपॉइंटमेंट लें' : 'Book Another Appointment'}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-3.5">
                      
                      {/* Error Alerts */}
                      {formErrors.name && (
                        <div className="p-2 sm:p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                          {formErrors.name}
                        </div>
                      )}
                      {formErrors.phone && !formErrors.name && (
                        <div className="p-2 sm:p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                          {formErrors.phone}
                        </div>
                      )}
                      {formErrors.date && !formErrors.name && !formErrors.phone && (
                        <div className="p-2 sm:p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                          {formErrors.date}
                        </div>
                      )}

                      {/* Name Input */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1">
                          {isHindi ? 'मरीज का नाम:' : 'Patient Name:'}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={isHindi ? "अपना नाम दर्ज करें:" : "Enter Name:"}
                          className={`w-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-white border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${
                            formErrors.name
                              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-slate-200 focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10'
                          }`}
                        />
                      </div>

                      {/* Mobile Number Input */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1">
                          {isHindi ? 'मोबाइल नंबर:' : 'Mobile Number:'}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          maxLength={10}
                          placeholder={isHindi ? "मोबाइल नंबर दर्ज करें:" : "Enter Mobile Number:"}
                          className={`w-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-white border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${
                            formErrors.phone
                              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-slate-200 focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10'
                          }`}
                        />
                      </div>

                      {/* Appointment Date Input */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1">
                          {isHindi ? 'अपॉइंटमेंट की तारीख:' : 'Appointment Date:'}
                        </label>
                        <input
                          type="date"
                          name="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.date}
                          onChange={handleInputChange}
                          className={`w-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-white border rounded-xl text-slate-800 focus:outline-none transition-all cursor-pointer ${
                            formErrors.date
                              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-slate-200 focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10'
                          }`}
                        />
                      </div>

                      {/* Time Slot Selector */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1">
                          {isHindi ? 'पसंदीदा समय स्लॉट:' : 'Preferred Time Slot:'}
                        </label>
                        <select
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleInputChange}
                          className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10 transition-all cursor-pointer"
                        >
                          <option value="Morning OPD">
                            {isHindi ? 'सुबह ओपीडी (11:00 AM - 01:00 PM)' : 'Morning OPD (11:00 AM - 01:00 PM)'}
                          </option>
                          <option value="Afternoon OPD">
                            {isHindi ? 'दोपहर ओपीडी (01:00 PM - 02:00 PM)' : 'Afternoon OPD (01:00 PM - 02:00 PM)'}
                          </option>
                        </select>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-1.5 sm:pt-2 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
                        {/* Amber/Gold Button: Request Appointment ↗ */}
                        <button
                          type="submit"
                          className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold text-xs sm:text-[13px] shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                        >
                          <span>{isHindi ? 'अपॉइंटमेंट अनुरोध' : 'Request Appointment'}</span>
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </button>

                        {/* Navy Button: Call Now */}
                        <a
                          href="tel:+918002003000"
                          className="w-full sm:w-auto py-2.5 sm:py-3 px-4 rounded-xl bg-[#003a70] hover:bg-[#00284d] text-white font-bold text-xs sm:text-[13px] shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                        >
                          <Phone className="w-3.5 h-3.5 fill-current" />
                          <span>{isHindi ? 'कॉल करें' : 'Call Now'}</span>
                        </a>
                      </div>

                    </form>
                  )}

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* LOWER CONTENT SECTION (About Narrative & Credentials)     */}
      {/* Clean open layout without boxy card wrappers             */}
      {/* ======================================================== */}
      <section className="relative w-full py-12 sm:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: About Doctor narrative & credentials (Clean flow, no cards) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* About Section Heading & Story */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
                  About <span className="text-[#003a70]">{isHindi ? doctor.nameHi : doctor.name}</span>
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {isHindi ? doctor.aboutHi : doctor.aboutEn}
                </p>
              </div>

              <div className="w-full h-px bg-slate-200/80" />

              {/* Specializations List */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <Award className="w-5 h-5 text-[#ea580c]" />
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {isHindi ? 'विशेषज्ञता एवं क्लिनिकल अनुभव' : 'Key Specializations & Clinical Areas'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.specializations?.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-orange-500/30 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                        {isHindi && spec.hi ? spec.hi : spec.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-slate-200/80" />

              {/* Educational Qualifications & Fellowships */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <GraduationCap className="w-5 h-5 text-[#003a70]" />
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {isHindi ? 'शैक्षणिक योग्यता एवं प्रशिक्षण' : 'Education & Clinical Fellowships'}
                  </h3>
                </div>

                <div className="space-y-3">
                  {doctor.education?.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-[#ea580c] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {edu.degree}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium pl-4.5 sm:pl-0">
                        {edu.institution}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (4 cols): Useful Clinic OPD Desk, Emergency & Facilities Sidebar */}
            <div className="lg:col-span-4 lg:pt-20 space-y-5">
              
              {/* OPD Consultation Chamber & Helpdesk Card */}
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2 text-[#003a70] mb-3">
                  <Clock className="w-4 h-4 text-[#ea580c]" />
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                    {isHindi ? 'ओपीडी परामर्श एवं समय' : 'OPD Consultation Desk'}
                  </h4>
                </div>

                <div className="space-y-3 text-xs sm:text-[13px] text-slate-600">
                  <div className="pb-2.5 border-b border-slate-200/80">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {isHindi ? 'डॉक्टर परामर्श समय' : 'Doctor Schedule'}
                    </span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {isHindi ? doctor.timingHi : doctor.timing}
                    </p>
                  </div>

                  <div className="pb-2.5 border-b border-slate-200/80">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {isHindi ? 'क्लिनिक पता' : 'Clinic Location'}
                    </span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {isHindi ? doctor.hospitalHi : doctor.hospital}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {isHindi ? 'अशोक राजपथ, पटना (पीएमसीएच के पास)' : 'Ashok Rajpath, Patna (Near PMCH)'}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {isHindi ? 'सीधा संपर्क / सहायता' : 'Direct OPD Helpline'}
                    </span>
                    <a
                      href="tel:+916203770070"
                      className="font-bold text-[#003a70] hover:text-[#ea580c] transition-colors mt-0.5 inline-flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>+91 6203 770 070</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* 24/7 Emergency & Critical Surgical Care Callout */}
              <div className="bg-gradient-to-br from-[#00284d] to-[#003a70] text-white rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-200 text-[10.5px] font-bold uppercase tracking-wider mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span>{isHindi ? '24/7 आपातकालीन सेवा' : '24/7 Surgical Emergency'}</span>
                </div>

                <h4 className="text-base font-bold text-white tracking-tight mb-2">
                  {isHindi ? 'तत्काल सर्जिकल सहायता चाहिए?' : 'Need Urgent Surgical Care?'}
                </h4>
                
                <p className="text-xs text-white/80 leading-relaxed mb-4">
                  {isHindi
                    ? 'हमारी आपातकालीन एवं गहन चिकित्सा इकाई 24 घंटे सक्रिय है।'
                    : 'Our critical care and emergency surgical team is available round the clock.'}
                </p>

                <a
                  href="tel:+916203770070"
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#003a70] font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  <span>{isHindi ? 'आपातकालीन कॉल: +91 6203 770 070' : 'Emergency: +91 6203 770 070'}</span>
                </a>
              </div>

              {/* Hospital Amenities & Cashless Insurance */}
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/90 text-xs text-slate-700 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {isHindi ? 'सुविधाएं एवं बीमा' : 'Key Patient Facilities'}
                </h4>
                <div className="space-y-2 text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'सभी प्रमुख टीपीए / कैशलेस बीमा स्वीकृत' : 'All Major TPA & Cashless Insurance'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'अत्याधुनिक मॉड्यूलर ऑपरेशन थिएटर' : 'Modern Modular Operation Theatres'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{isHindi ? 'इन-हाउस डायग्नोस्टिक्स एवं पैथोलॉजी' : 'In-House Diagnostics & Ultrasound'}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* OTHER SPECIALISTS DIRECTORY (Browse Other Doctors)       */}
      {/* ======================================================== */}
      <section className="relative w-full bg-slate-100/70 py-12 sm:py-16 border-t border-slate-200/90">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] block mb-1">
                {isHindi ? 'अन्य विशेषज्ञ' : 'Medical Faculty'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {isHindi ? 'एजाज क्लिनिक के अन्य वरिष्ठ डॉक्टर्स' : 'Consult Other Specialists at Ejaz Clinic'}
              </h3>
            </div>
            
            <button
              type="button"
              onClick={handleBackToDoctors}
              className="text-xs sm:text-sm font-bold text-[#003a70] hover:text-[#ea580c] transition-colors cursor-pointer"
            >
              {isHindi ? 'सभी डॉक्टर्स देखें →' : 'View Full Doctors Directory →'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {otherDoctors.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleNavigateToDoctor(doc.id)}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-3.5 group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#ea580c] transition-colors truncate">
                    {isHindi ? doc.nameHi : doc.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {isHindi ? doc.specialtyHi : doc.specialty}
                  </p>
                  <span className="text-[10.5px] font-semibold text-[#003a70] block mt-1">
                    {isHindi ? 'प्रोफाइल देखें →' : 'View Profile →'}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
