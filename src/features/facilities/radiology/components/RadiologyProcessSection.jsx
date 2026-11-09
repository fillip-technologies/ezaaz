import { useTranslation } from 'react-i18next'

// 1. Calendar / Appointment Icon matching reference
function CalendarBookingIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="7" width="22" height="20" rx="3" />
      <line x1="16" y1="3" x2="16" y2="7" />
      <line x1="9" y1="3" x2="9" y2="7" />
      <line x1="23" y1="3" x2="23" y2="7" />
      <line x1="5" y1="13" x2="27" y2="13" />
      <path d="M10 18h3v4h-3z" fill="currentColor" opacity="0.3" stroke="none" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

// 2. Preparation Instructions Document Icon matching reference
function PreparationDocIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 5a2 2 0 012-2h9l7 7v17a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
      <polyline points="19 3 19 10 26 10" />
      <line x1="13" y1="16" x2="19" y2="16" />
      <line x1="13" y1="21" x2="21" y2="21" />
      <circle cx="14" cy="11" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

// 3. Scanner Bed / Patient Imaging Icon matching reference
function ScannerPatientIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Scanner circular gantry on right */}
      <ellipse cx="23" cy="14" rx="4" ry="7" />
      {/* Patient examination table */}
      <path d="M4 19h16v-2H4a1 1 0 00-1 1v1z" />
      <line x1="6" y1="19" x2="6" y2="25" />
      <line x1="18" y1="19" x2="18" y2="25" />
      {/* Patient contour on bed */}
      <path d="M8 15a2 2 0 100-4 2 2 0 000 4z" />
      <path d="M12 17c0-2 2-3 4-3h3" />
    </svg>
  )
}

// 4. Report Document Icon matching reference
function DiagnosticReportIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4a2 2 0 012-2h10l7 7v19a2 2 0 01-2 2H9a2 2 0 01-2-2V4z" />
      <polyline points="19 2 19 9 26 9" />
      <line x1="12" y1="14" x2="20" y2="14" />
      <line x1="12" y1="19" x2="17" y2="19" />
      <line x1="12" y1="24" x2="20" y2="24" />
    </svg>
  )
}

export default function RadiologyProcessSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  const steps = [
    {
      num: '01',
      titleEn: 'Book an Appointment',
      titleHi: 'अपॉइंटमेंट बुक करें',
      descEn: 'Schedule your scan at your convenience.',
      descHi: 'अपनी सुविधानुसार अपना स्कैन समय निर्धारित करें।',
      icon: CalendarBookingIcon,
      isPrimary: true
    },
    {
      num: '02',
      titleEn: 'Get Preparation Instructions',
      titleHi: 'तैयारी के निर्देश प्राप्त करें',
      descEn: 'Receive simple guidelines before your scan.',
      descHi: 'अपने स्कैन से पहले आवश्यक सरल दिशानिर्देश प्राप्त करें।',
      icon: PreparationDocIcon,
      isPrimary: false
    },
    {
      num: '03',
      titleEn: 'Complete Your Scan',
      titleHi: 'अपना स्कैन पूर्ण करें',
      descEn: 'Quick, safe and comfortable imaging process.',
      descHi: 'त्वरित, सुरक्षित और आरामदायक इमेजिंग प्रक्रिया।',
      icon: ScannerPatientIcon,
      isPrimary: false
    },
    {
      num: '04',
      titleEn: 'Receive Your Report',
      titleHi: 'अपनी रिपोर्ट प्राप्त करें',
      descEn: 'Get accurate and timely reports from our experts.',
      descHi: 'हमारे वरिष्ठ विशेषज्ञों से सटीक और समय पर रिपोर्ट प्राप्त करें।',
      icon: DiagnosticReportIcon,
      isPrimary: false
    }
  ]

  return (
    <section className="relative w-full bg-white py-14 sm:py-18 lg:py-20 border-b border-slate-200/80 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Top Header: Eyebrow + Title on left & description on right matching reference */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-[13px] font-bold tracking-wider text-[#ea580c] uppercase block mb-2">
              {isHindi ? 'आपकी स्कैन प्रक्रिया' : 'YOUR SCAN JOURNEY'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-tight">
              {isHindi ? 'एक सरल एवं सुगम प्रक्रिया' : 'A Simple & Hassle-Free Process'}
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm md:text-[14.5px] leading-relaxed max-w-xl">
            {isHindi
              ? 'हम बुकिंग से लेकर आपकी रिपोर्ट प्राप्त करने तक आपके इमेजिंग अनुभव को सहज और आरामदायक बनाते हैं।'
              : 'We make your imaging experience smooth and comfortable from booking to receiving your report.'}
          </p>
        </div>

        {/* 4-Step Process Grid with Connecting Dashed Line */}
        <div className="relative">
          
          {/* Connecting Dashed Line between icons (desktop only) */}
          <div
            className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-sky-300/80 pointer-events-none z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-slate-200/80">
            {steps.map((step, idx) => {
              const IconComp = step.icon

              return (
                <div
                  key={idx}
                  className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 group"
                >
                  {/* Icon Circle Container */}
                  <div className="relative mb-4 flex items-center justify-center">
                    {/* White halo behind the icon so the dashed line doesn't cut through */}
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white flex items-center justify-center p-1">
                      {step.isPrimary ? (
                        /* Step 1: Active Orange Glow Circle matching screenshot */
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#ea580c] to-[#f97316] text-white shadow-lg shadow-orange-500/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <IconComp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                      ) : (
                        /* Steps 2-4: Clean White Circle with Blue/Navy Border matching screenshot */
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-[#003a70] text-[#003a70] shadow-xs flex items-center justify-center group-hover:border-[#ea580c] group-hover:text-[#ea580c] group-hover:scale-105 transition-all duration-300">
                          <IconComp className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step Number in bold orange */}
                  <span className="text-base sm:text-lg font-extrabold text-[#ea580c] tracking-tight leading-none mb-1.5">
                    {step.num}
                  </span>

                  {/* Step Title in bold dark text */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug mb-1.5 group-hover:text-[#ea580c] transition-colors">
                    {isHindi ? step.titleHi : step.titleEn}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-[220px]">
                    {isHindi ? step.descHi : step.descEn}
                  </p>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
