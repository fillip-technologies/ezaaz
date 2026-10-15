import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsAppButton() {
  const { t, i18n } = useTranslation(['common', 'home'])
  const isHindi = i18n?.language === 'hi'
  const [showTooltip, setShowTooltip] = useState(true)

  // Hospital WhatsApp Number (standard international format without + or special chars)
  const phoneNumber = '916203770070'
  const defaultMessage = encodeURIComponent(
    isHindi
      ? 'नमस्ते एजाज अस्पताल, मुझे आपके स्वास्थ्य सेवाओं और परामर्श के बारे में जानकारी चाहिए।'
      : 'Hello Ejaz Hospital, I would like to inquire about your medical services and doctor appointments.'
  )
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`

  // Automatically minimize tooltip after 8 seconds on initial visit, but hover brings it back
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false)
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 select-none"
      id="sticky-whatsapp-widget"
    >
      {/* Interactive Tooltip Bubble */}
      <div
        className={`hidden sm:flex items-center gap-2.5 bg-white text-slate-800 px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-100 transition-all duration-300 transform ${
          showTooltip
            ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-x-3 scale-95 pointer-events-none group-hover:opacity-100'
        }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 leading-none">
            {isHindi ? 'ऑनलाइन सहायता' : 'Online Support'}
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-slate-800 hover:text-emerald-600 transition-colors mt-0.5 leading-snug"
          >
            {isHindi ? 'व्हाट्सएप पर चैट करें' : 'Chat with us on WhatsApp'}
          </a>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowTooltip(false)
          }}
          className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer ml-1"
          aria-label="Close tooltip"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Ejaz Hospital"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#20ba59] to-[#25D366] text-white shadow-[0_8px_22px_rgba(37,211,102,0.45)] hover:shadow-[0_14px_32px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 ease-out cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
      >
        {/* Subtle pulsing background wave ring */}
        <span className="absolute -inset-1 sm:-inset-1.5 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        {/* WhatsApp Official SVG Icon */}
        <svg
          className="w-6 h-6 sm:w-9 sm:h-9 fill-white relative z-10 transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Small Active Online Status Dot on Mobile */}
        <span className="sm:hidden absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
      </a>
    </div>
  )
}
