import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function LaparoscopicAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights
  const keyBenefits = [
    {
      title: isHindi ? 'न्यूनतम सर्जिकल आघात' : 'Minimal Surgical Trauma',
      desc: isHindi
        ? '3-5mm के छोटे चीरों से आंतरिक अंगों को कम से कम क्षति पहुंचती है।'
        : 'Sub-centimeter keyhole incisions drastically reduce muscle trauma and blood loss.'
    },
    {
      title: isHindi ? 'त्वरित डिस्चार्ज एवं रिकवरी' : 'Rapid 24-48h Discharge',
      desc: isHindi
        ? 'अधिकांश मरीज 24 से 48 घंटे में घर लौटकर सामान्य दिनचर्या शुरू कर सकते हैं।'
        : 'Patients recover rapidly, resuming normal diet and light routine within 24–48 hours.'
    },
    {
      title: isHindi ? 'नगण्य निशान एवं कम दर्द' : 'Negligible Pain & Scarring',
      desc: isHindi
        ? 'सूक्ष्म कीहोल निशानों के साथ दर्द निवारक दवाओं की न्यूनतम आवश्यकता।'
        : 'Tiny cosmetic scars that fade naturally, requiring minimal post-operative pain medication.'
    },
    {
      title: isHindi ? '4K अल्ट्रा-एचडी विज़ुअलाइज़ेशन' : '4K Ultra-HD Optical towers',
      desc: isHindi
        ? 'उच्च आवर्धन में नसों और रक्त वाहिकाओं की सुरक्षा के साथ सटीक सर्जरी।'
        : 'Microscopic optical magnification protecting critical nerves and blood vessels.'
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
          
          {/* LEFT SIDE: About Laparoscopic Surgery Content (Span 7 on desktop, 2nd on mobile) */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            

            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  लैप्रोस्कोपिक सर्जरी में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Pioneering Precision in{' '}
                  <span className="text-[#ea580c]">Laparoscopic Surgery</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में लैप्रोस्कोपिक सर्जरी (कीहोल सर्जरी) आधुनिक चिकित्सा का एक प्रमुख स्तंभ है। पारंपरिक ओपन सर्जरी की तुलना में इसमें केवल 3 से 5 मिलीमीटर के सूक्ष्म चीरे लगाए जाते हैं, जिसके माध्यम से उच्च-रिज़ॉल्यूशन 4K एंडोस्कोपिक कैमरा और विशेष सर्जिकल उपकरणों द्वारा जटिल ऑपरेशन अत्यधिक सटीकता से संपन्न किए जाते हैं।'
                  : 'At Ejaz Clinic, Laparoscopic (Keyhole) Surgery represents the gold standard of contemporary surgical interventions. Unlike conventional open procedures that require extensive abdominal incisions, laparoscopic surgery utilizes miniature 3mm to 5mm ports, a high-definition 4K endoscopic camera, and articulated microsurgical instruments.'}
              </p>
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक के अनुभवी सर्जिकल नेतृत्व में, हमारी टीम पित्त की थैली, जटिल हर्निया, अपेंडिक्स और पेट के गंभीर विकारों का सुरक्षित व स्थायी उपचार करती है। मरीजों को कम से कम दर्द, न्यूनतम रक्तस्राव और 24 से 48 घंटे के भीतर तेजी से स्वस्थ होकर घर लौटने की सुविधा मिलती है।'
                  : 'Led by Ejaz Clinic’s expert surgical leadership, our surgical team specializes in advanced hepatobiliary, gastrointestinal, hernia, and acute abdominal conditions. Patients benefit from sub-millimeter anatomical precision, minimal blood loss, almost zero infection risk, and seamless post-operative recovery.'}
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

          {/* RIGHT SIDE: Enquiry Form Card (Span 5 on desktop, 1st on mobile right after hero) */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full lg:sticky lg:top-28">
            <EnquiryForm specialtyName={isHindi ? 'लैप्रोस्कोपिक सर्जरी' : 'Laparoscopic Surgery'} />
          </div>

        </div>
      </div>
    </section>
  )
}
