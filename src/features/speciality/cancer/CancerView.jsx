import SpecialtyHero from '../common/SpecialtyHero'
import CancerAboutSection from './components/CancerAboutSection'
import CancerTypesSection from './components/CancerTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import SpecialtyEquipmentSection from '../common/SpecialtyEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

import cancerHeroImg from '../../../assets/speciality/cancer-hero.png'

export default function CancerView() {
  const cancerHighlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Onco-Surgical Specialists With Over Two Decades of Operating Precision",
      textHi: 'एजाज क्लिनिक के प्रतिष्ठित ऑन्को-सर्जिकल विशेषज्ञों के नेतृत्व में दो दशकों से अधिक की सर्जिकल सटीकता'
    },
    {
      num: '02',
      textEn: 'Rigorous Multidisciplinary Tumor Board Staging & Personalized Evidence-Based Surgical Planning',
      textHi: 'सख्त बहुविषयक ट्यूमर बोर्ड स्टेजिंग और व्यक्तिगत साक्ष्य-आधारित सर्जिकल योजना'
    },
    {
      num: '03',
      textEn: 'Sub-Millimeter Microscopic R0 Margin Clearance Protecting Healthy Neighboring Organ Structures',
      textHi: 'स्वस्थ आसपास के अंगों की सुरक्षा के साथ उप-मिलीमीटर माइक्रोस्कोपिक R0 मार्जिन क्लीयरेंस'
    },
    {
      num: '04',
      textEn: 'Advanced Minimally Invasive Laparoscopic Resections Ensuring Reduced Pain and Faster Healing',
      textHi: 'कम दर्द और त्वरित रिकवरी सुनिश्चित करने वाले उन्नत मिनिमली इनवेसिव लैप्रोस्कोपिक रीसेक्शन'
    },
    {
      num: '05',
      textEn: 'State-of-the-Art Aesthetic & Oncoplastic Reconstruction For Optimal Function & Appearance',
      textHi: 'इष्टतम कार्यप्रणाली और रूप-रंग के लिए अत्याधुनिक एस्थेटिक एवं ऑन्कोप्लास्टिक पुनर्निर्माण'
    },
    {
      num: '06',
      textEn: 'Zero-Infection Modular Operating Suites Backed by 24/7 Dedicated Oncology Critical Care ICU',
      textHi: '24/7 समर्पित ऑन्कोलॉजी आईसीयू द्वारा समर्थित शून्य-संक्रमण मॉड्यूलर ऑपरेशन थिएटर'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <SpecialtyHero
        image={cancerHeroImg}
        titlePrefixEn="Cancer"
        titleHighlightEn="Surgery"
        titlePrefixHi="कैंसर"
        titleHighlightHi="सर्जरी"
        altTextEn="Cancer Surgery at Ejaz Clinic"
        altTextHi="एजाज क्लिनिक में कैंसर सर्जरी"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <CancerAboutSection />

      {/* Types of Cancer Surgery */}
      <CancerTypesSection />

      {/* Cancer Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="Cancer Care"
        titleHighlightEn="Highlights"
        titlePrefixHi="कैंसर केयर"
        titleHighlightHi="हाइलाइट्स"
        highlights={cancerHighlights}
      />

      {/* Advanced Technology & Equipment We Use (Machines 1 to 4) */}
      <SpecialtyEquipmentSection
        titlePrefixEn="Advanced Onco-Surgical &"
        titleHighlightEn="Equipment We Use"
        titlePrefixHi="उन्नत ऑन्को-सर्जिकल एवं"
        titleHighlightHi="उपकरण"
        descEn="At Ejaz Clinic, cancer surgery suites are backed by high-precision modular towers, digital fluoroscopy, and real-time radiologic guidance for complete tumor clearance."
        descHi="एजाज क्लिनिक में, कैंसर सर्जरी सुइट उच्च-सटीक मॉड्यूलर टावर, डिजिटल फ्लोरोस्कोपी और पूर्ण ट्यूमर क्लीयरेंस के लिए वास्तविक समय मार्गदर्शन से सुसज्जित हैं।"
      />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
