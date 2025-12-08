# Image Optimization Guide

## 🚨 Current Issue
Lighthouse detected **1,759 KiB** (1.7MB) of potential savings from image optimization.

## 📊 Images Needing Optimization

### Critical (Largest Files):
| File | Current Size | Target Size | Priority |
|------|--------------|-------------|----------|
| `header.jpeg` | 1.6 MB | ~200 KB | 🔴 URGENT |
| `intro/intro-4.jpg` | 892 KB | ~150 KB | 🔴 URGENT |
| `intro/intro-2.jpg` | 836 KB | ~150 KB | 🔴 URGENT |
| `intro/intro-5.jpg` | 492 KB | ~100 KB | 🔴 URGENT |
| `bozo.jpg` | 324 KB | ~80 KB | 🟡 HIGH |
| `maison-des-bozos-landing.jpg` | 268 KB | ~80 KB | 🟡 HIGH |

### All Other Images:
- Concert images: ~80-192 KB each → Target: ~50-80 KB
- Museum images: ~84-176 KB each → Target: ~50-80 KB
- Intro images: ~20-88 KB → Target: ~30-50 KB

**Total Potential Savings: ~3-4 MB → ~800 KB = 75% reduction**

---

## 🎯 Quick Fix: Automated Optimization

### Option 1: Use ImageOptim (Mac - Easiest)
1. Download [ImageOptim](https://imageoptim.com/)
2. Drag `/public/` folder into ImageOptim
3. It will compress all images automatically
4. **Expected savings: 60-70%**

### Option 2: Use Squoosh CLI (Cross-platform)
```bash
# Install
npm install -g @squoosh/cli

# Optimize all JPEGs
npx @squoosh/cli --mozjpeg '{quality:80}' public/**/*.jpg
npx @squoosh/cli --mozjpeg '{quality:80}' public/**/*.jpeg

# Optimize PNGs
npx @squoosh/cli --oxipng '{level:3}' public/**/*.png
```

### Option 3: Manual with Sharp (Node.js)
Create `optimize-images.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function optimizeImages() {
  const images = glob.sync('public/**/*.{jpg,jpeg,png}');

  for (const image of images) {
    const ext = path.extname(image);
    const isJpeg = ['.jpg', '.jpeg'].includes(ext.toLowerCase());

    try {
      if (isJpeg) {
        await sharp(image)
          .jpeg({ quality: 80, progressive: true, mozjpeg: true })
          .toFile(image.replace(ext, '_optimized' + ext));
      } else {
        await sharp(image)
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(image.replace(ext, '_optimized' + ext));
      }
      console.log(`✓ Optimized: ${image}`);
    } catch (err) {
      console.error(`✗ Failed: ${image}`, err);
    }
  }
}

optimizeImages();
```

Then run:
```bash
npm install sharp glob
node optimize-images.js
```

---

## 🌐 Advanced: Convert to WebP

WebP format offers **25-35% better compression** than JPEG.

### Bulk Convert to WebP:
```bash
# Install cwebp (if not installed)
# Mac: brew install webp
# Ubuntu: sudo apt install webp

# Convert all JPEGs
find public -name "*.jpg" -exec sh -c 'cwebp -q 80 "$1" -o "${1%.jpg}.webp"' _ {} \;
find public -name "*.jpeg" -exec sh -c 'cwebp -q 80 "$1" -o "${1%.jpeg}.webp"' _ {} \;
```

### Using Sharp (Better):
```javascript
const sharp = require('sharp');
const glob = require('glob');

async function convertToWebP() {
  const images = glob.sync('public/**/*.{jpg,jpeg}');

  for (const image of images) {
    const webpPath = image.replace(/\.(jpg|jpeg)$/, '.webp');

    await sharp(image)
      .webp({ quality: 80 })
      .toFile(webpPath);

    console.log(`✓ Created: ${webpPath}`);
  }
}

convertToWebP();
```

---

## 📐 Resize Large Images

Many images are too large for web display. Target dimensions:

| Type | Max Width | Max Height | Use Case |
|------|-----------|------------|----------|
| Hero/Landing | 1920px | 1080px | Full screen |
| Gallery | 1200px | 800px | Carousel |
| Thumbnails | 600px | 400px | Cards |

### Resize with Sharp:
```bash
# For hero images (1920x1080)
sharp input.jpg -o output.jpg resize 1920 1080 --fit cover

# For gallery images (1200x800)
sharp input.jpg -o output.jpg resize 1200 800 --fit cover
```

---

## 🚀 Implement Picture Element (Best Practice)

After optimizing, use modern formats with fallbacks:

```tsx
<picture>
  <source
    srcSet="/intro/intro-1.webp"
    type="image/webp"
  />
  <source
    srcSet="/intro/intro-1.jpg"
    type="image/jpeg"
  />
  <img
    src="/intro/intro-1.jpg"
    alt="Description"
    loading="lazy"
    decoding="async"
  />
</picture>
```

---

## 📱 Responsive Images

Serve different sizes for different screens:

```tsx
<img
  src="/image-800.jpg"
  srcSet="
    /image-400.jpg 400w,
    /image-800.jpg 800w,
    /image-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 400px,
         (max-width: 1200px) 800px,
         1200px"
  alt="Description"
  loading="lazy"
/>
```

---

## ✅ Quick Win Checklist

**Minimum effort, maximum impact:**

1. **Compress Existing Images** (5 min)
   ```bash
   # Use ImageOptim or:
   npx @squoosh/cli --mozjpeg '{quality:80}' public/**/*.jpg
   ```
   - [ ] Compress all JPEGs
   - [ ] Compress all PNGs

2. **Convert to WebP** (10 min)
   ```bash
   find public -name "*.jpg" -exec sh -c 'cwebp -q 80 "$1" -o "${1%.jpg}.webp"' _ {} \;
   ```
   - [ ] Generate WebP versions
   - [ ] Update components to use `<picture>`

3. **Resize Oversized Images** (10 min)
   - [ ] `header.jpeg` → 1920x1080
   - [ ] Large intro images → 1200x800
   - [ ] Gallery images → 1200x800

---

## 🎯 Recommended Workflow

### Step 1: Quick Optimization (Do This Now)
```bash
# 1. Install tools
npm install -g @squoosh/cli

# 2. Backup originals
cp -r public public-backup

# 3. Optimize JPEGs
npx @squoosh/cli --mozjpeg '{quality:80}' public/**/*.jpg

# 4. Optimize PNGs
npx @squoosh/cli --oxipng '{level:3}' public/**/*.png
```

**Expected Result:** 60-70% file size reduction in 5 minutes

### Step 2: Convert to WebP (Do This Next)
```bash
# Install webp tools
# Mac: brew install webp
# Ubuntu: sudo apt install webp

# Convert all images
find public -name "*.jpg" -exec sh -c 'cwebp -q 80 "$1" -o "${1%.jpg}.webp"' _ {} \;
```

**Expected Result:** Additional 20-30% savings

### Step 3: Update Components (Optional)
- Add `<picture>` elements with WebP fallbacks
- Implement responsive images with `srcSet`
- Add proper width/height attributes

---

## 📊 Expected Lighthouse Impact

### Before Optimization:
- Image size: ~5 MB
- Lighthouse warning: "Improve image delivery - 1,759 KiB"
- Performance score: 🔴 Poor

### After Basic Optimization (Step 1):
- Image size: ~1.5-2 MB
- Savings: ~3 MB (60%)
- Performance score: 🟡 Good (+20-30 points)

### After WebP Conversion (Step 2):
- Image size: ~1-1.2 MB
- Savings: ~4 MB (80%)
- Performance score: 🟢 Excellent (+40-50 points)

---

## 🛠️ Tools Reference

### Free Online Tools:
- [Squoosh](https://squoosh.app/) - Google's image compressor
- [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
- [ImageOptim](https://imageoptim.com/) - Mac app (best UX)
- [Compressor.io](https://compressor.io/) - Online batch compression

### CLI Tools:
```bash
# ImageMagick (resize, convert)
brew install imagemagick

# WebP tools
brew install webp

# Squoosh CLI
npm install -g @squoosh/cli

# Sharp (Node.js)
npm install sharp
```

---

## 🎓 Best Practices Going Forward

1. **Before uploading new images:**
   - Resize to appropriate dimensions
   - Compress with quality 80-85
   - Generate WebP version
   - Add to both `.jpg` and `.webp`

2. **Target Sizes:**
   - Hero images: 80-150 KB
   - Gallery images: 50-100 KB
   - Thumbnails: 20-40 KB

3. **Always include:**
   - `loading="lazy"` (except first image)
   - `decoding="async"`
   - `width` and `height` attributes
   - Descriptive `alt` text

---

## 🚀 One-Command Solution

**Quickest way to fix everything:**

```bash
# 1. Install ImageOptim (Mac) or use Squoosh CLI:
npx @squoosh/cli --mozjpeg '{quality:80}' --webp '{quality:80}' public/**/*.{jpg,jpeg}

# This will:
# - Compress original JPEGs (60% smaller)
# - Create WebP versions (80% smaller than original)
# - Take 2-5 minutes for all images
```

**Done!** Upload to staging and re-test Lighthouse.

---

*Expected final result: Performance score improves by 30-50 points* 🎯
