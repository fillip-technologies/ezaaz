import { useTranslation } from 'react-i18next'

// Icons for Plastic & Reconstructive Procedures
function RhinoplastyFacialIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a6 6 0 0 0-6 6v2a6 6 0 0 0 12 0V9a6 6 0 0 0-6-6z" />
      <path d="M10 11l2 3 2-3" />
      <path d="M9 17c1.5 1 4.5 1 6 0" />
      <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LiposuctionBodyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 4c3 3 3 7 0 16" />
      <path d="M18 4c-3 3-3 7 0 16" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
      <circle cx="12" cy="12" r="3" strokeDasharray="1.5 1.5" />
    </svg>
  )
}

function BreastGynecomastiaIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14c2-4 5-6 8-3 3-3 6-1 8 3" />
      <circle cx="8.5" cy="14.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M7 6l5 3 5-3" />
    </svg>
  )
}

function ReconstructiveFlapIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <path d="M17 11V7a2 2 0 0 0-2-2h-4" strokeDasharray="2 2" />
    </svg>
  )
}

function BurnScarRevisionIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2c-3 4-6 7.5-6 12a6 6 0 0 0 12 0c0-4.5-3-8-6-12z" />
      <path d="M9.5 14.5l5-5" strokeWidth="1.8" />
      <path d="M14.5 14.5l-5-5" strokeWidth="1.8" />
    </svg>
  )
}

function HandMicrovascularIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function PlasticSurgeryTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'rhinoplasty-facial',
      icon: RhinoplastyFacialIcon,
      titleEn: 'Rhinoplasty & Facial Aesthetics',
      titleHi: 'राइनोप्लास्टी एवं चेहरे की सर्जरी',
      descEn: 'Cosmetic reshaping of the nose, blepharoplasty (eyelid surgery), facelift, and chin augmentation achieving harmonious, natural facial contours.',
      descHi: 'नाक का आकार सुधारना, पलकों की सर्जरी, फेसलिफ्ट और चिन ऑग्मेंटेशन द्वारा चेहरे की प्राकृतिक सुंदरता को निखारना।'
    },
    {
      id: 'liposuction-body',
      icon: LiposuctionBodyIcon,
      titleEn: 'Liposuction & Body Contouring',
      titleHi: 'लाइपोसुक्शन एवं बॉडी शेपिंग',
      descEn: 'Safe targeted fat reduction via ultrasonic and tumescent liposuction, tummy tuck (abdominoplasty), and post-weight-loss skin tightening.',
      descHi: 'अल्ट्रासोनिक और ट्यूमसेंट तकनीक से जिद्दी चर्बी हटाना, टमी टक और वजन घटने के बाद ढीली त्वचा को सुडौल बनाना।'
    },
    {
      id: 'breast-gynecomastia',
      icon: BreastGynecomastiaIcon,
      titleEn: 'Breast Aesthetics & Gynecomastia',
      titleHi: 'स्तन सौंदर्य एवं पुरुष ब्रेस्ट सर्जरी',
      descEn: 'Breast augmentation, reduction, and lift for women, alongside minimally invasive scar-free correction of male gynecomastia.',
      descHi: 'महिलाओं के लिए ब्रेस्ट संवर्धन, रिडक्शन व लिफ्ट तथा पुरुषों में बढ़े हुए स्तन (गाइनेकोमास्टिया) का सूक्ष्म सर्जिकल उपचार।'
    },
    {
      id: 'reconstructive-flap',
      icon: ReconstructiveFlapIcon,
      titleEn: 'Reconstructive & Flap Surgery',
      titleHi: 'पुनर्निर्माण एवं फ्लैप सर्जरी',
      descEn: 'Restoration of tissue defects following cancer excision, accident trauma, or infection using pedicled and advanced microvascular free flaps.',
      descHi: 'कैंसर ट्यूमर हटाने या सड़क दुर्घटना के बाद क्षतिग्रस्त ऊतकों और अंगों को फ्लैप तकनीक से पुनर्निर्मित करना।'
    },
    {
      id: 'burn-scar-revision',
      icon: BurnScarRevisionIcon,
      titleEn: 'Burn Scar Revision & Contractures',
      titleHi: 'बर्न स्कार एवं संकुचन मुक्ति उपचार',
      descEn: 'Release of joint-limiting burn contractures, skin grafting, and advanced fractional resurfacing to eliminate unsightly, painful scars.',
      descHi: 'जलने के बाद जकड़े जोड़ों की गतिशीलता बहाल करना, स्किन ग्राफ्टिंग और गहरे निशानों को हल्का करने के उन्नत उपाय।'
    },
    {
      id: 'hand-microvascular',
      icon: HandMicrovascularIcon,
      titleEn: 'Hand & Microvascular Surgery',
      titleHi: 'हाथ एवं सूक्ष्म संवहनी सर्जरी',
      descEn: 'Emergency repair of severed fingers, cut tendons, injured peripheral nerves, and management of congenital hand anomalies.',
      descHi: 'कटे हुए हाथ, उंगलियों, कटी नसों व टेंडन का सूक्ष्म माइक्रोस्कोपिक ऑपरेशन और जन्मजात हाथ की विकृतियों का सुधार।'
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
              <span className="text-[#ea580c]">प्लास्टिक एवं रिकंस्ट्रक्टिव</span> प्रक्रियाएं
            </>
          ) : (
            <>
              Specialized <span className="text-[#ea580c]">Plastic & Reconstructive</span> Procedures
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'एजाज क्लिनिक में प्लास्टिक सर्जरी विभाग व्यक्तिगत सौंदर्य संवर्धन और जटिल पुनर्निर्माण के लिए आधुनिक सर्जिकल प्रक्रियाएं प्रदान करता है:'
            : 'At Ejaz Clinic, our plastic and reconstructive surgery unit provides specialized procedures for personalized cosmetic care and functional restoration:'}
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
