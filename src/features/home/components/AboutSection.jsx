import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const { t } = useTranslation('home')
  const sectionRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)

  const paragraphs = t('about.paragraphs', { returnObjects: true }) || []
  const stats = t('about.stats', { returnObjects: true }) || []

  // Smooth entrance and number counter animation with GSAP & ScrollTrigger
  useGSAP(
    () => {
      if (!sectionRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true
        }
      })

      // Animate left narrative column
      tl.fromTo(
        leftColRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out'
        }
      )

      // Animate stat items in right column
      tl.fromTo(
        rightColRef.current?.querySelectorAll('.stat-item') || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out'
        },
        '-=0.45'
      )

      // Smooth number count-up animation for stats (e.g. 0 -> 40+, 100+, 250+, 15+)
      const statElements = rightColRef.current?.querySelectorAll('.stat-item') || []
      statElements.forEach((item, index) => {
        const numEl = item.querySelector('.stat-number')
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

        // Set initial 0 value before count-up starts
        numEl.textContent = `${prefix}0${suffix}`

        const counterObj = { val: 0 }

        tl.to(
          counterObj,
          {
            val: targetNum,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              const currentVal = Math.round(counterObj.val)
              const formatted = hasComma ? currentVal.toLocaleString() : currentVal
              numEl.textContent = `${prefix}${formatted}${suffix}`
            },
            onComplete: () => {
              numEl.textContent = originalText
            }
          },
          index === 0 ? '-=0.55' : '<'
        )
      })
    },
    { scope: sectionRef, dependencies: [stats] }
  )

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-white text-slate-800 py-10 sm:py-12 lg:py-14 border-t border-slate-100 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-10 xl:gap-14">
          
          {/* Left Column: Heading, Narrative (Expanded Width ~68%), and Badges */}
          <div ref={leftColRef} className="w-full lg:flex-[1.9] xl:flex-[2] flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-bold text-slate-900 tracking-tight leading-tight">
              {t('about.title')}
            </h2>

            <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-slate-600 text-[14px] sm:text-[14.5px] lg:text-[15px] leading-relaxed font-normal">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Clean Vertical Divider Line for Desktop */}
          <div className="hidden lg:block w-px bg-slate-200 self-stretch my-1 shrink-0" />

          {/* Right Column: 2x2 Clean Statistics Grid (Docked, Compact ~32%) */}
          <div
            ref={rightColRef}
            className="w-full lg:w-auto lg:flex-1 lg:max-w-[400px] shrink-0 flex flex-col justify-center lg:self-center py-2"
          >
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-7 sm:gap-y-9">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-item flex flex-col">
                  <span
                    data-value={stat.value}
                    className="stat-number text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-[#c12532] leading-none"
                  >
                    {stat.value}
                  </span>
                  <span className="text-slate-800 font-bold text-sm sm:text-base mt-2 leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
