import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function GeneralInternalAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights for General Internal Medicine
  const keyBenefits = [
    {
      title: isHindi ? 'क्रोनिक लाइफस्टाइल विकार प्रबंधन' : 'Chronic Lifestyle & Metabolic Care',
      desc: isHindi
        ? 'डायबिटीज (शुगर), उच्च रक्तचाप, थायरॉयड और कोलेस्ट्रॉल विकारों का साक्ष्य-आधारित दीर्घकालिक नियंत्रण।'
        : 'Evidence-based management of type-2 diabetes, hypertension, dyslipidemia, and thyroid conditions.'
    },
    {
      title: isHindi ? 'तीव्र संक्रामक रोग एवं बुखार क्लिनिक' : 'Acute Infectious Illnesses & Pyrexia',
      desc: isHindi
        ? 'डेंगू, मलेरिया, टाइफाइड, वायरल फ्लू और अज्ञात बुखार (PUO) का त्वरित डायग्नोसिस और प्रभावी इनपेशेंट उपचार।'
        : 'Rapid diagnosis and expert treatment of dengue, typhoid, malaria, seasonal influenza, and sepsis.'
    },
    {
      title: isHindi ? 'मल्टी-ऑर्गन डायग्नोस्टिक स्क्रीनिंग' : 'Multi-Organ Diagnostic Assessment',
      desc: isHindi
        ? 'हृदय, गुर्दा, लिवर और फेफड़ों के स्वास्थ्य का समग्र मूल्यांकन और प्रारंभिक चरण में बीमारियों की पहचान।'
        : 'Holistic screening evaluating cardiac, renal, hepatic, and pulmonary functions for early intervention.'
    },
    {
      title: isHindi ? 'वृद्धजन स्वास्थ्य एवं निवारक टीकाकरण' : 'Geriatric Care & Adult Vaccination',
      desc: isHindi
        ? 'वरिष्ठ नागरिकों की बहु-अंग जटिलताओं की देखभाल और वयस्कों के लिए रोग-प्रतिरोधक टीकों का समुचित प्रबंध।'
        : 'Specialized polypharmacy management for seniors alongside adult immunization against pneumonia and influenza.'
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
          
          {/* LEFT SIDE: About General Internal Medicine Narrative */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  जनरल इंटरनल मेडिसिन में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Comprehensive Excellence in{' '}
                  <span className="text-[#ea580c]">General Internal Medicine</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में जनरल इंटरनल मेडिसिन विभाग वयस्कों के संपूर्ण स्वास्थ्य का प्राथमिक संरक्षक है। हमारे वरिष्ठ कंसल्टेंट फिजिशियंस जटिल, अज्ञात और लंबे समय से चले आ रहे बहु-अंग विकारों के सटीक निदान और समग्र उपचार में विशेषज्ञता रखते हैं। हम रोग के मूल कारणों का पता लगाकर व्यक्तिगत चिकित्सा योजना तैयार करते हैं।'
                  : 'At Ejaz Clinic, the Department of General Internal Medicine serves as the primary pillar for comprehensive adult healthcare. Our experienced consultant physicians excel in diagnosing and managing complex, multi-system illnesses, undifferentiated fevers, and chronic metabolic ailments. We focus on identifying root causes to deliver personalized, long-term health stabilization.'}
              </p>
              <p>
                {isHindi
                  ? 'अत्याधुनिक इन-हाउस डायग्नोस्टिक लैब, डिजिटल ईसीजी, बायोमार्कर टेस्टिंग और 24/7 आईसीयू सपोर्ट के साथ, हम तीव्र संक्रामक बीमारियों से लेकर दीर्घकालिक जीवनशैली संबंधी रोगों (डायबिटीज, बीपी, थायरॉयड) तक सभी का सुरक्षित और सटीक समाधान सुनिश्चित करते हैं। हमारा उद्देश्य मरीज को दवाइयों के अनावश्यक बोझ से बचाकर स्वस्थ जीवन प्रदान करना है।'
                  : 'Supported by advanced in-house diagnostic laboratory analyzers, digital point-of-care diagnostics, and round-the-clock intensive care backup, we seamlessly handle acute emergency infections as well as long-standing metabolic disorders. Our multidisciplinary focus prevents organ complications and empowers patients with preventive wellness.'}
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
            <EnquiryForm specialtyName={isHindi ? 'जनरल इंटरनल मेडिसिन' : 'General Internal Medicine'} />
          </div>

        </div>
      </div>
    </section>
  )
}
