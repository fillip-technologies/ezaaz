import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function GastrointestinalAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights
  const keyBenefits = [
    {
      title: isHindi ? 'उन्नत जीआई एंडोस्कोपी एवं लैप्रोस्कोपी' : 'Advanced GI Endoscopy & Laparoscopy',
      desc: isHindi
        ? 'पेट, आंतों और पाचन अंगों के लिए 4K अल्ट्रा-एचडी विज़ुअलाइज़ेशन के साथ सूक्ष्म कीहोल सर्जरी।'
        : 'Microscopic keyhole access for stomach, bowel, and hepatobiliary diseases with minimal trauma.'
    },
    {
      title: isHindi ? 'लिवर, पित्त व अग्नाशय विशेषज्ञता' : 'Complex Hepatobiliary & Pancreatic Care',
      desc: isHindi
        ? 'पित्त नलिकाओं के संकुचन, लिवर सिस्ट और अग्नाशय के जटिल रोगों का कुशल सर्जिकल समाधान।'
        : 'Sub-millimeter anatomical precision in biliary reconstruction, liver resection, and pancreatic care.'
    },
    {
      title: isHindi ? 'कोलोरेक्टल एवं आंतों का सुरक्षित पुनर्निर्माण' : 'Colorectal Continuity & IBD Solutions',
      desc: isHindi
        ? 'अल्सरेटिव कोलाइटिस, क्रोहन रोग और कोलन विकारों के लिए प्राकृतिक पाचन निरंतरता की बहाली।'
        : 'Minimally invasive bowel resection preserving sphincter function and natural digestive flow.'
    },
    {
      title: isHindi ? 'त्वरित रिकवरी एवं पोषण प्रबंधन' : 'Accelerated GI Recovery & Nutrition',
      desc: isHindi
        ? 'सर्जरी के तुरंत बाद विशेषज्ञ पोषण निगरानी और सामान्य आहार बहाली के लिए ERAS प्रोटोकॉल।'
        : 'Evidence-based ERAS protocols ensuring early oral nutrition, minimal pain, and rapid discharge.'
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
          
          {/* LEFT SIDE: About Gastrointestinal Surgery Content */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  गैस्ट्रोइंटेस्टाइनल सर्जरी में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Pioneering Precision in{' '}
                  <span className="text-[#ea580c]">Gastrointestinal Surgery</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में सर्जिकल गैस्ट्रोएंटरोलॉजी एवं गैस्ट्रोइंटेस्टाइनल सर्जरी विभाग पाचन तंत्र के जटिल रोगों के निदान और उन्नत उपचार के लिए समर्पित है। अन्नप्रणाली (भोजन नली), आमाशय (पेट), छोटी व बड़ी आंत, लिवर, पित्ताशय और अग्नाशय के रोगों का संपूर्ण प्रबंधन हमारे विशेषज्ञ सर्जनों द्वारा किया जाता है।'
                  : 'At Ejaz Clinic, our Department of Gastrointestinal (GI) & Hepatobiliary Surgery delivers world-class operative excellence across the entire digestive tract. From the esophagus and stomach to the small intestine, colon, liver, gallbladder, and pancreas, our surgeons specialize in both minimally invasive laparoscopic and complex open reconstructions.'}
              </p>
              <p>
                {isHindi
                  ? 'हम एसिड रिफ्लक्स, गैस्ट्रिक अल्सर, आंतों में रुकावट, पित्त नली की जटिलताओं और कोलोरेक्टल रोगों के लिए आधुनिक लेप्रोस्कोपिक तकनीक और अत्याधुनिक एंडोस्कोपिक सिस्टम का उपयोग करते हैं। मरीजों को न्यूनतम दर्द, शून्य-संक्रमण दर और त्वरित पाचन बहाली के साथ सुरक्षित उपचार मिलता है।'
                  : 'Utilizing high-definition 4K optical endoscopy towers and precision microsurgical instruments, we implement Enhanced Recovery After Surgery (ERAS) pathways. This enables early oral nutrition, minimal post-operative pain, negligible wound trauma, and rapid resumption of everyday living.'}
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
            <EnquiryForm specialtyName={isHindi ? 'गैस्ट्रोइंटेस्टाइनल सर्जरी' : 'Gastrointestinal Surgery'} />
          </div>

        </div>
      </div>
    </section>
  )
}
