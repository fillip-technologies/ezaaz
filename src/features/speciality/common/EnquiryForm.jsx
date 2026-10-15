import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react'
import { submitSpecialtyEnquiry } from '../../../services/enquiryService'

export default function EnquiryForm({ specialtyName = 'Specialty Care', className = '' }) {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage(isHindi ? 'कृपया नाम और मोबाइल नंबर भरें।' : 'Please enter your name and phone number.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await submitSpecialtyEnquiry({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        specialtyName
      })
      setIsSubmitted(true)
    } catch (err) {
      console.error('Submission error:', err)
      setErrorMessage(isHindi ? 'त्रुटि हुई। कृपया पुनः प्रयास करें।' : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({ name: '', phone: '', message: '' })
    setIsSubmitted(false)
    setErrorMessage('')
  }

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 lg:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 ${className}`}>
      {/* Form Header */}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-5 sm:mb-6">
        {isHindi ? 'पूछताछ फॉर्म (Enquiry Form)' : 'Enquiry Form'}
      </h3>

      {isSubmitted ? (
        /* Success View */
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900">
              {isHindi ? 'पूछताछ सफलतापूर्वक प्राप्त हुई!' : 'Enquiry Submitted Successfully!'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
              {isHindi
                ? `धन्यवाद! हमारी ${specialtyName} केयर टीम जल्द ही आपसे संपर्क करेगी।`
                : `Thank you for reaching out. Our ${specialtyName} care coordinators will call you shortly.`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="mt-2 text-xs font-bold text-[#ea580c] hover:underline cursor-pointer"
          >
            {isHindi ? 'एक और पूछताछ भेजें' : 'Submit Another Enquiry'}
          </button>
        </div>
      ) : (
        /* Form Inputs */
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Field 1: Enter Your Name* */}
          <div>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={isHindi ? 'अपना नाम दर्ज करें*' : 'Enter Your Name*'}
              className="w-full px-4 sm:px-4.5 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#d9532f] focus:ring-3 focus:ring-[#d9532f]/10 transition-all"
            />
          </div>

          {/* Field 2: Country Code + Enter Your Mobile Number* */}
          <div className="flex gap-2.5 sm:gap-3">
            {/* Country Code Selector with Indian Flag */}
            <div className="px-3 sm:px-3.5 py-3.5 rounded-xl border border-slate-200 bg-white flex items-center gap-2 shrink-0 select-none shadow-2xs">
              <span className="text-lg leading-none" role="img" aria-label="India Flag">
                🇮🇳
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                +91
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Mobile Number Input */}
            <input
              type="tel"
              name="phone"
              required
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleChange}
              placeholder={isHindi ? 'मोबाइल नंबर दर्ज करें*' : 'Enter Your Mobile Number*'}
              className="flex-1 min-w-0 px-4 sm:px-4.5 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#d9532f] focus:ring-3 focus:ring-[#d9532f]/10 transition-all"
            />
          </div>

          {/* Field 3: Message Textarea */}
          <div>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder={isHindi ? 'अपना संदेश / समस्या दर्ज करें' : 'Enter Your Message'}
              className="w-full px-4 sm:px-4.5 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-[15px] focus:outline-none focus:border-[#d9532f] focus:ring-3 focus:ring-[#d9532f]/10 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 sm:py-4 rounded-xl bg-[#d9532f] hover:bg-[#c44322] active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-[#d9532f]/20 transition-all duration-200 cursor-pointer disabled:opacity-75"
          >
            <span>
              {isSubmitting
                ? (isHindi ? 'भेजा जा रहा है...' : 'Submitting...')
                : (isHindi ? 'जमा करें' : 'Submit')}
            </span>
            <div className="w-6 h-6 rounded-full bg-white text-[#d9532f] flex items-center justify-center shrink-0 shadow-xs">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </button>
        </form>
      )}
    </div>
  )
}
