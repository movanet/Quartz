# Current Quartz Configuration Review

**Agent:** Agent 4 - Quartz Configuration Agent
**Date:** 2025-10-25
**Purpose:** Document existing configuration before CRPG customization

## Overview

This document reviews the default Quartz v4.5.2 configuration as initialized in the submodule, before applying CRPG-specific customization.

## Configuration Files Review

### 1. quartz.config.ts

**Location:** `D:\Obsidian\Apps\crpgwebsite\quartz\quartz.config.ts`

#### Current Settings

**Site Information:**
```typescript
pageTitle: "Quartz 4"
pageTitleSuffix: ""
baseUrl: "quartz.jzhao.xyz"
locale: "en-US"
```

**Analysis:**
- Default Quartz branding
- Generic base URL
- ❌ Needs CRPG customization

**Features:**
```typescript
enableSPA: true           // ✓ Keep - better UX
enablePopovers: true      // ✓ Keep - good for references
analytics: {
  provider: "plausible"   // ⚠️ Consider if needed
}
```

**Content Handling:**
```typescript
ignorePatterns: ["private", "templates", ".obsidian"]
defaultDateType: "modified"
```

**Analysis:**
- ✓ Good ignore patterns for Obsidian vault
- ⚠️ "modified" date may not be ideal for archive (prefer "created")

#### Theme Configuration

**Typography:**
```typescript
header: "Schibsted Grotesk"    // ⚠️ Modern, casual
body: "Source Sans Pro"        // ✓ Clean, readable
code: "IBM Plex Mono"          // ✓ Good choice
```

**Analysis:**
- "Schibsted Grotesk" is too casual for academic site
- Recommend "Merriweather" or "Lora" for professional look
- Body and code fonts are acceptable

**Colors - Light Mode:**
```typescript
light: "#faf8f8"           // Warm off-white
lightgray: "#e5e5e5"       // Standard gray
gray: "#b8b8b8"            // Medium gray
darkgray: "#4e4e4e"        // Dark gray
dark: "#2b2b2b"            // Near black
secondary: "#284b63"       // Navy blue
tertiary: "#84a59d"        // Sage green
highlight: "rgba(143, 159, 169, 0.15)"
textHighlight: "#fff23688"
```

**Analysis:**
- ❌ Color scheme doesn't match CRPG brand
- ❌ Secondary should be #e51d1d (CRPG Red)
- ❌ Tertiary should be #ed6600 (CRPG Orange)
- Neutral colors are acceptable

**Colors - Dark Mode:**
```typescript
light: "#161618"           // Very dark background
lightgray: "#393639"       // Lighter dark
gray: "#646464"            // Medium gray
darkgray: "#d4d4d4"        // Light text
dark: "#ebebec"            // Near white
secondary: "#7b97aa"       // Light blue
tertiary: "#84a59d"        // Sage green
highlight: "rgba(143, 159, 169, 0.15)"
textHighlight: "#b3aa0288"
```

**Analysis:**
- ❌ Brand colors need adjustment for dark mode
- Recommend lighter versions of CRPG colors

#### Plugin Configuration

**Transformers:** ✓ All appropriate for academic content
1. FrontMatter - Essential for metadata
2. CreatedModifiedDate - Good for tracking
3. SyntaxHighlighting - Useful for code examples
4. ObsidianFlavoredMarkdown - Vault compatibility
5. GitHubFlavoredMarkdown - Enhanced markdown
6. TableOfContents - Essential for long papers
7. CrawlLinks - Internal linking
8. Description - SEO and metadata
9. Latex - Academic math notation

**Filters:**
1. RemoveDrafts - ✓ Good for production

**Emitters:** ✓ Comprehensive set
1. AliasRedirects - URL management
2. ComponentResources - Asset handling
3. ContentPage - Main content
4. FolderPage - Archive browsing
5. TagPage - Categorization
6. ContentIndex - Search, sitemap, RSS
7. Assets - File handling
8. Static - Static files
9. Favicon - Branding
10. NotFoundPage - Error handling
11. CustomOgImages - Social sharing

**Analysis:**
- ✓ All plugins are appropriate for CRPG archive
- ✓ No changes needed to plugin configuration
- Consider: Custom plugins for CRPG-specific features later

### 2. quartz.layout.ts

**Location:** `D:\Obsidian\Apps\crpgwebsite\quartz\quartz.layout.ts`

#### Shared Components

**Header:** Empty
**Footer:**
```typescript
links: {
  GitHub: "https://github.com/jackyzha0/quartz"
  "Discord Community": "https://discord.gg/cRFFHYye7t"
}
```

**Analysis:**
- ❌ Footer links are for Quartz, not CRPG
- Need to replace with CRPG links

#### Content Page Layout

**Before Body:**
- ✓ Breadcrumbs (conditional - not on index)
- ✓ ArticleTitle
- ✓ ContentMeta
- ✓ TagList

**Left Sidebar:**
- ✓ PageTitle
- ✓ Spacer (mobile)
- ✓ Search
- ✓ Darkmode toggle
- ✓ ReaderMode toggle
- ✓ Explorer

**Right Sidebar:**
- ✓ Graph
- ✓ TableOfContents (desktop)
- ✓ Backlinks

**Analysis:**
- ✓ Excellent layout for academic content
- ✓ All essential components included
- ⚠️ May want to configure Explorer with custom settings
- ⚠️ Graph settings may need tuning for CRPG content

#### List Page Layout

**Before Body:**
- ✓ Breadcrumbs
- ✓ ArticleTitle
- ✓ ContentMeta

**Left Sidebar:**
- ✓ PageTitle
- ✓ Spacer (mobile)
- ✓ Search
- ✓ Darkmode toggle
- ✓ Explorer

**Right Sidebar:** Empty

**Analysis:**
- ✓ Clean, focused layout for list pages
- ✓ No changes needed

### 3. Style Files

**Location:** `D:\Obsidian\Apps\crpgwebsite\quartz\quartz\styles\`

#### custom.scss

**Current Content:**
```scss
@use "./base.scss";

// put your custom CSS here!
```

**Analysis:**
- ✓ Empty template ready for customization
- ✓ Perfect for CRPG branding

#### variables.scss

**Key Variables:**
```scss
$breakpoints: (
  mobile: 800px,
  desktop: 1200px
)

$sidePanelWidth: 320px
$topSpacing: 6rem
$boldWeight: 700
$semiBoldWeight: 600
$normalWeight: 400
```

**Analysis:**
- ✓ Reasonable defaults
- ✓ Responsive breakpoints appropriate
- ⚠️ May want to adjust sidePanelWidth for more content space

#### Other Style Files

**Examined:**
- base.scss - Core styling
- syntax.scss - Code highlighting
- callouts.scss - Obsidian callouts
- Component styles (search, toc, graph, etc.)

**Analysis:**
- ✓ Well-organized modular SCSS
- ✓ Component isolation is good
- ✓ Easy to override via custom.scss

## Content Directory

**Location:** `D:\Obsidian\Apps\crpgwebsite\quartz\content\`

**Current State:**
```
content/
└── .gitkeep
```

**Analysis:**
- ✓ Empty, ready for content migration
- ✓ .gitkeep ensures directory is tracked
- ⚠️ Missing index.md (expected, will be added later)

## Configuration Strengths

### What's Working Well

1. **Plugin System:** Comprehensive, well-chosen plugins
2. **Layout Structure:** Professional, feature-rich layout
3. **Responsive Design:** Good mobile/tablet/desktop breakpoints
4. **Component Organization:** Modular, maintainable
5. **Build System:** Fast, efficient, well-configured
6. **Content Processing:** Robust markdown transformation pipeline

### What's Ready for CRPG

1. ✓ Plugin configuration (no changes needed)
2. ✓ Layout structure (minor tweaks only)
3. ✓ Responsive framework (good defaults)
4. ✓ Build system (verified working)

## Configuration Gaps

### Must Change

1. **Site Information:**
   - pageTitle: "CRPG Archive"
   - baseUrl: "crpg.info"
   - pageTitleSuffix: " | Center for Research on Public Governance"

2. **Brand Colors:**
   - secondary: #e51d1d (CRPG Red)
   - tertiary: #ed6600 (CRPG Orange)
   - Adjust dark mode variants

3. **Typography:**
   - header: More academic font (Merriweather/Lora)
   - Consider professional serif

4. **Footer Links:**
   - Replace with CRPG contact/about
   - Add proper institutional links

### Should Consider

1. **Date Handling:**
   - Change defaultDateType to "created" for archive content

2. **Analytics:**
   - Confirm if Plausible analytics desired
   - Configure domain

3. **Custom Styling:**
   - Add CRPG-specific design elements
   - Professional academic aesthetic

4. **Explorer Configuration:**
   - Set custom folder behavior
   - Configure sorting for research topics

## Recommendations

### Priority 1 (Critical for CRPG)
1. Apply CRPG brand colors
2. Update site information
3. Change typography for professional look
4. Customize footer links
5. Add custom SCSS for branding

### Priority 2 (Important)
1. Configure Explorer component
2. Tune Graph visualization colors
3. Add print styles for academic papers
4. Enhance callout styling

### Priority 3 (Nice to Have)
1. Custom component styling
2. Advanced tag styling
3. Custom search theming
4. Enhanced metadata display

## Configuration Compatibility

### Obsidian Vault Integration
- ✓ ignorePatterns includes .obsidian
- ✓ ObsidianFlavoredMarkdown enabled
- ✓ Compatible with vault structure

### Academic Content
- ✓ Latex support for equations
- ✓ Citation support (via rehype-citation)
- ✓ Table of contents for papers
- ✓ Backlinks for research connections

### Indonesian Research Context
- ✓ Locale can be set to id-ID if needed
- ✓ Font support for Indonesian characters
- ✓ Unicode support throughout

## Next Steps

1. **Apply Draft Configuration:**
   - Use prepared config-drafts/quartz.config.ts
   - Use prepared config-drafts/quartz.layout.ts
   - Use prepared config-drafts/custom.scss

2. **Test with Sample Content:**
   - Create test content
   - Verify styling
   - Check all components

3. **Coordinate with Other Agents:**
   - Wait for Agent 2 (content scraping)
   - Prepare for Agent 3 (content processing)
   - Plan Agent 5 (GitHub deployment)

## Conclusion

The default Quartz configuration is solid and well-designed. Key changes needed:

**Critical:**
- CRPG branding (colors, typography, site info)
- Footer customization

**Optional:**
- Component fine-tuning
- Advanced styling

The draft configuration files in `config-drafts/` are ready to apply once content preparation begins.
