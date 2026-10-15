// Specialty filters for the book-appointment page. The admin ticks these per doctor;
// ids must match SPECIALTY_TAGS in server/src/modules/doctor/doctor.model.js.
export const SPECIALTY_TAGS = [
  { id: 'laparoscopic', en: 'Laparoscopic Surgery', hi: 'लैप्रोस्कोपिक सर्जरी' },
  { id: 'hernia', en: 'Hernia Surgery', hi: 'हर्निया सर्जरी' },
  { id: 'general-surgery', en: 'General Surgery', hi: 'सामान्य सर्जरी' },
  { id: 'cancer-surgery', en: 'Cancer Surgery', hi: 'कैंसर सर्जरी' },
  { id: 'urology', en: 'Urology', hi: 'यूरोलॉजी' },
  { id: 'gynaecology', en: 'Gynaecology & Obstetrics', hi: 'स्त्री एवं प्रसूति रोग' },
  { id: 'orthopaedics', en: 'Orthopaedics', hi: 'ऑर्थोपेडिक्स एवं जोड़ देखभाल' },
  { id: 'internal-medicine', en: 'General Internal Medicine', hi: 'जनरल इंटरनल मेडिसिन' },
  { id: 'gastrointestinal', en: 'Gastrointestinal Surgery', hi: 'गैस्ट्रोइंटेस्टाइनल सर्जरी' },
  { id: 'plastic-surgery', en: 'Plastic Surgery', hi: 'प्लास्टिक सर्जरी' },
  { id: 'physiotherapy', en: 'Physiotherapy & Rehabilitation', hi: 'फिजियोथेरेपी' },
  { id: 'anaesthesia', en: 'Anaesthesia & Critical Care', hi: 'एनेस्थीसिया एवं क्रिटिकल केयर' },
]

// Older links/ids that mean the same specialty
const ALIASES = {
  cancer: 'cancer-surgery',
  orthopedic: 'orthopaedics',
  gynecology: 'gynaecology',
  physiotherapist: 'physiotherapy',
  anesthesia: 'anaesthesia',
}

export const normalizeSpecialty = (id) => ALIASES[id] || id

export const specialtyLabel = (id, isHindi) => {
  const tag = SPECIALTY_TAGS.find((t) => t.id === normalizeSpecialty(id))
  return tag ? (isHindi ? tag.hi : tag.en) : id
}
