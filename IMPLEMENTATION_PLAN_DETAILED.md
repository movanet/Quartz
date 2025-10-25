# Detailed Implementation Plan: CRPG.info Archive & Migration

**Project:** Archive crpg.info to GitHub Pages using Quartz v4
**Date:** October 25, 2025
**Status:** Ready for Implementation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Phase 1: Site Analysis](#phase-1-site-analysis)
4. [Phase 2: Content Extraction](#phase-2-content-extraction)
5. [Phase 3: Asset Management](#phase-3-asset-management)
6. [Phase 4: Quartz Configuration](#phase-4-quartz-configuration)
7. [Phase 5: Testing & QA](#phase-5-testing--qa)
8. [Phase 6: Deployment](#phase-6-deployment)
9. [Phase 7: Maintenance](#phase-7-maintenance)

---

## Project Overview

### Objectives

Archive the entire crpg.info (Center for Regulation, Policy and Governance) WordPress website and republish it as a fast, modern static site using Quartz v4 on GitHub Pages.

### Current State

**Source Site:**
- URL: https://crpg.info
- CMS: WordPress 4.9.26
- Theme: OceanWP
- Hosting: Cloudflare
- Content Types: Homepage, Research Papers, Blog Posts, Events, Programs, Knowledge Base
- Additional Sites: blog.crpg.info, knowledge.crpg.info

**Target Site:**
- Platform: GitHub Pages
- Generator: Quartz v4
- Format: Markdown with YAML frontmatter
- Hosting: github.io or custom domain

### Benefits

| Aspect | Current (WordPress) | Future (Quartz) |
|--------|-------------------|-----------------|
| Hosting Cost | $X/month | Free (GitHub Pages) |
| Security | WordPress vulnerabilities | Static (inherently secure) |
| Performance | 2-3 sec load | 100-300ms load |
| Maintenance | Regular updates needed | Minimal |
| Version Control | Limited | Full Git history |
| Editing | Web interface only | Git + any editor |

---

## Technical Stack

### Core Technologies

**Static Site Generator:**
- Quartz v4.5.2+
- Built with Node.js and TypeScript
- Features: Search, graph view, backlinks, TOC

**Content Format:**
- Markdown (CommonMark + GFM)
- YAML frontmatter for metadata
- Support for LaTeX, Mermaid diagrams

**Hosting & Deployment:**
- GitHub Pages
- GitHub Actions CI/CD
- Custom domain support

**Development Tools:**
- Node.js v22+
- npm v10.9.2+
- Git

### Archiving Tools

**Option 1: WordPress Export (Recommended)**
- WordPress WXR (eXtended RSS) export
- Tools: WP-CLI, WordPress Admin Export
- Parser: Python XML parser + Markdown converter

**Option 2: Firecrawl Self-Hosted**
- Docker container for Firecrawl
- Intelligent web scraping
- Built-in Markdown conversion

**Option 3: MarkItDown**
- Microsoft's HTML to Markdown tool
- Local conversion tool
- Good for supplemental pages

**Option 4: Custom Python Scraper**
- Based on existing `scrape_crpg.py`
- BeautifulSoup for parsing
- html2text for conversion

---

## Phase 1: Site Analysis

### 1.1 Discover Site Structure

**Objective:** Map complete site structure

**Method 1: Sitemap Analysis**
```bash
# Check for sitemap.xml
curl https://crpg.info/sitemap.xml

# If available, parse it
curl https://crpg.info/sitemap.xml | grep -o '<loc>[^<]*</loc>' | sed 's/<\/*loc>//g' > urls.txt
```

**Method 2: WordPress API**
```bash
# Get all posts
curl https://crpg.info/wp-json/wp/v2/posts

# Get all pages
curl https://crpg.info/wp-json/wp/v2/pages

# Get categories
curl https://crpg.info/wp-json/wp/v2/categories

# Get tags
curl https://crpg.info/wp-json/wp/v2/tags
```

**Method 3: Manual Crawling**
```python
# Use scrape_crpg.py to discover URLs
# Start from homepage and follow links
python scrape_crpg.py --discover-only
```

**Deliverable:** `SITE_STRUCTURE_ANALYSIS.md`

### 1.2 Content Inventory

**Create inventory with:**
- URL
- Title
- Content Type (page, post, research, event)
- Author
- Date published/modified
- Categories/Tags
- Media assets referenced
- Estimated word count

**Tool: Python Script**
```python
import requests
from bs4 import BeautifulSoup
import pandas as pd

def create_inventory(base_url):
    pages = []
    # Fetch all pages via API or crawling
    # Extract metadata
    # Create DataFrame
    df = pd.DataFrame(pages)
    df.to_csv('content_inventory.csv', index=False)
```

**Deliverable:** `content_inventory.csv`

### 1.3 Asset Inventory

**Identify all assets:**
- Images (JPG, PNG, GIF, SVG)
- PDFs
- Downloadable files (CSV, DOCX, etc.)
- Videos (if any)

**Method:**
```bash
# Find all image URLs
curl -s https://crpg.info | grep -oP 'src="https://crpg.info/[^"]*\.(jpg|png|gif|svg)"'

# Find all PDF links
curl -s https://crpg.info | grep -oP 'href="https://crpg.info/[^"]*\.pdf"'
```

**Deliverable:** `asset_inventory.csv`

### 1.4 Define Content Types

**Based on site analysis, define types:**

1. **Homepage** - Landing page
2. **Research Papers** - Academic publications
3. **Blog Posts** - News and updates
4. **Event Pages** - Conferences, workshops
5. **Program Pages** - AIIRA, consultancy, etc.
6. **About Pages** - Profile, team, contact
7. **Knowledge Base** - Legislation, policy resources

For each type, create:
- Frontmatter template
- Directory structure plan
- Special handling notes

**Deliverable:** `CONTENT_TYPES.md`, `frontmatter_templates/`

---

## Phase 2: Content Extraction

### 2.1 Choose Extraction Method

**Decision Tree:**

```
Do you have WordPress admin access?
├─ YES → Use WordPress Export (WXR)
│  └─ Export via Tools → Export
│
└─ NO → Can you scrape the site?
   ├─ YES → Use Firecrawl or custom scraper
   │  ├─ Many pages (500+) → Firecrawl
   │  └─ Fewer pages → Custom Python scraper
   │
   └─ NO → Contact site owner
      └─ Request export file
```

### 2.2 Option A: WordPress WXR Export

**Step 1: Get Export File**

If you have admin access:
1. Log in to WordPress admin
2. Tools → Export
3. Select "All content"
4. Download WXR file

If requesting from owner:
- Use template from `SITE_OWNER_GUIDE.md`
- Request full export including media

**Step 2: Parse WXR File**

```python
import xml.etree.ElementTree as ET
import html2text
from datetime import datetime

def parse_wxr(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    h = html2text.HTML2Text()
    h.body_width = 0

    posts = []
    for item in root.findall('.//item'):
        post_type = item.find('{http://wordpress.org/export/1.2/}post_type').text

        if post_type in ['post', 'page']:
            title = item.find('title').text
            content_html = item.find('{http://purl.org/rss/1.0/modules/content/}encoded').text
            content_md = h.handle(content_html)

            date = item.find('pubDate').text
            # Parse date to YYYY-MM-DD

            # Extract custom fields, categories, tags

            posts.append({
                'title': title,
                'content': content_md,
                'date': date,
                # ... more fields
            })

    return posts
```

**Step 3: Generate Markdown Files**

```python
def save_as_markdown(post, output_dir):
    filename = f"{post['date']}-{slugify(post['title'])}.md"
    filepath = output_dir / filename

    frontmatter = f"""---
title: "{post['title']}"
date: {post['date']}
categories: {post['categories']}
tags: {post['tags']}
source_url: "{post['url']}"
migrated_from: "wordpress"
---

"""

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(frontmatter + post['content'])
```

### 2.3 Option B: Firecrawl Setup

**Step 1: Install Firecrawl with Docker**

```bash
# Clone firecrawl (already in submodule)
cd firecrawl

# Start with Docker Compose
docker-compose up -d

# Verify it's running
curl http://localhost:3002/health
```

**Step 2: Configure Firecrawl**

```javascript
// firecrawl_config.js
{
  url: "https://crpg.info",
  crawlerOptions: {
    includes: ["crpg.info/*"],
    excludes: [
      "*/feed/",
      "*/wp-admin/",
      "*/wp-includes/",
      "*/wp-json/"
    ],
    maxDepth: 5,
    limit: 1000
  },
  pageOptions: {
    onlyMainContent: true,
    includeHtml: false,
    includeMarkdown: true
  }
}
```

**Step 3: Run Scraping**

```bash
# Using Firecrawl API
curl -X POST http://localhost:3002/v0/crawl \
  -H "Content-Type: application/json" \
  -d @firecrawl_config.json

# Monitor progress
curl http://localhost:3002/v0/crawl/{job_id}

# Download results
curl http://localhost:3002/v0/crawl/{job_id}/download > crpg_content.json
```

**Step 4: Process Firecrawl Output**

```python
import json

with open('crpg_content.json') as f:
    pages = json.load(f)

for page in pages:
    # Extract metadata from page
    # Add frontmatter
    # Save as Markdown
    pass
```

### 2.4 Option C: Custom Python Scraper

**Enhance existing `scrape_crpg.py`:**

```python
#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import html2text
from pathlib import Path
import time
import json
from urllib.parse import urljoin, urlparse
from datetime import datetime

class EnhancedCRPGScraper:
    def __init__(self, base_url, output_dir):
        self.base_url = base_url
        self.output_dir = Path(output_dir)
        self.visited_urls = set()
        self.session = self._create_session()
        self.h = html2text.HTML2Text()
        self.h.body_width = 0

    def _create_session(self):
        session = requests.Session()
        session.headers.update({
            'User-Agent': 'Mozilla/5.0 (compatible; ArchiveBot/1.0)',
        })
        return session

    def extract_metadata(self, soup, url):
        """Extract metadata from WordPress page"""
        metadata = {
            'source_url': url,
            'migrated_from': 'wordpress'
        }

        # Title
        title_tag = soup.find('meta', property='og:title')
        metadata['title'] = title_tag['content'] if title_tag else soup.title.string

        # Description
        desc_tag = soup.find('meta', property='og:description')
        if desc_tag:
            metadata['description'] = desc_tag['content']

        # Date published (WordPress specific)
        date_tag = soup.find('meta', property='article:published_time')
        if date_tag:
            metadata['date'] = date_tag['content'][:10]  # YYYY-MM-DD

        # Date modified
        modified_tag = soup.find('meta', property='article:modified_time')
        if modified_tag:
            metadata['lastmod'] = modified_tag['content'][:10]

        # Author
        author_tag = soup.find('meta', property='article:author')
        if author_tag:
            metadata['author'] = author_tag['content']

        # Categories/Tags
        categories = []
        for tag in soup.find_all('a', rel='category tag'):
            categories.append(tag.text)
        if categories:
            metadata['categories'] = categories

        return metadata

    def extract_main_content(self, soup):
        """Extract main content, removing navigation, sidebars, etc."""
        # Try to find main content area
        content = None

        # Common content selectors for WordPress
        selectors = [
            'article.post',
            'div.entry-content',
            'div.post-content',
            'main',
            'div[role="main"]'
        ]

        for selector in selectors:
            content = soup.select_one(selector)
            if content:
                break

        if not content:
            content = soup.body

        # Remove unwanted elements
        for element in content.find_all(['script', 'style', 'nav', 'footer', 'aside']):
            element.decompose()

        return str(content)

    def save_page(self, url, html_content, metadata):
        """Save page as Markdown with frontmatter"""
        # Create filename from URL
        parsed = urlparse(url)
        path = parsed.path.strip('/')

        if not path:
            filename = 'index.md'
        else:
            # Create directory structure based on URL
            parts = path.split('/')
            if len(parts) > 1:
                dir_path = self.output_dir / '/'.join(parts[:-1])
                dir_path.mkdir(parents=True, exist_ok=True)
                filename = f"{parts[-1]}.md"
                filepath = dir_path / filename
            else:
                filename = f"{path}.md"
                filepath = self.output_dir / filename

        # Convert HTML to Markdown
        markdown_content = self.h.handle(html_content)

        # Create frontmatter
        frontmatter_lines = ['---']
        for key, value in metadata.items():
            if isinstance(value, list):
                frontmatter_lines.append(f"{key}:")
                for item in value:
                    frontmatter_lines.append(f"  - {item}")
            else:
                frontmatter_lines.append(f'{key}: "{value}"')
        frontmatter_lines.append('---\n')
        frontmatter = '\n'.join(frontmatter_lines)

        # Save file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(frontmatter + markdown_content)

        print(f"✓ Saved: {filepath}")
        return filepath

    def scrape_page(self, url):
        """Scrape a single page"""
        if url in self.visited_urls:
            return []

        print(f"Scraping: {url}")
        self.visited_urls.add(url)

        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
        except Exception as e:
            print(f"✗ Error: {e}")
            return []

        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract metadata
        metadata = self.extract_metadata(soup, url)

        # Extract main content
        content_html = self.extract_main_content(soup)

        # Save page
        self.save_page(url, content_html, metadata)

        # Find new links
        links = self._extract_links(soup, url)

        # Be polite
        time.sleep(1)

        return links

    def scrape_site(self, start_urls=None, max_pages=500):
        """Scrape entire site"""
        if start_urls is None:
            start_urls = [self.base_url]

        to_visit = start_urls.copy()
        pages_scraped = 0

        while to_visit and pages_scraped < max_pages:
            url = to_visit.pop(0)
            new_links = self.scrape_page(url)
            to_visit.extend(new_links)
            pages_scraped += 1

            # Progress update every 10 pages
            if pages_scraped % 10 == 0:
                print(f"\nProgress: {pages_scraped} pages scraped, {len(to_visit)} in queue\n")

        print(f"\n✓ Scraping complete!")
        print(f"  Pages scraped: {pages_scraped}")
        print(f"  Output: {self.output_dir}")

# Usage
if __name__ == "__main__":
    scraper = EnhancedCRPGScraper(
        base_url="https://crpg.info",
        output_dir="./quartz/content/crpg"
    )
    scraper.scrape_site(max_pages=500)
```

### 2.5 Content Post-Processing

**After extraction, process content:**

1. **Fix Image Paths**
```python
import re

def fix_image_paths(markdown_content):
    # Replace absolute URLs with relative paths
    pattern = r'!\[([^\]]*)\]\(https://crpg\.info/wp-content/uploads/([^)]+)\)'
    replacement = r'![\1](/assets/images/\2)'
    return re.sub(pattern, replacement, markdown_content)
```

2. **Fix Internal Links**
```python
def fix_internal_links(markdown_content):
    # Convert WordPress URLs to Markdown paths
    pattern = r'\[([^\]]+)\]\(https://crpg\.info/([^)]+)/\)'
    replacement = r'[[\2|\1]]'  # Quartz wiki-link format
    return re.sub(pattern, replacement, markdown_content)
```

3. **Clean Up HTML Artifacts**
```python
def clean_html_artifacts(markdown_content):
    # Remove common HTML artifacts that survived conversion
    artifacts = [
        r'&nbsp;',
        r'&hellip;',
        r'<!\-\-.*?\-\->',  # HTML comments
    ]
    for artifact in artifacts:
        markdown_content = re.sub(artifact, '', markdown_content)
    return markdown_content
```

4. **Validate Frontmatter**
```python
import yaml

def validate_frontmatter(filepath):
    with open(filepath) as f:
        content = f.read()

    if content.startswith('---'):
        parts = content.split('---', 2)
        try:
            frontmatter = yaml.safe_load(parts[1])
            return True
        except:
            return False
    return False
```

---

## Phase 3: Asset Management

### 3.1 Download All Assets

**Method 1: From Asset Inventory**
```bash
# Read asset_inventory.csv and download each
while IFS=, read -r url local_path; do
    mkdir -p "$(dirname "$local_path")"
    wget -O "$local_path" "$url"
    sleep 0.5
done < asset_inventory.csv
```

**Method 2: Automated from Markdown**
```python
import re
import requests
from pathlib import Path
from urllib.parse import urlparse

def download_assets_from_markdown(content_dir, asset_dir):
    """Scan all Markdown files and download referenced assets"""
    asset_urls = set()

    # Find all Markdown files
    md_files = Path(content_dir).rglob('*.md')

    for md_file in md_files:
        with open(md_file) as f:
            content = f.read()

        # Find image URLs
        images = re.findall(r'!\[.*?\]\((https://crpg\.info/[^)]+)\)', content)
        asset_urls.update(images)

        # Find PDF links
        pdfs = re.findall(r'\[.*?\]\((https://crpg\.info/[^)]+\.pdf)\)', content)
        asset_urls.update(pdfs)

    # Download each asset
    for url in asset_urls:
        download_asset(url, asset_dir)

def download_asset(url, base_dir):
    """Download a single asset"""
    parsed = urlparse(url)
    path_parts = parsed.path.strip('/').split('/')

    # Recreate directory structure
    if 'wp-content/uploads' in path_parts:
        idx = path_parts.index('uploads')
        rel_path = '/'.join(path_parts[idx+1:])
        local_path = Path(base_dir) / rel_path
    else:
        local_path = Path(base_dir) / path_parts[-1]

    local_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        with open(local_path, 'wb') as f:
            f.write(response.content)
        print(f"✓ Downloaded: {local_path}")
    except Exception as e:
        print(f"✗ Error downloading {url}: {e}")
```

### 3.2 Optimize Assets

**Image Optimization:**
```bash
# Install tools
sudo apt install imagemagick optipng jpegoptim

# Optimize JPGs
find ./assets/images -name "*.jpg" -exec jpegoptim --max=85 {} \;

# Optimize PNGs
find ./assets/images -name "*.png" -exec optipng -o2 {} \;

# Resize large images
find ./assets/images -name "*.jpg" -exec convert {} -resize '1920x1920>' {} \;
```

**PDF Compression:**
```bash
# Compress PDFs using Ghostscript
for pdf in ./assets/pdfs/**/*.pdf; do
    gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
       -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${pdf%.pdf}_compressed.pdf" "$pdf"
done
```

### 3.3 Update Asset References

**After downloading and reorganizing:**
```python
def update_asset_references(md_file, old_pattern, new_pattern):
    """Update asset paths in Markdown files"""
    with open(md_file) as f:
        content = f.read()

    updated = content.replace(old_pattern, new_pattern)

    with open(md_file, 'w') as f:
        f.write(updated)
```

---

## Phase 4: Quartz Configuration

### 4.1 Install and Setup

**Install Dependencies:**
```bash
cd quartz
npm install
```

**Verify Installation:**
```bash
# Should show Quartz CLI options
npx quartz --help
```

**Test Build:**
```bash
# Build the site
npx quartz build

# Serve locally
npx quartz build --serve
```

Visit http://localhost:8080 to view

### 4.2 Configure quartz.config.ts

**Main Configuration:**
```typescript
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "CRPG - Center for Regulation Policy and Governance",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "crpg.info",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Roboto Slab",
        body: "Roboto",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#e51d1d",  // CRPG brand red
          tertiary: "#ed6600",    // CRPG brand orange
          highlight: "rgba(229, 29, 29, 0.15)",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#ff5757",
          tertiary: "#ff9557",
          highlight: "rgba(255, 87, 87, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
```

### 4.3 Configure quartz.layout.ts

```typescript
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Header components
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      "About CRPG": "https://crpg.info/profile/",
      "Research": "https://crpg.info/research/",
      "Contact": "https://crpg.info/contact/",
    },
  }),
}

// Page-specific layouts
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
```

### 4.4 Custom Styling

**Create `quartz/quartz/styles/custom.scss`:**
```scss
// CRPG Custom Styles

// Brand colors
$crpg-red: #e51d1d;
$crpg-orange: #ed6600;
$crpg-dark: #2b2b2b;

// Header styling
.page-title {
  color: $crpg-red;
  font-weight: 700;
}

// Links
a {
  color: $crpg-red;

  &:hover {
    color: $crpg-orange;
  }
}

// Research paper styling
article.research-paper {
  .article-title {
    font-size: 2rem;
    color: $crpg-dark;
    margin-bottom: 1rem;
  }

  .authors {
    font-style: italic;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .publication-info {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 2rem;
  }
}

// Event page styling
.event-page {
  .event-date {
    display: inline-block;
    background: $crpg-red;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .event-location {
    color: #666;
    font-size: 0.95rem;
  }
}

// Footer customization
footer {
  background: $crpg-dark;
  color: white;

  a {
    color: $crpg-orange;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .research-paper .article-title {
    font-size: 1.5rem;
  }
}
```

### 4.5 Add Custom Components

**Logo Component (`quartz/components/Logo.tsx`):**
```typescript
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const Logo: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
    return (
      <div class={`logo ${displayClass ?? ""}`}>
        <a href="/">
          <img src="/static/logo.png" alt="CRPG Logo" />
        </a>
      </div>
    )
  }

  Logo.css = `
    .logo {
      margin-bottom: 1rem;
    }
    .logo img {
      max-width: 200px;
      height: auto;
    }
  `

  return Logo
}) satisfies QuartzComponentConstructor
```

---

## Phase 5: Testing & QA

### 5.1 Content Verification

**Automated Link Checking:**
```bash
# Install link checker
npm install -g broken-link-checker

# Check for broken links
blc http://localhost:8080 -ro --exclude "external"
```

**Markdown Validation:**
```bash
# Install markdownlint
npm install -g markdownlint-cli

# Check all markdown files
markdownlint 'quartz/content/**/*.md'
```

### 5.2 Performance Testing

**Lighthouse Audit:**
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:8080 --output html --output-path ./lighthouse-report.html
```

**Target Scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### 5.3 Cross-Browser Testing

**Test on:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

**Test features:**
- Search
- Graph view
- Dark mode toggle
- Navigation
- Backlinks
- Table of contents

---

## Phase 6: Deployment

### 6.1 GitHub Repository Setup

**Initialize Repository:**
```bash
cd /path/to/crpgwebsite
git add .
git commit -m "Initial commit: CRPG archive with Quartz"
git branch -M main
git remote add origin https://github.com/yourusername/crpg-archive.git
git push -u origin main
```

### 6.2 GitHub Actions Workflow

**Already exists:** `.github/workflows/deploy.yml`

Verify it's configured correctly for your repository.

### 6.3 GitHub Pages Configuration

1. Go to repository Settings
2. Navigate to Pages
3. Source: GitHub Actions
4. Custom domain: crpg.info (if applicable)
5. Enforce HTTPS: ✓

### 6.4 Custom Domain Setup

**Add CNAME file:**
```bash
echo "crpg.info" > quartz/quartz/static/CNAME
```

**DNS Configuration:**
```
Type  Name  Value
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

### 6.5 Deploy

```bash
# Push to trigger deployment
git push origin main

# Monitor GitHub Actions
# Go to Actions tab in GitHub repository
```

---

## Phase 7: Maintenance

### 7.1 Content Update Workflow

```bash
# 1. Create/edit Markdown file
vim quartz/content/new-article.md

# 2. Add frontmatter and content

# 3. Test locally
cd quartz
npx quartz build --serve

# 4. Commit and push
git add .
git commit -m "Add new article"
git push

# Automatic deployment via GitHub Actions
```

### 7.2 Regular Maintenance

**Monthly:**
- Update npm dependencies
- Check for broken links
- Review analytics

**Quarterly:**
- Update Quartz to latest version
- Security audit
- Performance review

### 7.3 Backup Strategy

- Git history (primary backup)
- Periodic full repository clones
- Export Markdown files separately
- Asset backups to external storage

---

## Appendix: Troubleshooting

### Common Issues

**Issue: Build fails with "Module not found"**
```bash
cd quartz
rm -rf node_modules package-lock.json
npm install
```

**Issue: Images not displaying**
- Check asset paths in Markdown
- Verify files in `quartz/quartz/static/` or `quartz/content/assets/`
- Check file permissions

**Issue: Search not working**
- Rebuild index: `npx quartz build`
- Clear browser cache
- Check console for JavaScript errors

**Issue: Deployment fails**
- Check GitHub Actions logs
- Verify Node.js version in workflow (should be 22+)
- Check for build errors locally first

---

## Summary

This implementation plan provides step-by-step technical instructions for archiving crpg.info and deploying it as a Quartz-powered static site. Follow the phases sequentially, use the provided code samples, and refer to the troubleshooting section as needed.

**Estimated Total Time:** 15-20 hours for complete migration

**Next Step:** Begin Phase 1 (Site Analysis) with Agent 1

---

**Version:** 1.0
**Last Updated:** October 25, 2025
**Status:** Ready for Implementation
