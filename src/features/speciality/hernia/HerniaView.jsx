import SpecialtyHero from '../common/SpecialtyHero'
import HerniaAboutSection from './components/HerniaAboutSection'
import HerniaTypesSection from './components/HerniaTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import SpecialtyEquipmentSection from '../common/SpecialtyEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

import herniaHeroImg from '../../../assets/speciality/hernia-hero.png'

export default function HerniaView() {
  const herniaHighlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Hernia & Abdominal Wall Reconstruction Specialists With Decades of Operating Precision",
      textHi: 'एजाज क्लिनिक के प्रसिद्ध हर्निया एवं एब्डोमिनल वॉल रिकंस्ट्रक्शन विशेषज्ञों के नेतृत्व में दशकों की ऑपरेटिंग सटीकता'
    },
    {
      num: '02',
      textEn: 'Advanced 3D Biocompatible Anatomical Mesh Fixation Ensuring Permanent Structural Strength',
      textHi: 'स्थायी संरचनात्मक मजबूती सुनिश्चित करने वाला उन्नत 3D बायोकम्पैटिबल एनाटोमिकल मेश फिक्सेशन'
    },
    {
      num: '03',
      textEn: 'Minimally Invasive Laparoscopic TEP & TAPP Micro-Keyhole Techniques For Minimal Post-Op Discomfort',
      textHi: 'ऑपरेशन के बाद न्यूनतम असुविधा के लिए मिनिमली इनवेसिव लैप्रोस्कोपिक TEP और TAPP माइक्रो-कीहोल तकनीकें'
    },
    {
      num: '04',
      textEn: 'Near-Zero Recurrence Rate (<1%) Backed by Rigorous Defect Closure and Modern Surgical Protocols',
      textHi: 'सख्त डिफेक्ट क्लोज़र और आधुनिक सर्जिकल प्रोटोकॉल द्वारा समर्थित लगभग शून्य पुनरावृत्ति दर (<1%)'
    },
    {
      num: '05',
      textEn: 'Accelerated Same-Day Daycare Or 24-Hour Patient Discharge With Prompt Normalcy Resumption',
      textHi: 'त्वरित सामान्य दिनचर्या के साथ उसी दिन डेकेयर या 24 घंटे में त्वरित मरीज डिस्चार्ज'
    },
    {
      num: '06',
      textEn: 'Zero-Infection Operating Suites & 24/7 Dedicated Emergency Surgical Response For Obstructed Hernias',
      textHi: 'अवरुद्ध हर्निया के लिए शून्य-संक्रमण ऑपरेटिंग सुइट्स और 24/7 समर्पित आपातकालीन सर्जिकल प्रतिक्रिया'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <SpecialtyHero
        image={herniaHeroImg}
        titlePrefixEn="Hernia"
        titleHighlightEn="Surgery"
        titlePrefixHi="हर्निया"
        titleHighlightHi="सर्जरी"
        altTextEn="Hernia Surgery at Ejaz Clinic"
        altTextHi="एजाज क्लिनिक में हर्निया सर्जरी"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <HerniaAboutSection />

      {/* Types of Hernia Surgery */}
      <HerniaTypesSection />

      {/* Hernia Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="Hernia Care"
        titleHighlightEn="Highlights"
        titlePrefixHi="हर्निया केयर"
        titleHighlightHi="हाइलाइट्स"
        highlights={herniaHighlights}
      />

      {/* Advanced Technology & Equipment We Use (Machines 1 to 4) */}
      <SpecialtyEquipmentSection
        titlePrefixEn="Advanced Laparo-Surgical &"
        titleHighlightEn="Equipment We Use"
        titlePrefixHi="उन्नत लैपरो-सर्जिकल एवं"
        titleHighlightHi="उपकरण"
        descEn="At Ejaz Clinic, hernia surgery suites feature modular 4K endoscopy towers, digital fluoroscopic units, and specialized mesh fixation instruments for lifelong structural repair."
        descHi="एजाज क्लिनिक में, हर्निया सर्जरी सुइट 4K एंडोस्कोपी टावर, डिजिटल फ्लोरोस्कोपिक यूनिट और आजीवन संरचनात्मक मरम्मत के लिए विशेष उपकरणों से सुसज्जित हैं।"
      />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
