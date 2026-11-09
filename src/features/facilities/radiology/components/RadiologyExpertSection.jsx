import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import expertDoctorImg from '../../../../assets/radiology/expert-doctor.jpg'

export default function RadiologyExpertSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  const points = [
    {
      textEn: 'Detailed and accurate reporting',
      textHi: 'विस्तृत एवं अत्यंत सटीक रिपोर्टिंग'
    },
    {
      textEn: 'Correlation with clinical findings',
      textHi: 'नैदानिक निष्कर्षों के साथ तुलनात्मक विश्लेषण'
    },
    {
      textEn: 'Support for both routine and complex cases',
      textHi: 'नियमित और जटिल दोनों मामलों के लिए पूर्ण समर्थन'
    },
    {
      textEn: 'Collaboration with your treating doctor',
      textHi: 'आपके उपचारकर्ता डॉक्टर के साथ निरंतर समन्वय'
    }
  ]

  return (
    <section className="relative w-full bg-slate-50/70 py-14 sm:py-18 lg:py-20 border-b border-slate-200/80 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Expert Doctor Consultation Image */}
          <div className="lg:col-span-6 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-slate-200/90 group bg-slate-900">
            <img
              src={expertDoctorImg}
              alt={isHindi ? 'विशेषज्ञ रेडियोलॉजिस्ट परामर्श' : 'Expert Radiology Interpretation'}
              className="w-full h-full max-h-[440px] object-cover object-top block group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Right Column: Narrative & Key Points matching reference screenshot */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Eyebrow Tag */}
            <span className="text-xs sm:text-[13px] font-bold tracking-wider text-[#ea580c] uppercase block mb-2">
              {isHindi ? 'विशेषज्ञ व्याख्या' : 'EXPERT INTERPRETATION'}
            </span>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {isHindi ? 'सिर्फ छवियों से कहीं अधिक' : 'More Than Just Images'}
            </h2>

            {/* Paragraph Description */}
            <p className="text-slate-600 text-xs sm:text-sm md:text-[14.5px] leading-relaxed mb-6 sm:mb-7">
              {isHindi
                ? 'हमारे अनुभवी रेडियोलॉजिस्ट प्रत्येक स्कैन का सावधानीपूर्वक विश्लेषण करते हैं और आपके उपचारकर्ता डॉक्टर को सही निदान करने और आपके लिए सर्वोत्तम उपचार की योजना बनाने में मदद करने के लिए विस्तृत रिपोर्ट प्रदान करते हैं।'
                : 'Our experienced radiologists carefully analyse each scan and provide detailed reports to help your treating doctor make the right diagnosis and plan the best treatment for you.'}
            </p>

            {/* 4 Feature Points with Orange Checkmark Circles */}
            <div className="space-y-3 sm:space-y-3.5">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-slate-800 text-xs sm:text-sm font-semibold leading-snug group/item"
                >
                  {/* Orange Circular Checkmark Badge */}
                  <div className="w-5 h-5 rounded-full bg-[#ea580c] flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <span className="group-hover/item:text-[#ea580c] transition-colors">
                    {isHindi ? point.textHi : point.textEn}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
