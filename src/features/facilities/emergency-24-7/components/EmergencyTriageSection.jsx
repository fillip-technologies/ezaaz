import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Clock,
  Siren,
  Stethoscope,
  Building2,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

export default function EmergencyTriageSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n?.language === 'hi'

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    location: '',
    emergencyType: 'trauma',
    conditionDetails: ''
  })
  const [formErrors, setFormErrors] = useState({})

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
    if (!formData.patientName.trim()) {
      errors.patientName = isHindi ? 'कृपया मरीज का नाम दर्ज करें' : 'Please enter patient name'
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errors.phone = isHindi ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Please enter valid 10-digit phone number'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  const emergencyFeatures = [
    {
      icon: Clock,
      titleEn: 'Golden Hour Protocol',
      titleHi: 'गोल्डन ऑवर प्रोटोकॉल',
      descEn: 'Standardized rapid-assessment pathways ensuring critical interventions begin within minutes of hospital arrival.',
      descHi: 'अस्पताल आगमन के कुछ ही मिनटों में जीवन रक्षक उपचार सुनिश्चित करने वाला मानकीकृत आपातकालीन प्रोटोकॉल।'
    },
    {
      icon: Siren,
      titleEn: 'Equipped Mobile ICU Ambulances',
      titleHi: 'सुसज्जित मोबाइल आईसीयू एम्बुलेंस',
      descEn: 'State-of-the-art life-support transport equipped with transport ventilators, defibrillators, and paramedic staff.',
      descHi: 'ट्रांसपोर्ट वेंटिलेटर, डीफाइब्रिलेटर और अनुभवी पैरामेडिक्स से लैस आधुनिक मोबाइल आईसीयू एम्बुलेंस।'
    },
    {
      icon: Stethoscope,
      titleEn: 'Board-Certified Emergency Specialists',
      titleHi: 'विशेषज्ञ इमरजेंसी डॉक्टरों की टीम',
      descEn: 'Resident emergency physicians, general surgeons, and anaesthesiologists available 24/7 on premises.',
      descHi: 'परिसर में 24 घंटे उपलब्ध वरिष्ठ इमरजेंसी फिजीशियन, जनरल सर्जन और एनेस्थेटिस्ट की टीम।'
    },
    {
      icon: Building2,
      titleEn: 'Integrated 24×7 Diagnostics & Blood Bank',
      titleHi: '24×7 इन-हाउस डायग्नोस्टिक्स व लैब',
      descEn: 'Instant point-of-care blood gas analysis, emergency ultrasound, digital X-ray, and pathology services.',
      descHi: 'त्वरित ब्लड गैस एनालिसिस, इमरजेंसी अल्ट्रासाउंड, डिजिटल एक्स-रे और पूर्ण डायग्नोस्टिक सेवाएं।'
    }
  ]

  return (
    <section className="relative w-full bg-white text-slate-800 py-12 sm:py-16 lg:py-20 border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column (7 cols): Clinical Capabilities Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c] block mb-1">
                {isHindi ? 'चौबीसों घंटे उपलब्ध' : 'Round-The-Clock Critical Response'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {isHindi
                  ? 'आपातकालीन एवं ट्रॉमा आईसीयू — बिना किसी देरी के जीवन रक्षा'
                  : 'Emergency & Trauma Care — Immediate Intervention When Every Second Counts'}
              </h2>
              <div className="w-16 h-1 bg-[#ea580c] rounded-full mt-3 mb-5" />
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {isHindi
                  ? 'एजाज क्लिनिक का 24×7 आपातकालीन एवं क्रिटिकल केयर विभाग अचानक होने वाली गंभीर चिकित्सीय स्थितियों, सड़क दुर्घटनाओं, तीव्र पेट दर्द, स्ट्रोक और ट्रॉमा के मामलों में त्वरित निदान एवं उपचार के लिए पूरी तरह सुसज्जित है।'
                  : 'The 24×7 Emergency and Trauma Centre at Ejaz Clinic provides immediate, multi-disciplinary resuscitation and acute surgical intervention for severe trauma, acute abdominal emergencies, respiratory distress, and stroke emergencies.'}
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                {isHindi
                  ? 'हमारे अनुभवी इमरजेंसी फिजीशियन, वरिष्ठ सर्जन और क्रिटिकल-केयर एनेस्थेटिस्ट चौबीसों घंटे ऑन-साइट उपलब्ध रहते हैं, जिससे मरीज को "गोल्डन ऑवर" के भीतर उच्चतम कोटि का उपचार प्राप्त होता है।'
                  : 'Our on-site emergency physicians, senior laparoscopic trauma surgeons, and intensivists operate seamlessly with high-speed diagnostic radiology and catheterization facilities to ensure zero delay in acute resuscitation.'}
              </p>
            </div>

            {/* 4 Core Emergency Pillars (Left Logo, Right Title & Paragraph) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {emergencyFeatures.map((feat, idx) => {
                const IconComp = feat.icon
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-4.5 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-300 hover:shadow-sm transition-all flex items-start gap-3.5"
                  >
                    {/* Left side logo/icon */}
                    <div className="w-11 h-11 rounded-xl bg-[#ffefe5] text-[#ea580c] flex items-center justify-center shrink-0 mt-0.5">
                      <IconComp className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    {/* Right side title and paragraph */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug mb-1">
                        {isHindi ? feat.titleHi : feat.titleEn}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {isHindi ? feat.descHi : feat.descEn}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Urgent Call Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#002244] to-[#003a70] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Siren className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold">
                    {isHindi ? 'चिकित्सीय आपातकाल में तुरंत कॉल करें' : 'Facing an Acute Medical Emergency?'}
                  </h4>
                  <p className="text-xs text-slate-200">
                    {isHindi ? 'हमारी एम्बुलेंस एवं ट्रॉमा टीम तुरंत सहायता के लिए उपलब्ध है।' : 'Speak immediately to our on-duty casualty triage coordinator.'}
                  </p>
                </div>
              </div>
              <a
                href="tel:+916203770070"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm text-center transition-all cursor-pointer shadow-md shrink-0"
              >
                {isHindi ? 'कॉल करें: +91 6203 770 070' : 'Call: +91 6203 770 070'}
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Instant Ambulance / Triage Request Form */}
          <div className="lg:col-span-5 bg-[#f8f9fc] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="border-b border-slate-200/80 pb-4 mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>{isHindi ? 'तत्काल एम्बुलेंस रिक्वेस्ट' : 'Rapid Ambulance Dispatch'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {isHindi ? 'एम्बुलेंस या इमरजेंसी सहायता' : 'Request Ambulance / Assistance'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {isHindi
                  ? 'विवरण दर्ज करें। हमारा इमरजेंसी कंट्रोल रूम 60 सेकंड के भीतर आपसे संपर्क करेगा।'
                  : 'Submit details and our emergency casualty coordinator will ring you immediately.'}
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'मरीज का नाम' : 'Patient Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder={isHindi ? 'मरीज का नाम दर्ज करें' : 'e.g. Rahul Verma'}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none transition-all ${
                      formErrors.patientName
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-slate-300 focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10'
                    }`}
                  />
                  {formErrors.patientName && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.patientName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'संपर्क मोबाइल नंबर' : 'Contact Mobile Number'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={isHindi ? '10 अंकों का मोबाइल नंबर' : '10-digit mobile number'}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none transition-all ${
                      formErrors.phone
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-slate-300 focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.phone}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'पिकअप स्थान / पता' : 'Pickup Location / Address'}
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={isHindi ? 'स्थान, कॉलोनी या लैंडमार्क' : 'Area, street or nearby landmark'}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'इमरजेंसी का प्रकार' : 'Type of Emergency'}
                  </label>
                  <select
                    name="emergencyType"
                    value={formData.emergencyType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10 transition-all cursor-pointer"
                  >
                    <option value="trauma">{isHindi ? 'सड़क दुर्घटना / गंभीर चोट (Trauma)' : 'Road Accident / Severe Trauma'}</option>
                    <option value="abdominal">{isHindi ? 'तीव्र पेट दर्द / पथरी (Acute Abdomen)' : 'Severe Abdominal Pain / Gallstone / Appendicitis'}</option>
                    <option value="cardiac">{isHindi ? 'सीने में दर्द / सांस लेने में तकलीफ (Cardiac/Chest)' : 'Chest Pain / Breathlessness'}</option>
                    <option value="stroke">{isHindi ? 'स्ट्रोक / न्यूरोलॉजिकल आपातकाल' : 'Stroke / Sudden Weakness / Fainting'}</option>
                    <option value="other">{isHindi ? 'अन्य सामान्य आपातकालीन स्थिति' : 'Other Acute Medical Emergency'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'मरीज की स्थिति (वैकल्पिक)' : 'Patient Condition (Optional)'}
                  </label>
                  <textarea
                    name="conditionDetails"
                    rows="2"
                    value={formData.conditionDetails}
                    onChange={handleChange}
                    placeholder={isHindi ? 'संक्षिप्त विवरण लिखें...' : 'Brief notes on symptoms...'}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#003a70] focus:ring-2 focus:ring-[#003a70]/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{isHindi ? 'तुरंत सहायता अनुरोध भेजें' : 'Dispatch Emergency Request'}</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{isHindi ? 'गोपनीय एवं प्राथमिकता आधारित आपातकालीन रिस्पांस' : 'Priority medical dispatch with zero paperwork delay'}</span>
                </p>
              </form>
            ) : (
              <div className="py-10 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  {isHindi ? 'अनुरोध प्राप्त हुआ!' : 'Request Dispatched!'}
                </h4>
                <p className="text-slate-600 text-xs max-w-sm mx-auto leading-relaxed">
                  {isHindi
                    ? `धन्यवाद। हमारी आपातकालीन टीम आपके मोबाइल नंबर ${formData.phone} पर तत्काल कॉल कर रही है।`
                    : `Thank you. Our emergency control room is initiating contact on ${formData.phone} immediately.`}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      patientName: '',
                      phone: '',
                      location: '',
                      emergencyType: 'trauma',
                      conditionDetails: ''
                    })
                  }}
                  className="mt-3 px-5 py-2 rounded-xl bg-[#003a70] text-white text-xs font-semibold cursor-pointer"
                >
                  {isHindi ? 'नया अनुरोध दर्ज करें' : 'Submit Another Request'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
