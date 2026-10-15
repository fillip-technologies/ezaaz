import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function GeneralSurgeryAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights
  const keyBenefits = [
    {
      title: isHindi ? 'उन्नत मिनिमली इनवेसिव एवं ओपन सर्जरी' : 'Advanced Keyhole & Open Procedures',
      desc: isHindi
        ? 'पेट के रोगों, पित्त, अपेंडिक्स और आंतों के विकारों के लिए आधुनिक सुरक्षित सर्जिकल तकनीकें।'
        : 'State-of-the-art operative solutions tailored for gastrointestinal, abdominal, and soft tissue pathologies.'
    },
    {
      title: isHindi ? '24/7 आपातकालीन सर्जिकल केयर' : '24/7 Acute Surgical Emergencies',
      desc: isHindi
        ? 'एक्यूट एब्डोमेन, आंतों में रुकावट और आपातकालीन संक्रमण के लिए त्वरित जीवनरक्षक सर्जिकल हस्तक्षेप।'
        : 'Rapid stabilization and immediate surgical intervention for acute abdomen, trauma, and perforations.'
    },
    {
      title: isHindi ? 'उन्नत लेजर प्रोक्टोलॉजी समाधान' : 'Laser Daycare Proctology',
      desc: isHindi
        ? 'बवासीर (Piles), फिशर और फिस्टुला का दर्द-मुक्त लेजर तकनीक द्वारा उसी दिन डिस्चार्ज वाला उपचार।'
        : 'Painless, stitch-free laser treatments for piles, fissure, and fistula with same-day return home.'
    },
    {
      title: isHindi ? 'शून्य-संक्रमण मॉड्यूलर वातावरण' : 'Zero-Infection Modular OT Suites',
      desc: isHindi
        ? 'HEPA-फ़िल्टर युक्त लैमिनार एयर फ्लो थिएटर्स और कठोर स्टरलाइजेशन मानकों के साथ सुरक्षित देखभाल।'
        : 'Ultra-clean laminar air flow surgical environments minimizing infection risks to negligible levels.'
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
          
          {/* LEFT SIDE: About General Surgery Content */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  सामान्य सर्जरी में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Pioneering Precision in{' '}
                  <span className="text-[#ea580c]">General Surgery</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में सामान्य सर्जरी विभाग आधुनिक सर्जिकल विज्ञान की आधारशिला है। हमारे प्रतिष्ठित वरिष्ठ सर्जनों के नेतृत्व में, हम उदर (पेट), पाचन तंत्र, थायरॉयड, स्तन, कोमल ऊतकों और एनोरेक्टल विकारों का व्यापक व सुरक्षित समाधान प्रदान करते हैं।'
                  : 'At Ejaz Clinic, the Department of General Surgery delivers comprehensive, patient-centered operative care spanning abdominal, gastrointestinal, soft tissue, endocrine, and anorectal conditions. Guided by senior surgical leadership, every procedure is executed with meticulous anatomical precision.'}
              </p>
              <p>
                {isHindi
                  ? 'चाहे पित्ताशय की पथरी हो, तीव्र अपेंडिसाइटिस, आंतों की रुकावट, या बवासीर व फिस्टुला की समस्या—हमारी टीम ओपन एवं मिनिमली इनवेसिव लेजर दोनों विधियों में निपुण है। 24/7 सुसज्जित क्रिटिकल केयर और अनुभवी नर्सिंग टीम के साथ, हम न्यूनतम दर्द और त्वरित स्वस्थता सुनिश्चित करते हैं।'
                  : 'From routine elective excisions to complex emergency abdominal interventions and advanced laser proctology, our multidisciplinary surgical team ensures minimal surgical trauma, minimal blood loss, and accelerated return to everyday activities.'}
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
            <EnquiryForm specialtyName={isHindi ? 'सामान्य सर्जरी' : 'General Surgery'} />
          </div>

        </div>
      </div>
    </section>
  )
}
