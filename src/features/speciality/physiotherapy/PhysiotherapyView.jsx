import SpecialtyHero from '../common/SpecialtyHero'
import PhysiotherapyAboutSection from './components/PhysiotherapyAboutSection'
import PhysiotherapyTypesSection from './components/PhysiotherapyTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import PhysiotherapyRehabProcessSection from './components/PhysiotherapyRehabProcessSection'


export default function PhysiotherapyView() {
  const physioHighlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Certified Physical Therapists & Rehabilitation Specialists With Extensive Clinical Mastery",
      textHi: 'एजाज क्लिनिक के प्रतिष्ठित प्रमाणित फिजियोथेरेपिस्ट एवं पुनर्वास विशेषज्ञों के नेतृत्व में व्यापक नैदानिक दक्षता'
    },
    {
      num: '02',
      textEn: 'Modern Rehabilitation Gym Featuring Advanced Motorized Traction, IFT, Therapeutic Ultrasound & Laser',
      textHi: 'आधुनिक पुनर्वास जिम, जिसमें उन्नत मोटराइज्ड ट्रैक्शन, IFT, चिकित्सीय अल्ट्रासाउंड और लेजर उपकरण शामिल हैं'
    },
    {
      num: '03',
      textEn: 'Evidence-Based Post-Operative Joint Replacement Protocols Enabling Safe Walking Within 24 Hours Post-Op',
      textHi: 'साक्ष्य-आधारित पोस्ट-ऑपरेटिव जॉइंट रिप्लेसमेंट प्रोटोकॉल, जिससे सर्जरी के 24 घंटे के भीतर सुरक्षित चलना संभव होता है'
    },
    {
      num: '04',
      textEn: 'Comprehensive Stroke, Paralysis & Neuro-Developmental Re-Education Restoring Functional Independence',
      textHi: 'कार्यात्मक स्वतंत्रता बहाल करने वाला व्यापक स्ट्रोक, लकवा और न्यूरो-डेवलपमेंटल री-एजुकेशन पुनर्वास'
    },
    {
      num: '05',
      textEn: 'Personalized Athletic Conditioning & Biomechanical Training For Prompt and Safe Sports Comeback',
      textHi: 'शीघ्र और सुरक्षित खेल वापसी के लिए व्यक्तिगत एथलेटिक कंडीशनिंग और बायोमेकेनिकल प्रशिक्षण'
    },
    {
      num: '06',
      textEn: 'Compassionate Geriatric Fall-Prevention Programs Tailored For Elderly Balance, Bone Health & Safety',
      textHi: 'बुजुर्गों के संतुलन, हड्डियों के स्वास्थ्य और सुरक्षा के लिए तैयार किए गए करुणामय फॉल-प्रिवेंशन कार्यक्रम'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <SpecialtyHero
        pageKey="physiotherapy"
        titlePrefixEn="Physiotherapy &"
        titleHighlightEn="Rehabilitation"
        titlePrefixHi="फिजियोथेरेपी एवं"
        titleHighlightHi="पुनर्वास"
        altTextEn="Physiotherapy & Rehabilitation at Ejaz Clinic"
        altTextHi="एजाज क्लिनिक में फिजियोथेरेपी एवं पुनर्वास"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <PhysiotherapyAboutSection />

      {/* Types of Physiotherapy & Specialized Services */}
      <PhysiotherapyTypesSection />

      {/* Physiotherapy Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="Physiotherapy Care"
        titleHighlightEn="Highlights"
        titlePrefixHi="फिजियोथेरेपी केयर"
        titleHighlightHi="हाइलाइट्स"
        highlights={physioHighlights}
      />

      {/* Physiotherapy Rehabilitation Process & Patient Care Approach (Content Only) */}
      <PhysiotherapyRehabProcessSection />
    </div>
  )
}
