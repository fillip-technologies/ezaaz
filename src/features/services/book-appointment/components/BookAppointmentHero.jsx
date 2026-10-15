import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import appointmentHeroBg from '../../../../assets/appointment/appointment-hero.jpg'
import { SPECIALTY_TAGS } from '../../../doctors/specialtyTags'

export default function BookAppointmentHero({
  onFilterGo,
  currentSpecialty = 'all',
  currentLocation = 'patna',
  altTextEn = 'Book an Appointment - Ejaz Hospital',
  altTextHi = 'अपॉइंटमेंट बुक करें - एजाज हॉस्पिटल'
}) {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  const [location, setLocation] = useState(currentLocation)
  const [specialty, setSpecialty] = useState(currentSpecialty)

  const specialtiesList = [
    { id: 'all', name: isHindi ? 'सभी विशेषज्ञताएं' : 'All Specialities' },
    ...SPECIALTY_TAGS.map((tag) => ({ id: tag.id, name: isHindi ? tag.hi : tag.en }))
  ]

  const handleGo = (e) => {
    if (e) e.preventDefault()
    if (onFilterGo) {
      onFilterGo({ location, specialty })
    }
  }

  return (
    <section className="relative w-full pt-20 sm:pt-22 bg-slate-950">
      {/* Banner matching user UI reference */}
      <div className="relative w-full h-[240px] sm:h-[280px] md:h-[310px] lg:h-[340px] overflow-hidden">
        {/* Actual Image Background */}
        <img
          src={appointmentHeroBg}
          alt={isHindi ? altTextHi : altTextEn}
          className="w-full h-full object-cover block"
          style={{ objectPosition: 'center 25%' }}
        />

        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-slate-900/45" />

        {/* Content Container */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="max-w-3xl">
              {/* Heading matching screenshot: Book an Appointment */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                {isHindi ? 'अपॉइंटमेंट बुक करें' : 'Book an Appointment'}
              </h1>

              {/* Three Pill Filter Controls matching reference screenshot */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                {/* 1. Location Pill: Patna v (Blue Background, White Text) */}
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="appearance-none bg-[#205493] hover:bg-[#1a477d] text-white font-bold text-xs sm:text-sm pl-5 sm:pl-6 pr-9 sm:pr-10 py-2.5 sm:py-3 rounded-full cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
                  >
                    <option value="patna" className="bg-slate-900 text-white">Patna</option>
                    <option value="all" className="bg-slate-900 text-white">{isHindi ? 'सभी स्थान' : 'All Locations'}</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
                </div>

                {/* 2. Speciality Pill: Select Speciality v (White Background, Blue Text) */}
                <div className="relative">
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="appearance-none bg-white hover:bg-slate-50 text-[#205493] font-bold text-xs sm:text-sm pl-5 sm:pl-6 pr-9 sm:pr-10 py-2.5 sm:py-3 rounded-full cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-[#205493]/30 transition-colors"
                  >
                    <option value="all" className="text-slate-800">
                      {isHindi ? 'विशेषज्ञता चुनें' : 'Select Speciality'}
                    </option>
                    {specialtiesList.map((spec) => (
                      <option key={spec.id} value={spec.id} className="text-slate-800">
                        {spec.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#205493] pointer-events-none" />
                </div>

                {/* 3. Go Pill Button: (Light Grey Background, Dark Text) */}
                <button
                  type="button"
                  onClick={handleGo}
                  className="bg-[#cbd5e1] hover:bg-[#94a3b8] active:bg-[#64748b] text-slate-700 hover:text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-md transition-all cursor-pointer select-none"
                >
                  {isHindi ? 'खोजें' : 'Go'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
