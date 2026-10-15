import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'

export default function AboutFaqSection() {
  const { i18n } = useTranslation(['home', 'common'])
  const isHindi = i18n?.language === 'hi'
  const [openIdx, setOpenIdx] = useState(0)

  const faqs = [
    {
      id: '01',
      q: isHindi
        ? 'एजाज क्लिनिक की स्थापना कब हुई और इसका मूल मानवीय सिद्धांत क्या है?'
        : 'When was Ejaz Clinic founded, and what is its core philosophy?',
      a: isHindi
        ? 'एजाज क्लिनिक की स्थापना डॉ. एजाज अली द्वारा इस पावन संकल्प के साथ की गई थी कि किसी भी मरीज को इलाज का खर्च वहन न कर पाने के कारण चिकित्सा सेवा से वंचित नहीं किया जाएगा। दशकों से हमारा संस्थान इसी मानवीय दर्शन पर अडिग रहते हुए बिहार और पूर्वी भारत के हर परिवार को गुणवत्तापूर्ण, पारदर्शी और किफायती सर्जिकल उपचार प्रदान कर रहा है।'
        : 'Ejaz Clinic was established by Dr. Ejaz Ali with the inviolable principle that no patient should ever be denied life-saving surgical care due to financial hardship. For decades, our hospital has preserved this humanitarian foundation, delivering dependable, ethical, and affordable clinical excellence to thousands of families across Eastern India.'
    },
    {
      id: '02',
      q: isHindi
        ? 'एजाज क्लिनिक में कौन-कौन सी सर्जिकल एवं सुपर-स्पेशियलिटी सेवाएं उपलब्ध हैं?'
        : 'What surgical specialities and clinical departments are available at Ejaz Clinic?',
      a: isHindi
        ? 'हमारे संस्थान में 15+ से अधिक प्रमुख विभाग सक्रिय हैं, जिनमें एडवांस्ड लैप्रोस्कोपिक एवं जीआई सर्जरी, कैंसर सर्जरी (ऑन्कोलॉजी), जटिल हर्निया रिपेयर, यूरोलॉजी एवं किडनी केयर, ऑर्थोपेडिक्स एवं जोड़ प्रत्यारोपण, प्लास्टिक एवं रिकंस्ट्रक्टिव सर्जरी, स्त्री एवं प्रसूति रोग (गाइनेकोलॉजी), जनरल मेडिसिन तथा 24×7 क्रिटिकल केयर आईसीयू शामिल हैं।'
        : 'Ejaz Clinic houses 15+ specialized departments, including Advanced Laparoscopic & GI Surgery, Onco-Surgery (Cancer Care), Complex Hernia Repair, Urology, Orthopaedics & Joint Arthroplasty, Plastic & Cosmetic Reconstruction, Gynaecology & Obstetrics, General Internal Medicine, and 24×7 Critical Care ICU.'
    },
    {
      id: '03',
      q: isHindi
        ? 'एजाज क्लिनिक में अंतरराष्ट्रीय सर्जिकल मानकों एवं मरीज सुरक्षा को कैसे सुनिश्चित किया जाता है?'
        : 'How does Ejaz Clinic ensure global surgical standards and zero-infection safety?',
      a: isHindi
        ? 'प्रतिष्ठित मेयो क्लिनिक (USA) से प्रशिक्षित डॉ. शहज़ाद के नेतृत्व में हमारे मॉड्यूलर ऑपरेशन थिएटर 4K अल्ट्रा-एचडी विज़ुअलाइज़ेशन, लैमिनार एयरफ्लो, HEPA एयर फिल्ट्रेशन और स्ट्रिक्ट स्टरलाइज़ेशन प्रोटोकॉल से सुसज्जित हैं। यह तकनीक संक्रमण की संभावना को नगण्य कर सुरक्षित और तीव्र रिकवरी सुनिश्चित करती है।'
        : 'Under the surgical direction of Dr. Shahzad (trained at Mayo Clinic, USA), our modular operating theaters feature 4K ultra-HD optical towers, laminar airflow sterile suites, HEPA filtration, and strict zero-infection sterile protocols, ensuring sub-millimeter surgical accuracy and rapid patient recovery.'
    },
    {
      id: '04',
      q: isHindi
        ? 'क्या अस्पताल में 24×7 आपातकालीन (Emergency) और आईसीयू सेवाएं उपलब्ध हैं?'
        : 'Does Ejaz Clinic operate 24×7 emergency, trauma, and ICU facilities?',
      a: isHindi
        ? 'हाँ, हमारी आपातकालीन ट्रॉमा यूनिट, क्रिटिकल केयर आईसीयू, आधुनिक मॉड्यूलर ऑपरेशन थिएटर, इन-हाउस फार्मेसी तथा डायग्नोस्टिक पैथोलॉजी सेवाएं वर्ष के 365 दिन, चौबीसों घंटे (24×7) पूर्ण मेडिकल टीम के साथ सक्रिय रहती हैं।'
        : 'Yes. Our Emergency Trauma Care Unit, Critical Care ICU, modular emergency surgical suites, in-house pharmacy, and diagnostic pathology services operate 24 hours a day, 365 days a year with full medical readiness.'
    },
    {
      id: '05',
      q: isHindi
        ? 'मरीज वरिष्ठ सर्जनों से परामर्श अथवा अपॉइंटमेंट कैसे प्राप्त कर सकते हैं?'
        : 'How can patients schedule an OPD consultation or second opinion with senior specialists?',
      a: isHindi
        ? 'मरीज हमारी वेबसाइट पर ऑनलाइन फॉर्म भरकर, हमारे हेल्पलाइन नंबर 0612-2559999 / +91 94310 21045 पर कॉल करके, अथवा पटना स्थित हमारे हॉस्पिटल रिसेप्शन पर सीधे आकर आसानी से अपॉइंटमेंट बुक कर सकते हैं। आपातकालीन मामलों के लिए 24×7 तत्काल भर्ती एवं परामर्श उपलब्ध है।'
        : 'Consultations can be booked directly online through our website, by calling our helpline at 0612-2559999 / +91 94310 21045, or at our hospital reception in Patna. Emergency triage and walk-in consultations are accessible 24 hours a day.'
    }
  ]

  return (
    <section className="relative w-full bg-white text-slate-800 py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 overflow-hidden">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isHindi ? (
              <>
                एजाज क्लिनिक से जुड़े <span className="text-[#ea580c]">सामान्य प्रश्न</span>
              </>
            ) : (
              <>
                Common Questions About <span className="text-[#ea580c]">Ejaz Clinic</span>
              </>
            )}
          </h2>

          <div className="w-16 h-1 bg-[#ea580c] rounded-full mx-auto mt-3.5 sm:mt-4" />
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
                    <span className="leading-snug">{faq.q}</span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#ea580c]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pl-12 sm:pl-14">
                    {faq.a}
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
