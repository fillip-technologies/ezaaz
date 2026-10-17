import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function CancerAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights
  const keyBenefits = [
    {
      title: isHindi ? 'बहुविषयक ट्यूमर बोर्ड समीक्षा' : 'Multidisciplinary Tumor Board',
      desc: isHindi
        ? 'प्रत्येक कैंसर रोगी के लिए ऑन्को-सर्जन, फिजिशियन और विशेषज्ञों द्वारा व्यक्तिगत उपचार योजना।'
        : 'Personalized treatment protocols formulated through comprehensive multi-specialist oncology consensus.'
    },
    {
      title: isHindi ? 'सटीक R0 मार्जिन रीसेक्शन' : 'Microscopic R0 Margin Clearance',
      desc: isHindi
        ? 'अंग-संरक्षण तकनीकों के साथ कैंसर कोशिकाओं को जड़ से हटाने की उच्चतम सर्जिकल सटीकता।'
        : 'Sub-millimeter histological clearance ensuring complete tumor eradication and organ preservation.'
    },
    {
      title: isHindi ? 'मिनिमली इनवेसिव ऑन्को-सर्जरी' : 'Minimally Invasive Onco-Surgery',
      desc: isHindi
        ? 'लैप्रोस्कोपिक एवं कीहोल तकनीकों से न्यूनतम दर्द, कम रक्तस्राव और तेज रिकवरी।'
        : 'Laparoscopic and keyhole tumor resections resulting in minimal blood loss, minimal scarring, and quick recovery.'
    },
    {
      title: isHindi ? 'समर्पित ऑन्कोलॉजी क्रिटिकल केयर' : '24/7 Dedicated Oncology ICU',
      desc: isHindi
        ? 'जटिल ऑन्को-सर्जरी के बाद निरंतर निगरानी और करुणामय पोस्ट-ऑपरेटिव देखभाल।'
        : 'Specialized intensive monitoring and empathetic post-operative rehabilitation for smooth healing.'
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
          
          {/* LEFT SIDE: About Cancer Surgery Content */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  सर्जिकल ऑन्कोलॉजी में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Pioneering Precision in{' '}
                  <span className="text-[#ea580c]">Cancer Surgery</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में सर्जिकल ऑन्कोलॉजी विभाग कैंसर के व्यापक एवं उन्नत उपचार के लिए समर्पित है। हमारे वरिष्ठ ऑन्को-सर्जन आधुनिकतम सर्जिकल तकनीकों और वैज्ञानिक पद्धतियों के माध्यम से विभिन्न प्रकार के ट्यूमर और कैंसर विकारों का सुरक्षित व सटीक ऑपरेशन करते हैं।'
                  : 'At Ejaz Clinic, the Department of Surgical Oncology is dedicated to state-of-the-art tumor resections and curative cancer surgery. Our surgical oncology team combines decades of specialized operating precision with organ-preserving techniques to achieve optimal oncologic clearance.'}
              </p>
              <p>
                {isHindi
                  ? 'हम गैस्ट्रोइंटेस्टाइनल, कोलोरेक्टल, स्तन, लिवर, पित्ताशय और कोमल ऊतक दुर्दमताओं में विशेषज्ञता रखते हैं। न्यूनतम आघात, सुरक्षित एनेस्थीसिया और शून्य-संक्रमण मॉड्यूलर ऑपरेशन थिएटरों के साथ, हम प्रत्येक मरीज को सुरक्षित और सम्मानजनक उपचार प्रदान करते हैं।'
                  : 'Specializing in complex gastrointestinal, colorectal, breast, hepatobiliary, and soft-tissue malignancies, our clinical focus centers on achieving clear surgical margins (R0 resection) while minimizing surgical trauma and accelerating recovery.'}
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
            <EnquiryForm specialtyName={isHindi ? 'कैंसर सर्जरी' : 'Cancer Surgery'} pageName="Cancer Surgery" />
          </div>

        </div>
      </div>
    </section>
  )
}
