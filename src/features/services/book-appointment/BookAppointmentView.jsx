import { useState } from 'react'
import BookAppointmentHero from './components/BookAppointmentHero'
import DoctorsSection from '../../home/components/DoctorsSection'

export default function BookAppointmentView() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('patna')

  const handleFilterGo = ({ specialty, location }) => {
    setSelectedSpecialty(specialty)
    setSelectedLocation(location)

    // Smooth scroll down to the doctors list
    const el = document.getElementById('doctors')
    if (el) {
      const navOffset = 85
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const handleClearSpecialty = () => {
    setSelectedSpecialty('all')
  }

  return (
    <div className="w-full bg-white text-slate-800 min-h-screen">
      {/* Hero section with "Patna", "Select Speciality", and "Go" pill filters */}
      <BookAppointmentHero
        onFilterGo={handleFilterGo}
        currentSpecialty={selectedSpecialty}
        currentLocation={selectedLocation}
      />

      {/* Doctors section filtered by chosen specialty and live search */}
      <DoctorsSection
        isAppointmentPage={true}
        selectedSpecialtyFilter={selectedSpecialty}
        onClearSpecialtyFilter={handleClearSpecialty}
      />
    </div>
  )
}
