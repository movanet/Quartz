# Developer Guide - Quartz Development

A comprehensive guide for developers working on the crpg.info Quartz site.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Running Quartz Locally](#running-quartz-locally)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Theme Customization](#theme-customization)
- [Adding New Features](#adding-new-features)
- [Build Process](#build-process)
- [Troubleshooting](#troubleshooting)
- [Advanced Topics](#advanced-topics)

---

## Prerequisites

### Required Software

1. **Node.js** (v22 or higher)
   ```bash
   node --version  # Should be v22+
   ```

2. **npm** (v10.9.2 or higher)
   ```bash
   npm --version  # Should be v10.9.2+
   ```

3. **Git**
   ```bash
   git --version
   ```

### Recommended Tools

- **VS Code** with extensions:
  - Markdown All in One
  - ESLint
  - Prettier
  - Git Graph
- **GitHub CLI** for repository management
- **Terminal** (WSL for Windows, native for macOS/Linux)

---

## Local Development Setup

### Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd Quartz/quartz

# Install dependencies
npm install
```

### Verify Installation

```bash
# Check Quartz CLI is available
npx quartz --version
```

### Project Layout

```
Quartz/
├── quartz/                 # Main Quartz installation
│   ├── content/           # Your markdown content
│   ├── quartz/            # Quartz source code
│   │   ├── components/    # React components
│   │   ├── plugins/       # Content processors
│   │   └── styles/        # CSS and styling
│   ├── public/            # Build output
│   ├── quartz.config.ts   # Main configuration
│   ├── quartz.layout.ts   # Layout configuration
│   └── package.json       # Dependencies
├── docs/                  # Project documentation
└── scrape_crpg.py        # Content scraping tool
```

---

## Running Quartz Locally

### Development Server

Start the development server with live reload:

```bash
# Navigate to quartz directory
cd /home/user/Quartz/quartz

# Start development server
npx quartz build --serve
```

The site will be available at `http://localhost:8080`

### Command Options

```bash
# Build without serving
npx quartz build

# Serve with custom port
npx quartz build --serve --port 3000

# Build specific directory
npx quartz build --directory custom-content/

# Clean build
rm -rf public/
npx quartz build --serve
```

### Watch Mode

In development mode, Quartz watches for file changes and automatically rebuilds:

- Edit files in `content/`
- Save changes
- Refresh browser to see updates

---

## Project Structure

### Content Directory

```
content/
├── index.md              # Homepage
├── assets/               # Images, files
│   ├── images/
│   ├── pdfs/
│   └── downloads/
└── crpg/                 # Main content
    ├── reviews/
    ├── guides/
    └── news/
```

### Source Code Structure

```
quartz/
├── cfg.ts                # Type definitions
├── cli/                  # Command-line interface
├── components/           # React components
│   ├── ArticleTitle.tsx
│   ├── Explorer.tsx
│   ├── Graph.tsx
│   └── ...
├── plugins/              # Content transformers
│   ├── transformers/     # Markdown processors
│   ├── filters/          # Content filters
│   └── emitters/         # Output generators
├── styles/               # CSS styles
│   ├── base.scss
│   ├── variables.scss
│   └── custom.scss
└── util/                 # Utility functions
```

---

## Configuration

### Main Configuration (quartz.config.ts)

Located at `/home/user/Quartz/quartz/quartz.config.ts`

```typescript
const config: QuartzConfig = {
  configuration: {
    // Site metadata
    pageTitle: "CRPG.info",
    pageTitleSuffix: " | Classic RPG Resource",
    enableSPA: true,
    enablePopovers: true,

    // Analytics
    analytics: {
      provider: "plausible",
      // or "google" with tagId: "G-XXXXXXXXXX"
    },

    // Localization
    locale: "en-US",

    // Base URL for GitHub Pages
    baseUrl: "username.github.io/crpg-info",

    // Ignore patterns
    ignorePatterns: ["private", "templates", ".obsidian"],

    // Date handling
    defaultDateType: "modified",

    // Theme configuration
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },

  // Plugins configuration
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown(),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks(),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
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
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}
```

### Layout Configuration (quartz.layout.ts)

Located at `/home/user/Quartz/quartz/quartz.layout.ts`

```typescript
// Components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "GitHub": "https://github.com/your-org/crpg-info",
      "About": "/about",
      "Contact": "/contact",
    },
  }),
}

// Layout for individual content pages
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
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// Layout for list pages (tags, folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta()
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer(),
  ],
  right: [],
}
```

---

## Theme Customization

### Customizing Colors

Edit `quartz.config.ts` to change color schemes:

```typescript
theme: {
  colors: {
    lightMode: {
      light: "#ffffff",      // Background
      lightgray: "#e0e0e0",  // Borders
      gray: "#b0b0b0",       // Secondary text
      darkgray: "#404040",   // Primary text
      dark: "#1a1a1a",       // Headings
      secondary: "#3b82f6",  // Links
      tertiary: "#10b981",   // Accents
      highlight: "rgba(59, 130, 246, 0.15)",
      textHighlight: "#fef3c7",
    },
    darkMode: {
      light: "#1a1a1a",
      lightgray: "#2d2d2d",
      gray: "#646464",
      darkgray: "#d0d0d0",
      dark: "#ffffff",
      secondary: "#60a5fa",
      tertiary: "#34d399",
      highlight: "rgba(96, 165, 250, 0.15)",
      textHighlight: "#854d0e",
    },
  },
}
```

### Custom CSS

Create custom styles:

1. Create `quartz/styles/custom.scss`
2. Add your custom CSS:

```scss
// Custom styles for CRPG.info

.article-title {
  font-size: 2.5rem;
  color: var(--dark);
  margin-bottom: 1rem;
}

.game-card {
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

// Custom tag colors
.tag {
  background: var(--secondary);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}
```

3. Import in `quartz/styles/base.scss`:

```scss
@import "custom.scss";
```

### Custom Fonts

Using Google Fonts (default):

```typescript
typography: {
  header: "Playfair Display",
  body: "Open Sans",
  code: "Fira Code",
}
```

Using custom fonts:

1. Place font files in `quartz/static/fonts/`
2. Update configuration:

```typescript
theme: {
  fontOrigin: "local",
  // Font paths will be loaded from static/fonts/
}
```

---

## Adding New Features

### Creating Custom Components

1. Create a new component file in `quartz/components/`:

```typescript
// quartz/components/GameCard.tsx
import { QuartzComponentConstructor } from "./types"

export default (() => {
  function GameCard() {
    return (
      <div class="game-card">
        <h3>Game Title</h3>
        <p>Description</p>
      </div>
    )
  }

  return GameCard
}) satisfies QuartzComponentConstructor
```

2. Register in `quartz/components/index.ts`:

```typescript
export { default as GameCard } from "./GameCard"
```

3. Use in layout:

```typescript
import * as Component from "./quartz/components"

// Add to layout
beforeBody: [
  Component.GameCard(),
  // ... other components
]
```

### Creating Custom Plugins

Plugins process content during build. Create in `quartz/plugins/`:

```typescript
// Example: Add reading time
import { QuartzTransformerPlugin } from "../types"

export const ReadingTime: QuartzTransformerPlugin = () => {
  return {
    name: "ReadingTime",
    markdownPlugins() {
      return [
        () => {
          return (tree, file) => {
            // Calculate reading time
            const text = file.value.toString()
            const words = text.split(/\s+/).length
            const readingTime = Math.ceil(words / 200)

            // Add to frontmatter
            file.data.frontmatter = {
              ...file.data.frontmatter,
              readingTime,
            }
          }
        },
      ]
    },
  }
}
```

### Adding Search Providers

Quartz uses FlexSearch by default. To customize:

```typescript
// In quartz.config.ts
plugins: {
  emitters: [
    Plugin.ContentIndex({
      enableSiteMap: true,
      enableRSS: true,
      rssLimit: 20,
      rssFullHtml: false,
      includeEmptyFiles: false,
    }),
  ]
}
```

---

## Build Process

### Build Pipeline

1. **Content Loading**: Read markdown files from `content/`
2. **Transformation**: Apply transformer plugins
3. **Filtering**: Apply filter plugins (e.g., remove drafts)
4. **Emission**: Generate HTML, CSS, JS via emitter plugins
5. **Output**: Write to `public/` directory

### Build Commands

```bash
# Development build with watch
npx quartz build --serve

# Production build
npx quartz build

# Build with profiling
npm run profile

# Check TypeScript types
npm run check

# Format code
npm run format
```

### Build Optimization

**Speed up builds:**

1. Disable OG Images for development:
   ```typescript
   // In quartz.config.ts
   emitters: [
     // Comment out for faster builds
     // Plugin.CustomOgImages(),
   ]
   ```

2. Use concurrency:
   ```bash
   npx quartz build --concurrency=4
   ```

3. Reduce content size during development

**Production builds:**

```bash
# Clean build
rm -rf public/ .quartz-cache/
npx quartz build

# Verify output
ls -lh public/
```

---

## Troubleshooting

### Common Issues

#### "Module not found" errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build fails with TypeScript errors

```bash
# Check for type errors
npx tsc --noEmit

# Update TypeScript
npm update typescript
```

#### Links not resolving correctly

Check `quartz.config.ts`:
```typescript
Plugin.CrawlLinks({
  markdownLinkResolution: "shortest"  // or "absolute", "relative"
})
```

#### Images not loading

1. Verify image paths are correct
2. Check images are in `content/assets/`
3. Ensure file permissions are correct
4. Verify build includes assets:
   ```typescript
   emitters: [
     Plugin.Assets(),
     Plugin.Static(),
   ]
   ```

#### Styles not applying

1. Clear browser cache (Ctrl+Shift+R)
2. Check custom CSS syntax
3. Rebuild from scratch:
   ```bash
   rm -rf public/ .quartz-cache/
   npx quartz build --serve
   ```

#### Port already in use

```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Or use different port
npx quartz build --serve --port 3000
```

### Debug Mode

Enable verbose logging:

```bash
# Set debug environment variable
DEBUG=quartz:* npx quartz build --serve
```

### Performance Issues

**Slow builds:**

1. Check content size:
   ```bash
   find content/ -type f | wc -l
   ```

2. Profile the build:
   ```bash
   npm run profile
   ```

3. Optimize images
4. Reduce plugin count

**Slow page loads:**

1. Check network tab in browser DevTools
2. Optimize images
3. Enable CDN caching:
   ```typescript
   theme: {
     cdnCaching: true
   }
   ```

---

## Advanced Topics

### Git Integration

Quartz uses git for date metadata:

```typescript
Plugin.CreatedModifiedDate({
  priority: ["frontmatter", "git", "filesystem"],
})
```

This reads commit dates. Ensure git history is available.

### Custom Build Scripts

Create custom npm scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "npx quartz build --serve",
    "build": "npx quartz build",
    "clean": "rm -rf public/ .quartz-cache/",
    "rebuild": "npm run clean && npm run build",
    "preview": "npx quartz build --serve --port 3000"
  }
}
```

### Content API

Access processed content programmatically:

```typescript
// In a custom component
import { QuartzComponent, QuartzComponentProps } from "./types"

const RecentPosts: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
  const recentPosts = allFiles
    .filter(file => file.frontmatter?.tags?.includes("news"))
    .sort((a, b) => b.dates.modified - a.dates.modified)
    .slice(0, 5)

  return (
    <div>
      <h3>Recent News</h3>
      <ul>
        {recentPosts.map(post => (
          <li key={post.slug}>
            <a href={post.slug}>{post.frontmatter?.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Testing

Create test scripts:

```bash
# Test build completes
npm run build && echo "Build successful" || echo "Build failed"

# Test links
npx markdown-link-check content/**/*.md

# Test HTML validation
npx html-validate public/**/*.html
```

### CI/CD Integration

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for GitHub Actions setup.

---

## Development Workflow

### Recommended Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-component
   ```

2. **Make changes**
   - Edit configuration
   - Create components
   - Update styles

3. **Test locally**
   ```bash
   npx quartz build --serve
   ```

4. **Commit changes**
   ```bash
   git add .
   git commit -m "Add new component"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/new-component
   ```

### Code Style

Run Prettier before committing:

```bash
npm run format
```

### Version Control

**What to commit:**
- Source files (`quartz/`, `content/`)
- Configuration files
- Documentation

**What to ignore (already in .gitignore):**
- `node_modules/`
- `public/`
- `.quartz-cache/`
- `.DS_Store`

---

## Resources

- [Quartz Documentation](https://quartz.jzhao.xyz)
- [Quartz GitHub](https://github.com/jackyzha0/quartz)
- [Obsidian Flavored Markdown](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Preact Documentation](https://preactjs.com/)

---

**Last Updated**: 2025-10-24
