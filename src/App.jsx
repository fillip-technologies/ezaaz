import { useState, useEffect, lazy, Suspense } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import WelcomeVideoIntro from './components/welcome/WelcomeVideoIntro'
import HomePage from './pages/HomePage'
import LaparoscopicPage from './pages/LaparoscopicPage'
import CancerPage from './pages/CancerPage'
import HerniaPage from './pages/HerniaPage'
import OrthopedicsPage from './pages/OrthopedicsPage'
import GeneralSurgeryPage from './pages/GeneralSurgeryPage'
import GastrointestinalPage from './pages/GastrointestinalPage'
import PhysiotherapyPage from './pages/PhysiotherapyPage'
import AnaesthesiaPage from './pages/AnaesthesiaPage'
import PlasticSurgeryPage from './pages/PlasticSurgeryPage'
import UrologyPage from './pages/UrologyPage'
import GeneralInternalPage from './pages/GeneralInternalPage'
import GynaecologyPage from './pages/GynaecologyPage'
import DoctorsPage from './pages/DoctorsPage'
import DoctorProfilePage from './pages/DoctorProfilePage'
import PhotosPage from './pages/PhotosPage'
import VideosPage from './pages/VideosPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import Emergency247Page from './pages/Emergency247Page'
import RadiologyPage from './pages/RadiologyPage'
import DiagnosisPage from './pages/DiagnosisPage'
import IcuPage from './pages/IcuPage'
import BookAppointmentPage from './pages/BookAppointmentPage'
import AppointmentBookingPage from './pages/AppointmentBookingPage'
import BlogsPage from './pages/BlogsPage'
import BlogDetailsPage from './pages/BlogDetailsPage'
import ResearchPage from './pages/ResearchPage'
import CaseStudiesPage from './pages/CaseStudiesPage'

// Admin panel is loaded only when visiting /master
const AdminApp = lazy(() => import('./features/admin/AdminApp'))

const getRouteFromUrl = () => {
  const path = window.location.pathname.toLowerCase()
  const hash = window.location.hash.toLowerCase()

  // Must run before the keyword matching below (e.g. /master/... must never match 'doctor')
  if (path === '/master' || path.startsWith('/master/')) return 'master'

  // If path is root '/' or empty, only allow explicit hash-routing like '#/doctors'
  let target = path
  if ((path === '/' || path === '') && hash.startsWith('#/')) {
    target = hash.slice(1)
  } else if (path === '/' || path === '') {
    return 'home'
  }

  if (
    target.includes('blog-details') ||
    (target.includes('blog') && target.includes('detail'))
  ) {
    return 'blog-details'
  }
  if (target.includes('blog')) {
    return 'blogs'
  }
  if (target.includes('research') || target.includes('article')) {
    return 'research'
  }
  if (target.includes('case-stud') || target.includes('case-studies') || target.includes('casestud')) {
    return 'case-studies'
  }
  if (
    target.includes('appointment-booking') ||
    target.includes('booking')
  ) {
    return 'appointment-booking'
  }
  if (
    target.includes('book-appointment') ||
    target.includes('appointment')
  ) {
    return 'book-appointment'
  }
  if (
    target.includes('icu') ||
    target.includes('critical-care') ||
    target.includes('intensive-care')
  ) {
    return 'icu'
  }
  if (
    target.includes('diagnosis') ||
    target.includes('diagnostic')
  ) {
    return 'diagnosis'
  }
  if (target.includes('radiology')) {
    return 'radiology'
  }
  if (
    target.includes('24-7') ||
    target.includes('24x7') ||
    target.includes('emergency') ||
    target.includes('ambulance')
  ) {
    return '24-7-service'
  }
  if (target.includes('profile')) return 'doctor-profile'
  if (target.includes('doctor')) return 'doctors'
  if (target.includes('video')) return 'gallery-videos'
  if (target.includes('photo')) return 'gallery-photos'
  if (target.includes('contact')) return 'contact'
  if (target.includes('about')) return 'about'
  if (target.includes('gallery')) return 'gallery-photos'
  if (target.includes('cancer')) return 'cancer'
  if (target.includes('hernia')) return 'hernia'
  if (
    target.includes('orthopedic') ||
    target.includes('orthopaedic')
  ) {
    return 'orthopaedics'
  }
  if (target.includes('general-surgery')) return 'general-surgery'
  if (target.includes('gastrointestinal') || target.includes('gastro')) return 'gastrointestinal'
  if (target.includes('physio')) return 'physiotherapy'
  if (target.includes('anaesthesia') || target.includes('anesthesia')) return 'anaesthesia'
  if (target.includes('plastic')) return 'plastic-surgery'
  if (target.includes('urology')) return 'urology'
  if (
    target.includes('general-internal') ||
    target.includes('internal-medicine')
  ) {
    return 'general-internal'
  }
  if (
    target.includes('gynaecolog') ||
    target.includes('gynecolog') ||
    target.includes('gyanecolog') ||
    target.includes('gynae')
  ) {
    return 'gynaecology'
  }
  if (target.includes('laparoscopic')) return 'laparoscopic'
  return 'home'
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(getRouteFromUrl)

  useEffect(() => {
    // If the browser URL contains #home, cleanly remove it from the address bar
    if (window.location.hash === '#home') {
      if (window.history?.replaceState) {
        window.history.replaceState(null, '', window.location.pathname || '/')
      }
    }

    const handleLocationChange = () => {
      if (window.location.hash === '#home' && window.history?.replaceState) {
        window.history.replaceState(null, '', window.location.pathname || '/')
      }
      setCurrentRoute(getRouteFromUrl())
    }

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    window.addEventListener('app-route-change', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
      window.removeEventListener('app-route-change', handleLocationChange)
    }
  }, [])

  // Instantly scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [currentRoute])

  if (currentRoute === 'master') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-100" />}>
        <AdminApp />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-master text-white flex flex-col font-sans selection:bg-amber-400/30 selection:text-amber-200">
      {/* Cinematic First-Time Video Welcome Gateway only on Home */}
      {currentRoute === 'home' && <WelcomeVideoIntro />}

      {/* Luxury Navbar */}
      <Navbar currentRoute={currentRoute} />

      {/* Main Page Area */}
      <main className="flex-1 w-full">
        {currentRoute === 'laparoscopic' && <LaparoscopicPage />}
        {currentRoute === 'cancer' && <CancerPage />}
        {currentRoute === 'hernia' && <HerniaPage />}
        {currentRoute === 'orthopaedics' && <OrthopedicsPage />}
        {currentRoute === 'general-surgery' && <GeneralSurgeryPage />}
        {currentRoute === 'gastrointestinal' && <GastrointestinalPage />}
        {currentRoute === 'physiotherapy' && <PhysiotherapyPage />}
        {currentRoute === 'anaesthesia' && <AnaesthesiaPage />}
        {currentRoute === 'plastic-surgery' && <PlasticSurgeryPage />}
        {currentRoute === 'urology' && <UrologyPage />}
        {currentRoute === 'general-internal' && <GeneralInternalPage />}
        {currentRoute === 'gynaecology' && <GynaecologyPage />}
        {currentRoute === 'doctors' && <DoctorsPage />}
        {currentRoute === 'doctor-profile' && <DoctorProfilePage />}
        {currentRoute === 'gallery-photos' && <PhotosPage />}
        {currentRoute === 'gallery-videos' && <VideosPage />}
        {currentRoute === 'contact' && <ContactPage />}
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === '24-7-service' && <Emergency247Page />}
        {currentRoute === 'radiology' && <RadiologyPage />}
        {currentRoute === 'diagnosis' && <DiagnosisPage />}
        {currentRoute === 'icu' && <IcuPage />}
        {currentRoute === 'appointment-booking' && <AppointmentBookingPage />}
        {currentRoute === 'book-appointment' && <BookAppointmentPage />}
        {currentRoute === 'blogs' && <BlogsPage />}
        {currentRoute === 'blog-details' && <BlogDetailsPage />}
        {currentRoute === 'research' && <ResearchPage />}
        {currentRoute === 'case-studies' && <CaseStudiesPage />}
        {currentRoute === 'home' && <HomePage />}
      </main>

      {/* Hospital Footer */}
      <Footer />

      {/* Sticky Floating WhatsApp Widget */}
      <WhatsAppButton />
    </div>
  )
}
