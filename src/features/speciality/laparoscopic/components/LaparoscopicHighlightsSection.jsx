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

export default function LaparoscopicHighlightsSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const highlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Minimally Invasive Surgical Specialists With Decades of Operating Precision",
      textHi: 'एजाज क्लिनिक के प्रतिष्ठित मिनिमली इनवेसिव सर्जिकल विशेषज्ञों के नेतृत्व में दशकों की ऑपरेटिंग सटीकता'
    },
    {
      num: '02',
      textEn: 'State-Of-The-Art 4K Ultra-HD Optical Laparoscopy Towers For Sub-Millimeter Anatomical Clarity',
      textHi: 'उप-मिलीमीटर एनाटोमिकल स्पष्टता के लिए अत्याधुनिक 4K अल्ट्रा-एचडी ऑप्टिकल लैप्रोस्कोपी टावर्स'
    },
    {
      num: '03',
      textEn: 'Minimal Scarring & Tissue Trauma With Advanced 3mm–5mm Micro-Keyhole Port Techniques',
      textHi: 'उन्नत 3mm–5mm माइक्रो-कीहोल पोर्ट तकनीकों के साथ न्यूनतम निशान और ऊतक आघात'
    },
    {
      num: '04',
      textEn: 'Accelerated 24–48 Hour Patient Discharge With Rapid Post-Operative Pain-Free Recovery',
      textHi: 'तेजी से पोस्ट-ऑपरेटिव दर्द-मुक्त रिकवरी के साथ 24–48 घंटे में त्वरित डिस्चार्ज'
    },
    {
      num: '05',
      textEn: 'Comprehensive Range Of Complex Gastrointestinal, Gallbladder, Hernia & Bariatric Interventions',
      textHi: 'जटिल गैस्ट्रोइंटेस्टाइनल, पित्ताशय, हर्निया और बेरिएट्रिक प्रक्रियाओं की व्यापक श्रृंखला'
    },
    {
      num: '06',
      textEn: 'Zero Compromise Sterilization Standards And 24/7 Dedicated Emergency Surgical Care Support',
      textHi: 'शून्य-समझौता नसबंदी मानक और 24/7 समर्पित आपातकालीन सर्जिकल केयर सहायता'
    }
  ]

  return (
    <section className="relative w-full bg-white py-14 sm:py-18 lg:py-20 border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Heading matching UI Reference */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight mb-8 sm:mb-10">
          {isHindi ? (
            <>
              लैप्रोस्कोपिक केयर <span className="text-[#ea580c]">हाइलाइट्स</span>
            </>
          ) : (
            <>
              Laparoscopic Care <span className="text-[#ea580c]">Highlights</span>
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
