import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Send,
  PhoneCall,
  Mail,
  CheckCircle2,
  User,
  AlertCircle
} from 'lucide-react'
import { contactApi } from '../../../api'
import { useDepartments } from '../../contact/useDepartments'

const EMPTY_FORM = {
  fullName: '',
  phone: '',
  email: '',
  department: '',
  message: ''
}

gsap.registerPlugin(ScrollTrigger)

export default function HelpContactSection() {
  const { t, i18n } = useTranslation('home')
  const isHindi = i18n?.language === 'hi'

  const sectionRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  // Same admin-managed departments as the contact page (Settings → Departments)
  const departments = useDepartments(isHindi)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.phone.replace(/\D/g, '').length < 10) {
      return setError(isHindi ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number')
    }
    if (departments.length > 0 && !formData.department) {
      return setError(isHindi ? 'कृपया विभाग चुनें' : 'Please choose a department')
    }

    setLoading(true)
    try {
      await contactApi.submit({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        department: formData.department || null,
        message: formData.message.trim(),
        source: 'home'
      })
      setSubmitted(true)
    } catch (err) {
      setError(
        err.details?.[0]?.message ||
          err.message ||
          (isHindi ? 'संदेश नहीं भेजा जा सका। कृपया पुनः प्रयास करें या हमें कॉल करें।' : 'Could not send your message. Please try again or call us.')
      )
    } finally {
      setLoading(false)
    }
  }

  // GSAP Entrance
  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true
      }
    })

    tl.fromTo(
      '.help-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', clearProps: 'all' }
    )
    .fromTo(
      '.help-form-card',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out', clearProps: 'all' },
      '-=0.3'
    )
    .fromTo(
      '.help-map-card',
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out', clearProps: 'all' },
      '-=0.6'
    )
  }, { scope: sectionRef })


  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#e8f4fa] text-slate-800 py-12 sm:py-16 lg:py-20 border-t border-blue-100 overflow-hidden scroll-mt-24"
    >
      <div id="appointments" className="scroll-mt-24" />
      <div id="help-contact" className="scroll-mt-24" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Banner Header */}
        <div className="help-header text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-tight">
            {t('helpContact.title') || "We're Here to Help"}
          </h2>
          <p className="mt-3 text-slate-600 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed font-normal">
            {t('helpContact.subtitle') ||
              'If you have questions, need help or want to share comments about your experience, our team is ready to help you.'}
          </p>
        </div>

        {/* 2-Column Layout: Left Form, Right Map Only */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">

          {/* Left Column: Contact & Appointment Form (Span 7) */}
          <div className="help-form-card lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200/90 shadow-[0_6px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between text-left">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3 mb-2">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900">
                    {isHindi ? 'संदेश या परामर्श अनुरोध भेजें' : 'Send an Inquiry or Appointment Request'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {isHindi
                      ? 'कृपया अपना विवरण भरें। हमारा समन्वयक 15 मिनट के भीतर आपसे संपर्क करेगा।'
                      : 'Fill in your details below and our patient care team will reach out promptly.'}
                  </p>
                </div>

                {/* Name & Phone in 2 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t('helpContact.form.fullName') || 'Full Name'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={t('helpContact.form.fullNamePlaceholder') || 'Enter your full name'}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t('helpContact.form.phone') || 'Phone Number'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('helpContact.form.phonePlaceholder') || 'Enter your mobile number'}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Department */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t('helpContact.form.email') || 'Email Address'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('helpContact.form.emailPlaceholder') || 'example@email.com'}
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t('helpContact.form.specialty') || 'Select Department / Specialty'}
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="" disabled>
                        {isHindi ? 'विभाग चुनें' : 'Select a department'}
                      </option>
                      {departments.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                          {dep.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t('helpContact.form.message') || 'Your Message / Query'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('helpContact.form.messagePlaceholder') || 'Tell us how we can assist you...'}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:bg-white transition-all resize-none"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </p>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#1a1f26] hover:bg-[#003a70] active:scale-[0.98] text-white font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t('helpContact.sendButton') || 'Send a Message'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success Confirmation */
              <div className="py-12 sm:py-16 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm animate-bounce">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {t('helpContact.form.successTitle') || 'Message Sent Successfully!'}
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  {t('helpContact.form.successDesc') ||
                    'Thank you for reaching out. Our care team and patient coordinator will contact you shortly.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData(EMPTY_FORM)
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#1a1f26] hover:bg-[#003a70] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
                >
                  {t('helpContact.form.sendAnother') || 'Send Another Message'}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Only Google Map as requested */}
          <div className="help-map-card lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_6px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col min-h-[350px] sm:min-h-[400px] lg:min-h-full">
            <iframe
              title="Ejaz Hospital Location Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d52091.24969873239!2d85.0926304!3d25.6159115!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58c23cadcf55%3A0x171e7e6310ea47fa!2sEjaz%20Clinic!5e1!3m2!1sen!2sin!4v1791880274135!5m2!1sen!2sin"
              className="w-full h-full min-h-[350px] sm:min-h-[400px] lg:min-h-full border-0 block flex-1"
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

        </div>

      </div>
    </section>
  )
}
