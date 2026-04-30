import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';

const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
const MAX_WIDTH = 1920;

async function optimizeOne(imagePath) {
  const originalSize = fs.statSync(imagePath).size;

  const meta = await sharp(imagePath).metadata();
  const needsResize = meta.width && meta.width > MAX_WIDTH;

  const pipeline = (input) => {
    let p = sharp(input, { failOn: 'none' });
    if (needsResize) {
      p = p.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    return p;
  };

  const jpegTmp = imagePath + '.tmp';
  await pipeline(imagePath)
    .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
    .toFile(jpegTmp);
  fs.renameSync(jpegTmp, imagePath);
  const jpegSize = fs.statSync(imagePath).size;

  const webpPath = imagePath.replace(/\.(jpe?g)$/i, '.webp');
  await pipeline(imagePath)
    .webp({ quality: WEBP_QUALITY })
    .toFile(webpPath);
  const webpSize = fs.statSync(webpPath).size;

  return {
    name: path.relative('public', imagePath),
    originalSize,
    jpegSize,
    webpSize,
    resized: needsResize,
    width: needsResize ? MAX_WIDTH : meta.width,
  };
}

async function main() {
  console.log('🔍 Finding images...\n');
  const images = await glob('public/**/*.{jpg,jpeg,JPG,JPEG}');
  console.log(`📦 Found ${images.length} JPGs (will produce JPG + WebP for each)\n`);

  let totalOriginal = 0;
  let totalJpeg = 0;
  let totalWebp = 0;

  for (const img of images) {
    try {
      const r = await optimizeOne(img);
      totalOriginal += r.originalSize;
      totalJpeg += r.jpegSize;
      totalWebp += r.webpSize;

      const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
      const flag = r.resized ? ` ↓${MAX_WIDTH}px` : '';
      console.log(
        `✓ ${r.name}${flag}: ${kb(r.originalSize)} → jpg ${kb(r.jpegSize)} / webp ${kb(r.webpSize)}`
      );
    } catch (err) {
      console.error(`✗ Failed: ${img} — ${err.message}`);
    }
  }

  const mb = (n) => (n / 1024 / 1024).toFixed(2);
  console.log('\n' + '='.repeat(64));
  console.log(`📊 Originals: ${mb(totalOriginal)} MB`);
  console.log(`📊 JPGs now:  ${mb(totalJpeg)} MB  (${((1 - totalJpeg / totalOriginal) * 100).toFixed(1)}% saved)`);
  console.log(`📊 WebPs now: ${mb(totalWebp)} MB  (${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}% vs original JPG)`);
  console.log('='.repeat(64));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
