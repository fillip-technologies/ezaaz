import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Quote,
  Calendar,
  ArrowUpRight
} from 'lucide-react'
import directorImg from '../../../assets/about/dr-shazad.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function FounderSection() {
  const { i18n } = useTranslation(['home', 'common'])
  const isHindi = i18n?.language === 'hi'
  const sectionRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)

  const navigateTo = (url) => {
    if (window.history?.pushState) {
      window.history.pushState(null, '', url)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: url }))
    } else {
      window.location.href = url
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

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
      className="relative w-full bg-white text-slate-800 py-10 sm:py-12 lg:py-16 border-b border-slate-200/80 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Compact Executive Portrait Card (5 cols)     */}
          {/* ======================================================== */}
          <div ref={leftColRef} className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-[360px] sm:max-w-[390px] bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg transition-all duration-300 hover:shadow-xl">
              
              {/* Doctor Photo - Compact portrait height */}
              <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[375px] bg-slate-100 overflow-hidden">
                <img
                  src={directorImg}
                  alt={isHindi ? 'डॉ. शहज़ाद मरग़ूब अली, MD - निदेशक' : 'Dr. Shahzad Marghoob Ali, MD - Director'}
                  className="w-full h-full object-cover object-top block"
                />
              </div>

              {/* Compact Caption Bar */}
              <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {isHindi ? 'डॉ. शहज़ाद मरग़ूब अली, MD' : 'Dr. Shahzad Marghoob Ali, MD'}
                  </h3>
                  <div className="text-xs font-bold text-[#ea580c] mt-0.5">
                    {isHindi ? 'निदेशक (Director)' : 'Director'}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    MD (Summa Cum Laude) • {isHindi ? 'मेयो क्लिनिक (USA) प्रशिक्षित' : 'Mayo Clinic (USA) Trained'}
                  </p>
                </div>

                <div className="text-right shrink-0 pl-3 border-l border-slate-200">
                  <div className="text-xl sm:text-2xl font-black text-[#ea580c] leading-none">
                    18+
                  </div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
                    {isHindi ? 'वर्ष अनुभव' : 'Years Exp.'}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Streamlined Director Message (7 cols)       */}
          {/* ======================================================== */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col justify-start text-left">

            {/* Doctor Name & Designation */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-tight">
              {isHindi ? 'डॉ. शहज़ाद मरग़ूब अली, MD' : 'Dr. Shahzad Marghoob Ali, MD'}
            </h2>
            <p className="text-xs sm:text-sm text-[#003a70] font-semibold mt-1">
              {isHindi
                ? 'निदेशक एवं वरिष्ठ सलाहकार सर्जन • एजाज क्लिनिक एवं एडवांस्ड सर्जिकल हॉस्पिटल'
                : 'Director & Senior Consultant Surgeon • Ejaz Clinic & Advanced Surgical Hospital'}
            </p>

            {/* Orange Accent Underline */}
            <div className="w-14 h-1 bg-[#ea580c] rounded-full my-3 sm:my-3.5" />

            {/* Streamlined Narrative Content */}
            <div className="space-y-3 text-slate-600 text-[13.5px] sm:text-sm lg:text-[14.5px] leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक एवं एडवांस्ड सर्जिकल हॉस्पिटल के निदेशक के रूप में, डॉ. शहज़ाद मरग़ूब अली अंतरराष्ट्रीय मानकों, सर्जिकल सटीकता और मानवीय संवेदना के साथ मरीजों को सुलभ एवं सुरक्षित उपचार प्रदान कर रहे हैं।'
                  : 'As Director of Ejaz Clinic & Advanced Surgical Hospital, Dr. Shahzad Marghoob Ali leads our surgical institution with international standards, clinical precision, and patient-first ethics, ensuring advanced medical care is accessible across Eastern India.'}
              </p>

              {/* Compact Callout Quote Box */}
              <div className="my-3 p-3.5 sm:p-4 bg-orange-50/60 rounded-xl border-l-4 border-[#ea580c] border-y border-r border-orange-100 shadow-xs">
                <Quote className="w-5 h-5 text-[#ea580c] mb-1.5 shrink-0 opacity-80" />
                <p className="text-slate-800 text-xs sm:text-[13.5px] font-medium leading-relaxed italic">
                  {isHindi
                    ? '“हमारा मूल सिद्धांत है: मरीजों की सुरक्षा, पूर्ण पारदर्शिता और आधुनिक सर्जिकल गुणवत्ता, जो परिवार जैसी आत्मीयता के साथ दी जाती है।”'
                    : '“Our guiding mission is simple: patient safety, transparent care, and world-class surgical precision delivered with the warmth of family.”'}
                </p>
                <div className="mt-2 text-[11px] sm:text-xs font-bold text-[#ea580c]">
                  — {isHindi ? 'डॉ. शहज़ाद मरग़ूब अली, MD (निदेशक)' : 'Dr. Shahzad Marghoob Ali, MD (Director)'}
                </div>
              </div>

              <p>
                {isHindi
                  ? 'विश्व-प्रसिद्ध मेयो क्लिनिक (USA) से प्रशिक्षित और चार्ल्स यूनिवर्सिटी, प्राग के सर्वोच्च स्नातक (रैंक 1), उनके निर्देशन में अस्पताल 4K लैप्रोस्कोपिक थिएटर, समर्पित आईसीयू और जटिल सर्जरी के आधुनिक मानकों से सुसज्जित है।'
                  : 'Trained at the world-renowned Mayo Clinic (USA) and graduating Rank 1 from Charles University, Prague, he directs our 4K ultra-HD laparoscopic operation theatres, advanced ICU, and minimally invasive gastrointestinal surgeries.'}
              </p>
            </div>

            {/* Interactive Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('/appointment-booking?doctorId=dr-shahzad')}
                className="inline-flex items-center gap-2 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#d9532f] hover:bg-[#c44322] text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md hover:shadow-[#d9532f]/25 active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{isHindi ? 'परामर्श बुक करें' : 'Book Consultation'}</span>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('/doctor-profile?id=dr-shahzad')}
                className="inline-flex items-center gap-1.5 px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm tracking-wide active:scale-95 transition-all cursor-pointer"
              >
                <span>{isHindi ? 'विस्तृत प्रोफाइल देखें' : 'View Full Profile'}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
