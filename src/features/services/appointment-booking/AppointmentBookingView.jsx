import AppointmentBookingHero from './components/AppointmentBookingHero'
import AppointmentBookingForm from './components/AppointmentBookingForm'

export default function AppointmentBookingView() {
  return (
    <div className="w-full bg-white text-slate-800 min-h-screen">
      {/* Hero section with trust badges and title */}
      <AppointmentBookingHero />

      {/* Main Appointment Booking Form with Doctor pre-select, Slots, and Patient Info */}
      <AppointmentBookingForm />
    </div>
  )
}
