import AboutHero from './components/AboutHero'
import AboutUsSection from './components/AboutUsSection'
import FounderSection from './components/FounderSection'
import MissionVisionSection from './components/MissionVisionSection'
import AboutFaqSection from './components/AboutFaqSection'
import HelpContactSection from '../home/components/HelpContactSection'

export default function AboutView() {
  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. About Us Narrative & Hospital Statistics */}
      <AboutUsSection />

      {/* 3. Director & Leadership Section (Dr. Shahzad Marghoob Ali, MD - Left Image, Right Narrative) */}
      <FounderSection />

      {/* 4. Mission, Vision & Values (3-Tier Reference Layout) */}
      <MissionVisionSection />

      {/* 5. 5 Frequently Asked Questions (FAQ Accordion) */}
      <AboutFaqSection />

      {/* 6. We're Here to Help (Inquiry Form & Hospital Map) */}
      <HelpContactSection />
    </div>
  )
}
