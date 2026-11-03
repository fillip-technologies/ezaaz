import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Activity,
  CheckCircle2,
  Scan,
  ShieldCheck,
  Layers,
  Radio,
  Zap,
  Sparkles
} from 'lucide-react'

import ctScanImg from '../../../../assets/radiology/ct-scan.jpg'
import xrayImg from '../../../../assets/radiology/x-ray.jpg'

export default function RadiologyServicesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressIntervalRef = useRef(null)

  const services = [
    {
      id: 'ct-scan',
      num: '01',
      titleEn: 'CT Scan',
      titleHi: 'सीटी स्कैन (CT Scan)',
      fullTitleEn: 'Multi-Slice Computerized Tomography',
      fullTitleHi: 'मल्टी-स्लाइस कम्प्यूटरीकृत टोमोग्राफी',
      tagEn: 'Sub-Second Cross-Sectional Scan',
      tagHi: 'अल्ट्रा-फास्ट क्रॉस-सेक्शनल स्कैन',
      descEn:
        'Detailed cross-sectional 3D anatomical imaging for rapid emergency triage, trauma assessment, internal pathology, and accurate surgical guidance.',
      descHi:
        'आपातकालीन ट्रॉमा, आंतरिक पैथोलॉजी और सटीक सर्जिकल मार्गदर्शन के लिए विस्तृत क्रॉस-अनुभागीय 3D इमेजिंग।',
      image: ctScanImg,
      specsEn: [
        'High-Speed Multi-Slice Reconstruction',
        'Smart ALARA Low-Radiation Protocol',
        '3D Vascular & Skeletal Modeling',
        '24/7 Dedicated Emergency Triage'
      ],
      specsHi: [
        'हाई-स्पीड मल्टी-स्लाइस रीकंस्ट्रक्शन',
        'स्मार्ट ALARA कम-विकिरण प्रोटोकॉल',
        '3D संवहनी एवं अस्थि मॉडलिंग',
        '24/7 समर्पित आपातकालीन ट्राइएज'
      ],
      metricsEn: [
        { label: 'Slice Speed', val: '< 0.5 Seconds' },
        { label: 'Dose', val: 'Ultra-Low Dose' },
        { label: 'Availability', val: '24×7 Instant' }
      ],
      metricsHi: [
        { label: 'स्लाइस गति', val: '< 0.5 सेकंड' },
        { label: 'डोज़', val: 'अल्ट्रा-लो रेडिएशन' },
        { label: 'उपलब्धता', val: '24×7 त्वरित' }
      ]
    },
    {
      id: 'x-ray',
      num: '02',
      titleEn: 'Digital X-Ray',
      titleHi: 'डिजिटल एक्स-रे (Digital X-Ray)',
      fullTitleEn: 'High-Frequency Flat-Panel Radiography',
      fullTitleHi: 'हाई-फ्रीक्वेंसी फ्लैट-पैनल डिजिटल रेडियोग्राफी',
      tagEn: 'Instant High-Definition Radiograph',
      tagHi: 'त्वरित हाई-डेफिनिशन रेडियोग्राफ',
      descEn:
        'Quick, low-dose, and high-quality direct digital radiography delivering instant crystal-clear bone, chest, and orthopedic evaluations.',
      descHi:
        'त्वरित, न्यूनतम विकिरण और उच्च गुणवत्ता वाली डिजिटल रेडियोग्राफी जो हड्डियों और छाती का तत्काल स्पष्ट मूल्यांकन करती है।',
      image: xrayImg,
      specsEn: [
        'Direct Flat-Panel Digital Detectors',
        'Up to 75% Lower Radiation Exposure',
        'Instantaneous Cloud PACS Display',
        'Precision Orthopedic & Thoracic Focus'
      ],
      specsHi: [
        'प्रत्यक्ष फ्लैट-पैनल डिजिटल डिटेक्टर्स',
        '75% तक कम विकिरण प्रभाव',
        'त्वरित क्लाउड PACS डिस्प्ले',
        'सटीक आर्थोपेडिक एवं थोरैसिक जांच'
      ],
      metricsEn: [
        { label: 'Exposure', val: '-75% Reduced' },
        { label: 'Capture', val: 'Instantaneous' },
        { label: 'Sensor', val: 'Flat-Panel Direct' }
      ],
      metricsHi: [
        { label: 'रेडिएशन', val: '75% तक कम' },
        { label: 'कैप्चर', val: 'तत्काल दृश्य' },
        { label: 'सेंसर', val: 'फ्लैट-पैनल डायरेक्ट' }
      ]
    }
  ]

  const current = services[activeIdx]

  // Smooth Auto-Play Progress Bar & Modality Cycler
  useEffect(() => {
    if (isPaused) {
      clearInterval(progressIntervalRef.current)
      return
    }

    const duration = 5000 // 5 seconds per modality
    const interval = 50
    const step = (interval / duration) * 100

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((curr) => (curr + 1) % services.length)
          return 0
        }
        return prev + step
      })
    }, interval)

    return () => clearInterval(progressIntervalRef.current)
  }, [isPaused, services.length])

  const handleSelectService = (index) => {
    setActiveIdx(index)
    setProgress(0)
  }

  return (
    <section
      className="relative w-full bg-slate-950 text-white py-10 sm:py-12 lg:py-14 border-b border-white/10 overflow-hidden font-sans"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Injected Keyframes for Scanner Line & Radar Pulse */}
      <style>{`
        @keyframes scannerBeam {
          0% { top: 0%; opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { top: 98%; opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }
      `}</style>

      {/* Atmospheric High-Tech Medical Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(14, 165, 233, 0.45) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* SECTION HEADER - Compact */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5 sm:mb-6">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-[13px] font-bold tracking-wider text-[#ea580c] uppercase block mb-1">
              {isHindi ? 'हमारी सेवाएं' : 'OUR SERVICES'}
            </span>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {isHindi ? (
                <>
                  व्यापक <span className="text-[#ea580c]">इमेजिंग सेवाएं</span>
                </>
              ) : (
                <>
                  Comprehensive <span className="text-[#ea580c]">Imaging Services</span>
                </>
              )}
            </h2>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
            {isHindi
              ? 'हम सटीकता के साथ विभिन्न चिकित्सीय स्थितियों के त्वरित निदान और निगरानी के लिए उन्नत इमेजिंग सेवाओं की एक विस्तृत श्रृंखला प्रदान करते हैं।'
              : 'We offer a wide range of advanced imaging services to help diagnose and monitor a variety of medical conditions with sub-millimeter precision.'}
          </p>
        </div>

        {/* 1. TOP INTERACTIVE NAVIGATION TABS - Compact */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar">
          {services.map((item, idx) => {
            const isActive = activeIdx === idx
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectService(idx)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-[12.5px] font-bold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white shadow-[0_4px_16px_rgba(234,88,12,0.35)] scale-[1.02] border border-orange-400/40'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <span
                  className={`text-[11px] font-mono font-bold ${
                    isActive ? 'text-orange-200' : 'text-[#ea580c]'
                  }`}
                >
                  {item.num}
                </span>
                <span>{isHindi ? item.titleHi : item.titleEn}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            )
          })}
        </div>

        {/* 2. MAIN CINEMA ANIMATED SHOWCASE - Sleek Decreased Height */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl overflow-hidden mb-7 sm:mb-8">
          
          {/* Active Progress Bar across the top of the showcase */}
          <div className="w-full h-1 bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ea580c] via-cyan-400 to-[#ea580c] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* LEFT: Compact Scanner Viewport (7 Cols) */}
            <div className="lg:col-span-7 relative h-[220px] sm:h-[260px] md:h-[290px] lg:h-[310px] xl:h-[320px] bg-slate-950 overflow-hidden flex items-center justify-center group">
              
              {/* Active Image with smooth keyframe switch */}
              <img
                key={current.id}
                src={current.image}
                alt={isHindi ? current.titleHi : current.titleEn}
                className="w-full h-full object-cover object-center animate-in fade-in zoom-in-95 duration-400 block"
              />

              {/* Gradient Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/60 pointer-events-none" />

              {/* ANIMATED MEDICAL LASER SCAN LINE */}
              <div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] pointer-events-none"
                style={{
                  animation: 'scannerBeam 3.5s ease-in-out infinite'
                }}
              />

              {/* Corner HUD Crosshairs */}
              <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400/70 pointer-events-none" />
              <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400/70 pointer-events-none" />
              <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400/70 pointer-events-none" />
              <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400/70 pointer-events-none" />

            </div>

            {/* RIGHT: Compact Clinical Details Panel (5 Cols) */}
            <div className="lg:col-span-5 p-4 sm:p-5 lg:p-6 flex flex-col justify-between bg-gradient-to-b from-slate-900 to-slate-950">
              
              <div>
                {/* Modality Index & Tag */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c] flex items-center gap-1.5">
                    <Scan className="w-3 h-3" />
                    {isHindi ? current.tagHi : current.tagEn}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    #{current.num} / 02
                  </span>
                </div>

                {/* Modality Full Title */}
                <h3 className="mt-2 text-base sm:text-lg lg:text-[19px] font-bold text-white tracking-tight leading-snug">
                  {isHindi ? current.fullTitleHi : current.fullTitleEn}
                </h3>

                {/* Narrative Clinical Description */}
                <p className="mt-1.5 text-slate-300 text-xs sm:text-[12.5px] leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {isHindi ? current.descHi : current.descEn}
                </p>

                {/* Clinical Specifications List - 2-Column Balanced Grid */}
                <div className="mt-3 pt-2.5 border-t border-white/10">
                  <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#ea580c]" />
                    <span>{isHindi ? 'विशिष्ट तकनीकी क्षमताएं' : 'Key Clinical Capabilities'}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    {(isHindi ? current.specsHi : current.specsEn).map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-1.5 text-[11.5px] text-slate-200 leading-tight"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c] shrink-0 mt-0.5" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 3. COMPACT INTERACTIVE MODALITY CARDS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{isHindi ? 'दोनों प्रमुख इमेजिंग सुविधाएं' : 'Specialized Imaging Units'}</span>
            </h3>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {isHindi ? 'विस्तार से देखने के लिए किसी भी कार्ड पर क्लिक करें' : 'Click any unit to focus above'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-4 sm:gap-6">
            {services.map((item, idx) => {
              const isActive = activeIdx === idx
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectService(idx)}
                  className={`group relative rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col ${
                    isActive
                      ? 'bg-slate-900 border-[#ea580c] shadow-[0_6px_24px_rgba(234,88,12,0.22)] -translate-y-1 ring-1 ring-[#ea580c]/50'
                      : 'bg-slate-900/60 border-white/10 hover:border-[#ea580c]/60 hover:bg-slate-900 hover:-translate-y-1'
                  }`}
                >
                  {/* Image Frame with Zoom - Decreased Height */}
                  <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={isHindi ? item.titleHi : item.titleEn}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 block"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />

                    {/* Number Badge in top right */}
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-[#ea580c]">
                      {item.num}
                    </div>

                    {/* Active Unit Indicator Pill */}
                    {isActive && (
                      <div className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded-full bg-[#ea580c] text-white text-[9px] font-bold tracking-wider uppercase shadow-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>{isHindi ? 'सक्रिय' : 'ACTIVE'}</span>
                      </div>
                    )}
                  </div>

                  {/* Name Only */}
                  <div className="py-2.5 px-2.5 text-center bg-slate-900/90">
                    <h4
                      className={`text-xs sm:text-[13px] font-bold tracking-wide transition-colors truncate ${
                        isActive
                          ? 'text-[#ea580c]'
                          : 'text-slate-200 group-hover:text-white'
                      }`}
                    >
                      {isHindi ? item.titleHi : item.titleEn}
                    </h4>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
