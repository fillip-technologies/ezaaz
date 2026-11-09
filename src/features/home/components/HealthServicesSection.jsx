import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Stethoscope,
  HeartHandshake,
  ArrowRight
} from 'lucide-react'
import serviceBgImage from '../../../assets/home/service-bg-image.png'

gsap.registerPlugin(ScrollTrigger)

// Custom Shield with Cross icon matching the reference design
function ShieldMedicalIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  )
}

// Custom Diagnostic Lab/Flask icon matching the reference design
function DiagnosticIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.5" strokeOpacity="0.35" strokeDasharray="2 2" />
      <path d="M10 2v5l-3 5.5A4 4 0 0 0 10.5 18h3a4 4 0 0 0 3.5-5.5L14 7V2" />
      <line x1="8.5" y1="2" x2="15.5" y2="2" />
      <circle cx="11" cy="14" r="0.75" fill="currentColor" />
      <circle cx="13" cy="12" r="0.75" fill="currentColor" />
    </svg>
  )
}

// Fallback features guaranteed to be available immediately
const FALLBACK_FEATURES = [
  {
    id: 'consultation',
    title: 'Consultation',
    desc: 'Expert medical advice',
    icon: 'shield'
  },
  {
    id: 'diagnostic',
    title: 'Diagnostic Tests',
    desc: 'Accurate & timely reports',
    icon: 'diagnostic'
  },
  {
    id: 'surgical',
    title: 'Surgical Care',
    desc: 'Advanced technology',
    icon: 'surgical'
  },
  {
    id: 'support',
    title: 'Patient Support',
    desc: '24/7 assistance',
    icon: 'support'
  }
]

// Icon resolver for the 4 featured service cards
function getFeatureIcon(iconKey) {
  switch (iconKey) {
    case 'shield':
    case 'consultation':
      return ShieldMedicalIcon
    case 'diagnostic':
    case 'microscope':
      return DiagnosticIcon
    case 'surgical':
    case 'stethoscope':
      return Stethoscope
    case 'support':
    case 'heart':
    default:
      return HeartHandshake
  }
}

export default function HealthServicesSection() {
  const { t } = useTranslation('home')
  const sectionRef = useRef(null)

  // Resolve 4 features from i18n
  const rawFeatures = t('healthServices.features', { returnObjects: true })
  const features = Array.isArray(rawFeatures) && rawFeatures.length > 0 ? rawFeatures : FALLBACK_FEATURES

  // GSAP Entrance Animation
  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true
      }
    })

    // Left content items glide in
    tl.fromTo(
      '.service-left-item',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
    )
    // 4 glass cards stagger in
    .fromTo(
      '.service-grid-card',
      { y: 25, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.08, ease: 'power2.out', clearProps: 'all' },
      '-=0.25'
    )
  }, { scope: sectionRef })

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-[400px] lg:min-h-[450px] flex items-center border-y border-teal-900/20 shadow-md scroll-mt-24"
    >
      {/* Full width background image: service-bg-image.png */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <img
          src={serviceBgImage}
          alt="Ejaz Hospital Advanced Care"
          className="w-full h-full object-cover object-right lg:object-center"
        />
        {/* Subtle mobile overlay to guarantee crystal clear readability when cards wrap */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#013741] via-[#013741]/90 to-transparent lg:hidden" />
      </div>

      {/* Banner Content Container */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Tagline, Headline, Subtitle, CTA Button */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center text-left">
            {/* Gold Tagline */}
            <div className="service-left-item">
              <span className="text-[#e2ab3b] font-bold text-[11px] sm:text-xs tracking-[0.22em] uppercase inline-block">
                {t('healthServices.badge') || 'OUR SERVICES'}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="service-left-item mt-2 sm:mt-2.5 text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-white tracking-tight leading-[1.2]">
              {t('healthServices.title') || 'Advanced Care For A Healthier Tomorrow'}
            </h2>

            {/* Subtitle */}
            <p className="service-left-item mt-3 sm:mt-4 text-teal-50/85 text-xs sm:text-sm leading-relaxed max-w-md">
              {t('healthServices.subtitle') ||
                'Complete healthcare solutions with advanced technology and expert care, designed for you and your family.'}
            </p>

            {/* CTA Button: Pill-shaped Book an Appointment */}
            <div className="service-left-item mt-6 sm:mt-8">
              <a
                href="#appointments"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#01414c] hover:bg-[#025665] text-white text-xs sm:text-sm font-semibold border border-teal-400/40 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:border-teal-300 hover:shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer"
              >
                <span>{t('healthServices.bookBtn') || 'Book an Appointment'}</span>
                <ArrowRight className="w-4 h-4 text-teal-300 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Middle Column: 2x2 Grid of Glass Cards */}
          <div className="lg:col-span-4 xl:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-3.5">
              {features.map((feature, idx) => {
                const IconComponent = getFeatureIcon(feature.icon || feature.id)
                return (
                  <div
                    key={feature.id || idx}
                    className="service-grid-card group bg-[#01353f]/75 hover:bg-[#01424e]/85 backdrop-blur-md border border-teal-500/25 hover:border-teal-400/50 rounded-2xl p-3.5 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] flex items-center gap-3.5 cursor-default text-left"
                  >
                    {/* Icon Container */}
                    <div className="w-11 h-11 rounded-xl bg-teal-950/40 border border-teal-400/30 flex items-center justify-center shrink-0 text-teal-300 group-hover:text-teal-200 group-hover:scale-105 transition-all">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    {/* Title & Description */}
                    <div className="min-w-0">
                      <h3 className="text-white font-bold text-sm sm:text-[15px] leading-tight group-hover:text-teal-100 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-teal-100/70 text-xs mt-1 leading-snug line-clamp-2">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Kept open so the Operating Theatre surgical team is showcased cleanly */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-3 min-h-[160px]" aria-hidden="true" />

        </div>
      </div>
    </section>
  )
}
