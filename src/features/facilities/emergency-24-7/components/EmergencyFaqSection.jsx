import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'

export default function EmergencyFaqSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'
  const [openFaq, setOpenFaq] = useState(0)

  const emergencyFaqs = [
    {
      qEn: 'How fast does the ambulance reach my location?',
      qHi: 'एम्बुलेंस मरीज तक पहुंचने में कितना समय लेती है?',
      aEn: 'Our GPS-tracked ambulances are stationed for optimal city-wide coverage with typical dispatch times within 2 to 3 minutes of call confirmation.',
      aHi: 'हमारी जीपीएस-सक्षम एम्बुलेंस कॉल पुष्टि के 2 से 3 मिनट के भीतर तत्काल रवाना कर दी जाती हैं ताकि मरीज तक कम से कम समय में पहुंचा जा सके।'
    },
    {
      qEn: 'Are specialized surgeons available for emergency surgery at night?',
      qHi: 'क्या रात में भी आपातकालीन सर्जरी के लिए वरिष्ठ सर्जन उपलब्ध रहते हैं?',
      aEn: 'Yes. Our emergency operating suites, senior laparoscopic surgeons, trauma teams, and critical-care anaesthesiologists are operational 24/7.',
      aHi: 'हाँ, हमारे मॉड्यूलर इमरजेंसी ऑपरेशन थिएटर, वरिष्ठ लैप्रोस्कोपिक सर्जन, ट्रॉमा टीम और क्रिटिकल-केयर एनेस्थेटिस्ट 24 घंटे सक्रिय रहते हैं।'
    },
    {
      qEn: 'Do emergency ambulances have ventilators and oxygen?',
      qHi: 'क्या आपकी एम्बुलेंस में वेंटिलेटर और ऑक्सीजन की सुविधा उपलब्ध है?',
      aEn: 'Yes. Our Advanced Cardiac Life Support (ACLS) ambulances are mobile ICUs equipped with transport ventilators, multi-channel monitors, defibrillators, suction, and dual oxygen supply.',
      aHi: 'हाँ, हमारी ACLS एम्बुलेंस पूर्णतः मोबाइल आईसीयू हैं, जिनमें ट्रांसपोर्ट वेंटिलेटर, मल्टी-पैरा मॉनिटर, डीफाइब्रिलेटर और ऑक्सीजन की निरंतर आपूर्ति मौजूद रहती है।'
    },
    {
      qEn: 'What documents are required during emergency hospital admission?',
      qHi: 'आपातकालीन भर्ती के समय किन दस्तावेजों की आवश्यकता होती है?',
      aEn: 'Emergency stabilization always takes immediate precedence over paperwork. Any available photo ID and health insurance card can be provided after initial medical triage.',
      aHi: 'आपातकालीन स्थिति में मरीज का तत्काल उपचार बिना किसी कागजी देरी के शुरू किया जाता है। प्रारंभिक उपचार के बाद कोई भी पहचान पत्र व बीमा कार्ड जमा किया जा सकता है।'
    }
  ]

  return (
    <section className="relative w-full bg-[#f8f9fc] text-slate-800 py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c] block mb-1">
            {isHindi ? 'महत्वपूर्ण जानकारी' : 'Emergency Guidance'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isHindi ? 'आपातकालीन सेवा से जुड़े सामान्य प्रश्न' : 'Frequently Asked Emergency Questions'}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {emergencyFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#ea580c] transition-colors cursor-pointer"
                >
                  <span>{isHindi ? faq.qHi : faq.qEn}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-orange-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {isHindi ? faq.aHi : faq.aEn}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
