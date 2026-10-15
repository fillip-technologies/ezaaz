import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function AnaesthesiaAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights
  const keyBenefits = [
    {
      title: isHindi ? 'व्यापक पेरिऑपरेटिव सुरक्षा' : 'Comprehensive Perioperative Safety',
      desc: isHindi
        ? 'प्रत्येक सर्जरी से पहले संपूर्ण प्री-एनेस्थेटिक जांच (PAC) और व्यक्तिगत जोखिम मूल्यांकन।'
        : 'Thorough Pre-Anesthetic Checkup (PAC) and tailored risk-stratification for all surgical candidates.'
    },
    {
      title: isHindi ? 'उन्नत मल्टीपैरामीटर वाइटल मॉनिटरिंग' : 'Multiparameter Real-Time Monitoring',
      desc: isHindi
        ? 'हृदय गति, रक्तचाप, ऑक्सीजन, ईसीजी और एंड-टाइडल CO2 की निरंतर डिजिटल निगरानी।'
        : 'Continuous hemodynamic monitoring safeguarding cerebral, cardiac, and pulmonary functions.'
    },
    {
      title: isHindi ? 'अल्ट्रासाउंड-गाइडेड रीजनल नर्व ब्लॉक' : 'Ultrasound-Guided Nerve Blocks',
      desc: isHindi
        ? 'हाई-रिज़ॉल्यूशन सोनोग्राफी द्वारा नसों को सुरक्षित रखते हुए सटीक दर्द-मुक्त स्थानीय सुन्नता।'
        : 'Sub-millimeter sonographic needle guidance for targeted, prolonged post-operative analgesia.'
    },
    {
      title: isHindi ? '24/7 समर्पित क्रिटिकल केयर आईसीयू' : '24/7 Critical Care & Resuscitation',
      desc: isHindi
        ? 'गंभीर मरीजों के लिए समर्पित इंटेंसिविस्ट्स, वेंटिलेटर सपोर्ट और तत्काल आपातकालीन प्रतिक्रिया।'
        : 'Round-the-clock intensivist coverage, mechanical ventilation, and advanced hemodynamic support.'
    }
  ]

  return (
    <section className="relative w-full bg-[#f8f9fc] py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
      {/* Background Subtle Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#003a70 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT SIDE: About Anaesthesia & Critical Care Content */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  एनेस्थीसिया एवं क्रिटिकल केयर में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Pioneering Precision in{' '}
                  <span className="text-[#ea580c]">Anaesthesia & Critical Care</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में एनेस्थीसिया एवं क्रिटिकल केयर विभाग प्रत्येक सर्जिकल प्रक्रिया की सुरक्षा, आराम और सफलता का मुख्य संरक्षक है। हमारे वरिष्ठ एनेस्थीसियोलॉजिस्ट और क्रिटिकल केयर विशेषज्ञ ऑपरेशन से पहले, ऑपरेशन के दौरान और उसके बाद मरीज के जीवन की निरंतर सुरक्षा सुनिश्चित करते हैं।'
                  : 'At Ejaz Clinic, the Department of Anaesthesia & Critical Care stands at the core of surgical safety, pain management, and acute life support. Our experienced team of anaesthesiologists and critical care physicians provides vigilant, personalized care throughout the perioperative journey.'}
              </p>
              <p>
                {isHindi
                  ? 'अत्याधुनिक एनेस्थीसिया वर्कस्टेशन, डिजिटल वेंटिलेटर्स और अल्ट्रासाउंड-गाइडेड रीजनल नर्व ब्लॉक तकनीकों के साथ, हम सुनिश्चित करते हैं कि मरीज को किसी भी प्रकार के दर्द का अहसास न हो और वे सुरक्षित रूप से होश में आएं। हमारा समर्पित आईसीयू जटिल और आपातकालीन मामलों में 24/7 उच्च-स्तरीय निगरानी प्रदान करता है।'
                  : 'Equipped with computerized anaesthesia delivery systems, advanced vaporizers, multi-gas analyzers, and ultrasound-guided regional nerve block protocols, we deliver zero-pain surgical interventions. Coupled with a 24/7 dedicated intensive care unit (ICU), patient comfort and absolute hemodynamic stability are permanently prioritized.'}
              </p>
            </div>

            {/* Clinical Highlights 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200">
              {keyBenefits.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4.5 sm:p-5 border border-slate-200/80 shadow-xs hover:border-orange-500/30 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed pl-7.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE: Shared Reusable Enquiry Form */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full lg:sticky lg:top-28">
            <EnquiryForm specialtyName={isHindi ? 'एनेस्थीसिया एवं क्रिटिकल केयर' : 'Anaesthesia & Critical Care'} />
          </div>

        </div>
      </div>
    </section>
  )
}
