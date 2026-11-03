import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import EnquiryForm from '../../common/EnquiryForm'

export default function RoboticAboutSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  // Key Clinical Highlights
  const keyBenefits = [
    {
      title: isHindi ? 'सब-मिलीमीटर सर्जिकल सटीकता' : 'Sub-Millimeter Surgical Precision',
      desc: isHindi
        ? '360-डिग्री घूमने वाले माइक्रो-रिस्ट उपकरण जो मानव हाथ की तुलना में कहीं अधिक सूक्ष्मता से काम करते हैं।'
        : 'Articulated EndoWrist micro-instruments offering 7 degrees of freedom and greater dexterity than the human hand.'
    },
    {
      title: isHindi ? '3D हाई-डेफिनिशन ऑप्टिकल विज़न' : '3D High-Definition Visualization',
      desc: isHindi
        ? '10x से 15x आवर्धन के साथ संवेदनशील नसों और रक्त वाहिकाओं की स्पष्ट त्रि-आयामी गहराई।'
        : '10x–15x true 3D stereoscopic magnification providing crystal-clear depth perception of delicate tissues and nerves.'
    },
    {
      title: isHindi ? 'कंपन-मुक्त मोशन स्केलिंग' : 'Tremor Filtration & Motion Scaling',
      desc: isHindi
        ? 'सर्जन के हाथों के सूक्ष्म कंपनों को पूरी तरह समाप्त कर मिलीमीटर स्तर पर स्थिर और सुरक्षित चीरे।'
        : 'Active high-frequency tremor suppression translating surgeon hand motions into ultra-precise microscopic gestures.'
    },
    {
      title: isHindi ? 'न्यूनतम रक्तस्राव एवं त्वरित रिकवरी' : 'Minimal Blood Loss & Faster Discharge',
      desc: isHindi
        ? 'छोटे कीहोल चीरों के कारण न्यूनतम दर्द, नगण्य संक्रमण जोखिम और 24 से 48 घंटे में घर वापसी।'
        : 'Significantly less tissue trauma, negligible blood loss, and minimal post-op pain enabling discharge in 24–48 hours.'
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
          
          {/* LEFT SIDE: About Robotic Surgery Content (Span 7 on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-start">
            
            {/* Section Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {isHindi ? (
                <>
                  रोबोटिक सर्जरी में{' '}
                  <span className="text-[#ea580c]">अत्याधुनिक परिशुद्धता</span>
                </>
              ) : (
                <>
                  Next-Gen Precision in{' '}
                  <span className="text-[#ea580c]">Robotic Surgery</span>
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base lg:text-[15.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक एवं एडवांस्ड सर्जिकल हॉस्पिटल में रोबोटिक सर्जरी न्यूनतम चीरे (Minimally Invasive) वाली शल्य चिकित्सा का सबसे उन्नत रूप है। इस प्रणाली में सर्जन एक अत्याधुनिक एर्गोनोमिक कंसोल पर बैठकर 3D हाई-डेफिनिशन आवर्धन के माध्यम से मरीज के आंतरिक अंगों को अत्यंत स्पष्ट रूप से देखते हैं और रोबोटिक भुजाओं को नियंत्रित करते हैं।'
                  : 'At Ejaz Clinic & Advanced Surgical Hospital, Robotic-Assisted Surgery represents the pinnacle of modern surgical innovation. Combining high-definition 3D stereoscopic visualization, computer-assisted motion scaling, and articulating robotic arms that rotate 360 degrees, our surgeons perform intricate operations with unmatched accuracy.'}
              </p>
              <p>
                {isHindi
                  ? 'रोबोटिक तकनीक मानव हाथ की स्वाभाविक सीमाओं को पार करते हुए सूक्ष्म कंपनों (tremors) को समाप्त करती है। जटिल यूरोलॉजी, गैस्ट्रोइंटेस्टाइनल रीसेक्शन, गायनेकोलॉजी और हर्निया जैसी प्रक्रियाओं में इसके उपयोग से स्वस्थ ऊतकों, नसों और रक्त वाहिकाओं को क्षति नहीं पहुंचती। मरीजों को अत्यधिक कम दर्द, न्यूनतम रक्तस्राव और तेजी से सामान्य जीवन में लौटने का लाभ मिलता है।'
                  : 'Surpassing the physical constraints of open and conventional laparoscopic surgery, our robotic platform provides complete dexterity in confined anatomical spaces. From complex oncology and urological reconstructions to advanced gastrointestinal and hernia repairs, patients experience minimal tissue disruption, reduced reliance on pain medications, and significantly shorter hospital stays.'}
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

          {/* RIGHT SIDE: Dedicated Specialty Enquiry Form (Span 5 on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full">
            <EnquiryForm
              specialtyName={isHindi ? 'रोबोटिक सर्जरी' : 'Robotic Surgery'}
              pageName="Robotic Surgery"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

