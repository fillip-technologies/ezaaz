import { useTranslation } from 'react-i18next'
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { useBlogs } from '../useBlogs'
import { useDoctors, findBlogAuthor } from '../../../doctors/useDoctors'

export default function SuggestedBlogsSection({ currentBlogId, onSelectBlog }) {
  const { i18n } = useTranslation('home')
  const isHindi = i18n?.language === 'hi'
  const { doctors } = useDoctors()
  const { posts } = useBlogs()

  // Latest other articles (posts are newest first)
  const suggestedBlogs = posts.filter((b) => b.slug !== currentBlogId).slice(0, 3)
  if (suggestedBlogs.length === 0) return null

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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToAllBlogs = (e) => {
    if (e) e.preventDefault()
    const url = '/services/blogs'
    if (window.history?.pushState) {
      window.history.pushState(null, '', url)
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
      window.dispatchEvent(new CustomEvent('app-route-change', { detail: url }))
    } else {
      window.location.href = url
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <section className="w-full bg-[#f1f5f9] py-14 sm:py-20 border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#ea580c] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHindi ? 'अनुशंसित लेख' : 'Recommended Reads'}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#003a70] tracking-tight">
              {isHindi ? 'सुझाए गए स्वास्थ्य ब्लॉग' : 'Suggested Medical Blogs'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isHindi
                ? 'हमारे अन्य विशेषज्ञ डॉक्टरों द्वारा लिखित उपयोगी स्वास्थ्य सलाह पढ़ें।'
                : 'Explore more clinical guides and wellness articles authored by our specialist faculty.'}
            </p>
          </div>

          <button
            type="button"
            onClick={navigateToAllBlogs}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#003a70] hover:text-[#ea580c] transition-colors cursor-pointer group shrink-0"
          >
            <span>{isHindi ? 'सभी ब्लॉग देखें' : 'View All Blogs'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {suggestedBlogs.map((blog) => {
            const title = isHindi ? blog.titleHi : blog.title
            const excerpt = isHindi ? blog.excerptHi : blog.excerpt
            const category = isHindi ? blog.categoryHi : blog.category
            const date = isHindi ? blog.dateHi : blog.date
            const readTime = isHindi ? blog.readTimeHi : blog.readTime

            return (
              <div
                key={blog.id}
                onClick={() => handleCardClick(blog.id)}
                className="group bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-[#003a70]/90 text-white shadow-2xs">
                      {category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#003a70] group-hover:text-[#ea580c] transition-colors line-clamp-2 mb-2 leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {excerpt}
                    </p>
                  </div>

                  {/* Read More CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCardClick(blog.id)
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ea580c] hover:text-[#c44322] cursor-pointer group/btn"
                    >
                      <span>{isHindi ? 'पूरा लेख पढ़ें' : 'Read More'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <span className="text-[11px] text-slate-400 font-medium">
                      {findBlogAuthor(doctors, blog.authorDoctor, isHindi)?.name}
                    </span>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
