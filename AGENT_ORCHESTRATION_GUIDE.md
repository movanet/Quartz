# Agent Orchestration Guide for CRPG.info Archival Project

**Project:** Archive crpg.info (Center for Regulation, Policy and Governance) to GitHub Pages using Quartz
**Date:** October 25, 2025
**Architecture:** Main Orchestrator + Specialized Parallel Sub-Agents

---

## Executive Summary

This guide provides instructions for the main orchestrator agent to coordinate parallel sub-agents in archiving the crpg.info WordPress website and republishing it as a static GitHub Pages site using Quartz v4.

### Objectives
1. Archive all content from crpg.info (WordPress)
2. Convert content to Quartz-compatible Markdown
3. Configure and customize Quartz for governance/policy content
4. Deploy to GitHub Pages with automated CI/CD

### Success Criteria
- ✅ All crpg.info content successfully archived
- ✅ Content converted to proper Markdown with frontmatter
- ✅ Quartz configured and themed appropriately
- ✅ GitHub Pages deployment working
- ✅ All links, images, and assets functional
- ✅ Search, navigation, and Quartz features enabled

---

## Architecture Overview

### Parallel Agent Model

```
Main Orchestrator Agent
│
├── Agent 1: Content Extraction & Analysis
│   └── Analyzes site structure, extracts content, creates inventory
│
├── Agent 2: Scraping & Conversion
│   └── Scrapes WordPress content, converts to Markdown
│
├── Agent 3: Asset Management
│   └── Downloads and organizes images, PDFs, media files
│
├── Agent 4: Quartz Configuration
│   └── Configures Quartz, customizes theme, sets up plugins
│
└── Agent 5: Testing & Deployment
    └── Quality assurance, GitHub Pages setup, CI/CD configuration
```

### Dependencies

**Sequential Dependencies:**
- Agent 1 must complete before Agent 2 starts
- Agent 2 must complete before Agent 3 processes assets
- Agents 2 & 3 must complete before Agent 4 integrates content
- All agents must complete before Agent 5 deploys

**Parallel Opportunities:**
- Agent 1 can run parallel with Quartz setup
- Agent 3 (asset downloads) can run parallel with Agent 4 (Quartz config)
- Testing (Agent 5) can start incrementally as content becomes available

---

## Agent Specifications

### Agent 1: Content Extraction & Analysis Agent

**Mission:** Analyze crpg.info structure and create content inventory

**Tools Required:**
- WebFetch for page analysis
- Web scraping tools (curl, wget)
- BeautifulSoup or similar HTML parser

**Tasks:**
1. Analyze site structure (navigation, sections, categories)
2. Identify all page types (homepage, research, blog, events, etc.)
3. Create URL sitemap
4. Document WordPress content structure
5. Identify media assets (images, PDFs, downloads)
6. Create content inventory spreadsheet/document
7. Recommend frontmatter templates for each content type

**Deliverables:**
- `SITE_STRUCTURE_ANALYSIS.md` - Site structure documentation
- `CONTENT_INVENTORY.md` - Complete list of all pages/posts
- `ASSET_INVENTORY.md` - List of all media files
- `URL_SITEMAP.txt` - All URLs to be archived
- `FRONTMATTER_TEMPLATES.md` - Templates for each content type

**Estimated Time:** 2-3 hours

**Output Location:** `/docs/agent1/`

---

### Agent 2: Scraping & Conversion Agent

**Mission:** Scrape WordPress content and convert to Markdown

**Tools Required:**
- Firecrawl (self-hosted) OR MarkItDown
- html2text or Pandoc
- Python scraping scripts
- WordPress export tools (if available)

**Approach Options (in priority order):**

1. **WordPress Export (Preferred)**
   - Request WordPress WXR export from site owner
   - Parse XML and convert to Markdown
   - Preserve metadata, categories, tags

2. **Firecrawl Self-Hosted**
   - Set up Firecrawl with Docker
   - Configure for crpg.info domain
   - Extract clean Markdown with metadata

3. **MarkItDown**
   - Use Microsoft's MarkItDown tool
   - Process HTML pages to Markdown
   - Manual metadata extraction

4. **Custom Python Scraper**
   - Use existing `scrape_crpg.py` as base
   - Enhanced with better HTML parsing
   - Add frontmatter generation

**Tasks:**
1. Choose and set up conversion tool
2. Scrape all pages from content inventory
3. Convert HTML to Markdown
4. Extract and format frontmatter
5. Organize files in directory structure
6. Update internal links to Markdown format
7. Preserve external links
8. Handle special content (tables, code blocks, quotes)

**Deliverables:**
- Markdown files in `quartz/content/`
- Proper frontmatter for all pages
- `CONVERSION_LOG.md` - Conversion process notes
- `ISSUES_LOG.md` - Problems encountered and solutions

**Estimated Time:** 4-6 hours (depends on content volume)

**Output Location:** `/quartz/content/` (organized by content type)

---

### Agent 3: Asset Management Agent

**Mission:** Download and organize all media assets

**Tools Required:**
- wget or curl for downloads
- Image optimization tools (ImageMagick, optipng)
- PDF compression tools

**Tasks:**
1. Download all images from asset inventory
2. Download all PDFs and documents
3. Download any other media (videos, data files)
4. Organize in proper directory structure
5. Optimize images (compress, resize if needed)
6. Update asset references in Markdown files
7. Create asset index
8. Verify all assets downloaded successfully

**Directory Structure:**
```
quartz/content/assets/
├── images/
│   ├── logo/
│   ├── research/
│   ├── blog/
│   ├── events/
│   └── team/
├── pdfs/
│   ├── research-papers/
│   ├── proceedings/
│   └── reports/
└── downloads/
    ├── data-sets/
    └── presentations/
```

**Deliverables:**
- All assets in `quartz/content/assets/`
- `ASSET_DOWNLOAD_LOG.md` - Download log
- Updated Markdown files with correct asset paths
- `ASSET_OPTIMIZATION_REPORT.md` - Before/after file sizes

**Estimated Time:** 2-4 hours (depends on asset volume)

**Output Location:** `/quartz/content/assets/`

---

### Agent 4: Quartz Configuration & Customization Agent

**Mission:** Configure Quartz for CRPG governance/policy content

**Tools Required:**
- Node.js v22+
- npm
- Context7 MCP (for Quartz documentation)
- Code editor

**Tasks:**

**1. Initial Setup**
- Install Quartz dependencies (`npm install`)
- Verify build works
- Test local development server

**2. Configuration (`quartz.config.ts`)**
```typescript
{
  pageTitle: "CRPG - Center for Regulation Policy and Governance",
  baseUrl: "crpg.info",
  analytics: { /* optional */ },
  theme: {
    typography: {
      header: "Roboto Slab", // Professional serif
      body: "Roboto",        // Clean sans-serif
      code: "JetBrains Mono"
    },
    colors: {
      lightMode: {
        light: "#faf8f8",
        lightgray: "#e5e5e5",
        gray: "#b8b8b8",
        darkgray: "#4e4e4e",
        dark: "#2b2b2b",
        secondary: "#e51d1d",  // CRPG red
        tertiary: "#ed6600",   // CRPG orange
        highlight: "rgba(229, 29, 29, 0.15)"
      },
      darkMode: { /* ... */ }
    }
  },
  plugins: [/* Enable search, graph, backlinks, TOC, etc. */]
}
```

**3. Layout Configuration (`quartz.layout.ts`)**
- Configure header components
- Set up navigation menu
- Configure sidebar (TOC, backlinks, graph)
- Set up footer

**4. Theme Customization**
- Create custom CSS (`quartz/quartz/styles/custom.scss`)
- Match CRPG branding (red #e51d1d, orange #ed6600)
- Professional academic/policy aesthetic
- Responsive design verification

**5. Plugin Configuration**
- Search functionality
- Graph view
- Backlinks
- Table of contents
- Tag pages
- Explorer (file tree)
- RSS feed

**6. Content Integration**
- Move converted Markdown files into content directory
- Verify frontmatter compatibility
- Test internal linking
- Test asset loading

**Deliverables:**
- Configured `quartz.config.ts`
- Configured `quartz.layout.ts`
- Custom CSS files
- `QUARTZ_SETUP_GUIDE.md` - Configuration documentation
- Working local build
- `BUILD_TEST_REPORT.md` - Build test results

**Estimated Time:** 3-4 hours

**Output Location:** `/quartz/`

---

### Agent 5: Testing & Deployment Agent

**Mission:** Quality assurance and GitHub Pages deployment

**Tools Required:**
- Git & GitHub CLI
- Browser testing tools
- Lighthouse (performance testing)
- Link checkers

**Tasks:**

**1. Content Verification**
- [ ] All pages render correctly
- [ ] All images loading
- [ ] All PDFs accessible
- [ ] Internal links working
- [ ] External links preserved
- [ ] Formatting preserved (tables, lists, quotes)
- [ ] Code blocks rendering correctly
- [ ] Special characters handled properly

**2. Feature Testing**
- [ ] Search functionality works
- [ ] Graph view displays correctly
- [ ] Backlinks functional
- [ ] Tags working
- [ ] Explorer (file tree) functional
- [ ] RSS feed generates
- [ ] Mobile responsive
- [ ] Dark mode toggle works

**3. Performance Testing**
- Run Lighthouse audit
- Target: 90+ score on all metrics
- Optimize if needed (lazy loading, compression)

**4. SEO Verification**
- Meta descriptions present
- sitemap.xml generated
- robots.txt configured
- Open Graph tags correct
- Canonical URLs set

**5. GitHub Repository Setup**
- Verify repository settings
- Configure GitHub Pages source
- Set up custom domain (CNAME)
- Enable HTTPS

**6. CI/CD Configuration**
- Create/verify `.github/workflows/deploy.yml`
- Test automated build
- Test automated deployment
- Set up branch protection (if needed)

**7. Deployment**
- Push to main branch
- Monitor GitHub Actions build
- Verify deployment success
- Test live site
- DNS configuration (if custom domain)

**Deliverables:**
- `QA_TEST_REPORT.md` - Testing results
- `PERFORMANCE_REPORT.md` - Lighthouse scores
- `DEPLOYMENT_LOG.md` - Deployment steps and results
- Working GitHub Pages site
- `USER_GUIDE.md` - Guide for content updates

**Estimated Time:** 3-4 hours

**Output Location:** `/.github/workflows/`, `/docs/`

---

## Main Orchestrator Responsibilities

### 1. Pre-Launch Checklist

- [ ] All tools installed (Node.js, npm, Docker if using Firecrawl)
- [ ] Repository cloned and submodules initialized
- [ ] Environment variables configured
- [ ] MCP servers available (context7, sequential-thinking)
- [ ] Agent task definitions clear
- [ ] Dependencies mapped
- [ ] Output directories created

### 2. Agent Launch Sequence

**Phase 1: Analysis & Setup (Parallel)**
```
Launch:
- Agent 1: Content Extraction & Analysis
- Agent 4 (partial): Quartz basic setup
```

**Phase 2: Content Processing (Sequential)**
```
After Agent 1 completes:
- Agent 2: Scraping & Conversion

After Agent 2 starts:
- Agent 3: Asset Management (can start once URLs known)
```

**Phase 3: Integration (Sequential)**
```
After Agents 2 & 3 complete:
- Agent 4: Complete Quartz configuration with content
```

**Phase 4: Deployment (Sequential)**
```
After Agent 4 completes:
- Agent 5: Testing & Deployment
```

### 3. Monitoring & Coordination

**Track Progress:**
- Monitor each agent's completion status
- Review deliverables as completed
- Identify blockers early
- Adjust plan if needed

**Integration Points:**
- Merge Agent 1 inventory → Agent 2 scraping targets
- Merge Agent 2 content → Agent 4 Quartz integration
- Merge Agent 3 assets → Agent 4 Quartz integration
- Pass all outputs → Agent 5 for testing

**Communication:**
- Each agent reports completion status
- Each agent documents issues encountered
- Each agent provides recommendations for next steps

### 4. Quality Control

Review each deliverable:
- Completeness (all tasks done?)
- Accuracy (correct implementation?)
- Documentation (clear and detailed?)
- Issues flagged (problems identified?)

### 5. Final Integration

- Combine all agent outputs
- Resolve any conflicts
- Final build test
- Final deployment
- Post-deployment verification

---

## Risk Mitigation

### High-Risk Areas

**1. Site Access**
- **Risk:** crpg.info blocks scraping
- **Mitigation:** Multiple extraction methods prepared, contact site owner option

**2. Content Volume**
- **Risk:** More content than estimated
- **Mitigation:** Incremental processing, prioritize critical pages

**3. Asset Size**
- **Risk:** Large files exceed GitHub limits
- **Mitigation:** Git LFS, external CDN, compression

**4. Build Failures**
- **Risk:** Quartz build errors with migrated content
- **Mitigation:** Incremental testing, content validation, fallback formats

**5. Link Breakage**
- **Risk:** Internal links break during conversion
- **Mitigation:** Link verification tool, systematic testing, redirect handling

---

## Tools & Resources

### Required Tools

| Tool | Purpose | Installation |
|------|---------|--------------|
| Node.js v22+ | Quartz runtime | https://nodejs.org |
| npm | Package management | Included with Node.js |
| Git | Version control | https://git-scm.com |
| Docker (optional) | Firecrawl hosting | https://docker.com |
| Python 3.8+ | Scraping scripts | https://python.org |

### Recommended Tools

| Tool | Purpose | Link |
|------|---------|------|
| Firecrawl | Web scraping | https://github.com/mendableai/firecrawl |
| MarkItDown | HTML to Markdown | https://github.com/microsoft/markitdown |
| html2text | HTML conversion | `pip install html2text` |
| Pandoc | Document conversion | https://pandoc.org |
| ImageMagick | Image processing | https://imagemagick.org |
| Lighthouse | Performance testing | Chrome DevTools |

### MCP Servers

- **context7**: Real-time documentation for Quartz, GitHub
- **sequential-thinking**: Complex problem solving

### Documentation References

- Quartz v4 Docs: https://quartz.jzhao.xyz/
- GitHub Pages Docs: https://docs.github.com/pages
- WordPress Export: https://wordpress.org/support/article/tools-export-screen/

---

## Timeline Estimate

| Phase | Duration | Agents |
|-------|----------|---------|
| Phase 1: Analysis | 2-3 hours | Agent 1, Agent 4 (partial) |
| Phase 2: Content Processing | 4-6 hours | Agent 2, Agent 3 |
| Phase 3: Integration | 2-3 hours | Agent 4 |
| Phase 4: Deployment | 3-4 hours | Agent 5 |
| **Total Sequential** | 11-16 hours | - |
| **Total Parallel (estimated)** | 7-10 hours | All |

**Efficiency Gain:** 40-60% time savings through parallelization

---

## Success Metrics

### Completion Criteria

- [ ] All crpg.info pages archived (100% coverage)
- [ ] All assets downloaded and optimized
- [ ] Quartz builds successfully
- [ ] All Quartz features functional
- [ ] GitHub Pages deployed and live
- [ ] Lighthouse score > 90
- [ ] All links functional (0 broken links)
- [ ] Mobile responsive verified
- [ ] Search functional
- [ ] Documentation complete

### Quality Standards

- Content accuracy: 100%
- Asset preservation: 100%
- Link functionality: 100%
- Performance score: 90+
- Accessibility score: 90+
- SEO score: 90+

---

## Post-Deployment

### Handoff Documentation

Create for site maintainers:
1. Content update guide
2. Markdown formatting reference
3. Asset management guide
4. Deployment process
5. Troubleshooting guide

### Maintenance Plan

- Regular content updates via Git
- Automated deployment via GitHub Actions
- Periodic dependency updates
- Backup strategy (Git history + exports)
- Monitoring setup (uptime, analytics)

---

## Appendix

### Agent Communication Protocol

Each agent should provide:
1. **Status Updates:** Regular progress reports
2. **Completion Report:** Final summary of work done
3. **Issue Log:** Problems encountered and solutions
4. **Recommendations:** Suggestions for improvement
5. **Handoff Notes:** Information for next agent

### File Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docs/
│   ├── agent1/
│   ├── agent2/
│   ├── agent3/
│   ├── agent4/
│   └── agent5/
├── quartz/
│   ├── content/
│   ├── quartz/
│   ├── quartz.config.ts
│   └── quartz.layout.ts
├── claudable/
├── firecrawl/
├── AGENT_ORCHESTRATION_GUIDE.md (this file)
├── IMPLEMENTATION_PLAN.md
└── README.md
```

---

**End of Orchestration Guide**
**Version:** 1.0
**Last Updated:** October 25, 2025
