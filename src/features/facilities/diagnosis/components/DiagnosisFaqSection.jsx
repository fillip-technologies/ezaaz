import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, HelpCircle } from 'lucide-react'

export default function DiagnosisFaqSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'
  const [openIdx, setOpenIdx] = useState(0)

  const faqs = [
    {
      id: '01',
      qEn: 'Do I need to fast before my blood or urine test?',
      qHi: 'क्या ब्लड या यूरिन टेस्ट से पहले मुझे उपवास (Fasting) रखना होगा?',
      aEn: 'Fasting requirements depend on the specific investigation. Tests such as Fasting Blood Glucose, Lipid Profiles (Cholesterol), and Liver Function Tests typically require an 8 to 12 hour overnight fast (water is allowed). For routine Complete Blood Counts (CBC), Kidney Function Tests, and standard urine tests, fasting is generally not needed. We clearly communicate sample collection instructions during booking.',
      aHi: 'उपवास की आवश्यकता जांच के प्रकार पर निर्भर करती है। फास्टिंग ब्लड शुगर, लिपिड प्रोफाइल (कोलेस्ट्रॉल) और लिवर फंक्शन टेस्ट के लिए सामान्यतः 8 से 12 घंटे का उपवास (पानी पी सकते हैं) आवश्यक होता है। सीबीसी (CBC) और सामान्य यूरिन टेस्ट के लिए उपवास की आवश्यकता नहीं होती। बुकिंग के समय आपको स्पष्ट निर्देश दिए जाते हैं।'
    },
    {
      id: '02',
      qEn: 'How quickly will I receive my diagnostic test results and verified report?',
      qHi: 'मेरी जांच रिपोर्ट और पैथोलॉजी परिणाम कितनी देर में प्राप्त होंगे?',
      aEn: 'Routine hematology, biochemistry, and urinalysis reports (CBC, Blood Sugar, LFT, KFT) are finalized and validated within 2 to 4 hours. Stat emergency blood tests are processed in under 45 minutes. Specialized microbiological cultures and histopathology tissue biopsies typically take 24 to 48 hours for exhaustive clinical scrutiny. All reports are delivered instantly via WhatsApp, SMS link, and our online patient portal.',
      aHi: 'नियमित ब्लड और यूरिन टेस्ट (CBC, शुगर, LFT, KFT) की रिपोर्ट 2 से 4 घंटे के भीतर सत्यापित कर दी जाती है। आपातकालीन स्टैट ब्लड टेस्ट 45 मिनट के भीतर तैयार होते हैं। कल्चर और बायोप्सी रिपोर्ट में 24 से 48 घंटे का समय लगता है। रिपोर्ट सीधे आपके वॉट्सऐप या ऑनलाइन पोर्टल पर तुरंत भेज दी जाती है।'
    },
    {
      id: '03',
      qEn: 'Is home sample collection available for elderly or bedridden patients?',
      qHi: 'क्या बुजुर्ग या गंभीर मरीजों के लिए घर पर सैंपल कलेक्शन (Home Sample Collection) की सुविधा है?',
      aEn: 'Yes. Our trained and certified phlebotomists provide safe, hygienic doorstep sample collection services across the city. All blood and specimen containers are sealed immediately with tamper-evident barcodes and transported in temperature-controlled cool-boxes to preserve specimen integrity and analytical accuracy.',
      aHi: 'हाँ, हमारे प्रशिक्षित फ्लेबोटोमिस्ट शहर भर में सुरक्षित और स्वच्छ डोरस्टेप सैंपल कलेक्शन सेवा प्रदान करते हैं। सभी सैंपल बारकोड के साथ तापमान-नियंत्रित कूल-बॉक्स में सुरक्षित रूप से लैब तक पहुंचाए जाते हैं ताकि जांच की 100% शुद्धता बनी रहे।'
    },
    {
      id: '04',
      qEn: 'How does Ejaz Clinic ensure 100% accuracy in diagnostic pathology reports?',
      qHi: 'एजाज क्लिनिक में डायग्नोस्टिक और पैथोलॉजी रिपोर्ट की 100% सटीकता कैसे सुनिश्चित की जाती है?',
      aEn: 'Our diagnostic laboratory strictly complies with NABL and ISO quality standards. We run automated two-tier daily Internal Quality Controls (IQC) and participate in rigorous External Quality Assurance Schemes (EQAS). Every abnormal or borderline specimen is automatically re-run and individually signed off by our consultant pathologists and biochemists before report dispatch.',
      aHi: 'हमारी लैब NABL और ISO गुणवत्ता मानकों का सख्ती से पालन करती है। हम प्रतिदिन आंतरिक गुणवत्ता नियंत्रण (IQC) और बाह्य गुणवत्ता आश्वासन (EQAS) प्रोग्राम चलाते हैं। किसी भी असामान्य परिणाम को दोबारा टेस्ट किया जाता है और वरिष्ठ पैथोलॉजिस्ट के सत्यापन के बाद ही रिपोर्ट जारी की जाती है।'
    },
    {
      id: '05',
      qEn: "Do I need a doctor's prescription to book preventive wellness checkups?",
      qHi: 'क्या रूटीन या वेलनेस हेल्थ चेकअप के लिए डॉक्टर के पर्चे (Prescription) की आवश्यकता होती है?',
      aEn: 'No prescription is required for our comprehensive Preventive Health Checkup Packages, diabetic profiles, or lipid screenings. However, specialized hormone panels, therapeutic drug monitoring, and pre-surgical clearances are performed based on a referring doctor’s clinical prescription. You can also consult our in-house physicians for personalized diagnostic recommendations.',
      aHi: 'प्रिवेंटिव वेलनेस हेल्थ चेकअप और रूटीन बॉडी प्रोफाइल्स के लिए किसी पर्चे की आवश्यकता नहीं होती। विशिष्ट हार्मोन टेस्ट अथवा सर्जरी से पूर्व जांचों के लिए डॉक्टर का पर्चा उपयोगी होता है। यदि आवश्यक हो, तो आप हमारे इन-हाउस डॉक्टरों से भी उचित जांच पैकेज की सलाह ले सकते हैं।'
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
                डायग्नोस्टिक एवं लैब जांच से जुड़े <span className="text-[#ea580c]">सामान्य प्रश्न</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="text-[#ea580c]">Diagnostic Questions</span>
              </>
            )}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {isHindi
              ? 'सैंपल कलेक्शन, रिपोर्टिंग समय, उपवास के नियम और गुणवत्ता नियंत्रण से जुड़ी महत्वपूर्ण जानकारी।'
              : 'Essential guidance regarding sample collection, fasting guidelines, report turnaround, and lab quality standards.'}
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
