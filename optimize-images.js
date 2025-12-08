const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function optimizeImages() {
  console.log('🔍 Finding images...\n');

  // Find all JPG/JPEG files in public directory
  const images = await glob('public/**/*.{jpg,jpeg,JPG,JPEG}');

  console.log(`📦 Found ${images.length} images to optimize\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const imagePath of images) {
    try {
      const originalStats = fs.statSync(imagePath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;

      // Create optimized version in temp location
      const tempPath = imagePath + '.tmp';

      await sharp(imagePath)
        .jpeg({
          quality: 80,
          progressive: true,
          mozjpeg: true
        })
        .toFile(tempPath);

      const optimizedStats = fs.statSync(tempPath);
      const optimizedSize = optimizedStats.size;
      totalOptimizedSize += optimizedSize;

      // Replace original with optimized
      fs.renameSync(tempPath, imagePath);

      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      console.log(`✓ ${path.basename(imagePath)}: ${(originalSize / 1024).toFixed(0)} KB → ${(optimizedSize / 1024).toFixed(0)} KB (${savings}% smaller)`);

    } catch (err) {
      console.error(`✗ Failed: ${imagePath}`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`📊 Total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB → ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Saved: ${(totalOriginalSize / 1024 / 1024 - totalOptimizedSize / 1024 / 1024).toFixed(2)} MB (${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%)`);
  console.log('='.repeat(60));
}

optimizeImages().catch(console.error);
