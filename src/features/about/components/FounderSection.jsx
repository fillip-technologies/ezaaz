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
      className="relative w-full bg-white text-slate-800 py-14 sm:py-18 lg:py-22 border-b border-slate-200/80 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Director Executive Portrait Card (5 cols)   */}
          {/* ======================================================== */}
          <div ref={leftColRef} className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-[480px] bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl transition-all duration-300 hover:shadow-2xl">
              
              {/* Doctor Photo - Natural portrait aspect ratio displaying scrub cap, logo & scrubs */}
              <div className="relative w-full aspect-[4/5] bg-slate-100 overflow-hidden">
                <img
                  src={directorImg}
                  alt={isHindi ? 'डॉ. शहज़ाद मरग़ूब अली, MD - निदेशक' : 'Dr. Shahzad Marghoob Ali, MD - Director'}
                  className="w-full h-full object-cover object-top block"
                />
              </div>

              {/* Integrated Leadership Caption Bar */}
              <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                    {isHindi ? 'डॉ. शहज़ाद मरग़ूब अली, MD' : 'Dr. Shahzad Marghoob Ali, MD'}
                  </h3>
                  <div className="text-xs sm:text-sm font-bold text-[#ea580c] mt-0.5">
                    {isHindi ? 'निदेशक (Director)' : 'Director'}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    MD (Summa Cum Laude) • {isHindi ? 'मेयो क्लिनिक (USA) प्रशिक्षित' : 'Mayo Clinic (USA) Trained'}
                  </p>
                </div>

                <div className="text-right shrink-0 pl-3 border-l border-slate-200">
                  <div className="text-2xl sm:text-3xl font-black text-[#ea580c] leading-none">
                    18+
                  </div>
                  <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
                    {isHindi ? 'वर्ष अनुभव' : 'Years Exp.'}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Director Message & Clinical Vision (7 cols) */}
          {/* ======================================================== */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col justify-start text-left">

            {/* Doctor Name & Designation */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
              {isHindi ? 'डॉ. शहज़ाद मरग़ूब अली, MD' : 'Dr. Shahzad Marghoob Ali, MD'}
            </h2>
            <p className="text-sm sm:text-base text-[#003a70] font-semibold mt-1">
              {isHindi
                ? 'निदेशक एवं वरिष्ठ सलाहकार सर्जन • एजाज क्लिनिक एवं एडवांस्ड सर्जिकल हॉस्पिटल'
                : 'Director & Senior Consultant Surgeon • Ejaz Clinic & Advanced Surgical Hospital'}
            </p>

            {/* Orange Accent Underline */}
            <div className="w-16 h-1 bg-[#ea580c] rounded-full my-4 sm:my-5" />

            {/* Narrative Content */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                {isHindi
                  ? 'एजाज क्लिनिक एवं एडवांस्ड सर्जिकल हॉस्पिटल, पटना के निदेशक के रूप में, डॉ. शहज़ाद मरग़ूब अली, MD उच्चतम नैदानिक मानकों, आधुनिक सर्जिकल तकनीकों और मानवीय संवेदना के साथ संस्थान का मार्गदर्शन कर रहे हैं। संस्थान की गौरवशाली परंपरा को आगे बढ़ाते हुए, उनका संकल्प है कि बिहार एवं पूर्वी भारत के प्रत्येक मरीज को सुलभ और सुरक्षित अंतरराष्ट्रीय स्तर का उपचार मिले।'
                  : 'As the Director of Ejaz Clinic & Advanced Surgical Hospital, Patna, Dr. Shahzad Marghoob Ali, MD leads our clinical and surgical institution with a commitment to evidence-based healthcare, precision surgery, and patient-first medical ethics. Carrying forward the institution’s proud heritage, he is dedicated to bringing world-class surgical standards directly to patients across Eastern India.'}
              </p>

              {/* Editorial Callout Quote Box */}
              <div className="my-5 p-5 sm:p-6 bg-orange-50/60 rounded-2xl border-l-4 border-[#ea580c] border-y border-r border-orange-100 shadow-xs">
                <Quote className="w-6 h-6 text-[#ea580c] mb-2 shrink-0 opacity-80" />
                <p className="text-slate-800 text-sm sm:text-[15.5px] font-medium leading-relaxed italic">
                  {isHindi
                    ? '“एजाज क्लिनिक में हमारा मूल सिद्धांत है: मरीज की सुरक्षा, पूर्ण पारदर्शिता और विश्वस्तरीय सर्जिकल गुणवत्ता। हमारे पास आने वाले प्रत्येक व्यक्ति को अत्याधुनिक चिकित्सा तकनीक के साथ-साथ परिवार जैसा आत्मीय संबल मिलना चाहिए।”'
                    : '“At Ejaz Clinic, our guiding principle is simple: uncompromising surgical safety, clinical transparency, and patient-centered excellence. Every life entrusted to us deserves world-class medical science delivered with the warmth and care of family.”'}
                </p>
                <div className="mt-3 text-xs sm:text-[13px] font-bold text-[#ea580c]">
                  — {isHindi ? 'डॉ. शहज़ाद मरग़ूब अली, MD (निदेशक, एजाज क्लिनिक)' : 'Dr. Shahzad Marghoob Ali, MD (Director, Ejaz Clinic)'}
                </div>
              </div>

              <p>
                {isHindi
                  ? 'चार्ल्स यूनिवर्सिटी, प्राग से सर्वोच्च स्थान (रैंक 1 - सुम्मा कम लाउड) प्राप्त करने और विश्व-प्रसिद्ध मेयो क्लिनिक (रोचेस्टर, मिनेसोटा, यूएसए) से 5-वर्षीय जनरल सर्जरी रेजीडेंसी व उन्नत फेलोशिप पूरी करने के उपरांत, डॉ. शहज़ाद अंतरराष्ट्रीय सर्जिकल विशेषज्ञता के साथ सेवाएं दे रहे हैं। उनके निर्देशन में, अस्पताल 4K अल्ट्रा-एचडी लैप्रोस्कोपिक थिएटर, आधुनिक आईसीयू और जटिल गैस्ट्रोइंटेस्टाइनल व ऑन्कोलॉजिकल सर्जरी के अत्याधुनिक मानकों से सुसज्जित है।'
                  : 'A graduate Ranked 1st (Summa Cum Laude, Red Diploma) from Charles University, Prague, followed by a rigorous 5-year General Surgery Residency and advanced Surgical Fellowships at the world-renowned Mayo Clinic in Rochester, Minnesota, USA, Dr. Shahzad brings unmatched global expertise to the region. Under his leadership, Ejaz Clinic is equipped with 4K ultra-high-definition laparoscopic suites, advanced intensive care units, and specialized protocols for minimally invasive gastrointestinal, hernia, and oncological procedures.'}
              </p>
            </div>

            {/* Interactive Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => navigateTo('/appointment-booking?doctorId=dr-shahzad')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d9532f] hover:bg-[#c44322] text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm hover:shadow-md hover:shadow-[#d9532f]/25 active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{isHindi ? 'परामर्श बुक करें' : 'Book Consultation'}</span>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('/doctor-profile?id=dr-shahzad')}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm tracking-wide active:scale-95 transition-all cursor-pointer"
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
