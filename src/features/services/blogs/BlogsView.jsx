import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import BlogsHero from './components/BlogsHero'
import BlogsGrid from './components/BlogsGrid'
import { useBlogs } from './useBlogs'
import { useDoctors } from '../../doctors/useDoctors'

export default function BlogsView() {
  const { i18n } = useTranslation('home')
  const isHindi = i18n?.language === 'hi'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  // Articles and categories are managed in the admin panel
  const { posts, categories, loading, error } = useBlogs()
  const { doctors } = useDoctors()

  const categoryTabs = useMemo(
    () => [
      { id: 'all', label: 'All Articles', labelHi: 'सभी लेख' },
      ...categories.map((c) => ({ id: c.slug, label: c.name.en, labelHi: c.name.hi || c.name.en })),
    ],
    [categories],
  )

  const filteredBlogs = useMemo(() => {
    let list = posts

    if (selectedCategory !== 'all') {
      list = list.filter((b) => b.categoryId === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter((b) => {
        const author = doctors.find((d) => d._id === b.authorDoctor)?.name
        return (
          b.title?.toLowerCase().includes(q) ||
          b.titleHi?.toLowerCase().includes(q) ||
          b.excerpt?.toLowerCase().includes(q) ||
          b.excerptHi?.toLowerCase().includes(q) ||
          author?.en?.toLowerCase().includes(q) ||
          author?.hi?.toLowerCase().includes(q) ||
          b.category?.toLowerCase().includes(q) ||
          b.tags?.some((t) => t.toLowerCase().includes(q))
        )
      })
    }

    return list
  }, [posts, searchQuery, selectedCategory, doctors])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
  }

  return (
    <div className="w-full min-h-screen bg-[#f8f9fc]">
      {/* Hero with live Search & Category tabs */}
      <BlogsHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categoryTabs}
      />

      {/* Grid of All Blog Cards */}
      {loading ? (
        <section className="w-full bg-[#f8f9fc] py-10 sm:py-14" aria-busy="true">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-96 rounded-2xl sm:rounded-3xl bg-slate-200/60 animate-pulse" />
            ))}
          </div>
        </section>
      ) : posts.length === 0 ? (
        <section className="w-full bg-[#f8f9fc] py-16 sm:py-24">
          <p className="max-w-md mx-auto text-center px-4 text-sm text-slate-500">
            {error
              ? (isHindi ? 'लेख लोड नहीं हो सके। कृपया थोड़ी देर बाद पुनः प्रयास करें।' : "Articles couldn't be loaded. Please try again in a moment.")
              : (isHindi ? 'नए लेख जल्द ही उपलब्ध होंगे।' : 'New articles will be published soon.')}
          </p>
        </section>
      ) : (
        <BlogsGrid
          blogs={filteredBlogs}
          resetFilters={handleResetFilters}
        />
      )}
    </div>
  )
}
