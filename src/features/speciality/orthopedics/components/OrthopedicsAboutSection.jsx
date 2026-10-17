import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function OrthopedicsAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights
  const keyBenefits = [
    {
      title: isHindi ? 'सटीक जॉइंट रिप्लेसमेंट' : 'Computer-Guided Joint Replacement',
      desc: isHindi
        ? 'उन्नत बायो-कम्पैटिबल इम्प्लांट्स और सटीक अलाइनमेंट के साथ घुटने व कूल्हे का सफल प्रत्यारोपण।'
        : 'Sub-millimeter implant positioning for knee and hip replacements ensuring natural joint kinematics.'
    },
    {
      title: isHindi ? 'कीहोल आर्थ्रोस्कोपी स्पोर्ट्स सर्जरी' : 'Minimally Invasive Arthroscopy',
      desc: isHindi
        ? 'सूक्ष्म चीरों द्वारा ACL, PCL, मेनिस्कस और कंधे के रोटेटर कफ की त्वरित रिकवरी वाली सर्जरी।'
        : 'Keyhole joint interventions for ACL/PCL tears and rotator cuff injuries with rapid athletic return.'
    },
    {
      title: isHindi ? '24/7 आपातकालीन फ्रैक्चर ट्रॉमा केयर' : '24/7 Advanced Trauma & Fracture Care',
      desc: isHindi
        ? 'सड़क दुर्घटनाओं और जटिल फ्रैक्चर के लिए अत्याधुनिक टाइटेनियम प्लेटिंग और त्वरित स्थिरीकरण।'
        : 'Immediate stabilization and anatomical fixation for polytrauma and multi-fragmented fractures.'
    },
    {
      title: isHindi ? 'शीघ्र गतिशीलता एवं फिजियोथेरेपी' : 'Rapid Post-Op Mobilization & Rehab',
      desc: isHindi
        ? 'मरीजों को सर्जरी के 24 घंटे के भीतर खड़ा करने और दर्द-मुक्त चलने के लिए विशेष पुनर्वास प्रोटोकॉल।'
        : 'Dedicated physiotherapy protocols enabling supported walking within 24 hours of surgery.'
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
          
          {/* LEFT SIDE: About Orthopaedics Content */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  ऑर्थोपेडिक्स एवं जोड़ देखभाल में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Pioneering Precision in{' '}
                  <span className="text-[#ea580c]">Orthopaedic Surgery</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में ऑर्थोपेडिक्स एवं जॉइंट केयर विभाग हड्डियों, जोड़ों, लिगामेंट्स और रीढ़ की हड्डी के विकारों का विश्व स्तरीय उपचार प्रदान करता है। हमारे वरिष्ठ ऑर्थोपेडिक सर्जन उन्नत कंप्यूटर-असिस्टेड जॉइंट रिप्लेसमेंट, कीहोल आर्थ्रोस्कोपी और जटिल ट्रॉमा पुनर्निर्माण में अत्यधिक अनुभवी हैं।'
                  : 'At Ejaz Clinic, our Department of Orthopaedics & Joint Care is committed to restoring pain-free mobility, joint stability, and active living. From degenerative joint diseases to high-velocity trauma and athletic sports injuries, our team utilizes modern surgical methodologies and precision implant technology.'}
              </p>
              <p>
                {isHindi
                  ? 'हम टोटल नी रिप्लेसमेंट (TKR), टोटल हिप रिप्लेसमेंट (THR), स्पोर्ट्स लिगामेंट रिपेयर (ACL/PCL), और स्पाइनल डीकंप्रेशन में विशेषज्ञता रखते हैं। मॉड्यूलर लैमिनार एयर फ्लो ऑपरेशन थिएटर और समर्पित इन-हाउस फिजियोथेरेपी के साथ, हम मरीजों को शीघ्र सामान्य जीवन में लौटने में मदद करते हैं।'
                  : 'Specializing in Total Knee and Hip Replacements, Keyhole Arthroscopic reconstructions, and Polytrauma fixation, we implement patient-specific protocols that minimize muscle damage, reduce post-operative pain, and enable assisted walking within 24 hours of surgery.'}
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
            <EnquiryForm specialtyName={isHindi ? 'ऑर्थोपेडिक्स एवं जोड़ देखभाल' : 'Orthopaedics & Joint Care'} pageName="Orthopaedics & Joint Care" />
          </div>

        </div>
      </div>
    </section>
  )
}
