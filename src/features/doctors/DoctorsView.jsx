import DoctorsHero from './components/DoctorsHero'
import DoctorsAboutSection from './components/DoctorsAboutSection'

export default function DoctorsView() {
  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section with doctors-hero.jpg and "Meet Our Doctors" heading */}
      <DoctorsHero />

      {/* About Medical Faculty & Embedded Appointment Booking Form */}
      <DoctorsAboutSection />
    </div>
  )
}
