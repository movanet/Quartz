# Asset Management Guide
# CRPG.info Archive - How to Add and Manage Assets

**Date:** October 25, 2025
**Agent:** Agent 3 - Asset Management & Database
**Version:** 1.0
**Audience:** Content managers, future contributors

---

## Purpose

This guide provides instructions for adding new assets to the CRPG.info archive and maintaining the asset management system. Follow these procedures to ensure consistency, quality, and proper metadata tracking.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Adding New Assets](#adding-new-assets)
3. [Naming Conventions](#naming-conventions)
4. [Metadata Requirements](#metadata-requirements)
5. [Directory Organization](#directory-organization)
6. [Optimization Guidelines](#optimization-guidelines)
7. [Database Updates](#database-updates)
8. [Quality Checks](#quality-checks)
9. [Common Tasks](#common-tasks)
10. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Adding a New PDF Document

1. **Download or obtain the PDF file**
2. **Determine the asset type and category**
   - Research paper? → `assets/pdfs/research-papers/YYYY-project/`
   - Policy brief? → `assets/pdfs/policy-briefs/YYYY/`
   - Presentation? → `assets/downloads/presentations/event-type/`
3. **Rename the file following naming conventions**
   - Example: `2024-water-policy-brief.pdf`
4. **Move file to appropriate directory**
5. **Add entry to ASSET_MASTER_DATABASE.csv**
6. **Add detailed metadata to ASSET_METADATA.json**
7. **Update ASSET_CATALOG.md with entry**
8. **Verify file integrity and accessibility**

### Adding a New Image

1. **Download or obtain the image file**
2. **Determine the image category**
   - Logo? → `assets/images/logos/`
   - Team photo? → `assets/images/team/core/`
   - Blog image? → `assets/images/blog/YYYY/`
   - Research image? → `assets/images/research/project-year/`
3. **Optimize the image** (compress, resize if needed)
4. **Rename following naming conventions**
   - Example: `team-john-doe.jpg` or `blog-2024-05-water-governance.jpg`
5. **Move to appropriate directory**
6. **Add to databases (CSV and JSON)**
7. **Update catalog**
8. **Verify image displays correctly**

---

## Adding New Assets

### Step-by-Step Process

#### Step 1: Obtain the Asset

- Download from original source
- Verify file is complete and not corrupted
- Check file size is reasonable
- For PDFs: Ensure text is searchable (OCR if needed)
- For images: Check resolution and quality

#### Step 2: Classify the Asset

Determine:
- **Asset type:** PDF, image, video, dataset, etc.
- **Category:** Research, blog, team, events, etc.
- **Subcategory:** Specific project, year, or topic
- **Priority tier:** 1 (critical) to 4 (optional)

#### Step 3: Name the Asset

Follow naming conventions from ASSET_ORGANIZATION_PLAN.md:

**PDFs:**
```
YYYY-project-code-descriptive-title.pdf
Examples:
2024-wash-research-community-systems.pdf
2024-pb-02-climate-adaptation-policy.pdf
```

**Images:**
```
category-YYYY-MM-description.jpg
Examples:
blog-2024-05-water-infrastructure.jpg
team-jane-doe.jpg
event-2024-06-conference-group-photo.jpg
```

**Rules:**
- All lowercase
- Use hyphens (not underscores or spaces)
- Descriptive and clear
- Include year when applicable
- 30-80 characters maximum

#### Step 4: Determine Directory Location

Refer to directory structure:

```
assets/
├── pdfs/
│   ├── research-papers/YYYY-project/
│   ├── policy-briefs/YYYY/
│   ├── proceedings/conferences/
│   └── reports/research/
├── images/
│   ├── blog/YYYY/
│   ├── team/core|affiliated|historical/
│   ├── research/project-year/
│   ├── events/event-type/
│   ├── logos/crpg|partners|projects/
│   └── general/topic/
├── downloads/
│   ├── presentations/event-type/
│   ├── datasets/data-type/
│   └── documents/doc-type/
└── media/
    └── videos/video-type/
```

#### Step 5: Optimize the Asset (if applicable)

**For Images:**
- Compress to 80-85% quality for JPEGs
- Resize if dimensions are excessive (max 1920px width)
- Generate responsive variants if needed (large, medium, small, thumbnail)
- Remove unnecessary EXIF data
- Target sizes:
  - Featured images: < 500 KB
  - Inline images: < 200 KB
  - Thumbnails: < 50 KB

**For PDFs:**
- Compress large PDFs (target < 5 MB for most documents)
- Ensure text is searchable (OCR scanned documents)
- Downsample images within PDF to 150-300 DPI
- Remove unnecessary embedded fonts

**Tools:**
- ImageMagick for image optimization
- pngquant for PNG compression
- Ghostscript for PDF compression

#### Step 6: Move File to Directory

```bash
# Example: Moving a research paper
mv 2024-wash-research.pdf quartz/content/assets/pdfs/research-papers/2024-wash/

# Example: Moving a blog image
mv blog-2024-05-image.jpg quartz/content/assets/images/blog/2024/
```

#### Step 7: Generate Unique Asset ID

- Next available ID in sequence: `asset_NNN`
- Check ASSET_MASTER_DATABASE.csv for last ID
- Increment by 1

#### Step 8: Add to ASSET_MASTER_DATABASE.csv

Open `docs/agent3/ASSET_MASTER_DATABASE.csv` and add a new row:

```csv
asset_031,pdf,https://source-url.com/file.pdf,assets/pdfs/research-papers/2024-wash/2024-wash-research.pdf,2024-wash-research.pdf,5242880,5.0 MB,pdf,application/pdf,abc123def456,N/A,50,WASH Research Report 2024,"Description of the report...",N/A,WASH;water;research;2024,water;research,en,Author Name,CRPG,2024-03-15,2024-03,https://source-page.com,CC-BY-4.0,/research/wash-2024,1,downloaded,2025-10-25,"Research report notes"
```

**Required fields:**
- id, type, original_url, local_path, filename
- size_bytes, size_human, format, mime_type
- title, description, keywords, topics, language
- author, organization, date_created, date_published
- source_page, license, priority, status, date_archived

#### Step 9: Add to ASSET_METADATA.json

Add detailed entry to `docs/agent3/ASSET_METADATA.json`:

```json
{
  "id": "asset_031",
  "type": "pdf",
  "category": "research-papers",
  "subcategory": "2024-wash",
  "original": {
    "url": "https://source-url.com/file.pdf",
    "source_page": "https://source-page.com"
  },
  "local": {
    "path": "assets/pdfs/research-papers/2024-wash/2024-wash-research.pdf",
    "filename": "2024-wash-research.pdf"
  },
  "file_properties": {
    "size_bytes": 5242880,
    "size_human": "5.0 MB",
    "format": "pdf"
  },
  "content_metadata": {
    "title": "WASH Research Report 2024",
    "description": "Description here...",
    "language": "en"
  },
  ...
}
```

#### Step 10: Update ASSET_CATALOG.md

Add entry to `docs/agent3/ASSET_CATALOG.md` under appropriate section:

```markdown
#### WASH Research Report 2024
**ID:** asset_031
**File:** `2024-wash-research.pdf`
**Location:** `assets/pdfs/research-papers/2024-wash/`
**Size:** 5.0 MB
**Status:** ✅ Downloaded

**Description:**
[Description of the research report...]

**Published:** March 2024
**Organization:** CRPG
**Topics:** WASH, Water, Research
**Language:** English
```

#### Step 11: Verify and Test

- Open PDF/image to verify it's not corrupted
- Check file size is reasonable
- Verify metadata is accurate
- Test link/reference in content page
- Confirm file is in correct directory

---

## Naming Conventions

### General Rules

1. **All lowercase** - Never use uppercase
2. **Use hyphens** - Never spaces or underscores
3. **Descriptive** - Clear, self-documenting names
4. **Include date** - Use YYYY or YYYY-MM when applicable
5. **No special characters** - Only alphanumeric, hyphens, periods
6. **Reasonable length** - 30-80 characters

### Patterns by Asset Type

**Research Papers:**
```
YYYY-project-code-title.pdf
2024-aiira-community-water-systems.pdf
```

**Policy Briefs:**
```
YYYY-pb-NN-topic.pdf
2024-pb-03-climate-policy.pdf
```

**Blog Images:**
```
blog-YYYY-MM-topic.jpg
blog-2024-05-water-governance.jpg
```

**Team Photos:**
```
team-firstname-lastname.jpg
team-john-doe.jpg
```

**Event Photos:**
```
event-YYYY-MM-event-name-description.jpg
event-2024-06-conference-keynote.jpg
```

**Logos:**
```
logo-organization-variant.svg
logo-crpg-horizontal.svg
```

---

## Metadata Requirements

### Core Metadata (Required for ALL assets)

1. **id** - Unique identifier
2. **type** - Asset type
3. **original_url** - Source URL
4. **local_path** - Local file path
5. **filename** - Current filename
6. **title** - Asset title
7. **date_archived** - When downloaded
8. **status** - Current status

### Extended Metadata (Recommended)

9. **description** - Brief description (100-200 words)
10. **author** - Creator/author
11. **organization** - Creating organization
12. **date_created** - Original creation date
13. **date_published** - Publication date
14. **keywords** - Relevant keywords
15. **topics** - Topic categories
16. **language** - Language code (en, id, mixed)
17. **license** - License/usage rights
18. **source_page** - Original page URL
19. **usage_context** - Where asset is used
20. **priority** - Priority tier (1-4)

### Type-Specific Metadata

**PDFs:**
- page_count
- authors (array)
- abstract
- citation
- partners

**Images:**
- dimensions (WxH)
- alt_text
- caption
- photographer
- has_transparency

**Videos:**
- duration
- platform
- embed_code
- resolution

---

## Directory Organization

### Directory Structure

See complete structure in ASSET_ORGANIZATION_PLAN.md. Key directories:

```
assets/
├── pdfs/
│   ├── research-papers/YYYY-project/
│   ├── policy-briefs/YYYY/
│   ├── proceedings/
│   └── reports/
├── images/
│   ├── blog/YYYY/
│   ├── team/category/
│   ├── research/project-year/
│   ├── events/
│   ├── logos/
│   └── general/
├── downloads/
│   ├── presentations/
│   ├── datasets/
│   └── documents/
└── media/
    └── videos/
```

### Rules

1. **Maximum 3-4 levels deep** - Avoid excessive nesting
2. **Related assets together** - Keep project assets together
3. **Chronological when appropriate** - Use year subdirectories for blogs/events
4. **One canonical location** - No duplicates (except format variants)

---

## Optimization Guidelines

### Images

**JPEG Photos:**
```bash
# Compress to 85% quality, max width 1920px
convert input.jpg -quality 85 -resize 1920x> output.jpg

# Generate thumbnail
convert input.jpg -quality 80 -resize 400x> thumbnail.jpg
```

**PNG Graphics:**
```bash
# Optimize PNG
pngquant --quality=80-90 input.png -o output.png

# Or with ImageMagick
convert input.png -quality 85 output.png
```

**Target Sizes:**
- Featured images: 500-1200px wide, < 500 KB
- Inline images: 400-800px wide, < 200 KB
- Thumbnails: 300-400px wide, < 50 KB
- Team photos: 400x400 or 300x400, < 150 KB
- Logos: Vector SVG + PNG variants

### PDFs

**Compression:**
```bash
# Using Ghostscript
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=output.pdf input.pdf
```

**OCR (if needed):**
```bash
# Using ocrmypdf
ocrmypdf input.pdf output.pdf
```

**Quality Checks:**
- Ensure text is searchable
- Verify all pages present
- Check file opens without errors
- Target < 5 MB for most documents

---

## Database Updates

### Updating ASSET_MASTER_DATABASE.csv

1. Open CSV in spreadsheet software or text editor
2. Add new row at end with all required fields
3. Ensure CSV formatting is correct (commas, quotes)
4. Save file
5. Validate with CSV parser if available

### Updating ASSET_METADATA.json

1. Open JSON file in text editor
2. Add new asset object to `assets` array
3. Follow existing structure exactly
4. Validate JSON syntax (use jsonlint.com)
5. Update `asset_summary` counts if needed
6. Save file

### Updating ASSET_CATALOG.md

1. Open catalog in text editor
2. Find appropriate section (by asset type/category)
3. Add new entry following format
4. Update table of contents if new section
5. Update summary statistics
6. Save file

---

## Quality Checks

### Before Adding Asset

- [ ] File is complete and not corrupted
- [ ] File size is reasonable for type
- [ ] File name follows naming conventions
- [ ] Correct directory determined
- [ ] Metadata gathered (title, author, date, etc.)

### After Adding Asset

- [ ] File opens/displays correctly
- [ ] Metadata is accurate and complete
- [ ] Database entries added (CSV, JSON, Catalog)
- [ ] File is in correct directory
- [ ] Links/references work in content pages
- [ ] Optimizations applied (if needed)
- [ ] No duplicate files created

### Weekly/Monthly Maintenance

- [ ] Verify all asset files are accessible
- [ ] Check for orphan files (not in database)
- [ ] Review and update missing metadata
- [ ] Audit file sizes and optimize if needed
- [ ] Backup asset databases
- [ ] Generate asset statistics report

---

## Common Tasks

### Replacing an Asset

1. Download new version
2. Rename with same filename as existing
3. Create backup of old version (add `-v01` suffix)
4. Replace file in directory
5. Update metadata in databases (date_modified, notes)
6. Update catalog entry
7. Clear cached versions if applicable

### Creating Asset Variants

For responsive images or multiple formats:

1. Create variants (e.g., small, medium, large)
2. Use consistent naming:
   - `filename.jpg` (original)
   - `filename-large.jpg`
   - `filename-medium.jpg`
   - `filename-small.jpg`
   - `filename-thumb.jpg`
3. Store in same directory
4. Add variants to metadata under `variants` field
5. Document in catalog

### Archiving Old Assets

For outdated or superseded assets:

1. Move to `archive/` subdirectory within category
2. Update status in database to "archived"
3. Note superseding asset ID if applicable
4. Update catalog to show "Archived" status
5. Keep metadata for historical reference

### Batch Operations

For adding multiple similar assets:

1. Create batch upload spreadsheet
2. Fill out all metadata
3. Use script to:
   - Rename files from spreadsheet
   - Move to correct directories
   - Generate CSV/JSON entries
   - Update catalog
4. Manually verify sample of assets
5. Review generated database entries

---

## Troubleshooting

### File Won't Open/Display

- Check file isn't corrupted (re-download if needed)
- Verify file extension matches actual format
- Check file permissions
- Try opening in different application
- Verify file size > 0 bytes

### Metadata Not Showing

- Verify database syntax (CSV commas, JSON braces)
- Check for special characters in metadata fields
- Ensure UTF-8 encoding for international characters
- Validate JSON syntax
- Check CSV for proper quoting

### File Size Too Large

- Compress PDF with Ghostscript
- Optimize images with ImageMagick/pngquant
- Resize images to appropriate dimensions
- Consider splitting large PDFs into parts
- Use Git LFS if file > 50 MB

### Naming Conflicts

- Check for existing file with same name
- Add version number or date suffix
- Use more specific descriptive name
- Check database for filename uniqueness

### Missing Metadata

- Review original source page for information
- Check PDF properties for author/title
- Extract EXIF data from images
- Contact content creator if available
- Document "Unknown" in database

---

## Best Practices

1. **Consistent Naming** - Always follow naming conventions
2. **Complete Metadata** - Fill all available fields
3. **Optimize First** - Compress before adding to archive
4. **Verify Quality** - Check files before database entry
5. **Document Sources** - Always record original URLs
6. **Regular Backups** - Backup databases weekly
7. **Test Integration** - Verify assets work in content pages
8. **Update Catalog** - Keep catalog current with all additions

---

## Additional Resources

- **ASSET_ORGANIZATION_PLAN.md** - Complete directory structure and naming conventions
- **ASSET_CATALOG.md** - Browse all existing assets
- **ASSET_METADATA.json** - Detailed metadata structure reference
- **ASSET_MASTER_DATABASE.csv** - Searchable asset database
- **ASSET_QUALITY_REPORT.md** - Optimization guidelines and results

---

**Guide Version:** 1.0
**Last Updated:** October 25, 2025
**Maintained By:** Agent 3 / Content Management Team

For questions or issues, refer to project documentation or consult with content management team.
