import { useTranslation } from 'react-i18next'

// Icons for Orthopaedic Procedures
function KneeJointIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 2v6c0 1.5-1 2.5-1 4 0 2 2 3 3 3s3-1 3-3c0-1.5-1-2.5-1-4V2" />
      <path d="M11 15v7" />
      <path d="M13 15v7" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ArthroscopyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v4" />
      <path d="M12 16v4" />
      <path d="M4 12h4" />
      <path d="M16 12h4" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function FractureTraumaIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 4l14 16" />
      <path d="M12 2l-2 5 4 4-2 5" strokeWidth="2.2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
    </svg>
  )
}

function SpineIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v20" />
      <rect x="8" y="4" width="8" height="2.5" rx="1" />
      <rect x="7" y="8.5" width="10" height="2.5" rx="1" />
      <rect x="6.5" y="13" width="11" height="2.5" rx="1" />
      <rect x="8" y="17.5" width="8" height="2.5" rx="1" />
    </svg>
  )
}

function LigamentIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 3c0 6 12 12 12 18" strokeWidth="2.2" />
      <path d="M18 3c0 6-12 12-12 18" strokeWidth="2.2" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function DeformityCorrectionIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a4 4 0 0 0-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 0 0-4-4z" />
      <path d="M8 17l4 4 4-4" />
      <path d="M12 14v7" />
    </svg>
  )
}

export default function OrthopedicsTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'joint-replacement',
      icon: KneeJointIcon,
      titleEn: 'Total Knee & Hip Joint Replacement',
      titleHi: 'टोटल नी एवं हिप जॉइंट रिप्लेसमेंट',
      descEn: 'Computer-guided precision arthroplasty using biocompatible ceramic and high-durability alloy implants for lifelong pain relief and natural mobility.',
      descHi: 'कंप्यूटर-असिस्टेड आर्थ्रोप्लास्टी और उच्च-गुणवत्ता वाले बायो-कम्पैटिबल इम्प्लांट्स द्वारा घुटने और कूल्हे का सफल दर्द-मुक्त प्रत्यारोपण।'
    },
    {
      id: 'arthroscopy-sports',
      icon: ArthroscopyIcon,
      titleEn: 'Knee & Shoulder Arthroscopy',
      titleHi: 'नी एवं शोल्डर आर्थ्रोस्कोपी',
      descEn: 'Minimally invasive keyhole procedures for torn cartilage, meniscus repair, shoulder dislocation, and rotator cuff tendon reattachment.',
      descHi: 'मेनिस्कस रिपेयर, कंधे के बार-बार उतरने और रोटेटर कफ टेंडन के लिए सूक्ष्म कीहोल आर्थ्रोस्कोपिक सर्जरी।'
    },
    {
      id: 'trauma-fracture',
      icon: FractureTraumaIcon,
      titleEn: 'Complex Trauma & Fracture Fixation',
      titleHi: 'जटिल फ्रैक्चर एवं ट्रॉमा फिक्सेशन',
      descEn: 'Emergency polytrauma management with advanced titanium locked plating, intramedullary nailing, and external fixation systems.',
      descHi: 'सड़क दुर्घटनाओं और गंभीर चोटों के लिए उन्नत टाइटेनियम प्लेटिंग, नेलिंग और त्वरित आपातकालीन फ्रैक्चर स्थिरीकरण।'
    },
    {
      id: 'spine-surgery',
      icon: SpineIcon,
      titleEn: 'Spine Surgery & Disc Decompression',
      titleHi: 'स्पाइन सर्जरी एवं डिस्क डीकंप्रेशन',
      descEn: 'Microscopic discectomy, spinal decompression, and pedicle screw fusion for sciatica, slipped discs, and severe back canal stenosis.',
      descHi: 'स्लिप डिस्क, साइटिका और रीढ़ की हड्डी के संकुचन के लिए सूक्ष्म डिस्केक्टॉमी, डीकंप्रेशन और स्पाइनल फ्यूजन सर्जरी।'
    },
    {
      id: 'ligament-reconstruction',
      icon: LigamentIcon,
      titleEn: 'Sports Ligament Reconstruction (ACL/PCL)',
      titleHi: 'स्पोर्ट्स लिगामेंट पुनर्निर्माण (ACL/PCL)',
      descEn: 'Arthroscopic anatomical graft reconstruction for anterior and posterior cruciate ligaments, ensuring safe and prompt athletic comeback.',
      descHi: 'खिलाड़ियों और सक्रिय वयस्कों के लिए आर्थ्रोस्कोपिक एनाटोमिकल ग्राफ्ट पुनर्निर्माण, जिससे सुरक्षित खेल वापसी संभव होती है।'
    },
    {
      id: 'deformity-correction',
      icon: DeformityCorrectionIcon,
      titleEn: 'Hand, Foot & Deformity Correction',
      titleHi: 'हाथ, पैर एवं विकृति सुधार सर्जरी',
      descEn: 'Precision corrective osteotomies for bowlegs, knock-knees, clubfoot, carpal tunnel decompression, and diabetic foot reconstruction.',
      descHi: 'मुड़े हुए घुटनों, क्लबफुट, कार्पल टनल और हड्डियों की जन्मजात या चोट के बाद की विकृतियों के लिए सटीक सुधारात्मक ऑस्टियोटॉमी।'
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
              <span className="text-[#ea580c]">ऑर्थोपेडिक सर्जरी</span> के प्रकार
            </>
          ) : (
            <>
              Types of <span className="text-[#ea580c]">Orthopaedic Surgeries</span>
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'ऑर्थोपेडिक्स केंद्र हड्डियों, जोड़ों और मांसपेशियों की विभिन्न समस्याओं के लिए आधुनिक सर्जिकल प्रक्रियाएं प्रदान करता है:'
            : 'Our orthopaedic surgery center delivers evidence-based clinical solutions for comprehensive bone and joint conditions:'}
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
