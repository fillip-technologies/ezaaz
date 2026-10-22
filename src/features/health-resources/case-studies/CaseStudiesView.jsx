import SpecialtyHero from '../../speciality/common/SpecialtyHero'
import CaseStudiesSection from './components/CaseStudiesSection'
import researchHeroImg from '../../../assets/research/research-hero.png'

export default function CaseStudiesView() {
  return (
    <div className="w-full bg-slate-950 text-white min-h-screen font-sans">
      {/* 1. Hero Section using the same hero image as requested */}
      <SpecialtyHero
        image={researchHeroImg}
        titlePrefixEn="Case"
        titleHighlightEn="Studies"
        titlePrefixHi="केस"
        titleHighlightHi="स्टडीज"
        altTextEn="Clinical Case Studies at Ejaz Hospital"
        altTextHi="एजाज हॉस्पिटल में क्लीनिकल केस स्टडीज"
      />

      {/* 2. Compact & Attractive Case Studies Section */}
      <CaseStudiesSection />
    </div>
  )
}
