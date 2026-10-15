import { useTranslation } from 'react-i18next'
import { Calendar, Clock, ArrowRight, User, BookOpen, AlertCircle } from 'lucide-react'

export default function BlogsGrid({ blogs = [], onSelectBlog, resetFilters }) {
  const { i18n } = useTranslation('home')
  const isHindi = i18n?.language === 'hi'

  const handleCardClick = (blogId) => {
    if (onSelectBlog) {
      onSelectBlog(blogId)
      return
    }
    const url = `/blog-details?id=${blogId}`
    if (window.history?.pushState) {
      window.history.pushState(null, '', url)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: url }))
    } else {
      window.location.href = url
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (blogs.length === 0) {
    return (
      <section className="w-full bg-[#f8f9fc] py-16 sm:py-24">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#ea580c] border border-orange-200 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {isHindi ? 'कोई ब्लॉग नहीं मिला' : 'No articles match your search'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            {isHindi
              ? 'कृपया कोई अन्य शब्द खोजें या फ़िल्टर रीसेट करें।'
              : 'Try adjusting your search terms or reset the category filters.'}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 px-6 py-2.5 rounded-full bg-[#ea580c] hover:bg-[#d9532f] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            {isHindi ? 'सभी ब्लॉग देखें' : 'View All Blogs'}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-[#f8f9fc] pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24 border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header Count */}
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/70 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#003a70] tracking-tight">
              {isHindi ? 'नवीनतम स्वास्थ्य एवं मेडिकल ब्लॉग' : 'All Medical & Health Articles'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isHindi
                ? `कुल ${blogs.length} लेख उपलब्ध हैं`
                : `Showing ${blogs.length} verified clinical and wellness guides`}
            </p>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {blogs.map((blog) => {
            const title = isHindi ? blog.titleHi : blog.title
            const excerpt = isHindi ? blog.excerptHi : blog.excerpt
            const category = isHindi ? blog.categoryHi : blog.category
            const date = isHindi ? blog.dateHi : blog.date
            const readTime = isHindi ? blog.readTimeHi : blog.readTime
            const author = isHindi ? blog.authorHi : blog.author

            return (
              <article
                key={blog.id}
                onClick={() => handleCardClick(blog.id)}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
              >
                {/* Top Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={blog.image}
                    alt={title}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Category Pill Tag Overlay */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#003a70]/90 backdrop-blur-md text-white shadow-xs">
                      {category}
                    </span>
                  </div>

                  {/* Read Time Tag Overlay */}
                  <div className="absolute bottom-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-black/60 backdrop-blur-xs text-white flex items-center gap-1 shadow-xs">
                      <Clock className="w-3 h-3 text-orange-400" />
                      <span>{readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta Info: Author & Date */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3 gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 font-medium text-slate-700">
                        {blog.authorPhoto ? (
                          <img
                            src={blog.authorPhoto}
                            alt={author}
                            className="w-5 h-5 rounded-full object-cover object-top border border-slate-200"
                          />
                        ) : (
                          <User className="w-3.5 h-3.5 text-[#ea580c]" />
                        )}
                        <span className="truncate max-w-[140px] sm:max-w-[160px] text-[11.5px] sm:text-xs font-semibold">
                          {author}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{date}</span>
                      </div>
                    </div>

                    {/* Blog Title */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#003a70] group-hover:text-[#ea580c] leading-snug tracking-tight transition-colors line-clamp-2 mb-2.5">
                      {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {excerpt}
                    </p>
                  </div>

                  {/* Card Bottom CTA: Read More Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCardClick(blog.id)
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 hover:bg-[#ea580c] text-[#ea580c] hover:text-white font-bold text-xs transition-all duration-200 group/btn cursor-pointer shadow-2xs"
                    >
                      <span>{isHindi ? 'पूरा लेख पढ़ें' : 'Read More'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                      Ejaz Clinical Guide
                    </span>
                  </div>

                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
