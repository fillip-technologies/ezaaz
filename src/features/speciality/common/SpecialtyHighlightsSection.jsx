import { useState, useRef, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Notched Card Component matching the reference S-curve corner and floating number
function NotchedHighlightCard({ num, text }) {
  const cardRef = useRef(null)
  const [dims, setDims] = useState({ w: 360, h: 96 })

  useLayoutEffect(() => {
    if (!cardRef.current) return
    const update = () => {
      if (cardRef.current) {
        const { offsetWidth, offsetHeight } = cardRef.current
        if (offsetWidth > 0 && offsetHeight > 0) {
          setDims({ w: offsetWidth, h: offsetHeight })
        }
      }
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(cardRef.current)
    return () => ro.disconnect()
  }, [])

  const { w, h } = dims

  // Exact S-curve stepped notch formula matching the reference image
  const pathD = `M 18 1
    L ${Math.max(18, w - 58)} 1
    C ${w - 44} 1, ${w - 42} 12, ${w - 38} 18
    C ${w - 34} 24, ${w - 26} 28, ${w - 16} 28
    C ${w - 6} 28, ${w - 1} 34, ${w - 1} 44
    L ${w - 1} ${Math.max(44, h - 18)}
    C ${w - 1} ${h - 6}, ${w - 6} ${h - 1}, ${w - 18} ${h - 1}
    L 18 ${h - 1}
    C 6 ${h - 1}, 1 ${h - 6}, 1 ${h - 18}
    L 1 18
    C 1 6, 6 1, 18 1 Z`

  return (
    <div
      ref={cardRef}
      className="group relative min-h-[92px] sm:min-h-[100px] flex items-center p-5 sm:p-6 pr-14 sm:pr-16 transition-all duration-300 hover:-translate-y-1 cursor-default"
    >
      {/* SVG Background and Border with exact S-curve notch */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_2px_8px_rgba(217,83,47,0.03)] group-hover:drop-shadow-[0_8px_20px_rgba(217,83,47,0.08)] transition-all duration-300"
        viewBox={`0 0 ${w} ${h}`}
      >
        <path
          d={pathD}
          fill="#ffffff"
          stroke="#fcd8ce"
          strokeWidth="1.5"
          className="group-hover:stroke-[#ea580c] transition-colors duration-300"
        />
      </svg>

      {/* Number 01-06 cleanly nestled in the top-right notch matching reference */}
      <span
        style={{ right: '14px', top: '7px' }}
        className="absolute font-bold text-[13px] sm:text-[14px] text-[#ea580c] select-none group-hover:scale-110 transition-transform duration-200"
      >
        {num}
      </span>

      {/* Card Content Text */}
      <p className="relative z-10 text-slate-800 text-[13px] sm:text-[14px] font-medium leading-relaxed group-hover:text-slate-950 transition-colors">
        {text}
      </p>
    </div>
  )
}

export default function SpecialtyHighlightsSection({
  titlePrefixEn = 'Clinical Care',
  titleHighlightEn = 'Highlights',
  titlePrefixHi = 'केयर',
  titleHighlightHi = 'हाइलाइट्स',
  highlights = []
}) {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  return (
    <section className="relative w-full bg-white py-14 sm:py-18 lg:py-20 border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Heading matching UI Reference */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight mb-8 sm:mb-10">
          {isHindi ? (
            <>
              {titlePrefixHi} <span className="text-[#ea580c]">{titleHighlightHi}</span>
            </>
          ) : (
            <>
              {titlePrefixEn} <span className="text-[#ea580c]">{titleHighlightEn}</span>
            </>
          )}
        </h2>

        {/* 3-Column Highlights Grid Matching UI Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {highlights.map((item) => (
            <NotchedHighlightCard
              key={item.num}
              num={item.num}
              text={isHindi ? item.textHi : item.textEn}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
