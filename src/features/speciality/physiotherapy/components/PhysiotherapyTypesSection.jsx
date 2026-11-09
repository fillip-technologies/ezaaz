import { useTranslation } from 'react-i18next'

// Icons for Physiotherapy Procedures
function OrthoRehabIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 2v6c0 1.5-1 2.5-1 4 0 2 2 3 3 3s3-1 3-3c0-1.5-1-2.5-1-4V2" />
      <path d="M11 15v7" />
      <path d="M13 15v7" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <path d="M7 12h10" strokeDasharray="2 2" />
    </svg>
  )
}

function NeuroStrokeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a6 6 0 0 0-6 6c0 3 2 5.5 5 5.9V18h2v-4.1c3-.4 5-2.9 5-5.9a6 6 0 0 0-6-6z" />
      <circle cx="12" cy="8" r="2" fill="currentColor" stroke="none" />
      <path d="M8 22h8" />
      <path d="M12 18v4" />
    </svg>
  )
}

function SportsInjuryIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="5" r="3" />
      <path d="M6 21l3-7 4 3 5-9" />
      <path d="M9 14l-3-2 4-4 4 2" />
      <circle cx="18" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SpineCareIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v20" />
      <rect x="8" y="4" width="8" height="2.5" rx="1" />
      <rect x="7" y="8.5" width="10" height="2.5" rx="1" />
      <rect x="6.5" y="13" width="11" height="2.5" rx="1" />
      <rect x="8" y="17.5" width="8" height="2.5" rx="1" />
      <circle cx="12" cy="9.75" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14.25" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function GeriatricBalanceIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="4" r="2.5" />
      <path d="M12 6.5v8" />
      <path d="M9 11l3-1 3 1" />
      <path d="M10 21.5l2-7 2 7" />
      <path d="M16 11v10.5" strokeDasharray="2 2" />
    </svg>
  )
}

function ElectrotherapyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      <circle cx="12" cy="12" r="8" strokeDasharray="3 3" opacity="0.4" />
    </svg>
  )
}

export default function PhysiotherapyTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'ortho-rehab',
      icon: OrthoRehabIcon,
      titleEn: 'Orthopaedic & Joint Replacement Rehab',
      titleHi: 'जॉइंट रिप्लेसमेंट एवं ऑर्थोपेडिक रिहैब',
      descEn: 'Early gait training, assisted walking, passive/active joint range-of-motion exercises following knee and hip replacement surgery.',
      descHi: 'घुटने और कूल्हे के प्रत्यारोपण के बाद प्रारंभिक चाल प्रशिक्षण, सहायक वॉकिंग और जोड़ों की पूर्ण लचीलेपन बहाली।'
    },
    {
      id: 'neuro-stroke',
      icon: NeuroStrokeIcon,
      titleEn: 'Neurological & Stroke Rehabilitation',
      titleHi: 'न्यूरोलॉजिकल, स्ट्रोक एवं लकवा पुनर्वास',
      descEn: 'Neuro-facilitation techniques, muscle tone modulation, fine motor recovery, and balance re-education for stroke and paralysis patients.',
      descHi: 'स्ट्रोक, लकवा और मस्तिष्क आघात के बाद मांसपेशियों के नियंत्रण, संतुलन और स्वतंत्र दैनिक गतिविधियों की बहाली।'
    },
    {
      id: 'sports-injury',
      icon: SportsInjuryIcon,
      titleEn: 'Sports Injury & Ligament Recovery',
      titleHi: 'स्पोर्ट्स इंजरी एवं लिगामेंट रिकवरी',
      descEn: 'Proprioception re-training, eccentric strengthening, and targeted recovery for ACL, PCL, ankle sprains, and runner’s knee.',
      descHi: 'खिलाड़ियों के लिए लिगामेंट मोच, मांसपेशियों के खिंचाव और टेंडन की चोटों के बाद सुरक्षित व त्वरित मैदान वापसी प्रशिक्षण।'
    },
    {
      id: 'spine-therapy',
      icon: SpineCareIcon,
      titleEn: 'Spine Therapy (Sciatica & Slipped Disc)',
      titleHi: 'स्पाइन थेरेपी (साइटिका व स्लिप डिस्क)',
      descEn: 'McKenzie mechanical diagnosis, lumbar/cervical motorized traction, and core stabilization for chronic back and neck pain relief.',
      descHi: 'पुराने पीठ, गर्दन के दर्द और साइटिका के लिए आधुनिक ट्रैक्शन थेरेपी, कोर स्ट्रेंथनिंग और मैकेंजी तकनीक द्वारा उपचार।'
    },
    {
      id: 'geriatric-care',
      icon: GeriatricBalanceIcon,
      titleEn: 'Geriatric & Fall Prevention Physiotherapy',
      titleHi: 'बुजुर्गों के लिए संतुलन एवं गतिशीलता थेरेपी',
      descEn: 'Balance conditioning, posture correction, bone density preservation, and gait assistance to prevent slips and falls in senior citizens.',
      descHi: 'वरिष्ठ नागरिकों के लिए संतुलन सुधार, ऑस्टियोपोरोसिस प्रबंधन और गिरने से बचाव के लिए विशेष सुरक्षित व्यायाम प्रोटोकॉल।'
    },
    {
      id: 'electrotherapy-pain',
      icon: ElectrotherapyIcon,
      titleEn: 'Advanced Electrotherapy & Pain Relief',
      titleHi: 'इलेक्ट्रोथेरेपी एवं मैनुअल दर्द निवारण',
      descEn: 'Non-invasive therapeutic ultrasound, Interferential Therapy (IFT), TENS, and deep tissue myofascial release for chronic pain.',
      descHi: 'अल्ट्रासाउंड, IFT, TENS और मायोफेशियल रिलीज द्वारा जोड़ों और मांसपेशियों के पुराने दर्द से बिना दवा के त्वरित राहत।'
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
              <span className="text-[#ea580c]">फिजियोथेरेपी एवं पुनर्वास</span> के प्रकार
            </>
          ) : (
            <>
              Specialized <span className="text-[#ea580c]">Physiotherapy Services</span>
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'फिजियोथेरेपी केंद्र विभिन्न प्रकार की मस्कुलोस्केलेटल, न्यूरोलॉजिकल और पोस्ट-ऑपरेटिव स्थितियों के लिए व्यक्तिगत उपचार योजनाएं प्रदान करता है:'
            : 'Our physiotherapy center provides tailored clinical programs for musculoskeletal, neurological, and post-surgical recovery:'}
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
