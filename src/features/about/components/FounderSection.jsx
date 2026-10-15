import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Quote
} from 'lucide-react'
import founderImg from '../../../assets/home/doctor-4.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function FounderSection() {
  const { i18n } = useTranslation(['home', 'common'])
  const isHindi = i18n?.language === 'hi'
  const sectionRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)

  // Smooth GSAP Entrance
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
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )

      tl.fromTo(
        rightColRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-slate-800 py-14 sm:py-18 lg:py-22 border-b border-slate-200/80 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Presidential Executive Portrait Card (5 cols)*/}
          {/* ======================================================== */}
          <div ref={leftColRef} className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-[480px] bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl transition-all duration-300 hover:shadow-2xl">
              
              {/* Doctor Photo - Clean, unshaded natural aspect ratio (4/3) */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={founderImg}
                  alt={isHindi ? 'डॉ. एजाज अली - संस्थापक एवं चेयरमैन' : 'Dr. Ejaz Ali - Founder & Chairman'}
                  className="w-full h-full object-cover object-center block"
                />
              </div>

              {/* Integrated Leadership Caption Bar */}
              <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                    {isHindi ? 'डॉ. एजाज अली' : 'Dr. Ejaz Ali'}
                  </h3>
                  <div className="text-xs sm:text-sm font-bold text-[#ea580c] mt-0.5">
                    {isHindi ? 'संस्थापक एवं चेयरमैन' : 'Founder & Chairman'}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    MBBS, MS • {isHindi ? 'वरिष्ठ सलाहकार सर्जन' : 'Senior Consultant Surgeon'}
                  </p>
                </div>

                <div className="text-right shrink-0 pl-3 border-l border-slate-200">
                  <div className="text-2xl sm:text-3xl font-black text-[#ea580c] leading-none">
                    35+
                  </div>
                  <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
                    {isHindi ? 'वर्ष अनुभव' : 'Years Exp.'}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Executive Message & Philosophy (7 cols)    */}
          {/* ======================================================== */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col justify-start text-left">

            {/* Doctor Name & Designation */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
              {isHindi ? 'डॉ. एजाज अली' : 'Dr. Ejaz Ali'}
            </h2>
            <p className="text-sm sm:text-base text-[#003a70] font-semibold mt-1">
              {isHindi
                ? 'संस्थापक एवं मुख्य चिकित्सा सलाहकार • एजाज क्लिनिक एवं एडवांस्ड सर्जिकल हॉस्पिटल'
                : 'Founder & Chief Medical Advisor • Ejaz Clinic & Advanced Surgical Hospital'}
            </p>

            {/* Orange Accent Underline */}
            <div className="w-16 h-1 bg-[#ea580c] rounded-full my-4 sm:my-5" />

            {/* Narrative Content */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                {isHindi
                  ? 'जब हमने दशकों पहले एजाज क्लिनिक की स्थापना की थी, तब हमारा एक ही ध्येय था—बिहार और पूर्वी भारत के प्रत्येक मरीज तक उच्चस्तरीय, नैतिक और सुलभ सर्जिकल उपचार पहुंचाना। हमने यह अटूट संकल्प लिया कि आर्थिक तंगी के कारण किसी भी व्यक्ति को इलाज से वंचित नहीं रहने दिया जाएगा।'
                  : 'When we founded Ejaz Clinic decades ago, our singular commitment was to bring dependable, compassionate, and uncompromising surgical healthcare to every family across Bihar and Eastern India. We established an inviolable principle that financial hardship should never stand between a human life and life-saving surgery.'}
              </p>

              {/* Editorial Callout Quote Box (Clean Icon with Zero Overlap) */}
              <div className="my-5 p-5 sm:p-6 bg-orange-50/60 rounded-2xl border-l-4 border-[#ea580c] border-y border-r border-orange-100 shadow-xs">
                <Quote className="w-6 h-6 text-[#ea580c] mb-2 shrink-0 opacity-80" />
                <p className="text-slate-800 text-sm sm:text-[15.5px] font-medium leading-relaxed italic">
                  {isHindi
                    ? '“चिकित्सा सेवा केवल एक पेशा नहीं, बल्कि मानवता के प्रति सबसे बड़ा दायित्व है। एजाज क्लिनिक में हम हर मरीज को अपने परिवार की तरह देखते हैं और आधुनिक तकनीक के साथ उन्हें आत्मीय संबल प्रदान करते हैं।”'
                    : '“Healthcare is not merely a profession; it is a sacred responsibility to human dignity. At Ejaz Clinic, we view every patient through the lens of family, blending cutting-edge surgical science with heartfelt human empathy.”'}
                </p>
                <div className="mt-3 text-xs sm:text-[13px] font-bold text-[#ea580c]">
                  — {isHindi ? 'डॉ. एजाज अली (संस्थापक एवं चेयरमैन)' : 'Dr. Ejaz Ali (Founder & Chairman)'}
                </div>
              </div>

              <p>
                {isHindi
                  ? 'आज प्रतिष्ठित मेयो क्लिनिक (USA) से प्रशिक्षित डॉ. शहज़ाद और विशेषज्ञों की हमारी टीम इस मिशन को अत्याधुनिक ऊंचाइयों तक ले जा रही है। 4K मॉड्यूलर ऑपरेशन थिएटर, समर्पित क्रिटिकल केयर आईसीयू और पारदर्शी चिकित्सा मानकों के साथ हमारा संस्थान निरंतर आपकी सेवा में समर्पित है।'
                  : 'Today, with Dr. Shahzad bringing his Mayo Clinic (USA) fellowship training and our team of super-specialists pioneering complex laparoscopic and oncological interventions, that same foundational soul beats at the heart of our institution.'}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
