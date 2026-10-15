import SpecialtyHero from '../common/SpecialtyHero'
import PlasticSurgeryAboutSection from './components/PlasticSurgeryAboutSection'
import PlasticSurgeryTypesSection from './components/PlasticSurgeryTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import SpecialtyEquipmentSection from '../common/SpecialtyEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

import plasticSurgeryHeroImg from '../../../assets/speciality/plastic-surgery.png'

export default function PlasticSurgeryView() {
  const plasticHighlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Board-Certified Plastic & Reconstructive Surgeons With Extensive Aesthetic Mastery",
      textHi: 'एजाज क्लिनिक के प्रतिष्ठित बोर्ड-प्रमाणित प्लास्टिक एवं रिकंस्ट्रक्टिव सर्जनों के नेतृत्व में व्यापक कॉस्मेटिक दक्षता'
    },
    {
      num: '02',
      textEn: 'High-Magnification Microvascular Surgical Operating Microscopes For Sub-Millimeter Flap & Nerve Reconnection',
      textHi: 'सब-मिलीमीटर फ्लैप और नसों के सटीक जुड़ाव के लिए उच्च-आवर्धन माइक्रोवैस्कुलर ऑपरेटिंग माइक्रोस्कोप'
    },
    {
      num: '03',
      textEn: 'Ultra-Fine Inconspicuous Scar Minimization & Multi-Layered Cosmetic Suture Techniques',
      textHi: 'अगोचर और न्यूनतम निशान सुनिश्चित करने वाली उन्नत मल्टी-लेयर्ड कॉस्मेटिक टांके तकनीक'
    },
    {
      num: '04',
      textEn: 'Modern Ultrasonic & Tumescent Liposuction Systems Ensuring Precise Body Sculpting With Swift Recovery',
      textHi: 'त्वरित रिकवरी और सटीक बॉडी शेपिंग सुनिश्चित करने वाली आधुनिक अल्ट्रासोनिक व ट्यूमसेंट लाइपोसुक्शन प्रणालियां'
    },
    {
      num: '05',
      textEn: 'Comprehensive Acute Burn Care Unit & Post-Burn Scar Contracture Rehabilitation Pathways',
      textHi: 'तीव्र बर्न देखभाल और जलने के बाद के संकुचन मुक्ति व पुनर्वास के लिए समर्पित क्लिनिकल पाथवे'
    },
    {
      num: '06',
      textEn: 'Daycare Aesthetic Suites Operating Under Highest Standards Of Clinical Confidentiality & Patient Safety',
      textHi: 'उच्चतम क्लिनिकल गोपनीयता और रोगी सुरक्षा मानकों के तहत संचालित आधुनिक डेकेयर एस्थेटिक सुइट्स'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section with plastic-surgery.png */}
      <SpecialtyHero
        image={plasticSurgeryHeroImg}
        titlePrefixEn="Plastic &"
        titleHighlightEn="Reconstructive Surgery"
        titlePrefixHi="प्लास्टिक एवं"
        titleHighlightHi="रिकंस्ट्रक्टिव सर्जरी"
        altTextEn="Plastic and Reconstructive Surgery at Ejaz Clinic"
        altTextHi="एजाज क्लिनिक में प्लास्टिक एवं रिकंस्ट्रक्टिव सर्जरी"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <PlasticSurgeryAboutSection />

      {/* Types of Plastic & Reconstructive Procedures */}
      <PlasticSurgeryTypesSection />

      {/* Plastic Surgery Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="Plastic Surgery"
        titleHighlightEn="Highlights"
        titlePrefixHi="प्लास्टिक सर्जरी"
        titleHighlightHi="हाइलाइट्स"
        highlights={plasticHighlights}
      />

      {/* Advanced Technology & Equipment We Use (Machines 1 to 4) */}
      <SpecialtyEquipmentSection
        titlePrefixEn="Modern Plastic Surgery Theatres &"
        titleHighlightEn="Equipment We Use"
        titlePrefixHi="आधुनिक प्लास्टिक सर्जरी थिएटर्स एवं"
        titleHighlightHi="उपकरण"
        descEn="At Ejaz Clinic, our dedicated cosmetic and reconstructive theaters are equipped with high-precision microsurgical microscopes, ultrasonic liposuction, specialized electrocautery, and advanced sterile monitoring suites."
        descHi="एजाज क्लिनिक में, हमारे समर्पित कॉस्मेटिक और पुनर्निर्माण ऑपरेशन थिएटर उच्च-सटीक माइक्रोसर्जिकल माइक्रोस्कोप, अल्ट्रासोनिक लाइपोसुक्शन और उन्नत स्टेराइल मॉनिटरिंग सुइट्स से सुसज्जित हैं।"
      />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
