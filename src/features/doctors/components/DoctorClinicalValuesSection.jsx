import SpecialtyHighlightsSection from '../../speciality/common/SpecialtyHighlightsSection'

export default function DoctorClinicalValuesSection() {
  const doctorHighlights = [
    {
      num: '01',
      textEn: 'Mayo Clinic USA Fellowship Training & Global Evidence-Based Clinical Practice',
      textHi: 'मेयो क्लिनिक यूएसए फेलोशिप प्रशिक्षण एवं अंतरराष्ट्रीय साक्ष्य-आधारित क्लिनिकल अभ्यास'
    },
    {
      num: '02',
      textEn: 'Multidisciplinary Tumor Boards & Joint Case Reviews for Complex Diagnostics',
      textHi: 'जटिल बीमारियों के सटीक निदान हेतु बहुविषयक ट्यूमर बोर्ड और संयुक्त समीक्षा'
    },
    {
      num: '03',
      textEn: '35+ Years of Cumulative Clinical Mastery Across Minimally Invasive & Surgical Disciplines',
      textHi: 'मिनिमली इनवेसिव एवं सर्जिकल विधाओं में 35 से अधिक वर्षों की सिद्ध विशेषज्ञता'
    },
    {
      num: '04',
      textEn: 'Zero Unnecessary Interventions with 100% Transparent, Patient-First Medical Ethics',
      textHi: 'गैर-जरूरी प्रक्रियाओं से पूर्ण बचाव एवं 100% पारदर्शी, रोगी-हितैषी नैतिक मूल्य'
    },
    {
      num: '05',
      textEn: '24/7 Senior Inpatient Supervision, Critical Care Intensivists & Rapid Response Teams',
      textHi: '24/7 वरिष्ठ चिकित्सकों की निगरानी, आईसीयू इंटेंसिविस्ट्स एवं त्वरित आपातकालीन दल'
    },
    {
      num: '06',
      textEn: 'Compassionate Bedside Listening, Detailed Pre-Op Counseling & Continuous Follow-Ups',
      textHi: 'सहानुभूतिपूर्ण बेडसाइड संवाद, विस्तृत पूर्व-परामर्श एवं निरंतर स्वास्थ्य देखभाल'
    }
  ]

  return (
    <SpecialtyHighlightsSection
      titlePrefixEn="Our Medical Excellence &"
      titleHighlightEn="Clinical Standards"
      titlePrefixHi="हमारी चिकित्सकीय उत्कृष्टता एवं"
      titleHighlightHi="क्लिनिकल मानक"
      highlights={doctorHighlights}
    />
  )
}
