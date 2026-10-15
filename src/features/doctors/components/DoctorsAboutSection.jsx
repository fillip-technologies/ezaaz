import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import EnquiryForm from '../../speciality/common/EnquiryForm'

import doctor1 from '../../../assets/home/doctor-image.jpg'
import doctor2 from '../../../assets/home/doctor-2.jpg'
import doctor3 from '../../../assets/home/doctor-3.jpg'
import doctor4 from '../../../assets/home/doctor-4.jpg'
import doctor5 from '../../../assets/home/doctor-5.jpg'
import doctor6 from '../../../assets/home/doctor-6.jpg'

const doctorImageMap = {
  'dr-shahzad': doctor1,
  'dr-ejaz-ali': doctor4,
  'dr-ortho-specialist': doctor5,
  'dr-internal-med': doctor1,
  'dr-onco-surgeon': doctor4,
  'dr-gynaecologist': doctor3,
  'dr-urologist': doctor5,
  'dr-plastic-surgeon': doctor2,
  'dr-anaesthesiologist': doctor3,
}

// Reusable Doctor Card matching Homepage layout & design
function DoctorCard({ doctor, photoSrc, isHindi, getDoctorGender, formatExp, scrollToEnquiry, navigateToProfile }) {
  return (
    <div className="doctor-card group bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between text-left">
      <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
        
        {/* Left Column: Doctor Photo + View Profile link */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-lg sm:rounded-xl overflow-hidden bg-slate-50 border border-slate-200/70 shadow-xs">
            <img
              src={photoSrc}
              alt={doctor.name}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <button
            type="button"
            onClick={() => navigateToProfile(doctor.id)}
            className="mt-2.5 text-[#003a70] hover:text-[#ea580c] text-[11.5px] sm:text-xs font-semibold underline underline-offset-3 transition-colors cursor-pointer text-center"
          >
            {isHindi ? 'प्रोफाइल देखें' : 'View Profile'}
          </button>
        </div>

        {/* Right Column: Name, Specialty, Divider, Specs, Book Appointment */}
        <div className="flex-1 flex flex-col justify-between min-w-0 h-full">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#003a70] tracking-tight leading-snug truncate">
              {doctor.name}
            </h3>

            <p className="text-[11.5px] sm:text-xs text-slate-700 font-medium mt-0.5 truncate">
              {doctor.specialty}
            </p>

            <div className="w-full h-px bg-slate-200/80 my-2" />

            <div className="space-y-0.5 sm:space-y-1 text-[11.5px] sm:text-xs leading-snug">
              <p className="text-slate-700 font-medium truncate">
                {doctor.department || doctor.subSpecialty}
              </p>
              <p className="text-slate-600 truncate">
                <strong className="font-bold text-slate-800">{isHindi ? 'अनुभव: ' : 'Experience: '}</strong>
                <span className="text-slate-700 font-normal">{formatExp(doctor.experience)}</span>
              </p>
              <p className="text-slate-600 truncate">
                <strong className="font-bold text-slate-800">{isHindi ? 'लिंग: ' : 'Gender: '}</strong>
                <span className="text-slate-700 font-normal">{getDoctorGender(doctor)}</span>
              </p>
            </div>
          </div>

          <div className="mt-3.5 pt-1 flex justify-end">
            <button
              type="button"
              onClick={() => {
                const url = `/appointment-booking?doctorId=${doctor.id}`
                if (window.history?.pushState) {
                  window.history.pushState(null, '', url)
                  window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
                  window.dispatchEvent(new CustomEvent('app-route-change', { detail: url }))
                } else {
                  window.location.href = url
                }
                window.scrollTo({ top: 0, behavior: 'instant' })
              }}
              className="inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md bg-[#d9532f] hover:bg-[#c44322] text-white font-bold text-[11.5px] sm:text-xs tracking-wide shadow-sm hover:shadow-md hover:shadow-[#d9532f]/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{isHindi ? 'अपॉइंटमेंट लें' : 'Book an Appointment'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function DoctorsAboutSection() {
  const { i18n } = useTranslation('home')
  const isHindi = i18n.language === 'hi'

  // Load all doctors from i18n data
  const rawDoctors = useTranslation('home').t('doctorsSection.doctors', { returnObjects: true }) || []
  const allDoctors = useMemo(() => {
    return Array.isArray(rawDoctors) ? rawDoctors : []
  }, [rawDoctors])

  // First 2 rows (4 doctors: 2 rows x 2 cols) alongside the non-sticky Enquiry Form
  const topDoctors = useMemo(() => allDoctors.slice(0, 4), [allDoctors])
  // Remaining doctors (5 doctors) shown in a full-width 3-column grid
  const remainingDoctors = useMemo(() => allDoctors.slice(4), [allDoctors])

  // Gender helper matching homepage
  const getDoctorGender = (doc) => {
    if (doc.gender) return doc.gender
    if (
      doc.id === 'dr-gynaecologist' ||
      doc.id === 'dr-plastic-surgeon' ||
      doc.id === 'dr-anaesthesiologist'
    ) {
      return isHindi ? 'महिला' : 'Female'
    }
    return isHindi ? 'पुरुष' : 'Male'
  }

  // Experience text formatter matching homepage
  const formatExp = (exp) => {
    if (!exp) return ''
    if (isHindi) return exp.replace('Yrs', 'वर्ष').replace('Years', 'वर्ष')
    return exp.replace('Yrs', 'Years')
  }

  const scrollToEnquiry = (e) => {
    if (e) e.preventDefault()
    const el = document.getElementById('enquiry-form')
    if (el) {
      const navOffset = 90
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

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

  return (
    <section className="relative w-full bg-[#f8f9fc] py-10 sm:py-14 lg:py-16 border-b border-slate-200/80">
      {/* Background Subtle Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#003a70 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* ROW 1 & 2: 4 Doctor cards (2x2) on Left, Non-Sticky Enquiry Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT: 2 rows of 2 cards (first 4 doctors) */}
          <div className="order-1 lg:order-1 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {topDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  photoSrc={doctorImageMap[doctor.id] || doctor1}
                  isHindi={isHindi}
                  getDoctorGender={getDoctorGender}
                  formatExp={formatExp}
                  scrollToEnquiry={scrollToEnquiry}
                  navigateToProfile={navigateToProfile}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Enquiry Form (NOT sticky, perfectly sits beside row 1 & 2) */}
          <div id="enquiry-form" className="order-2 lg:order-2 lg:col-span-4 w-full">
            <EnquiryForm specialtyName={isHindi ? 'डॉक्टर अपॉइंटमेंट' : 'Doctor Appointment'} />
          </div>

        </div>

        {/* FROM ROW 3 ONWARD: Remaining doctors in full-width 3-column responsive grid */}
        {remainingDoctors.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {remainingDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  photoSrc={doctorImageMap[doctor.id] || doctor1}
                  isHindi={isHindi}
                  getDoctorGender={getDoctorGender}
                  formatExp={formatExp}
                  scrollToEnquiry={scrollToEnquiry}
                  navigateToProfile={navigateToProfile}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
