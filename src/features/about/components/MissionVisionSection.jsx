import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import missionStepsImg from '../../../assets/about/mission-steps.jpg'
import visionHorizonImg from '../../../assets/about/vision-horizon.jpg'
import valuesCareImg from '../../../assets/about/values-care.jpg'

gsap.registerPlugin(ScrollTrigger)

// Dedicated, bulletproof vertical ribbon component with solid deep navy background & geometric pattern
function VerticalRibbon({ title }) {
  return (
    <div className="w-16 sm:w-20 md:w-24 bg-[#00284d] text-white shrink-0 flex items-center justify-center relative shadow-md z-20 overflow-hidden select-none border-r-2 border-[#ea580c]">
      {/* Deep Navy/Blue Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001a36] via-[#003366] to-[#002244] pointer-events-none" />

      {/* Geometric Moroccan/Islamic Lattice Watermark Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 0l18 18-18 18L0 18z' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M18 7l11 11-11 11L7 18z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Bold Vertical Text - High Contrast Crisp White on Deep Blue */}
      <span className="relative z-10 [writing-mode:vertical-rl] rotate-180 uppercase tracking-[0.25em] sm:tracking-[0.3em] font-black text-white text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] py-4">
        {title}
      </span>
    </div>
  )
}

export default function MissionVisionSection() {
  const { i18n } = useTranslation(['home', 'common'])
  const isHindi = i18n?.language === 'hi'
  const containerRef = useRef(null)

  // Smooth entrance stagger animation
  useGSAP(
    () => {
      if (!containerRef.current) return

      const cards = containerRef.current.querySelectorAll('.mv-card')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true
          }
        }
      )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#f8f9fc] py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 overflow-hidden"
    >
      {/* Background subtle micro-dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#003a70 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isHindi ? (
              <>
                हमारा <span className="text-[#ea580c]">मिशन, विजन</span> एवं मूल्य
              </>
            ) : (
              <>
                Our <span className="text-[#ea580c]">Mission, Vision</span> & Values
              </>
            )}
          </h2>
          <div className="w-16 h-1 bg-[#ea580c] rounded-full mx-auto mt-3 sm:mt-3.5" />
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal mt-3 leading-relaxed">
            {isHindi
              ? 'एजाज क्लिनिक का उद्देश्य विश्वस्तरीय सर्जिकल तकनीक और मानवीय संवेदना के समन्वय से प्रत्येक मरीज को नया जीवन प्रदान करना है।'
              : 'Guided by medical integrity, clinical excellence, and deep humanitarian values across every tier of patient care.'}
          </p>
        </div>

        {/* 3 Stacked Horizontal Cards Matching the Reference Design */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          
          {/* ======================================================== */}
          {/* CARD 1: OUR MISSION                                      */}
          {/* ======================================================== */}
          <div className="mv-card bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-row items-stretch">
            
            {/* Left Vertical Ribbon */}
            <VerticalRibbon title={isHindi ? 'हमारा मिशन' : 'OUR MISSION'} />

            {/* Inner Content & 3D Stair/Globe Graphic */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-between p-5 sm:p-7 md:p-10 lg:p-12 gap-6 md:gap-8 bg-white">
              
              {/* Left Text */}
              <div className="flex-1 max-w-xl text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-snug mb-3">
                  {isHindi
                    ? 'उन्नत, किफायती एवं 24×7 समर्पित सर्जिकल देखभाल'
                    : 'To Deliver World-Class, Compassionate & Affordable Surgical Care'}
                </h3>
                <p className="text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed">
                  {isHindi
                    ? 'हमारा मुख्य लक्ष्य बिहार एवं पूरे पूर्वी भारत में हर मरीज तक आधुनिकतम एवं सुरक्षित सर्जिकल चिकित्सा पहुंचाना है। हम यह सुनिश्चित करने के लिए पूर्णतः समर्पित हैं कि किसी भी मरीज को आर्थिक तंगी के कारण जीवन रक्षक उपचार से वंचित न रहना पड़े।'
                    : 'To provide state-of-the-art medical and surgical interventions of international standards across Bihar and Eastern India with 24×7 emergency and ICU support. We are dedicated to ensuring that no patient is ever denied quality surgical care due to financial constraints.'}
                </p>
                
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-bold text-[#003a70]">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md">24×7 Emergency & Critical ICU</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md">Zero Patient Denied</span>
                </div>
              </div>

              {/* Right Illustration: 3D Stairs ascending to blue globe */}
              <div className="w-full md:w-[42%] lg:w-[45%] shrink-0 flex items-center justify-center">
                <img
                  src={missionStepsImg}
                  alt={isHindi ? 'हमारा मिशन' : 'Our Mission'}
                  className="w-full h-auto max-h-[190px] sm:max-h-[230px] md:max-h-[260px] object-contain block hover:scale-102 transition-transform duration-300"
                />
              </div>

            </div>

          </div>

          {/* ======================================================== */}
          {/* CARD 2: OUR VISION                                       */}
          {/* ======================================================== */}
          <div className="mv-card bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-row items-stretch min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">
            
            {/* Left Vertical Ribbon */}
            <VerticalRibbon title={isHindi ? 'हमारा विजन' : 'OUR VISION'} />

            {/* Panoramic Horizon Visual with Text Overlay on Right */}
            <div className="relative flex-1 overflow-hidden flex items-center bg-slate-100">
              
              {/* Panoramic Horizon & Binocular Image */}
              <img
                src={visionHorizonImg}
                alt={isHindi ? 'हमारा विजन' : 'Our Vision'}
                className="absolute inset-0 w-full h-full object-cover object-left"
              />

              {/* Smooth Gradient Veil on Right Side for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 via-45% to-white/95 sm:to-white/95" />

              {/* Right Side Vision Text */}
              <div className="relative z-10 ml-auto w-full sm:w-[62%] md:w-[58%] lg:w-[52%] p-5 sm:p-7 md:p-10 lg:p-12 text-right flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-snug mb-3">
                  {isHindi
                    ? 'मिनिमली इनवेसिव एवं एडवांस्ड सर्जरी का आदर्श केंद्र'
                    : 'Pioneering Global Benchmarks in Minimally Invasive Healthcare'}
                </h3>
                <p className="text-xs sm:text-sm md:text-[15px] text-slate-700 font-medium leading-relaxed">
                  {isHindi
                    ? 'पूर्वी भारत में चिकित्सा उत्कृष्टता का वह मानक स्थापित करना जहाँ मेयो क्लिनिक (USA) स्तरीय आधुनिक तकनीक, शून्य-संक्रमण मॉड्यूलर ऑपरेशन थिएटर और पारदर्शी उपचार हर जरूरतमंद को सुलभ हो सके।'
                    : 'To be recognized as Eastern India’s benchmark tertiary surgical institution, bringing Mayo Clinic-trained innovations, zero-infection standards, and ethical medical care to every segment of society.'}
                </p>
                <div className="mt-4 flex items-center justify-end gap-2 text-[11px] sm:text-xs font-bold text-[#ea580c]">
                  <span>{isHindi ? 'सटीक निदान • आधुनिक तकनीक • अटूट विश्वास' : 'Precision Surgery • Modern Technology • Unwavering Trust'}</span>
                </div>
              </div>

            </div>

          </div>

          {/* ======================================================== */}
          {/* CARD 3: OUR VALUE                                        */}
          {/* ======================================================== */}
          <div className="mv-card bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-row items-stretch">
            
            {/* Left Vertical Ribbon */}
            <VerticalRibbon title={isHindi ? 'हमारे मूल्य' : 'OUR VALUE'} />

            {/* Inner Content & Caring Hands Illustration */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-between p-5 sm:p-7 md:p-10 lg:p-12 gap-6 md:gap-8 bg-white">
              
              {/* Left Text & Values Bullet Points */}
              <div className="flex-1 max-w-xl text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-snug mb-2">
                  {isHindi
                    ? 'नैतिक चिकित्सा, मरीज सुरक्षा एवं मानवीय संवेदना'
                    : 'Committed to Medical Ethics, Patient Trust & Compassion'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {isHindi
                    ? 'मरीजों और उनके परिवारों के साथ विश्वास और सम्मान का दीर्घकालिक संबंध स्थापित करना:'
                    : 'Building enduring trust, safety, and transparency with every patient and family:'}
                </p>

                {/* Red/Orange Dot Bullet Points Matching Reference */}
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-[14px] text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#ea580c] mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-slate-900 font-bold">
                        {isHindi ? 'मरीज-केंद्रित सेवा: ' : 'Patient-Centric Care: '}
                      </strong>
                      {isHindi
                        ? 'प्रत्येक मरीज को अपने परिवार के समान सम्मान और आत्मीय संबल देना।'
                        : 'Treating every patient like family with dignity and empathy.'}
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#ea580c] mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-slate-900 font-bold">
                        {isHindi ? 'पारदर्शिता एवं ईमानदारी: ' : 'Unwavering Integrity: '}
                      </strong>
                      {isHindi
                        ? 'सटीक नैदानिक परामर्श और पूर्णतः पारदर्शी चिकित्सा शुल्क।'
                        : 'Honest diagnostic evaluations and strictly transparent treatment costs.'}
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#ea580c] mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-slate-900 font-bold">
                        {isHindi ? 'गुणवत्ता एवं नवाचार: ' : 'Quality & Innovation: '}
                      </strong>
                      {isHindi
                        ? 'शून्य संक्रमण सुरक्षा प्रोटोकॉल और आधुनिकतम सर्जिकल उपकरण।'
                        : 'Dedicated to zero-infection clinical protocols and surgical mastery.'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right Illustration: Caring Hands Holding Community Icons */}
              <div className="w-full md:w-[42%] lg:w-[45%] shrink-0 flex items-center justify-center">
                <img
                  src={valuesCareImg}
                  alt={isHindi ? 'हमारे मूल्य' : 'Our Values'}
                  className="w-full h-auto max-h-[190px] sm:max-h-[230px] md:max-h-[260px] object-contain block hover:scale-102 transition-transform duration-300"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
