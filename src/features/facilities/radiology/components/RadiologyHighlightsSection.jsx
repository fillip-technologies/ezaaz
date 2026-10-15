import SpecialtyHighlightsSection from '../../../speciality/common/SpecialtyHighlightsSection'

export default function RadiologyHighlightsSection() {
  const radiologyHighlights = [
    {
      num: '01',
      textEn: 'Advanced High-Resolution Digital X-Ray & Multi-Slice CT Scanning for Pinpoint Diagnostic Precision',
      textHi: 'सटीक नैदानिक परिशुद्धता के लिए उन्नत हाई-रिज़ॉल्यूशन डिजिटल एक्स-रे एवं मल्टी-स्लाइस सीटी स्कैनिंग'
    },
    {
      num: '02',
      textEn: 'High-Field 1.5T MRI Delivering Crystal-Clear Neuro, Musculoskeletal & Abdominal Imaging',
      textHi: 'क्रिस्टल-क्लियर न्यूरो, मस्कुलोस्केलेटल और पेट की इमेजिंग प्रदान करने वाली उच्च-क्षेत्रीय 1.5T एमआरआई'
    },
    {
      num: '03',
      textEn: 'Precision 3D/4D Color Doppler Ultrasound & Echocardiography Evaluated by Senior Radiologists',
      textHi: 'वरिष्ठ रेडियोलॉजिस्टों द्वारा मूल्यांकित सटीक 3D/4D कलर डॉपलर अल्ट्रासाउंड एवं इकोकार्डियोग्राफी'
    },
    {
      num: '04',
      textEn: 'Ultra-Low Radiation ALARA Protocols Ensuring Uncompromised Patient Safety for All Age Groups',
      textHi: 'सभी आयु समूहों के लिए पूर्ण रोगी सुरक्षा सुनिश्चित करने वाले अल्ट्रा-लो रेडिएशन ALARA प्रोटोकॉल'
    },
    {
      num: '05',
      textEn: 'Instant PACS Digital Cloud Reporting for Prompt Surgical Planning and Specialist Consultations',
      textHi: 'त्वरित सर्जिकल योजना और विशेषज्ञ परामर्श के लिए त्वरित PACS डिजिटल क्लाउड रिपोर्टिंग'
    },
    {
      num: '06',
      textEn: '24/7 Dedicated Emergency & Trauma Imaging Response Supporting Critical Resuscitation Care',
      textHi: 'क्रिटिकल रिससिटेशन केयर का समर्थन करने वाली 24/7 समर्पित आपातकालीन एवं ट्रॉमा इमेजिंग प्रतिक्रिया'
    }
  ]

  return (
    <SpecialtyHighlightsSection
      titlePrefixEn="Radiology"
      titleHighlightEn="Highlights"
      titlePrefixHi="रेडियोलॉजी"
      titleHighlightHi="हाइलाइट्स"
      highlights={radiologyHighlights}
    />
  )
}
