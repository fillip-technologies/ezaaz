import { useTranslation } from 'react-i18next'

// Icons for General Surgery Procedures
function AppendixSurgeryIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 3v7c0 3 2.5 5.5 5.5 5.8h2.5" />
      <path d="M15.5 3v6.5c0 1.2-.8 2.2-2 2.5" />
      <path d="M11.5 16c0 2.2-1.5 3.8-3.2 3.8s-2.8-1.2-2.3-2.8c.4-1.3 1.6-2.2 3-2.2" />
      <circle cx="8" cy="17.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

function GallbladderCareIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.5v3" />
      <path d="M9 4l3 2 3-2" />
      <path d="M12 6.5c-2.4 0-4.3 2-4.3 4.8 0 3.2 2 6.2 4.3 7.2 2.3-1 4.3-4 4.3-7.2 0-2.8-1.9-4.8-4.3-4.8z" />
      <circle cx="12" cy="11.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LaserProctoIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" strokeDasharray="2 2" strokeWidth="2" />
      <path d="M8 12h8" strokeWidth="2" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ThyroidSurgeryIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v18" strokeWidth="1.5" />
      <path d="M6 7c2-2 5-1 6 2 1-3 4-4 6-2 3 3 3 8 0 11-2 2-5 1-6-1-1 2-4 3-6 1-3-3-3-8 0-11z" />
      <circle cx="8.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ScrotalCareIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v5" />
      <path d="M7 8h10c0 6-3 13-5 13s-5-7-5-13z" />
      <circle cx="10" cy="14" r="2" />
      <circle cx="14" cy="14" r="2" />
    </svg>
  )
}

function SoftTissueIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 50L40 24l4 4-26 26H14v-4z" />
      <path d="M40 24l5-5a2 2 0 0 1 2.8 0l2.2 2.2a2 2 0 0 1 0 2.8l-5 5" strokeWidth="2" />
      <circle cx="10" cy="10" r="4" strokeDasharray="2 2" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function GeneralSurgeryTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'appendectomy',
      icon: AppendixSurgeryIcon,
      titleEn: 'Appendectomy & Acute Abdomen',
      titleHi: 'अपेंडिक्स एवं एक्यूट एब्डोमेन सर्जरी',
      descEn: 'Urgent keyhole laparoscopic and open appendectomy for acute appendicitis, preventing rupture and peritonitis with rapid pain resolution.',
      descHi: 'तीव्र अपेंडिसाइटिस के लिए आपातकालीन कीहोल और ओपन सर्जरी, जिससे अपेंडिक्स फटने और संक्रमण के खतरे को तुरंत टाला जाता है।'
    },
    {
      id: 'cholecystectomy',
      icon: GallbladderCareIcon,
      titleEn: 'Cholecystectomy & Gallbladder Care',
      titleHi: 'पित्ताशय एवं पित्त पथरी सर्जरी',
      descEn: 'Laparoscopic removal of the gallbladder for symptomatic stones, cholecystitis, and biliary colic with sub-centimeter cosmetic incisions.',
      descHi: 'पित्त की थैली में पथरी और सूजन के लिए सुरक्षित लैप्रोस्कोपिक निष्कासन, जिससे मरीज 24-48 घंटे में स्वस्थ होकर घर लौटते हैं।'
    },
    {
      id: 'laser-proctology',
      icon: LaserProctoIcon,
      titleEn: 'Laser Proctology (Piles, Fissure & Fistula)',
      titleHi: 'लेजर प्रोक्टोलॉजी (बवासीर, फिशर व भगंदर)',
      descEn: 'Advanced sutureless laser ablation (LHP, FiLaC) providing painless, bloodless daycare recovery without cutting sphincter muscles.',
      descHi: 'बिना चीरे और बिना टांकों के अत्याधुनिक लेजर तकनीक द्वारा बवासीर, फिशर और भगंदर का दर्द-मुक्त व स्थायी डेकेयर उपचार।'
    },
    {
      id: 'thyroid-endocrine',
      icon: ThyroidSurgeryIcon,
      titleEn: 'Thyroid & Salivary Gland Surgery',
      titleHi: 'थायरॉयड एवं लार ग्रंथि सर्जरी',
      descEn: 'Hemi- and total thyroidectomy for goiters, nodules, and parotid/submandibular gland excisions with recurrent laryngeal nerve preservation.',
      descHi: 'थायरॉयड गांठों, घेंघा और लार ग्रंथियों के लिए नसों और आवाज की सुरक्षा के साथ सटीक व कॉस्मेटिक सर्जिकल निष्कासन।'
    },
    {
      id: 'hydrocele-varicocele',
      icon: ScrotalCareIcon,
      titleEn: 'Hydrocele, Varicocele & Scrotal Surgery',
      titleHi: 'हाइड्रोसील एवं वेरिकोसील सर्जरी',
      descEn: 'Microsurgical and open hydrocelectomy, varicocelectomy, and orchidopexy for scrotal swellings, pain relief, and fertility protection.',
      descHi: 'अंडकोष की सूजन, पानी भरने (हाइड्रोसील) और नसों के फैलाव (वेरिकोसील) के लिए सूक्ष्म एवं सुरक्षित सर्जिकल प्रक्रियाएं।'
    },
    {
      id: 'breast-soft-tissue',
      icon: SoftTissueIcon,
      titleEn: 'Breast Lumps, Cysts & Soft-Tissue Excision',
      titleHi: 'स्तन गांठ, सिस्ट एवं कोमल ऊतक सर्जरी',
      descEn: 'Excision of benign fibroadenomas, lipomas, sebaceous cysts, abscess drainage, and diabetic foot wound debridement.',
      descHi: 'स्तन की गांठों, चर्बी की गांठों (लाइपोमा), सिस्ट निष्कासन और डायबिटिक फुट घावों की संपूर्ण सर्जिकल सफाई व उपचार।'
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
              <span className="text-[#ea580c]">सामान्य सर्जरी</span> के प्रकार
            </>
          ) : (
            <>
              Types of <span className="text-[#ea580c]">General Surgery</span>
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'सामान्य सर्जरी विभाग विभिन्न प्रकार की चिकित्सीय व आकस्मिक स्थितियों के लिए व्यापक सर्जिकल समाधान प्रदान करता है:'
            : 'Our general surgery division delivers comprehensive operative solutions for routine elective and acute abdominal conditions:'}
        </p>

        {/* Procedures 3-Column Cards Grid matching the UI reference */}
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
