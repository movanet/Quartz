# Asset Quality Report
# Optimization Guidelines and Recommendations

**Date:** October 25, 2025
**Agent:** Agent 3 - Asset Management & Database
**Version:** 1.0

---

## Executive Summary

This report provides quality standards, optimization guidelines, and recommendations for the CRPG.info asset archive. The goal is to ensure all assets meet web performance standards while maintaining archival quality.

**Key Findings:**
- Estimated 30-50% size reduction possible through optimization
- Primary opportunities: Image compression and PDF optimization
- Target: < 5 MB for PDFs, < 500 KB for images
- Zero quality loss for archival with proper compression

---

## Table of Contents

1. [Quality Standards](#quality-standards)
2. [Optimization Strategies](#optimization-strategies)
3. [Tools and Techniques](#tools-and-techniques)
4. [Quality Assurance](#quality-assurance)
5. [Optimization Results (Projected)](#optimization-results-projected)
6. [Recommendations](#recommendations)

---

## Quality Standards

### PDF Documents

#### Minimum Quality Criteria

1. **File Integrity**
   - Opens without errors in all major PDF readers
   - All pages present and complete
   - No corruption or missing content

2. **Text Searchability**
   - All text is selectable and searchable
   - OCR applied to scanned documents
   - Proper text encoding (UTF-8 for international)

3. **Image Quality**
   - Minimum 150 DPI for scanned documents
   - 300 DPI for archival/print quality
   - 72-150 DPI acceptable for web-only documents

4. **File Size**
   - Target: < 5 MB for most documents
   - Acceptable: 5-10 MB for comprehensive reports
   - Large: > 10 MB (requires compression)

5. **Metadata**
   - Title, author, subject fields populated
   - Creation/modification dates present
   - Keywords when applicable

#### Quality Tiers

**Archival Quality (Tier 1):**
- Full resolution preservation
- Lossless compression only
- Complete metadata
- All annotations and bookmarks intact

**Web Optimized (Tier 2):**
- Downsampled to 150-300 DPI
- Lossy compression (acceptable quality)
- Essential metadata retained
- Optimized for fast loading

**Distribution Quality (Tier 3):**
- Compressed for minimum file size
- 150 DPI or less
- Basic metadata only
- Maximum accessibility

### Images

#### Quality Criteria

1. **Resolution**
   - Featured images: 1200-1920px wide
   - Inline images: 600-1200px wide
   - Thumbnails: 300-400px wide
   - Team photos: 400x400 or 300x400
   - Logos: Vector (SVG) + PNG at multiple sizes

2. **File Size**
   - Featured images: < 500 KB (target < 300 KB)
   - Inline images: < 200 KB
   - Thumbnails: < 50 KB
   - Logos: < 100 KB

3. **Format**
   - Photos: JPEG (quality 80-85%)
   - Graphics/Diagrams: PNG or SVG
   - Logos: SVG preferred, PNG fallback
   - Screenshots: PNG

4. **Color Space**
   - sRGB for web (standard)
   - Remove embedded color profiles (reduce size)

5. **Metadata**
   - Remove EXIF data (privacy, size reduction)
   - Preserve copyright/attribution if required

#### Responsive Image Strategy

**Generate Multiple Sizes:**
- **Large:** 1920px (full-screen, desktop)
- **Medium:** 1200px (standard desktop)
- **Small:** 768px (tablet)
- **Thumbnail:** 400px (mobile, previews)

**Naming Convention:**
```
filename.jpg         (original/large)
filename-medium.jpg
filename-small.jpg
filename-thumb.jpg
```

---

## Optimization Strategies

### Image Optimization

#### JPEG Compression

**Strategy:** Quality 80-85% provides excellent visual quality with 30-50% file size reduction.

**Tools:**
```bash
# ImageMagick
convert input.jpg -quality 85 -strip output.jpg

# With resize (max width 1920px)
convert input.jpg -quality 85 -resize 1920x> -strip output.jpg

# Progressive JPEG for large images
convert input.jpg -quality 85 -interlace Plane -strip output.jpg
```

**Expected Results:**
- Original: 800 KB
- Optimized (85% quality): 240-320 KB (60-70% reduction)
- Visual quality: Indistinguishable from original

#### PNG Optimization

**Strategy:** Lossless optimization removes unnecessary metadata and optimizes compression.

**Tools:**
```bash
# pngquant (lossy but high quality)
pngquant --quality=80-90 input.png -o output.png

# optipng (lossless)
optipng -o5 input.png

# ImageMagick
convert input.png -strip -quality 85 output.png
```

**Expected Results:**
- Original PNG: 500 KB
- Optimized: 200-350 KB (30-60% reduction)
- Quality: Visually lossless

#### SVG Optimization

**Strategy:** Remove unnecessary elements, whitespace, and metadata.

**Tools:**
```bash
# svgo
svgo input.svg -o output.svg

# Manual: Remove unnecessary groups, clean up paths
```

**Expected Results:**
- Original SVG: 100 KB
- Optimized: 30-50 KB (50-70% reduction)

#### WebP Conversion (Optional)

**Strategy:** Modern format with superior compression. Provide as alternative with JPEG fallback.

**Tools:**
```bash
# Convert to WebP
cwebp -q 85 input.jpg -o output.webp

# Typically 25-35% smaller than JPEG
```

**Fallback Strategy:**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
```

### PDF Optimization

#### Compression Strategies

**Strategy 1: Ghostscript Compression**

```bash
# Ebook quality (good for web, 150 DPI)
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=output.pdf input.pdf

# Screen quality (72 DPI, smallest size)
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=output.pdf input.pdf

# Printer quality (300 DPI, archival)
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/printer -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=output.pdf input.pdf
```

**Expected Results:**
- Original: 15 MB
- /ebook (150 DPI): 5-7 MB (50-65% reduction)
- /screen (72 DPI): 2-3 MB (80-85% reduction)
- /printer (300 DPI): 8-10 MB (30-45% reduction)

**Recommendation:** Use `/ebook` for most documents, `/printer` for archival copies.

#### OCR for Scanned Documents

**Strategy:** Add searchable text layer to scanned PDFs.

**Tools:**
```bash
# ocrmypdf (preserves original, adds text layer)
ocrmypdf --deskew --clean --optimize 3 input.pdf output.pdf

# With language specification
ocrmypdf -l eng+ind --optimize 3 input.pdf output.pdf
```

**Benefits:**
- Makes document searchable
- Improves accessibility
- Often reduces file size through optimization

#### PDF/A Conversion (Archival)

**Strategy:** Convert to PDF/A format for long-term preservation.

**Tools:**
```bash
# Ghostscript PDF/A-2b
gs -dPDFA=2 -dBATCH -dNOPAUSE -sColorConversionStrategy=RGB \
   -sDEVICE=pdfwrite -sOutputFile=output.pdf input.pdf PDFA_def.ps
```

**Use Cases:**
- Archival copies of major research reports
- Long-term preservation requirements
- Compliance with archival standards

---

## Tools and Techniques

### Recommended Tools

#### Image Processing

**ImageMagick** (Cross-platform)
```bash
# Install
# Ubuntu/Debian: apt-get install imagemagick
# macOS: brew install imagemagick
# Windows: Download from imagemagick.org

# Common operations
convert input.jpg -quality 85 -resize 1920x> output.jpg
identify -verbose image.jpg  # Get image info
```

**pngquant** (PNG optimization)
```bash
# Install
# Ubuntu/Debian: apt-get install pngquant
# macOS: brew install pngquant
# Windows: Download from pngquant.org

# Usage
pngquant --quality=80-90 *.png
```

**jpegoptim** (JPEG optimization)
```bash
# Install
apt-get install jpegoptim

# Usage
jpegoptim --max=85 --strip-all image.jpg
```

#### PDF Processing

**Ghostscript** (Cross-platform)
```bash
# Install
# Ubuntu/Debian: apt-get install ghostscript
# macOS: brew install ghostscript
# Windows: Download from ghostscript.com

# Usage (see compression strategies above)
```

**ocrmypdf** (OCR for PDFs)
```bash
# Install
pip install ocrmypdf

# Requires tesseract
apt-get install tesseract-ocr tesseract-ocr-ind  # Indonesian language

# Usage
ocrmypdf --optimize 3 input.pdf output.pdf
```

**PDFtk** (PDF manipulation)
```bash
# Install
apt-get install pdftk

# Split PDF
pdftk input.pdf burst

# Merge PDFs
pdftk part1.pdf part2.pdf cat output combined.pdf
```

#### Batch Processing

**Bash Script for Batch Image Optimization:**

```bash
#!/bin/bash
# optimize-images.sh

for img in *.jpg; do
    echo "Processing $img..."
    convert "$img" -quality 85 -resize 1920x> -strip "optimized/$img"
done

for img in *.png; do
    echo "Processing $img..."
    pngquant --quality=80-90 "$img" --output "optimized/$img"
done
```

**Python Script for Asset Processing:**

```python
#!/usr/bin/env python3
import os
from PIL import Image

def optimize_image(input_path, output_path, max_width=1920, quality=85):
    """Optimize image file size while maintaining quality."""
    img = Image.open(input_path)

    # Resize if too large
    if img.width > max_width:
        ratio = max_width / img.width
        new_size = (max_width, int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    # Save with optimization
    img.save(output_path, optimize=True, quality=quality)

    # Report
    original_size = os.path.getsize(input_path)
    optimized_size = os.path.getsize(output_path)
    reduction = (1 - optimized_size/original_size) * 100

    print(f"Optimized {input_path}")
    print(f"  Size: {original_size/1024:.1f}KB → {optimized_size/1024:.1f}KB ({reduction:.1f}% reduction)")

# Usage
optimize_image("input.jpg", "output.jpg")
```

---

## Quality Assurance

### Pre-Optimization Checklist

- [ ] Backup original files
- [ ] Verify files are not corrupted
- [ ] Document original file sizes
- [ ] Note any special requirements (archival quality, etc.)
- [ ] Check file formats are appropriate for content type

### Optimization Workflow

1. **Backup** - Create copy of original files
2. **Test** - Process one sample file
3. **Verify** - Check output quality
4. **Batch** - Process remaining files
5. **Validate** - Verify all files processed correctly
6. **Document** - Record optimization results
7. **Compare** - Original vs. optimized file sizes
8. **Archive** - Store originals if needed

### Post-Optimization Verification

#### Images
- [ ] Open each image and visually inspect
- [ ] Verify dimensions are appropriate
- [ ] Check file size is within target
- [ ] Confirm no visible quality loss
- [ ] Test in web browser
- [ ] Verify transparent backgrounds (if PNG)

#### PDFs
- [ ] Open in PDF reader (Adobe, Preview, etc.)
- [ ] Verify all pages present
- [ ] Test text searchability (copy/paste text)
- [ ] Check page count matches original
- [ ] Verify hyperlinks work
- [ ] Test on multiple devices if possible

### Quality Metrics

**Image Quality Score (1-10):**
- 10: Perfect, indistinguishable from original
- 8-9: Excellent, minor differences only visible on close inspection
- 6-7: Good, suitable for web, minor artifacts
- 4-5: Acceptable, visible compression artifacts
- 1-3: Poor, significant quality loss

**Target:** 8+ for all optimized images

**PDF Quality Score (1-10):**
- 10: Archival quality, all original features intact
- 8-9: High quality, searchable, clear images
- 6-7: Web quality, readable, acceptable images
- 4-5: Low quality, readable but poor images
- 1-3: Unacceptable, missing text or illegible

**Target:** 7+ for web copies, 9+ for archival copies

---

## Optimization Results (Projected)

### By Asset Type

#### Research PDFs (6-10 documents)

**Before Optimization:** 40-80 MB
**After Optimization:** 25-50 MB
**Reduction:** 35-40%

**Strategy:** Ghostscript `/ebook` setting (150 DPI)

**Sample:**
- AIIRA Report: 8 MB → 5 MB (37% reduction)
- POPs Report: 15 MB → 9 MB (40% reduction)
- IsWASH Proceedings: 3.7 MB → 2.5 MB (32% reduction)

#### Blog Images (200-400 images)

**Before Optimization:** 20-60 MB
**After Optimization:** 12-35 MB
**Reduction:** 40-42%

**Strategy:** JPEG quality 85%, max width 1200px

**Sample:**
- Featured image: 450 KB → 180 KB (60% reduction)
- Inline photo: 280 KB → 110 KB (61% reduction)
- Diagram (PNG): 320 KB → 150 KB (53% reduction)

#### Team Photos (15-20 images)

**Before Optimization:** 2-10 MB
**After Optimization:** 1-5 MB
**Reduction:** 45-50%

**Strategy:** Resize to 400x400, JPEG quality 85%

**Sample:**
- Team photo: 500 KB → 120 KB (76% reduction)
- Profile headshot: 350 KB → 95 KB (73% reduction)

#### Research Images (50-100 images)

**Before Optimization:** 5-20 MB
**After Optimization:** 3-12 MB
**Reduction:** 35-40%

**Strategy:** JPEG quality 85%, PNG optimize for diagrams

#### Event Photos (20-50 images)

**Before Optimization:** 5-15 MB
**After Optimization:** 3-9 MB
**Reduction:** 38-42%

**Strategy:** JPEG quality 85%, max width 1200px

#### Logos (5-10 images)

**Before Optimization:** 1-2 MB
**After Optimization:** 0.5-1 MB
**Reduction:** 45-50%

**Strategy:** SVG optimization, PNG compression

### Total Projected Results

**Before Optimization:** 93-267 MB
**After Optimization:** 60-180 MB
**Average Reduction:** 35-40%
**Storage Saved:** 33-87 MB

---

## Recommendations

### Priority 1: Immediate Optimizations

1. **Large PDFs (> 10 MB)**
   - Compress with Ghostscript `/ebook` setting
   - Target: < 5 MB for most documents
   - Expected savings: 30-50 MB total

2. **Oversized Images (> 500 KB)**
   - Resize to max 1920px wide
   - Compress JPEG to quality 85%
   - Expected savings: 10-20 MB total

3. **CRPG Logo Files**
   - Ensure SVG versions exist
   - Optimize PNG variants
   - Generate multiple sizes (icon, small, medium, large)

### Priority 2: Standard Optimizations

4. **All Blog Images**
   - Batch process with ImageMagick
   - Target: < 300 KB for featured, < 150 KB for inline
   - Expected savings: 8-25 MB total

5. **Research Images**
   - Optimize PNGs with pngquant
   - Compress JPEGs to quality 85%
   - Expected savings: 2-8 MB total

6. **Team Photos**
   - Standardize dimensions (400x400 or 300x400)
   - Compress to quality 85%
   - Expected savings: 1-5 MB total

### Priority 3: Advanced Optimizations

7. **Generate Responsive Image Variants**
   - Create small, medium, large variants
   - Better delivery, faster loading
   - No additional storage cost (variants replace originals)

8. **Consider WebP Format**
   - Generate WebP alternatives for modern browsers
   - Additional 25-35% size reduction
   - Maintain JPEG fallbacks

9. **PDF/A for Archival Copies**
   - Convert major research reports to PDF/A
   - Long-term preservation standard
   - Store separately from web-optimized versions

### Best Practices

1. **Always Backup Originals**
   - Keep unoptimized versions separately
   - Enable rollback if needed
   - Use for future re-processing

2. **Test Before Batch Processing**
   - Process one sample from each category
   - Verify quality and file size
   - Adjust settings if needed

3. **Document All Optimizations**
   - Record settings used
   - Note before/after file sizes
   - Track quality scores

4. **Automate Where Possible**
   - Create batch scripts for common operations
   - Consistent results across all files
   - Faster processing

5. **Regular Quality Audits**
   - Periodic review of optimized assets
   - Verify no degradation over time
   - Update optimization strategies as tools improve

---

## Tools Installation Guide

### Ubuntu/Debian

```bash
# Update package list
sudo apt-get update

# Install all image tools
sudo apt-get install -y imagemagick pngquant jpegoptim optipng

# Install PDF tools
sudo apt-get install -y ghostscript pdftk tesseract-ocr tesseract-ocr-ind

# Install Python tools
pip3 install ocrmypdf Pillow
```

### macOS

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install tools
brew install imagemagick pngquant jpegoptim optipng
brew install ghostscript tesseract tesseract-lang
pip3 install ocrmypdf Pillow
```

### Windows

1. **ImageMagick:** Download from https://imagemagick.org/script/download.php
2. **Ghostscript:** Download from https://ghostscript.com/releases/gsdnld.html
3. **pngquant:** Download from https://pngquant.org/
4. **Python tools:** `pip install ocrmypdf Pillow`

---

**Report Version:** 1.0
**Last Updated:** October 25, 2025
**Prepared By:** Agent 3 - Asset Management & Database

This report provides comprehensive guidelines for optimizing all assets while maintaining archival quality. Follow these recommendations to achieve 35-40% storage reduction with minimal quality impact.
