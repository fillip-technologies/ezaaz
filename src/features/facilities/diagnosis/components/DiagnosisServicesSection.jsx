import { useTranslation } from 'react-i18next'

import bloodTestsImg from '../../../../assets/diagnosis/blood-tests.jpg'
import urineTestsImg from '../../../../assets/diagnosis/urine-tests.jpg'
import liverFunctionImg from '../../../../assets/diagnosis/liver-function.jpg'
import kidneyFunctionImg from '../../../../assets/diagnosis/kidney-function.jpg'
import hormoneTestsImg from '../../../../assets/diagnosis/hormone-tests.jpg'
import infectionImmunityImg from '../../../../assets/diagnosis/infection-immunity.jpg'
import cardiacMarkersImg from '../../../../assets/diagnosis/cardiac-markers.jpg'
import wellnessTestsImg from '../../../../assets/diagnosis/wellness-tests.jpg'

export default function DiagnosisServicesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  const services = [
    {
      id: 'blood-tests',
      titleEn: 'Blood Tests',
      titleHi: 'रक्त परीक्षण (Blood Tests)',
      descEn: 'Complete blood count, sugar levels, thyroid, lipid profile and more.',
      descHi: 'कम्प्लीट ब्लड काउंट (CBC), शुगर लेवल, थायरॉइड, लिपिड प्रोफाइल एवं अन्य परीक्षण।',
      image: bloodTestsImg
    },
    {
      id: 'urine-tests',
      titleEn: 'Urine Tests',
      titleHi: 'मूत्र परीक्षण (Urine Tests)',
      descEn: 'Routine and specialized urine analysis for various conditions.',
      descHi: 'विभिन्न स्वास्थ्य स्थितियों और संक्रमणों के लिए नियमित व विशिष्ट मूत्र विश्लेषण।',
      image: urineTestsImg
    },
    {
      id: 'liver-function',
      titleEn: 'Liver Function Tests',
      titleHi: 'लिवर फंक्शन टेस्ट (LFT)',
      descEn: 'Assess liver health and detect related disorders.',
      descHi: 'लिवर स्वास्थ्य का सटीक मूल्यांकन और संबंधित विकारों की समय पर पहचान।',
      image: liverFunctionImg
    },
    {
      id: 'kidney-function',
      titleEn: 'Kidney Function Tests',
      titleHi: 'किडनी फंक्शन टेस्ट (KFT)',
      descEn: 'Evaluate kidney health and monitor function.',
      descHi: 'गुर्दे के स्वास्थ्य का मूल्यांकन और निरंतर कार्यप्रणाली की निगरानी।',
      image: kidneyFunctionImg
    },
    {
      id: 'hormone-tests',
      titleEn: 'Hormone Tests',
      titleHi: 'हार्मोन परीक्षण (Hormone Tests)',
      descEn: 'Thyroid, diabetes, fertility and other hormone-related tests.',
      descHi: 'थायरॉइड, मधुमेह, प्रजनन क्षमता और अन्य अंतःस्रावी हार्मोन जांच।',
      image: hormoneTestsImg
    },
    {
      id: 'infection-immunity',
      titleEn: 'Infection & Immunity Tests',
      titleHi: 'संक्रमण एवं प्रतिरक्षा परीक्षण',
      descEn: 'Detect infections and assess immune health.',
      descHi: 'वायरल व बैक्टीरियल संक्रमणों की पहचान और रोग-प्रतिरोधक क्षमता का आकलन।',
      image: infectionImmunityImg
    },
    {
      id: 'cardiac-markers',
      titleEn: 'Cardiac Markers',
      titleHi: 'कार्डियक मार्कर्स (Cardiac Markers)',
      descEn: 'Specialized tests for heart health.',
      descHi: 'हृदय स्वास्थ्य और आपातकालीन हृदय जोखिमों के लिए विशेष डायग्नोस्टिक परीक्षण।',
      image: cardiacMarkersImg
    },
    {
      id: 'wellness-tests',
      titleEn: 'Wellness & Preventive Tests',
      titleHi: 'वेलनेस एवं प्रिवेंटिव हेल्थ टेस्ट',
      descEn: 'Comprehensive health packages for early detection and better prevention.',
      descHi: 'प्रारंभिक पहचान और बेहतर रोकथाम के लिए संपूर्ण स्वास्थ्य पैकेज।',
      image: wellnessTestsImg
    }
  ]

  return (
    <section className="relative w-full bg-[#f8f9fc] py-14 sm:py-18 lg:py-22 border-b border-slate-200/80 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#ea580c] block mb-2">
              {isHindi ? 'हमारी डायग्नोस्टिक सेवाएं' : 'OUR DIAGNOSTIC SERVICES'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              {isHindi ? 'आपके स्वास्थ्य के लिए व्यापक परीक्षण' : 'Wide Range of Tests for Your Health'}
            </h2>
          </div>
          <p className="max-w-md text-slate-600 text-sm sm:text-[15px] leading-relaxed lg:text-right">
            {isHindi
              ? 'नियमित स्वास्थ्य जांच से लेकर विशिष्ट परीक्षणों तक, हम आपकी स्वास्थ्य आवश्यकताओं को पूरा करने के लिए डायग्नोस्टिक सेवाओं की एक विस्तृत श्रृंखला प्रदान करते हैं।'
              : 'From routine checkups to specialized tests, we offer a complete range of diagnostic services to meet your healthcare needs.'}
          </p>
        </div>

        {/* 8-Card Diagnostic Services Grid - Image + Text Only, Strictly NO Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image Container with hover zoom */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={isHindi ? service.titleHi : service.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 block"
                  loading="lazy"
                />
              </div>

              {/* Text Content Only - No button */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-start">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#ea580c] transition-colors">
                  {isHindi ? service.titleHi : service.titleEn}
                </h3>
                <p className="text-slate-600 text-[13px] sm:text-[13.5px] leading-relaxed">
                  {isHindi ? service.descHi : service.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
