import SpecialtyHero from '../common/SpecialtyHero'
import GeneralSurgeryAboutSection from './components/GeneralSurgeryAboutSection'
import GeneralSurgeryTypesSection from './components/GeneralSurgeryTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import SpecialtyEquipmentSection from '../common/SpecialtyEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

import generalSurgeryHeroImg from '../../../assets/speciality/general-surgery.png'

export default function GeneralSurgeryView() {
  const generalSurgeryHighlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Senior General Surgeons With Decades of Exceptional Operative Mastery",
      textHi: 'एजाज क्लिनिक के प्रतिष्ठित वरिष्ठ जनरल सर्जनों के नेतृत्व में दशकों की असाधारण सर्जिकल दक्षता'
    },
    {
      num: '02',
      textEn: 'State-Of-The-Art Minimally Invasive Laparoscopic & Sutureless Laser Proctology Workstations',
      textHi: 'अत्याधुनिक मिनिमली इनवेसिव लैप्रोस्कोपिक एवं बिना टांकों वाले लेजर प्रोक्टोलॉजी वर्कस्टेशन'
    },
    {
      num: '03',
      textEn: '24/7 Rapid Emergency Response Team For Acute Appendicitis, Intestinal Obstruction & Trauma',
      textHi: 'एक्यूट अपेंडिसाइटिस, आंतों में रुकावट और ट्रॉमा के लिए 24/7 त्वरित आपातकालीन सर्जिकल टीम'
    },
    {
      num: '04',
      textEn: 'Sub-Centimeter Cosmetic Incisions Ensuring Drastically Reduced Post-Operative Pain and Scarring',
      textHi: 'सब-सेंटीमीटर कॉस्मेटिक चीरे, जिससे ऑपरेशन के बाद दर्द और निशानों में भारी कमी आती है'
    },
    {
      num: '05',
      textEn: 'Accelerated Daycare Discharge Protocol For Laser Proctology, Minor Lumps & Gallbladder Cases',
      textHi: 'लेजर प्रोक्टोलॉजी, छोटी गांठों और पित्ताशय के मामलों के लिए त्वरित डेकेयर डिस्चार्ज प्रोटोकॉल'
    },
    {
      num: '06',
      textEn: 'Rigorous Multi-Stage Sterilization Standards Backed by Modern Intensive Care (ICU) Facilities',
      textHi: 'आधुनिक गहन चिकित्सा इकाई (ICU) सुविधाओं द्वारा समर्थित कठोर बहुस्तरीय स्टरलाइजेशन मानक'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <SpecialtyHero
        image={generalSurgeryHeroImg}
        titlePrefixEn="General"
        titleHighlightEn="Surgery"
        titlePrefixHi="सामान्य"
        titleHighlightHi="सर्जरी"
        altTextEn="General Surgery at Ejaz Clinic"
        altTextHi="एजाज क्लिनिक में सामान्य सर्जरी"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <GeneralSurgeryAboutSection />

      {/* Types of General Surgery */}
      <GeneralSurgeryTypesSection />

      {/* General Surgery Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="General Surgical"
        titleHighlightEn="Highlights"
        titlePrefixHi="जनरल सर्जिकल"
        titleHighlightHi="हाइलाइट्स"
        highlights={generalSurgeryHighlights}
      />

      {/* Advanced Technology & Equipment We Use (Machines 1 to 4) */}
      <SpecialtyEquipmentSection
        titlePrefixEn="Advanced Surgical Suites &"
        titleHighlightEn="Equipment We Use"
        titlePrefixHi="उन्नत सर्जिकल सुइट्स एवं"
        titleHighlightHi="उपकरण"
        descEn="At Ejaz Clinic, general surgical procedures are supported by modular operating theatres, digital C-arm fluoroscopy, and specialized surgical energy platforms."
        descHi="एजाज क्लिनिक में, सामान्य सर्जिकल प्रक्रियाएं मॉड्यूलर ऑपरेशन थिएटर, डिजिटल सी-आर्म फ्लोरोस्कोपी और उन्नत सर्जिकल एनर्जी प्लेटफॉर्म द्वारा समर्थित हैं।"
      />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
