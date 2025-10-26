# CRPG Website Quartz Design Plan

## Original Site Analysis (from crpg.info/index.html)

### Visual Design Elements
- **Primary Color**: #E51D1D (Red) - Used for headings, links, buttons
- **Secondary Color**: #ED6600 (Orange) - Hover states
- **Accent Color**: #3000E0 (Blue) - Links
- **Background**: White with black footer
- **Typography**: Roboto & Roboto Slab font families

### Layout Structure
1. **Top Bar** (Red background #E51D1D)
   - Organization name: "Center for Regulation Policy and Governance"
   - Social media icons (Twitter, Email)

2. **Header**
   - Logo (250px max width/height)
   - Navigation menu with hover effects
   - Search functionality

3. **Main Content Areas**
   - Homepage with sections for:
     - About/Profile
     - Research papers
     - Events
     - Programs
     - Publications
     - Blog posts

4. **Footer** (Black background)
   - Footer widgets area
   - Footer bottom (Orange background #ED6A07)
   - Contact information

### Content Organization

#### Main Site Sections
```
/
├── index.md (Homepage)
├── about-us/
│   └── profile.md
├── people/ (Author pages)
│   ├── mohamad-mova-alafghani.md
│   ├── dyah-paramita.md
│   └── ... (other team members)
├── research/
│   └── (research content)
├── publications/
│   └── publications.md
├── events/
│   └── index.md
├── programs/
│   ├── wash.md
│   ├── aiira.md
│   ├── ehrdd.md
│   └── swa-mam-catalytic-program.md
├── docs/
│   ├── aiira/
│   └── ruusda/
└── gallery/
    └── index.md
```

#### Blog Section
```
/blog/
├── 2010/
├── 2012/
├── 2013/
├── 2014/
├── 2015/
├── 2018/
├── 2019/
├── 2020/
└── 2021/
```

### Quartz Features to Enable

1. **Search** - Full-text search across all content
2. **Graph View** - Visual connections between pages
3. **Table of Contents** - For longer documents
4. **Backlinks** - Show related content
5. **Tag System** - Categorize by topics (research, policy, water, governance, etc.)
6. **Dark Mode** - Toggle for accessibility
7. **Explorer** - File tree navigation
8. **Recent Posts** - Latest blog entries

### Quartz Configuration

#### quartz.config.ts Settings
```typescript
{
  pageTitle: "CRPG - Center for Regulation Policy and Governance",
  baseUrl: "crpg.info" or "movanet.github.io/Quartz",
  theme: {
    typography: {
      header: "Roboto Slab",
      body: "Roboto",
      code: "IBM Plex Mono"
    },
    colors: {
      lightMode: {
        primary: "#E51D1D",
        secondary: "#ED6600",
        tertiary: "#3000E0"
      },
      darkMode: {
        primary: "#FF4444",
        secondary: "#FF7722",
        tertiary: "#5544FF"
      }
    }
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown()
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ContentIndex(),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      Plugin.FolderPage(),
      Plugin.ContentPage()
    ]
  }
}
```

### Content Conversion Rules

#### Frontmatter Template for Main Pages
```yaml
---
title: "Page Title"
description: "SEO description from meta tags"
date: 2024-01-01
tags: [regulation, policy, governance, water, research]
author: "Author Name"
type: page
---
```

#### Frontmatter Template for Blog Posts
```yaml
---
title: "Blog Post Title"
description: "Post excerpt"
date: 2021-09-15
tags: [blog, water, policy]
author: "Author Name"
type: blog
---
```

### Asset Organization
```
/assets/
├── images/
│   ├── 2018/
│   ├── 2019/
│   ├── 2021/
│   ├── 2022/
│   ├── 2023/
│   └── 2024/
├── pdfs/
│   └── (research papers, reports)
├── logos/
│   ├── crpg-logo.png
│   └── favicon.png
└── uploads/
    └── (other files)
```

### Migration Priority

1. **Critical Pages** (Priority 1)
   - index.md (Homepage)
   - about-us/profile.md
   - publications.md

2. **Important Content** (Priority 2)
   - All author/people pages
   - Research papers
   - Program pages (WASH, AIIRA, EHRDD)

3. **Blog Content** (Priority 3)
   - All blog posts from 2010-2021
   - Preserve chronological organization

4. **Supporting Content** (Priority 4)
   - Gallery
   - Events archive
   - Docs/Resources

### Preserving Original Features

1. **URL Structure**: Maintain similar paths for SEO
2. **Images**: Keep original sizes and formats, add alt text
3. **PDFs**: Link preservation for downloadable documents
4. **Internal Links**: Convert to Quartz wiki-style links [[Page Name]]
5. **External Links**: Keep as-is
6. **Social Media**: Add to site footer/header
7. **Contact Information**: Preserve email and Twitter links

## Implementation Notes

- Use BeautifulSoup or html2text for HTML parsing
- Extract metadata from WordPress meta tags
- Preserve heading hierarchy (H1, H2, H3)
- Convert WordPress shortcodes to markdown equivalents
- Handle special characters and encoding properly
- Create redirects for changed URLs
- Generate sitemap.xml for SEO
