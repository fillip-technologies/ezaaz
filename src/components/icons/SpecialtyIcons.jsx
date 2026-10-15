// Premium Anatomical Medical Line-Art Icons with Coral-Red Accents matching reference hospital design
export function LaparoscopicIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="14" y1="50" x2="42" y2="22" strokeWidth="2.5" />
      <path d="M42 22l4-4a3 3 0 0 1 4.2 4.2l-4 4" strokeWidth="2.5" />
      <circle cx="48" cy="16" r="3" fill="#ef4444" stroke="none" />
      <circle cx="20" cy="44" r="8" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="32" cy="32" r="14" opacity="0.3" />
      <path d="M10 54l4-4" stroke="#ef4444" strokeWidth="3" />
      <path d="M6 58l3-3" stroke="#ef4444" strokeWidth="2" />
      <circle cx="10" cy="54" r="2" fill="#ef4444" stroke="none" />
      <path d="M50 20l4-4M46 24l4-4" strokeWidth="2" />
    </svg>
  )
}

export function HerniaIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 14c6 4 11 6 16 6s10-2 16-6v22c0 13-10 18-16 20-6-2-16-7-16-20V14z" />
      <path d="M24 24h16M22 30h20M22 36h20M24 42h16" strokeDasharray="1.5 2" opacity="0.7" />
      <path d="M28 20v24M32 20v25M36 20v24" strokeDasharray="1.5 2" opacity="0.7" />
      <circle cx="32" cy="32" r="6" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="2.5" fill="#ffffff" stroke="none" />
    </svg>
  )
}

export function GeneralSurgeryIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 50L40 24l4 4-26 26H14v-4z" />
      <path d="M40 24l5-5a2 2 0 0 1 2.8 0l2.2 2.2a2 2 0 0 1 0 2.8l-5 5" strokeWidth="2" />
      <line x1="20" y1="44" x2="36" y2="28" opacity="0.4" strokeWidth="1.5" />
      <rect x="42" y="38" width="12" height="12" rx="2" stroke="none" fill="#fee2e2" />
      <path d="M48 40v8M44 44h8" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="48" cy="44" r="8" stroke="#ef4444" strokeWidth="1.2" opacity="0.4" strokeDasharray="2 2" />
    </svg>
  )
}

export function CancerSurgeryIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(-30 32 32)" />
      <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(30 32 32)" />
      <ellipse cx="32" cy="32" rx="9" ry="22" transform="rotate(0 32 32)" strokeDasharray="2 2" opacity="0.4" />
      <circle cx="32" cy="32" r="6" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
      <circle cx="16" cy="22" r="2.5" fill="#ef4444" stroke="none" />
      <circle cx="48" cy="42" r="2.5" fill="#ef4444" stroke="none" />
      <circle cx="46" cy="20" r="2" fill="#334155" stroke="none" />
      <circle cx="18" cy="44" r="2" fill="#334155" stroke="none" />
    </svg>
  )
}

export function UrologyIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16c-6 0-10 5-10 12s4 14 11 14c3 0 4-2 4-5 0-5-2-8-4-12-.8-1.5-1-4-1-9z" />
      <path d="M42 16c6 0 10 5 10 12s-4 14-11 14c-3 0-4-2-4-5 0-5 2-8 4-12 .8-1.5 1-4 1-9z" />
      <path d="M26 35c2 6 4 10 6 14" strokeWidth="1.8" />
      <path d="M38 35c-2 6-4 10-6 14" strokeWidth="1.8" />
      <path d="M26 49c0-3 3-5 6-5s6 2 6 5c0 4-3 7-6 7s-6-3-6-7z" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
    </svg>
  )
}

export function GynaecologyIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M24 24c0-5 3.5-8 8-8s8 3 8 8c0 8-5 17-8 22-3-5-8-14-8-22z" />
      <path d="M24 22c-5-2-9-1-12 3s-1 7 2 8" />
      <circle cx="14" cy="33" r="4" fill="#334155" fillOpacity="0.1" />
      <path d="M40 22c5-2 9-1 12 3s1 7-2 8" />
      <circle cx="50" cy="33" r="4" fill="#334155" fillOpacity="0.1" />
      <path d="M32 25c-2-3-5.5-3-7 0s0 5 7 9c7-4 8.5-6 7-9s-5-3-7 0z" fill="#ef4444" stroke="#dc2626" strokeWidth="1.2" />
      <path d="M32 46v9M27 51h10" strokeWidth="2" />
    </svg>
  )
}

export function OrthopaedicsIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M44 14c2-2 5-2 7 0s2 5 0 7l-1 1c1 2 1 5-1 7l-8 8-8-8 8-8c2-2 5-2 7 0z" />
      <circle cx="49" cy="19" r="2.5" fill="#334155" fillOpacity="0.15" />
      <path d="M24 34l8 8-8 8c-2 2-2 5-4 7s-5 1-7-1-1-5 1-7l1-1c-2-2-2-5 0-7l9-7z" />
      <circle cx="15" cy="49" r="2.5" fill="#334155" fillOpacity="0.15" />
      <path d="M29 31l4-4 2 5 5-2-4 5 3 3-6-2-2 4-2-9z" fill="#ef4444" stroke="#dc2626" strokeWidth="1.2" />
      <line x1="39" y1="21" x2="43" y2="17" stroke="#ef4444" strokeWidth="2" />
      <line x1="21" y1="39" x2="17" y2="43" stroke="#ef4444" strokeWidth="2" />
    </svg>
  )
}

export function InternalMedicineIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M30 22c-8-6-16-1-16 10 0 12 14 22 18 24 4-2 18-12 18-24 0-11-8-16-16-10" />
      <path d="M25 22V12h6v8" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
      <path d="M33 16h6v5h-6z" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
      <path d="M28 12c0-3 3-5 6-5s6 2 6 5" stroke="#ef4444" strokeWidth="2" />
      <path d="M22 34h5l2-4 3 8 2-6 2 2h6" stroke="#334155" strokeWidth="1.8" />
    </svg>
  )
}

export function GastrointestinalIcon({ className = 'w-6 h-6' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="#334155"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Esophagus entering the stomach */}
      <path d="M29 8v8" />
      <path d="M35 8v5" />

      {/* Anatomical Stomach Outline (Fundus, Greater Curvature, and Body) */}
      <path d="M29 16c-9 1-15 7-15 15 0 10 7 18 19 18 8 0 13-4 13-9 0-3-2-5-5-6-6-2-7-6-5-12l0-4" />

      {/* Duodenal C-Loop (Upper Intestine) exiting the pylorus */}
      <path d="M47 37c4 1 6 5 6 9 0 5-4 9-11 9-5 0-9-2-12-4" strokeWidth="1.8" />

      {/* Intestinal folds below */}
      <path d="M26 53c3 2 8 2 12-1" strokeWidth="1.8" />

      {/* Subtle internal gastric rugae (mucosal folds) */}
      <path d="M23 27c3 4 5 9 5 13" stroke="#334155" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.45" />
      <path d="M19 33c2 3 3 7 4 10" stroke="#334155" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.45" />

      {/* Red Medical Cross Badge matching General Surgery & Internal Medicine icon style */}
      <circle cx="45" cy="22" r="5" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
      <path d="M45 19.5v5M42.5 22h5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function PlasticSurgeryIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 14c8-4 18-4 24 2 5 6 5 15 3 22-3 8-10 14-16 16-5 0-9-3-11-7" />
      <path d="M26 26c2-1 5-1 7 0" strokeWidth="1.8" />
      <path d="M31 28v6l2 1.5" strokeWidth="1.8" />
      <path d="M28 40c2 1.5 5 1.5 7 0" strokeWidth="1.8" />
      <path d="M22 18c6 3 12 8 14 16" strokeDasharray="2 2" opacity="0.5" />
      <path d="M46 16l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
      <circle cx="16" cy="38" r="2" fill="#ef4444" stroke="none" />
    </svg>
  )
}

export function PhysiotherapyIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="32" cy="11" r="4" fill="#334155" fillOpacity="0.15" />
      <line x1="32" y1="16" x2="32" y2="52" strokeWidth="2" />
      <rect x="27" y="18" width="10" height="4" rx="2" strokeWidth="1.8" />
      <rect x="26" y="25" width="12" height="4.5" rx="2" strokeWidth="1.8" />
      <rect x="25" y="32.5" width="14" height="5" rx="2" strokeWidth="1.8" />
      <rect x="26" y="40.5" width="12" height="4.5" rx="2" strokeWidth="1.8" />
      <circle cx="32" cy="23" r="2" fill="#ef4444" stroke="none" />
      <circle cx="32" cy="30.5" r="2.2" fill="#ef4444" stroke="none" />
      <circle cx="32" cy="38.5" r="2.2" fill="#ef4444" stroke="none" />
      <circle cx="32" cy="46.5" r="2" fill="#ef4444" stroke="none" />
      <path d="M16 26c-3 4-3 10 0 14" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 26c3 4 3 10 0 14" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <circle cx="15" cy="33" r="2" fill="#ef4444" stroke="none" />
      <circle cx="49" cy="33" r="2" fill="#ef4444" stroke="none" />
    </svg>
  )
}

export function AnaesthesiaIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 36c-4-2-7-6-7-11 0-7 6-12 14-12 3 0 6 1 8 2 2-1 5-2 8-2 8 0 14 5 14 12 0 4-2 8-5 10" />
      <path d="M26 19c2 3 2 7 0 10M38 19c-2 3-2 7 0 10M32 16v14" opacity="0.6" strokeWidth="1.8" />
      <path d="M22 27c4 1 7 0 9-3M42 27c-4 1-7 0-9-3" opacity="0.6" strokeWidth="1.8" />
      <path d="M30 33c-3 2-6 5-6 9 0 4 3 7 7 7h2v5h4v-5h2c4 0 7-3 7-7 0-4-3-7-6-9z" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
    </svg>
  )
}

export const SPECIALTY_ICONS = {
  laparoscopic: LaparoscopicIcon,
  hernia: HerniaIcon,
  'general-surgery': GeneralSurgeryIcon,
  'cancer-surgery': CancerSurgeryIcon,
  urology: UrologyIcon,
  gynaecology: GynaecologyIcon,
  orthopaedics: OrthopaedicsIcon,
  'internal-medicine': InternalMedicineIcon,
  gastrointestinal: GastrointestinalIcon,
  'plastic-surgery': PlasticSurgeryIcon,
  physiotherapist: PhysiotherapyIcon,
  anaesthesia: AnaesthesiaIcon
}
