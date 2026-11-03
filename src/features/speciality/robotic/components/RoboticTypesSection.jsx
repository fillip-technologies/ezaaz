import { useTranslation } from 'react-i18next'

// Custom Vector Icons for Robotic Specialties
function RoboticArmIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 18h16" />
      <path d="M7 18v-4a2 2 0 0 1 2-2h1" />
      <path d="M12 12l3-5 3 2-2 4" />
      <circle cx="10" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <path d="M18 13l3 2-1 2-3-1" />
    </svg>
  )
}

function UrologyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v8" />
      <path d="M8 8a4 4 0 0 0 8 0" />
      <path d="M7 14c0 3 2 6 5 6s5-3 5-6" />
      <circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function GastroIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v4c0 3-2 5-5 5H6a3 3 0 0 0 0 6h8c3 0 5-2 5-5V7" />
      <path d="M9 14h6" />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function HerniaIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M8 12c1.5-2 3-2 4 0s2.5 2 4 0" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function GynecologyIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v7" />
      <path d="M9 19h6" />
      <circle cx="12" cy="9" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function JointOrthoIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 2v6c0 1.5-1 2.5-1 4 0 2 2 3 3 3s3-1 3-3c0-1.5-1-2.5-1-4V2" />
      <path d="M11 15v7" />
      <path d="M13 15v7" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function RoboticTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'robotic-urology',
      icon: UrologyIcon,
      titleEn: 'Robotic Urology & Prostate Surgery',
      titleHi: 'रोबोटिक यूरोलॉजी एवं प्रोस्टेट सर्जरी',
      descEn: 'Nerve-sparing robotic radical prostatectomy for prostate cancer, nephron-sparing partial nephrectomy for renal tumors, and robotic pyeloplasty preserving urinary continence and sexual function.',
      descHi: 'प्रोस्टेट कैंसर के लिए नसों को सुरक्षित रखने वाली रेडिकल प्रोस्टेटेक्टॉमी, किडनी ट्यूमर हटाने के लिए आंशिक नेफ्रेक्टॉमी और यूरिनरी कंट्रोल सुरक्षित रखने वाली आधुनिक सर्जरी।'
    },
    {
      id: 'robotic-gi-colorectal',
      icon: GastroIcon,
      titleEn: 'Robotic GI & Colorectal Resection',
      titleHi: 'रोबोटिक जीआई एवं कोलोरेक्टल सर्जरी',
      descEn: 'Ultra-precise robotic surgeries for esophageal, gastric, colorectal tumors, and inflammatory bowel diseases with magnified 3D lymphatic dissection and intact sphincter preservation.',
      descHi: 'अन्नप्रणाली, आमाशय, बड़ी आंत और मलाशय के जटिल ट्यूमर का 3D आवर्धन में सूक्ष्म विच्छेदन, जिससे स्फिंक्टर मांसपेशियां और प्राकृतिक पाचन सुरक्षित रहते हैं।'
    },
    {
      id: 'robotic-hernia',
      icon: HerniaIcon,
      titleEn: 'Robotic Complex Hernia & Abdominal Wall Repair',
      titleHi: 'रोबोटिक हर्निया एवं एब्डोमिनल वॉल रिपेयर',
      descEn: 'Sub-fascial robotic retro-muscular mesh positioning (eTEP & TAR) for recurrent, giant, and incisional abdominal hernias with minimal post-operative tension and rapid healing.',
      descHi: 'बार-बार होने वाले और जटिल इनसिजनल हर्निया के लिए eTEP और TAR तकनीकों द्वारा पेट की मांसपेशियों के पीछे सटीक जाली (Mesh) लगाने की सुरक्षित प्रक्रिया।'
    },
    {
      id: 'robotic-gynecology',
      icon: GynecologyIcon,
      titleEn: 'Robotic Gynaecological Surgery',
      titleHi: 'रोबोटिक गायनेकोलॉजिकल सर्जरी',
      descEn: 'Robotic hysterectomy, complex myomectomy (uterine-sparing fibroid excision), and surgical clearance of deep infiltrating endometriosis with minimal pelvic trauma.',
      descHi: 'गर्भाशय को सुरक्षित रखते हुए फाइब्रॉयड हटाने (मायोमेक्टॉमी), रोबोटिक हिस्टेरेक्टॉमी और एंडोमेट्रियोसिस का न्यूनतम दर्द और त्वरित रिकवरी वाला सुरक्षित उपचार।'
    },
    {
      id: 'robotic-ortho',
      icon: JointOrthoIcon,
      titleEn: 'Robotic Joint Replacement (Ortho)',
      titleHi: 'रोबोटिक जॉइंट रिप्लेसमेंट (ऑर्थोपेडिक्स)',
      descEn: 'Pre-operative 3D CT surgical modeling, bone resurfacing with sub-millimeter robotic arm guidance, and optimal implant alignment for Total Knee and Hip Arthroplasty.',
      descHi: '3D सीटी स्कैन मैपिंग के साथ सब-मिलीमीटर सटीकता से घुटने और कूल्हे का रोबोटिक जोड़ प्रत्यारोपण, जिससे प्राकृतिक जोड़ गतिशीलता और लंबी उम्र मिलती है।'
    },
    {
      id: 'robotic-oncology',
      icon: RoboticArmIcon,
      titleEn: 'Robotic Surgical Oncology',
      titleHi: 'रोबोटिक सर्जिकल ऑन्कोलॉजी (कैंसर)',
      descEn: 'Precision tumor exenteration in deep pelvic and retroperitoneal spaces ensuring clear microscopic resection margins while safeguarding surrounding neurovascular structures.',
      descHi: 'गंभीर पेल्विक और पेट के कैंसर में ट्यूमर को पूरी तरह हटाने के साथ-साथ महत्वपूर्ण नसों और रक्त नलिकाओं की सुरक्षा, जिससे तेजी से कैंसर मुक्ति मिलती है।'
    }
  ]

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-[13px] font-bold text-[#ea580c] uppercase tracking-wider mb-2 block">
            {isHindi ? 'विशेषज्ञ सर्जिकल प्रक्रियाएं' : 'Specialized Procedures'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {isHindi ? (
              <>
                रोबोटिक सर्जरी के{' '}
                <span className="text-[#ea580c]">प्रमुख प्रकार एवं क्षेत्र</span>
              </>
            ) : (
              <>
                Specialized Clinical Areas in{' '}
                <span className="text-[#ea580c]">Robotic Surgery</span>
              </>
            )}
          </h2>
          <p className="mt-3.5 text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed">
            {isHindi
              ? 'एजाज क्लिनिक में हमारी रोबोटिक सर्जिकल टीम विभिन्न जटिल बीमारियों में न्यूनतम सर्जिकल आघात और अधिकतम नैदानिक सफलता सुनिश्चित करती है।'
              : 'Our advanced surgical team leverages computerized robotic platforms across multiple medical disciplines to ensure exceptional surgical outcomes.'}
          </p>
        </div>

        {/* 6-Card Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {types.map((item) => {
            const IconComponent = item.icon
            const title = isHindi ? item.titleHi : item.titleEn
            const desc = isHindi ? item.descHi : item.descEn

            return (
              <div
                key={item.id}
                className="group relative bg-[#fcfdff] rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-orange-500/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Header */}
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#ea580c] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#ea580c] group-hover:text-white transition-all duration-300 shadow-xs">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#ea580c] transition-colors mb-2.5">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                    {desc}
                  </p>
                </div>

                {/* Subtle Orange Accent bottom indicator */}
                <div className="w-10 h-0.5 bg-orange-500/20 group-hover:w-full group-hover:bg-[#ea580c] transition-all duration-300 mt-6 rounded-full" />
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

