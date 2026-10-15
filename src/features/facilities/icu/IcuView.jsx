import IcuHero from './components/IcuHero'
import IcuHighlightsSection from './components/IcuHighlightsSection'
import IcuServicesSection from './components/IcuServicesSection'
import IcuProcessSection from './components/IcuProcessSection'
import IcuFaqSection from './components/IcuFaqSection'
import HelpContactSection from '../../home/components/HelpContactSection'

export default function IcuView() {
  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* 1. Hero Section with icu-videos.mp4 */}
      <IcuHero />

      {/* 2. ICU Highlights (S-Curve Notched Cards) */}
      <IcuHighlightsSection />

      {/* 3. ICU Specialized Services (Stacked Horizontal Ribbon Cards) */}
      <IcuServicesSection />

      {/* 4. ICU Care Journey (A Simple & Supportive Process) */}
      <IcuProcessSection />

      {/* 5. ICU FAQ Section (Accordion) */}
      <IcuFaqSection />

      {/* 6. We're Here to Help (Inquiry Form & Location Map) */}
      <HelpContactSection />
    </div>
  )
}
