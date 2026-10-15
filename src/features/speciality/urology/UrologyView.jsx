import SpecialtyHero from '../common/SpecialtyHero'
import UrologyAboutSection from './components/UrologyAboutSection'
import UrologyTypesSection from './components/UrologyTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import SpecialtyEquipmentSection from '../common/SpecialtyEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

import urologyHeroImg from '../../../assets/speciality/urology-hero.png'

export default function UrologyView() {
  const urologyHighlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Senior Urologists & Endourology Specialists With Decades of Clinical Mastery",
      textHi: 'एजाज क्लिनिक के प्रतिष्ठित वरिष्ठ यूरोलॉजिस्ट्स एवं एंडोयूरोलॉजी सर्जनों का अनुभवी नेतृत्व'
    },
    {
      num: '02',
      textEn: 'High-Power Holmium:YAG Laser Lithotripsy Delivering Painless Stone Vaporization & Dusting',
      textHi: 'दर्द-रहित स्टोन वेपोराइजेशन और डस्टिंग प्रदान करने वाली उच्च-शक्ति होल्मियम:YAG लेजर लिथोट्रिप्सी'
    },
    {
      num: '03',
      textEn: 'Ultra-Thin Flexible Digital Ureterorenoscopes (RIRS) Navigating Complex Calyces Without Cuts',
      textHi: 'बिना किसी चीरे के किडनी की गहराई तक पहुँचने वाले अत्याधुनिक डिजिटल फ्लेक्सिबल यूरेट्रोरेनोस्कोप (RIRS)'
    },
    {
      num: '04',
      textEn: 'High-Definition C-Arm Fluoroscopic Guidance Ensuring Sub-Millimeter Accuracy During Mini-PCNL',
      textHi: 'मिनी-PCNL के दौरान सब-मिलीमीटर सटीकता सुनिश्चित करने वाली हाई-डेफिनिशन सी-आर्म फ्लोरोस्कोपी'
    },
    {
      num: '05',
      textEn: 'Advanced Bipolar TURP Resection Suites Enabling Rapid Recovery With Minimal Catheter Duration',
      textHi: 'न्यूनतम कैथेटर समय और त्वरित रिकवरी सुनिश्चित करने वाले उन्नत बाइपोलर TURP रिसेक्शन सुइट्स'
    },
    {
      num: '06',
      textEn: 'Accelerated Daycare Discharge Protocols With Dedicated 24/7 Renal Colic Emergency Triage',
      textHi: '24/7 किडनी दर्द (रीनल कोलिक) आपातकालीन देखभाल और त्वरित डेकेयर डिस्चार्ज प्रोटोकॉल'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section with urology-hero.png */}
      <SpecialtyHero
        image={urologyHeroImg}
        titlePrefixEn="Advanced"
        titleHighlightEn="Urology & Kidney Care"
        titlePrefixHi="उन्नत"
        titleHighlightHi="यूरोलॉजी एवं किडनी केयर"
        altTextEn="Advanced Urology and Kidney Care at Ejaz Clinic"
        altTextHi="एजाज क्लिनिक में उन्नत यूरोलॉजी एवं किडनी केयर"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <UrologyAboutSection />

      {/* Types of Urology & Laser Procedures */}
      <UrologyTypesSection />

      {/* Urology Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="Urology Care"
        titleHighlightEn="Highlights"
        titlePrefixHi="यूरोलॉजी केयर"
        titleHighlightHi="हाइलाइट्स"
        highlights={urologyHighlights}
      />

      {/* Advanced Technology & Equipment We Use (Machines 1 to 4) */}
      <SpecialtyEquipmentSection
        titlePrefixEn="Modern Endourology Suites &"
        titleHighlightEn="Equipment We Use"
        titlePrefixHi="आधुनिक एंडोयूरोलॉजी सुइट्स एवं"
        titleHighlightHi="उपकरण"
        descEn="At Ejaz Clinic, our dedicated urology operating theatres are equipped with high-power Holmium lasers, flexible digital video ureteroscopes, HD C-arm fluoroscopy, and advanced bipolar resectoscopes."
        descHi="एजाज क्लिनिक में, हमारे समर्पित यूरोलॉजी ऑपरेशन थिएटर उच्च-शक्ति होल्मियम लेजर, फ्लेक्सिबल डिजिटल वीडियो यूरेट्रोस्कोप, एचडी सी-आर्म फ्लोरोस्कोपी और बाइपोलर रिसेक्टोस्कोप से सुसज्जित हैं।"
      />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
