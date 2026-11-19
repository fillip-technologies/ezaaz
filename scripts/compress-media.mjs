// Compress images in src/assets in place (same filenames/formats), backing originals up to media-originals/.
// Usage: node scripts/compress-media.mjs
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'src', 'assets')
const BACKUP = path.join(ROOT, 'media-originals')
const MAX = 1920
const JPEG_Q = 78

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else yield p
  }
}

const mb = (b) => (b / 1048576).toFixed(2)
let before = 0, after = 0, count = 0
const rows = []

for await (const file of walk(SRC)) {
  const ext = path.extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue
  const rel = path.relative(SRC, file)
  const backup = path.join(BACKUP, rel)
  // Always compress from the original so re-running doesn't degrade quality further
  try { await fs.access(backup) } catch {
    await fs.mkdir(path.dirname(backup), { recursive: true })
    await fs.copyFile(file, backup)
  }
  const input = await fs.readFile(backup)
  let pipe = sharp(input).rotate().resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
  pipe = ext === '.png'
    ? pipe.png({ compressionLevel: 9, effort: 10, palette: true, quality: 90, dither: 1 })
    : pipe.jpeg({ quality: JPEG_Q, mozjpeg: true, progressive: true })
  const out = await pipe.toBuffer()
  // Never make a file bigger than the original
  const final = out.length < input.length ? out : input
  await fs.writeFile(file, final)
  before += input.length; after += final.length; count++
  rows.push([rel, input.length, final.length])
}

rows.sort((a, b) => b[1] - a[1])
for (const [rel, b, a] of rows.slice(0, 15)) console.log(`${mb(b).padStart(7)} MB -> ${mb(a).padStart(6)} MB  ${rel}`)
console.log(`\n${count} images: ${mb(before)} MB -> ${mb(after)} MB (${(100 - (after / before) * 100).toFixed(1)}% smaller)`)
