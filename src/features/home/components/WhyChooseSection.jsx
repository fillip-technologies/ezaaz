import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Images from assets/home/top-prcodecures
import laparoscopicSurgeryImg from '../../../assets/home/top-prcodecures/laproscopic-surgery.jpg'
import roboticSurgeryImg from '../../../assets/home/top-prcodecures/robitc-surgery.jpg'
import generalSurgeryImg from '../../../assets/home/top-prcodecures/general-surgery.jpg'
import orthopedicSurgeryImg from '../../../assets/home/top-prcodecures/orthopedic-surgery.jpg'
import endoscopicSurgeryImg from '../../../assets/home/top-prcodecures/endroscopic-surgery.jpg'

gsap.registerPlugin(ScrollTrigger)

// 5 Featured Advanced Surgical Procedures matching layout
const WHY_CHOOSE_CARDS = [
  {
    id: 'laparoscopic',
    image: laparoscopicSurgeryImg,
    titleEn: 'Laparoscopic Surgery',
    titleHi: 'लैप्रोस्कोपिक सर्जरी',
    subtitleEn: 'Minimally Invasive Precision Procedures',
    subtitleHi: 'न्यूनतम चीरा एवं त्वरित रिकवरी',
    descriptionEn: 'Advanced keyhole surgeries with HD camera guidance, minimal blood loss, minimal scarring, and rapid recovery.',
    descriptionHi: 'एचडी कैमरा तकनीक एवं न्यूनतम चीरे द्वारा सटीक सर्जरी, जिससे कम दर्द और अतिशीघ्र अस्पताल से छुट्टी मिलती है।',
    href: '/speciality/laparoscopic'
  },
  {
    id: 'robotic',
    image: roboticSurgeryImg,
    titleEn: 'Robotic Surgery',
    titleHi: 'रोबोटिक सर्जरी',
    subtitleEn: 'Next-Gen Surgical Robotics & Accuracy',
    subtitleHi: 'अत्याधुनिक रोबोटिक तकनीक एवं सटीकता',
    descriptionEn: 'Sub-millimeter surgical precision with 3D high-magnification visualization for complex, delicate interventions.',
    descriptionHi: 'जटिल और संवेदनशील ऑपरेशनों में 3D विज़ुअलाइज़ेशन और मिलीमीटर स्तर के नियंत्रण के साथ रोबोटिक सटीकता।',
    href: '#specialties'
  },
  {
    id: 'general-surgery',
    image: generalSurgeryImg,
    titleEn: 'General Surgery',
    titleHi: 'जनरल सर्जरी',
    subtitleEn: 'Comprehensive Operative Care',
    subtitleHi: 'व्यापक एवं सुरक्षित ऑपरेशनल देखभाल',
    descriptionEn: 'Expert operative management for hernia, gallstones, appendicitis, and acute abdominal emergencies.',
    descriptionHi: 'हर्निया, पित्त की थैली की पथरी, अपेंडिक्स और पेट की आपातकालीन बीमारियों का अनुभवी सर्जनों द्वारा सुरक्षित उपचार।',
    href: '/speciality/general-surgery'
  },
  {
    id: 'orthopedic',
    image: orthopedicSurgeryImg,
    titleEn: 'Orthopedic Surgery',
    titleHi: 'ऑर्थोपेडिक सर्जरी',
    subtitleEn: 'Joint Replacement & Bone Reconstruction',
    subtitleHi: 'जोड़ प्रत्यारोपण एवं अस्थि पुनर्निर्माण',
    descriptionEn: 'Advanced knee and hip replacements, arthroscopic sports injury treatments, and complex fracture repairs.',
    descriptionHi: 'घुटना एवं कूल्हा प्रत्यारोपण, आर्थ्रोस्कोपिक लिगामेंट सर्जरी और जटिल हड्डी फ्रैक्चर का अत्याधुनिक पुनर्निर्माण।',
    href: '/speciality/orthopaedics'
  },
  {
    id: 'endoscopic',
    image: endoscopicSurgeryImg,
    titleEn: 'Endoscopic Surgery',
    titleHi: 'एंडोस्कोपिक सर्जरी',
    subtitleEn: 'Advanced Diagnostic & Therapeutic Interventions',
    subtitleHi: 'उन्नत डायग्नोस्टिक एवं इंटरवेंशनल प्रक्रियाएं',
    descriptionEn: 'Incision-free diagnostic and therapeutic digestive procedures ensuring gentle interventions and swift healing.',
    descriptionHi: 'बिना किसी बाहरी चीरे के पेट एवं पाचन तंत्र से जुड़े रोगों की त्वरित जांच और लेजर व एंडोस्कोपिक उपचार।',
    href: '/speciality/gastrointestinal'
  }
]

// Vector Icons for bottom Trust Metrics
function DoctorCardIcon({ className = "w-16 h-16 text-[#003a70]" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 20C23 13.5 27 9 32 9C37 9 41 13.5 41 20C41 21.2 39.5 22 38 21.5C35.5 20.2 33.5 20.2 32 20.2C30.5 20.2 28.5 20.2 26 21.5C24.5 22 23 21.2 23 20Z" fill="currentColor" stroke="none" />
      <path d="M25 21C25 25.5 28 29.5 32 29.5C36 29.5 39 25.5 39 21" />
      <path d="M24 21C23 21 22 22 22 23.5C22 25 23 26 24 26" />
      <path d="M40 21C41 21 42 22 42 23.5C42 25 41 26 40 26" />
      <path d="M19 55V46C19 39 24.5 34.5 30.5 34L32 38.5L33.5 34C39.5 34.5 45 39 45 46V55" />
      <path d="M30.5 34L32 38.5L33.5 34" />
      <path d="M26 42C26 46 29 49 32 49C35 49 38 46 38 42V37" strokeWidth="2" />
      <circle cx="38" cy="37" r="1.5" fill="currentColor" />
    </svg>
  )
}

function PatientsCardIcon({ className = "w-16 h-16 text-[#003a70]" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <circle cx="33" cy="16" r="6" />
      <path d="M25 28C25 24.5 28.5 23 33 23C36.5 23 39.5 24 40.5 26.5C39.5 28 38.8 29.8 38.8 31.8C38.8 34.5 40.2 36.8 42.2 38C42.8 39.5 43 41.2 43 43H28C26 43 25 38 25 34V28Z" />
      <path d="M43.5 28C42 26.5 40 26.8 39.2 28C38.5 26.8 36.5 26.5 35 28C33.5 29.5 33.5 32 35.5 34.2L39.2 37.8L43 34.2C45 32 45 29.5 43.5 28Z" />
      <path d="M39.2 30V34M37.2 32H41.2" stroke="#e6f8ff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 46.5L25.5 42C27 41 29.5 41.5 30.5 43C31.5 44.5 31 46.5 29.5 47.5L24 51.5C22.8 52.3 21.2 52 20.4 50.8L18.8 48.5C18.2 47.8 18.3 47 19 46.5Z" />
      <path d="M23 44.5L34 44.5C36.8 44.5 39.2 46.5 39.2 49C39.2 49.5 38.8 50 38.2 50L25 50C23.5 50 22.8 48.5 23 44.5Z" />
    </svg>
  )
}

function SpecialitiesCardIcon({ className = "w-16 h-16 text-[#003a70]", innerBg = "#fef0ed" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 10L34 14C35.5 14.5 37 15.2 38.2 16.2L42.2 15L44.5 19L41.5 22C42 23.2 42.4 24.5 42.6 26L46.8 27.2V31.8L42.6 33C42.4 34.2 42 35.5 41.5 36.6L42 37.2C41.5 37.8 41 38.5 40.2 39.2L36.5 37C35.2 37.8 33.8 38.3 32.2 38.6L31 42.8H26.5L25.3 38.6C23.8 38.3 22.4 37.8 21.1 37L17.5 39.5L15 35.5L18.2 32.5C17.7 31.2 17.4 29.8 17.2 28.5L13 27.2V22.8L17.2 21.5C17.4 20.2 17.7 18.8 18.2 17.5L15 14.5L17.5 10.5L21.1 13C22.4 12.2 23.8 11.7 25.3 11.4L26.5 7.2H31L32 10Z" />
      <circle cx="30" cy="25" r="9" fill={innerBg} />
      <circle cx="30" cy="22" r="3.5" fill="#003a70" />
      <path d="M24 30C24 27 26.5 26.5 30 26.5C33.5 26.5 36 27 36 30H24Z" fill="#003a70" />
      <circle cx="43" cy="41" r="8" fill="#003a70" />
      <circle cx="43" cy="41" r="6" fill={innerBg} />
      <path d="M43 37.5L44.2 40L46.8 40.3L44.8 42L45.4 44.5L43 43.2L40.6 44.5L41.2 42L39.2 40.3L41.8 40L43 37.5Z" fill="#003a70" />
      <path d="M39 47L37 54L41 52L43 54L42 48" fill="#003a70" />
      <path d="M47 47L49 54L45 52L43 54L44 48" fill="#003a70" />
    </svg>
  )
}

function HospitalCardIcon({ className = "w-16 h-16 text-[#003a70]", innerBg = "#eef9ea" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <path d="M26 18C26 16.5 27 15.5 28.5 15.5H35.5C37 15.5 38 16.5 38 18V50H26V18Z" />
      <path d="M30.5 23H33.5V20.5H30.5V23ZM30.5 25.5H33.5V28H30.5V25.5ZM28 23H36V25.5H28V23Z" fill={innerBg} />
      <path d="M16 26C16 24.8 17 24 18 24H26V50H16V26Z" />
      <path d="M38 24H46C47 24 48 24.8 48 26V50H38V24Z" />
      <rect x="19" y="28" width="3" height="4" rx="0.5" fill={innerBg} />
      <rect x="19" y="35" width="3" height="4" rx="0.5" fill={innerBg} />
      <rect x="19" y="42" width="3" height="4" rx="0.5" fill={innerBg} />
      <rect x="42" y="28" width="3" height="4" rx="0.5" fill={innerBg} />
      <rect x="42" y="35" width="3" height="4" rx="0.5" fill={innerBg} />
      <rect x="42" y="42" width="3" height="4" rx="0.5" fill={innerBg} />
      <rect x="29" y="32" width="2.5" height="3.5" rx="0.5" fill={innerBg} />
      <rect x="32.5" y="32" width="2.5" height="3.5" rx="0.5" fill={innerBg} />
      <rect x="29" y="38" width="2.5" height="3.5" rx="0.5" fill={innerBg} />
      <rect x="32.5" y="38" width="2.5" height="3.5" rx="0.5" fill={innerBg} />
      <path d="M30 45H34V50H30V45Z" fill={innerBg} />
      <rect x="14" y="50" width="36" height="3" rx="1.5" />
    </svg>
  )
}

// 4 Reference UI Trust Cards
const TRUST_CARDS = [
  {
    id: 'doctors',
    title: '50+ Doctors',
    titleHi: '50+ डॉक्टर्स',
    bgColor: 'bg-[#f4f2ff]',
    borderColor: 'border-[#b8b3f8]',
    shadowColor: 'hover:shadow-[0_12px_28px_rgba(184,179,248,0.35)]',
    icon: DoctorCardIcon,
    innerColor: '#f4f2ff'
  },
  {
    id: 'patients',
    title: '200k+ Happy Patients',
    titleHi: '200k+ संतुष्ट मरीज',
    bgColor: 'bg-[#e6f8ff]',
    borderColor: 'border-[#9fe1f9]',
    shadowColor: 'hover:shadow-[0_12px_28px_rgba(159,225,249,0.4)]',
    icon: PatientsCardIcon,
    innerColor: '#e6f8ff'
  },
  {
    id: 'specialities',
    title: '20+ Specialities',
    titleHi: '20+ चिकित्सा विशेषताएं',
    bgColor: 'bg-[#fef0ed]',
    borderColor: 'border-[#fbc9c0]',
    shadowColor: 'hover:shadow-[0_12px_28px_rgba(251,201,192,0.4)]',
    icon: SpecialitiesCardIcon,
    innerColor: '#fef0ed'
  },
  {
    id: 'excellence',
    title: '14+ Years of Excellence',
    titleHi: '14+ वर्षों की उत्कृष्टता',
    bgColor: 'bg-[#eef9ea]',
    borderColor: 'border-[#b6e8ab]',
    shadowColor: 'hover:shadow-[0_12px_28px_rgba(182,232,171,0.4)]',
    icon: HospitalCardIcon,
    innerColor: '#eef9ea'
  }
]

export default function WhyChooseSection() {
  const { t, i18n } = useTranslation('home')
  const isHindi = i18n?.language === 'hi'
  const sectionRef = useRef(null)

  // GSAP Smooth Scroll Entrance Animation
  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true
      }
    })

    // Intro card glide in
    tl.fromTo(
      '.why-intro-card',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out', clearProps: 'all' }
    )
    // 5 image cards stagger in
    .fromTo(
      '.why-image-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out', clearProps: 'all' },
      '-=0.35'
    )
    // Bottom trust stats
    .fromTo(
      '.why-stat',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out', clearProps: 'all' },
      '-=0.2'
    )
  }, { scope: sectionRef })

  const handleCardClick = (e, href) => {
    if (!href) return
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }
    if (href.startsWith('/')) {
      e.preventDefault()
      if (window.history?.pushState) {
        window.history.pushState(null, '', href)
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: href }))
      } else {
        window.location.href = href
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }

  return (
    <section
      id="procedures"
      ref={sectionRef}
      className="relative w-full bg-white text-slate-800 py-16 sm:py-20 lg:py-24 border-t border-slate-200/80 scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* 6-Cell Grid Matching Mayo Clinic Reference UI (1 Intro block + 5 Image Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          
          {/* Cell 1 (Row 1, Col 1): Header / Narrative / CTA Pill Button */}
          <div className="why-intro-card flex flex-col justify-center items-start pr-0 md:pr-4 lg:pr-6 text-left py-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-[1.18]">
              {t('whyChoose.title') || 'Advanced Surgical Procedures'}
            </h2>

            <p className="mt-4 sm:mt-5 text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-sm font-normal">
              {t('whyChoose.subtitle') ||
                'Explore modern surgical techniques performed by our expert medical team, combining precision, advanced technology, and patient-focused care.'}
            </p>
          </div>

          {/* Cells 2 to 6: 5 Image Cards with Bottom Dark Gradient, Title >, Subtitle, and Smooth Hover Paragraph */}
          {WHY_CHOOSE_CARDS.map((card) => {
            const title = isHindi ? card.titleHi : card.titleEn
            const subtitle = isHindi ? card.subtitleHi : card.subtitleEn
            const description = isHindi ? card.descriptionHi : card.descriptionEn

            return (
              <a
                key={card.id}
                href={card.href}
                onClick={(e) => handleCardClick(e, card.href)}
                className="why-image-card group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/11] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 block text-left cursor-pointer"
              >
                {/* Background Hospital Image */}
                <img
                  src={card.image}
                  alt={title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                />

                {/* Bottom Contrast Dark Gradient Overlay - Deepens smoothly on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent group-hover:from-slate-950/98 group-hover:via-slate-950/65 pointer-events-none transition-all duration-300" />

                {/* Overlay Text Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-left flex flex-col justify-end">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight leading-snug flex items-center gap-1.5 group-hover:underline underline-offset-4 decoration-white/70">
                    <span>{title}</span>
                    <span className="font-sans text-base transition-transform duration-200 group-hover:translate-x-1.5 text-orange-400">›</span>
                  </h3>
                  
                  <p className="mt-1 text-white/90 text-xs sm:text-sm font-medium leading-snug drop-shadow-xs">
                    {subtitle}
                  </p>

                  {/* Smooth Hover Description Paragraph */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-350 ease-out">
                    <div className="overflow-hidden">
                      <p className="mt-2 pt-2 border-t border-white/20 text-xs sm:text-[13px] text-slate-200/95 font-normal leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}

        </div>

        {/* Trust Metrics Cards - Retained underneath for high clinical credibility */}
        <div className="mt-14 sm:mt-18 pt-10 border-t border-slate-200/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_CARDS.map((card, index) => {
              const IconComp = card.icon
              return (
                <div
                  key={index}
                  className={`why-stat ${card.bgColor} ${card.borderColor} border-2 rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] ${card.shadowColor} hover:-translate-y-1.5 transition-all duration-300 group cursor-default`}
                >
                  <div className="h-16 sm:h-20 flex items-center justify-center mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-110">
                    <IconComp className="w-14 h-14 sm:w-16 sm:h-16 text-[#003a70]" innerBg={card.innerColor} />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight leading-snug">
                    {isHindi ? card.titleHi : card.title}
                  </h4>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
