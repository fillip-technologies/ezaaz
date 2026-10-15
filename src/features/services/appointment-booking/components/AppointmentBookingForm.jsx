import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronDown,
  RefreshCw
} from 'lucide-react'
import { submitSpecialtyEnquiry } from '../../../../services/enquiryService'
import { useDoctors, toDoctorCard } from '../../../doctors/useDoctors'

// Available Consultation Booking Slots
const TIME_SLOTS = [
  { period: 'Morning', slots: ['10:00 AM', '10:30 AM', '11:15 AM', '11:45 AM'] },
  { period: 'Afternoon', slots: ['01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM'] },
  { period: 'Evening', slots: ['04:30 PM', '05:15 PM', '06:00 PM', '06:45 PM'] }
]

export default function AppointmentBookingForm() {
  const { i18n } = useTranslation('home')
  const isHindi = i18n.language === 'hi'

  // Doctors managed in the admin panel (only active ones are returned)
  const { doctors } = useDoctors()
  const allDoctors = useMemo(() => doctors.map((doc) => toDoctorCard(doc, isHindi)), [doctors, isHindi])

  // Get doctorId from URL query param if user clicked a specific doctor card
  const initialDoctorId = useMemo(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      return params.get('doctorId') || params.get('doctor') || ''
    } catch {
      return ''
    }
  }, [])

  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId)
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    symptoms: '',
    gender: 'Male',
    age: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [bookingRefId, setBookingRefId] = useState('')

  // Sync selected doctor if URL changes
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const docParam = params.get('doctorId') || params.get('doctor')
      if (docParam && allDoctors.some(d => d.id === docParam)) {
        setSelectedDoctorId(docParam)
      }
    } catch {
      // ignore
    }
  }, [allDoctors])

  // Current active doctor
  const currentDoctor = useMemo(() => {
    return allDoctors.find(d => d.id === selectedDoctorId) || allDoctors[0]
  }, [allDoctors, selectedDoctorId])

  const doctorPhoto = currentDoctor?.photo

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage(isHindi ? 'कृपया अपना नाम और मोबाइल नंबर भरें।' : 'Please enter your name and mobile number.')
      return
    }

    if (formData.phone.trim().replace(/\D/g, '').length < 10) {
      setErrorMessage(isHindi ? 'कृपया 10 अंकों का वैध मोबाइल नंबर भरें।' : 'Please enter a valid 10-digit mobile number.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    const generatedRef = `EJZ-${Math.floor(10000 + Math.random() * 90000)}`

    try {
      await submitSpecialtyEnquiry({
        name: formData.name,
        phone: formData.phone,
        message: `[Appointment Ref: ${generatedRef}] | Doctor: ${currentDoctor?.name} (${currentDoctor?.specialty}) | Date: ${formData.date} | Slot: ${selectedSlot} | Email: ${formData.email || 'N/A'} | Age: ${formData.age || 'N/A'} | Notes: ${formData.symptoms || 'General OPD Consultation'}`,
        specialtyName: `${currentDoctor?.name || 'Doctor'} - OPD Appointment`
      })

      setBookingRefId(generatedRef)
      setIsSubmitted(true)
      window.scrollTo({ top: 250, behavior: 'smooth' })
    } catch (err) {
      console.error('Submission error:', err)
      setErrorMessage(isHindi ? 'त्रुटि हुई। कृपया पुनः प्रयास करें या सीधे कॉल करें।' : 'Submission failed. Please try again or call our help desk.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setBookingRefId('')
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      symptoms: '',
      gender: 'Male',
      age: ''
    })
  }

  return (
    <section className="relative w-full bg-[#f8f9fc] py-12 sm:py-16 lg:py-20 border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* If appointment is successfully confirmed, show confirmation card */}
        {isSubmitted ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 text-center animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-5 shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-2">
              {isHindi ? 'पुष्टि हो गई' : 'Booking Confirmed'}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isHindi ? 'अपॉइंटमेंट सफलतापूर्वक दर्ज हो गया!' : 'Appointment Successfully Scheduled!'}
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              {isHindi
                ? 'आपकी अपॉइंटमेंट की पुष्टि हो गई है। हमारी मरीज देखभाल टीम आपको परामर्श से 15 मिनट पहले संपर्क करेगी।'
                : 'Your consultation slot is confirmed. Our patient coordination team will send you an SMS confirmation shortly.'}
            </p>

            {/* Receipt Summary Card */}
            <div className="mt-6 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/70 text-left space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs sm:text-sm">
                <span className="text-slate-500 font-medium">{isHindi ? 'रेफरेंस आईडी:' : 'Reference ID:'}</span>
                <span className="font-mono font-bold text-[#003a70] text-sm sm:text-base">{bookingRefId}</span>
              </div>

              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-200">
                <img
                  src={doctorPhoto}
                  alt={currentDoctor?.name}
                  className="w-12 h-12 rounded-xl object-cover object-top border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{currentDoctor?.name}</h4>
                  <p className="text-xs text-[#ea580c] font-semibold">{currentDoctor?.specialty}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-[11.5px]">{isHindi ? 'तारीख:' : 'Appointment Date:'}</span>
                  <span className="font-bold text-slate-800">{formData.date}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11.5px]">{isHindi ? 'समय स्लॉट:' : 'Time Slot:'}</span>
                  <span className="font-bold text-[#ea580c]">{selectedSlot}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm pt-2 border-t border-slate-200/60">
                <div>
                  <span className="text-slate-500 block text-[11.5px]">{isHindi ? 'मरीज का नाम:' : 'Patient Name:'}</span>
                  <span className="font-semibold text-slate-800">{formData.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11.5px]">{isHindi ? 'मोबाइल नंबर:' : 'Mobile Number:'}</span>
                  <span className="font-semibold text-slate-800">{formData.phone}</span>
                </div>
              </div>

              <div className="pt-2 text-[11.5px] text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{isHindi ? 'स्थान: एजाज हॉस्पिटल, कंकड़बाग, पटना' : 'Location: Ejaz Clinic & Advanced Surgical Hospital, Patna'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#ea580c] hover:bg-[#d9532f] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{isHindi ? 'अन्य अपॉइंटमेंट बुक करें' : 'Book Another Appointment'}</span>
              </button>

              <a
                href="tel:+918002003000"
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{isHindi ? 'हेल्पडेस्क से बात करें' : 'Call Hospital Desk'}</span>
              </a>
            </div>
          </div>
        ) : (
          /* Main 2-Column Form Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN: Main Booking Form (Cols 1-8) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-slate-200/80">
              
              <div className="mb-6 sm:mb-8 pb-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {isHindi ? 'परामर्श विवरण दर्ज करें' : 'Fill Patient Consultation Details'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {isHindi ? 'कृपया सभी विवरण सही ढंग से भरें।' : 'Fill in the details below to secure your consultation priority slot.'}
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-6 flex items-center gap-2.5 bg-red-50 text-red-700 p-3.5 rounded-2xl border border-red-200 text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* 1. DOCTOR SELECTION: Direct Name Show & Switcher */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-[#ea580c]" />
                    <span>{isHindi ? 'पसंदीदा डॉक्टर चुनें *' : 'Selected Doctor & Faculty *'}</span>
                  </label>

                  {/* Prominent Direct Doctor Display Card */}
                  <div className="bg-gradient-to-r from-blue-50/70 via-slate-50 to-orange-50/40 rounded-2xl p-4 sm:p-5 border border-blue-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border-2 border-white shadow-xs">
                        <img
                          src={doctorPhoto}
                          alt={currentDoctor?.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#003a70] text-white uppercase tracking-wider mb-1">
                          {currentDoctor?.department}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                          {currentDoctor?.name}
                        </h3>
                        <p className="text-xs text-slate-600 font-medium mt-0.5">
                          {currentDoctor?.specialty}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {currentDoctor?.degrees}
                        </p>
                      </div>
                    </div>

                    {/* OPD Timing Pill */}
                    <div className="sm:text-right shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-semibold shadow-2xs">
                        <Clock className="w-3.5 h-3.5 text-[#ea580c]" />
                        <span>{currentDoctor?.timing}</span>
                      </span>
                    </div>
                  </div>

                  {/* Doctor Selector Dropdown to Switch Doctor */}
                  <div className="relative">
                    <select
                      value={currentDoctor?.id || ''}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      className="w-full appearance-none px-4 py-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c] cursor-pointer"
                    >
                      {allDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} — {doc.specialty} ({doc.department})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* 2. DATE & BOOKING TIME SLOT */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pt-2 border-t border-slate-100">
                  
                  {/* Appointment Date */}
                  <div className="sm:col-span-5">
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-[#ea580c]" />
                      <span>{isHindi ? 'अपॉइंटमेंट की तारीख *' : 'Appointment Date *'}</span>
                    </label>
                    <input
                      type="date"
                      required
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c]"
                    />
                    <p className="text-[11px] text-slate-400 mt-1 pl-1">
                      {isHindi ? 'रविवार को केवल आपातकालीन सेवाएं उपलब्ध हैं' : 'Regular OPD Monday to Saturday'}
                    </p>
                  </div>

                  {/* Booking Slots */}
                  <div className="sm:col-span-7">
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#ea580c]" />
                      <span>{isHindi ? 'बुकिंग समय स्लॉट चुनें *' : 'Select Booking Slot *'}</span>
                    </label>

                    <div className="space-y-2">
                      {TIME_SLOTS.map((periodGroup) => (
                        <div key={periodGroup.period} className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-400 w-16 shrink-0 uppercase tracking-wider">
                            {periodGroup.period}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {periodGroup.slots.map((slot) => {
                              const isSelected = selectedSlot === slot
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none ${
                                    isSelected
                                      ? 'bg-[#ea580c] text-white shadow-xs scale-102 ring-2 ring-[#ea580c]/30'
                                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                                  }`}
                                >
                                  {slot}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* 3. PATIENT DETAILS: Name, Mobile, Mail */}
                <div className="pt-2 border-t border-slate-100 space-y-4">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider text-slate-400">
                    {isHindi ? 'मरीज की संपर्क जानकारी' : 'Patient Contact Information'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Patient Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>{isHindi ? 'मरीज का पूरा नाम *' : 'Patient Full Name *'}</span>
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={isHindi ? 'उदा. राहुल कुमार' : 'e.g. Rahul Kumar'}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c]"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>{isHindi ? 'मोबाइल नंबर *' : 'Mobile Number *'}</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-xs font-bold text-slate-500 select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          name="phone"
                          maxLength={10}
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="10-digit number"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Address / Mail */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>{isHindi ? 'ईमेल आईडी (वैकल्पिक)' : 'Email Address (Mail)'}</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={isHindi ? 'उदा. name@example.com' : 'e.g. name@example.com'}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c]"
                      />
                    </div>

                    {/* Age & Gender */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isHindi ? 'उम्र (वर्ष)' : 'Age'}
                        </label>
                        <input
                          type="number"
                          name="age"
                          min={1}
                          max={120}
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="e.g. 35"
                          className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isHindi ? 'लिंग' : 'Gender'}
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c] cursor-pointer"
                        >
                          <option value="Male">{isHindi ? 'पुरुष' : 'Male'}</option>
                          <option value="Female">{isHindi ? 'महिला' : 'Female'}</option>
                          <option value="Other">{isHindi ? 'अन्य' : 'Other'}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Symptoms / Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>{isHindi ? 'समस्या या लक्षण (वैकल्पिक)' : 'Symptoms or Reason for Consultation (Optional)'}</span>
                    </label>
                    <textarea
                      rows={2}
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleInputChange}
                      placeholder={isHindi ? 'उदा. पेट दर्द, फॉलो-अप जांच, सर्जरी परामर्श...' : 'e.g. Abdominal pain, routine consultation, post-operative checkup...'}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 focus:border-[#ea580c] resize-none"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 py-3.5 sm:py-4 px-6 rounded-2xl bg-[#ea580c] hover:bg-[#d9532f] disabled:opacity-60 text-white font-bold text-sm sm:text-base shadow-lg shadow-[#ea580c]/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <CalendarIcon className="w-5 h-5" />
                    <span>
                      {isSubmitting
                        ? (isHindi ? 'अपॉइंटमेंट दर्ज हो रहा है...' : 'Booking Consultation...')
                        : (isHindi ? 'अपॉइंटमेंट बुक करें' : 'Confirm & Book Appointment')}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  <a
                    href="tel:+918002003000"
                    className="w-full sm:w-auto py-3.5 px-5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>{isHindi ? 'कॉल करें: +91 80020 03000' : 'Call Desk: +91 80020 03000'}</span>
                  </a>
                </div>

              </form>
            </div>

            {/* RIGHT COLUMN: Doctor Summary & Hospital Info (Cols 9-12) */}
            <div className="lg:col-span-4 space-y-6">

              {/* Doctor Profile Mini Card */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  {isHindi ? 'चयनित डॉक्टर' : 'Consulting Specialist'}
                </span>

                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-200">
                  <img
                    src={doctorPhoto}
                    alt={currentDoctor?.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-[#003a70]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {currentDoctor?.experience} {isHindi ? 'अनुभव' : 'Exp'}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{currentDoctor?.name}</h3>
                <p className="text-xs text-[#ea580c] font-semibold mt-0.5">{currentDoctor?.specialty}</p>
                <p className="text-xs text-slate-600 mt-1">{currentDoctor?.degrees}</p>

                <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800">{isHindi ? 'ओपीडी समय: ' : 'OPD Hours: '}</strong>
                      <span>{currentDoctor?.timing}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800">{isHindi ? 'क्लिनिक: ' : 'Clinic: '}</strong>
                      <span>Ejaz Clinic, Kankarbagh, Patna</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees Card */}
              <div className="bg-gradient-to-br from-[#003a70] to-[#002244] text-white rounded-3xl p-6 shadow-md">
                <h4 className="text-sm font-bold tracking-tight mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isHindi ? 'मरीज सुविधा गारंटी' : 'Hospital Consultation Promise'}</span>
                </h4>

                <ul className="space-y-2.5 text-xs text-slate-200 leading-relaxed">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{isHindi ? 'न्यूनतम प्रतीक्षा समय' : 'Zero Queue Consultation'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{isHindi ? 'वरिष्ठ सर्जन से व्यक्तिगत परामर्श' : 'Direct interaction with senior consultant'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{isHindi ? 'डिजिटल पर्चा एवं रिकॉर्ड' : 'Digital E-Prescription & records'}</span>
                  </li>
                </ul>

                <div className="mt-5 pt-4 border-t border-white/10 text-center">
                  <span className="text-[11px] text-slate-300 block mb-1">
                    {isHindi ? 'आपातकालीन सहायता के लिए:' : 'Need Immediate Help?'}
                  </span>
                  <a
                    href="tel:+918002003000"
                    className="inline-block font-mono font-bold text-sm text-orange-300 hover:text-white transition-colors"
                  >
                    +91 80020 03000
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  )
}
