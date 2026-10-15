import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  Activity,
  Award,
  Users,
  Stethoscope,
  Volume2,
  VolumeX
} from 'lucide-react'
import ejazHeroVideo from '../../../assets/home/ejaz-home.mp4'

export default function HeroSection() {
  const { t } = useTranslation('home')
  const videoRef = useRef(null)
  const heroRef = useRef(null)
  const statsBarRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay prevented:', err)
      })
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const statsList = t('hero.stats', { returnObjects: true }) || []

  // Map icons to data metrics
  const getStatIcon = (id, index) => {
    switch (id) {
      case 'operations':
        return Activity
      case 'experience':
        return Award
      case 'patients':
        return Users
      case 'doctors':
        return Stethoscope
      default:
        return [Activity, Award, Users, Stethoscope][index % 4]
    }
  }

  // Smooth number count-up animation function
  const animateCounters = useCallback(() => {
    if (!statsBarRef.current) return
    const statItems = statsBarRef.current.querySelectorAll('.hero-stat-item') || []

    statItems.forEach((item, index) => {
      const numEl = item.querySelector('.hero-stat-number')
      if (!numEl) return

      const originalText = numEl.getAttribute('data-value') || numEl.textContent || ''
      const match = originalText.match(/^([^\d]*)(\d+[\d,.]*)([^\d]*)$/)
      if (!match) return

      const prefix = match[1] || ''
      const rawNum = match[2].replace(/,/g, '')
      const targetNum = parseFloat(rawNum)
      const suffix = match[3] || ''
      const hasComma = match[2].includes(',')

      if (isNaN(targetNum)) return

      numEl.textContent = `${prefix}0${suffix}`
      const counterObj = { val: 0 }

      gsap.to(counterObj, {
        val: targetNum,
        duration: 2.2,
        ease: 'power2.out',
        delay: index * 0.1,
        onUpdate: () => {
          const currentVal = Math.round(counterObj.val)
          const formatted = hasComma ? currentVal.toLocaleString() : currentVal
          numEl.textContent = `${prefix}${formatted}${suffix}`
        },
        onComplete: () => {
          numEl.textContent = originalText
        }
      })
    })
  }, [])

  // GSAP Animations: Entrance, Floating Levitation & Live Number Counter
  useGSAP(
    () => {
      if (!statsBarRef.current) return

      // 1. Initial spring entrance
      const entranceTl = gsap.timeline({ defaults: { ease: 'back.out(1.5)' } })

      entranceTl.fromTo(
        statsBarRef.current,
        { opacity: 0, y: 45, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          delay: 0.2,
          onComplete: () => {
            // 2. Start continuous weightless levitation/floating animation after entrance
            gsap.to(statsBarRef.current, {
              y: -6,
              duration: 2.6,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            })
          }
        }
      )

      // 3. Staggered item fade & pop
      const statItems = statsBarRef.current.querySelectorAll('.hero-stat-item') || []
      entranceTl.fromTo(
        statItems,
        { opacity: 0, scale: 0.9, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        },
        '-=0.6'
      )

      // 4. Run number counter
      animateCounters()

      // 5. If welcome intro finishes, replay counter
      const handleIntroClosed = () => {
        animateCounters()
      }
      window.addEventListener('welcome-intro-closed', handleIntroClosed)

      return () => {
        window.removeEventListener('welcome-intro-closed', handleIntroClosed)
      }
    },
    { scope: heroRef, dependencies: [animateCounters] }
  )

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-end"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={ejazHeroVideo}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle Transparent Bottom Gradient Overlay for Contrast Behind Data Bar */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Floating Video Audio Toggle */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        title={isMuted ? 'Unmute video' : 'Mute video'}
        className="absolute top-24 right-4 sm:right-8 z-20 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
        )}
      </button>

      {/* SLIM FLOATING TRANSPARENT PILL STATS BAR WITH FULL ANIMATION */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-10">
        <div
          ref={statsBarRef}
          className="relative rounded-2xl lg:rounded-full bg-slate-950/70 backdrop-blur-2xl border border-white/25 px-4 sm:px-7 lg:px-9 py-2.5 sm:py-3 lg:py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_25px_70px_rgba(234,88,12,0.25)]"
        >
          {/* Continuous Glass Light Shimmer Reflection */}
          <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none animate-pill-shimmer" />

          {/* Subtle frosted glow accents in background */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-orange-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* 4 Data Items in a Slim Horizontal Flex / Compact Grid */}
          <div className="relative z-10 grid grid-cols-2 lg:flex lg:items-center lg:justify-between gap-3 sm:gap-4 lg:gap-2">
            {statsList.map((stat, idx) => {
              const IconComponent = getStatIcon(stat.id, idx)
              const isLast = idx === statsList.length - 1
              const isOperations = stat.id === 'operations' || idx === 0

              return (
                <div key={stat.id || idx} className="contents lg:flex lg:items-center lg:flex-1">
                  {/* Single Stat Item (Slim Horizontal Layout with micro-interactions) */}
                  <div className="hero-stat-item flex items-center gap-2.5 sm:gap-3.5 px-1.5 sm:px-2.5 lg:px-3 py-1 lg:py-0 w-full group cursor-pointer transition-all duration-300 hover:-translate-y-0.5">
                    {/* Compact Icon with Heartbeat / Breathing Pulse */}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg lg:rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#ea580c] group-hover:text-white group-hover:rotate-3 transition-all duration-300 shadow-sm">
                      <IconComponent
                        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 ${
                          isOperations ? 'animate-heart-beat-subtle' : ''
                        }`}
                      />
                    </div>

                    {/* Number and Label side-by-side with hover glow */}
                    <div className="flex flex-col min-w-0">
                      <div className="text-lg sm:text-xl lg:text-2xl xl:text-[25px] font-black text-white group-hover:text-amber-300 tracking-tight leading-tight flex items-baseline transition-colors duration-200">
                        <span className="hero-stat-number" data-value={stat.value}>
                          {stat.value}
                        </span>
                      </div>
                      <span className="text-[11px] sm:text-[12px] lg:text-[13px] font-semibold text-slate-200/90 tracking-tight leading-tight truncate group-hover:text-orange-200 transition-colors duration-200">
                        {stat.label}
                      </span>
                    </div>
                  </div>

                  {/* Clean Vertical Divider between items on desktop */}
                  {!isLast && (
                    <div className="hidden lg:block w-px h-8 bg-white/15 shrink-0 mx-2 xl:mx-4" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
