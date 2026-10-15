import { useState, useMemo } from 'react'
import BlogsHero from './components/BlogsHero'
import BlogsGrid from './components/BlogsGrid'
import { BLOGS_DATABASE, BLOG_CATEGORIES } from './data/blogsData'

export default function BlogsView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredBlogs = useMemo(() => {
    let list = BLOGS_DATABASE

    if (selectedCategory !== 'all') {
      list = list.filter((b) => b.categoryId === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter((b) => {
        return (
          b.title?.toLowerCase().includes(q) ||
          b.titleHi?.toLowerCase().includes(q) ||
          b.excerpt?.toLowerCase().includes(q) ||
          b.excerptHi?.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q) ||
          b.authorHi?.toLowerCase().includes(q) ||
          b.category?.toLowerCase().includes(q) ||
          b.tags?.some((t) => t.toLowerCase().includes(q))
        )
      })
    }

    return list
  }, [searchQuery, selectedCategory])

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
        categories={BLOG_CATEGORIES}
      />

      {/* Grid of All Blog Cards */}
      <BlogsGrid
        blogs={filteredBlogs}
        resetFilters={handleResetFilters}
      />
    </div>
  )
}
