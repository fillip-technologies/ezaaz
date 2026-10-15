import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function GynaecologyAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights for Gynaecology & Obstetrics
  const keyBenefits = [
    {
      title: isHindi ? 'सुरक्षित मातृत्व एवं प्रसव देखभाल' : 'Safe Motherhood & Maternity Care',
      desc: isHindi
        ? 'नियमित प्रसव पूर्व जांच, दर्द-मुक्त सामान्य प्रसव और उच्च जोखिम गर्भावस्था का 24/7 विशेषज्ञ प्रबंधन।'
        : 'Dedicated antenatal screening, painless normal deliveries, and round-the-clock emergency obstetric care.'
    },
    {
      title: isHindi ? 'उन्नत लैप्रोस्कोपिक गायनेक सर्जरी' : 'Advanced Laparoscopic Gynae Surgery',
      desc: isHindi
        ? 'गर्भाशय निष्कासन (हिस्टेरेक्टॉमी), रसौली (फाइब्रॉएड) और अंडाशय सिस्ट का न्यूनतम चीरे वाली दूरबीन विधि से उपचार।'
        : 'Keyhole laparoscopic hysterectomy, myomectomy, and ovarian cystectomy ensuring minimal scarring and rapid discharge.'
    },
    {
      title: isHindi ? 'पीसीओएस एवं फर्टिलिटी सपोर्ट क्लिनिक' : 'PCOS & Fertility Support Clinic',
      desc: isHindi
        ? 'अनियमित माहवारी, पीसीओएस/पीसीओडी, हार्मोनल असंतुलन और बांझपन का समग्र चिकित्सकीय समाधान।'
        : 'Personalized treatment protocols for PCOS/PCOD reversal, hormonal optimization, and fertility counseling.'
    },
    {
      title: isHindi ? 'महिला कैंसर स्क्रीनिंग एवं वेलनेस' : 'Cervical Screening & Well-Woman Care',
      desc: isHindi
        ? 'पैप स्मीयर, एचपीवी टीकाकरण, गर्भाशय कैंसर स्क्रीनिंग और रजोनिवृत्ति (मेनोपॉज) के लक्षणों की विशेष देखभाल।'
        : 'Preventive Pap smears, colposcopy, HPV immunization, and comprehensive post-menopausal healthcare.'
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
          
          {/* LEFT SIDE: About Gynaecology & Obstetrics Narrative */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  स्त्री एवं प्रसूति रोग में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Pioneering Care in{' '}
                  <span className="text-[#ea580c]">Gynaecology & Obstetrics</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में स्त्री एवं प्रसूति रोग विभाग किशोरावस्था से लेकर मातृत्व और रजोनिवृत्ति तक महिलाओं के जीवन के हर चरण में संवेदनशील, गरिमापूर्ण और उच्च गुणवत्ता वाली स्वास्थ्य सेवा प्रदान करने के लिए समर्पित है। हमारी वरिष्ठ महिला स्त्री रोग विशेषज्ञ चिकित्सकों की टीम हर मरीज को व्यक्तिगत ध्यान और सुरक्षित चिकित्सा वातावरण प्रदान करती है।'
                  : 'At Ejaz Clinic, the Department of Gynaecology & Obstetrics provides compassionate, dignified, and world-class healthcare across all phases of a woman’s life—from adolescence through safe motherhood to healthy menopause. Our accredited female gynaecologists and obstetricians bring deep clinical experience and compassionate understanding to every consultation.'}
              </p>
              <p>
                {isHindi
                  ? 'आधुनिक लेबर डिलीवरी रूम, 24/7 आपातकालीन सिजेरियन ऑपरेशन थिएटर, हाई-डेफिनिशन 4D फीटल अल्ट्रासाउंड और उन्नत लैप्रोस्कोपिक सर्जिकल सुइट्स के साथ हम जटिल से जटिल मातृत्व और स्त्री रोग विकारों का सुरक्षित समाधान करते हैं। यहाँ माँ और बच्चे दोनों की पूर्ण सुरक्षा और स्वास्थ्य हमारी सर्वोच्च प्राथमिकता है।'
                  : 'Outfitted with modern labor delivery suites, 24/7 emergency LSCS operating facilities, high-definition 4D fetal ultrasound, and advanced laparoscopic towers, we manage high-risk pregnancies as well as complex gynaecological disorders with minimal pain, minimal hospital stay, and uncompromising patient privacy.'}
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
            <EnquiryForm specialtyName={isHindi ? 'स्त्री एवं प्रसूति रोग' : 'Gynaecology & Obstetrics'} />
          </div>

        </div>
      </div>
    </section>
  )
}
