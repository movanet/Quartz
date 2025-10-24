# CRPG.info Content Structure Reference

**Quick reference guide for organizing migrated content**

---

## Directory Structure

```
/home/user/Quartz/quartz/content/
│
├── index.md                          # Homepage
│
├── about/
│   ├── index.md                     # About CRPG overview
│   ├── profile.md                   # Organization profile
│   ├── team.md                      # Team members
│   ├── history.md                   # Organization history
│   └── contact.md                   # Contact information
│
├── research/
│   ├── index.md                     # Research overview & list
│   ├── 2024/
│   │   ├── index.md                 # 2024 research summary
│   │   ├── water-sanitation-infrastructure.md
│   │   ├── climate-policy-analysis.md
│   │   └── regulatory-effectiveness-study.md
│   ├── 2023/
│   │   ├── index.md
│   │   ├── iswash-proceedings.md
│   │   ├── environmental-governance.md
│   │   └── stakeholder-participation.md
│   ├── 2022/
│   │   ├── index.md
│   │   └── [research papers...]
│   └── [other years.../]
│
├── programs/
│   ├── index.md                     # Programs overview
│   ├── aiira.md                     # AIIRA program details
│   ├── consultancy.md               # Consultancy services
│   ├── training.md                  # Training programs
│   └── partnerships.md              # Partnership opportunities
│
├── knowledge-base/
│   ├── index.md                     # Knowledge base home
│   ├── legislation/
│   │   ├── index.md
│   │   ├── water-law.md
│   │   ├── environmental-law.md
│   │   └── regulatory-frameworks.md
│   ├── policy/
│   │   ├── index.md
│   │   ├── sustainability-policy.md
│   │   ├── governance-policy.md
│   │   └── climate-policy.md
│   └── resources/
│       ├── index.md
│       ├── tools.md
│       └── databases.md
│
├── blog/
│   ├── index.md                     # Blog home page
│   ├── 2024/
│   │   ├── 10-24-environmental-regulation.md
│   │   ├── 10-15-policy-update.md
│   │   ├── 09-20-climate-policy.md
│   │   └── [other posts...]
│   ├── 2023/
│   │   └── [posts...]
│   └── [other years...]
│
├── events/
│   ├── index.md                     # Events calendar/list
│   ├── 2024/
│   │   └── upcoming-conference.md
│   ├── 2023/
│   │   ├── iswash-2023.md
│   │   └── workshop-june.md
│   └── archive.md                   # Past events
│
└── assets/
    ├── images/
    │   ├── logo/
    │   │   ├── crpg-logo.png
    │   │   ├── crpg-logo-white.png
    │   │   └── favicon.ico
    │   ├── research/
    │   │   ├── 2024/
    │   │   ├── 2023/
    │   │   └── [year folders...]
    │   ├── blog/
    │   │   ├── 2024/
    │   │   └── [year folders...]
    │   ├── events/
    │   └── team/
    │       ├── person1.jpg
    │       └── person2.jpg
    ├── pdfs/
    │   ├── research-papers/
    │   │   ├── 2024/
    │   │   ├── 2023/
    │   │   └── [year folders...]
    │   ├── proceedings/
    │   ├── reports/
    │   └── presentations/
    └── downloads/
        ├── data-sets/
        ├── templates/
        └── tools/
```

---

## File Naming Conventions

### General Rules
- **Lowercase only**: `research-paper.md`, not `Research-Paper.md`
- **Hyphens for spaces**: `water-sanitation.md`, not `water_sanitation.md`
- **No special characters**: Avoid `!@#$%^&*()` in filenames
- **Descriptive names**: `climate-policy-2024.md`, not `doc1.md`

### Blog Posts
**Format:** `YYYY-MM-DD-descriptive-title.md`

Examples:
- `2024-10-24-environmental-regulation-update.md`
- `2024-09-15-research-findings.md`
- `2023-12-31-year-end-review.md`

### Research Papers
**Format:** `descriptive-title-year.md` or `descriptive-title.md`

Examples:
- `water-sanitation-infrastructure-2024.md`
- `iswash-proceedings-2023.md`
- `regulatory-effectiveness-study.md`

### Index Files
Every directory should have an `index.md` file serving as:
- Directory landing page
- Overview of contained content
- Navigation to child pages

---

## Frontmatter Templates

### Homepage/Landing Page

```yaml
---
title: "Page Title"
description: "SEO-friendly description"
date: 2024-10-24
lastmod: 2024-10-24
draft: false
type: home
tags:
  - governance
  - policy
categories:
  - About
featured_image: "/assets/images/banner.jpg"
source_url: "https://crpg.info/original-path/"
migrated_from: "wordpress"
---
```

### Research Paper

```yaml
---
title: "Research Paper Title"
description: "Abstract or summary (150-250 characters)"
date: 2023-03-21
lastmod: 2024-10-24
draft: false
type: research
tags:
  - water-sanitation
  - infrastructure
  - climate
categories:
  - Research
  - Publications
authors:
  - "Dr. First Author"
  - "Prof. Second Author"
institution: "Center for Regulation Policy and Governance"
publication_year: 2023
publication_type: "Conference Proceedings" # or "Journal Article", "Report", etc.
pdf: "/assets/pdfs/research-papers/2023/paper-title.pdf"
doi: "10.xxxxx/xxxxx" # If available
isbn: "978-xxx-xxxxx-xx-x" # If available
pages: 340 # If applicable
language: "English"
source_url: "https://crpg.info/research/paper-slug/"
migrated_from: "wordpress"
related_sdgs: # If applicable
  - "SDG 6 (Clean Water and Sanitation)"
  - "SDG 13 (Climate Action)"
---
```

### Blog Post

```yaml
---
title: "Blog Post Title"
description: "Post excerpt (150-250 characters)"
date: 2024-10-15
lastmod: 2024-10-24
draft: false
type: blog
tags:
  - policy-update
  - governance
categories:
  - Blog
  - Policy Analysis
author: "Author Name"
author_title: "Position, CRPG"
author_bio: "Brief bio (optional)"
featured_image: "/assets/images/blog/2024/post-image.jpg"
featured_image_alt: "Image description"
read_time: "8 minutes" # Optional
source_url: "https://blog.crpg.info/2024/10/15/post-slug/"
migrated_from: "wordpress"
---
```

### Standard Page

```yaml
---
title: "Page Title"
description: "Page description"
date: 2024-01-15
lastmod: 2024-10-24
draft: false
type: page
tags:
  - relevant
  - tags
categories:
  - Category
author: "CRPG Team"
source_url: "https://crpg.info/page-slug/"
migrated_from: "wordpress"
---
```

### Event Page

```yaml
---
title: "Event Name"
description: "Event description"
date: 2023-03-20
lastmod: 2024-10-24
draft: false
type: event
tags:
  - conference
  - water-sanitation
categories:
  - Events
event_start: 2023-03-20
event_end: 2023-03-21
location: "Bogor, Indonesia"
organizer: "CRPG"
registration_url: "https://example.com/register" # If applicable
event_status: "completed" # or "upcoming", "cancelled"
source_url: "https://crpg.info/events/event-slug/"
migrated_from: "wordpress"
---
```

---

## Content Types

### 1. Homepage (index.md)
- Welcome message
- Organization overview
- Recent highlights
- Navigation to main sections
- Contact information

### 2. About Pages
- Organization profile
- History and mission
- Team members
- Contact information
- Partnerships

### 3. Research Papers
- Full research content
- Abstract/summary
- Methodology
- Findings
- Conclusions
- References
- Download links (PDF)

### 4. Blog Posts
- News and updates
- Policy analysis
- Commentary
- Research highlights
- Event announcements

### 5. Program Pages
- Program descriptions
- Objectives
- Activities
- Partners
- Outcomes
- How to participate

### 6. Knowledge Base
- Reference materials
- Legislation summaries
- Policy briefs
- Tools and resources
- Databases

### 7. Event Pages
- Event announcements
- Proceedings
- Photo galleries
- Presentations
- Follow-up reports

---

## Internal Linking

### Quartz Wiki-Style Links

**Format:** `[[path/to/file|Display Text]]`

**Examples:**

```markdown
# Link to another page
See our [[research/index|research section]].

# Link with same display text as filename
Read about [[programs/aiira]].

# Link to specific heading
Details in [[research/2023/iswash-proceedings#key-findings|IsWASH findings]].

# Link to homepage
Back to [[index|homepage]].
```

### Markdown Standard Links

**Format:** `[Display Text](path/to/file)`

**Examples:**

```markdown
[View our research](/research/)
[Download PDF](/assets/pdfs/report.pdf)
[External link](https://example.com)
```

### Asset Links

```markdown
# Images
![Alt text](/assets/images/research/chart.jpg)

# With caption
![Climate data visualization](/assets/images/research/climate-chart.jpg)
*Figure 1: Climate projections for Indonesia*

# PDFs
[Download full report](/assets/pdfs/research-papers/2024/full-report.pdf)

# Downloads
[Data set (CSV)](/assets/downloads/data-sets/survey-results.csv)
```

---

## Metadata Best Practices

### Tags
- **Be specific**: `water-sanitation` not just `water`
- **Be consistent**: Always use `climate-change` not `climate` or `climatechange`
- **Limit quantity**: 3-7 tags per page
- **Use lowercase**: `governance` not `Governance`
- **Hyphenate compounds**: `policy-analysis` not `policy analysis`

**Common Tags:**
- `governance`, `policy`, `regulation`
- `infrastructure`, `water-sanitation`, `environment`
- `climate-change`, `climate-resilience`, `sustainability`
- `Indonesia`, `Asia-Pacific`, `developing-countries`
- `research`, `case-study`, `analysis`

### Categories
- **Broader than tags**: `Research`, `Blog`, `Programs`
- **Hierarchical**: Main content groupings
- **Limit quantity**: 1-3 per page
- **Title case**: `Policy Analysis` not `policy analysis`

**Common Categories:**
- `Research`, `Publications`
- `Blog`, `News`
- `Programs`, `Projects`
- `About`, `Contact`
- `Resources`, `Knowledge Base`

### Descriptions
- **Length**: 150-250 characters ideal
- **SEO-focused**: Include key terms naturally
- **Unique**: Don't reuse descriptions across pages
- **Actionable**: Tell reader what they'll learn/find
- **No HTML**: Plain text only

**Examples:**

✅ Good:
```
"Analysis of Indonesia's updated environmental impact assessment regulations
and their implications for researchers and policy analysts."
```

❌ Too short:
```
"Environmental regulations."
```

❌ Too long:
```
"This comprehensive blog post provides a detailed analysis of the recent
changes to Indonesia's environmental impact assessment regulatory framework,
including background information, key modifications, implementation
challenges, recommendations for stakeholders, and future research directions."
```

---

## Asset Organization

### Images

**Directory structure:**
```
/assets/images/
├── logo/              # Branding (logo, favicon)
├── research/          # Research-related images
│   ├── 2024/
│   └── 2023/
├── blog/              # Blog post images
│   ├── 2024/
│   └── 2023/
├── events/            # Event photos
├── team/              # Staff headshots
└── general/           # Reusable images
```

**Naming:**
- Descriptive: `climate-resilient-infrastructure.jpg`
- Include context: `iswash-2023-opening.jpg`
- Avoid generic names: not `image1.jpg`

**Formats:**
- **Photos**: JPG (compressed, 80-90% quality)
- **Graphics/logos**: PNG (transparent backgrounds)
- **Diagrams**: SVG (scalable) or PNG
- **Maximum size**: 1920px width recommended
- **Optimize**: Use image compression tools

### PDFs

**Directory structure:**
```
/assets/pdfs/
├── research-papers/
│   ├── 2024/
│   └── 2023/
├── proceedings/
├── reports/
├── presentations/
└── briefs/
```

**Naming:**
- Include year: `annual-report-2024.pdf`
- Descriptive: `iswash-2023-proceedings.pdf`
- Version if applicable: `policy-brief-v2.pdf`

**Best practices:**
- Optimize file size (compress if over 10MB)
- Ensure text is searchable (not scanned images)
- Include metadata in PDF properties

### Downloads

**Directory structure:**
```
/assets/downloads/
├── data-sets/
├── templates/
├── tools/
└── presentations/
```

**File types:**
- Data: CSV, XLS, JSON
- Templates: DOCX, PDF, ODS
- Archives: ZIP (never RAR)

---

## Special Content Elements

### Callouts/Admonitions

```markdown
> [!note] Note Title
> This is a note callout with important information.

> [!warning] Warning Title
> This is a warning about something important.

> [!tip] Pro Tip
> This is a helpful tip for readers.
```

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Code Blocks

```markdown
```python
def example_function():
    return "Hello, World!"
```
```

### Footnotes

```markdown
This is a statement with a footnote.[^1]

[^1]: This is the footnote text.
```

### Quotes

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> — Author Name
```

---

## SEO Considerations

### Page Titles
- **Length**: 50-60 characters
- **Unique**: Different for every page
- **Descriptive**: Clearly indicate content
- **Keywords**: Include primary keyword naturally

### URLs
- **Short**: Avoid deep nesting when possible
- **Descriptive**: `/research/climate-policy/` not `/r/123/`
- **Lowercase**: All lowercase
- **Hyphens**: Word separators

### Headings
- **Hierarchy**: Use H1, H2, H3 logically
- **One H1**: Only title (from frontmatter)
- **Descriptive**: Not just "Introduction", but "Introduction to Climate Policy"
- **Keywords**: Include naturally

---

## Migration Checklist

When migrating content from WordPress:

### Content
- [ ] Title matches original
- [ ] Body content complete
- [ ] HTML converted to Markdown properly
- [ ] No broken formatting
- [ ] Special characters handled correctly
- [ ] Lists formatted properly
- [ ] Headings use correct levels

### Metadata
- [ ] All frontmatter fields populated
- [ ] Date preserved from original
- [ ] Author information included
- [ ] Tags relevant and consistent
- [ ] Categories appropriate
- [ ] Source URL documented

### Links
- [ ] Internal links converted to Quartz format
- [ ] External links preserved
- [ ] Anchor links functional
- [ ] No broken links
- [ ] URLs updated to new structure

### Assets
- [ ] All images present and working
- [ ] Image alt text included
- [ ] PDFs downloadable
- [ ] File paths correct
- [ ] Assets optimized

### SEO
- [ ] Description populated (150-250 chars)
- [ ] Title appropriate length
- [ ] URL structure clean
- [ ] Headings hierarchical
- [ ] Keywords naturally included

---

## Quick Reference Card

### Essential Frontmatter Fields

**Minimum Required:**
```yaml
title: "..."
date: YYYY-MM-DD
type: [page|blog|research|event]
```

**Recommended:**
```yaml
title: "..."
description: "..."
date: YYYY-MM-DD
lastmod: YYYY-MM-DD
type: [page|blog|research|event]
tags: [...]
categories: [...]
source_url: "..."
```

### Common Link Patterns

| Type | Syntax | Example |
|------|--------|---------|
| Internal (Wiki) | `[[path\|text]]` | `[[research/index\|Research]]` |
| Internal (MD) | `[text](path)` | `[Research](/research/)` |
| External | `[text](url)` | `[Google](https://google.com)` |
| Heading | `[[page#heading\|text]]` | `[[about#contact\|Contact]]` |
| Image | `![alt](path)` | `![Logo](/assets/images/logo.png)` |
| PDF | `[text](path)` | `[PDF](/assets/pdfs/report.pdf)` |

### File Naming Cheat Sheet

| Content Type | Format | Example |
|--------------|--------|---------|
| Blog Post | `YYYY-MM-DD-title.md` | `2024-10-24-policy-update.md` |
| Research | `title-year.md` | `climate-study-2024.md` |
| Page | `title.md` | `contact.md` |
| Index | `index.md` | `index.md` |
| Image | `descriptive-name.jpg` | `team-photo-2024.jpg` |
| PDF | `title-year.pdf` | `annual-report-2024.pdf` |

---

## Resources

### Documentation
- **Quartz Docs**: https://quartz.jzhao.xyz/
- **Markdown Guide**: https://www.markdownguide.org/
- **YAML Syntax**: https://yaml.org/spec/

### Tools
- **Markdown Editor**: Obsidian, VS Code, Typora
- **Image Optimization**: TinyPNG, ImageOptim
- **PDF Compression**: Adobe Acrobat, Smallpdf

### Support
- **Migration Team**: [contact-info]
- **Documentation**: `/MIGRATION_RESEARCH.md`
- **Owner Guide**: `/SITE_OWNER_GUIDE.md`

---

**Document Version:** 1.0
**Last Updated:** October 24, 2025
**Purpose:** Quick reference for content migration and organization
