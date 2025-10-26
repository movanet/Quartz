# Quartz Configuration Guide for CRPG

This document outlines the Quartz static site generator configuration for the Center for Regulation Policy and Governance (CRPG) website.

## Overview

Quartz has been configured to match the original CRPG.info branding and provide a professional, accessible platform for publishing research content.

## Brand Identity

### Colors
- **Primary Red**: `#E51D1D` - Main brand color for headers, links, and accents
- **Secondary Orange**: `#ED6600` - Accent color for tags and interactive elements
- **Accent Blue**: `#3000E0` - Additional accent (reserved for future use)

### Typography
- **Headers**: Roboto Slab (serif) - Professional, readable for titles
- **Body**: Roboto (sans-serif) - Clean, modern for content
- **Code**: IBM Plex Mono - Monospaced for technical content

## Configuration Files

### 1. quartz.config.ts

**Location**: `D:\Obsidian\Apps\crpgwebsite\quartz\quartz.config.ts`

**Key Settings**:
```typescript
{
  pageTitle: "CRPG - Center for Regulation Policy and Governance",
  baseUrl: "crpg.info",
  locale: "en-US",
  enableSPA: true,
  enablePopovers: true,
}
```

**Plugins Enabled**:

**Transformers** (Process markdown):
- FrontMatter - Parse YAML frontmatter
- CreatedModifiedDate - Track file dates
- SyntaxHighlighting - Code highlighting (GitHub theme)
- ObsidianFlavoredMarkdown - Obsidian-specific markdown
- GitHubFlavoredMarkdown - GFM support
- TableOfContents - Generate TOCs
- CrawlLinks - Process internal links
- Description - Generate meta descriptions
- Latex - Math rendering (KaTeX)

**Filters**:
- RemoveDrafts - Hide draft content

**Emitters** (Generate output):
- AliasRedirects - Handle URL aliases
- ComponentResources - Bundle JS/CSS
- ContentPage - Individual pages
- FolderPage - Folder indexes
- TagPage - Tag pages
- ContentIndex - Search index, sitemap, RSS
- Assets - Copy static assets
- Static - Copy static files
- Favicon - Favicon handling
- NotFoundPage - 404 page
- ~~CustomOgImages~~ - *Temporarily disabled due to network issues*

### 2. quartz.layout.ts

**Location**: `D:\Obsidian\Apps\crpgwebsite\quartz\quartz.layout.ts`

**Layout Components**:

**Content Pages** (Single article view):
- **Before Body**: Breadcrumbs, Article Title, Content Meta, Tag List
- **Left Sidebar**: Page Title, Search, Dark Mode, Reader Mode, Explorer
- **Right Sidebar**: Graph View, Table of Contents, Backlinks

**List Pages** (Tag/folder indexes):
- **Before Body**: Breadcrumbs, Article Title, Content Meta
- **Left Sidebar**: Page Title, Search, Dark Mode, Explorer
- **Right Sidebar**: Empty (list content takes priority)

**Footer** (All pages):
- Links to: CRPG Website, GitHub Repository, Contact Email

### 3. Custom Styles (custom.scss)

**Location**: `D:\Obsidian\Apps\crpgwebsite\quartz\quartz\styles\custom.scss`

**CSS Features**:
- CRPG brand color variables
- Professional spacing system
- Enhanced link styling with hover effects
- Styled tags with orange background
- Bordered article titles
- Themed tables with red headers
- Graph view styling
- Responsive design for mobile
- Dark mode support
- Print-friendly styles

**Key Style Sections**:
1. CSS Variables (colors, spacing, border radius)
2. Enhanced Link Styling (primary red with hover)
3. Article Title (red border bottom)
4. Button & Interactive Elements
5. Search Box Enhancement
6. Tag Styling (orange badges)
7. Backlinks Section
8. Table of Contents (left red border)
9. Graph View Enhancement
10. Footer Styling (red top border)
11. Code Block Enhancements
12. Blockquote Styling (red left border)
13. Table Styling (red headers)
14. Explorer Styling
15. Breadcrumb Navigation
16. Responsive Adjustments
17. Dark Mode Adjustments
18. Print Styles

## Domain Configuration

### CNAME File

**Location**: `D:\Obsidian\Apps\crpgwebsite\quartz\quartz\static\CNAME`

**Content**: `crpg.info`

**Note**: After building, copy CNAME from `public/static/CNAME` to `public/CNAME` for GitHub Pages:
```bash
cp "public/static/CNAME" "public/CNAME"
```

## Build Process

### Standard Build
```bash
cd D:\Obsidian\Apps\crpgwebsite\quartz
npx quartz build
```

### Build with Local Server
```bash
npx quartz build --serve
```

### Post-Build Steps
1. Verify build completed successfully
2. Copy CNAME file to public root:
   ```bash
   cp "public/static/CNAME" "public/CNAME"
   ```
3. Check generated files in `public/` directory
4. Test locally before deploying

## Content Structure

### Required Directories
- `content/` - Markdown files for articles
- `content/blog/` - Blog posts
- `quartz/static/` - Static assets (images, CNAME, etc.)

### Frontmatter Template
```yaml
---
title: "Article Title"
date: 2025-10-26
tags:
  - regulation
  - policy
  - governance
description: "Brief description for SEO"
---
```

## Enabled Features

### Search
- Full-text search across all content
- Tag-based filtering
- Result previews

### Graph View
- Visual connection between pages
- Local graph (current page connections)
- Global graph (entire site)
- Configurable depth and physics

### Table of Contents
- Auto-generated from headings
- Sticky sidebar navigation
- Active section highlighting

### Explorer
- File tree navigation
- Collapsible folders
- Alphabetical sorting
- Saved state

### Backlinks
- Show pages linking to current page
- Citation tracking
- Research connectivity

### Dark Mode
- System preference detection
- Manual toggle
- Persistent user choice

### Reader Mode
- Hide sidebars for focused reading
- Hover to reveal sidebars
- Better reading experience

## Deployment

### GitHub Pages
1. Build the site: `npx quartz build`
2. Ensure CNAME is in place
3. Push `public/` directory to `gh-pages` branch
4. Configure GitHub Pages to use custom domain `crpg.info`

### DNS Configuration
Point `crpg.info` to GitHub Pages:
```
A record: 185.199.108.153
A record: 185.199.109.153
A record: 185.199.110.153
A record: 185.199.111.153
CNAME: www -> movanet.github.io
```

## Troubleshooting

### Build Fails
- Check Node.js version (>=22 required)
- Run `npm install` to update dependencies
- Clear cache: `rm -rf .quartz-cache`

### Custom Styles Not Applied
- Verify `custom.scss` is in `quartz/styles/`
- Check for SCSS syntax errors
- Rebuild with `npx quartz build`

### CNAME Missing
- Verify file exists in `quartz/static/CNAME`
- Manually copy after build if needed
- Check GitHub Pages settings

### Images Not Loading
- Place images in `quartz/static/`
- Reference as `/static/image.png` in markdown
- Rebuild to copy to public

## Maintenance

### Regular Tasks
- Update dependencies: `npm update`
- Review security: `npm audit fix`
- Test build locally before deploying
- Backup configuration files

### Content Updates
1. Add markdown files to `content/`
2. Use frontmatter for metadata
3. Build and test locally
4. Deploy to GitHub Pages

## Resources

- [Quartz Documentation](https://quartz.jzhao.xyz/)
- [Obsidian Markdown](https://help.obsidian.md/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [CRPG Original Site](https://crpg.info)

## Configuration Summary

| Setting | Value |
|---------|-------|
| **Page Title** | CRPG - Center for Regulation Policy and Governance |
| **Base URL** | crpg.info |
| **Locale** | en-US |
| **Theme** | Custom (CRPG colors) |
| **Primary Color** | #E51D1D (Red) |
| **Secondary Color** | #ED6600 (Orange) |
| **Header Font** | Roboto Slab |
| **Body Font** | Roboto |
| **Code Font** | IBM Plex Mono |
| **SPA** | Enabled |
| **Popovers** | Enabled |
| **Search** | Enabled |
| **Graph** | Enabled |
| **TOC** | Enabled |
| **Dark Mode** | Enabled |

## Next Steps

1. **Content Migration**: Continue migrating content from original CRPG site
2. **Testing**: Thoroughly test all features and styling
3. **SEO**: Configure meta tags and Open Graph images
4. **Analytics**: Set up Plausible analytics (configured in quartz.config.ts)
5. **Performance**: Optimize images and assets
6. **Accessibility**: Test with screen readers and WCAG compliance tools

## Support

For issues or questions:
- Review this guide
- Check Quartz documentation
- Contact repository maintainer

---

*Last Updated: 2025-10-26*
*Quartz Version: 4.5.2*
