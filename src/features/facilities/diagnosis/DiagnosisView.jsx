import DiagnosisHero from './components/DiagnosisHero'
import DiagnosisHighlightsSection from './components/DiagnosisHighlightsSection'
import DiagnosisServicesSection from './components/DiagnosisServicesSection'
import DiagnosisProcessSection from './components/DiagnosisProcessSection'
import DiagnosisFaqSection from './components/DiagnosisFaqSection'
import HelpContactSection from '../../home/components/HelpContactSection'

export default function DiagnosisView() {
  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* 1. Hero Section with diagnosis.png */}
      <DiagnosisHero />

      {/* 2. Diagnosis Highlights (S-Curve Notched Cards) */}
      <DiagnosisHighlightsSection />

      {/* 3. Diagnostic Services (8-Card Grid: Image + Text, No Buttons) */}
      <DiagnosisServicesSection />

      {/* 4. Test Journey Process (A Simple & Convenient Process) */}
      <DiagnosisProcessSection />

      {/* 5. Diagnosis FAQ Section (Accordion) */}
      <DiagnosisFaqSection />

      {/* 6. We're Here to Help (Inquiry Form & Location Map) */}
      <HelpContactSection />
    </div>
  )
}
