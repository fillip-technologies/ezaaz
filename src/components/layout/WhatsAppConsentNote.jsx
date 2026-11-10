// Shown under phone fields of website forms: replies come on WhatsApp (Meta expects people to be told)
export default function WhatsAppConsentNote({ isHindi, className = '' }) {
  return (
    <p className={`mt-1.5 flex items-start gap-1 text-[11px] leading-snug text-slate-500 ${className}`}>
      <svg viewBox="0 0 24 24" className="mt-px h-3 w-3 shrink-0 fill-[#25d366]" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" />
      </svg>
      {isHindi
        ? 'हम इसी नंबर पर WhatsApp पर जवाब भेज सकते हैं। रोकने के लिए STOP लिखें।'
        : 'We may reply to this number on WhatsApp. Reply STOP to opt out.'}
    </p>
  )
}
