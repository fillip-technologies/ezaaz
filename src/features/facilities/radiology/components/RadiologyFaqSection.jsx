import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, HelpCircle } from 'lucide-react'

export default function RadiologyFaqSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'
  const [openIdx, setOpenIdx] = useState(0)

  const faqs = [
    {
      id: '01',
      qEn: 'Do I need any special preparation before my scan (Fasting, Clothes, etc.)?',
      qHi: 'क्या स्कैन से पहले मुझे कोई विशेष तैयारी करनी होगी (उपवास, कपड़े आदि)?',
      aEn: 'Preparation depends on the specific scan. For abdominal ultrasound and contrast CT or MRI scans, 4 to 6 hours of fasting is typically required. For standard digital X-rays, no fasting is necessary. We recommend wearing comfortable, loose-fitting cotton clothes without metallic fasteners, buttons, or jewellery. Our radiology team provides clear preparation guidelines upon scheduling your appointment.',
      aHi: 'तैयारी जांच के प्रकार पर निर्भर करती है। पेट के अल्ट्रासाउंड एवं कंट्रास्ट सीटी/एमआरआई के लिए 4 से 6 घंटे का उपवास आवश्यक होता है। सामान्य डिजिटल एक्स-रे के लिए किसी उपवास की आवश्यकता नहीं होती। बिना धातु वाले ढीले-ढाले सूती कपड़े पहनकर आएं। अपॉइंटमेंट के समय आपको संपूर्ण निर्देश दे दिए जाते हैं।'
    },
    {
      id: '02',
      qEn: 'Is diagnostic imaging safe? How is radiation exposure controlled?',
      qHi: 'क्या रेडियोलॉजी जांच सुरक्षित है? रेडिएशन एक्सपोजर से बचाव के क्या उपाय हैं?',
      aEn: 'Yes, our diagnostic imaging is exceptionally safe. Ultrasound and MRI use acoustic sound waves and magnetic fields with zero ionizing radiation. For Digital X-rays and Multi-Slice CT scans, we strictly apply international ALARA (As Low As Reasonably Achievable) principles, ultra-sensitive digital detectors, and precision lead shielding to ensure you receive the lowest radiation dose possible without compromising image clarity.',
      aHi: 'हाँ, हमारी इमेजिंग प्रक्रियाएं अत्यंत सुरक्षित हैं। अल्ट्रासाउंड और एमआरआई में बिल्कुल भी रेडिएशन (शून्य विकिरण) नहीं होता। डिजिटल एक्स-रे और सीटी स्कैन में हम वैश्विक ALARA मानकों और आधुनिक लेड शील्डिंग का पालन करते हैं, जिससे न्यूनतम रेडिएशन में स्पष्ट डायग्नोस्टिक इमेज प्राप्त होती है।'
    },
    {
      id: '03',
      qEn: 'How quickly will I receive my scan images and verified radiologist report?',
      qHi: 'मुझे अपनी स्कैन रिपोर्ट और जांच परिणाम कितनी देर में प्राप्त होंगे?',
      aEn: 'Emergency and critical trauma scan interpretations are delivered within 30 to 60 minutes. Routine X-ray, Ultrasound, and CT reports are verified by our senior consultant radiologists within 2 to 4 hours. You receive immediate access to high-resolution digital imaging films and verified PDF reports via our secure 4K PACS portal and directly on your registered WhatsApp.',
      aHi: 'आपातकालीन और ट्रॉमा मामलों में रिपोर्ट 30 से 60 मिनट के भीतर प्राथमिकता पर दी जाती है। सामान्य एक्स-रे, अल्ट्रासाउंड व सीटी स्कैन की रिपोर्ट 2 से 4 घंटे में वरिष्ठ रेडियोलॉजिस्ट द्वारा प्रमाणित हो जाती है। आप डिजिटल फिल्म और रिपोर्ट हमारे 4K PACS पोर्टल या सीधे वॉट्सऐप पर भी प्राप्त कर सकते हैं।'
    },
    {
      id: '04',
      qEn: 'Can I undergo an MRI if I have metal implants, stents, or pacemakers?',
      qHi: 'यदि मेरे शरीर में मेटल इम्प्लांट, पेसमेकर या स्टेंट है, तो क्या मैं एमआरआई करा सकता हूँ?',
      aEn: 'Most contemporary orthopaedic titanium implants, joint replacements, dental fillings, and coronary stents are fully MRI-safe. However, certain older cardiac pacemakers, neurostimulators, or metal clips require evaluation. Our certified technicians review an exhaustive safety screening questionnaire prior to admitting any patient into the MRI suite to guarantee absolute safety.',
      aHi: 'अधिकांश आधुनिक टाइटेनियम ऑर्थोपेडिक इम्प्लांट्स, जोड़ों के जोड़ और कोरोनरी स्टेंट एमआरआई के लिए पूरी तरह सुरक्षित हैं। फिर भी कुछ पेसमेकर या धातु के क्लिप्स में विशेष सावधानी जरूरी होती है। एमआरआई रूम में प्रवेश से पहले हमारे विशेषज्ञ सुरक्षा जांच सूची का सत्यापन करते हैं।'
    },
    {
      id: '05',
      qEn: "Do I need a doctor's prescription to undergo a radiology scan?",
      qHi: 'क्या रेडियोलॉजी जांच कराने के लिए डॉक्टर के पर्चे (प्रिस्क्रिप्शन) की आवश्यकता होती है?',
      aEn: "Yes. In accordance with medical ethics and AERB diagnostic safety regulations, a valid referral or prescription from a registered medical practitioner is required for X-rays, CT scans, and Ultrasound investigations. If you do not have a prescription, you can consult one of our in-house medical specialists at Ejaz Clinic for an immediate clinical evaluation.",
      aHi: 'हाँ, चिकित्सा नियमों और AERB सुरक्षा दिशानिर्देशों के अनुसार एक्स-रे, सीटी स्कैन तथा अल्ट्रासाउंड के लिए पंजीकृत चिकित्सक का पर्चा आवश्यक होता है। यदि आपके पास पर्चा नहीं है, तो आप एजाज क्लिनिक में उपलब्ध हमारे विशेषज्ञ चिकित्सकों से तुरंत परामर्श ले सकते हैं।'
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
                रेडियोलॉजी एवं इमेजिंग से जुड़े <span className="text-[#ea580c]">सामान्य प्रश्न</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="text-[#ea580c]">Radiology Questions</span>
              </>
            )}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isHindi
              ? 'अपनी जांच की तैयारी, सुरक्षा प्रोटोकॉल और रिपोर्ट प्राप्ति से जुड़ी महत्वपूर्ण जानकारी।'
              : 'Important information regarding your scan preparation, radiation safety protocols, and receiving digital reports.'}
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
