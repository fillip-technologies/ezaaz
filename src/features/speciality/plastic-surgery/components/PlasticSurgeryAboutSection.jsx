import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function PlasticSurgeryAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights for Plastic Surgery
  const keyBenefits = [
    {
      title: isHindi ? 'कॉस्मेटिक एवं सौंदर्य संवर्धन' : 'Aesthetic & Cosmetic Harmony',
      desc: isHindi
        ? 'प्राकृतिक रूप और व्यक्तिगत सौंदर्य को निखारने के लिए उन्नत फेशियल और बॉडी कंटूरिंग प्रक्रियाएं।'
        : 'Tailored cosmetic procedures designed to enhance natural balance, confidence, and facial-body contours.'
    },
    {
      title: isHindi ? 'उन्नत पुनर्निर्माण एवं फ्लैप सर्जरी' : 'Advanced Reconstructive Flap Surgery',
      desc: isHindi
        ? 'दुर्घटना, आघात या ट्यूमर के बाद ऊतकों और अंगों की कार्यप्रणाली को पुनर्स्थापित करने वाली जटिल सर्जरी।'
        : 'Complex tissue transfer, local/free flaps, and structural restoration post-trauma or cancer resections.'
    },
    {
      title: isHindi ? 'बर्न केयर एवं स्कार रिवीजन उपचार' : 'Burn Care & Scar Revision',
      desc: isHindi
        ? 'जलने की पुरानी चोटों, संकुचन (कॉन्ट्रैक्चर) और गहरे निशानों को हटाने के लिए अत्याधुनिक लेजर व सर्जिकल तकनीकें।'
        : 'Dedicated management of burn contractures, hypertrophic scars, and keloids with minimal incision techniques.'
    },
    {
      title: isHindi ? 'माइक्रोवैस्कुलर एवं हैंड सर्जरी' : 'Microvascular & Hand Surgery',
      desc: isHindi
        ? 'हाथ की बारीक नसों, टेंडन और रक्त वाहिकाओं की मरम्मत के लिए उच्च-आवर्धन माइक्रोस्कोपिक प्रक्रियाएं।'
        : 'Sub-millimeter microscopic repair of severed nerves, tendons, and blood vessels restoring vital hand function.'
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
          
          {/* LEFT SIDE: About Plastic & Reconstructive Surgery Narrative */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  प्लास्टिक एवं रिकंस्ट्रक्टिव सर्जरी में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Pioneering Precision in{' '}
                  <span className="text-[#ea580c]">Plastic & Reconstructive Surgery</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में प्लास्टिक एवं रिकंस्ट्रक्टिव सर्जरी विभाग कॉस्मेटिक संवर्धन और चिकित्सीय पुनर्निर्माण का उत्कृष्ट समन्वय प्रस्तुत करता है। हमारे अत्यधिक अनुभवी प्लास्टिक सर्जन जन्मजात विकृतियों, आघात या दुर्घटना के निशानों, और जलने की चोटों को ठीक करने के साथ-साथ सौंदर्य संवर्धन के लिए सुरक्षित समाधान प्रदान करते हैं।'
                  : 'At Ejaz Clinic, the Department of Plastic, Aesthetic & Reconstructive Surgery harmonizes art and medical science. Led by accredited plastic surgeons, our center is dedicated to restoring both anatomical form and physiologic function, as well as delivering subtle, natural cosmetic enhancements tailored to individual aspirations.'}
              </p>
              <p>
                {isHindi
                  ? 'अत्याधुनिक ऑपरेटिंग माइक्रोस्कोप, अल्ट्रासोनिक लाइपोसुक्शन, और मिनिमल-स्कार तकनीकों के साथ, हमारी प्राथमिकता त्वरित रिकवरी, न्यूनतम दर्द और प्राकृतिक परिणाम सुनिश्चित करना है। हम संपूर्ण गोपनीयता, व्यक्तिगत परामर्श और अंतरराष्ट्रीय सुरक्षा मानकों के साथ प्रत्येक मरीज की देखभाल करते हैं।'
                  : 'Equipped with ultra-high magnification operating microscopes, precision tumescent liposuction systems, and refined scar-minimizing suture protocols, we ensure faster recovery, undetectable incisions, and natural aesthetic results. Every patient receives compassionate, strictly confidential care aligned with international surgical safety benchmarks.'}
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
            <EnquiryForm specialtyName={isHindi ? 'प्लास्टिक सर्जरी' : 'Plastic Surgery'} pageName="Plastic Surgery" />
          </div>

        </div>
      </div>
    </section>
  )
}
