import { useTranslation } from 'react-i18next'
import laparoscopicBg from '../../../../assets/speciality/laproscopic/Laparoscopic-image-1.png'

export default function LaparoscopicHero() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  return (
    <section className="relative w-full pt-20 sm:pt-22 bg-slate-950">
      {/* Compact Banner with decreased height and unshaded full image */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[290px] lg:h-[330px] xl:h-[350px] overflow-hidden">
        {/* Actual Image - 100% bright and unshaded */}
        <img
          src={laparoscopicBg}
          alt={isHindi ? 'लैप्रोस्कोपिक सर्जरी' : 'Laparoscopic Surgery'}
          className="w-full h-full object-cover object-center block"
        />

        {/* Text container without any shading over the right side */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold tracking-tight text-slate-900 leading-tight">
                {isHindi ? (
                  <>
                    लैप्रोस्कोपिक <span className="text-[#ea580c]">सर्जरी</span>
                  </>
                ) : (
                  <>
                    Laparoscopic <span className="text-[#ea580c]">Surgery</span>
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
