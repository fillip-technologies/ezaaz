import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Clock,
  Scan,
  FlaskConical,
  HeartPulse,
  Activity
} from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import logoWhiteImg from '../../assets/Logo_white_text.png'
import logoDarkImg from '../../assets/Logo_editedg.png'
import { SPECIALTY_ICONS, LaparoscopicIcon, PhysiotherapyIcon } from '../icons/SpecialtyIcons'

// Medical line-art icons matching SpecialtyIcons coral-red and dark-slate design
function Emergency247Icon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="32" cy="32" r="22" strokeWidth="2.5" />
      <polyline points="32 18 32 32 42 38" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="3" fill="#ef4444" stroke="none" />
      <path d="M48 16l4-4M16 16l-4-4" stroke="#ef4444" strokeWidth="2.5" />
      <circle cx="50" cy="14" r="2" fill="#ef4444" stroke="none" />
      <circle cx="14" cy="14" r="2" fill="#ef4444" stroke="none" />
    </svg>
  )
}

function RadiologyScanIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="12" y="10" width="40" height="44" rx="4" strokeWidth="2.5" />
      <line x1="32" y1="16" x2="32" y2="48" strokeWidth="2" />
      <path d="M22 22c5 4 10 4 10 4s5 0 10-4" strokeWidth="2" />
      <path d="M20 30c6 4 12 4 12 4s6 0 12-4" strokeWidth="2" />
      <path d="M22 38c5 4 10 4 10 4s5 0 10-4" strokeWidth="2" />
      <circle cx="32" cy="30" r="3" fill="#ef4444" stroke="none" />
      <circle cx="46" cy="16" r="2" fill="#ef4444" stroke="none" />
    </svg>
  )
}

function DiagnosticLabIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M26 12h12M30 12v12l-14 24a4 4 0 0 0 3.5 6h29a4 4 0 0 0 3.5-6L34 24V12" strokeWidth="2.5" />
      <line x1="21" y1="40" x2="43" y2="40" strokeDasharray="2 2" opacity="0.6" strokeWidth="1.5" />
      <circle cx="28" cy="46" r="3" fill="#ef4444" stroke="none" />
      <circle cx="36" cy="44" r="2" fill="#ef4444" stroke="none" />
      <circle cx="32" cy="36" r="1.5" fill="#ef4444" stroke="none" />
    </svg>
  )
}

function IcuCriticalCareIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="10" y="14" width="44" height="34" rx="4" strokeWidth="2.5" />
      <path d="M16 32h8l3-8 6 16 4-10 3 4h8" strokeWidth="2.5" />
      <path d="M24 48l-4 6h24l-4-6" strokeWidth="2" />
      <circle cx="48" cy="22" r="3" fill="#ef4444" stroke="none" />
      <circle cx="16" cy="22" r="1.5" fill="#ef4444" stroke="none" />
    </svg>
  )
}

function BookAppointmentIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="10" y="14" width="44" height="42" rx="6" strokeWidth="2.5" />
      <line x1="10" y1="26" x2="54" y2="26" strokeWidth="2" />
      <line x1="20" y1="8" x2="20" y2="16" strokeWidth="2.5" stroke="#ea580c" />
      <line x1="44" y1="8" x2="44" y2="16" strokeWidth="2.5" stroke="#ea580c" />
      <circle cx="32" cy="40" r="9" stroke="#ea580c" strokeWidth="2" />
      <path d="M32 36v8M28 40h8" stroke="#ea580c" strokeWidth="2" />
    </svg>
  )
}

function BlogIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 12h32a6 6 0 0 1 6 6v34a4 4 0 0 0-4-4H12" strokeWidth="2.5" />
      <path d="M12 12a4 4 0 0 0-4 4v34a4 4 0 0 0 4 4h34" strokeWidth="2.5" stroke="#ea580c" />
      <line x1="18" y1="22" x2="38" y2="22" strokeWidth="2" stroke="#ea580c" />
      <line x1="18" y1="30" x2="34" y2="30" strokeWidth="2" />
      <line x1="18" y1="38" x2="30" y2="38" strokeWidth="2" />
    </svg>
  )
}

function ResearchArticleIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 10h24a4 4 0 0 1 4 4v38a2 2 0 0 1-2 2H14a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" strokeWidth="2.5" />
      <path d="M42 20h8a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H20" strokeWidth="2" />
      <line x1="18" y1="22" x2="34" y2="22" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="30" x2="34" y2="30" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="38" x2="28" y2="38" strokeWidth="2" strokeLinecap="round" />
      <circle cx="38" cy="42" r="7" stroke="#ea580c" strokeWidth="2" fill="white" />
      <line x1="43" y1="47" x2="49" y2="53" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function CaseStudiesIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="12" y="14" width="40" height="42" rx="5" strokeWidth="2.5" />
      <path d="M24 14V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" strokeWidth="2.5" />
      <circle cx="32" cy="11" r="2" fill="#ea580c" stroke="#ea580c" />
      <path d="M20 26h24" strokeWidth="2" stroke="#ea580c" />
      <path d="M20 34h16" strokeWidth="2" />
      <path d="M20 42h14" strokeWidth="2" />
      <circle cx="43" cy="41" r="7" stroke="#ea580c" strokeWidth="2" fill="white" />
      <path d="M40 41l2 2 4-4" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Navbar({ currentRoute = 'home' }) {
  const { t, i18n } = useTranslation('common')
  const { t: tHome } = useTranslation('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSpecialtiesDropdownOpen, setIsSpecialtiesDropdownOpen] = useState(false)
  const [isMobileSpecialtiesOpen, setIsMobileSpecialtiesOpen] = useState(false)
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false)
  const [isMobileGalleryOpen, setIsMobileGalleryOpen] = useState(false)
  const [isFacilitiesDropdownOpen, setIsFacilitiesDropdownOpen] = useState(false)
  const [isMobileFacilitiesOpen, setIsMobileFacilitiesOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isHealthResourcesDropdownOpen, setIsHealthResourcesDropdownOpen] = useState(false)
  const [isMobileHealthResourcesOpen, setIsMobileHealthResourcesOpen] = useState(false)

  const navContainerRef = useRef(null)
  const dropdownRef = useRef(null)
  const dropdownTimeoutRef = useRef(null)
  const galleryDropdownRef = useRef(null)
  const galleryDropdownTimeoutRef = useRef(null)
  const facilitiesDropdownRef = useRef(null)
  const facilitiesDropdownTimeoutRef = useRef(null)
  const servicesDropdownRef = useRef(null)
  const servicesDropdownTimeoutRef = useRef(null)
  const healthResourcesDropdownRef = useRef(null)
  const healthResourcesDropdownTimeoutRef = useRef(null)

  // Load all homepage specialties for the dropdown
  const rawSpecialties = tHome('specialtiesSection.items', { returnObjects: true })
  const specialtyList = Array.isArray(rawSpecialties) && rawSpecialties.length > 0
    ? rawSpecialties
    : [
        { id: 'hernia', name: 'Hernia Surgery' },
        { id: 'cancer-surgery', name: 'Cancer Surgery' },
        { id: 'urology', name: 'Urology' },
        { id: 'gynaecology', name: 'Gynaecology & Obstetrics' },
        { id: 'internal-medicine', name: 'General Internal Medicine' },
        { id: 'gastrointestinal', name: 'Gastrointestinal Surgery' },
        { id: 'plastic-surgery', name: 'Plastic Surgery' },
        { id: 'anaesthesia', name: 'Anaesthesia & Critical Care' }
      ]

  const isHindi = i18n.language === 'hi'

  // Facilities Dropdown items: 24*7 service, radiology, diagnostic lab, icu, physiotherapy
  const facilitiesList = [
    {
      id: '24-7-service',
      name: isHindi ? '24*7 आपातकालीन सेवा' : '24*7 Service',
      href: '/facilities/24-7-service',
      icon: Emergency247Icon,
    },
    {
      id: 'radiology',
      name: isHindi ? 'रेडियोलॉजी' : 'Radiology',
      href: '/facilities/radiology',
      icon: RadiologyScanIcon,
    },
    {
      id: 'diagnosis',
      name: isHindi ? 'डायग्नोस्टिक लैब' : 'Diagnostic Lab',
      href: '/facilities/diagnosis',
      icon: DiagnosticLabIcon,
    },
    {
      id: 'icu',
      name: isHindi ? 'आईसीयू (ICU)' : 'ICU',
      href: '/facilities/icu',
      icon: IcuCriticalCareIcon,
    },
    {
      id: 'physiotherapy',
      name: isHindi ? 'फिजियोथेरेपी' : 'Physiotherapy',
      href: '/facilities/physiotherapy',
      icon: PhysiotherapyIcon,
    },
  ]

  // Services Dropdown items: Book an Appointment, Emergency Care
  const servicesList = [
    {
      id: 'book-appointment',
      name: isHindi ? 'अपॉइंटमेंट बुक करें' : 'Book an Appointment',
      href: '/services/book-appointment',
      icon: BookAppointmentIcon,
      subtitle: isHindi ? 'ऑनलाइन डॉक्टर परामर्श' : 'Schedule doctor consultation',
    },
    {
      id: 'emergency-services',
      name: isHindi ? '24/7 आपातकालीन सेवा' : 'Emergency & Trauma Care',
      href: '/facilities/24-7-service',
      icon: Emergency247Icon,
      subtitle: isHindi ? 'तत्काल मेडिकल एवं सर्जिकल सहायता' : 'Immediate critical care & response',
    },
  ]

  // Health Resources Dropdown items: Research & Articles, Case Studies, Blogs
  const healthResourcesList = [
    {
      id: 'research-articles',
      name: isHindi ? 'रिसर्च एवं आर्टिकल्स' : 'Research & Articles',
      href: '/research',
      icon: ResearchArticleIcon,
    },
    {
      id: 'case-studies',
      name: isHindi ? 'केस स्टडीज' : 'Case Studies',
      href: '/case-studies',
      icon: CaseStudiesIcon,
    },
    {
      id: 'blogs',
      name: isHindi ? 'स्वास्थ्य ब्लॉग एवं लेख' : 'Blogs',
      href: '/services/blogs',
      icon: BlogIcon,
    },
  ]


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Sync active nav item with current route
  useEffect(() => {
    if (currentRoute === 'doctors' || currentRoute === 'doctor-profile') {
      setActiveItem('doctors')
    } else if (['laparoscopic', 'cancer', 'cancer-surgery', 'hernia', 'orthopaedics', 'orthopedic', 'general-surgery', 'gastrointestinal', 'anaesthesia', 'anesthesia', 'plastic-surgery', 'plastic', 'urology', 'general-internal', 'internal-medicine', 'gynaecology', 'gynecology', 'gyanecology'].includes(currentRoute)) {
      setActiveItem('speciality')
    } else if (currentRoute === 'gallery-photos' || currentRoute === 'gallery-videos' || currentRoute === 'gallery' || currentRoute.startsWith('gallery')) {
      setActiveItem('gallery')
    } else if (currentRoute === 'contact') {
      setActiveItem('contact')
    } else if (currentRoute === 'about') {
      setActiveItem('about')
    } else if (currentRoute === 'facilities' || currentRoute.startsWith('facilities') || ['24-7-service', 'radiology', 'diagnosis', 'icu', 'physiotherapy', 'physiotherapist'].includes(currentRoute)) {
      setActiveItem('facilities')
    } else if (['blogs', 'blog-details', 'research', 'case-studies', 'case-study', 'health-resources'].includes(currentRoute) || currentRoute.startsWith('health-resources')) {
      setActiveItem('health-resources')
    } else if (['book-appointment', 'appointment-booking', 'services'].includes(currentRoute) || currentRoute.startsWith('services')) {
      setActiveItem('services')
    } else if (currentRoute === 'home') {
      setActiveItem('home')
    }
  }, [currentRoute])

  // Close dropdowns on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSpecialtiesDropdownOpen(false)
      }
      if (galleryDropdownRef.current && !galleryDropdownRef.current.contains(e.target)) {
        setIsGalleryDropdownOpen(false)
      }
      if (facilitiesDropdownRef.current && !facilitiesDropdownRef.current.contains(e.target)) {
        setIsFacilitiesDropdownOpen(false)
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target)) {
        setIsServicesDropdownOpen(false)
      }
      if (healthResourcesDropdownRef.current && !healthResourcesDropdownRef.current.contains(e.target)) {
        setIsHealthResourcesDropdownOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSpecialtiesDropdownOpen(false)
        setIsGalleryDropdownOpen(false)
        setIsFacilitiesDropdownOpen(false)
        setIsServicesDropdownOpen(false)
        setIsHealthResourcesDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
      if (galleryDropdownTimeoutRef.current) clearTimeout(galleryDropdownTimeoutRef.current)
      if (facilitiesDropdownTimeoutRef.current) clearTimeout(facilitiesDropdownTimeoutRef.current)
      if (servicesDropdownTimeoutRef.current) clearTimeout(servicesDropdownTimeoutRef.current)
      if (healthResourcesDropdownTimeoutRef.current) clearTimeout(healthResourcesDropdownTimeoutRef.current)
    }
  }, [])

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setIsSpecialtiesDropdownOpen(true)
  }

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsSpecialtiesDropdownOpen(false)
    }, 150)
  }

  const handleGalleryMouseEnter = () => {
    if (galleryDropdownTimeoutRef.current) clearTimeout(galleryDropdownTimeoutRef.current)
    setIsGalleryDropdownOpen(true)
  }

  const handleGalleryMouseLeave = () => {
    galleryDropdownTimeoutRef.current = setTimeout(() => {
      setIsGalleryDropdownOpen(false)
    }, 150)
  }

  const handleFacilitiesMouseEnter = () => {
    if (facilitiesDropdownTimeoutRef.current) clearTimeout(facilitiesDropdownTimeoutRef.current)
    setIsFacilitiesDropdownOpen(true)
  }

  const handleFacilitiesMouseLeave = () => {
    facilitiesDropdownTimeoutRef.current = setTimeout(() => {
      setIsFacilitiesDropdownOpen(false)
    }, 150)
  }

  const handleServicesMouseEnter = () => {
    if (servicesDropdownTimeoutRef.current) clearTimeout(servicesDropdownTimeoutRef.current)
    setIsServicesDropdownOpen(true)
  }

  const handleServicesMouseLeave = () => {
    servicesDropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false)
    }, 150)
  }

  const handleHealthResourcesMouseEnter = () => {
    if (healthResourcesDropdownTimeoutRef.current) clearTimeout(healthResourcesDropdownTimeoutRef.current)
    setIsHealthResourcesDropdownOpen(true)
  }

  const handleHealthResourcesMouseLeave = () => {
    healthResourcesDropdownTimeoutRef.current = setTimeout(() => {
      setIsHealthResourcesDropdownOpen(false)
    }, 150)
  }

  const handleHealthResourceItemClick = (e, resource) => {
    if (e) e.preventDefault()
    setIsHealthResourcesDropdownOpen(false)
    setIsMobileMenuOpen(false)
    setIsMobileHealthResourcesOpen(false)

    const targetUrl = resource.href || '/services/blogs'
    if (window.history?.pushState) {
      window.history.pushState(null, '', targetUrl)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: targetUrl }))
    } else {
      window.location.href = targetUrl
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setActiveItem('health-resources')
  }

  const handleServiceItemClick = (e, service) => {
    if (e) e.preventDefault()
    setIsServicesDropdownOpen(false)
    setIsMobileMenuOpen(false)
    setIsMobileServicesOpen(false)

    const targetUrl = service.href || `/services/${service.id}`
    if (window.history?.pushState) {
      window.history.pushState(null, '', targetUrl)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: targetUrl }))
    } else {
      window.location.href = targetUrl
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setActiveItem('services')
  }

  const handleFacilityItemClick = (e, facility) => {
    if (e) e.preventDefault()
    setIsFacilitiesDropdownOpen(false)
    setIsMobileMenuOpen(false)
    setIsMobileFacilitiesOpen(false)

    const targetUrl = facility.href || `/facilities/${facility.id}`
    if (window.history?.pushState) {
      window.history.pushState(null, '', targetUrl)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: targetUrl }))
    } else {
      window.location.href = targetUrl
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setActiveItem('facilities')
  }

  const handleGalleryItemClick = (e, path) => {
    if (e) e.preventDefault()
    setIsGalleryDropdownOpen(false)
    setIsMobileMenuOpen(false)
    setIsMobileGalleryOpen(false)

    if (window.history?.pushState) {
      window.history.pushState(null, '', path)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: path }))
    } else {
      window.location.href = path
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setActiveItem('gallery')
  }

  // GSAP Entrance Animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(navContainerRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.8,
      clearProps: 'opacity,transform'
    })
      .from('.nav-logo', {
        x: -25,
        opacity: 0,
        duration: 0.6,
        clearProps: 'all'
      }, '-=0.5')
      .from('.nav-link-item', {
        y: -15,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        clearProps: 'all'
      }, '-=0.4')
      .from('.nav-right-controls', {
        x: 25,
        opacity: 0,
        duration: 0.6,
        clearProps: 'all'
      }, '-=0.5')
  }, { scope: navContainerRef })

  const navLinks = [
    { id: 'home', label: t('nav.home') || 'Home', href: '/' },
    { id: 'about', label: t('nav.about') || 'About', href: '/about' },
    { id: 'speciality', label: t('nav.specialities') || 'Speciality', href: '#specialities', hasDropdown: true, dropdownType: 'speciality' },
    { id: 'doctors', label: t('nav.doctors') || 'Doctors', href: '/doctors' },
    { id: 'facilities', label: t('nav.facilities') || 'Facilities', href: '#facilities', hasDropdown: true, dropdownType: 'facilities' },
    { id: 'services', label: t('nav.services') || 'Services', href: '/services/book-appointment', hasDropdown: true, dropdownType: 'services' },
    { id: 'health-resources', label: t('nav.healthResources') || (isHindi ? 'स्वास्थ्य संसाधन' : 'Health Resources'), href: '#health-resources', hasDropdown: true, dropdownType: 'health-resources' },
    { id: 'gallery', label: t('nav.gallery') || 'Gallery', href: '/gallery/photos', hasDropdown: true, dropdownType: 'gallery' },
    { id: 'contact', label: t('nav.contact') || 'Contact', href: '/contact' },
  ]

  const handleNavClick = (e, href, id) => {
    if (e) e.preventDefault()
    setIsMobileMenuOpen(false)
    setIsSpecialtiesDropdownOpen(false)
    setIsGalleryDropdownOpen(false)
    setIsFacilitiesDropdownOpen(false)
    setIsServicesDropdownOpen(false)
    setIsHealthResourcesDropdownOpen(false)

    const isSubpage = currentRoute !== 'home' || (window.location.pathname !== '/' && window.location.pathname !== '')

    if (href === '/services/book-appointment' || id === 'services') {
      if (window.history?.pushState) {
        window.history.pushState(null, '', '/services/book-appointment')
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/services/book-appointment' }))
      } else {
        window.location.href = '/services/book-appointment'
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setActiveItem('services')
      return
    }

    if (id === 'health-resources') {
      const targetUrl = '/services/blogs'
      if (window.history?.pushState) {
        window.history.pushState(null, '', targetUrl)
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: targetUrl }))
      } else {
        window.location.href = targetUrl
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setActiveItem('health-resources')
      return
    }

    if (href === '/doctors' || id === 'doctors') {
      if (window.history?.pushState) {
        window.history.pushState(null, '', '/doctors')
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/doctors' }))
      } else {
        window.location.href = '/doctors'
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setActiveItem('doctors')
      return
    }

    if (href === '/appointment-booking' || id === 'appointment-booking') {
      if (window.history?.pushState) {
        window.history.pushState(null, '', '/appointment-booking')
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/appointment-booking' }))
      } else {
        window.location.href = '/appointment-booking'
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setActiveItem('services')
      return
    }

    if (href === '/services/blogs' || href === '/blogs' || id === 'blogs' || href === '/blog-details' || id === 'blog-details') {
      const targetUrl = href.includes('blog-details') ? href : '/services/blogs'
      if (window.history?.pushState) {
        window.history.pushState(null, '', targetUrl)
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: targetUrl }))
      } else {
        window.location.href = targetUrl
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setActiveItem('services')
      return
    }

    if (href === '/book-appointment' || id === 'book-appointment') {
      if (window.history?.pushState) {
        window.history.pushState(null, '', '/book-appointment')
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/book-appointment' }))
      } else {
        window.location.href = '/book-appointment'
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setActiveItem('services')
      return
    }

    if (href === '/gallery/photos' || href === '/gallery/videos' || id === 'gallery') {
      const targetUrl = href.startsWith('/gallery/') ? href : '/gallery/photos'
      if (window.history?.pushState) {
        window.history.pushState(null, '', targetUrl)
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: targetUrl }))
      } else {
        window.location.href = targetUrl
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setActiveItem('gallery')
      return
    }

    if (href === '/contact' || id === 'contact') {
      if (window.history?.pushState) {
        window.history.pushState(null, '', '/contact')
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/contact' }))
      } else {
        window.location.href = '/contact'
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setActiveItem('contact')
      return
    }

    if (href === '/about' || id === 'about') {
      if (window.history?.pushState) {
        window.history.pushState(null, '', '/about')
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/about' }))
      } else {
        window.location.href = '/about'
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setActiveItem('about')
      return
    }

    if (id === 'facilities' && isSubpage) {
      if (window.history?.pushState) {
        window.history.pushState(null, '', '/facilities/24-7-service')
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/facilities/24-7-service' }))
      } else {
        window.location.href = '/facilities/24-7-service'
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setActiveItem('facilities')
      return
    }

    if (href === '/' || href === '#home' || id === 'home') {
      if (isSubpage) {
        if (window.history?.pushState) {
          window.history.pushState(null, '', '/')
          window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
          window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/' }))
        } else {
          window.location.href = '/'
        }
      } else {
        // Already on home: clean any hash from URL
        if (window.location.hash && window.history?.replaceState) {
          window.history.replaceState(null, '', window.location.pathname || '/')
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveItem('home')
      return
    }

    if (isSubpage) {
      if (window.history?.pushState) {
        window.history.pushState(null, '', '/')
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: '/' }))
      } else {
        window.location.href = '/'
      }
      setTimeout(() => {
        const targetEl = document.querySelector(href) || (href === '#specialities' ? document.getElementById('departments') : null)
        if (targetEl) {
          const navOffset = 84
          const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navOffset
          window.scrollTo({ top: targetPos, behavior: 'smooth' })
        }
      }, 150)
      setActiveItem('home')
      return
    }

    const targetEl = document.querySelector(href) || (href === '#specialities' ? document.getElementById('departments') : null)
    if (targetEl) {
      const navOffset = 84
      const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top: targetPos, behavior: 'smooth' })
    }
    setActiveItem('home')
  }

  const getSpecialtyUrl = (specId) => {
    switch (specId) {
      case 'laparoscopic':
        return '/speciality/laparoscopic'
      case 'cancer-surgery':
      case 'cancer':
        return '/speciality/cancer-surgery'
      case 'hernia':
        return '/speciality/hernia'
      case 'orthopaedics':
      case 'orthopedic':
        return '/speciality/orthopaedics'
      case 'general-surgery':
        return '/speciality/general-surgery'
      case 'gastrointestinal':
        return '/speciality/gastrointestinal'
      case 'physiotherapist':
      case 'physiotherapy':
        return '/speciality/physiotherapy'
      case 'anaesthesia':
      case 'anesthesia':
        return '/speciality/anaesthesia'
      case 'plastic-surgery':
      case 'plastic':
        return '/speciality/plastic-surgery'
      case 'urology':
        return '/speciality/urology'
      case 'internal-medicine':
      case 'general-internal':
        return '/speciality/general-internal'
      case 'gynaecology':
      case 'gynecology':
      case 'gyanecology':
        return '/speciality/gynaecology'
      default:
        return '#specialities'
    }
  }

  const handleSpecialtyClick = (e, specId) => {
    if (e) e.preventDefault()
    setIsSpecialtiesDropdownOpen(false)
    setIsMobileMenuOpen(false)

    const targetUrl = getSpecialtyUrl(specId)
    if (targetUrl.startsWith('/speciality/')) {
      if (window.history?.pushState) {
        window.history.pushState(null, '', targetUrl)
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        window.dispatchEvent(new CustomEvent('app-route-change', { detail: targetUrl }))
      } else {
        window.location.href = targetUrl
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      setActiveItem('speciality')
      return
    }

    handleNavClick(e, '#specialities', 'speciality')
  }

  // Use solid light navbar on doctor-profile or when scrolled
  const isLightPage = currentRoute === 'doctor-profile'
  const isLightMode = isScrolled || isLightPage

  return (
    <header ref={navContainerRef} className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* Translucent Header with Backdrop Blur */}
      <div
        className={`transition-all duration-300 ${
          isLightMode
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-md text-slate-800'
            : 'bg-slate-950/40 backdrop-blur-md border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.25)] text-white'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-4">
          
          {/* Brand Logo Image from Assets */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/', 'home')}
            className="nav-logo flex items-center group cursor-pointer shrink-0 focus:outline-none"
          >
            <img
              src={isLightMode ? logoDarkImg : logoWhiteImg}
              alt="Ejaz Clinic Logo"
              className="h-14 sm:h-16 lg:h-[68px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-4.5 2xl:gap-7">
            {navLinks.map((item) => {
              const isActive = activeItem === item.id

              // Speciality item with reference-style dropdown
              if (item.dropdownType === 'speciality') {
                return (
                  <div
                    key={item.id}
                    ref={dropdownRef}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                    className="nav-link-item relative py-2"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.id)}
                      className={`text-[13px] font-medium transition-all duration-200 tracking-wide flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                        isActive || isSpecialtiesDropdownOpen
                          ? isLightMode
                            ? 'text-[#ea580c] font-bold'
                            : 'text-white font-semibold'
                          : isLightMode
                          ? 'text-slate-700 hover:text-slate-950'
                          : 'text-slate-200/90 hover:text-white'
                      }`}
                      aria-expanded={isSpecialtiesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isSpecialtiesDropdownOpen
                            ? 'rotate-180 text-orange-500'
                            : isLightMode
                            ? 'text-slate-500'
                            : 'text-slate-400'
                        }`}
                      />
                    </a>

                    {/* Orange accent underline matching UI reference */}
                    {(isActive || isSpecialtiesDropdownOpen) && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ea580c] rounded-full"></span>
                    )}

                    {/* Dropdown Menu matching UI reference - Compact Single Column with NO SCROLLBAR */}
                    <div
                      className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 origin-top-left ${
                        isSpecialtiesDropdownOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                          : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                      }`}
                    >
                      <div className="w-72 sm:w-80 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.20)] border border-slate-200/80 overflow-hidden text-slate-800">
                        <div className="divide-y divide-slate-100">
                          {specialtyList.map((spec) => {
                            const IconComp = SPECIALTY_ICONS[spec.id] || LaparoscopicIcon
                            return (
                              <a
                                key={spec.id}
                                href={getSpecialtyUrl(spec.id)}
                                onClick={(e) => handleSpecialtyClick(e, spec.id)}
                                className="group/item flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
                              >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0 transition-transform duration-150 group-hover/item:scale-110">
                                  <IconComp className="w-5 h-5" />
                                </div>
                                <span className="text-[13px] sm:text-[13.5px] font-medium text-slate-700 group-hover/item:text-slate-950 transition-colors leading-tight">
                                  {spec.name}
                                </span>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              // Gallery item with luxury dropdown for Photos & Videos
              if (item.dropdownType === 'gallery') {
                return (
                  <div
                    key={item.id}
                    ref={galleryDropdownRef}
                    onMouseEnter={handleGalleryMouseEnter}
                    onMouseLeave={handleGalleryMouseLeave}
                    className="nav-link-item relative py-2"
                  >
                    <a
                      href="/gallery/photos"
                      onClick={(e) => handleGalleryItemClick(e, '/gallery/photos')}
                      className={`text-[13px] font-medium transition-all duration-200 tracking-wide flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                        isActive || isGalleryDropdownOpen
                          ? isLightMode
                            ? 'text-[#ea580c] font-bold'
                            : 'text-white font-semibold'
                          : isLightMode
                          ? 'text-slate-700 hover:text-slate-950'
                          : 'text-slate-200/90 hover:text-white'
                      }`}
                      aria-expanded={isGalleryDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isGalleryDropdownOpen
                            ? 'rotate-180 text-orange-500'
                            : isLightMode
                            ? 'text-slate-500'
                            : 'text-slate-400'
                        }`}
                      />
                    </a>

                    {/* Orange accent underline matching UI reference */}
                    {(isActive || isGalleryDropdownOpen) && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ea580c] rounded-full"></span>
                    )}

                    {/* Dropdown Menu for Gallery: Photos & Videos */}
                    <div
                      className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 origin-top-left ${
                        isGalleryDropdownOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                          : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                      }`}
                    >
                      <div className="w-40 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-slate-200/90 overflow-hidden text-slate-800 p-1.5 space-y-0.5">
                        
                        {/* Option 1: Photos */}
                        <a
                          href="/gallery/photos"
                          onClick={(e) => handleGalleryItemClick(e, '/gallery/photos')}
                          className={`block px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-colors duration-150 cursor-pointer ${
                            currentRoute === 'gallery-photos'
                              ? 'bg-orange-50 text-[#ea580c]'
                              : 'text-slate-700 hover:text-[#ea580c] hover:bg-slate-50'
                          }`}
                        >
                          {t('nav.photos') || 'Photos'}
                        </a>

                        {/* Option 2: Videos */}
                        <a
                          href="/gallery/videos"
                          onClick={(e) => handleGalleryItemClick(e, '/gallery/videos')}
                          className={`block px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-colors duration-150 cursor-pointer ${
                            currentRoute === 'gallery-videos'
                              ? 'bg-orange-50 text-[#ea580c]'
                              : 'text-slate-700 hover:text-[#ea580c] hover:bg-slate-50'
                          }`}
                        >
                          {t('nav.videos') || 'Videos'}
                        </a>

                      </div>
                    </div>
                  </div>
                )
              }

              // Facilities item with dropdown: 24*7 service, radiology, diagnostic lab, icu, physiotherapy
              if (item.dropdownType === 'facilities') {
                return (
                  <div
                    key={item.id}
                    ref={facilitiesDropdownRef}
                    onMouseEnter={handleFacilitiesMouseEnter}
                    onMouseLeave={handleFacilitiesMouseLeave}
                    className="nav-link-item relative py-2"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.id)}
                      className={`text-[13px] font-medium transition-all duration-200 tracking-wide flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                        isActive || isFacilitiesDropdownOpen
                          ? isLightMode
                            ? 'text-[#ea580c] font-bold'
                            : 'text-white font-semibold'
                          : isLightMode
                          ? 'text-slate-700 hover:text-slate-950'
                          : 'text-slate-200/90 hover:text-white'
                      }`}
                      aria-expanded={isFacilitiesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isFacilitiesDropdownOpen
                            ? 'rotate-180 text-orange-500'
                            : isLightMode
                            ? 'text-slate-500'
                            : 'text-slate-400'
                        }`}
                      />
                    </a>

                    {/* Orange accent underline matching UI reference */}
                    {(isActive || isFacilitiesDropdownOpen) && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ea580c] rounded-full"></span>
                    )}

                    {/* Dropdown Menu matching Speciality dropdown - Compact Single Column with divide-y */}
                    <div
                      className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 origin-top-left ${
                        isFacilitiesDropdownOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                          : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                      }`}
                    >
                      <div className="w-72 sm:w-80 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.20)] border border-slate-200/80 overflow-hidden text-slate-800">
                        <div className="divide-y divide-slate-100">
                          {facilitiesList.map((facility) => {
                            const IconComp = facility.icon
                            return (
                              <a
                                key={facility.id}
                                href={facility.href}
                                onClick={(e) => handleFacilityItemClick(e, facility)}
                                className="group/item flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
                              >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0 transition-transform duration-150 group-hover/item:scale-110">
                                  <IconComp className="w-5 h-5" />
                                </div>
                                <span className="text-[13px] sm:text-[13.5px] font-medium text-slate-700 group-hover/item:text-slate-950 transition-colors leading-tight">
                                  {facility.name}
                                </span>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              // Services item with dropdown: Book an Appointment
              if (item.dropdownType === 'services') {
                return (
                  <div
                    key={item.id}
                    ref={servicesDropdownRef}
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                    className="nav-link-item relative py-2"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.id)}
                      className={`text-[13px] font-medium transition-all duration-200 tracking-wide flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                        isActive || isServicesDropdownOpen
                          ? isLightMode
                            ? 'text-[#ea580c] font-bold'
                            : 'text-white font-semibold'
                          : isLightMode
                          ? 'text-slate-700 hover:text-slate-950'
                          : 'text-slate-200/90 hover:text-white'
                      }`}
                      aria-expanded={isServicesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isServicesDropdownOpen
                            ? 'rotate-180 text-orange-500'
                            : isLightMode
                            ? 'text-slate-500'
                            : 'text-slate-400'
                        }`}
                      />
                    </a>

                    {/* Orange accent underline matching UI reference */}
                    {(isActive || isServicesDropdownOpen) && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ea580c] rounded-full"></span>
                    )}

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 origin-top-left ${
                        isServicesDropdownOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                          : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                      }`}
                    >
                      <div className="w-72 sm:w-80 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.20)] border border-slate-200/80 overflow-hidden text-slate-800 p-2">
                        <div className="flex flex-col gap-1">
                          {servicesList.map((service) => {
                            const IconComp = service.icon
                            return (
                              <a
                                key={service.id}
                                href={service.href}
                                onClick={(e) => handleServiceItemClick(e, service)}
                                className="group/item flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl hover:bg-orange-50/70 transition-all duration-150 cursor-pointer"
                              >
                                <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/60 flex items-center justify-center shrink-0 transition-transform duration-150 group-hover/item:scale-105">
                                  <IconComp className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[13.5px] font-semibold text-slate-800 group-hover/item:text-[#ea580c] transition-colors leading-tight">
                                    {service.name}
                                  </span>
                                  {service.subtitle && (
                                    <span className="text-[11px] text-slate-500 font-normal mt-0.5">
                                      {service.subtitle}
                                    </span>
                                  )}
                                </div>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              // Health Resources item with dropdown: Research & Articles, Blogs
              if (item.dropdownType === 'health-resources') {
                return (
                  <div
                    key={item.id}
                    ref={healthResourcesDropdownRef}
                    onMouseEnter={handleHealthResourcesMouseEnter}
                    onMouseLeave={handleHealthResourcesMouseLeave}
                    className="nav-link-item relative py-2"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.id)}
                      className={`text-[13px] font-medium transition-all duration-200 tracking-wide flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                        isActive || isHealthResourcesDropdownOpen
                          ? isLightMode
                            ? 'text-[#ea580c] font-bold'
                            : 'text-white font-semibold'
                          : isLightMode
                          ? 'text-slate-700 hover:text-slate-950'
                          : 'text-slate-200/90 hover:text-white'
                      }`}
                      aria-expanded={isHealthResourcesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isHealthResourcesDropdownOpen
                            ? 'rotate-180 text-orange-500'
                            : isLightMode
                            ? 'text-slate-500'
                            : 'text-slate-400'
                        }`}
                      />
                    </a>

                    {/* Orange accent underline matching UI reference */}
                    {(isActive || isHealthResourcesDropdownOpen) && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ea580c] rounded-full"></span>
                    )}

                    {/* Dropdown Menu matching Speciality dropdown - Compact Single Column with divide-y */}
                    <div
                      className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 origin-top-left ${
                        isHealthResourcesDropdownOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                          : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                      }`}
                    >
                      <div className="w-64 sm:w-72 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.20)] border border-slate-200/80 overflow-hidden text-slate-800">
                        <div className="divide-y divide-slate-100">
                          {healthResourcesList.map((resource) => {
                            const IconComp = resource.icon
                            return (
                              <a
                                key={resource.id}
                                href={resource.href}
                                onClick={(e) => handleHealthResourceItemClick(e, resource)}
                                className="group/item flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
                              >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0 transition-transform duration-150 group-hover/item:scale-110">
                                  <IconComp className="w-5 h-5" />
                                </div>
                                <span className="text-[13px] sm:text-[13.5px] font-medium text-slate-700 group-hover/item:text-slate-950 transition-colors leading-tight">
                                  {resource.name}
                                </span>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              // Standard nav links
              return (
                <div key={item.id} className="nav-link-item relative py-2">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                    className={`text-[13px] font-medium transition-all duration-200 tracking-wide block cursor-pointer ${
                      isActive
                        ? isLightMode
                          ? 'text-[#ea580c] font-bold'
                          : 'text-white font-semibold'
                        : isLightMode
                        ? 'text-slate-700 hover:text-slate-950'
                        : 'text-slate-200/90 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ea580c] rounded-full"></span>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right Action Controls: Language Switcher, Master Color CTA */}
          <div className="nav-right-controls hidden md:flex items-center gap-3.5 shrink-0">

            {/* Language Switcher (EN | हिंदी) */}
            <LanguageSwitcher isLight={isLightMode} />

            {/* Master Color CTA Button */}
            <a
              href="/appointment-booking"
              onClick={(e) => handleNavClick(e, '/appointment-booking', 'appointment-booking')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d9532f] hover:bg-[#c44322] text-white border border-[#d9532f] font-bold text-xs sm:text-[13px] shadow-lg shadow-[#d9532f]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer"
            >
              <span>{t('nav.bookAppointment')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSwitcher isLight={isLightMode} />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`p-2 rounded-xl transition-colors focus:outline-none ${
                isLightMode
                  ? 'text-slate-800 hover:bg-slate-100'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div
            className={`xl:hidden backdrop-blur-2xl px-5 pt-4 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto ${
              isLightMode
                ? 'bg-white/98 border-t border-slate-200 text-slate-800'
                : 'bg-slate-950/95 border-t border-white/10 text-white'
            }`}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => {
                const isActive = activeItem === item.id

                // Speciality mobile accordion
                if (item.dropdownType === 'speciality') {
                  return (
                    <div key={item.id} className="flex flex-col">
                      <div
                        className={`flex items-center justify-between rounded-xl transition-colors ${
                          isLightMode ? 'hover:bg-slate-100' : 'hover:bg-white/5'
                        }`}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, item.id)}
                          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                            isActive
                              ? 'text-[#ea580c] font-bold'
                              : isLightMode
                              ? 'text-slate-800 hover:text-black'
                              : 'text-slate-200 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </a>
                        <button
                          type="button"
                          onClick={() => setIsMobileSpecialtiesOpen(!isMobileSpecialtiesOpen)}
                          className={`p-3 focus:outline-none ${
                            isLightMode ? 'text-slate-500 hover:text-black' : 'text-slate-400 hover:text-white'
                          }`}
                          aria-label="Toggle specialties list"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isMobileSpecialtiesOpen ? 'rotate-180 text-orange-500' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Mobile Accordion Submenu */}
                      {isMobileSpecialtiesOpen && (
                        <div
                          className={`ml-3 my-1 pl-3 border-l-2 border-orange-500/40 rounded-xl p-2 flex flex-col gap-1 ${
                            isLightMode ? 'bg-slate-50' : 'bg-white/5'
                          }`}
                        >
                          {specialtyList.map((spec) => {
                            const IconComp = SPECIALTY_ICONS[spec.id] || LaparoscopicIcon
                            return (
                              <a
                                key={spec.id}
                                href={getSpecialtyUrl(spec.id)}
                                onClick={(e) => handleSpecialtyClick(e, spec.id)}
                                className={`px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                                  isLightMode
                                    ? 'text-slate-700 hover:text-black hover:bg-slate-100'
                                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <IconComp className="w-full h-full" />
                                </div>
                                <span className="truncate">{spec.name}</span>
                              </a>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

                // Gallery mobile accordion
                if (item.dropdownType === 'gallery') {
                  return (
                    <div key={item.id} className="flex flex-col">
                      <div
                        className={`flex items-center justify-between rounded-xl transition-colors ${
                          isLightMode ? 'hover:bg-slate-100' : 'hover:bg-white/5'
                        }`}
                      >
                        <a
                          href="/gallery/photos"
                          onClick={(e) => handleGalleryItemClick(e, '/gallery/photos')}
                          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                            isActive
                              ? 'text-[#ea580c] font-bold'
                              : isLightMode
                              ? 'text-slate-800 hover:text-black'
                              : 'text-slate-200 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </a>
                        <button
                          type="button"
                          onClick={() => setIsMobileGalleryOpen(!isMobileGalleryOpen)}
                          className={`p-3 focus:outline-none ${
                            isLightMode ? 'text-slate-500 hover:text-black' : 'text-slate-400 hover:text-white'
                          }`}
                          aria-label="Toggle gallery list"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isMobileGalleryOpen ? 'rotate-180 text-orange-500' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Mobile Accordion Submenu for Gallery */}
                      {isMobileGalleryOpen && (
                        <div
                          className={`ml-3 my-1 pl-3 border-l-2 border-orange-500/40 rounded-xl p-1.5 flex flex-col gap-0.5 ${
                            isLightMode ? 'bg-slate-50' : 'bg-white/5'
                          }`}
                        >
                          {/* Photos Link */}
                          <a
                            href="/gallery/photos"
                            onClick={(e) => handleGalleryItemClick(e, '/gallery/photos')}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              currentRoute === 'gallery-photos'
                                ? 'bg-orange-100 text-[#ea580c]'
                                : isLightMode
                                ? 'text-slate-700 hover:text-black hover:bg-slate-100'
                                : 'text-slate-200 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {t('nav.photos') || 'Photos'}
                          </a>

                          {/* Videos Link */}
                          <a
                            href="/gallery/videos"
                            onClick={(e) => handleGalleryItemClick(e, '/gallery/videos')}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              currentRoute === 'gallery-videos'
                                ? 'bg-orange-100 text-[#ea580c]'
                                : isLightMode
                                ? 'text-slate-700 hover:text-black hover:bg-slate-100'
                                : 'text-slate-200 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {t('nav.videos') || 'Videos'}
                          </a>
                        </div>
                      )}
                    </div>
                  )
                }

                // Facilities mobile accordion
                if (item.dropdownType === 'facilities') {
                  return (
                    <div key={item.id} className="flex flex-col">
                      <div
                        className={`flex items-center justify-between rounded-xl transition-colors ${
                          isLightMode ? 'hover:bg-slate-100' : 'hover:bg-white/5'
                        }`}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, item.id)}
                          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                            isActive
                              ? 'text-[#ea580c] font-bold'
                              : isLightMode
                              ? 'text-slate-800 hover:text-black'
                              : 'text-slate-200 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </a>
                        <button
                          type="button"
                          onClick={() => setIsMobileFacilitiesOpen(!isMobileFacilitiesOpen)}
                          className={`p-3 focus:outline-none ${
                            isLightMode ? 'text-slate-500 hover:text-black' : 'text-slate-400 hover:text-white'
                          }`}
                          aria-label="Toggle facilities list"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isMobileFacilitiesOpen ? 'rotate-180 text-orange-500' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Mobile Accordion Submenu matching Speciality */}
                      {isMobileFacilitiesOpen && (
                        <div
                          className={`ml-3 my-1 pl-3 border-l-2 border-orange-500/40 rounded-xl p-2 flex flex-col gap-1 ${
                            isLightMode ? 'bg-slate-50' : 'bg-white/5'
                          }`}
                        >
                          {facilitiesList.map((facility) => {
                            const IconComp = facility.icon
                            return (
                              <a
                                key={facility.id}
                                href={facility.href}
                                onClick={(e) => handleFacilityItemClick(e, facility)}
                                className={`px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                                  isLightMode
                                    ? 'text-slate-700 hover:text-black hover:bg-slate-100'
                                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <IconComp className="w-full h-full" />
                                </div>
                                <span className="truncate">{facility.name}</span>
                              </a>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

                // Services mobile accordion
                if (item.dropdownType === 'services') {
                  return (
                    <div key={item.id} className="flex flex-col">
                      <div
                        className={`flex items-center justify-between rounded-xl transition-colors ${
                          isLightMode ? 'hover:bg-slate-100' : 'hover:bg-white/5'
                        }`}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, item.id)}
                          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                            isActive
                              ? 'text-[#ea580c] font-bold'
                              : isLightMode
                              ? 'text-slate-800 hover:text-black'
                              : 'text-slate-200 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </a>
                        <button
                          type="button"
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className={`p-3 focus:outline-none ${
                            isLightMode ? 'text-slate-500 hover:text-black' : 'text-slate-400 hover:text-white'
                          }`}
                          aria-label="Toggle services list"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isMobileServicesOpen ? 'rotate-180 text-orange-500' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Mobile Accordion Submenu */}
                      {isMobileServicesOpen && (
                        <div
                          className={`ml-3 my-1 pl-3 border-l-2 border-orange-500/40 rounded-xl p-2 flex flex-col gap-1 ${
                            isLightMode ? 'bg-slate-50' : 'bg-white/5'
                          }`}
                        >
                          {servicesList.map((service) => {
                            const IconComp = service.icon
                            return (
                              <a
                                key={service.id}
                                href={service.href}
                                onClick={(e) => handleServiceItemClick(e, service)}
                                className={`px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                                  isLightMode
                                    ? 'text-slate-700 hover:text-black hover:bg-slate-100'
                                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <IconComp className="w-full h-full" />
                                </div>
                                <span className="truncate">{service.name}</span>
                              </a>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

                // Health Resources mobile accordion
                if (item.dropdownType === 'health-resources') {
                  return (
                    <div key={item.id} className="flex flex-col">
                      <div
                        className={`flex items-center justify-between rounded-xl transition-colors ${
                          isLightMode ? 'hover:bg-slate-100' : 'hover:bg-white/5'
                        }`}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, item.id)}
                          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                            isActive
                              ? 'text-[#ea580c] font-bold'
                              : isLightMode
                              ? 'text-slate-800 hover:text-black'
                              : 'text-slate-200 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </a>
                        <button
                          type="button"
                          onClick={() => setIsMobileHealthResourcesOpen(!isMobileHealthResourcesOpen)}
                          className={`p-3 focus:outline-none ${
                            isLightMode ? 'text-slate-500 hover:text-black' : 'text-slate-400 hover:text-white'
                          }`}
                          aria-label="Toggle health resources list"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isMobileHealthResourcesOpen ? 'rotate-180 text-orange-500' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Mobile Accordion Submenu */}
                      {isMobileHealthResourcesOpen && (
                        <div
                          className={`ml-3 my-1 pl-3 border-l-2 border-orange-500/40 rounded-xl p-2 flex flex-col gap-1 ${
                            isLightMode ? 'bg-slate-50' : 'bg-white/5'
                          }`}
                        >
                          {healthResourcesList.map((resource) => {
                            const IconComp = resource.icon
                            return (
                              <a
                                key={resource.id}
                                href={resource.href}
                                onClick={(e) => handleHealthResourceItemClick(e, resource)}
                                className={`px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-colors cursor-pointer ${
                                  isLightMode
                                    ? 'text-slate-700 hover:text-black hover:bg-slate-100'
                                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                  <IconComp className="w-full h-full" />
                                </div>
                                <span className="truncate">{resource.name}</span>
                              </a>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }


                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      isActive
                        ? isLightMode
                          ? 'bg-orange-50 text-[#ea580c] font-bold border border-orange-200/80'
                          : 'bg-white/15 text-emerald-300 font-semibold border border-white/20'
                        : isLightMode
                        ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                        : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 ${isLightMode ? 'text-slate-400' : 'text-slate-400'}`} />
                  </a>
                )
              })}
            </nav>

            <div className={`mt-5 pt-4 border-t flex flex-col gap-3 ${isLightMode ? 'border-slate-200' : 'border-white/10'}`}>
              <a
                href="/appointment-booking"
                onClick={(e) => handleNavClick(e, '/appointment-booking', 'appointment-booking')}
                className="w-full py-3 rounded-full bg-[#d9532f] hover:bg-[#c44322] text-white border border-[#d9532f] font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#d9532f]/20 active:scale-98 transition-all cursor-pointer"
              >
                <span>{t('nav.bookAppointment')}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
