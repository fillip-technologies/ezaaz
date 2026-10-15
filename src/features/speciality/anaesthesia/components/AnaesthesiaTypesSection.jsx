import { useTranslation } from 'react-i18next'

// Icons for Anaesthesia & Critical Care Modalities
function GeneralAnaesthIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="7" r="4" />
      <path d="M12 11v7" />
      <path d="M8 15h8" />
      <path d="M5 21h14" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SpinalEpiduralIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v20" />
      <rect x="8" y="5" width="8" height="3" rx="1" />
      <rect x="7.5" y="10.5" width="9" height="3" rx="1" />
      <rect x="8" y="16" width="8" height="3" rx="1" />
      <line x1="17" y1="12" x2="22" y2="12" strokeWidth="2" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function UsgBlockIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16v11H4z" rx="2" />
      <path d="M4 10h16" strokeDasharray="2 2" />
      <path d="M12 15v5" />
      <path d="M9 20h6" />
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function MacSedationIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12h5l2-5 4 10 3-7 2 2h4" />
      <circle cx="12" cy="12" r="9" opacity="0.3" strokeDasharray="2 2" />
    </svg>
  )
}

function PainReliefIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21.5s7-3.5 7-9V5.5l-7-3-7 3v7c0 5.5 7 9 7 9z" />
      <path d="M9 12l2 2 4-4" strokeWidth="2.2" />
    </svg>
  )
}

function IcuResuscitationIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M7 10h3l1.5-3 2 6 1.5-3h3" />
      <path d="M7 20h10" />
      <path d="M12 16v4" />
    </svg>
  )
}

export default function AnaesthesiaTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'general-anaesthesia',
      icon: GeneralAnaesthIcon,
      titleEn: 'General Anaesthesia & Airway Security',
      titleHi: 'जनरल एनेस्थीसिया एवं एयरवे सुरक्षा',
      descEn: 'State-of-the-art intravenous and inhalational anaesthesia with advanced endotracheal and supraglottic airway management for painless major surgeries.',
      descHi: 'बड़ी और जटिल सर्जरी के लिए संपूर्ण बेहोशी, उन्नत श्वासनली सुरक्षा और शून्य दर्द का सुरक्षित चिकित्सकीय अनुभव।'
    },
    {
      id: 'spinal-epidural',
      icon: SpinalEpiduralIcon,
      titleEn: 'Spinal, Epidural & Central Neuraxial Blocks',
      titleHi: 'स्पाइनल, एपिड्यूरल एवं न्यूरैक्सियल ब्लॉक',
      descEn: 'Targeted subarachnoid and epidural anaesthesia for lower abdominal, pelvic, hernia, and orthopaedic lower-limb surgeries with rapid post-op comfort.',
      descHi: 'पेट के निचले हिस्से, हर्निया और पैरों की ऑर्थोपेडिक सर्जरी के लिए शरीर के निचले हिस्से को सुरक्षित रूप से सुन्न करने की तकनीक।'
    },
    {
      id: 'usg-nerve-blocks',
      icon: UsgBlockIcon,
      titleEn: 'Ultrasound-Guided Peripheral Nerve Blocks',
      titleHi: 'अल्ट्रासाउंड-गाइडेड नर्व ब्लॉक',
      descEn: 'High-frequency sonographic visualization of nerves for localized plexus blocks (TAP, fascia iliaca, brachial plexus), reducing opioid requirements.',
      descHi: 'सोनोग्राफी स्क्रीन पर नसों को देखकर सटीक सुन्नता प्रदान करना, जिससे ऑपरेशन के बाद 24 से 48 घंटे तक कोई दर्द नहीं होता।'
    },
    {
      id: 'mac-sedation',
      icon: MacSedationIcon,
      titleEn: 'Monitored Anaesthesia Care (MAC) & Sedation',
      titleHi: 'सचेत सेडेशन एवं डेकेयर एनेस्थीसिया',
      descEn: 'Conscious sedation for day-care diagnostic endoscopies, minor lumps, and biopsy procedures with rapid awakening and prompt discharge.',
      descHi: 'एंडोस्कोपी, कोलोनोस्कोपी और छोटी प्रक्रियाओं के लिए हल्का तनाव-मुक्त सेडेशन, जिससे मरीज तुरंत सामान्य होकर घर लौटते हैं।'
    },
    {
      id: 'pain-management',
      icon: PainReliefIcon,
      titleEn: 'Acute & Chronic Perioperative Pain Relief',
      titleHi: 'एक्यूट एवं क्रोनिक पोस्ट-ऑपरेटिव पेन केयर',
      descEn: 'Multimodal analgesia protocols integrating patient-controlled analgesia (PCA), regional infusions, and modern non-narcotic pain therapies.',
      descHi: 'मरीज-नियंत्रित एनाल्जेसिया और उन्नत दवाओं द्वारा ऑपरेशन के बाद किसी भी प्रकार के दर्द को पूरी तरह नियंत्रित करना।'
    },
    {
      id: 'icu-resuscitation',
      icon: IcuResuscitationIcon,
      titleEn: 'Intensive Critical Care & Life Support',
      titleHi: 'क्रिटिकल केयर आईसीयू एवं रिससिटेशन',
      descEn: '24/7 dedicated multidisciplinary ICU monitoring with invasive arterial blood pressure, central venous access, and protective mechanical ventilation.',
      descHi: 'गंभीर मरीजों के लिए 24 घंटे समर्पित आईसीयू निगरानी, इनवेसिव मॉनिटरिंग और जीवनरक्षक वेंटिलेटर सपोर्ट।'
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
              <span className="text-[#ea580c]">एनेस्थीसिया एवं क्रिटिकल केयर</span> सेवाएं
            </>
          ) : (
            <>
              Specialized <span className="text-[#ea580c]">Anaesthesia & Critical Care</span>
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'एनेस्थीसिया एवं क्रिटिकल केयर विभाग प्रत्येक सर्जिकल स्थिति और रोगी की व्यक्तिगत आवश्यकताओं के अनुसार विशेष तकनीकें प्रदान करता है:'
            : 'Our anaesthesia and critical care center provides specialized modalities tailored for every surgical scenario and clinical acuity:'}
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
