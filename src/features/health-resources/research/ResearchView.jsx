import SpecialtyHero from '../../speciality/common/SpecialtyHero'
import ResearchPapersSection from './components/ResearchPapersSection'

export default function ResearchView() {
  return (
    <div className="w-full bg-slate-950 text-white min-h-screen font-sans">
      {/* 1. Hero Section ("hero section is perfect") */}
      <SpecialtyHero
        pageKey="research"
        titlePrefixEn="Research &"
        titleHighlightEn="Articles"
        titlePrefixHi="रिसर्च एवं"
        titleHighlightHi="आर्टिकल्स"
        altTextEn="Clinical Research & Articles at Ejaz Hospital"
        altTextHi="एजाज हॉस्पिटल में क्लीनिकल रिसर्च एवं आर्टिकल्स"
      />

      {/* 2. Simple Research Papers Section: PDF preview -> Title -> Little Description -> Click opens in new page */}
      <ResearchPapersSection />
    </div>
  )
}
