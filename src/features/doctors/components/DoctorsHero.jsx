import { useTranslation } from 'react-i18next'
import doctorsHeroImg from '../../../assets/doctors/doctors-hero.jpg'

export default function DoctorsHero() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  return (
    <section className="relative w-full pt-20 sm:pt-22 bg-slate-950">
      {/* Compact Banner with decreased height matching specialty pages */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[290px] lg:h-[330px] xl:h-[350px] overflow-hidden">
        {/* Actual Image - 100% bright with object-position shifted down to show full heads */}
        <img
          src={doctorsHeroImg}
          alt={isHindi ? "हमारे विशेषज्ञ डॉक्टर्स - एजाज क्लिनिक" : "Meet Our Doctors - Ejaz Clinic"}
          className="w-full h-full object-cover block"
          style={{ objectPosition: 'center 20%' }}
        />

        {/* Text container overlay - centered in the middle horizontally, positioned at the bottom */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 sm:pb-6 md:pb-7 lg:pb-8 pointer-events-none">
          <div className="max-w-2xl mx-auto px-4 text-center flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-900 leading-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)]">
              {isHindi ? (
                <>
                  हमारे विशेषज्ञ <span className="text-[#ea580c]">डॉक्टर्स</span>
                </>
              ) : (
                <>
                  Meet Our <span className="text-[#ea580c]">Doctors</span>
                </>
              )}
            </h1>
            <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-[#ea580c] rounded-full mt-2 sm:mt-2.5 mx-auto shadow-xs" />
          </div>
        </div>
      </div>
    </section>
  )
}
