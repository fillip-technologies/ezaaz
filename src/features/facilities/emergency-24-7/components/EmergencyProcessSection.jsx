import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import processBgImg from '../../../../assets/process-bg.jpg'

// Custom Phone with ringing waves matching the reference screenshot
function PhoneRingingIcon({ className = 'w-7 h-7 text-[#0f3e6d]' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path
        d="M8.7 5.2a1.8 1.8 0 00-1.8 1.2c-1.6 3.7-.8 8.6 2.5 12.2 3.5 3.5 8.4 4.3 12.2 2.6.8-.4 1.3-1.2 1.3-2v-2.8a1.8 1.8 0 00-1.3-1.7l-3.2-1a1.8 1.8 0 00-1.8.5l-1.3 1.3c-2.4-.9-4.3-2.8-5.2-5.2l1.3-1.3a1.8 1.8 0 00.5-1.8l-1-3.2A1.8 1.8 0 008.7 5.2z"
        fill="currentColor"
      />
      <path
        d="M21 7c2 1.2 3.5 3.2 4 5.5M21 3c3.5 1.5 6.3 4.5 7.5 8.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Custom Ambulance vehicle matching the reference screenshot
function AmbulanceDispatchIcon({ className = 'w-7 h-7 text-[#0f3e6d]' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path
        d="M5 9a2 2 0 00-2 2v9a2 2 0 002 2h1.5a3.5 3.5 0 007 0h5a3.5 3.5 0 007 0H29a1 1 0 001-1v-6.5a2 2 0 00-.6-1.4l-4.5-4.5A2 2 0 0023.5 9H5z"
        fill="currentColor"
      />
      {/* Wheels cutouts in white/light background */}
      <circle cx="10" cy="22" r="3.2" fill="#eef5fc" />
      <circle cx="10" cy="22" r="1.8" fill="currentColor" />
      <circle cx="24" cy="22" r="3.2" fill="#eef5fc" />
      <circle cx="24" cy="22" r="1.8" fill="currentColor" />
      {/* Front Window */}
      <path d="M21 11h2.5l3.5 3.5v1.5H21v-5z" fill="#eef5fc" opacity="0.95" />
      {/* Emergency Cross */}
      <path
        d="M10 12.5h3m-1.5-1.5v3"
        stroke="#eef5fc"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Siren on roof */}
      <path d="M12 7.5h2v1.5h-2z" fill="#ea580c" />
    </svg>
  )
}

// Custom Doctor Specialist icon matching the reference screenshot
function DoctorAssessmentIcon({ className = 'w-7 h-7 text-[#0f3e6d]' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="16" cy="10" r="5" fill="currentColor" />
      <path
        d="M7 25c0-4.4 4-8 9-8s9 3.6 9 8v1H7v-1z"
        fill="currentColor"
      />
      {/* Stethoscope around neck */}
      <path
        d="M12.5 17v3a3.5 3.5 0 007 0v-3"
        stroke="#eef5fc"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="22.5" r="1" fill="#ea580c" />
    </svg>
  )
}

// Custom Hospital Bed / Advanced Treatment icon matching the reference screenshot
function HospitalBedIcon({ className = 'w-7 h-7 text-[#0f3e6d]' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      {/* Bed frame and headboard */}
      <path
        d="M4 11a1 1 0 011-1h1a1 1 0 011 1v9h18v-5a1 1 0 011-1h1a1 1 0 011 1v10h-2v-2H6v2H4V11z"
        fill="currentColor"
      />
      {/* Mattress / Patient lying down */}
      <rect x="7" y="16" width="18" height="4" rx="1.5" fill="currentColor" opacity="0.8" />
      {/* Pillow */}
      <rect x="8" y="13.5" width="4" height="2.5" rx="1" fill="currentColor" />
      {/* Monitor beside bed */}
      <rect x="18" y="8" width="6" height="5" rx="1" fill="currentColor" />
      <path d="M21 13v3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19.5 10.5h3" stroke="#eef5fc" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export default function EmergencyProcessSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  const steps = [
    {
      num: '01',
      titleEn: 'Call for Help',
      titleHi: 'कॉल एवं सहायता',
      descEn: 'Emergency assistance available 24/7',
      descHi: '24/7 आपातकालीन सहायता तुरंत उपलब्ध',
      icon: PhoneRingingIcon
    },
    {
      num: '02',
      titleEn: 'Rapid Dispatch',
      titleHi: 'त्वरित एम्बुलेंस प्रस्थान',
      descEn: 'Ambulance and emergency team activated',
      descHi: 'एम्बुलेंस और आपातकालीन टीम तत्काल सक्रिय',
      icon: AmbulanceDispatchIcon
    },
    {
      num: '03',
      titleEn: 'Immediate Assessment',
      titleHi: 'तात्कालिक चिकित्सीय जांच',
      descEn: 'Patient evaluated by emergency specialists',
      descHi: 'इमरजेंसी विशेषज्ञ डॉक्टरों द्वारा त्वरित मूल्यांकन',
      icon: DoctorAssessmentIcon
    },
    {
      num: '04',
      titleEn: 'Advanced Treatment',
      titleHi: 'उन्नत उपचार एवं सर्जरी',
      descEn: 'Critical care, surgery or specialist intervention',
      descHi: 'क्रिटिकल केयर, आपातकालीन सर्जरी व विशेषज्ञ देखभाल',
      icon: HospitalBedIcon
    }
  ]

  return (
    <section className="relative w-full bg-gradient-to-b from-[#f8fafd] via-white to-[#f4f7fc] py-14 sm:py-18 lg:py-20 border-b border-slate-200/80 overflow-hidden">
      {/* Faded Medical Doctor Hands Background Watermark on top right matching reference screenshot */}
      <div className="absolute top-0 right-0 w-[380px] sm:w-[480px] lg:w-[580px] h-full pointer-events-none opacity-20 sm:opacity-25 mix-blend-multiply overflow-hidden select-none">
        <img
          src={processBgImg}
          alt=""
          className="w-full h-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#f8fafd]/60 to-[#f8fafd]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f7fc] via-transparent to-transparent" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 z-10">
        
        {/* Section Header: Subtitle + Title + Description */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#ea580c] block mb-2 sm:mb-2.5">
            {isHindi ? 'हमारी कार्यप्रणाली' : 'OUR PROCESS'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {isHindi ? 'आपातकालीन कॉल से विशेषज्ञ उपचार तक' : 'From Emergency Call to Expert Care'}
          </h2>
          <p className="text-xs sm:text-sm md:text-[15px] text-slate-500 mt-2.5 sm:mt-3 leading-relaxed">
            {isHindi
              ? 'एक सुव्यवस्थित प्रक्रिया जिससे आपको सही समय पर सही चिकित्सा प्राप्त हो।'
              : 'A streamlined process to ensure you receive the right care at the right time.'}
          </p>
        </div>

        {/* 4 Process Steps Layout matching reference screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-3 xl:gap-6 items-center">
          {steps.map((step, idx) => {
            const IconComp = step.icon
            const isLast = idx === steps.length - 1

            return (
              <div key={idx} className="relative flex items-center justify-between">
                
                {/* Step Item Content: Circle Icon on Left + Text Details on Right */}
                <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                  
                  {/* Circular Icon Bubble */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#eef5fc] border border-[#d8e8f8] shadow-[0_4px_16px_rgba(15,62,109,0.06)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <IconComp className="w-7 h-7 sm:w-8 sm:h-8 text-[#0f3e6d]" />
                  </div>

                  {/* Text details: 01 + Title + Description */}
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-[#ea580c] tracking-wide leading-none mb-1">
                      {step.num}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                      {isHindi ? step.titleHi : step.titleEn}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-0.5">
                      {isHindi ? step.descHi : step.descEn}
                    </p>
                  </div>
                </div>

                {/* Right Arrow / Chevron between steps (hidden on last step & responsive) */}
                {!isLast && (
                  <div className="hidden lg:flex items-center justify-center text-slate-300 ml-2 mr-1 xl:mx-2 shrink-0">
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
