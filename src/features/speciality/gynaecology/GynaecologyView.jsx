import SpecialtyHero from '../common/SpecialtyHero'
import GynaecologyAboutSection from './components/GynaecologyAboutSection'
import GynaecologyTypesSection from './components/GynaecologyTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import SpecialtyEquipmentSection from '../common/SpecialtyEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

import gynecologyHeroImg from '../../../assets/speciality/gyanelogy-hero.png'

export default function GynaecologyView() {
  const gynaeHighlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Senior Female Gynaecologists & Obstetricians With Decades of Clinical Mastery",
      textHi: 'एजाज क्लिनिक की प्रतिष्ठित वरिष्ठ महिला स्त्री रोग विशेषज्ञों द्वारा संवेदनशील एवं कुशल मातृत्व देखभाल'
    },
    {
      num: '02',
      textEn: '24/7 Dedicated Labour Delivery Suites & Emergency Caesarean Section (LSCS) Operating Theatres',
      textHi: '24 घंटे समर्पित लेबर डिलीवरी सुइट्स एवं तत्काल आपातकालीन सिजेरियन ऑपरेशन की सुविधा'
    },
    {
      num: '03',
      textEn: 'High-Definition 4D Fetal Ultrasonography & Continuous Cardiotocography (CTG) Fetal Heart Monitoring',
      textHi: 'उन्नत 4D फीटल अल्ट्रासाउंड और निरंतर कार्डियोटोकोग्राफी (CTG) द्वारा गर्भस्थ शिशु की सुरक्षा'
    },
    {
      num: '04',
      textEn: 'Minimally Invasive Scarless Laparoscopic Hysterectomy & Ovarian Cyst Keyhole Surgical Excellence',
      textHi: 'न्यूनतम चीरे वाली उन्नत लैप्रोस्कोपिक हिस्टेरेक्टॉमी एवं अंडाशय सिस्ट की दर्द-रहित सर्जरी'
    },
    {
      num: '05',
      textEn: 'Dedicated Specialized Clinics For PCOS Reversal, Endometriosis & Pre-Conceptional Family Planning',
      textHi: 'पीसीओएस, एंडोमेट्रियोसिस और गर्भधारण-पूर्व काउंसलिंग के लिए विशेष समर्पित क्लिनिक'
    },
    {
      num: '06',
      textEn: 'Strict Patient Privacy, Dignity & Confidentiality With Modern Mother & Child Inpatient Suites',
      textHi: 'पूर्ण गोपनीयता, सम्मान और सुरक्षा मानकों से युक्त आधुनिक माँ एवं शिशु इनपेशेंट सुइट्स'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section with gyanelogy-hero.png */}
      <SpecialtyHero
        image={gynecologyHeroImg}
        titlePrefixEn="Gynaecology &"
        titleHighlightEn="Obstetrics"
        titlePrefixHi="स्त्री रोग एवं"
        titleHighlightHi="प्रसूति विज्ञान"
        altTextEn="Gynaecology and Obstetrics Care at Ejaz Clinic"
        altTextHi="एजाज क्लिनिक में स्त्री एवं प्रसूति रोग"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <GynaecologyAboutSection />

      {/* Types of Gynaecological Modalities */}
      <GynaecologyTypesSection />

      {/* Gynaecology Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="Women's Healthcare"
        titleHighlightEn="Highlights"
        titlePrefixHi="महिला स्वास्थ्य"
        titleHighlightHi="हाइलाइट्स"
        highlights={gynaeHighlights}
      />

      {/* Advanced Technology & Equipment We Use (Machines 1 to 4) */}
      <SpecialtyEquipmentSection
        titlePrefixEn="Modern Maternity Suites &"
        titleHighlightEn="Equipment We Use"
        titlePrefixHi="आधुनिक प्रसूति सुइट्स एवं"
        titleHighlightHi="उपकरण"
        descEn="At Ejaz Clinic, our maternity and gynaecology suites are equipped with computerized fetal monitors, 4D ultrasound, endoscopic visualization towers, and specialized neonatal warmers."
        descHi="एजाज क्लिनिक में, हमारे मातृत्व और स्त्री रोग सुइट्स कम्प्यूटरीकृत फीटल मॉनिटर, 4D अल्ट्रासाउंड, एंडोस्कोपिक विज़ुअलाइज़ेशन टावर और समर्पित नवजात वार्मर से सुसज्जित हैं।"
      />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
