import { useTranslation } from 'react-i18next'

// Icons for General Internal Medicine Modalities
function DiabetesMetabolicIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M12 11v5" />
      <path d="M9.5 13.5h5" />
    </svg>
  )
}

function HypertensionCardiacIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12h3l2-4 3 8 2-6 2 2h3" />
      <circle cx="17.5" cy="12" r="4.5" />
      <path d="M17.5 9.5v2.5l1.5 1.5" />
    </svg>
  )
}

function InfectiousFeverIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
      <circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 8v5" />
    </svg>
  )
}

function RespiratoryCareIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v13" />
      <path d="M12 8a5 5 0 0 0-5 5v2a4 4 0 0 0 4 4h1" />
      <path d="M12 8a5 5 0 0 1 5 5v2a4 4 0 0 1-4 4h-1" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function GeriatricComorbiditiesIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
      <path d="M19 14v7" />
      <path d="M16 17h6" />
    </svg>
  )
}

function PreventiveVaccineIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
      <path d="m9 11 4 4" />
      <path d="m5 19-3 3" />
      <path d="m14 4 6 6" />
    </svg>
  )
}

export default function GeneralInternalTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'diabetes-metabolic',
      icon: DiabetesMetabolicIcon,
      titleEn: 'Diabetes & Metabolic Health',
      titleHi: 'डायबिटीज एवं मेटाबॉलिक विकार',
      descEn: 'Comprehensive glycemic monitoring, insulin optimization, HbA1c control, and proactive screening to prevent diabetic neuropathy, nephropathy, and retinopathy.',
      descHi: 'ग्लाइसेमिक नियंत्रण, इंसुलिन अनुकूलन और मधुमेह से होने वाले गुर्दे, नसों व आंखों के नुकसान को रोकने के लिए समग्र देखभाल।'
    },
    {
      id: 'hypertension-cardiovascular',
      icon: HypertensionCardiacIcon,
      titleEn: 'Hypertension & Cardiovascular Medicine',
      titleHi: 'उच्च रक्तचाप एवं वैस्कुलर स्वास्थ्य',
      descEn: 'Precise blood pressure titration, secondary hypertension workups, dyslipidemia management, and early cardiovascular risk stratification.',
      descHi: 'उच्च रक्तचाप का सटीक संतुलन, कोलेस्ट्रॉल नियंत्रण और दिल के दौरे व स्ट्रोक के जोखिमों का प्रारंभिक मूल्यांकन एवं रोकथाम।'
    },
    {
      id: 'infectious-fevers',
      icon: InfectiousFeverIcon,
      titleEn: 'Acute Infectious Diseases & Fever Clinic',
      titleHi: 'संक्रामक रोग एवं तीव्र बुखार क्लिनिक',
      descEn: 'Rapid microbiological diagnostic workup and targeted treatment for dengue, malaria, enteric (typhoid) fever, viral syndromes, and pyrexia of unknown origin.',
      descHi: 'डेंगू, मलेरिया, टाइफाइड, वायरल संक्रमण और अज्ञात कारणों वाले बुखार का त्वरित लैब डायग्नोसिस और सुरक्षित इनपेशेंट उपचार।'
    },
    {
      id: 'respiratory-pulmonary',
      icon: RespiratoryCareIcon,
      titleEn: 'Respiratory & Pulmonary Illnesses',
      titleHi: 'श्वसन तंत्र एवं फेफड़ों की देखभाल',
      descEn: 'Diagnosis and clinical management of acute bronchitis, asthma exacerbations, COPD, community-acquired pneumonia, and chronic cough syndromes.',
      descHi: 'अस्थमा, ब्रोंकाइटिस, निमोनिया, सीओपीडी और पुरानी खांसी का प्रभावी चिकित्सकीय समाधान एवं इनहेलर थेरेपी परामर्श।'
    },
    {
      id: 'geriatric-comorbidities',
      icon: GeriatricComorbiditiesIcon,
      titleEn: 'Geriatric Care & Multi-System Illnesses',
      titleHi: 'वरिष्ठ नागरिक एवं बहु-अंग सह-रुग्णता',
      descEn: 'Tailored healthcare for senior citizens balancing multiple chronic conditions, polypharmacy rationalization, nutritional balance, and cognitive vitality.',
      descHi: 'बुजुर्गों की एक साथ कई बीमारियों का समग्र प्रबंधन, अनावश्यक दवाओं के दुष्प्रभाव से बचाव और जीवन की गुणवत्ता में सुधार।'
    },
    {
      id: 'preventive-checkups',
      icon: PreventiveVaccineIcon,
      titleEn: 'Preventive Health & Adult Immunization',
      titleHi: 'निवारक स्वास्थ्य जांच एवं वयस्क टीकाकरण',
      descEn: 'Annual comprehensive health checkups, cancer screenings, liver-kidney function profiles, and essential adult vaccines (pneumococcal, flu, hepatitis).',
      descHi: 'वार्षिक फुल बॉडी हेल्थ चेकअप, लिवर-किडनी प्रोफाइल और वयस्कों के लिए जरूरी टीके (फ्लू, न्यूमोकोकल, हेपेटाइटिस)।'
    }
  ]

  const handleCardClick = () => {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden w-full bg-[#f8f9fa] py-14 sm:py-18 lg:py-20 border-b border-slate-200/80">
      {/* Background Repeating Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#334155 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      {/* Subtle Warm & Slate Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-300/35 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight">
          {isHindi ? (
            <>
              <span className="text-[#ea580c]">जनरल इंटरनल मेडिसिन</span> सेवाएं
            </>
          ) : (
            <>
              Specialized <span className="text-[#ea580c]">Internal Medicine</span> Care
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'एजाज क्लिनिक में इंटरनल मेडिसिन विभाग वयस्कों के सभी सामान्य एवं गंभीर रोगों के लिए समग्र और साक्ष्य-आधारित उपचार सेवाएं प्रदान करता है:'
            : 'At Ejaz Clinic, our Department of Internal Medicine provides comprehensive, evidence-based clinical programs for acute and chronic adult ailments:'}
        </p>

        {/* Clinical Domains 3-Column Cards Grid matching the UI reference */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {types.map((type) => {
            const IconComp = type.icon
            return (
              <div
                key={type.id}
                onClick={handleCardClick}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight group-hover:text-[#d9532f] transition-colors duration-200">
                    {isHindi ? type.titleHi : type.titleEn}
                  </h3>
                  <p className="mt-2.5 text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {isHindi ? type.descHi : type.descEn}
                  </p>
                </div>

                {/* Bottom Right Circular Orange Icon Badge */}
                <div className="flex justify-end mt-5 pt-1">
                  <div
                    aria-label={type.titleEn}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#d9532f] group-hover:bg-[#c44322] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#d9532f]/25 group-hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
