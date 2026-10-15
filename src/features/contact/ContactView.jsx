import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Phone,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Building2,
  ExternalLink,
  ChevronDown,
  Car,
  Accessibility,
  User,
  AlertCircle
} from 'lucide-react'
import contactHeroBg from '../../assets/contact-page-1.png'
import { useDoctors, toDoctorCard } from '../doctors/useDoctors'

export default function ContactView() {
  const { t, i18n } = useTranslation(['home', 'common'])
  const isHindi = i18n?.language === 'hi'

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    specialty: 'laparoscopic',
    doctor: 'any',
    date: '',
    message: ''
  })

  const [formErrors, setFormErrors] = useState({})
  const { doctors } = useDoctors()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    if (!formData.fullName.trim()) {
      errors.fullName = isHindi ? 'कृपया अपना नाम दर्ज करें' : 'Please enter your full name'
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errors.phone = isHindi ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  const departments = [
    { id: 'laparoscopic', label: isHindi ? 'उन्नत लैप्रोस्कोपिक सर्जरी' : 'Advanced Laparoscopic Surgery' },
    { id: 'cancer', label: isHindi ? 'कैंसर सर्जरी (ऑन्कोलॉजी)' : 'Cancer Surgery (Oncology)' },
    { id: 'hernia', label: isHindi ? 'हर्निया एवं एब्डोमिनल वॉल रिपेयर' : 'Complex Hernia & Abdominal Wall' },
    { id: 'orthopaedics', label: isHindi ? 'ऑर्थोपेडिक्स एवं रोबोटिक नी रिप्लेसमेंट' : 'Orthopaedics & Joint Replacement' },
    { id: 'urology', label: isHindi ? 'यूरोलॉजी एवं किडनी स्टोन' : 'Urology & Kidney Stone Care' },
    { id: 'gynaecology', label: isHindi ? 'स्त्री एवं प्रसूति रोग' : 'Obstetrics & Gynaecology' },
    { id: 'general-surgery', label: isHindi ? 'जनरल एवं ट्रॉमा सर्जरी' : 'General & Emergency Surgery' },
    { id: 'internal', label: isHindi ? 'इंटरनल मेडिसिन एवं क्रिटिकल केयर' : 'Internal Medicine & ICU' },
    { id: 'physiotherapy', label: isHindi ? 'फिजियोथेरेपी एवं पुनर्वास' : 'Physiotherapy & Rehabilitation' }
  ]

  // Doctors managed in the admin panel
  const doctorsList = [
    { id: 'any', name: isHindi ? 'कोई भी उपलब्ध वरिष्ठ विशेषज्ञ' : 'Any Available Senior Specialist' },
    ...doctors.map((doc) => {
      const card = toDoctorCard(doc, isHindi)
      return { id: card.id, name: card.specialty ? `${card.name} (${card.specialty})` : card.name }
    })
  ]

  const keyHotlines = [
    {
      title: isHindi ? '24×7 इमरजेंसी एवं ट्रॉमा आईसीयू' : '24×7 Emergency & Trauma ICU',
      number: '+91 6203 770 070',
      badge: isHindi ? 'तत्काल सहायता' : 'Immediate Response'
    },
    {
      title: isHindi ? '24×7 इन-हाउस फार्मेसी' : '24×7 In-House Pharmacy',
      number: '+91 6203 770 071',
      badge: isHindi ? 'दवाइयां एवं सर्जिकल सप्लाई' : 'Medications & Surgical'
    },
    {
      title: isHindi ? 'टीपीए एवं कैशलेस इंश्योरेंस हेल्पडेस्क' : 'TPA & Cashless Insurance Desk',
      number: '+91 6203 770 072',
      badge: isHindi ? 'सभी प्रमुख बीमा स्वीकृत' : 'All Major TPAs Accepted'
    },
    {
      title: isHindi ? 'पैथोलॉजी व डायग्नोस्टिक लैब' : 'Pathology & Diagnostic Laboratory',
      number: '+91 6203 770 073',
      badge: isHindi ? 'डिजिटल रिपोर्ट्स' : 'Digital Reports'
    }
  ]

  const faqs = [
    {
      q: isHindi ? 'क्या ओपीडी परामर्श के लिए पूर्व अपॉइंटमेंट आवश्यक है?' : 'Is prior appointment mandatory for OPD consultation?',
      a: isHindi
        ? 'नहीं, वॉक-इन मरीजों का भी स्वागत है। हालांकि, कतार से बचने और अपने पसंदीदा सर्जन से समय पर मिलने के लिए अग्रिम बुकिंग की सलाह दी जाती है।'
        : 'While walk-in patients are warmly accommodated, we recommend advance appointment booking to secure your preferred specialist and minimize waiting time.'
    },
    {
      q: isHindi ? 'अस्पताल में कौन-कौन से टीपीए एवं बीमा कार्ड स्वीकार किए जाते हैं?' : 'Which cashless TPAs and health insurances are accepted?',
      a: isHindi
        ? 'एजाज क्लिनिक सभी प्रमुख सरकारी व निजी बीमा कंपनियों (Star Health, Care, HDFC Ergo, ICICI Lombard, Medi Assist, Paramount आदि) के साथ कैशलेस सुविधा प्रदान करता है।'
        : 'Ejaz Clinic is empaneled with all leading government and private TPAs including Star Health, Care Health, HDFC ERGO, ICICI Lombard, Medi Assist, Paramount, and more for seamless cashless hospitalisation.'
    },
    {
      q: isHindi ? 'क्या इमरजेंसी सर्जरी की सुविधा रात में भी उपलब्ध है?' : 'Is emergency laparoscopic surgery available at night?',
      a: isHindi
        ? 'हाँ, हमारा मॉड्यूलर ऑपरेशन थिएटर, एनेस्थीसिया टीम एवं क्रिटिकल केयर आईसीयू चौबीसों घंटे (24×7) सक्रिय रहते हैं।'
        : 'Yes. Our modular surgical suites, critical care ICU, resident anaesthesiologists, and emergency surgical teams remain operational 24 hours a day, 365 days a year.'
    },
    {
      q: isHindi ? 'मरीजों से मिलने का समय (Visiting Hours) क्या है?' : 'What are the visiting hours for admitted patients?',
      a: isHindi
        ? 'वार्ड मरीजों के लिए: सुबह 10:00 से 11:30 बजे एवं शाम 5:00 से 7:00 बजे। आईसीयू में संक्रमण नियंत्रण हेतु सीमित आगंतुकों की अनुमति है।'
        : 'General Ward: 10:00 AM – 11:30 AM & 5:00 PM – 7:00 PM. For Critical Care & ICU, visits are regulated to maintain strict zero-infection sterile protocols.'
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">

      {/* Compact Banner matching Laparoscopic & Specialty Hero */}
      <section className="relative w-full pt-20 sm:pt-22 bg-slate-950">
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[290px] lg:h-[330px] xl:h-[350px] overflow-hidden">
          <img
            src={contactHeroBg}
            alt={isHindi ? 'संपर्क करें - एजाज क्लिनिक' : 'Contact Us - Ejaz Clinic'}
            className="w-full h-full object-cover object-center block"
          />

          <div className="absolute inset-0 flex items-center pointer-events-none">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
              <div className="max-w-xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold tracking-tight text-slate-900 leading-tight">
                  {isHindi ? (
                    <>
                      संपर्क <span className="text-[#ea580c]">करें</span>
                    </>
                  ) : (
                    <>
                      Contact <span className="text-[#ea580c]">Us</span>
                    </>
                  )}
                </h1>
                <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-[#ea580c] rounded-full mt-2.5 sm:mt-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. FOUR QUICK ACTION CONTACT CARDS                        */}
      {/* ======================================================== */}
      <section className="relative w-full bg-[#f8f9fc] text-slate-800 py-10 sm:py-14 border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* Card 1: 24/7 Emergency */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-600 mb-2">
                  {isHindi ? 'तत्काल सेवा 24×7' : 'Immediate 24×7'}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {isHindi ? 'इमरजेंसी एवं ट्रॉमा' : 'Emergency & Trauma'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {isHindi ? 'गंभीर सर्जिकल एवं ट्रॉमा मामलों के लिए समर्पित हेल्पलाइन।' : 'Round-the-clock rapid response surgical casualty team.'}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <a
                  href="tel:+916203770070"
                  className="text-sm font-bold text-[#ea580c] hover:text-[#c2410c] flex items-center justify-between group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>+91 6203 770 070</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Card 2: OPD Appointments */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#003a70] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-100 text-[#003a70] mb-2">
                  {isHindi ? 'परामर्श बुकिंग' : 'Consultations'}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {isHindi ? 'ओपीडी अपॉइंटमेंट' : 'OPD Appointments'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {isHindi ? 'वरिष्ठ विशेषज्ञ डॉक्टरों के साथ अग्रिम समय स्लॉट बुक करें।' : 'Advance appointment slots with our senior surgical specialists.'}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <a
                  href="tel:+918002003000"
                  className="text-sm font-bold text-[#003a70] hover:text-[#00284d] flex items-center justify-between group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>1800 200 3000</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Card 3: Email Inquiries */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mb-2">
                  {isHindi ? 'डिजिटल सहायता' : 'Online Desk'}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {isHindi ? 'ईमेल एवं रिपोर्ट्स' : 'Email & Reports'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {isHindi ? 'चिकित्सीय रिपोर्ट एवं सामान्य जानकारी के लिए लिखें।' : 'Medical inquiries, second opinions, and diagnostic report queries.'}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <a
                  href="mailto:care@ejazhospital.com"
                  className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center justify-between group-hover:translate-x-1 transition-transform cursor-pointer truncate"
                >
                  <span className="truncate">care@ejazhospital.com</span>
                  <span className="shrink-0 ml-1">→</span>
                </a>
              </div>
            </div>

            {/* Card 4: Location & Campus */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 mb-2">
                  {isHindi ? 'अस्पताल परिसर' : 'Campus Hub'}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {isHindi ? 'अस्पताल पता' : 'Hospital Campus'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {isHindi ? 'एजाज क्लिनिक एवं सर्जिकल हॉस्पिटल, पटना, बिहार - 800001' : 'Ejaz Clinic & Advanced Surgical Hospital, Patna, Bihar.'}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <a
                  href="https://maps.google.com/?cid=1665913498867353594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-purple-600 hover:text-purple-700 flex items-center justify-between group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>{isHindi ? 'दिशा-निर्देश देखें' : 'Get Directions'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. MAIN SECTION: 2-COLUMN (Interactive Form & Google Map) */}
      {/* ======================================================== */}
      <section className="relative w-full bg-white text-slate-800 py-12 sm:py-16 lg:py-20 border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT COLUMN (Span 7): Comprehensive Booking & Inquiry Form */}
            <div className="lg:col-span-7 bg-[#f8f9fc] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm">
              <div className="border-b border-slate-200/80 pb-4 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c] block mb-1">
                  {isHindi ? 'ऑनलाइन फॉर्म' : 'Online Consultation Desk'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {isHindi ? 'परामर्श या अपॉइंटमेंट अनुरोध भेजें' : 'Send an Inquiry or Book Appointment'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {isHindi
                    ? 'कृपया नीचे अपना विवरण भरें। हमारे मुख्य समन्वय अधिकारी 15 मिनट के भीतर आपसे संपर्क करेंगे।'
                    : 'Fill in your details below and our patient care coordination desk will call you shortly to confirm.'}
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {isHindi ? 'पूरा नाम' : 'Full Name'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder={isHindi ? 'अपना पूरा नाम दर्ज करें' : 'e.g. Ramesh Kumar'}
                          className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none transition-all ${formErrors.fullName
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-slate-300 focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10'
                            }`}
                        />
                      </div>
                      {formErrors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {isHindi ? 'मोबाइल नंबर' : 'Phone Number'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={isHindi ? '10 अंकों का मोबाइल नंबर' : '10-digit mobile number'}
                          className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none transition-all ${formErrors.phone
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-slate-300 focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10'
                            }`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email & Preferred Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {isHindi ? 'ईमेल पता (वैकल्पिक)' : 'Email Address (Optional)'}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@gmail.com"
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {isHindi ? 'पसंदीदा परामर्श तिथि' : 'Preferred Appointment Date'}
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10 transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Specialty & Preferred Doctor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {isHindi ? 'विभाग / विशेषता' : 'Department / Specialty'}
                      </label>
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10 transition-all cursor-pointer"
                      >
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {isHindi ? 'पसंदीदा डॉक्टर (वैकल्पिक)' : 'Consultant Doctor (Optional)'}
                      </label>
                      <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10 transition-all cursor-pointer"
                      >
                        {doctorsList.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {doc.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Message / Problem */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isHindi ? 'अपनी समस्या / लक्षण संक्षेप में बताएं' : 'Brief Medical Concern / Symptoms'}
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={
                        isHindi
                          ? 'उदा. पेट दर्द, हर्निया परामर्श, या अन्य लक्षण...'
                          : 'Describe symptoms, previous diagnosis, or preferred consultation timing...'
                      }
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10 transition-all resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{isHindi ? 'अनुरोध भेजें (Request Slot)' : 'Request Appointment Slot'}</span>
                        </>
                      )}
                    </button>

                    <a
                      href="tel:+918002003000"
                      className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-[#003a70] hover:bg-[#00284d] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{isHindi ? 'कॉल करें' : 'Call Now'}</span>
                    </a>
                  </div>

                  {/* Security Assurance */}
                  <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {isHindi
                        ? 'आपकी चिकित्सीय जानकारी पूर्णतः गोपनीय एवं सुरक्षित रखी जाती है।'
                        : 'Your clinical information is strictly protected under patient confidentiality protocols.'}
                    </span>
                  </p>
                </form>
              ) : (
                /* Success Confirmation State */
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {isHindi ? 'अनुरोध सफलतापूर्वक प्राप्त हुआ!' : 'Appointment Request Received!'}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    {isHindi
                      ? `धन्यवाद ${formData.fullName}। आपका अनुरोध एजाज क्लिनिक को मिल गया है। हमारे ओपीडी समन्वयक आपके नंबर ${formData.phone} पर जल्द ही संपर्क करेंगे।`
                      : `Thank you, ${formData.fullName}. Your request has been forwarded to our care coordination team. We will call you shortly on ${formData.phone} to confirm your appointment.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        specialty: 'laparoscopic',
                        doctor: 'any',
                        date: '',
                        message: ''
                      })
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#003a70] hover:bg-[#00284d] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm"
                  >
                    {isHindi ? 'दूसरा अनुरोध भेजें' : 'Send Another Request'}
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN (Span 5): Google Map & Campus Highlights */}
            <div className="lg:col-span-5 space-y-6">

              {/* Google Map Box */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#003a70]" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {isHindi ? 'अस्पताल स्थान मानचित्र' : 'Hospital Location Map'}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    {isHindi ? 'पटना, बिहार' : 'Patna, Bihar'}
                  </span>
                </div>

                {/* Map iframe */}
                <div className="relative w-full h-[320px] sm:h-[360px] bg-slate-100">
                  <iframe
                    title="Ejaz Clinic Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d52091.24969873239!2d85.0926304!3d25.6159115!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58c23cadcf55%3A0x171e7e6310ea47fa!2sEjaz%20Clinic!5e1!3m2!1sen!2sin!4v1791880274135!5m2!1sen!2sin"
                    className="w-full h-full border-0 block"
                    loading="lazy"
                    allowFullScreen=""
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium truncate mr-2">
                    Ejaz Clinic & Surgical Hospital, Patna
                  </span>
                  <a
                    href="https://maps.google.com/?cid=1665913498867353594"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#ea580c] hover:underline shrink-0 cursor-pointer"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Campus Amenities & Accessibility Highlights */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-3.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {isHindi ? 'परिसर सुविधाएं एवं पहुंच' : 'Campus Accessibility & Facilities'}
                </h4>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Car className="w-5 h-5 text-[#003a70] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800">
                      {isHindi ? 'मरीज व वाहन पार्किंग' : 'Valet & Dedicated Parking'}
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      {isHindi ? 'एंबुलेंस एवं आगंतुकों के लिए चौबीसों घंटे सुरक्षित पार्किंग।' : 'Ample multi-level visitor and emergency ambulance parking.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Accessibility className="w-5 h-5 text-[#ea580c] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800">
                      {isHindi ? 'व्हीलचेयर एवं स्ट्रेचर सुलभ' : '100% Wheelchair Accessible'}
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      {isHindi ? 'रैंप, चौड़े लिफ्ट एवं समर्पित मरीज परिवहन सहायक।' : 'Ramps, stretcher lifts, and trained patient assistance staff.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800">
                      {isHindi ? 'कैशलेस मेडिक्लेम डेस्क' : 'Cashless Mediclaim Desk'}
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      {isHindi ? 'ऑन-साइट टीपीए समन्वय एवं त्वरित पूर्व-प्राधिकरण।' : 'On-site insurance officers for rapid pre-authorization approval.'}
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. DEPARTMENT DIRECT HOTLINES DIRECTORY                   */}
      {/* ======================================================== */}
      <section className="relative w-full bg-[#f8f9fc] text-slate-800 py-12 sm:py-16 border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c] block mb-1">
              {isHindi ? 'सीधा संपर्क' : 'Direct Numbers'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isHindi ? 'विभागवार हेल्पलाइन डायरेक्टरी' : 'Departmental Direct Extensions'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              {isHindi
                ? 'विशिष्ट आवश्यकताओं के लिए सीधे संबंधित विभाग से संपर्क करें।'
                : 'Direct contact lines for specific clinical, diagnostic, and billing departments.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {keyHotlines.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#ea580c] uppercase tracking-wider px-2 py-0.5 rounded bg-orange-50 inline-block mb-2">
                    {item.badge}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <a
                    href={`tel:${item.number.replace(/\s+/g, '')}`}
                    className="text-sm font-bold text-[#003a70] hover:text-[#ea580c] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{item.number}</span>
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)             */}
      {/* ======================================================== */}
      <section className="relative w-full bg-white text-slate-800 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c] block mb-1">
              {isHindi ? 'अक्सर पूछे जाने वाले सवाल' : 'Common Inquiries'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isHindi ? 'मरीजों द्वारा पूछे जाने वाले सामान्य प्रश्न' : 'Frequently Asked Patient Questions'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              {isHindi
                ? 'अस्पताल आगमन, भर्ती एवं परामर्श से जुड़े आपके सभी सवालों के जवाब।'
                : 'Clear answers to common questions about appointments, insurance, and emergency admissions.'}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 overflow-hidden bg-slate-50/50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#ea580c] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-500' : ''
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </section>

    </div>
  )
}
