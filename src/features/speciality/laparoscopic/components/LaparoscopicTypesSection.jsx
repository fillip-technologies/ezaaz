import { useTranslation } from 'react-i18next'

// 1. Gallbladder Icon for Laparoscopic Cholecystectomy
function GallbladderIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Bile duct neck */}
      <path d="M12 2.5v3" />
      <path d="M9 4l3 2 3-2" />
      {/* Pear-shaped gallbladder */}
      <path d="M12 6.5c-2.4 0-4.3 2-4.3 4.8 0 3.2 2 6.2 4.3 7.2 2.3-1 4.3-4 4.3-7.2 0-2.8-1.9-4.8-4.3-4.8z" />
      <circle cx="12" cy="11.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

// 2. Abdominal Wall Mesh Icon for Laparoscopic Hernia Repair
function HerniaIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Abdominal wall contour shield */}
      <path d="M12 21.5s7-3.5 7-9V5.5l-7-3-7 3v7c0 5.5 7 9 7 9z" />
      {/* Surgical hernia mesh grid lines */}
      <path d="M8.5 9h7" strokeWidth="1.8" />
      <path d="M8.5 13h7" strokeWidth="1.8" />
      <path d="M10 7.5v7" strokeWidth="1.8" />
      <path d="M14 7.5v7" strokeWidth="1.8" />
    </svg>
  )
}

// 3. Appendix Icon for Laparoscopic Appendectomy
function AppendixIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Bowel / Cecum segment */}
      <path d="M6 3v7c0 3 2.5 5.5 5.5 5.8h2.5" />
      <path d="M15.5 3v6.5c0 1.2-.8 2.2-2 2.5" />
      {/* Vermiform Appendix projection */}
      <path d="M11.5 16c0 2.2-1.5 3.8-3.2 3.8s-2.8-1.2-2.3-2.8c.4-1.3 1.6-2.2 3-2.2" />
      <circle cx="8" cy="17.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

// 4. Stomach Sleeve Icon for Laparoscopic Bariatric Surgery
function BariatricIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Esophagus to gastric curvature */}
      <path d="M10.5 2.5v2.2c0 1.5-1.5 3-2.5 4.5C6 11.5 6 15 8 18c2 3 6 3.5 8.5 2 2.5-1.5 3.5-4.5 3-8-.5-3.5-3-5.5-5-6V2.5" />
      {/* Sleeve resection vertical surgical line */}
      <path d="M12 6.5v11.5" strokeDasharray="2 2" strokeWidth="2.2" />
    </svg>
  )
}

// 5. Colon / Large Intestine Icon for Laparoscopic Colectomy
function ColectomyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Large intestine / Colon loops */}
      <path d="M4 19c0-3 1.2-5 1.2-8 0-4 3.2-6 6.8-6s6.8 2 6.8 6c0 3 1.2 5 1.2 8" />
      <path d="M8 19c0-2 .6-4 .6-6 0-2 1.5-3 3.4-3s3.4 1 3.4 3c0 2 .6 4 .6 6" />
      {/* Laparoscopic keyhole focus marker */}
      <circle cx="16" cy="13" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

// 6. Uterus / Gynecological Icon for Laparoscopic Hysterectomy
function HysterectomyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Left ovary & Fallopian tube */}
      <circle cx="3" cy="7" r="1.4" fill="currentColor" stroke="none" />
      <path d="M4.5 7c2 0 4 1 5 3" />
      {/* Right ovary & Fallopian tube */}
      <circle cx="21" cy="7" r="1.4" fill="currentColor" stroke="none" />
      <path d="M19.5 7c-2 0-4 1-5 3" />
      {/* Uterus core body */}
      <path d="M9.5 9.8c0-1.5 1-2.3 2.5-2.3s2.5.8 2.5 2.3c0 3.2-1 5.8-1 8.2h-3c0-2.4-1-5-1-8.2z" />
      <path d="M10.5 18h3v2.5h-3z" />
    </svg>
  )
}

export default function LaparoscopicTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'cholecystectomy',
      titleEn: 'Laparoscopic Cholecystectomy',
      titleHi: 'लैप्रोस्कोपिक कोलेसिस्टेक्टॉमी',
      descEn: 'This procedure involves the removal of the gallbladder and is typically performed to treat gallstones or gallbladder inflammation.',
      descHi: 'इस प्रक्रिया में पित्त की थैली (gallbladder) को निकाला जाता है और यह मुख्य रूप से पित्त की पथरी (gallstones) या पित्ताशय की सूजन के इलाज के लिए की जाती है।',
      icon: GallbladderIcon
    },
    {
      id: 'hernia',
      titleEn: 'Laparoscopic Hernia Repair',
      titleHi: 'लैप्रोस्कोपिक हर्निया रिपेयर',
      descEn: 'This technique is used to repair inguinal, umbilical, or incisional hernias through small incisions, allowing for a quicker recovery.',
      descHi: 'इस तकनीक का उपयोग छोटे चीरों के माध्यम से इनगुइनल, अम्बिलिकल या इन्सीजनल हर्निया को ठीक करने के लिए किया जाता है, जिससे रिकवरी तेजी से होती है।',
      icon: HerniaIcon
    },
    {
      id: 'appendectomy',
      titleEn: 'Laparoscopic Appendectomy',
      titleHi: 'लैप्रोस्कोपिक अपेंडिसेक्टॉमी',
      descEn: 'This is the removal of the appendix using laparoscopic techniques, often performed in cases of appendicitis.',
      descHi: 'यह लैप्रोस्कोपिक तकनीकों का उपयोग करके अपेंडिक्स को निकालने की प्रक्रिया है, जो अक्सर अपेंडिसाइटिस के मामलों में की जाती है।',
      icon: AppendixIcon
    },
    {
      id: 'bariatric',
      titleEn: 'Laparoscopic Bariatric Surgery',
      titleHi: 'लैप्रोस्कोपिक बेरिएट्रिक सर्जरी',
      descEn: 'This includes various weight-loss surgeries, such as gastric bypass and sleeve gastrectomy, aimed at helping individuals achieve significant weight loss.',
      descHi: 'इसमें गैस्ट्रिक बाईपास और स्लीव गैस्ट्रेक्टॉमी जैसी विभिन्न वजन घटाने वाली सर्जरी शामिल हैं, जिनका उद्देश्य व्यक्तियों को महत्वपूर्ण वजन कम करने में मदद करना है।',
      icon: BariatricIcon
    },
    {
      id: 'colectomy',
      titleEn: 'Laparoscopic Colectomy',
      titleHi: 'लैप्रोस्कोपिक कोलेक्टॉमी',
      descEn: 'This procedure involves the removal of part or all of the colon and is often used to treat conditions like colorectal cancer or inflammatory bowel disease.',
      descHi: 'इस प्रक्रिया में कोलन (बड़ी आंत) के एक हिस्से या पूरे हिस्से को निकाला जाता है और अक्सर कोलोरेक्टल कैंसर या सूजन आंत्र रोग (IBD) जैसी स्थितियों के इलाज के लिए की जाती है।',
      icon: ColectomyIcon
    },
    {
      id: 'hysterectomy',
      titleEn: 'Laparoscopic Hysterectomy',
      titleHi: 'लैप्रोस्कोपिक हिस्टेरेक्टॉमी',
      descEn: 'This surgery involves the removal of the uterus and is performed for various gynecological conditions, including fibroids or endometriosis.',
      descHi: 'इस सर्जरी में गर्भाशय (uterus) को निकाला जाता है और यह फाइब्रॉएड या एंडोमेट्रियोसिस सहित विभिन्न स्त्री रोग संबंधी स्थितियों के लिए की जाती है।',
      icon: HysterectomyIcon
    }
  ]

  const handleCardClick = () => {
    // Smoothly scroll up to the Enquiry form
    const formElement = document.querySelector('form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
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

      {/* Top-Right Decorative Dot Matrix Cluster */}
      <div className="absolute top-8 right-6 lg:right-14 w-32 h-32 opacity-40 pointer-events-none hidden sm:block">
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-cluster-tr" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="2" fill="#d9532f" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-cluster-tr)" />
        </svg>
      </div>

      {/* Bottom-Left Decorative Dot Matrix Cluster */}
      <div className="absolute bottom-8 left-6 lg:left-12 w-44 h-24 opacity-35 pointer-events-none hidden md:block">
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-cluster-bl" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="2" fill="#64748b" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-cluster-bl)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight">
          {isHindi ? (
            <>
              <span className="text-[#ea580c]">लैप्रोस्कोपिक सर्जरी</span> के प्रकार
            </>
          ) : (
            <>
              Types of <span className="text-[#ea580c]">Laparoscopic Surgery</span>
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'लैप्रोस्कोपिक सर्जरी में विभिन्न प्रक्रियाएं शामिल हैं, जिनमें से प्रत्येक विशिष्ट चिकित्सीय स्थितियों के उपचार के लिए तैयार की गई है। सबसे आम प्रकारों में शामिल हैं:'
            : 'Laparoscopic surgery encompasses a variety of procedures, each tailored to address specific medical conditions. Some of the most common types include:'}
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

                {/* Bottom Right Circular Orange Icon Badge (Tailored per procedure type) */}
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
