import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import icuHeroVideo from '../../../../assets/icu/icu-videos.mp4'

export default function IcuHero({
  titlePrefixEn = 'ICU &',
  titleHighlightEn = 'Critical Care',
  titlePrefixHi = 'आईसीयू एवं',
  titleHighlightHi = 'क्रिटिकल केयर',
  ariaLabelEn = 'ICU and Critical Care Unit - Ejaz Clinic',
  ariaLabelHi = 'आईसीयू एवं क्रिटिकल केयर - एजाज क्लिनिक'
}) {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      })
    }
  }, [])

  return (
    <section className="relative w-full pt-20 sm:pt-22 bg-slate-950 font-sans">
      {/* Compact Banner matching standard hospital page hero design */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[290px] lg:h-[330px] xl:h-[350px] overflow-hidden bg-slate-950">
        {/* Background ICU Video from assets/icu/icu-videos.mp4 */}
        <video
          ref={videoRef}
          src={icuHeroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center block"
          aria-label={isHindi ? ariaLabelHi : ariaLabelEn}
        />

        {/* Soft gradient overlay for text readability without obscuring video */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Text container aligned to left with signature orange accent underline */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                {isHindi ? (
                  <>
                    {titlePrefixHi} <span className="text-[#ea580c]">{titleHighlightHi}</span>
                  </>
                ) : (
                  <>
                    {titlePrefixEn} <span className="text-[#ea580c]">{titleHighlightEn}</span>
                  </>
                )}
              </h1>
              <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-[#ea580c] rounded-full mt-2.5 sm:mt-3 shadow-xs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
