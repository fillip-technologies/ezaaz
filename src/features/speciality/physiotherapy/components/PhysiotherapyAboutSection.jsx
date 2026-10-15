import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function PhysiotherapyAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights
  const keyBenefits = [
    {
      title: isHindi ? 'पोस्ट-सर्जिकल एवं ऑर्थोपेडिक पुनर्वास' : 'Post-Surgical & Ortho Rehab',
      desc: isHindi
        ? 'जॉइंट रिप्लेसमेंट, फ्रैक्चर और लिगामेंट सर्जरी के बाद दर्द-मुक्त प्राकृतिक गतिशीलता की त्वरित बहाली।'
        : 'Tailored recovery programs following joint replacement, spine surgery, and fracture fixation.'
    },
    {
      title: isHindi ? 'उन्नत न्यूरोलॉजिकल एवं स्ट्रोक थेरेपी' : 'Neurological & Stroke Recovery',
      desc: isHindi
        ? 'लकवा, स्ट्रोक, पार्किंसंस और नसों की कमजोरी के लिए विशेष मोटर-स्किल और संतुलन प्रशिक्षण।'
        : 'Neuro-developmental rehabilitation restoring balance, coordination, and independent mobility.'
    },
    {
      title: isHindi ? 'स्पोर्ट्स इंजरी एवं एथलेटिक रिकवरी' : 'Sports Injury & Athletic Return',
      desc: isHindi
        ? 'मांसपेशियों के खिंचाव, मोच, टेंडोनाइटिस और लिगामेंट की चोटों के लिए सुरक्षित प्रदर्शन पुनर्वास।'
        : 'Biomechanic conditioning and tendon rehabilitation for rapid, safe return to active sports.'
    },
    {
      title: isHindi ? 'इलेक्ट्रोथेरेपी एवं दर्द निवारण मॉडेलिटीज़' : 'Advanced Electrotherapy & Pain Relief',
      desc: isHindi
        ? 'IFT, TENS, अल्ट्रासाउंड और लेजर थेरेपी द्वारा बिना दवाओं के पुराने व तीव्र दर्द का स्थायी समाधान।'
        : 'Non-invasive therapeutic ultrasound, laser, and traction protocols for chronic back and neck pain.'
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
          
          {/* LEFT SIDE: About Physiotherapy Content */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  फिजियोथेरेपी एवं पुनर्वास में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Pioneering Precision in{' '}
                  <span className="text-[#ea580c]">Physiotherapy & Rehab</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में फिजियोथेरेपी एवं पुनर्वास विभाग मरीजों को दर्द-मुक्त जीवन, शारीरिक मजबूती और पूर्ण गतिशीलता वापस दिलाने के लिए प्रतिबद्ध है। आधुनिक बायोमेकेनिकल उपकरणों और अनुभवी फिजियोथेरेपिस्ट्स की देखरेख में हम व्यक्तिगत उपचार योजनाएं तैयार करते हैं।'
                  : 'At Ejaz Clinic, the Department of Physiotherapy & Rehabilitation is dedicated to restoring functional mobility, physical independence, and pain-free movement. Our clinical physiotherapists blend evidence-based manual therapy, targeted therapeutic exercise, and advanced electrotherapy modalities.'}
              </p>
              <p>
                {isHindi
                  ? 'चाहे घुटने या कूल्हे का प्रत्यारोपण हो, रीढ़ की हड्डी की समस्या (स्लिप डिस्क, साइटिका), फ्रोजन शोल्डर, खेलकूद की चोटें, या स्ट्रोक के बाद का पुनर्वास—हमारी टीम प्रत्येक मरीज के साथ मिलकर कार्य करती है। हमारा उद्देश्य बिना दवाओं के प्राकृतिक रूप से शरीर की कार्यक्षमता को पुनः सक्रिय करना है।'
                  : 'From post-operative joint mobilization and spine decompression to neurological rehabilitation (stroke, Parkinson’s) and sports conditioning, every protocol is customized to each patient’s anatomical needs. We ensure safe, gradual, and sustainable recovery for patients of all ages.'}
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
            <EnquiryForm specialtyName={isHindi ? 'फिजियोथेरेपी एवं पुनर्वास' : 'Physiotherapy & Rehabilitation'} />
          </div>

        </div>
      </div>
    </section>
  )
}
