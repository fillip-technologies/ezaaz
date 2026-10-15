import { useEffect, useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import { adminBlogCategoriesApi, adminBlogsApi, adminDoctorsApi } from '../../../api'
import AdminLayout from '../components/AdminLayout'
import { Alert, Button, Field, Link, Spinner, Switch } from '../components/ui'
import { ImagePicker, LocalizedField, LocalizedListEditor, ReorderButtons, Section } from '../components/formParts'
import { blogStatus, fromDateInput, toDateInput } from '../blogOptions'
import { ADMIN_PATHS, navigate, setFlash } from '../navigation'

const MAX_COVER_MB = 5
const emptyLocalized = () => ({ en: '', hi: '' })
const emptySection = () => ({ heading: emptyLocalized(), content: emptyLocalized(), callout: emptyLocalized(), bullets: [] })

const EMPTY_FORM = {
  title: emptyLocalized(),
  slug: '',
  excerpt: emptyLocalized(),
  category: '',
  authorDoctor: '',
  publishedAt: toDateInput(),
  readTimeMinutes: '',
  status: 'draft',
  isFeatured: false,
  tags: '',
  keyHighlights: [],
  sections: [emptySection()],
}

const slugify = (text) =>
  text.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100)

const L = (v) => ({ en: v?.en || '', hi: v?.hi || '' })
const trimL = (v) => ({ en: v.en.trim(), hi: v.hi.trim() })

// API document -> form state
function toForm(blog) {
  return {
    title: L(blog.title),
    slug: blog.slug,
    excerpt: L(blog.excerpt),
    category: blog.category?._id || blog.category || '',
    authorDoctor: blog.authorDoctor || '',
    publishedAt: toDateInput(blog.publishedAt),
    readTimeMinutes: blog.readTimeMinutes ? String(blog.readTimeMinutes) : '',
    status: blog.status,
    isFeatured: blog.isFeatured,
    tags: (blog.tags || []).join(', '),
    keyHighlights: (blog.keyHighlights || []).map(L),
    sections: (blog.sections || []).map((s) => ({
      heading: L(s.heading),
      content: L(s.content),
      callout: L(s.callout),
      bullets: (s.bullets || []).map(L),
    })),
  }
}

// Form state -> API payload (empty rows/sections are dropped)
function toPayload(form) {
  const payload = {
    title: trimL(form.title),
    excerpt: trimL(form.excerpt),
    category: form.category,
    authorDoctor: form.authorDoctor || null,
    publishedAt: fromDateInput(form.publishedAt),
    readTimeMinutes: form.readTimeMinutes === '' ? null : Number(form.readTimeMinutes),
    status: form.status,
    isFeatured: form.isFeatured,
    tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    keyHighlights: form.keyHighlights.map(trimL).filter((h) => h.en),
    sections: form.sections
      .map((s) => ({
        heading: trimL(s.heading),
        content: trimL(s.content),
        callout: trimL(s.callout),
        bullets: s.bullets.map(trimL).filter((b) => b.en),
      }))
      .filter((s) => s.heading.en || s.content.en || s.callout.en || s.bullets.length),
  }
  if (form.slug.trim()) payload.slug = form.slug.trim()
  return payload
}

function validate(form) {
  const errors = {}
  if (!form.title.en.trim()) errors['title.en'] = 'Title is required'
  if (!form.category) errors.category = 'Choose a category'
  if (form.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug.trim())) errors.slug = 'Use lowercase letters, numbers and hyphens only'
  const minutes = Number(form.readTimeMinutes)
  if (form.readTimeMinutes !== '' && (!Number.isInteger(minutes) || minutes < 1 || minutes > 120)) {
    errors.readTimeMinutes = 'Enter whole minutes between 1 and 120'
  }
  if (!form.publishedAt) errors.publishedAt = 'Choose a date'
  return errors
}

export default function BlogFormView({ path, id }) {
  const isEdit = Boolean(id)

  const [form, setForm] = useState(EMPTY_FORM)
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [cover, setCover] = useState({ current: '', file: null, remove: false })
  const [categories, setCategories] = useState([])
  const [doctors, setDoctors] = useState([])
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all([adminBlogCategoriesApi.list(), adminDoctorsApi.list(), isEdit ? adminBlogsApi.get(id) : null])
      .then(([cats, docs, blog]) => {
        if (cancelled) return
        setCategories(cats)
        setDoctors(docs)
        if (blog) {
          setForm(toForm(blog))
          setCover({ current: blog.coverImage || '', file: null, remove: false })
        } else if (cats.length) {
          setForm((f) => ({ ...f, category: f.category || cats[0]._id }))
        }
      })
      .catch((err) => !cancelled && setLoadError(err.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [id, isEdit])

  const clearError = (key) => setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))

  const setValue = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    clearError(key)
  }

  const setLocalized = (key, lang, value) => {
    setForm((f) => {
      const next = { ...f, [key]: { ...f[key], [lang]: value } }
      // Keep the URL slug in sync with the English title until the admin edits it
      if (key === 'title' && lang === 'en' && !slugTouched) next.slug = slugify(value)
      return next
    })
    clearError(`${key}.${lang}`)
  }

  const updateSection = (index, changes) =>
    setForm((f) => ({ ...f, sections: f.sections.map((s, i) => (i === index ? { ...s, ...changes } : s)) }))
  const moveSection = (from, to) =>
    setForm((f) => {
      const sections = [...f.sections]
      const [moved] = sections.splice(from, 1)
      sections.splice(to, 0, moved)
      return { ...f, sections }
    })
  const removeSection = (index) => setForm((f) => ({ ...f, sections: f.sections.filter((_, i) => i !== index) }))

  const onSubmit = async (e) => {
    e.preventDefault()
    const clientErrors = validate(form)
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors)
      setStatus({ type: 'error', message: 'Please fix the highlighted fields.' })
      return
    }

    setSaving(true)
    setStatus({ type: '', message: '' })
    let saved
    try {
      saved = isEdit ? await adminBlogsApi.update(id, toPayload(form)) : await adminBlogsApi.create(toPayload(form))
    } catch (err) {
      if (err.details?.length) setErrors(Object.fromEntries(err.details.map((d) => [d.field, d.message])))
      setStatus({ type: 'error', message: err.message })
      setSaving(false)
      return
    }

    // The article is saved at this point; a cover problem shouldn't lose the rest
    let coverError = ''
    try {
      if (cover.file) saved = await adminBlogsApi.uploadCover(saved._id, cover.file)
      else if (cover.remove && cover.current) saved = await adminBlogsApi.removeCover(saved._id)
    } catch (err) {
      coverError = err.message
    }

    const where = blogStatus(saved).key === 'published' ? 'It is live on the website.' : `It is saved as ${blogStatus(saved).label.toLowerCase()}.`
    if (!isEdit) {
      setFlash(
        coverError
          ? `"${saved.title.en}" was created, but the cover image wasn't saved: ${coverError}`
          : `"${saved.title.en}" was created. ${where}`,
      )
      navigate(ADMIN_PATHS.blogs, { replace: true })
      return
    }

    setForm(toForm(saved))
    setCover({ current: saved.coverImage || '', file: null, remove: false })
    setErrors({})
    setStatus(
      coverError
        ? { type: 'error', message: `Article saved, but the cover image wasn't: ${coverError}` }
        : { type: 'success', message: `Changes saved. ${where}` },
    )
    setSaving(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const title = isEdit ? 'Edit article' : 'New article'

  return (
    <AdminLayout
      path={path}
      title={title}
      actions={
        <Link
          to={ADMIN_PATHS.blogs}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">All articles</span>
        </Link>
      }
    >
      {loading ? (
        <Spinner label="Loading article…" />
      ) : loadError ? (
        <div className="max-w-xl space-y-4">
          <Alert>{loadError}</Alert>
          <Link to={ADMIN_PATHS.blogs} className="text-sm font-medium text-[#0091da] hover:underline">
            Back to all articles
          </Link>
        </div>
      ) : categories.length === 0 ? (
        <div className="max-w-xl space-y-4">
          <Alert>Create at least one blog category before writing an article.</Alert>
          <Link to={ADMIN_PATHS.blogCategories} className="text-sm font-medium text-[#0091da] hover:underline">
            Manage categories
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mx-auto max-w-5xl space-y-6 pb-24">
          <Alert type={status.type || 'error'}>{status.message}</Alert>

          <Section title="Publishing">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field as="select" label="Status" value={form.status} onChange={(e) => setValue('status', e.target.value)}>
                <option value="draft">Draft (not on website)</option>
                <option value="published">Published</option>
              </Field>
              <Field
                label="Publish date"
                type="date"
                value={form.publishedAt}
                onChange={(e) => setValue('publishedAt', e.target.value)}
                error={errors.publishedAt}
                hint="A future date schedules the article"
              />
              <Field
                label="Read time (minutes)"
                type="number"
                min="1"
                max="120"
                inputMode="numeric"
                value={form.readTimeMinutes}
                onChange={(e) => setValue('readTimeMinutes', e.target.value)}
                error={errors.readTimeMinutes}
                hint="Leave empty to calculate automatically"
              />
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
              <Switch checked={form.isFeatured} onChange={(v) => setValue('isFeatured', v)} label="Feature on the home page" />
              <div>
                <p className="text-sm font-medium text-slate-900">Feature on the home page</p>
                <p className="text-xs text-slate-500">Featured articles appear first in the home page's Latest News.</p>
              </div>
            </div>
          </Section>

          <Section title="Cover image" description={`Landscape works best (16:10). JPG, PNG or WebP, up to ${MAX_COVER_MB} MB.`}>
            <ImagePicker
              image={cover}
              onChange={setCover}
              onError={(message) => setStatus({ type: message ? 'error' : '', message })}
              maxMb={MAX_COVER_MB}
              noun="cover image"
              previewClassName="aspect-[16/10] w-56 rounded-xl border border-slate-200 bg-slate-100 object-cover"
            />
          </Section>

          <Section title="Article details">
            <LocalizedField
              label="Title"
              value={form.title}
              onChange={(lang, v) => setLocalized('title', lang, v)}
              errors={errors}
              errorKey="title"
              required
            />
            <Field
              label="Article URL"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true)
                setValue('slug', e.target.value.toLowerCase())
              }}
              error={errors.slug}
              hint={form.slug ? `/blog-details?id=${form.slug}` : 'Generated from the English title'}
            />
            <LocalizedField
              label="Summary"
              value={form.excerpt}
              onChange={(lang, v) => setLocalized('excerpt', lang, v)}
              errors={errors}
              errorKey="excerpt"
              as="textarea"
              rows={3}
              hint="Shown on blog cards and the home page"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Field
                  as="select"
                  label="Category *"
                  value={form.category}
                  onChange={(e) => setValue('category', e.target.value)}
                  error={errors.category}
                >
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name.en}</option>
                  ))}
                </Field>
                <Link to={ADMIN_PATHS.blogCategories} className="mt-1.5 inline-block text-xs font-medium text-[#0091da] hover:underline">
                  Manage categories
                </Link>
              </div>
              <Field
                as="select"
                label="Author (doctor)"
                value={form.authorDoctor}
                onChange={(e) => setValue('authorDoctor', e.target.value)}
                error={errors.authorDoctor}
                hint="Shows the doctor's photo, name and a booking button on the article"
              >
                <option value="">No author</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name.en}{d.isActive ? '' : ' (hidden on website)'}
                  </option>
                ))}
              </Field>
            </div>
            <Field
              label="Tags"
              value={form.tags}
              onChange={(e) => setValue('tags', e.target.value)}
              placeholder="Laparoscopy, Hernia Repair, Gallbladder"
              hint="Separate tags with commas"
            />
          </Section>

          <Section title="Key takeaways" description="Shown in a highlighted box at the top of the article.">
            <LocalizedListEditor
              items={form.keyHighlights}
              onChange={(items) => setValue('keyHighlights', items)}
              itemLabel="Takeaway"
              addLabel="Add takeaway"
              emptyText="No takeaways added."
              max={12}
            />
          </Section>

          <Section
            title="Article content"
            description="Write in plain text. Blank lines start a new paragraph."
          >
            {form.sections.length === 0 && <p className="text-sm text-slate-500">No sections yet.</p>}
            {form.sections.map((section, index) => (
              <div key={index} className="space-y-4 rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-700">Section {index + 1}</p>
                  <ReorderButtons
                    index={index}
                    count={form.sections.length}
                    onMove={moveSection}
                    onRemove={removeSection}
                    label={`section ${index + 1}`}
                  />
                </div>
                <LocalizedField
                  label="Heading"
                  value={section.heading}
                  onChange={(lang, v) => updateSection(index, { heading: { ...section.heading, [lang]: v } })}
                  errors={errors}
                  errorKey={`sections.${index}.heading`}
                />
                <LocalizedField
                  label="Text"
                  value={section.content}
                  onChange={(lang, v) => updateSection(index, { content: { ...section.content, [lang]: v } })}
                  errors={errors}
                  errorKey={`sections.${index}.content`}
                  as="textarea"
                  rows={7}
                />
                <LocalizedField
                  label="Highlighted quote (optional)"
                  value={section.callout}
                  onChange={(lang, v) => updateSection(index, { callout: { ...section.callout, [lang]: v } })}
                  errors={errors}
                  errorKey={`sections.${index}.callout`}
                  as="textarea"
                  rows={2}
                />
                <div>
                  <p className="mb-2 text-sm font-medium text-slate-700">Bullet points (optional)</p>
                  <LocalizedListEditor
                    items={section.bullets}
                    onChange={(bullets) => updateSection(index, { bullets })}
                    itemLabel={`Section ${index + 1} bullet`}
                    addLabel="Add bullet"
                    max={20}
                  />
                </div>
              </div>
            ))}
            {form.sections.length < 30 && (
              <Button variant="secondary" onClick={() => setValue('sections', [...form.sections, emptySection()])}>
                <Plus className="h-4 w-4" aria-hidden="true" /> Add section
              </Button>
            )}
          </Section>

          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:left-64">
            <div className="mx-auto flex max-w-5xl items-center justify-end gap-3">
              <Button variant="secondary" onClick={() => navigate(ADMIN_PATHS.blogs)}>
                Cancel
              </Button>
              <Button type="submit" loading={saving}>
                {isEdit ? 'Save changes' : form.status === 'published' ? 'Publish article' : 'Save draft'}
              </Button>
            </div>
          </div>
        </form>
      )}
    </AdminLayout>
  )
}
