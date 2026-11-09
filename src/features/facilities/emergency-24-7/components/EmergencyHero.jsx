import { useTranslation } from 'react-i18next'
import ambulanceHeroBg from '../../../../assets/emergency.png'

export default function EmergencyHero({
  titlePrefixEn = '24×7 Emergency &',
  titleHighlightEn = 'Trauma Care',
  titlePrefixHi = '24×7 आपातकालीन एवं',
  titleHighlightHi = 'ट्रॉमा सेवा',
  altTextEn = '24/7 Emergency and Trauma Care - Ejaz Clinic',
  altTextHi = '24/7 आपातकालीन एवं ट्रॉमा केयर - एजाज क्लिनिक'
}) {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  return (
    <section className="relative w-full pt-20 sm:pt-22 bg-slate-950">
      {/* Compact Banner with matching standard height across all hospital pages */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[290px] lg:h-[330px] xl:h-[350px] overflow-hidden">
        {/* Actual Image - ambulance-image.jpg with optimal object-position to show ambulance and call illustration */}
        <img
          src={ambulanceHeroBg}
          alt={isHindi ? altTextHi : altTextEn}
          className="w-full h-full object-cover block"
          style={{ objectPosition: 'center 60%' }}
        />

        {/* Text container without heavy shading over the right side */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold tracking-tight text-slate-900 leading-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)]">
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
