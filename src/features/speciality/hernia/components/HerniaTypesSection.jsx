import { useTranslation } from 'react-i18next'

// Icons for Hernia Types
function InguinalIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21.5s7-3.5 7-9V5.5l-7-3-7 3v7c0 5.5 7 9 7 9z" />
      <path d="M8.5 9h7" strokeWidth="1.8" />
      <path d="M8.5 13h7" strokeWidth="1.8" />
      <path d="M10 7.5v7" strokeWidth="1.8" />
      <path d="M14 7.5v7" strokeWidth="1.8" />
    </svg>
  )
}

function UmbilicalIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IncisionalIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 3v18" strokeDasharray="3 3" />
      <path d="M18 3v18" strokeDasharray="3 3" />
      <path d="M3 12h18" strokeWidth="2.2" />
      <path d="M9 8l6 8" />
      <path d="M15 8l-6 8" />
    </svg>
  )
}

function HiatalIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v6" />
      <path d="M4 8h16" />
      <path d="M8 8c0 4 1 8 4 11 3-3 4-7 4-11" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FemoralIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 3v10c0 4 2 8 5 8s5-4 5-8V3" />
      <path d="M10 14h4" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  )
}

function AbdominalReconIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M3 9h18" strokeWidth="1.5" />
      <path d="M3 15h18" strokeWidth="1.5" />
      <path d="M9 3v18" strokeWidth="1.5" />
      <path d="M15 3v18" strokeWidth="1.5" />
    </svg>
  )
}

export default function HerniaTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'inguinal-hernia',
      icon: InguinalIcon,
      titleEn: 'Inguinal (Groin) Hernia Repair',
      titleHi: 'इनगुइनल (ग्रोइन) हर्निया रिपेयर',
      descEn: 'Minimally invasive TEP/TAPP laparoscopic repair with anatomical 3D mesh placement, providing rapid pain relief and immediate mobilization.',
      descHi: 'एनाटोमिकल 3D मेश और लैप्रोस्कोपिक TEP/TAPP तकनीक द्वारा ग्रोइन हर्निया का सुरक्षित उपचार, जिससे तुरंत दर्द में आराम मिलता है।'
    },
    {
      id: 'umbilical-hernia',
      icon: UmbilicalIcon,
      titleEn: 'Umbilical & Paraumbilical Hernia',
      titleHi: 'नाभि (अम्बिलिकल) हर्निया रिपेयर',
      descEn: 'Keyhole repair of belly-button wall weakness using sublay/intraperitoneal onlay mesh (IPOM) with natural cosmetic navel preservation.',
      descHi: 'नाभि के चारों ओर की कमजोरी का कीहोल सर्जरी व सुरक्षित मेश द्वारा स्थायी उपचार, जिससे नाभि का प्राकृतिक आकार बना रहता है।'
    },
    {
      id: 'incisional-ventral',
      icon: IncisionalIcon,
      titleEn: 'Incisional & Ventral Hernia',
      titleHi: 'इंसिजनल एवं वेंट्रल हर्निया',
      descEn: 'Laparoscopic and open reconstruction of abdominal defects resulting from past surgical incisions, reinforced with wide-coverage mesh.',
      descHi: 'पुराने सर्जिकल चीरों के निशान पर बनने वाले हर्निया का उन्नत लैप्रोस्कोपिक पुनर्निर्माण और मजबूत मेश फिक्सेशन।'
    },
    {
      id: 'hiatal-gerd',
      icon: HiatalIcon,
      titleEn: 'Hiatal Hernia & Acid Reflux Surgery',
      titleHi: 'हायटल हर्निया एवं एसिड रिफ्लक्स सर्जरी',
      descEn: 'Laparoscopic Nissen fundoplication and diaphragmatic crura repair to cure severe GERD, acid reflux, and stomach displacement.',
      descHi: 'गंभीर एसिड रिफ्लक्स और डायफ्राम की कमजोरी के लिए लैप्रोस्कोपिक निसन फंडोप्लीकेशन व सटीक हायटल रिपेयर।'
    },
    {
      id: 'femoral-pelvic',
      icon: FemoralIcon,
      titleEn: 'Femoral & Rare Pelvic Hernias',
      titleHi: 'फेमोरल एवं पेल्विक हर्निया',
      descEn: 'Precision groin canal repair targeting lower femoral defects with urgent intervention to prevent acute strangulation.',
      descHi: 'जांघ के ऊपरी हिस्से और पेल्विक क्षेत्र के हर्निया का सटीक इलाज, ताकि आंतों में रुकावट और जटिलताओं से तुरंत बचा जा सके।'
    },
    {
      id: 'abdominal-recon',
      icon: AbdominalReconIcon,
      titleEn: 'Complex Abdominal Wall Reconstruction',
      titleHi: 'जटिल पेट की दीवार का पुनर्निर्माण',
      descEn: 'Advanced component separation techniques (TAR / Ramirez) for massive, multi-recurrent, or loss-of-domain abdominal wall defects.',
      descHi: 'अत्यधिक बड़े, बार-बार होने वाले या जटिल हर्निया के लिए उन्नत कंपोनेंट सेपरेशन तकनीक और संपूर्ण पुनर्निर्माण।'
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
              <span className="text-[#ea580c]">हर्निया सर्जरी</span> के प्रकार
            </>
          ) : (
            <>
              Types of <span className="text-[#ea580c]">Hernia Surgery</span>
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'हर्निया शरीर के विभिन्न हिस्सों में हो सकता है। हमारी विशेषज्ञ टीम प्रत्येक स्थिति के लिए व्यक्तिगत सर्जिकल योजना तैयार करती है:'
            : 'Hernias can occur across various anatomical regions of the abdominal wall. Our surgical division delivers specialized interventions for every type:'}
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
