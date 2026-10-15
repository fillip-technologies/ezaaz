import { useTranslation } from 'react-i18next'
import { PhoneCall, Ambulance, HeartPulse, Activity } from 'lucide-react'

export default function EmergencyHotlinesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  const hotlines = [
    {
      title: isHindi ? '24×7 इमरजेंसी एवं ट्रॉमा' : '24×7 Emergency & Trauma',
      subtitle: isHindi ? 'तात्कालिक कैजुअल्टी एवं मेडिकल रिस्पांस' : 'Immediate casualty & critical resuscitation',
      number: '+91 6203 770 070',
      badge: isHindi ? 'प्राथमिक हेल्पलाइन' : 'Primary Hotline',
      icon: PhoneCall,
      highlight: true
    },
    {
      title: isHindi ? '24×7 एम्बुलेंस सेवा' : '24×7 Ambulance Fleet',
      subtitle: isHindi ? 'ऑक्सीजन एवं वेंटिलेटर युक्त मोबाइल आईसीयू' : 'Advanced life-support mobile ICU transit',
      number: '+91 6203 770 071',
      badge: isHindi ? 'त्वरित पिकअप' : 'Rapid Dispatch',
      icon: Ambulance,
      highlight: false
    },
    {
      title: isHindi ? '24×7 क्रिटिकल केयर आईसीयू' : '24×7 Critical Care ICU',
      subtitle: isHindi ? 'मल्टी-पैरा मॉनिटर एवं लाइफ सपोर्ट बेड' : 'Continuous cardiac & invasive hemodynamic triage',
      number: '+91 6203 770 072',
      badge: isHindi ? 'लेवल-1 आईसीयू' : 'Level-1 ICU',
      icon: HeartPulse,
      highlight: false
    },
    {
      title: isHindi ? '24×7 इमरजेंसी ओटी' : '24×7 Emergency OT',
      subtitle: isHindi ? 'तत्काल लैप्रोस्कोपिक एवं ट्रॉमा सर्जरी' : 'On-call emergency surgeons & anaesthetists',
      number: '+91 6203 770 073',
      badge: isHindi ? 'सक्रिय 24 घंटे' : 'Round-the-clock',
      icon: Activity,
      highlight: false
    }
  ]

  return (
    <section className="relative w-full bg-[#f8f9fc] text-slate-800 py-10 sm:py-12 border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {hotlines.map((item, idx) => {
            const IconComp = item.icon
            return (
              <div
                key={idx}
                className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between group ${
                  item.highlight
                    ? 'bg-gradient-to-br from-white via-orange-50/40 to-white border-orange-300 shadow-md hover:shadow-xl hover:-translate-y-1 ring-1 ring-orange-400/20'
                    : 'bg-white border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        item.highlight
                          ? 'bg-[#ea580c] text-white shadow-md shadow-orange-500/20'
                          : 'bg-slate-100 text-[#003a70]'
                      }`}
                    >
                      <IconComp className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                        item.highlight
                          ? 'bg-red-100 text-red-600 animate-pulse'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <a
                    href={`tel:${item.number.replace(/\s+/g, '')}`}
                    className="text-sm font-bold text-[#ea580c] hover:text-[#c2410c] flex items-center justify-between group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span className="tracking-wide">{item.number}</span>
                    <span className="text-base font-semibold">→</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
