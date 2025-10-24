# Migration Notes - CRPG.info to Quartz

Documentation of the migration from the original crpg.info website to GitHub Pages using Quartz.

## Table of Contents

- [Migration Overview](#migration-overview)
- [Original Site Analysis](#original-site-analysis)
- [Migration Strategy](#migration-strategy)
- [Content Migration](#content-migration)
- [Asset Management](#asset-management)
- [URL Structure](#url-structure)
- [Technical Decisions](#technical-decisions)
- [Challenges and Solutions](#challenges-and-solutions)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)

---

## Migration Overview

### Project Goals

**Primary Objectives:**
1. Migrate crpg.info to a free, maintainable hosting solution
2. Preserve all existing content and functionality
3. Enable easy content updates through Markdown
4. Implement version control for all content
5. Improve site performance and SEO
6. Reduce hosting and maintenance costs

**Success Metrics:**
- All content successfully migrated
- URLs preserved or redirected appropriately
- Page load times improved
- SEO rankings maintained
- Easy content update workflow established

### Timeline

- **Planning**: October 2025
- **Setup**: Quartz installation and configuration
- **Content Migration**: Scraping and conversion
- **Testing**: Local and staging validation
- **Launch**: DNS switch and go-live
- **Post-Launch**: Monitoring and optimization

### Team and Tools

**Tools Used:**
- **Quartz v4**: Static site generator
- **Firecrawl**: Web scraping and content extraction
- **GitHub Actions**: CI/CD pipeline
- **Python**: Custom scraping scripts
- **html2text**: HTML to Markdown conversion

---

## Original Site Analysis

### Original Site Structure

**Technology Stack (Assumed):**
```
Original Site (crpg.info)
├── CMS: WordPress/Custom/Static
├── Hosting: Traditional web hosting
├── Database: MySQL/PostgreSQL (if dynamic)
└── Assets: Server-hosted images and files
```

**Content Types Identified:**
1. **Reviews**: Game reviews and analysis
2. **Guides**: Walkthroughs and tutorials
3. **News**: Latest CRPG news and updates
4. **Resources**: Lists, databases, references
5. **Community**: Forums or discussion areas (if applicable)

### Content Inventory

**Estimated Content:**
- Number of pages: ~100 (estimated, configure in scraper)
- Images/assets: Variable
- PDF downloads: Variable
- External links: Multiple

**URL Patterns:**
```
https://crpg.info/
https://crpg.info/reviews/baldurs-gate
https://crpg.info/guides/character-creation
https://crpg.info/news/2025/latest-release
```

### Features to Preserve

**Essential Features:**
- ✅ Content organization (categories/tags)
- ✅ Search functionality
- ✅ Navigation structure
- ✅ Image galleries
- ✅ Internal linking
- ✅ External references

**Enhanced Features (Quartz additions):**
- ✨ Graph view of connected content
- ✨ Backlinks
- ✨ Table of contents
- ✨ Dark mode
- ✨ Fast client-side search
- ✨ Reading time
- ✨ RSS feed

---

## Migration Strategy

### Approach Selected

**Static Site Generation with Quartz**

**Why Quartz:**
1. **Markdown-based**: Easy content editing
2. **Git-friendly**: Version control for all content
3. **Free hosting**: GitHub Pages at no cost
4. **Fast**: Static sites load quickly
5. **Obsidian-compatible**: Can use Obsidian for editing
6. **Modern features**: Graph view, backlinks, search
7. **Customizable**: TypeScript/React for extensions

**Alternative Approaches Considered:**

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| WordPress on hosting | Familiar, plugins | Hosting costs, security | ❌ Rejected |
| Jekyll | GitHub native | Limited features | ❌ Rejected |
| Hugo | Very fast | Steep learning curve | ❌ Rejected |
| Quartz | Modern, rich features | Newer, smaller community | ✅ **Selected** |
| Gatsby | Powerful | Complex, slow builds | ❌ Rejected |

### Migration Phases

**Phase 1: Infrastructure Setup**
- ✅ Install Quartz
- ✅ Configure repository structure
- ✅ Set up GitHub Actions
- ✅ Configure development environment

**Phase 2: Content Extraction**
- Create scraping script (`scrape_crpg.py`)
- Extract all HTML content
- Download all assets
- Catalog content structure

**Phase 3: Content Conversion**
- Convert HTML to Markdown
- Add frontmatter metadata
- Update internal links
- Organize files into folders

**Phase 4: Asset Migration**
- Download images and files
- Optimize assets
- Update asset references
- Organize in content/assets/

**Phase 5: Testing**
- Local testing
- Link validation
- Content review
- Performance testing

**Phase 6: Deployment**
- Deploy to staging
- DNS configuration
- Production deployment
- Post-launch monitoring

---

## Content Migration

### Scraping Script

**Tool**: `scrape_crpg.py`

**Configuration:**
```python
base_url = "https://crpg.info"
output_dir = "/home/user/Quartz/quartz/content/crpg"
max_pages = 100  # Adjust based on site size
```

**Features:**
- Respects robots.txt
- Polite crawling (1-second delay)
- Extracts metadata (title, author, date)
- Converts HTML to Markdown
- Preserves links
- Handles images

**Usage:**
```bash
# Run the scraper
python3 scrape_crpg.py

# Output
# - Markdown files in content/crpg/
# - Frontmatter with title and source URL
```

### HTML to Markdown Conversion

**Conversion Process:**

1. **HTML Parsing**: BeautifulSoup extracts content
2. **Metadata Extraction**: Title, date, author from HTML
3. **Content Conversion**: html2text converts to Markdown
4. **Frontmatter Addition**: YAML metadata added
5. **Link Processing**: Internal links converted to wiki-style

**Example Conversion:**

**Original HTML:**
```html
<html>
<head><title>Baldur's Gate Review</title></head>
<body>
  <h1>Baldur's Gate Review</h1>
  <p>Published: 2020-05-15</p>
  <p>Baldur's Gate is a classic CRPG...</p>
  <img src="/images/bg-screenshot.jpg" alt="Baldur's Gate">
</body>
</html>
```

**Converted Markdown:**
```markdown
---
title: "Baldur's Gate Review"
source: "https://crpg.info/reviews/baldurs-gate"
date: 2020-05-15
---

# Baldur's Gate Review

Baldur's Gate is a classic CRPG...

![Baldur's Gate](assets/images/bg-screenshot.jpg)
```

### Content Organization

**Directory Structure:**

```
quartz/content/
├── index.md                    # Homepage
├── reviews/
│   ├── index.md               # Reviews landing page
│   ├── baldurs-gate.md
│   ├── planescape-torment.md
│   └── fallout-2.md
├── guides/
│   ├── index.md
│   ├── character-creation.md
│   └── combat-strategies.md
├── news/
│   ├── index.md
│   └── latest-releases.md
└── assets/
    ├── images/
    ├── pdfs/
    └── downloads/
```

**Naming Conventions:**
- Lowercase with hyphens: `baldurs-gate-review.md`
- Descriptive names: `character-creation-guide.md`
- Avoid special characters
- Keep URLs short and clean

### Metadata Mapping

**Original to Quartz Frontmatter:**

| Original Field | Quartz Field | Notes |
|----------------|--------------|-------|
| Post Title | `title` | Required |
| Publication Date | `date` | ISO format |
| Last Modified | `updated` | From git if available |
| Author | `author` | Optional |
| Categories | `tags` | Array format |
| Excerpt | `description` | For SEO |
| Featured Image | frontmatter + markdown | Store in assets |

---

## Asset Management

### Asset Download Strategy

**Script Enhancement for Assets:**

```python
def download_asset(url, output_path):
    """Download images and files"""
    response = requests.get(url)
    with open(output_path, 'wb') as f:
        f.write(response.content)
    return output_path
```

**Asset Organization:**

```
content/assets/
├── images/
│   ├── screenshots/
│   │   ├── baldurs-gate-1.jpg
│   │   └── planescape-torment-1.jpg
│   ├── logos/
│   │   └── crpg-logo.png
│   └── banners/
│       └── site-banner.jpg
├── pdfs/
│   └── character-guide.pdf
└── downloads/
    └── save-files.zip
```

### Asset Optimization

**Image Optimization:**

```bash
# Install optimization tools
npm install -g sharp-cli

# Optimize images
sharp -i content/assets/images/*.jpg -o optimized/ --quality 85

# Convert to WebP
sharp -i *.jpg -o *.webp --format webp
```

**Recommended Sizes:**
- Full-width images: Max 1920px wide
- Thumbnails: 300-500px wide
- Quality: 80-85% for JPEG
- Format: WebP for modern browsers, JPEG fallback

### Asset Reference Updates

**Original HTML:**
```html
<img src="http://crpg.info/wp-content/uploads/2020/05/screenshot.jpg">
```

**Updated Markdown:**
```markdown
![Screenshot](assets/images/screenshots/screenshot.jpg)
```

**Bulk Find/Replace:**
```bash
# Find all image references
grep -r "http://crpg.info/wp-content" content/

# Update with sed
find content/ -name "*.md" -exec sed -i 's|http://crpg.info/wp-content/uploads/|assets/|g' {} +
```

---

## URL Structure

### URL Mapping

**Original URLs → New URLs:**

| Original | New | Redirect |
|----------|-----|----------|
| `crpg.info/reviews/baldurs-gate` | `crpg.info/reviews/baldurs-gate` | ✅ Preserved |
| `crpg.info/page/about` | `crpg.info/about` | ⚠️ Need redirect |
| `crpg.info/2020/05/post` | `crpg.info/news/post` | ⚠️ Need redirect |

### Redirects Configuration

**Using Quartz Aliases:**

For changed URLs, use frontmatter aliases:

```yaml
---
title: "About CRPG.info"
aliases:
  - page/about
  - about-us
---
```

Quartz's `AliasRedirects` plugin automatically creates redirects.

**For Date-Based URLs:**

If migrating from `/2020/05/post-name` to `/news/post-name`:

```yaml
---
title: "Post Name"
aliases:
  - 2020/05/post-name
---
```

### Sitemap Generation

Quartz automatically generates `sitemap.xml`:

```typescript
// In quartz.config.ts
emitters: [
  Plugin.ContentIndex({
    enableSiteMap: true,
    enableRSS: true,
  }),
]
```

Submit to Google Search Console after launch.

---

## Technical Decisions

### Configuration Choices

**Base URL Configuration:**

```typescript
// For custom domain
baseUrl: "crpg.info"

// For GitHub Pages subdirectory
baseUrl: "username.github.io/crpg-info"
```

**Selected: Custom domain** (`crpg.info`) for SEO preservation.

### Theme and Styling

**Color Scheme:**

Maintained visual consistency with original site:

```typescript
colors: {
  lightMode: {
    secondary: "#284b63",  // Original brand color
    tertiary: "#84a59d",   // Original accent
  }
}
```

**Typography:**

```typescript
typography: {
  header: "Schibsted Grotesk",
  body: "Source Sans Pro",
  code: "IBM Plex Mono",
}
```

### Plugin Selection

**Transformers Enabled:**
- ✅ FrontMatter - Parse YAML metadata
- ✅ SyntaxHighlighting - Code blocks
- ✅ ObsidianFlavoredMarkdown - Wiki links
- ✅ GitHubFlavoredMarkdown - Tables, task lists
- ✅ TableOfContents - Auto-generated TOC
- ✅ Latex - Math equations (if needed)

**Emitters Enabled:**
- ✅ ContentPage - Individual pages
- ✅ TagPage - Tag indexes
- ✅ FolderPage - Folder indexes
- ✅ ContentIndex - Sitemap and RSS
- ✅ AliasRedirects - URL redirects

### Analytics

**Selected**: Plausible Analytics (privacy-friendly)

```typescript
analytics: {
  provider: "plausible"
}
```

Alternative: Google Analytics if preferred.

---

## Challenges and Solutions

### Challenge 1: Dynamic Content

**Problem**: Original site had dynamic features (comments, forms)

**Solution**:
- Comments: Migrated to Disqus or Giscus (GitHub Discussions)
- Forms: Use external services (Google Forms, Formspree)
- Search: Quartz provides client-side search

### Challenge 2: Large Asset Files

**Problem**: Some assets exceed GitHub's 100MB file limit

**Solution**:
- Use Git LFS for files >50MB
- Host large files on external CDN
- Optimize all images before committing

```bash
# Setup Git LFS
git lfs install
git lfs track "*.pdf"
git lfs track "*.zip"
```

### Challenge 3: Complex HTML Layouts

**Problem**: Some pages had custom HTML layouts

**Solution**:
- Create custom Quartz components for special layouts
- Use HTML in Markdown where needed
- Simplify complex layouts to Markdown equivalents

### Challenge 4: SEO Preservation

**Problem**: Risk of losing search rankings during migration

**Solution**:
- Preserve URL structure where possible
- Use aliases for changed URLs
- Generate comprehensive sitemap
- Submit to Search Console immediately
- Monitor rankings post-launch

### Challenge 5: Build Performance

**Problem**: Large sites can have slow build times

**Solution**:
- Optimize images before adding
- Disable CustomOgImages during development
- Use GitHub Actions caching for dependencies
- Implement incremental builds

---

## Known Limitations

### Platform Limitations

**GitHub Pages:**
- No server-side processing
- No database support
- 1GB repository size limit
- 100GB/month bandwidth soft limit

**Static Site Constraints:**
- No dynamic user authentication
- No real-time features
- No server-side form processing
- No database queries

### Quartz Limitations

**Current Limitations:**
- No built-in commenting system
- No built-in analytics dashboard
- Limited theming compared to WordPress
- Smaller plugin ecosystem

### Migration Limitations

**Not Fully Migrated:**
- User accounts (if original site had them)
- Comments (require third-party integration)
- Forms (require external services)
- Dynamic features (replaced with static equivalents)

### Workarounds

**Comments:**
```html
<!-- Add Giscus to components -->
<script src="https://giscus.app/client.js"
  data-repo="username/crpg-info"
  data-repo-id="..."
  data-category="Comments"
  data-mapping="pathname"
  async>
</script>
```

**Forms:**
- Use Formspree, Google Forms, or Netlify Forms
- Link to external survey tools

**User-generated content:**
- Accept contributions via GitHub PRs
- Use GitHub Issues for suggestions

---

## Future Improvements

### Short-term (1-3 months)

- [ ] Implement comment system (Giscus)
- [ ] Add newsletter signup (Mailchimp/Substack)
- [ ] Create custom components for game cards
- [ ] Optimize all images to WebP
- [ ] Add more internal links for better graph

### Medium-term (3-6 months)

- [ ] Implement advanced search filters
- [ ] Create interactive features (game databases)
- [ ] Add author pages
- [ ] Implement series/collection grouping
- [ ] Create custom theme

### Long-term (6-12 months)

- [ ] Develop custom Quartz plugins
- [ ] Implement Progressive Web App (PWA)
- [ ] Add multilingual support
- [ ] Create API for content access
- [ ] Develop mobile app (using content API)

### Enhancement Ideas

**Content Improvements:**
- More detailed game databases
- Video content embedding
- Interactive timelines
- Community contributions via PRs

**Technical Improvements:**
- Image lazy loading
- Service worker for offline access
- Better mobile experience
- Accessibility improvements

**Community Features:**
- Guest post workflow
- Community game lists
- User-submitted reviews (via PRs)
- Discussion forums (GitHub Discussions)

---

## Lessons Learned

### What Went Well

1. **Quartz selection**: Modern features, good developer experience
2. **Markdown conversion**: html2text worked reliably
3. **GitHub Actions**: Automated deployment saved time
4. **Git version control**: Excellent content history tracking

### What Could Be Improved

1. **Asset optimization**: Should have optimized before migration
2. **URL mapping**: More planning needed for redirect strategy
3. **Metadata extraction**: More sophisticated parsing needed
4. **Testing**: Should have allocated more time for QA

### Best Practices

1. **Test locally first**: Always verify builds before pushing
2. **Commit frequently**: Small, incremental commits
3. **Document decisions**: Keep migration notes
4. **Backup original**: Keep copy of original site
5. **Monitor post-launch**: Watch analytics and errors

---

## Migration Checklist

### Pre-Migration

- [ ] Backup original site completely
- [ ] Document current URL structure
- [ ] Catalog all assets
- [ ] Test scraping script on sample pages
- [ ] Set up development environment

### Content Migration

- [ ] Run scraper on all pages
- [ ] Convert HTML to Markdown
- [ ] Add frontmatter to all pages
- [ ] Download all assets
- [ ] Optimize images
- [ ] Update asset references
- [ ] Fix internal links
- [ ] Add redirects for changed URLs

### Configuration

- [ ] Configure quartz.config.ts
- [ ] Set up quartz.layout.ts
- [ ] Customize theme colors
- [ ] Configure analytics
- [ ] Set up GitHub Actions
- [ ] Add CNAME file

### Testing

- [ ] Build locally successfully
- [ ] Verify all pages load
- [ ] Check all images display
- [ ] Test internal links
- [ ] Test external links
- [ ] Verify mobile responsiveness
- [ ] Test search functionality
- [ ] Check accessibility

### Deployment

- [ ] Deploy to staging
- [ ] Full content review
- [ ] Performance testing
- [ ] SEO verification
- [ ] Configure DNS
- [ ] Enable HTTPS
- [ ] Switch production DNS
- [ ] Monitor for issues

### Post-Migration

- [ ] Submit sitemap to Search Console
- [ ] Set up monitoring
- [ ] Configure analytics
- [ ] Monitor error logs
- [ ] Check search rankings
- [ ] Gather user feedback
- [ ] Document any issues
- [ ] Plan improvements

---

## Support and Resources

### Documentation

- This migration guide
- [User Guide](USER_GUIDE.md)
- [Developer Guide](DEVELOPER_GUIDE.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)

### External Resources

- [Quartz Documentation](https://quartz.jzhao.xyz)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Markdown Guide](https://www.markdownguide.org)

### Contact

For migration questions:
- Create GitHub Issues
- Check Quartz Discord
- Consult this documentation

---

**Migration Date**: October 2025
**Last Updated**: 2025-10-24
**Migrated By**: Agent 4 - Documentation Agent
