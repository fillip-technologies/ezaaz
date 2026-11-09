import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, HelpCircle } from 'lucide-react'

export default function IcuFaqSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'
  const [openIdx, setOpenIdx] = useState(0)

  const faqs = [
    {
      id: '01',
      qEn: 'What are the visiting hours and guidelines for families in the ICU?',
      qHi: 'आईसीयू में परिजनों के लिए मिलने का समय और नियम क्या हैं?',
      aEn: 'To safeguard critical patients against infection while keeping families closely connected, we have dedicated visiting hours twice daily (Morning 11:00 AM – 12:00 PM and Evening 5:00 PM – 6:00 PM). One designated family attendant is permitted bedside at a time with mandatory sanitization and sterile gowning protocols. Senior doctors provide comprehensive clinical updates during evening rounds.',
      aHi: 'मरीजों को संक्रमण से सुरक्षित रखने के लिए आईसीयू में मिलने का समय दिन में दो बार (सुबह 11:00 से 12:00 और शाम 5:00 से 6:00) निर्धारित है। एक समय में केवल एक परिजन को स्टरलाइज़ेशन के बाद अंदर जाने की अनुमति होती है। शाम के समय वरिष्ठ डॉक्टर मरीज की स्थिति पर विस्तृत काउंसलिंग देते हैं।'
    },
    {
      id: '02',
      qEn: 'Are senior intensivists and critical care doctors present 24/7 in the ICU?',
      qHi: 'क्या आईसीयू में 24 घंटे वरिष्ठ इंटेंसिविस्ट और क्रिटिकल केयर डॉक्टर मौजूद रहते हैं?',
      aEn: 'Yes, absolutely. Our intensive care units are staffed 24 hours a day, 365 days a year by certified critical care intensivists, experienced ICU residents, and dedicated critical-care nurses with a 1:1 or 1:2 nurse-to-patient ratio for continuous vigil.',
      aHi: 'हाँ, बिल्कुल। हमारी इंटेंसिव केयर यूनिट में चौबीसों घंटे (24×7) सर्टिफाइड क्रिटिकल केयर इंटेंसिविस्ट, मेडिकल ऑफिसर और प्रशिक्षित नर्सिंग स्टाफ 1:1 या 1:2 के अनुपात में निरंतर उपस्थित रहते हैं।'
    },
    {
      id: '03',
      qEn: 'What advanced life-support and ventilator systems are available in the ICU?',
      qHi: 'आईसीयू में कौन-से आधुनिक लाइफ-सपोर्ट और वेंटिलेटर उपकरण उपलब्ध हैं?',
      aEn: 'Our ICU features high-end multi-mode invasive and non-invasive mechanical ventilators (HFNO, BiPAP, CPAP), invasive hemodynamic arterial lines, bedside 2D echocardiography, continuous multi-channel telemetry, automated syringe pumps, and dedicated point-of-care arterial blood gas (ABG) analyzers.',
      aHi: 'हमारे आईसीयू में उन्नत इनवेसिव और नॉन-इनवेसिव मैकेनिकल वेंटिलेटर्स (HFNO, BiPAP), इनवेसिव हेमोडायनामिक आर्टेरियल मॉनिटरिंग, बेडसाइड 2D इको, मल्टी-चैनल टेलीमेट्री और पॉइंट-ऑफ-केयर एबीजी (ABG) मशीनें चौबीसों घंटे उपलब्ध हैं।'
    },
    {
      id: '04',
      qEn: 'How does Ejaz Clinic maintain strict zero-infection standards in the ICU?',
      qHi: 'आईसीयू में शून्य-संक्रमण (Zero-Infection) सुरक्षा कैसे सुनिश्चित की जाती है?',
      aEn: 'We maintain ultra-sterile positive-pressure environments with hospital-grade HEPA air filtration and continuous laminar airflow. Strict antimicrobial stewardship, barrier nursing protocols, daily microbiological surveillance, and autoclave sterilization prevent hospital-acquired infections (HAI).',
      aHi: 'हम HEPA एयर फिल्ट्रेशन और लैमिनार एयरफ्लो के साथ पॉजिटिव-प्रेशर स्टेराइल वातावरण बनाए रखते हैं। सख्त बैरियर नर्सिंग, नियमित माइक्रोबायोलॉजिकल सर्विलांस और स्टरलाइजेशन प्रोटोकॉल से संक्रमण की संभावना को नगण्य रखा जाता है।'
    },
    {
      id: '05',
      qEn: 'How do families receive daily medical updates and treatment plans?',
      qHi: 'मरीज के स्वास्थ्य की दैनिक प्रगति और इलाज की जानकारी परिजनों को कैसे दी जाती है?',
      aEn: 'Our primary treating consultants and lead intensivists hold daily structured family counseling sessions every evening to explain vital signs, laboratory progress, imaging results, and the road to recovery with complete transparency. In emergency situations, immediate communication is initiated around the clock.',
      aHi: 'मुख्य कंसल्टेंट और इंटेंसिविस्ट प्रतिदिन शाम को परिजनों के साथ विस्तृत काउंसलिंग सत्र आयोजित करते हैं, जिसमें वाइटल्स, जांच रिपोर्ट और आगे की उपचार योजना की पूरी पारदर्शिता के साथ जानकारी दी जाती है।'
    }
  ]

  return (
    <section className="relative w-full bg-white text-slate-800 py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 overflow-hidden font-sans">
      {/* Background subtle micro-dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#003a70 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/70 border border-orange-200/80 text-[#ea580c] text-xs font-bold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isHindi ? 'सामान्य प्रश्न एवं मरीज मार्गदर्शन' : 'PATIENT FAQS & INFORMATION'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isHindi ? (
              <>
                आईसीयू एवं क्रिटिकल केयर से जुड़े <span className="text-[#ea580c]">सामान्य प्रश्न</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="text-[#ea580c]">ICU Questions</span>
              </>
            )}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isHindi
              ? 'विजिटिंग नियम, 24×7 डॉक्टर उपलब्धता, संक्रमण नियंत्रण और मरीज काउंसलिंग से जुड़ी महत्वपूर्ण जानकारी।'
              : 'Important guidance regarding visiting hours, 24/7 doctor presence, infection safety protocols, and daily patient counseling.'}
          </p>

          <div className="w-16 h-1 bg-[#ea580c] rounded-full mx-auto mt-4" />
        </div>

        {/* 5 Accordion Items */}
        <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-orange-500/40 bg-orange-50/20 shadow-md ring-1 ring-orange-500/20'
                    : 'border-slate-200/90 bg-[#f8f9fc] hover:bg-slate-50 hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#ea580c] transition-colors cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
                        isOpen
                          ? 'bg-[#ea580c] text-white shadow-xs'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {faq.id}
                    </span>
                    <span className="leading-snug">{isHindi ? faq.qHi : faq.qEn}</span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#ea580c]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pl-12 sm:pl-14">
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
