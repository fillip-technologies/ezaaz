import { useTranslation } from 'react-i18next'
import { CheckCircle2, ShieldCheck, Clock, Calendar } from 'lucide-react'
import appointmentHeroBg from '../../../../assets/appointment/appointment-hero.jpg'

export default function AppointmentBookingHero() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  return (
    <section className="relative w-full pt-20 sm:pt-22 bg-slate-950">
      <div className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px] overflow-hidden">
        {/* Background Image */}
        <img
          src={appointmentHeroBg}
          alt={isHindi ? 'अपॉइंटमेंट बुकिंग - एजाज हॉस्पिटल' : 'Appointment Booking - Ejaz Hospital'}
          className="w-full h-full object-cover block"
          style={{ objectPosition: 'center 25%' }}
        />

        {/* Dark Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/70 to-slate-900/40" />

        {/* Content Container */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-wider mb-2.5 backdrop-blur-xs">
                <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>{isHindi ? 'ऑनलाइन अपॉइंटमेंट' : 'Online OPD Booking'}</span>
              </div>

              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                {isHindi ? (
                  <>
                    डॉक्टर <span className="text-[#ea580c]">अपॉइंटमेंट बुकिंग</span>
                  </>
                ) : (
                  <>
                    Book Your <span className="text-[#ea580c]">Doctor Appointment</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="mt-2 text-xs sm:text-sm md:text-[15px] text-slate-200 leading-relaxed max-w-xl">
                {isHindi
                  ? 'अपनी सुविधा के अनुसार डॉक्टर, तारीख और समय स्लॉट चुनें। तुरंत पुष्टि प्राप्त करें।'
                  : 'Select your preferred doctor, appointment date, and convenient time slot. Get instant confirmation.'}
              </p>

              {/* Trust Tags */}
              <div className="mt-3.5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isHindi ? 'सत्यापित विशेषज्ञ' : 'Verified Specialists'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{isHindi ? 'कम से कम प्रतीक्षा समय' : 'Zero Waiting Queue'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>{isHindi ? 'तुरंत एसएमएस पुष्टि' : 'Instant Confirmation'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
