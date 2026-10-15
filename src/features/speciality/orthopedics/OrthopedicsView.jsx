import SpecialtyHero from '../common/SpecialtyHero'
import OrthopedicsAboutSection from './components/OrthopedicsAboutSection'
import OrthopedicsTypesSection from './components/OrthopedicsTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import SpecialtyEquipmentSection from '../common/SpecialtyEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

import orthopedicHeroImg from '../../../assets/speciality/orthopedic-hero.png'

export default function OrthopedicsView() {
  const orthopedicsHighlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Orthopaedic & Joint Replacement Specialists With Over Two Decades of Surgical Mastery",
      textHi: 'एजाज क्लिनिक के प्रसिद्ध ऑर्थोपेडिक एवं जॉइंट रिप्लेसमेंट सर्जनों के नेतृत्व में दो दशकों से अधिक की सर्जिकल दक्षता'
    },
    {
      num: '02',
      textEn: 'Computer-Assisted Navigation & Alignment For Sub-Millimeter Implant Precision and Natural Joint Kinetics',
      textHi: 'सब-मिलीमीटर इम्प्लांट सटीकता और प्राकृतिक जोड़ गतिशीलता के लिए कंप्यूटर-असिस्टेड नेविगेशन'
    },
    {
      num: '03',
      textEn: 'Minimally Invasive Keyhole Arthroscopy Preserving Intact Joint Cartilage, Ligaments & Tendons',
      textHi: 'जोड़ों के कार्टिलेज, लिगामेंट्स और टेंडन को सुरक्षित रखने वाली सूक्ष्म कीहोल आर्थ्रोस्कोपी'
    },
    {
      num: '04',
      textEn: 'High-Durability Biocompatible Implants Engineered For Decades of Active, Pain-Free Weight-Bearing',
      textHi: 'दशकों तक सक्रिय और दर्द-मुक्त भार सहन करने के लिए तैयार किए गए अत्यधिक टिकाऊ बायोकम्पैटिबल इम्प्लांट्स'
    },
    {
      num: '05',
      textEn: 'Accelerated Rehabilitation Protocols Enabling Patients To Stand & Walk Within 24 Hours Post-Op',
      textHi: 'मरीजों को सर्जरी के 24 घंटे के भीतर खड़ा करने और चलाने के लिए त्वरित पुनर्वास प्रोटोकॉल'
    },
    {
      num: '06',
      textEn: 'Laminar Air Flow Modular Operating Theatres With 24/7 Dedicated Polytrauma Emergency Care',
      textHi: 'लैमिनार एयर फ्लो मॉड्यूलर ऑपरेशन थिएटर और 24/7 समर्पित पॉलीट्रॉमा आपातकालीन देखभाल'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <SpecialtyHero
        image={orthopedicHeroImg}
        titlePrefixEn="Orthopaedics &"
        titleHighlightEn="Joint Care"
        titlePrefixHi="ऑर्थोपेडिक्स एवं"
        titleHighlightHi="जोड़ देखभाल"
        altTextEn="Orthopaedics and Joint Care at Ejaz Clinic"
        altTextHi="एजाज क्लिनिक में ऑर्थोपेडिक्स एवं जोड़ देखभाल"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <OrthopedicsAboutSection />

      {/* Types of Orthopaedic Surgeries */}
      <OrthopedicsTypesSection />

      {/* Orthopaedic Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="Orthopaedic Care"
        titleHighlightEn="Highlights"
        titlePrefixHi="ऑर्थोपेडिक केयर"
        titleHighlightHi="हाइलाइट्स"
        highlights={orthopedicsHighlights}
      />

      {/* Advanced Technology & Equipment We Use (Machines 1 to 4) */}
      <SpecialtyEquipmentSection
        titlePrefixEn="Advanced Ortho-Surgical &"
        titleHighlightEn="Equipment We Use"
        titlePrefixHi="उन्नत ऑर्थो-सर्जिकल एवं"
        titleHighlightHi="उपकरण"
        descEn="At Ejaz Clinic, our orthopaedic operating theaters are equipped with digital fluoroscopy C-arms, HD arthroscopy towers, and specialized surgical positioning tables."
        descHi="एजाज क्लिनिक में, हमारे ऑर्थोपेडिक ऑपरेशन थिएटर डिजिटल फ्लोरोस्कोपी सी-आर्म, एचडी आर्थ्रोस्कोपी टावर और विशेष सर्जिकल टेबल से सुसज्जित हैं।"
      />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
