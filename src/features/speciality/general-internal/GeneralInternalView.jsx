import SpecialtyHero from '../common/SpecialtyHero'
import GeneralInternalAboutSection from './components/GeneralInternalAboutSection'
import GeneralInternalTypesSection from './components/GeneralInternalTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import SpecialtyEquipmentSection from '../common/SpecialtyEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

import generalInternalHeroImg from '../../../assets/speciality/general-internal-hero.png'

export default function GeneralInternalView() {
  const internalHighlights = [
    {
      num: '01',
      textEn: "Led by Ejaz Clinic's Renowned Senior Consultant Physicians With Decades of Diagnostic Mastery",
      textHi: 'एजाज क्लिनिक के प्रतिष्ठित वरिष्ठ कंसल्टेंट फिजिशियंस के नेतृत्व में समग्र नैदानिक दक्षता'
    },
    {
      num: '02',
      textEn: 'Point-Of-Care Comprehensive Diagnostics & Rapid Biomarker Testing Guiding Prompt Clinical Decisions',
      textHi: 'त्वरित चिकित्सकीय निर्णय हेतु पॉइंट-ऑफ-केयर डायग्नोस्टिक्स एवं रैपिड बायोमार्कर टेस्टिंग'
    },
    {
      num: '03',
      textEn: 'Structured Lifestyle & Glycemic Protocols Halting Microvascular Complications in Chronic Diabetes',
      textHi: 'क्रोनिक डायबिटीज में नसों व गुर्दे की क्षति को रोकने वाले संरचित जीवनशैली व ग्लाइसेमिक प्रोटोकॉल'
    },
    {
      num: '04',
      textEn: 'Dedicated Isolation & Inpatient Suites For Severe Infectious Illnesses',
      textHi: 'गंभीर संक्रामक रोगों के सुरक्षित उपचार के लिए समर्पित आइसोलेशन व इनपेशेंट सुइट्स'
    },
    {
      num: '05',
      textEn: 'Seamless Multidisciplinary Linkages With Cardiology, Nephrology & Critical Care Specialists',
      textHi: 'कार्डियोलॉजी, नेफ्रोलॉजी और क्रिटिकल केयर विशेषज्ञों के साथ सहज बहुविषयक समन्वय'
    },
    {
      num: '06',
      textEn: 'Comprehensive Lifetime Wellness Packages & Evidence-Based Adult Immunization Schedules',
      textHi: 'आजीवन स्वास्थ्य संरक्षण हेतु व्यापक वेलनेस पैकेज और साक्ष्य-आधारित वयस्क टीकाकरण'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section with general-internal-hero.png */}
      <SpecialtyHero
        image={generalInternalHeroImg}
        titlePrefixEn="General"
        titleHighlightEn="Internal Medicine"
        titlePrefixHi="जनरल"
        titleHighlightHi="इंटरनल मेडिसिन"
        altTextEn="General Internal Medicine at Ejaz Clinic"
        altTextHi="एजाज क्लिनिक में जनरल इंटरनल मेडिसिन"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <GeneralInternalAboutSection />

      {/* Types of Internal Medicine Modalities */}
      <GeneralInternalTypesSection />

      {/* Internal Medicine Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="Internal Medicine"
        titleHighlightEn="Highlights"
        titlePrefixHi="इंटरनल मेडिसिन"
        titleHighlightHi="हाइलाइट्स"
        highlights={internalHighlights}
      />

      {/* Advanced Technology & Equipment We Use (Machines 1 to 4) */}
      <SpecialtyEquipmentSection
        titlePrefixEn="Advanced Diagnostic Suites &"
        titleHighlightEn="Equipment We Use"
        titlePrefixHi="उन्नत डायग्नोस्टिक सुइट्स एवं"
        titleHighlightHi="उपकरण"
        descEn="At Ejaz Clinic, our Internal Medicine center is backed by high-precision automated laboratory analyzers, digital ECG, 24/7 multiparameter patient monitoring, and bedside ultrasonography."
        descHi="एजाज क्लिनिक में, हमारा इंटरनल मेडिसिन केंद्र उच्च-सटीक स्वचालित प्रयोगशाला विश्लेषक, डिजिटल ईसीजी, 24/7 मल्टीपैरामीटर मॉनिटर और बेडसाइड अल्ट्रासोनोग्राफी द्वारा समर्थित है।"
      />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
