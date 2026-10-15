import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'

import machine1 from '../../../../assets/speciality/laproscopic/machine-1.jpg'
import machine2 from '../../../../assets/speciality/laproscopic/machine-2.png'
import machine3 from '../../../../assets/speciality/laproscopic/machine-3.webp'
import machine4 from '../../../../assets/speciality/laproscopic/machine-4.webp'

export default function LaparoscopicEquipmentSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'
  const [activeIdx, setActiveIdx] = useState(0)

  const machines = [
    {
      id: 'machine-1',
      image: machine1,
      num: '01',
      tagEn: 'Surgical Suite',
      tagHi: 'सर्जिकल सुइट',
      nameEn: 'Modular Laparoscopic Operating Suite',
      nameHi: 'मॉड्यूलर लैप्रोस्कोपिक ऑपरेटिंग सुइट',
      descEn: 'State-of-the-art modular surgical environment with ceiling-mounted ergonomic displays, advanced anesthetic controls, and integrated endoscopy management for zero-infection, precision laparoscopy.',
      descHi: 'अत्याधुनिक मॉड्यूलर सर्जिकल वातावरण, जिसमें सीलिंग-माउंटेड एर्गोनोमिक डिस्प्ले, उन्नत एनेस्थेटिक नियंत्रण और शून्य-संक्रमण व सटीक लैप्रोस्कोपी के लिए एकीकृत एंडोस्कोपी प्रबंधन शामिल है।',
      specsEn: [
        '4K Ultra-HD Endoscopic Optical Towers',
        'Laminar Air Flow with HEPA filtration',
        'Ceiling-suspended articulated monitor arms',
        'Real-time multi-angle laparoscopic display'
      ],
      specsHi: [
        '4K अल्ट्रा-एचडी एंडोस्कोपिक ऑप्टिकल टावर्स',
        'HEPA निस्पंदन के साथ लैमिनार एयर फ्लो',
        'सीलिंग-निलंबित एर्गोनोमिक मॉनिटर आर्म्स',
        'रीयल-टाइम मल्टी-एंगल लैप्रोस्कोपिक डिस्प्ले'
      ]
    },
    {
      id: 'machine-2',
      image: machine2,
      num: '02',
      tagEn: 'Live Imaging',
      tagHi: 'लाइव इमेजिंग',
      nameEn: 'High-Resolution Digital C-Arm System',
      nameHi: 'हाई-रिज़ॉल्यूशन डिजिटल सी-आर्म सिस्टम',
      descEn: 'Ultra-low-dose continuous fluoroscopic guidance providing real-time sub-millimeter anatomical insight during complex laparoscopic, biliary, and vascular interventions.',
      descHi: 'अत्यंत कम-खुराक वाला निरंतर फ्लोरोस्कोपिक मार्गदर्शन, जो जटिल लैप्रोस्कोपिक, पित्त और संवहनी प्रक्रियाओं के दौरान वास्तविक समय की उप-मिलीमीटर स्पष्टता प्रदान करता है।',
      specsEn: [
        'Sub-millimeter anatomical fluoroscopy',
        'Ultra-low radiation protocol for patient safety',
        'Real-time vascular and biliary duct mapping',
        'High-contrast digital radiologic output'
      ],
      specsHi: [
        'उप-मिलीमीटर एनाटोमिकल फ्लोरोस्कोपी',
        'रोगी सुरक्षा के लिए अल्ट्रा-लो रेडिएशन प्रोटोकॉल',
        'रीयल-टाइम संवहनी और पित्त नली मैपिंग',
        'उच्च-कंट्रास्ट डिजिटल रेडियोलॉजिकल आउटपुट'
      ]
    },
    {
      id: 'machine-3',
      image: machine3,
      num: '03',
      tagEn: 'Mobile Fluoroscopy',
      tagHi: 'मोबाइल फ्लोरोस्कोपी',
      nameEn: 'Mobile Intraoperative C-Arm Fluoroscopy Unit',
      nameHi: 'मोबाइल इंट्राऑपरेटिव सी-आर्म फ्लोरोस्कोपी यूनिट',
      descEn: 'Agile dual-monitor workstation designed for prompt, distortion-free intraoperative radiologic evaluation directly inside the sterile operating field.',
      descHi: 'स्टेरिल ऑपरेटिंग क्षेत्र के भीतर त्वरित और सटीक इंट्राऑपरेटिव रेडियोलॉजिकल मूल्यांकन के लिए डुअल-मॉनिटर वर्कस्टेशन।',
      specsEn: [
        'Dual high-resolution medical-grade monitors',
        'Agile sterile-field mobility & compact footprint',
        'High-frequency pulsed fluoroscopic generator',
        'Instant digital image capture and recall'
      ],
      specsHi: [
        'डुअल हाई-रिज़ॉल्यूशन मेडिकल-ग्रेड मॉनिटर्स',
        'स्टेरिल-फील्ड गतिशीलता और कॉम्पैक्ट डिज़ाइन',
        'हाई-फ़्रीक्वेंसी पल्स्ड फ्लोरोस्कोपिक जनरेटर',
        'त्वरित डिजिटल इमेज कैप्चर और रिकॉल'
      ]
    },
    {
      id: 'machine-4',
      image: machine4,
      num: '04',
      tagEn: 'Interventional Station',
      tagHi: 'इंटरवेंशन स्टेशन',
      nameEn: 'Precision Radiography & Fluoroscopy Workstation',
      nameHi: 'प्रिसिजन रेडियोग्राफी एवं फ्लोरोस्कोपी वर्कस्टेशन',
      descEn: 'Motorized multi-axis examination and interventional surgical table ensuring ergonomic patient positioning and precision multi-angle diagnostic scans.',
      descHi: 'मोटराइज्ड मल्टी-एक्सिस एग्जामिनेशन और इंटरवेंशनल सर्जिकल टेबल, जो सटीक मल्टी-एंगल डायग्नोस्टिक स्कैन और आरामदायक स्थिति सुनिश्चित करती है।',
      specsEn: [
        'Motorized multi-axis table positioning',
        'Computerized ergonomic joystick controls',
        'High weight-capacity radiolucent tabletop',
        'Seamless pre- and post-operative assessment'
      ],
      specsHi: [
        'मोटराइज्ड मल्टी-एक्सिस टेबल पोजिशनिंग',
        'कम्प्यूटरीकृत एर्गोनोमिक जॉयस्टिक नियंत्रण',
        'उच्च क्षमता वाली रेडियोलूसेंट टेबलटॉप',
        'सटीक प्री- और पोस्ट-ऑपरेटिव मूल्यांकन'
      ]
    }
  ]

  const currentMachine = machines[activeIdx]

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? machines.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev === machines.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="relative w-full bg-white py-8 sm:py-10 lg:py-12 border-b border-slate-200/80">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header - Compact */}
        <div className="max-w-3xl mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-slate-900 tracking-tight leading-tight">
            {isHindi ? (
              <>
                अत्याधुनिक तकनीक एवं <span className="text-[#ea580c]">उपकरण</span>
              </>
            ) : (
              <>
                Advanced Technology & <span className="text-[#ea580c]">Equipment We Use</span>
              </>
            )}
          </h2>

          <p className="mt-1.5 text-slate-500 text-xs sm:text-[13.5px] leading-relaxed max-w-2xl">
            {isHindi
              ? 'एजाज क्लिनिक में, प्रत्येक लैप्रोस्कोपिक प्रक्रिया विश्व स्तरीय उन्नत सर्जिकल मशीनों और सटीक इमेजिंग सिस्टम द्वारा संचालित होती है।'
              : 'At Ejaz Clinic, our laparoscopic surgical suites are powered by world-class precision machines, ensuring ultra-clear visualization and surgical excellence.'}
          </p>
        </div>

        {/* SINGLE SHOWCASE FRAME - Compact Height */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden">
          
          {/* Main 2-Column Showcase Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left: Active Machine Image Frame (Compact Height) */}
            <div className="lg:col-span-7 relative h-[220px] sm:h-[270px] md:h-[310px] lg:h-[340px] bg-slate-950 overflow-hidden">
              <img
                key={currentMachine.id}
                src={currentMachine.image}
                alt={isHindi ? currentMachine.nameHi : currentMachine.nameEn}
                className="w-full h-full object-cover object-center animate-in fade-in zoom-in-95 duration-400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />

              {/* Machine Number Badge */}
              <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold tracking-wider">
                MACHINE {currentMachine.num} / 0{machines.length}
              </div>
            </div>

            {/* Right: Active Machine Details & Navigation - Compact */}
            <div className="lg:col-span-5 p-4 sm:p-5 lg:p-6 flex flex-col justify-between bg-white">
              
              <div>
                {/* Category & Step Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c]">
                    {isHindi ? currentMachine.tagHi : currentMachine.tagEn}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    {activeIdx + 1} of {machines.length}
                  </span>
                </div>

                {/* Machine Name */}
                <h3 className="mt-2 text-base sm:text-lg lg:text-[19px] font-bold text-slate-900 tracking-tight leading-snug">
                  {isHindi ? currentMachine.nameHi : currentMachine.nameEn}
                </h3>

                {/* Detailed Description */}
                <p className="mt-1.5 text-slate-500 text-xs sm:text-[13px] leading-relaxed line-clamp-3">
                  {isHindi ? currentMachine.descHi : currentMachine.descEn}
                </p>

                {/* Clinical Specs List - Compact 2-Column Grid */}
                <div className="mt-3.5 pt-3 border-t border-slate-100">
                  <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {isHindi ? 'मुख्य विशेषताएं' : 'Key Specifications'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {(isHindi ? currentMachine.specsHi : currentMachine.specsEn).map((spec, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Controls: Prev / Next Buttons - Compact */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {machines.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      aria-label={`View machine ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIdx === i ? 'w-6 bg-[#ea580c]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous machine"
                    className="w-8 h-8 rounded-full border border-slate-200 hover:border-[#ea580c] hover:bg-orange-50 text-slate-700 hover:text-[#ea580c] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next machine"
                    className="w-8 h-8 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Interactive Thumbnail Selector Tabs - Compact */}
          <div className="bg-slate-50/80 border-t border-slate-200/80 p-2 sm:p-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {machines.map((m, i) => {
              const isActive = activeIdx === i
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#ea580c] shadow-xs ring-1.5 ring-[#ea580c]/20'
                      : 'bg-white/60 border-slate-200/70 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                    <img
                      src={m.image}
                      alt={isHindi ? m.nameHi : m.nameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold text-[#ea580c] uppercase leading-none">
                      0{i + 1}
                    </div>
                    <div className="text-[11.5px] font-semibold text-slate-800 truncate mt-0.5">
                      {isHindi ? m.tagHi : m.tagEn}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
