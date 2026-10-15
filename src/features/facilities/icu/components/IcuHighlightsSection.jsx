import SpecialtyHighlightsSection from '../../../speciality/common/SpecialtyHighlightsSection'

export default function IcuHighlightsSection() {
  const icuHighlights = [
    {
      num: '01',
      textEn: 'Advanced Multi-Para Invasive & Non-Invasive Hemodynamic Vital Monitoring at Every Bed',
      textHi: 'प्रत्येक बेड पर उन्नत मल्टी-पैरा इनवेसिव एवं नॉन-इनवेसिव हेमोडायनामिक वाइटल मॉनिटरिंग'
    },
    {
      num: '02',
      textEn: 'High-End Invasive & Non-Invasive Mechanical Ventilators with Dedicated Respiratory Therapists',
      textHi: 'समर्पित रेस्पिरेटरी थेरेपिस्ट्स के साथ हाई-एंड इनवेसिव एवं नॉन-इनवेसिव मैकेनिकल वेंटिलेटर्स'
    },
    {
      num: '03',
      textEn: 'Round-the-Clock 24/7 Intensivist & Critical Care Specialist Presence for Immediate Triage',
      textHi: 'तत्काल ट्राइएज और उपचार के लिए 24/7 वरिष्ठ इंटेंसिविस्ट एवं क्रिटिकल केयर विशेषज्ञों की उपस्थिति'
    },
    {
      num: '04',
      textEn: 'Dedicated 1:1 or 1:2 Critical Care Nurse-to-Patient Ratio Ensuring Vigilant Continuous Bedside Care',
      textHi: 'निरंतर सतर्क देखभाल सुनिश्चित करने वाला 1:1 या 1:2 का समर्पित क्रिटिकल केयर नर्स-मरीज अनुपात'
    },
    {
      num: '05',
      textEn: 'Ultra-Clean Laminar Airflow & HEPA Filtration Suites Maintaining Stringent Zero-Infection Protocols',
      textHi: 'शून्य-संक्रमण प्रोटोकॉल बनाए रखने वाले लैमिनार एयरफ्लो एवं HEPA एयर फिल्ट्रेशन युक्त स्टेराइल सुइट्स'
    },
    {
      num: '06',
      textEn: 'Integrated Point-of-Care Blood Gas (ABG), Dialysis & Portable Ultrasound for Immediate Bedside Intervention',
      textHi: 'तत्काल बेडसाइड उपचार के लिए इंटीग्रेटेड एबीजी (ABG), बेडसाइड डायलिसिस और पोर्टेबल अल्ट्रासाउंड'
    }
  ]

  return (
    <SpecialtyHighlightsSection
      titlePrefixEn="ICU"
      titleHighlightEn="Highlights"
      titlePrefixHi="आईसीयू"
      titleHighlightHi="हाइलाइट्स"
      highlights={icuHighlights}
    />
  )
}
