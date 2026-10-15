import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function HerniaAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights
  const keyBenefits = [
    {
      title: isHindi ? 'तनाव-मुक्त 3D मेश रिपेयर' : 'Tension-Free 3D Mesh Repair',
      desc: isHindi
        ? 'आधुनिक बायोकम्पैटिबल मेश द्वारा पेट की कमजोर दीवार को आजीवन मजबूती प्रदान की जाती है।'
        : 'State-of-the-art biocompatible 3D meshes strengthen abdominal defect zones without tissue pulling.'
    },
    {
      title: isHindi ? 'उन्नत लैप्रोस्कोपिक TEP / TAPP' : 'Advanced Laparoscopic TEP / TAPP',
      desc: isHindi
        ? 'सूक्ष्म कीहोल चीरों द्वारा बिना मांसपेशियों को काटे सुरक्षित और सटीक हर्निया ऑपरेशन।'
        : 'Minimally invasive keyhole techniques ensuring zero muscle slicing and minimal post-op discomfort.'
    },
    {
      title: isHindi ? 'न्यूनतम पुनरावृत्ति दर (<1%)' : 'Near-Zero Recurrence (<1%)',
      desc: isHindi
        ? 'सटीक सर्जिकल फिक्सेशन और उन्नत तकनीकों के कारण हर्निया दोबारा होने की संभावना नगण्य।'
        : 'World-class surgical fixation protocols ensure lasting anatomical repair with under 1% recurrence.'
    },
    {
      title: isHindi ? 'त्वरित रिकवरी एवं 24h डिस्चार्ज' : 'Rapid Recovery & 24h Discharge',
      desc: isHindi
        ? 'अधिकांश मरीज 24 घंटे में घर लौटकर कुछ ही दिनों में सामान्य कामकाज शुरू कर सकते हैं।'
        : 'Patients experience swift ambulation, normal feeding, and return home comfortably within 24 hours.'
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
          
          {/* LEFT SIDE: About Hernia Surgery Content */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  हर्निया सर्जरी में{' '}
                  <span className="text-[#ea580c]">नैदानिक उत्कृष्टता</span>
                </>
              ) : (
                <>
                  Pioneering Precision in{' '}
                  <span className="text-[#ea580c]">Hernia Surgery</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में हर्निया सर्जरी विभाग आधुनिक लैप्रोस्कोपिक एवं न्यूनतम इनवेसिव तकनीकों द्वारा सभी प्रकार के हर्निया का स्थायी और सुरक्षित उपचार प्रदान करता है। हर्निया तब होता है जब कोई आंतरिक अंग या ऊतक पेट की कमजोर मांसपेशी की दीवार से बाहर उभर आता है।'
                  : 'At Ejaz Clinic, our Hernia Surgery and Abdominal Wall Reconstruction division is recognized for exceptional clinical outcomes. A hernia develops when internal abdominal tissue pushes through a tear or weakness in surrounding muscle walls, causing pain, swelling, and risk of strangulation.'}
              </p>
              <p>
                {isHindi
                  ? 'हम इनगुइनल (ग्रोइन), अम्बिलिकल (नाभि), इंसिजनल (पुराने ऑपरेशन के निशान पर), और जटिल वेंट्रल हर्निया के लिए अत्याधुनिक 3D मेश रिपेयर और लैप्रोस्कोपिक TEP/TAPP प्रक्रियाओं का उपयोग करते हैं। इससे मरीजों को कम से कम दर्द, न्यूनतम निशान और तुरंत सक्रिय जीवनशैली में लौटने की सुविधा मिलती है।'
                  : 'Our surgical specialists excel in minimally invasive laparoscopic TEP (Totally Extraperitoneal) and TAPP (Transabdominal Preperitoneal) repairs. Utilizing advanced tension-free prosthetic meshes, we permanently restore muscle integrity with microscopic incisions, minimal pain, and rapid resumption of everyday activities.'}
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
            <EnquiryForm specialtyName={isHindi ? 'हर्निया सर्जरी' : 'Hernia Surgery'} />
          </div>

        </div>
      </div>
    </section>
  )
}
