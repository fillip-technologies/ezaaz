import { useTranslation } from 'react-i18next'
import { Calendar, Clock, Star, Phone } from 'lucide-react'

import doctor1 from '../../../assets/home/doctor-image.jpg'
import doctor2 from '../../../assets/home/doctor-2.jpg'
import doctor3 from '../../../assets/home/doctor-3.jpg'
import doctor4 from '../../../assets/home/doctor-4.jpg'
import doctor5 from '../../../assets/home/doctor-5.jpg'
import doctor6 from '../../../assets/home/doctor-6.jpg'

const doctorImageMap = {
  'dr-shahzad': doctor1,
  'dr-ejaz-ali': doctor2,
  'dr-ortho-specialist': doctor3,
  'dr-internal-med': doctor4,
  'dr-onco-surgeon': doctor5,
  'dr-gynaecologist': doctor6,
  'dr-urologist': doctor3,
  'dr-plastic-surgeon': doctor6,
}

export default function DoctorsDirectorySection() {
  const { i18n } = useTranslation('home')
  const isHindi = i18n.language === 'hi'

  // Load all doctors from i18n data
  const rawDoctors = useTranslation('home').t('doctorsSection.doctors', { returnObjects: true })
  const doctorsList = Array.isArray(rawDoctors) && rawDoctors.length > 0 ? rawDoctors : []

  const scrollToBooking = () => {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="directory" className="relative w-full bg-slate-50/70 py-12 sm:py-16 lg:py-20 border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {doctorsList.map((doc) => {
            const photoSrc = doctorImageMap[doc.id] || doctor1

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Photo with Overlay Badge */}
                  <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={photoSrc}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Shadow at Bottom of Image */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                    {/* Experience Badge */}
                    <div className="absolute top-3 right-3 bg-[#003a70]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                      {doc.experience}
                    </div>

                    {/* Department Pill */}
                    <div className="absolute bottom-3 left-3 bg-[#ea580c] text-white px-2.5 py-0.5 rounded-md text-[11px] font-bold shadow-xs">
                      {doc.department}
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#ea580c] transition-colors">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500 shrink-0 text-xs font-bold pt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{doc.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-slate-500 mt-1 line-clamp-1">
                      {doc.degrees}
                    </p>

                    <p className="text-xs font-bold text-[#003a70] mt-2 line-clamp-1">
                      {doc.specialty}
                    </p>

                    {doc.subSpecialty && (
                      <p className="text-[11.5px] text-slate-500 italic mt-0.5 line-clamp-1">
                        {doc.subSpecialty}
                      </p>
                    )}

                    <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed border-t border-slate-100 pt-2.5">
                      {doc.bio}
                    </p>

                    {/* OPD Timing */}
                    <div className="mt-3.5 flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 text-slate-600 text-[11.5px]">
                      <Clock className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
                      <span className="font-medium truncate">{doc.timing}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0">
                  <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={scrollToBooking}
                      className="w-full py-2.5 px-2 rounded-xl bg-[#d9532f] hover:bg-[#c44322] text-white font-bold text-xs shadow-xs hover:shadow transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'अपॉइंटमेंट' : 'Book OPD'}</span>
                    </button>
                    <a
                      href="tel:+918002003000"
                      className="w-full py-2.5 px-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isHindi ? 'कॉल करें' : 'Call Now'}</span>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
