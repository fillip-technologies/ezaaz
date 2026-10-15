import EmergencyHero from './components/EmergencyHero'
import EmergencyHotlinesSection from './components/EmergencyHotlinesSection'
import EmergencyProcessSection from './components/EmergencyProcessSection'
import EmergencyTriageSection from './components/EmergencyTriageSection'
import EmergencyFaqSection from './components/EmergencyFaqSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

export default function EmergencyView() {
  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* 1. Hero Banner with emergency.png */}
      <EmergencyHero />

      {/* 2. 24×7 Action Hotlines */}
      <EmergencyHotlinesSection />

      {/* 3. Emergency Process Flow: From Emergency Call to Expert Care */}
      <EmergencyProcessSection />

      {/* 4. Clinical Capabilities Narrative & Ambulance Dispatch Form */}
      <EmergencyTriageSection />

      {/* 5. Frequently Asked Emergency Questions */}
      <EmergencyFaqSection />

      {/* 6. Patient Recovery Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
