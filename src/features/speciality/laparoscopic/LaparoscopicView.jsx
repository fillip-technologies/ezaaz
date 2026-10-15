import LaparoscopicHero from './components/LaparoscopicHero'
import LaparoscopicAboutSection from './components/LaparoscopicAboutSection'
import LaparoscopicTypesSection from './components/LaparoscopicTypesSection'
import LaparoscopicHighlightsSection from './components/LaparoscopicHighlightsSection'
import LaparoscopicEquipmentSection from './components/LaparoscopicEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

export default function LaparoscopicView() {
  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Section */}
      <LaparoscopicHero />

      {/* About Laparoscopic Surgery & Right Enquiry Form Section */}
      <LaparoscopicAboutSection />

      {/* Types of Laparoscopic Surgery Section */}
      <LaparoscopicTypesSection />

      {/* Laparoscopic Care Highlights Section */}
      <LaparoscopicHighlightsSection />

      {/* Advanced Technology & Equipment We Use */}
      <LaparoscopicEquipmentSection />

      {/* Real Patient Recovery Stories & Testimonials from Home */}
      <TestimonialsSection />
    </div>
  )
}
