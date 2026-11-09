import SpecialtyHighlightsSection from '../../../speciality/common/SpecialtyHighlightsSection'

export default function DiagnosisHighlightsSection() {
  const diagnosisHighlights = [
    {
      num: '01',
      textEn: 'Fully Automated Clinical Biochemistry & Haematology Analyzers for Fast, Accurate Results',
      textHi: 'त्वरित और सटीक परिणामों के लिए पूर्णतः स्वचालित क्लीनिकल बायोकैमिस्ट्री एवं हेमेटोलॉजी एनालाइजर्स'
    },
    {
      num: '02',
      textEn: 'Precision Histopathology & Cytopathology Tissue Biopsy Services Evaluated by Senior Pathologists',
      textHi: 'वरिष्ठ पैथोलॉजिस्टों द्वारा मूल्यांकित सटीक हिस्टोपैथोलॉजी एवं साइटोपैथोलॉजी टिश्यू बायोप्सी सेवाएं'
    },
    {
      num: '03',
      textEn: 'Comprehensive Microbiology & Serology Testing with Automated Blood Culture & Antibiotic Profiling',
      textHi: 'स्वचालित ब्लड कल्चर एवं एंटीबायोटिक प्रोफाइलिंग के साथ व्यापक माइक्रोबायोलॉजी व सीरोलॉजी परीक्षण'
    },
    {
      num: '04',
      textEn: 'Strict Daily Multi-Level Internal & External Quality Assurance (EQAS) Matching NABL Standards',
      textHi: 'NABL मानकों के अनुरूप दैनिक बहु-स्तरीय आंतरिक एवं बाह्य गुणवत्ता नियंत्रण (EQAS) प्रोटोकॉल'
    },
    {
      num: '05',
      textEn: 'Fast Turnaround Times with Barcoded Specimen Tracking & Immediate Digital WhatsApp/SMS Delivery',
      textHi: 'बारकोड स्पेसिमेन ट्रैकिंग एवं तत्काल डिजिटल वॉट्सऐप/एसएमएस रिपोर्ट डिलीवरी के साथ त्वरित टर्नअराउंड'
    },
    {
      num: '06',
      textEn: '24/7 Dedicated Emergency Stat Lab Facilities Providing Critical Triage & Pre-Operative Bloodwork',
      textHi: 'क्रिटिकल ट्रायज एवं प्री-ऑपरेटिव जांच प्रदान करने वाली 24/7 समर्पित आपातकालीन स्टैट लैब सेवाएं'
    }
  ]

  return (
    <SpecialtyHighlightsSection
      titlePrefixEn="Diagnosis"
      titleHighlightEn="Highlights"
      titlePrefixHi="डायग्नोसिस"
      titleHighlightHi="हाइलाइट्स"
      highlights={diagnosisHighlights}
    />
  )
}
