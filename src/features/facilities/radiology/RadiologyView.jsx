import RadiologyHero from './components/RadiologyHero'
import RadiologyHighlightsSection from './components/RadiologyHighlightsSection'
import RadiologyServicesSection from './components/RadiologyServicesSection'
import RadiologyProcessSection from './components/RadiologyProcessSection'
import RadiologyExpertSection from './components/RadiologyExpertSection'
import RadiologyFaqSection from './components/RadiologyFaqSection'
import HelpContactSection from '../../home/components/HelpContactSection'

export default function RadiologyView() {
  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* 1. Hero Section with radiology.png */}
      <RadiologyHero />

      {/* 2. Radiology Highlights (S-Curve Notched Cards) */}
      <RadiologyHighlightsSection />

      {/* 3. Comprehensive Imaging Services (Image + Text Cards, No Buttons) */}
      <RadiologyServicesSection />

      {/* 4. Scan Journey Process Flow (A Simple & Hassle-Free Process) */}
      <RadiologyProcessSection />

      {/* 5. Expert Interpretation (More Than Just Images) */}
      <RadiologyExpertSection />

      {/* 6. Radiology FAQ Section (Accordion) */}
      <RadiologyFaqSection />

      {/* 7. We're Here to Help (Inquiry Form & Location Map) */}
      <HelpContactSection />
    </div>
  )
}
