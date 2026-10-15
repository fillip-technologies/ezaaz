import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  CalendarCheck,
  FlaskConical,
  HeartPulse,
  ArrowRight
} from 'lucide-react'

// Custom SVG icon for Radiology / X-Ray ribcage scan
function RadiologyIcon({ className = 'w-6 h-6' }) {
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
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M12 6v12" />
      <path d="M9 9c1.5-1 4.5-1 6 0" />
      <path d="M8 12c2.5-1.2 5.5-1.2 8 0" />
      <path d="M7 15c3.2-1.5 6.8-1.5 10 0" />
    </svg>
  )
}

// Custom SVG icon for Physiotherapy / Physical Rehabilitation & Mobility
function PhysiotherapyIcon({ className = 'w-6 h-6' }) {
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
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v7" />
      <path d="M6.5 10.5l5.5-2 5.5 2" />
      <path d="M8.5 20l3.5-7 3.5 7" />
      <path d="M3.5 14.5c-.8-1.5-.8-3.5 0-5" />
      <path d="M20.5 14.5c.8-1.5.8-3.5 0-5" />
    </svg>
  )
}

export default function QuickActionsBar() {
  const { t } = useTranslation('home')
  const [activeTab, setActiveTab] = useState('appointment')
  const barRef = useRef(null)

  // GSAP Entrance
  useGSAP(() => {
    gsap.fromTo(
      barRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      }
    )
  }, { scope: barRef })

  const handleItemClick = (e, href, id) => {
    setActiveTab(id)
    if (!href) return

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

  const actions = [
    {
      id: 'appointment',
      label: t('quickActions.appointment'),
      icon: CalendarCheck,
      href: '/services/book-appointment',
    },
    {
      id: 'radiology',
      label: t('quickActions.radiology'),
      icon: RadiologyIcon,
      href: '/facilities/radiology',
    },
    {
      id: 'diagnosticLab',
      label: t('quickActions.diagnosticLab'),
      icon: FlaskConical,
      href: '/facilities/diagnosis',
    },
    {
      id: 'physiotherapy',
      label: t('quickActions.physiotherapy'),
      icon: PhysiotherapyIcon,
      href: '/facilities/physiotherapy',
    },
    {
      id: 'icuServices',
      label: t('quickActions.icuServices'),
      icon: HeartPulse,
      href: '/facilities/icu',
    },
  ]

  // Border and layout mapping for mobile (full-width top + 2x2 grid) and desktop (5-col row)
  const getItemLayoutClasses = (index) => {
    switch (index) {
      case 0:
        // Doctor Consultation: Full-width on mobile, 1st col on desktop
        return 'col-span-2 lg:col-span-1 border-b lg:border-b-0 lg:border-r border-slate-200'
      case 1:
        // Radiology: top-left of 2x2 grid on mobile
        return 'col-span-1 border-r border-b lg:border-b-0 lg:border-r border-slate-200'
      case 2:
        // Diagnostic lab: top-right of 2x2 grid on mobile
        return 'col-span-1 border-b lg:border-b-0 lg:border-r border-slate-200'
      case 3:
        // Physiotherapy: bottom-left of 2x2 grid on mobile
        return 'col-span-1 border-r lg:border-r border-slate-200'
      case 4:
        // ICU Services: bottom-right of 2x2 grid on mobile
        return 'col-span-1'
      default:
        return 'col-span-1'
    }
  }

  return (
    <section ref={barRef} className="relative z-30 w-full bg-white shadow-xl border-y border-slate-200/80">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5">
          {actions.map((item, index) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            const isFeaturedOnMobile = index === 0

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleItemClick(e, item.href, item.id)}
                className={`flex items-center gap-3 sm:gap-4 lg:gap-5 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 lg:py-10 min-h-[54px] sm:min-h-[64px] lg:min-h-[140px] transition-all duration-200 cursor-pointer group text-left ${getItemLayoutClasses(index)} ${
                  isActive
                    ? 'bg-[#003a70] text-white shadow-inner'
                    : 'bg-white hover:bg-slate-50/90 text-slate-700'
                }`}
              >
                {/* Icon */}
                <div
                  className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#003a70] group-hover:text-blue-800'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10" />
                </div>

                {/* Text Label */}
                <span
                  className={`text-[13px] sm:text-sm lg:text-[17px] font-bold tracking-tight leading-snug ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-800 group-hover:text-slate-950'
                  }`}
                >
                  {item.label}
                </span>

                {/* Subtle right chevron for the top featured consultation item on mobile */}
                {isFeaturedOnMobile && (
                  <ArrowRight
                    className={`w-4 h-4 ml-auto shrink-0 transition-transform duration-200 group-hover:translate-x-1 lg:hidden ${
                      isActive ? 'text-white/80' : 'text-[#003a70]'
                    }`}
                  />
                )}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
