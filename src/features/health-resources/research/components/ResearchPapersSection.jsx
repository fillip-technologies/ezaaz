import { useTranslation } from 'react-i18next'
import { Download, ExternalLink } from 'lucide-react'
import { RESEARCH_PUBLICATIONS } from '../researchData'

export default function ResearchPapersSection() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'

  const handleDownload = (e, paper) => {
    e.preventDefault()
    e.stopPropagation()
    const link = document.createElement('a')
    link.href = paper.pdfUrl
    link.download = paper.downloadName || `${paper.id}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="relative w-full bg-[#f8f9fa] py-10 sm:py-14 lg:py-16">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Simple Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight">
              {isHindi ? (
                <>
                  प्रकाशित <span className="text-[#ea580c]">शोध पत्र एवं आर्टिकल्स</span>
                </>
              ) : (
                <>
                  Published <span className="text-[#ea580c]">Research Papers & Articles</span>
                </>
              )}
            </h2>
            <p className="mt-1.5 text-slate-600 text-xs sm:text-sm">
              {isHindi
                ? 'पूर्ण शोध पत्र नए पेज में पढ़ने के लिए किसी भी पीडीएफ कार्ड पर क्लिक करें:'
                : 'Click on any research paper below to open and read the full PDF document in a new page:'}
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto shrink-0 shadow-sm">
            {RESEARCH_PUBLICATIONS.length} {isHindi ? 'शोध पत्र' : 'Publications'}
          </span>
        </div>

        {/* 3-Column Compact & Attractive Cards Grid: PDF Preview -> Title -> Little Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {RESEARCH_PUBLICATIONS.map((paper) => {
            return (
              <a
                key={paper.id}
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={isHindi ? `${paper.title} - नए पेज में खोलें` : `Open ${paper.title} in new page`}
                className="group bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:border-orange-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* 1. Sleek Compact PDF Preview ("pdf little bit show" with NO scrollbars) */}
                  <div className="relative w-full h-36 sm:h-40 bg-slate-50 rounded-xl overflow-hidden border border-slate-200/80 shadow-sm group-hover:border-orange-300 transition-colors">
                    {/* Clipped iframe wrapper hiding native browser scrollbars */}
                    <div className="absolute inset-0 w-[calc(100%+24px)] h-[calc(100%+24px)] overflow-hidden pointer-events-none select-none">
                      <iframe
                        src={`${paper.pdfUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                        title={paper.title}
                        className="w-full h-full border-0 bg-white block"
                        loading="lazy"
                      />
                    </div>

                    {/* Clean fade gradient at the bottom for an authentic document peek */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />

                    {/* Centered Hover Pill */}
                    <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-3">
                      <span className="px-3 py-1.5 rounded-lg bg-white/95 text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200 backdrop-blur-sm">
                        <ExternalLink className="w-3.5 h-3.5 text-[#ea580c]" />
                        <span>{isHindi ? 'नए पेज में खोलें' : 'Open in New Page'}</span>
                      </span>
                    </div>
                  </div>

                  {/* 2. Title */}
                  <h3 className="mt-3 text-[14.5px] sm:text-[15.5px] font-bold text-slate-900 tracking-tight group-hover:text-[#ea580c] transition-colors duration-200 leading-snug line-clamp-2">
                    {isHindi && paper.titleHi ? paper.titleHi : paper.title}
                  </h3>

                  {/* 3. Little Description */}
                  <p className="mt-1.5 text-slate-500 text-xs leading-relaxed line-clamp-2">
                    {isHindi && paper.abstractHi ? paper.abstractHi : paper.abstract}
                  </p>
                </div>

                {/* 4. Compact Bottom Action Row */}
                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ea580c]">
                    <span>{isHindi ? 'पीडीएफ खोलें' : 'Read PDF'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>

                  <button
                    onClick={(e) => handleDownload(e, paper)}
                    title={isHindi ? 'पीडीएफ डाउनलोड करें' : 'Download PDF'}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-[#ea580c] hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>{isHindi ? 'डाउनलोड' : 'Download'}</span>
                  </button>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
