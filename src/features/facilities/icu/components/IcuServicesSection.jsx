import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { HeartPulse, ShieldCheck, Stethoscope, Activity, Zap, CheckCircle2 } from 'lucide-react'

import cardiacMicuImg from '../../../../assets/icu/cardiac-micu.jpg'
import surgicalSicuImg from '../../../../assets/icu/surgical-sicu.jpg'
import neuroTraumaImg from '../../../../assets/icu/neuro-trauma-icu.jpg'

// Dedicated Vertical Ribbon matching the reference design with solid deep navy & geometric pattern
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

export default function IcuServicesSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  return (
    <section className="relative w-full bg-[#f8f9fc] py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 overflow-hidden font-sans">
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
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isHindi ? (
              <>
                समर्पित <span className="text-[#ea580c]">आईसीयू एवं क्रिटिकल केयर</span> सेवाएं
              </>
            ) : (
              <>
                Comprehensive <span className="text-[#ea580c]">ICU & Critical Care</span> Services
              </>
            )}
          </h2>
          <div className="w-16 h-1 bg-[#ea580c] rounded-full mx-auto mt-3 sm:mt-3.5" />
          <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-3 leading-relaxed max-w-2xl mx-auto">
            {isHindi
              ? 'आधुनिकतम लाइफ-सपोर्ट तकनीक, निरंतर इनवेसिव मॉनिटरिंग और 24×7 वरिष्ठ इंटेंसिविस्ट्स की निगरानी में संचालित विशिष्ट केयर यूनिट्स।'
              : 'Equipped with state-of-the-art life-support technologies, continuous invasive monitoring, and dedicated 24×7 senior intensivists.'}
          </p>
        </div>

        {/* 3 Stacked Horizontal Cards with Left Ribbon & Alternating Layout */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          
          {/* ======================================================== */}
          {/* CARD 1: CARDIAC & MEDICAL ICU (MICU / ICCU)              */}
          {/* ======================================================== */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-row items-stretch">
            
            {/* Left Vertical Ribbon */}
            <VerticalRibbon title={isHindi ? 'कार्डियक एवं मेडिकल' : 'CARDIAC & MICU'} />

            {/* Inner Content (Text on Left, Image on Right) */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-between p-5 sm:p-7 md:p-10 lg:p-12 gap-6 md:gap-8 bg-white">
              
              {/* Text Area */}
              <div className="flex-1 max-w-xl text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold mb-3 border border-red-200/80">
                  <HeartPulse className="w-3.5 h-3.5 text-red-600" />
                  <span>{isHindi ? 'हृदय एवं मल्टी-ऑर्गन क्रिटिकल केयर' : 'Cardiac & Multi-Organ Critical Care'}</span>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-snug mb-3">
                  {isHindi
                    ? 'उन्नत कार्डियक केयर एवं मेडिकल इंटेंसिव केयर यूनिट (MICU)'
                    : 'Advanced Cardiac Care & Medical Intensive Care Unit (MICU)'}
                </h3>
                
                <p className="text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed">
                  {isHindi
                    ? 'एक्यूट मायोकार्डियल इन्फार्कशन (हार्ट अटैक), कार्डियोजेनिक शॉक, गंभीर अतालता (Arrhythmias) और गंभीर मल्टी-ऑर्गन डिसफंक्शन के लिए समर्पित क्रिटिकल केयर। इसमें इनवेसिव आर्टेरियल लाइन मॉनिटरिंग, बेडसाइड 2D इकोकार्डियोग्राफी, और वरिष्ठ कार्डियोलॉजिस्टों की देखरेख में चौबीसों घंटे टेलीमेट्री शामिल है।'
                    : 'Dedicated critical care for acute myocardial infarction, cardiogenic shock, complex arrhythmias, and severe multi-organ medical conditions. Features invasive arterial line monitoring, bedside echocardiography, and continuous telemetry overseen by expert cardiologists and intensivists.'}
                </p>
                
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-bold text-[#003a70]">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md">24×7 Continuous Telemetry</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md">Invasive Hemodynamics</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md">Bedside 2D Echo & ABG</span>
                </div>
              </div>

              {/* Image Area */}
              <div className="w-full md:w-[42%] lg:w-[45%] shrink-0 flex items-center justify-center">
                <img
                  src={cardiacMicuImg}
                  alt={isHindi ? 'कार्डियक आईसीयू बेड एवं मॉनिटर' : 'Cardiac ICU and Hemodynamic Monitoring'}
                  className="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-cover rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 block"
                  loading="lazy"
                />
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 2: SURGICAL INTENSIVE CARE UNIT (SICU)              */}
          {/* (Alternating: Image on Left, Text on Right)               */}
          {/* ======================================================== */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-row items-stretch">
            
            {/* Left Vertical Ribbon */}
            <VerticalRibbon title={isHindi ? 'सर्जिकल आईसीयू' : 'SURGICAL SICU'} />

            {/* Inner Content (Image on Left, Text on Right) */}
            <div className="flex-1 flex flex-col md:flex-row-reverse items-center justify-between p-5 sm:p-7 md:p-10 lg:p-12 gap-6 md:gap-8 bg-white">
              
              {/* Text Area */}
              <div className="flex-1 max-w-xl text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isHindi ? 'पोस्ट-ऑपरेटिव सर्जिकल सुरक्षा' : 'Post-Operative Surgical Safety'}</span>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-snug mb-3">
                  {isHindi
                    ? 'सटीक पोस्ट-ऑपरेटिव रिकवरी एवं सर्जिकल आईसीयू (SICU)'
                    : 'Precision Post-Operative Recovery & Surgical Intensive Care (SICU)'}
                </h3>
                
                <p className="text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed">
                  {isHindi
                    ? 'जटिल लैप्रोस्कोपिक, ऑन्कोलॉजिकल (कैंसर), गैस्ट्रोइंटेस्टाइनल तथा पॉलीट्रॉमा सर्जरी के बाद मरीजों के लिए चौबीसों घंटे निगरानी। मॉड्यूलर लैमिनार एयरफ्लो पॉजिटिव-प्रेशर बेड्स, मल्टीमोडल पेन मैनेजमेंट तथा पोस्ट-ऑप जटिलताओं से बचाव के लिए स्ट्रिक्ट जीरो-इन्फेक्शन प्रोटोकॉल से सुसज्जित।'
                    : 'Round-the-clock monitoring for patients recovering from major laparoscopic, oncological, gastrointestinal, and complex surgeries. Equipped with ultra-sterile laminar airflow positive-pressure recovery bays, multimodal analgesia, and strict zero-infection sterile protocols.'}
                </p>
                
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-bold text-[#003a70]">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md">Laminar Airflow Positive Pressure</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md">Multimodal Pain Management</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md">Zero-Infection Standards</span>
                </div>
              </div>

              {/* Image Area */}
              <div className="w-full md:w-[42%] lg:w-[45%] shrink-0 flex items-center justify-center">
                <img
                  src={surgicalSicuImg}
                  alt={isHindi ? 'सर्जिकल आईसीयू रिकवरी यूनिट' : 'Surgical Intensive Care Unit Recovery'}
                  className="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-cover rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 block"
                  loading="lazy"
                />
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 3: NEURO-TRAUMA, STROKE & RESUSCITATION CARE        */}
          {/* (Text on Left, Image on Right)                           */}
          {/* ======================================================== */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-row items-stretch">
            
            {/* Left Vertical Ribbon */}
            <VerticalRibbon title={isHindi ? 'न्यूरो एवं ट्रॉमा' : 'NEURO & TRAUMA'} />

            {/* Inner Content (Text on Left, Image on Right) */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-between p-5 sm:p-7 md:p-10 lg:p-12 gap-6 md:gap-8 bg-white">
              
              {/* Text Area */}
              <div className="flex-1 max-w-xl text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200/80">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isHindi ? '24×7 इमरजेंसी ट्रॉमा एवं रिससिटेशन' : '24×7 Trauma & Resuscitation Response'}</span>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-snug mb-3">
                  {isHindi
                    ? 'क्रिटिकल न्यूरो-ट्रॉमा, स्ट्रोक केयर एवं रिससिटेशन सेंटर'
                    : 'Critical Neuro-Trauma, Stroke Care & Resuscitation Center'}
                </h3>
                
                <p className="text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed">
                  {isHindi
                    ? 'हेड इंजरी, तीव्र इस्केमिक स्ट्रोक, सेरेब्रल ब्लीड और सड़क दुर्घटना के गंभीर मामलों के लिए त्वरित रिससिटेशन प्रोटोकॉल। क्लोज्ड-लूप मैकेनिकल वेंटिलेटर्स, निरंतर इंट्राक्रैनियल प्रेशर मॉनिटरिंग और गोल्डन ऑवर में जीवन रक्षक थ्रॉम्बोलाइसिस हस्तक्षेप।'
                    : 'Rapid resuscitation protocols for acute traumatic brain injury, ischemic stroke, cerebral hemorrhage, and polytrauma emergencies. Features closed-loop mechanical ventilators, continuous intracranial pressure monitoring, and golden-hour emergency thrombolysis interventions.'}
                </p>
                
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-bold text-[#003a70]">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md">Rapid Stroke Thrombolysis</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md">Intracranial Monitoring</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-md">24×7 Senior Intensivist Presence</span>
                </div>
              </div>

              {/* Image Area */}
              <div className="w-full md:w-[42%] lg:w-[45%] shrink-0 flex items-center justify-center">
                <img
                  src={neuroTraumaImg}
                  alt={isHindi ? 'न्यूरो-ट्रॉमा एवं स्ट्रोक केयर' : 'Neuro-Trauma and Stroke Care Unit'}
                  className="w-full h-52 sm:h-64 md:h-72 lg:h-80 object-cover rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 block"
                  loading="lazy"
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
