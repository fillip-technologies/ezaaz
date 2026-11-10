// Click-to-chat links for the hospital's WhatsApp number. Set VITE_WHATSAPP_NUMBER (digits with country code,
// e.g. 917362004545) to the number connected to the WhatsApp Cloud API, so chats land in the admin inbox
// with a pre-filled message. Without it, the old WhatsApp Business short link is used.
const NUMBER = String(import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
const FALLBACK_URL = 'https://wa.me/message/MBM4KWAXXZWFM1'

export function whatsappLink(text) {
  if (!NUMBER) return FALLBACK_URL
  return `https://wa.me/${NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

// [route keyword, English topic, Hindi topic]
const TOPICS = [
  ['laparoscopic', 'Laparoscopic Surgery', 'लेप्रोस्कोपिक सर्जरी'],
  ['robotic', 'Robotic Surgery', 'रोबोटिक सर्जरी'],
  ['cancer', 'Cancer Surgery', 'कैंसर सर्जरी'],
  ['hernia', 'Hernia Surgery', 'हर्निया सर्जरी'],
  ['orthop', 'Orthopaedics', 'हड्डी रोग (ऑर्थोपेडिक्स)'],
  ['general-surgery', 'General Surgery', 'जनरल सर्जरी'],
  ['gastro', 'Gastrointestinal Surgery', 'पेट रोग सर्जरी'],
  ['physio', 'Physiotherapy', 'फिजियोथेरेपी'],
  ['anaesth', 'Anaesthesia', 'एनेस्थीसिया'],
  ['plastic', 'Plastic Surgery', 'प्लास्टिक सर्जरी'],
  ['urolog', 'Urology', 'यूरोलॉजी'],
  ['general-internal', 'Internal Medicine', 'मेडिसिन'],
  ['gynae', 'Gynaecology', 'स्त्री रोग'],
  ['radiology', 'Radiology / scans and my reports', 'रेडियोलॉजी / स्कैन और मेरी रिपोर्ट'],
  ['diagnos', 'lab tests and my reports', 'जाँच और मेरी रिपोर्ट'],
  ['icu', 'the ICU', 'आईसीयू'],
  ['emergency', 'an emergency', 'इमरजेंसी'],
  ['24-7', 'an emergency', 'इमरजेंसी'],
  ['booking', 'booking an appointment', 'अपॉइंटमेंट बुक करने'],
  ['appointment', 'booking an appointment', 'अपॉइंटमेंट बुक करने'],
]

// Opening message for the page the visitor is on, e.g. "Hi Ejaz Hospital, I have a question about Hernia Surgery."
export function pageMessage(isHindi, topic) {
  const route = `${window.location.pathname}${window.location.hash}`.toLowerCase()
  const match = topic ? [null, topic, topic] : TOPICS.find(([key]) => route.includes(key))
  if (!match) return isHindi ? 'नमस्ते एजाज़ हॉस्पिटल, मुझे जानकारी चाहिए।' : 'Hi Ejaz Hospital, I have a question.'
  return isHindi ? `नमस्ते एजाज़ हॉस्पिटल, मुझे ${match[2]} के बारे में जानकारी चाहिए।` : `Hi Ejaz Hospital, I have a question about ${match[1]}.`
}
