import { useTranslation } from 'react-i18next'
import {
  Activity,
  HeartPulse,
  ShieldCheck,
  Award,
  CheckCircle2,
  PhoneCall,
  CalendarCheck
} from 'lucide-react'

export default function PhysiotherapyRehabProcessSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  const steps = [
    {
      num: '01',
      icon: Activity,
      titleEn: 'Biomechanical & Clinical Evaluation',
      titleHi: 'बायोमेकेनिकल एवं नैदानिक मूल्यांकन',
      descEn:
        'Comprehensive assessment of joint mobility, posture, muscle imbalances, pain triggers, and gait mechanics to establish a clear clinical recovery baseline.',
      descHi:
        'जोड़ों के लचीलेपन, मुद्रा, मांसपेशियों के असंतुलन, दर्द के कारणों और चाल का विस्तृत मूल्यांकन करके एक स्पष्ट रिकवरी आधार तैयार किया जाता है।'
    },
    {
      num: '02',
      icon: HeartPulse,
      titleEn: 'Pain Modulation & Manual Therapy',
      titleHi: 'लक्षित दर्द निवारण एवं मैनुअल थेरेपी',
      descEn:
        'Evidence-based hands-on joint mobilization, myofascial release, therapeutic stretching, and non-invasive electrotherapy for rapid, drug-free pain relief.',
      descHi:
        'हाथों द्वारा जोड़ों का संचलन, मायोफेशियल रिलीज, चिकित्सीय स्ट्रेचिंग और उन्नत इलेक्ट्रोथेरेपी द्वारा बिना दवाओं के तीव्र व स्थायी दर्द से राहत।'
    },
    {
      num: '03',
      icon: ShieldCheck,
      titleEn: 'Functional Strengthening & Stability',
      titleHi: 'प्रगतिशील मजबूती एवं संतुलन प्रशिक्षण',
      descEn:
        'Graduated therapeutic exercises, neuromuscular re-education, and core strengthening to safely rebuild muscle tone, joint stability, and endurance.',
      descHi:
        'क्रमबद्ध चिकित्सीय व्यायाम, न्यूरोमस्कुलर री-एजुकेशन और कोर स्ट्रेंथनिंग के माध्यम से मांसपेशियों की ताकत, जोड़ों की स्थिरता और सहनशक्ति की बहाली।'
    },
    {
      num: '04',
      icon: Award,
      titleEn: 'Independent Mobility & Preventive Care',
      titleHi: 'स्वतंत्र गतिशीलता एवं होम केयर गाइडेंस',
      descEn:
        'Personalized home exercise prescription, posture correction, ergonomics guidance, and fall-prevention training for sustainable, lifelong recovery.',
      descHi:
        'व्यक्तिगत होम एक्सरसाइज प्रोटोकॉल, कार्यस्थल एर्गोनॉमिक्स, मुद्रा सुधार और जीवनशैली सलाह ताकि दर्द दोबारा न हो और मरीज पूरी तरह स्वतंत्र रहे।'
    }
  ]

  const pillars = [
    {
      titleEn: '1:1 Certified Therapist Attention',
      titleHi: '1:1 व्यक्तिगत थेरेपिस्ट देखभाल',
      descEn: 'Dedicated one-on-one sessions ensuring precise exercise execution and safety.',
      descHi: 'प्रत्येक मरीज को समर्पित व्यक्तिगत सत्र, जिससे व्यायाम की शुद्धता और सुरक्षा सुनिश्चित होती है।'
    },
    {
      titleEn: 'Evidence-Based Protocols',
      titleHi: 'साक्ष्य-आधारित नैदानिक प्रोटोकॉल',
      descEn: 'Scientifically validated therapy plans coordinated with orthopedic surgeons.',
      descHi: 'ऑर्थोपेडिक सर्जनों के परामर्श से तैयार किए गए वैज्ञानिक और चिकित्सकीय रूप से प्रमाणित प्रोटोकॉल।'
    },
    {
      titleEn: 'Zero-Drug Natural Recovery',
      titleHi: 'दवा-मुक्त प्राकृतिक उपचार',
      descEn: 'Restoring functional health and mobility through physical re-conditioning.',
      descHi: 'शारीरिक पुनर्वास और प्राकृतिक विधियों द्वारा बिना दवा निर्भरता के दर्द-मुक्त जीवन की वापसी।'
    }
  ]

  const handleConsultClick = () => {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full bg-[#f8f9fc] py-14 sm:py-18 lg:py-22 border-t border-slate-200/80 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#ea580c] block mb-2">
            {isHindi ? 'फिजियोथेरेपी एवं पुनर्वास दृष्टिकोण' : 'PHYSIOTHERAPY & RESTORATIVE CARE'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {isHindi
              ? 'मरीज-केंद्रित व्यापक पुनर्वास एवं रिकवरी प्रक्रिया'
              : 'Our Comprehensive Rehabilitation & Recovery Approach'}
          </h2>
          <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
            {isHindi
              ? 'एजाज क्लिनिक में, फिजियोथेरेपी उपचार प्रत्येक मरीज के शारीरिक स्वास्थ्य, दर्द के स्तर और दैनिक जीवन की जरूरतों को ध्यान में रखकर व्यक्तिगत रूप से तैयार किया जाता है।'
              : 'At Ejaz Clinic, every physiotherapy plan is scientifically structured around the patient’s individual recovery milestones—combining pain relief, joint mobilization, neuromuscular re-education, and long-term functional independence.'}
          </p>
        </div>

        {/* 4-Step Progressive Rehabilitation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {steps.map((step) => {
            const IconComponent = step.icon
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-extrabold text-[#ea580c] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/70">
                      STEP {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-[#ea580c]" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-[17px] font-bold text-slate-900 leading-snug mb-2.5">
                    {isHindi ? step.titleHi : step.titleEn}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
                    {isHindi ? step.descHi : step.descEn}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* 3 Pillars of Care Strip */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {pillars.map((pillar, idx) => (
              <div key={idx} className={`${idx > 0 ? 'pt-6 md:pt-0 md:pl-8' : ''}`}>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {isHindi ? pillar.titleHi : pillar.titleEn}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7.5">
                  {isHindi ? pillar.descHi : pillar.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Action CTA Bar */}
          <div className="mt-8 pt-7 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">
              {isHindi
                ? 'क्या आप जोड़ों, रीढ़ या सर्जरी के बाद के दर्द से परेशान हैं? हमारे फिजियोथेरेपिस्ट से आज ही परामर्श लें।'
                : 'Struggling with joint stiffness, spine pain, or recovering from surgery? Consult our physiotherapy specialists today.'}
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleConsultClick}
                className="inline-flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{isHindi ? 'परामर्श बुक करें' : 'Book Consultation'}</span>
              </button>
              <a
                href="tel:+916203770070"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#ea580c]" />
                <span className="hidden sm:inline">+91-6203770070</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
