import { useTranslation } from 'react-i18next'

// Icons for Urology Modalities
function KidneyStoneRirsIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2C8 2 5 6 5 11c0 6 4 11 9 11 3 0 5-2 5-5 0-3-2-5-4-8-1-2-1-4-1-7z" />
      <polygon points="12,7 13.5,10.5 17,11.5 14,14 15,18 12,16 9,18 10,14 7,11.5 10.5,10.5" fill="currentColor" stroke="none" opacity="0.9" />
    </svg>
  )
}

function ProstateTurpIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="6" r="4" />
      <path d="M12 10v12" />
      <path d="M8 14c-2.5 0-4 2-4 4.5S6 22 8.5 22c1.5 0 2.5-.5 3.5-2" />
      <path d="M16 14c2.5 0 4 2 4 4.5S18 22 15.5 22c-1.5 0-2.5-.5-3.5-2" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function UrslIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 3v18" />
      <path d="M17 3v18" />
      <path d="M7 10h10" strokeDasharray="2 2" />
      <path d="M12 7l-2 5h4l-2 5" strokeWidth="2.2" />
    </svg>
  )
}

function LaparoscopicUroIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function UroOncologyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21.5s7-3.5 7-9V5.5l-7-3-7 3v7c0 5.5 7 9 7 9z" />
      <circle cx="12" cy="11" r="3" fill="currentColor" stroke="none" />
    </svg>
  )
}

function AndrologyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="10" cy="14" r="5" />
      <line x1="14" y1="10" x2="20" y2="4" strokeWidth="2.2" />
      <polyline points="15,4 20,4 20,9" strokeWidth="2.2" />
    </svg>
  )
}

export default function UrologyTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'kidney-stone-rirs-pcnl',
      icon: KidneyStoneRirsIcon,
      titleEn: 'Kidney Stone Laser Removal (RIRS & PCNL)',
      titleHi: 'किडनी स्टोन लेजर उपचार (RIRS एवं PCNL)',
      descEn: 'Painless Holmium laser dusting using flexible digital scopes (RIRS) and keyhole Mini-PCNL for large, complex renal stones without open incisions.',
      descHi: 'फ्लेक्सिबल डिजिटल दूरबीन (RIRS) और मिनी-PCNL द्वारा बिना चीरे के बड़े और जटिल गुर्दे की पथरी को बारीक धूल बनाकर निकालना।'
    },
    {
      id: 'prostate-bph-turp',
      icon: ProstateTurpIcon,
      titleEn: 'Prostate BPH Laser Surgery & Bipolar TURP',
      titleHi: 'प्रोस्टेट वृद्धि एवं लेजर TURP सर्जरी',
      descEn: 'State-of-the-art bipolar TURP and laser enucleation for benign prostatic hyperplasia (BPH), resolving urinary retention with minimal catheter time.',
      descHi: 'बढ़े हुए प्रोस्टेट का आधुनिक लेजर और बाइपोलर दूरबीन विधि से उपचार, जिससे पेशाब में रुकावट दूर होती है और जल्दी रिकवरी होती है।'
    },
    {
      id: 'ursl-ureteroscopy',
      icon: UrslIcon,
      titleEn: 'Ureteroscopy & Laser Lithotripsy (URSL)',
      titleHi: 'यूरेट्रोस्कोपी एवं मूत्र नली स्टोन (URSL)',
      descEn: 'Endoscopic fragmentation of stones trapped in the ureter using rigid and semi-rigid ureteroscopes with instant relief from severe flank colic.',
      descHi: 'मूत्र नली (यूरेटर) में फंसी पथरी को दूरबीन द्वारा लेजर से तोड़कर बाहर निकालना और गंभीर दर्द से तत्काल राहत प्रदान करना।'
    },
    {
      id: 'laparoscopic-reconstructive',
      icon: LaparoscopicUroIcon,
      titleEn: 'Laparoscopic & Reconstructive Urology',
      titleHi: 'लैप्रोस्कोपिक एवं रिकंस्ट्रक्टिव यूरोलॉजी',
      descEn: 'Laparoscopic pyeloplasty for PUJ obstruction, repair of ureteric strictures, urethroplasty, and correction of congenital urinary tract blockages.',
      descHi: 'गुर्दे की नली के अवरोध (PUJ) के लिए लैप्रोस्कोपिक पायलोप्लास्टी, मूत्रमार्ग संकुचन (स्ट्रिक्चर) सुधार और रिकंस्ट्रक्टिव सर्जरी।'
    },
    {
      id: 'uro-oncology',
      icon: UroOncologyIcon,
      titleEn: 'Urological Cancer & Uro-Oncology Care',
      titleHi: 'किडनी, ब्लैडर एवं प्रोस्टेट कैंसर उपचार',
      descEn: 'Radical nephrectomy, bladder tumor resection (TURBT), radical prostatectomy, and testis cancer management following multidisciplinary protocols.',
      descHi: 'गुर्दे, मूत्राशय और प्रोस्टेट ट्यूमर के लिए सटीक सर्जिकल रिसेक्शन, दूरबीन द्वारा TURBT और जीवन-रक्षक कैंसर देखभाल।'
    },
    {
      id: 'andrology-mens-health',
      icon: AndrologyIcon,
      titleEn: 'Andrology, Infertility & Men’s Health',
      titleHi: 'एंड्रोलॉजी एवं पुरुष प्रजनन स्वास्थ्य',
      descEn: 'Microscopic varicocelectomy, evaluation and treatment of male infertility, erectile dysfunction, and penile/scrotal disorders with confidentiality.',
      descHi: 'माइक्रोस्कोपिक वैरिकोसील सर्जरी, पुरुष बांझपन का निदान, इरेक्टाइल डिस्फंक्शन और अंडकोष विकारों का संपूर्ण गोपनीय उपचार।'
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
              <span className="text-[#ea580c]">यूरोलॉजी एवं किडनी केयर</span> सेवाएं
            </>
          ) : (
            <>
              Specialized <span className="text-[#ea580c]">Urology & Kidney Care</span> Procedures
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'एजाज क्लिनिक में यूरोलॉजी विभाग गुर्दे की पथरी, प्रोस्टेट, और मूत्र प्रणाली के सभी विकारों के लिए न्यूनतम चीरे वाले आधुनिक उपचार प्रदान करता है:'
            : 'At Ejaz Clinic, our urology unit provides minimally invasive procedures and laser interventions tailored to patient condition and stone anatomy:'}
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
