import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { SPECIALTY_ICONS, LaparoscopicIcon } from '../../../components/icons/SpecialtyIcons'

export default function SpecialtiesSection() {
  const { t } = useTranslation('home')

  // Load items from i18n with guaranteed 12-item fallback
  const rawSpecialties = t('specialtiesSection.items', { returnObjects: true })
  const specialties = Array.isArray(rawSpecialties) && rawSpecialties.length > 0
    ? rawSpecialties
    : [
        { id: 'hernia', name: 'Hernia Surgery' },
        { id: 'cancer-surgery', name: 'Cancer Surgery' },
        { id: 'urology', name: 'Urology' },
        { id: 'gynaecology', name: 'Gynaecology & Obstetrics' },
        { id: 'internal-medicine', name: 'General Internal Medicine' },
        { id: 'gastrointestinal', name: 'Gastrointestinal Surgery' },
        { id: 'plastic-surgery', name: 'Plastic Surgery' },
        { id: 'anaesthesia', name: 'Anaesthesia & Critical Care' }
      ]

  const getSpecialtyUrl = (id) => {
    if (!id) return '#departments'
    const cleanId = String(id).toLowerCase().trim()
    switch (cleanId) {
      case 'laparoscopic':
      case 'laparoscopic-surgery':
        return '/speciality/laparoscopic'
      case 'cancer-surgery':
      case 'cancer':
      case 'oncology':
        return '/speciality/cancer-surgery'
      case 'hernia':
      case 'hernia-surgery':
        return '/speciality/hernia'
      case 'orthopaedics':
      case 'orthopedic':
      case 'orthopaedics-surgery':
        return '/speciality/orthopaedics'
      case 'general-surgery':
        return '/speciality/general-surgery'
      case 'gastrointestinal':
      case 'gastro':
      case 'gastrointestinal-surgery':
        return '/speciality/gastrointestinal'
      case 'physiotherapist':
      case 'physiotherapy':
      case 'rehabilitation':
        return '/speciality/physiotherapy'
      case 'anaesthesia':
      case 'anesthesia':
        return '/speciality/anaesthesia'
      case 'plastic-surgery':
      case 'plastic':
        return '/speciality/plastic-surgery'
      case 'urology':
        return '/speciality/urology'
      case 'internal-medicine':
      case 'general-internal':
      case 'medicine':
        return '/speciality/general-internal'
      case 'gynaecology':
      case 'gynecology':
      case 'gyanecology':
      case 'obstetrics':
        return '/speciality/gynaecology'
      default:
        return '#departments'
    }
  }

  const handleItemClick = (e, id) => {
    const url = getSpecialtyUrl(id)
    if (url && url.startsWith('/speciality/')) {
      e.preventDefault()
      if (window.history?.pushState) {
        window.history.pushState(null, '', url)
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: url }))
      } else {
        window.location.href = url
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }

  return (
    <section
      id="departments"
      className="relative w-full bg-[#f8f9fa] py-10 sm:py-20 lg:py-24 scroll-mt-20 border-b border-slate-200/80"
    >
      <div id="specialities" className="absolute -top-24 pointer-events-none" />
      <div id="speciality" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="mb-6 sm:mb-10 lg:mb-12 max-w-3xl">
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 tracking-tight leading-tight">
            {t('specialtiesSection.title')}
          </h2>
          <p className="mt-2 sm:mt-3 text-slate-600 text-xs sm:text-base lg:text-[15.5px] leading-relaxed">
            {t('specialtiesSection.subtitle')}
          </p>
        </div>

        {/* Unified Card Container with Connected Grid */}
        <div className="bg-slate-200 rounded-xl sm:rounded-3xl border border-slate-200/90 shadow-xs sm:shadow-sm overflow-hidden">
          {/* Phone: 6-column base grid (3 items per row for rows 1 & 2, equal half-half in row 3)
              Tablet & Desktop: 4 columns (exactly 2 rows of 4 items) */}
          <div className="grid grid-cols-6 sm:grid-cols-4 gap-[1px] bg-slate-200">
            {specialties.map((item, index) => {
              const IconComp = SPECIALTY_ICONS[item.id] || LaparoscopicIcon
              // First 6 items take 2 columns on mobile (3 items/row); last 2 items take 3 columns on mobile (50% each = half-half)
              const spanClass = index >= 6 ? 'col-span-3 sm:col-span-1' : 'col-span-2 sm:col-span-1'

              return (
                <a
                  key={item.id}
                  href={getSpecialtyUrl(item.id)}
                  onClick={(e) => handleItemClick(e, item.id)}
                  className={`group relative bg-white hover:bg-slate-50/80 active:bg-orange-50/30 p-2.5 py-4 sm:p-6 lg:p-8 min-h-[115px] sm:min-h-[175px] lg:min-h-[200px] flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer select-none active:scale-[0.98] ${spanClass}`}
                >
                  {/* Clean Medical Line-Art Icon with Red Accents */}
                  <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-1.5 sm:mb-3.5 transition-transform duration-300 group-hover:scale-110 group-active:scale-95 pointer-events-none">
                    <IconComp className="w-full h-full" />
                  </div>

                  {/* Specialty Title */}
                  <h3 className="text-xs sm:text-[14.5px] lg:text-[15.5px] font-semibold sm:font-bold text-slate-800 group-hover:text-slate-950 transition-colors duration-200 leading-tight sm:leading-snug tracking-tight px-0.5 sm:px-1 pointer-events-none line-clamp-2 min-h-[2rem] sm:min-h-0 flex items-center justify-center">
                    {item.name}
                  </h3>

                  {/* Circular Orange Arrow Button (Visible on desktop hover) */}
                  <div className="mt-2 sm:mt-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#ea580c] text-white hidden sm:flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-xs pointer-events-none">
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </a>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
