import SpecialtyHero from '../common/SpecialtyHero'
import GastrointestinalAboutSection from './components/GastrointestinalAboutSection'
import GastrointestinalTypesSection from './components/GastrointestinalTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import SpecialtyEquipmentSection from '../common/SpecialtyEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

import gastroHeroImg from '../../../assets/speciality/Gastroenterolory-hero.png'

export default function GastrointestinalView() {
  const gastroHighlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Surgical Gastroenterology & GI Specialists With Decades of Operating Precision",
      textHi: 'एजाज क्लिनिक के प्रतिष्ठित सर्जिकल गैस्ट्रोएंटरोलॉजी एवं जीआई विशेषज्ञों के नेतृत्व में दशकों की ऑपरेटिंग सटीकता'
    },
    {
      num: '02',
      textEn: 'State-Of-The-Art 4K Optical Towers For Sub-Millimeter Anatomical Clarity in Complex Digestive Surgeries',
      textHi: 'जटिल पाचन सर्जरी में उप-मिलीमीटर एनाटोमिकल स्पष्टता के लिए अत्याधुनिक 4K ऑप्टिकल एंडोस्कोपी टावर्स'
    },
    {
      num: '03',
      textEn: 'Minimally Invasive Laparoscopic Keyhole Techniques Ensuring Drastically Reduced Surgical Trauma & Blood Loss',
      textHi: 'सर्जिकल आघात और रक्तस्राव को न्यूनतम करने वाली उन्नत मिनिमली इनवेसिव लैप्रोस्कोपिक कीहोल तकनीकें'
    },
    {
      num: '04',
      textEn: 'Enhanced Recovery After Surgery (ERAS) Protocols For Early Oral Nutrition and Rapid Digestive Resumption',
      textHi: 'शीघ्र मौखिक पोषण और त्वरित पाचन बहाली के लिए आधुनिक एन्हांस्ड रिकवरी (ERAS) प्रोटोकॉल'
    },
    {
      num: '05',
      textEn: 'Comprehensive Management Of Complex Gallbladder, Biliary Duct, Pancreatic, Liver & Colorectal Diseases',
      textHi: 'पित्ताशय, पित्त नली, अग्नाशय, लिवर और कोलोरेक्टल रोगों का व्यापक व स्थायी सर्जिकल प्रबंधन'
    },
    {
      num: '06',
      textEn: 'Zero-Infection Operating Suites & 24/7 Dedicated Critical Care Support For Acute GI Emergencies',
      textHi: 'तीव्र जीआई आपात स्थितियों के लिए शून्य-संक्रमण ऑपरेटिंग सुइट्स और 24/7 समर्पित क्रिटिकल केयर आईसीयू'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <SpecialtyHero
        image={gastroHeroImg}
        titlePrefixEn="Gastrointestinal"
        titleHighlightEn="Surgery"
        titlePrefixHi="गैस्ट्रोइंटेस्टाइनल"
        titleHighlightHi="सर्जरी"
        altTextEn="Gastrointestinal Surgery at Ejaz Clinic"
        altTextHi="एजाज क्लिनिक में गैस्ट्रोइंटेस्टाइनल सर्जरी"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <GastrointestinalAboutSection />

      {/* Types of Gastrointestinal Surgery */}
      <GastrointestinalTypesSection />

      {/* GI Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="Gastrointestinal Care"
        titleHighlightEn="Highlights"
        titlePrefixHi="गैस्ट्रोइंटेस्टाइनल केयर"
        titleHighlightHi="हाइलाइट्स"
        highlights={gastroHighlights}
      />

      {/* Advanced Technology & Equipment We Use (Machines 1 to 4) */}
      <SpecialtyEquipmentSection
        titlePrefixEn="Advanced GI Surgical &"
        titleHighlightEn="Equipment We Use"
        titlePrefixHi="उन्नत जीआई सर्जिकल एवं"
        titleHighlightHi="उपकरण"
        descEn="At Ejaz Clinic, gastrointestinal surgical theaters are supported by 4K laparoscopic endoscopy stacks, digital fluoroscopic units, and ultrasonic energy dissection systems."
        descHi="एजाज क्लिनिक में, गैस्ट्रोइंटेस्टाइनल सर्जिकल थिएटर 4K लेप्रोस्कोपिक एंडोस्कोपी स्टैक, डिजिटल फ्लोरोस्कोपिक यूनिट और अल्ट्रासोनिक एनर्जी सिस्टम द्वारा संचालित हैं।"
      />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
