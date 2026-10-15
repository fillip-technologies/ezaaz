import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  HeartHandshake,
  Activity,
  Users,
  BedDouble,
  Building2,
  Quote
} from 'lucide-react'
import hospitalImg from '../../../assets/home/why-choose-ejaz.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function AboutUsSection() {
  const { i18n } = useTranslation(['home', 'common'])
  const isHindi = i18n?.language === 'hi'
  const sectionRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)

  // 4 Core Hospital Stats
  const stats = [
    {
      value: '40+',
      label: isHindi ? 'अनुभवी डॉक्टर्स' : 'Experienced Doctors',
      sub: isHindi ? 'विभिन्न विशेषज्ञताओं में' : 'Across 15+ disciplines',
      icon: Users
    },
    {
      value: '100+',
      label: isHindi ? 'अत्याधुनिक बेड्स' : 'Advanced Inpatient Beds',
      sub: isHindi ? 'आईसीयू व डीलक्स वार्ड्स' : 'ICU, HDU & private suites',
      icon: BedDouble
    },
    {
      value: '250+',
      label: isHindi ? 'प्रशिक्षित मेडिकल स्टाफ' : 'Trained Clinical Staff',
      sub: isHindi ? '24×7 समर्पित देखभाल' : 'Dedicated nursing & paramedics',
      icon: Activity
    },
    {
      value: '15+',
      label: isHindi ? 'सुपर स्पेशियलिटीज़' : 'Super Specialties',
      sub: isHindi ? 'व्यापक सर्जिकल सेवाएं' : 'Comprehensive surgical departments',
      icon: Building2
    }
  ]

  // Smooth entrance & number count-up animation
  useGSAP(
    () => {
      if (!sectionRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      })

      tl.fromTo(
        leftColRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )

      tl.fromTo(
        rightColRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )

      // Count up for stats
      const statElements = sectionRef.current?.querySelectorAll('.about-stat-item') || []
      statElements.forEach((item, index) => {
        const numEl = item.querySelector('.stat-val')
        if (!numEl) return
        const originalText = numEl.getAttribute('data-value') || numEl.textContent || ''
        const match = originalText.match(/^([^\d]*)(\d+[\d,.]*)([^\d]*)$/)
        if (!match) return

        const prefix = match[1] || ''
        const rawNum = match[2].replace(/,/g, '')
        const targetNum = parseFloat(rawNum)
        const suffix = match[3] || ''

        if (isNaN(targetNum)) return
        numEl.textContent = `${prefix}0${suffix}`

        const counterObj = { val: 0 }
        tl.to(
          counterObj,
          {
            val: targetNum,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              numEl.textContent = `${prefix}${Math.round(counterObj.val)}${suffix}`
            },
            onComplete: () => {
              numEl.textContent = originalText
            }
          },
          index === 0 ? '-=0.4' : '<'
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f8f9fc] text-slate-800 py-12 sm:py-16 lg:py-20 border-b border-slate-200/80 overflow-hidden"
    >
      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#003a70 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Main 2-Column Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Narrative & Hospital Philosophy (Span 7) */}
          <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-start">
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              {isHindi ? (
                <>
                  एजाज क्लिनिक और{' '}
                  <span className="text-[#ea580c]">एडवांस्ड सर्जिकल हॉस्पिटल</span>, पटना
                </>
              ) : (
                <>
                  Ejaz Clinic &{' '}
                  <span className="text-[#ea580c]">Advanced Surgical Hospital</span>, Patna
                </>
              )}
            </h2>

            {/* In-depth Narrative */}
            <div className="space-y-4 sm:space-y-4.5 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक में हमारा मुख्य लक्ष्य प्रत्येक मरीज तक उत्कृष्ट, सुरक्षित और उन्नत चिकित्सा व सर्जिकल देखभाल पहुंचाना है। हमारी अत्यंत कुशल और संवेदनशील डॉक्टरों की टीम मरीजों की बीमारियों के सटीक निदान और स्थायी उपचार के लिए समर्पित है।'
                  : 'At Ejaz Clinic, our core mission is to deliver world-class, advanced medical and surgical care to every patient who walks through our doors. Our multidisciplinary team of highly accomplished and compassionate clinicians dedicates their expertise to accurate diagnosis, holistic recovery, and clinical excellence.'}
              </p>

              {/* Founding Principle Callout Quote Box */}
              <div className="my-6 p-5 sm:p-6 bg-white rounded-2xl border-l-4 border-[#ea580c] border-y border-r border-slate-200/80 shadow-sm relative overflow-hidden">
                <Quote className="w-8 h-8 text-orange-200 absolute top-4 right-4 -scale-x-100 pointer-events-none" />
                <p className="text-slate-800 text-sm sm:text-[15px] font-semibold leading-relaxed italic">
                  {isHindi
                    ? '“हम स्वास्थ्य सेवा के वित्तीय बोझ को पूरी तरह समझते हैं। हम गर्व और विनम्रता से यह कह सकते हैं कि एजाज क्लिनिक में किसी भी मरीज को इलाज का खर्च वहन न कर पाने के कारण कभी भी उपचार से वंचित नहीं किया गया है।”'
                    : '“We understand the financial burden of healthcare and strive to make care genuinely affordable. We can proudly yet humbly proclaim that at Ejaz Clinic, no patient has ever been refused care due to their inability to pay for their treatment.”'}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#ea580c]">
                  <span>— {isHindi ? 'डॉ. एजाज अली (संस्थापक, एजाज क्लिनिक)' : 'Dr. Ejaz Ali (Founder, Ejaz Clinic)'}</span>
                </div>
              </div>

              <p>
                {isHindi
                  ? 'डॉ. एजाज अली ने इसी उच्च मानवीय दर्शन के साथ अस्पताल की स्थापना की और इस पवित्र मिशन की मजबूत नींव रखी। वर्ष 2017 में प्रतिष्ठित मेयो क्लिनिक (USA) से अपना सर्जिकल प्रशिक्षण पूरा करने के बाद डॉ. शहज़ाद ने इसकी कमान संभाली। हमारे केंद्र में दी जाने वाली जटिल सर्जिकल प्रक्रियाओं को अत्याधुनिक ऊंचाइयों तक पहुंचाने के लिए विशेषज्ञ सर्जनों व स्वास्थ्य सेवा प्रदाताओं की सशक्त टीम तैयार की गई।'
                  : 'Dr. Ejaz Ali established the hospital on this profound philosophy, anchoring our institution in deep medical ethics. Dr. Shahzad, following surgical training at the prestigious Mayo Clinic (USA), took the baton in 2017. He spearheaded the modernization of our surgical suites, onboarding super-specialists and pioneering complex laparoscopic and oncological interventions across Eastern India.'}
              </p>

              <p>
                {isHindi
                  ? 'हमारी टीम लगातार विस्तार कर रही है और जिन बीमारियों का सफल इलाज किया जा रहा है, उनका दायरा भी व्यापक रूप से बढ़ा है। हम अत्यंत संवेदनशील और पारदर्शी तरीके से मरीजों की सेवा करने के लिए निरंतर तत्पर हैं।'
                  : 'Today, our facility treats thousands of complex surgical and acute medical cases each year, upholding uncompromising safety standards, transparent clinical protocols, and genuine human empathy.'}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Hospital Campus Visual & Statistics Grid (Span 5) */}
          <div ref={rightColRef} className="lg:col-span-5 space-y-6">
            
            {/* Hospital Building Image with Floating Badge */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-md group">
              <img
                src={hospitalImg}
                alt={isHindi ? 'एजाज क्लिनिक परिसर' : 'Ejaz Clinic Campus & Facility'}
                className="w-full h-[260px] sm:h-[320px] object-cover object-center group-hover:scale-105 transition-transform duration-500 block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ea580c] text-[11px] font-bold uppercase tracking-wider mb-1 shadow-sm">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'मरीज-केंद्रित सेवा' : 'Patient-Centric Care'}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold drop-shadow-md">
                  {isHindi
                    ? 'अत्याधुनिक मेडिकल इंफ्रास्ट्रक्चर एवं अनुभवी टीम'
                    : 'Modern Infrastructure & Compassionate Medical Care'}
                </h3>
              </div>
            </div>

            {/* 2x2 Statistics Grid */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon
                return (
                  <div
                    key={idx}
                    className="about-stat-item bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-orange-500/30 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        data-value={stat.value}
                        className="stat-val text-3xl sm:text-4xl font-extrabold text-[#c12532] tracking-tight leading-none"
                      >
                        {stat.value}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#ea580c] flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                        {stat.label}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {stat.sub}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
