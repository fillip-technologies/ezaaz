import { useTranslation } from 'react-i18next'

export default function IcuProcessSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  const steps = [
    {
      num: '01',
      titleEn: 'Admission & Assessment',
      titleHi: 'तत्काल भर्ती एवं मूल्यांकन',
      descEn: 'Quick evaluation by our critical care team.',
      descHi: 'हमारी क्रिटिकल केयर टीम द्वारा त्वरित और गहन नैदानिक मूल्यांकन।'
    },
    {
      num: '02',
      titleEn: 'Continuous Monitoring',
      titleHi: 'निरंतर मॉनिटरिंग एवं निगरानी',
      descEn: '24/7 observation and treatment.',
      descHi: 'चौबीसों घंटे (24/7) वाइटल्स और हेमोडायनामिक्स की निरंतर निगरानी।'
    },
    {
      num: '03',
      titleEn: 'Specialized Care',
      titleHi: 'व्यक्तिगत विशिष्ट उपचार',
      descEn: 'Personalized treatment based on condition.',
      descHi: 'मरीज की नैदानिक स्थिति के अनुसार वरिष्ठ विशेषज्ञों द्वारा कस्टमाइज्ड उपचार।'
    },
    {
      num: '04',
      titleEn: 'Recovery & Follow-up',
      titleHi: 'रिकवरी एवं निरंतर फॉलो-अप',
      descEn: 'Ongoing support and guidance.',
      descHi: 'आईसीयू से वार्ड स्टेप-डाउन और डिस्चार्ज के बाद निरंतर मार्गदर्शन।'
    }
  ]

  return (
    <section className="relative w-full bg-white py-14 sm:py-18 lg:py-20 border-b border-slate-200/80 font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Top Header: Eyebrow + Title on left & description on right matching reference */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-[13px] font-bold tracking-wider text-[#ea580c] uppercase block mb-2">
              {isHindi ? 'मरीज देखभाल प्रक्रिया' : 'PATIENT CARE JOURNEY'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-tight">
              {isHindi ? 'एक सरल एवं संवेदनशील प्रक्रिया' : 'A Simple & Supportive Process'}
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm md:text-[14.5px] leading-relaxed max-w-xl lg:text-right">
            {isHindi
              ? 'भर्ती से लेकर पूर्ण रिकवरी तक पारदर्शी, समर्पित और संवेदनशील क्रिटिकल केयर प्रक्रिया।'
              : 'Compassionate, transparent, and structured critical care from admission to full recovery.'}
          </p>
        </div>

        {/* 4-Step Process Grid with Connecting Dashed Line */}
        <div className="relative">
          
          {/* Connecting Dashed Line between circles (desktop only) */}
          <div
            className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-orange-300/80 pointer-events-none z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-slate-200/80">
            {steps.map((step, idx) => {
              return (
                <div
                  key={idx}
                  className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 group"
                >
                  {/* Outer Circle Container with White Halo */}
                  <div className="relative mb-3 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white flex items-center justify-center p-1">
                      {/* Prominent Orange Gradient Pill Badge matching screenshot */}
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#ea580c] to-[#f97316] text-white font-black text-base sm:text-lg flex items-center justify-center shadow-md shadow-orange-500/25 ring-4 ring-orange-100/90 group-hover:scale-105 group-hover:ring-orange-200 transition-all duration-300">
                        {step.num}
                      </div>
                    </div>
                  </div>

                  {/* Step Number in small bold orange matching reference */}
                  <span className="text-xs sm:text-sm font-bold text-[#ea580c] tracking-tight leading-none mb-1.5">
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
