import { useTranslation } from 'react-i18next'

// Icons for GI Surgery Procedures
function StomachResectionIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10.5 2.5v2.2c0 1.5-1.5 3-2.5 4.5C6 11.5 6 15 8 18c2 3 6 3.5 8.5 2 2.5-1.5 3.5-4.5 3-8-.5-3.5-3-5.5-5-6V2.5" />
      <path d="M12 7v10" strokeDasharray="2 2" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LiverBiliaryIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 8c0-3 3-5 8-5s8 2 8 5c0 5-4 11-8 13C8 19 4 13 4 8z" />
      <circle cx="10" cy="14" r="2.5" fill="currentColor" stroke="none" />
      <path d="M10 11.5v-3" strokeWidth="1.8" />
    </svg>
  )
}

function PancreasWhippleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 10c0-2 2-3 4-3h10c1.5 0 2 1.5 1 3-2 3-5 5-8 5H7c-1.5 0-2-1-2-2z" />
      <path d="M8 7v8" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ColorectalBowelIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 3v13c0 2.5 2 4.5 4.5 4.5h3c2.5 0 4.5-2 4.5-4.5V3" />
      <path d="M6 8h12" />
      <path d="M6 13h12" />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function BariatricSleeveIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 3v4c0 2-2 3-2 6 0 3 3 6 5 6s5-3 5-6c0-3-2-4-2-6V3" />
      <path d="M12 3v16" strokeDasharray="2 2" strokeWidth="2" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  )
}

function EndoscopyCamIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </svg>
  )
}

export default function GastrointestinalTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'esophageal-gastric',
      icon: StomachResectionIcon,
      titleEn: 'Esophageal & Gastric Resection',
      titleHi: 'अन्नप्रणाली एवं आमाशय सर्जरी',
      descEn: 'Laparoscopic and open gastrectomy, anti-reflux surgery, and pyloroplasty for gastric ulcers, perforations, and severe GERD.',
      descHi: 'गैस्ट्रिक अल्सर, एसिड रिफ्लक्स और आमाशय विकारों के लिए सुरक्षित लेप्रोस्कोपिक एवं ओपन गैस्ट्रेक्टॉमी व एंटी-रिफ्लक्स प्रक्रियाएं।'
    },
    {
      id: 'hepatobiliary-liver',
      icon: LiverBiliaryIcon,
      titleEn: 'Hepatobiliary & Bile Duct Reconstruction',
      titleHi: 'लिवर एवं पित्त नली पुनर्निर्माण',
      descEn: 'Hepaticojejunostomy for bile duct strictures, surgical drainage of hepatic cysts, and targeted anatomical liver segmentectomy.',
      descHi: 'पित्त नली के संकुचन के लिए हेपेटिकोजेजुनोस्टॉमी, लिवर सिस्ट की सर्जरी और सटीक एनाटोमिकल लिवर सेगमेंटेक्टॉमी।'
    },
    {
      id: 'pancreatic-whipple',
      icon: PancreasWhippleIcon,
      titleEn: 'Pancreatic Care & Whipple Procedures',
      titleHi: 'अग्नाशय एवं व्हिपल प्रक्रियाएं',
      descEn: 'Complex pancreatic head resection (Whipple), distal pancreatectomy, and surgical necrosectomy for severe acute pancreatitis.',
      descHi: 'अग्नाशय के जटिल रोगों के लिए उन्नत व्हिपल सर्जरी, डिस्टल पैंक्रिएटेक्टॉमी और गंभीर पैंक्रियाटाइटिस के लिए नेक्रोसेक्टॉमी।'
    },
    {
      id: 'colorectal-bowel',
      icon: ColorectalBowelIcon,
      titleEn: 'Colorectal & Intestinal Resection',
      titleHi: 'कोलोरेक्टल एवं आंतों की सर्जरी',
      descEn: 'Minimally invasive hemicolectomy, low anterior resection (LAR), and surgery for intestinal obstruction and inflammatory bowel disease.',
      descHi: 'आंतों की रुकावट, अल्सरेटिव कोलाइटिस और कोलन विकारों के लिए मिनिमली इनवेसिव हेमीकोलेक्टॉमी और आंतों का सुरक्षित जुड़ाव।'
    },
    {
      id: 'bariatric-metabolic',
      icon: BariatricSleeveIcon,
      titleEn: 'Bariatric & Metabolic Weight Loss Surgery',
      titleHi: 'बेरिएट्रिक एवं मेटाबॉलिक वजन घटाने की सर्जरी',
      descEn: 'Laparoscopic sleeve gastrectomy and gastric bypass for clinically severe obesity, type-2 diabetes reversal, and metabolic health.',
      descHi: 'अत्यधिक मोटापे और टाइप-2 डायबिटीज से मुक्ति के लिए लैप्रोस्कोपिक स्लीव गैस्ट्रेक्टॉमी एवं गैस्ट्रिक बाईपास सर्जरी।'
    },
    {
      id: 'endoscopy-gi',
      icon: EndoscopyCamIcon,
      titleEn: 'Diagnostic & Therapeutic GI Endoscopy',
      titleHi: 'डायग्नोस्टिक एवं थेराप्यूटिक एंडोस्कोपी',
      descEn: 'High-definition upper GI endoscopy, colonoscopy, polypectomy, and band ligation for internal bleeding and diagnostic biopsy.',
      descHi: 'उच्च-रिज़ॉल्यूशन एंडोस्कोपी, कोलोनोस्कोपी, पॉलीपेक्टॉमी और आंतरिक रक्तस्राव को रोकने के लिए सटीक एंडोस्कोपिक बैंडिंग।'
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
              <span className="text-[#ea580c]">गैस्ट्रोइंटेस्टाइनल सर्जरी</span> के प्रकार
            </>
          ) : (
            <>
              Types of <span className="text-[#ea580c]">Gastrointestinal Surgery</span>
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'सर्जिकल गैस्ट्रोएंटरोलॉजी में पाचन तंत्र के विभिन्न अंगों के लिए विशेष सर्जिकल प्रक्रियाएं शामिल हैं:'
            : 'Surgical gastroenterology encompasses specialized surgical interventions tailored for specific segments of the digestive tract:'}
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
