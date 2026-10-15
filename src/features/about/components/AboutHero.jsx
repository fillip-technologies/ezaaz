import { useTranslation } from 'react-i18next'
import aboutHeroBg from '../../../assets/about/about.png'

export default function AboutHero() {
  const { i18n } = useTranslation(['common', 'home'])
  const isHindi = i18n?.language === 'hi'

  return (
    <section className="relative w-full pt-20 sm:pt-22 bg-slate-950">
      {/* Compact Banner matching standard hospital page hero design */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[290px] lg:h-[330px] xl:h-[350px] overflow-hidden">
        {/* Actual Image - crisp, unshaded and clear */}
        <img
          src={aboutHeroBg}
          alt={isHindi ? 'हमारे बारे में - एजाज क्लिनिक' : 'About Us - Ejaz Clinic'}
          className="w-full h-full object-cover object-center block"
        />

        {/* Text container aligned to left with signature orange accent underline */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold tracking-tight text-slate-900 leading-tight">
                {isHindi ? (
                  <>
                    हमारे <span className="text-[#ea580c]">बारे में</span>
                  </>
                ) : (
                  <>
                    About <span className="text-[#ea580c]">Us</span>
                  </>
                )}
              </h1>
              <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-[#ea580c] rounded-full mt-2.5 sm:mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
