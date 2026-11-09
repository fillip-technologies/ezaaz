import SpecialtyHero from '../common/SpecialtyHero'
import AnaesthesiaAboutSection from './components/AnaesthesiaAboutSection'
import AnaesthesiaTypesSection from './components/AnaesthesiaTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import SpecialtyEquipmentSection from '../common/SpecialtyEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

import anaesthesiaHeroImg from '../../../assets/speciality/anethesia-hero.png'

export default function AnaesthesiaView() {
  const anaesthesiaHighlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Senior Anaesthesiologists & Intensivists With Extensive Clinical Life-Support Mastery",
      textHi: 'एजाज क्लिनिक के प्रतिष्ठित वरिष्ठ एनेस्थीसियोलॉजिस्ट और इंटेंसिविस्ट्स के नेतृत्व में व्यापक जीवनरक्षक सर्जिकल दक्षता'
    },
    {
      num: '02',
      textEn: 'State-Of-The-Art Computerized Anaesthesia Workstations With Integrated Dual-Vaporizer Precision Delivery',
      textHi: 'एकीकृत डुअल-वेपोराइज़र प्रिसिजन डिलीवरी के साथ अत्याधुनिक कम्प्यूटरीकृत एनेस्थीसिया वर्कस्टेशन'
    },
    {
      num: '03',
      textEn: 'Real-Time High-Resolution Ultrasound Guidance For Sub-Millimeter Regional Nerve Block Injections',
      textHi: 'सब-मिलीमीटर रीजनल नर्व ब्लॉक इंजेक्शन के लिए वास्तविक समय उच्च-रिज़ॉल्यूशन अल्ट्रासाउंड मार्गदर्शन'
    },
    {
      num: '04',
      textEn: 'Continuous Multiparameter Hemodynamic & Gas Monitoring Protecting Cerebral, Cardiac & Pulmonary Safety',
      textHi: 'मस्तिष्क, हृदय और फेफड़ों की सुरक्षा सुनिश्चित करने वाली निरंतर मल्टीपैरामीटर हेमोडायनामिक निगरानी'
    },
    {
      num: '05',
      textEn: 'Accelerated Daycare Recovery Pathways Ensuring Prompt Awakening, Minimal Nausea & Early Discharge',
      textHi: 'त्वरित जागृति, न्यूनतम मिचली और शीघ्र डिस्चार्ज सुनिश्चित करने वाले उन्नत डेकेयर रिकवरी पाथवे'
    },
    {
      num: '06',
      textEn: '24/7 Dedicated Multidisciplinary Critical Care ICU Equipped With Modern Invasive Life-Support Systems',
      textHi: 'आधुनिक जीवनरक्षक प्रणालियों से सुसज्जित 24/7 समर्पित बहुविषयक क्रिटिकल केयर आईसीयू'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <SpecialtyHero
        image={anaesthesiaHeroImg}
        titlePrefixEn="Anaesthesia &"
        titleHighlightEn="Critical Care"
        titlePrefixHi="एनेस्थीसिया एवं"
        titleHighlightHi="क्रिटिकल केयर"
        altTextEn="Anaesthesia and Critical Care at Ejaz Clinic"
        altTextHi="एजाज क्लिनिक में एनेस्थीसिया एवं क्रिटिकल केयर"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <AnaesthesiaAboutSection />

      {/* Types of Anaesthesia & Specialized Critical Services */}
      <AnaesthesiaTypesSection />

      {/* Anaesthesia Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="Anaesthesia Care"
        titleHighlightEn="Highlights"
        titlePrefixHi="एनेस्थीसिया केयर"
        titleHighlightHi="हाइलाइट्स"
        highlights={anaesthesiaHighlights}
      />

      {/* Advanced Technology & Equipment We Use (Machines 1 to 4) */}
      <SpecialtyEquipmentSection
        titlePrefixEn="Advanced Anaesthesia Suites &"
        titleHighlightEn="Equipment We Use"
        titlePrefixHi="उन्नत एनेस्थीसिया सुइट्स एवं"
        titleHighlightHi="उपकरण"
        descEn="At Ejaz Clinic, anaesthesia operating suites and critical care units are powered by digital ventilator workstations, multi-gas analyzers, and real-time hemodynamic monitors."
        descHi="एजाज क्लिनिक में, एनेस्थीसिया ऑपरेटिंग सुइट और क्रिटिकल केयर यूनिट डिजिटल वेंटिलेटर वर्कस्टेशन, मल्टी-गैस एनालाइज़र और रीयल-टाइम मॉनिटर द्वारा संचालित हैं।"
      />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
