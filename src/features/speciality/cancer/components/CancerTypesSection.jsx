import { useTranslation } from 'react-i18next'

// Icons for Cancer Procedures
function StomachCancerIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10.5 2.5v2.2c0 1.5-1.5 3-2.5 4.5C6 11.5 6 15 8 18c2 3 6 3.5 8.5 2 2.5-1.5 3.5-4.5 3-8-.5-3.5-3-5.5-5-6V2.5" />
      <circle cx="11.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function BreastRibbonIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2c-2.5 0-4.5 2-4.5 4.5 0 2.5 1.5 5 4.5 9.5 3-4.5 4.5-7 4.5-9.5C16.5 4 14.5 2 12 2z" />
      <path d="M7.5 16L4 22" />
      <path d="M16.5 16L20 22" />
      <circle cx="12" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LiverPancreasIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 8c0-3 3-5 8-5s8 2 8 5c0 5-4 11-8 13C8 19 4 13 4 8z" />
      <path d="M9 11h6" strokeDasharray="2 2" />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function HeadNeckIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
      <path d="M6 14v1a6 6 0 0 0 12 0v-1" />
      <path d="M10 22h4" />
      <circle cx="12" cy="10" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ThoracicIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v18" />
      <path d="M12 7c-3-2-7-1-8 3-1 4 2 9 8 10" />
      <path d="M12 7c3-2 7-1 8 3 1 4-2 9-8 10" />
      <circle cx="7" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PelvicOncoIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21.5s7-3.5 7-9V5.5l-7-3-7 3v7c0 5.5 7 9 7 9z" />
      <circle cx="12" cy="11" r="2.5" />
      <path d="M12 8.5v5" />
    </svg>
  )
}

export default function CancerTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'gi-colorectal',
      icon: StomachCancerIcon,
      titleEn: 'Gastrointestinal & Colorectal Cancer',
      titleHi: 'गैस्ट्रोइंटेस्टाइनल एवं कोलोरेक्टल कैंसर',
      descEn: 'Laparoscopic and open surgical resection for stomach, colon, and rectal tumors with radical lymph node dissection and digestive tract continuity.',
      descHi: 'पेट, कोलन और मलाशय के ट्यूमर के लिए लैप्रोस्कोपिक एवं ओपन सर्जिकल रीसेक्शन तथा रेडिकल लिम्फ नोड विच्छेदन।'
    },
    {
      id: 'breast-endocrine',
      icon: BreastRibbonIcon,
      titleEn: 'Breast & Endocrine Cancer Surgery',
      titleHi: 'स्तन एवं अंतःस्रावी कैंसर सर्जरी',
      descEn: 'Breast conservation surgery, modified radical mastectomy, sentinel lymph node biopsy, and oncoplastic reconstruction for optimal outcomes.',
      descHi: 'स्तन संरक्षण सर्जरी, ऑन्कोप्लास्टिक पुनर्निर्माण और सेंटिनल लिम्फ नोड बायोप्सी द्वारा सुरक्षित ट्यूमर निष्कासन।'
    },
    {
      id: 'hepato-pancreatic',
      icon: LiverPancreasIcon,
      titleEn: 'Hepatobiliary & Pancreatic Cancer',
      titleHi: 'लिवर, पित्त व अग्नाशय कैंसर',
      descEn: 'Complex liver resection (hepatectomy), gallbladder malignancy clearance, and pancreaticoduodenectomy (Whipple procedure).',
      descHi: 'लिवर रीसेक्शन, पित्ताशय की दुर्दमता और अग्नाशय के कैंसर के लिए जटिल व्हिपल प्रक्रिया व उन्नत सर्जिकल उपचार।'
    },
    {
      id: 'head-neck',
      icon: HeadNeckIcon,
      titleEn: 'Head & Neck Oncologic Surgery',
      titleHi: 'सिर एवं गर्दन की कैंसर सर्जरी',
      descEn: 'Precision tumor extirpation with neck dissection and microvascular cosmetic flap reconstruction for oral and thyroid malignancies.',
      descHi: 'मुंह, गले और थायरॉयड ट्यूमर के लिए सटीक सर्जरी, गर्दन विच्छेदन और कॉस्मेटिक फ्लैप पुनर्निर्माण।'
    },
    {
      id: 'thoracic-esophageal',
      icon: ThoracicIcon,
      titleEn: 'Thoracic & Esophageal Cancer Surgery',
      titleHi: 'छाती एवं अन्नप्रणाली का कैंसर',
      descEn: 'Minimally invasive video-assisted thoracic surgery (VATS) and transhiatal/transthoracic esophagectomy for lung and food pipe tumors.',
      descHi: 'फेफड़ों और भोजन नली के ट्यूमर के लिए वीडियो-असिस्टेड थोरैसिक सर्जरी (VATS) और सटीक ट्रांसहियाटल इसोफेजेक्टॉमी।'
    },
    {
      id: 'urologic-pelvic',
      icon: PelvicOncoIcon,
      titleEn: 'Urologic & Gynaecologic Oncology',
      titleHi: 'मूत्रमार्ग एवं स्त्री रोग ऑन्कोलॉजी',
      descEn: 'Radical nephrectomy, cystectomy, radical hysterectomy, and pelvic exenteration for kidney, bladder, and uterine malignancies.',
      descHi: 'किडनी, मूत्राशय, गर्भाशय और अंडाशय के कैंसर के लिए रेडिकल नेफ्रेक्टॉमी, सिस्टेक्टॉमी और उन्नत पेल्विक सर्जरी।'
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
              <span className="text-[#ea580c]">कैंसर सर्जरी</span> के प्रकार
            </>
          ) : (
            <>
              Types of <span className="text-[#ea580c]">Cancer Surgery</span>
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'सर्जिकल ऑन्कोलॉजी में विभिन्न प्रकार के कैंसर के लिए विशेष सर्जिकल प्रक्रियाएं शामिल हैं। सबसे आम प्रकारों में शामिल हैं:'
            : 'Surgical oncology encompasses specialized surgical procedures designed to address diverse malignancies with maximal curative intent:'}
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
