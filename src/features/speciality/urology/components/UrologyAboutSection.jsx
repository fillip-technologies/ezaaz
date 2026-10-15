import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function UrologyAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights for Urology
  const keyBenefits = [
    {
      title: isHindi ? 'उन्नत लेजर लिथोट्रिप्सी (RIRS/PCNL)' : 'Advanced Laser Lithotripsy (RIRS/PCNL)',
      desc: isHindi
        ? 'बिना बड़े चीरे के किडनी और मूत्र मार्ग के जटिल से जटिल पत्थरों को बारीक धूल बनाकर निकालने की आधुनिक लेजर तकनीक।'
        : 'High-power Holmium laser stone dusting and suction evacuation through natural urinary tracts without cuts.'
    },
    {
      title: isHindi ? 'प्रोस्टेट का आधुनिक लेजर एवं बाइपोलर उपचार' : 'BPH & Prostate Laser Management',
      desc: isHindi
        ? 'बढ़े हुए प्रोस्टेट (BPH) के लिए उन्नत बाइपोलर TURP और लेजर एन्यूक्लिएशन द्वारा त्वरित पेशाब प्रवाह बहाली।'
        : 'Minimally invasive bipolar TURP and laser enucleation ensuring minimal bleeding and rapid normal urination.'
    },
    {
      title: isHindi ? 'पुनर्निर्माण एवं लैप्रोस्कोपिक यूरोलॉजी' : 'Reconstructive & Laparoscopic Urology',
      desc: isHindi
        ? 'यूरेथ्रल स्ट्रिक्चर, हाइड्रोसील, वैरिकोसील और पेल्विक-यूरेटेरिक जंक्शन अवरोध के लिए सूक्ष्म सर्जिकल समाधान।'
        : 'Keyhole corrective surgeries for PUJ obstruction (pyeloplasty), urethroplasty, and complex urinary tract repair.'
    },
    {
      title: isHindi ? 'विशिष्ट यूरो-ऑन्कोलॉजी कैंसर देखभाल' : 'Dedicated Uro-Oncology Care',
      desc: isHindi
        ? 'किडनी, मूत्राशय (ब्लैडर), प्रोस्टेट और टेस्टिकुलर ट्यूमर के लिए प्रारंभिक निदान और सटीक सर्जिकल निष्कासन।'
        : 'Comprehensive early detection, radical curative resections, and bladder-sparing oncological interventions.'
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
          
          {/* LEFT SIDE: About Urology & Kidney Care Narrative */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  यूरोलॉजी एवं किडनी केयर में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Pioneering Precision in{' '}
                  <span className="text-[#ea580c]">Urology & Kidney Care</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में यूरोलॉजी एवं किडनी केयर विभाग मूत्र प्रणाली (गुर्दे, मूत्रवाहिनी, मूत्राशय और मूत्रमार्ग) तथा पुरुष प्रजनन प्रणाली के सभी जटिल रोगों के लिए विश्वस्तरीय चिकित्सा एवं सर्जिकल देखभाल प्रदान करता है। हमारे अत्यधिक अनुभवी यूरोलॉजिस्ट्स अत्याधुनिक तकनीकों के साथ मरीजों का उपचार करते हैं।'
                  : 'At Ejaz Clinic, the Department of Urology & Kidney Care delivers comprehensive, world-class medical and surgical solutions for the urinary tract (kidneys, ureters, bladder, and urethra) as well as male reproductive health. Our senior urologists leverage state-of-the-art endourology and laser technology to treat conditions with pinpoint accuracy.'}
              </p>
              <p>
                {isHindi
                  ? 'हाई-पॉवर होल्मियम लेजर, फ्लेक्सिबल डिजिटल यूरेट्रोरेनोस्कोप (RIRS), और मिनिएचर PCNL के साथ हम बड़े से बड़े और जटिल पत्थरों को भी बिना किसी चीरे या न्यूनतम चीरे में सुरक्षित रूप से निकाल देते हैं। साथ ही बढ़े हुए प्रोस्टेट (BPH) और मूत्र संबंधी कैंसर के लिए हमारे पास त्वरित रिकवरी और न्यूनतम दर्द वाले उन्नत उपचार उपलब्ध हैं।'
                  : 'Utilizing ultra-precise Holmium laser lithotripsy, flexible digital RIRS, and mini-PCNL, we treat even large and staghorn kidney stones without invasive incisions. Coupled with advanced bipolar TURP for enlarged prostate and comprehensive uro-oncology protocols, we prioritize quick healing, minimal catheter stay, and restored quality of life.'}
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
            <EnquiryForm specialtyName={isHindi ? 'यूरोलॉजी' : 'Urology'} />
          </div>

        </div>
      </div>
    </section>
  )
}
