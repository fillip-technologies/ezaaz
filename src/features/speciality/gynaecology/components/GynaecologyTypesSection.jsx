import { useTranslation } from 'react-i18next'

// Icons for Gynaecology & Obstetrics Modalities
function PregnancyDeliveryIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="7" r="4" />
      <path d="M7 21v-3a5 5 0 0 1 10 0v3" />
      <path d="M12 14a3 3 0 0 1 3 3" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LapGynaeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="3" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="21" y2="12" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PcosHormoneIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="8" cy="12" r="5" />
      <circle cx="16" cy="12" r="5" strokeDasharray="2 2" />
      <path d="M12 7v10" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function InfertilityIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21.5s7-3.5 7-9V5.5l-7-3-7 3v7c0 5.5 7 9 7 9z" />
      <path d="M12 8v5" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FibroidCystIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="12" rx="9" ry="6" />
      <circle cx="9" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WellWomanScreeningIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v7" />
      <path d="M9 19h6" />
      <circle cx="12" cy="9" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function GynaecologyTypesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const types = [
    {
      id: 'high-risk-pregnancy-delivery',
      icon: PregnancyDeliveryIcon,
      titleEn: 'High-Risk Pregnancy & Normal / Caesarean Delivery',
      titleHi: 'उच्च जोखिम गर्भावस्था एवं सुरक्षित प्रसव',
      descEn: 'Comprehensive antenatal care, fetal heart tracking, painless natural delivery protocols, and emergency LSCS managed with extreme vigilance.',
      descHi: 'नियमित प्रसव पूर्व देखभाल, भ्रूण स्वास्थ्य निगरानी, पेनलेस डिलीवरी और 24 घंटे आपातकालीन सिजेरियन ऑपरेशन की सुरक्षित सुविधा।'
    },
    {
      id: 'lap-gynae-surgery',
      icon: LapGynaeIcon,
      titleEn: 'Laparoscopic Gynaecology (TLH & Myomectomy)',
      titleHi: 'लैप्रोस्कोपिक हिस्टेरेक्टॉमी एवं मायोमेक्टॉमी',
      descEn: 'Minimally invasive keyhole removal of uterus (TLH) and fibroids (myomectomy) with tiny incisions, minimal blood loss, and next-day mobility.',
      descHi: 'दूरबीन विधि द्वारा गर्भाशय और रसौली (फाइब्रॉएड) का सूक्ष्म सर्जिकल निष्कासन, जिससे कोई बड़ा निशान नहीं बनता और जल्दी छुट्टी मिलती है।'
    },
    {
      id: 'pcos-pcod-hormonal',
      icon: PcosHormoneIcon,
      titleEn: 'PCOS / PCOD & Hormonal Health Clinic',
      titleHi: 'पीसीओएस / पीसीओडी एवं हार्मोनल स्वास्थ्य',
      descEn: 'Targeted endocrine workup, ovulation cycle stabilization, weight management, and symptom reversal for adolescent and adult women.',
      descHi: 'अनियमित माहवारी, पीसीओएस, चेहरे पर अनचाहे बाल और वजन बढ़ने की समस्या का साक्ष्य-आधारित हार्मोनल और पोषण उपचार।'
    },
    {
      id: 'infertility-fertility-support',
      icon: InfertilityIcon,
      titleEn: 'Infertility Workup & Conception Guidance',
      titleHi: 'बांझपन निदान एवं फर्टिलिटी परामर्श',
      descEn: 'Comprehensive couple evaluation, follicular ultrasound tracking, tubal patency testing, and ovulation induction for successful conception.',
      descHi: 'संतान प्राप्ति में आ रही बाधाओं का संपूर्ण चिकित्सीय परीक्षण, फॉलिक्युलर मॉनिटरिंग और विशेषज्ञ परामर्श एवं सहायता।'
    },
    {
      id: 'fibroids-cysts-endometriosis',
      icon: FibroidCystIcon,
      titleEn: 'Fibroids, Ovarian Cysts & Endometriosis',
      titleHi: 'गर्भाशय रसौली, सिस्ट एवं एंडोमेट्रियोसिस',
      descEn: 'Precise medical and minimally invasive surgical management of painful chocolate cysts, dermoid cysts, uterine polyps, and chronic pelvic pain.',
      descHi: 'अंडाशय की सिस्ट, रसौली और एंडोमेट्रियोसिस के कारण होने वाले असहनीय पेल्विक दर्द का दूरबीन विधि से सटीक उपचार।'
    },
    {
      id: 'well-woman-cervical-cancer',
      icon: WellWomanScreeningIcon,
      titleEn: 'Well-Woman Health & Cervical Cancer Screening',
      titleHi: 'महिला वेलनेस, पैप स्मीयर एवं मेनोपॉज',
      descEn: 'Preventive Pap smears, colposcopy, HPV vaccination, pelvic floor rehabilitation, and compassionate transition care for menopause.',
      descHi: 'गर्भाशय ग्रीवा कैंसर की प्रारंभिक जांच (पैप स्मीयर), एचपीवी वैक्सीन, और मेनोपॉज (माहवारी बंद होने) के दौरान संपूर्ण देखभाल।'
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
              <span className="text-[#ea580c]">स्त्री एवं प्रसूति रोग</span> सेवाएं
            </>
          ) : (
            <>
              Specialized <span className="text-[#ea580c]">Gynaecology & Obstetrics</span> Services
            </>
          )}
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed max-w-4xl">
          {isHindi
            ? 'एजाज क्लिनिक में स्त्री एवं प्रसूति रोग विभाग मातृत्व सुरक्षा और महिला स्वास्थ्य के सभी चरणों के लिए समर्पित विशेषज्ञ सेवाएं प्रदान करता है:'
            : 'At Ejaz Clinic, our Department of Gynaecology & Obstetrics delivers personalized medical care tailored for maternity and womanhood:'}
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
