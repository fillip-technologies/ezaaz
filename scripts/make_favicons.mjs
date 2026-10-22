import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateAllFavicons() {
  const root = process.cwd();
  const sourceLogo = path.join(root, 'src', 'assets', 'Logo_white_text.png');
  const publicDir = path.join(root, 'public');

  if (!fs.existsSync(sourceLogo)) {
    throw new Error('Source logo not found at: ' + sourceLogo);
  }

  // 1. Direct copy of Logo_white_text.png
  fs.copyFileSync(sourceLogo, path.join(publicDir, 'Logo_white_text.png'));
  fs.copyFileSync(sourceLogo, path.join(publicDir, 'logo_white_text.png'));
  console.log('Copied Logo_white_text.png to public/');

  // 2. Generate crisp contained icons for standard favicon sizes
  const sizes = [16, 32, 48, 192, 512];
  for (const s of sizes) {
    await sharp(sourceLogo)
      .resize({
        width: s,
        height: s,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, `favicon-${s}x${s}.png`));
    console.log(`Generated favicon-${s}x${s}.png`);
  }

  // 3. Apple Touch Icon (180x180)
  await sharp(sourceLogo)
    .resize({
      width: 180,
      height: 180,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // 4. Standard favicon.png (128x128)
  await sharp(sourceLogo)
    .resize({
      width: 128,
      height: 128,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('Generated favicon.png');

  // 5. Multi-size ICO file (16x16, 32x32, 48x48)
  const b16 = await sharp(path.join(publicDir, 'favicon-16x16.png')).toBuffer();
  const b32 = await sharp(path.join(publicDir, 'favicon-32x32.png')).toBuffer();
  const b48 = await sharp(path.join(publicDir, 'favicon-48x48.png')).toBuffer();

  const entries = [
    { w: 16, h: 16, buf: b16 },
    { w: 32, h: 32, buf: b32 },
    { w: 48, h: 48, buf: b48 },
  ];

  let offset = 6 + entries.length * 16;
  const header = Buffer.alloc(6 + entries.length * 16);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(entries.length, 4);

  entries.forEach((e, idx) => {
    const o = 6 + idx * 16;
    header.writeUInt8(e.w, o);
    header.writeUInt8(e.h, o + 1);
    header.writeUInt8(0, o + 2); // palette
    header.writeUInt8(0, o + 3); // reserved
    header.writeUInt16LE(1, o + 4); // planes
    header.writeUInt16LE(32, o + 6); // bpp
    header.writeUInt32LE(e.buf.length, o + 8);
    header.writeUInt32LE(offset, o + 12);
    offset += e.buf.length;
  });

  const icoBuf = Buffer.concat([header, ...entries.map(e => e.buf)]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
  console.log('Generated favicon.ico');

  // 6. SVG fallback embedding Logo_white_text.png
  const base64 = fs.readFileSync(sourceLogo).toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 262 160" width="100%" height="100%">
  <!-- Ejaz Hospital Logo -->
  <image href="data:image/png;base64,${base64}" width="262" height="160" />
</svg>
`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf-8');
  console.log('Generated favicon.svg');

  console.log('All favicon variants created successfully!');
}

generateAllFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
