# User Guide - Content Management

A comprehensive guide for content creators working on the crpg.info GitHub Pages site.

## Table of Contents

- [Getting Started](#getting-started)
- [Adding New Content](#adding-new-content)
- [Markdown Formatting](#markdown-formatting)
- [Frontmatter Reference](#frontmatter-reference)
- [Working with Images and Assets](#working-with-images-and-assets)
- [Creating Links Between Pages](#creating-links-between-pages)
- [Using Tags and Categories](#using-tags-and-categories)
- [Content Organization](#content-organization)
- [Publishing Your Changes](#publishing-your-changes)

---

## Getting Started

The crpg.info site uses **Quartz**, a static site generator designed for digital gardens and knowledge bases. All content is written in Markdown and stored in the `quartz/content/` directory.

### Prerequisites

- Basic understanding of Markdown
- Git knowledge (optional but helpful)
- Text editor (VS Code, Obsidian, or any markdown editor)

---

## Adding New Content

### Creating a New Page

1. Navigate to the `quartz/content/` directory
2. Create a new `.md` file with a descriptive name (e.g., `baldurs-gate-review.md`)
3. Add frontmatter at the top of the file
4. Write your content in Markdown
5. Save the file

**Example:**

```markdown
---
title: "Baldur's Gate Review"
description: "An in-depth review of the classic CRPG"
tags:
  - reviews
  - baldurs-gate
  - classic-crpg
date: 2025-10-24
---

# Baldur's Gate Review

Your content starts here...
```

### Organizing Content in Folders

You can organize content into folders for better structure:

```
quartz/content/
├── reviews/
│   ├── baldurs-gate.md
│   ├── planescape-torment.md
├── guides/
│   ├── character-creation.md
│   ├── combat-tips.md
├── news/
│   └── latest-releases.md
└── index.md
```

---

## Markdown Formatting

### Headers

```markdown
# H1 - Page Title
## H2 - Major Section
### H3 - Subsection
#### H4 - Minor Section
##### H5 - Small Section
###### H6 - Smallest Section
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`
==Highlighted text==
```

### Lists

**Unordered Lists:**
```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

**Ordered Lists:**
```markdown
1. First item
2. Second item
3. Third item
   1. Nested numbered item
   2. Another nested item
```

**Task Lists:**
```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

### Links and References

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover text")

<!-- Internal wiki-style links (recommended for Quartz) -->
[[Other Page Name]]
[[Other Page Name|Custom Display Text]]
```

### Images

```markdown
![Alt text](path/to/image.jpg)
![Alt text](path/to/image.jpg "Image caption")
```

### Code Blocks

````markdown
```python
def hello_world():
    print("Hello, CRPG.info!")
```

```javascript
console.log("Code with syntax highlighting");
```
````

### Tables

```markdown
| Game Title        | Release Year | Developer      |
| ----------------- | ------------ | -------------- |
| Baldur's Gate     | 1998         | BioWare        |
| Planescape Torment| 1999         | Black Isle     |
| Fallout           | 1997         | Interplay      |
```

### Blockquotes

```markdown
> This is a blockquote
>
> It can span multiple lines

> Nested blockquotes
>> Like this
```

### Horizontal Rule

```markdown
---
***
___
```

### Callouts (Quartz Feature)

Quartz supports special callout blocks:

```markdown
> [!note] Note Title
> This is a note callout

> [!tip] Pro Tip
> Helpful advice goes here

> [!warning] Warning
> Important warning message

> [!danger] Danger
> Critical information

> [!example] Example
> Example content

> [!quote] Quote
> Citation or quote
```

### Footnotes

```markdown
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.
```

---

## Frontmatter Reference

Frontmatter is metadata at the top of each Markdown file enclosed in `---`. It provides information about the page to Quartz.

### Basic Frontmatter

```yaml
---
title: "Page Title"
description: "Brief description for SEO and previews"
---
```

### Complete Frontmatter Example

```yaml
---
title: "Baldur's Gate Complete Guide"
description: "The ultimate guide to Baldur's Gate including character builds, quests, and strategies"
tags:
  - guides
  - baldurs-gate
  - character-builds
  - walkthrough
date: 2025-10-24
updated: 2025-10-24
author: "Your Name"
draft: false
aliases:
  - BG Guide
  - Baldur's Gate Walkthrough
---
```

### Frontmatter Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | String | Page title (required) | "Baldur's Gate Review" |
| `description` | String | SEO description | "An in-depth review..." |
| `tags` | Array | Categories/topics | [reviews, bg1] |
| `date` | Date | Publication date | 2025-10-24 |
| `updated` | Date | Last update date | 2025-10-24 |
| `author` | String | Content author | "John Doe" |
| `draft` | Boolean | Hide from site | true or false |
| `aliases` | Array | Alternative page names | [BG, BG1] |

### Draft Pages

To prevent a page from being published:

```yaml
---
title: "Work in Progress"
draft: true
---
```

---

## Working with Images and Assets

### Image Organization

Store images in the `quartz/content/assets/` directory:

```
quartz/content/
├── assets/
│   ├── images/
│   │   ├── screenshots/
│   │   ├── logos/
│   │   └── banners/
│   ├── pdfs/
│   └── downloads/
└── your-content.md
```

### Adding Images to Content

**Relative path (recommended):**
```markdown
![Game screenshot](assets/images/screenshots/baldurs-gate.png)
```

**Absolute path:**
```markdown
![Logo](/assets/images/logos/crpg-logo.png)
```

**With caption:**
```markdown
![Baldur's Gate title screen](assets/images/bg-title.png "The iconic title screen")
```

### Image Best Practices

1. **Optimize images** before uploading (compress to reduce file size)
2. **Use descriptive filenames**: `baldurs-gate-character-creation.png` instead of `img001.png`
3. **Always include alt text** for accessibility
4. **Recommended formats**:
   - Photos: JPEG or WebP
   - Graphics/logos: PNG or SVG
   - Animated: GIF or WebP
5. **Keep image sizes reasonable**:
   - Full-width images: max 1920px wide
   - Thumbnails: 300-500px wide

### Embedding Videos

**YouTube:**
```markdown
![YouTube Video](https://www.youtube.com/watch?v=VIDEO_ID)
```

**Direct video files:**
```html
<video controls width="640">
  <source src="assets/videos/gameplay.mp4" type="video/mp4">
  Your browser doesn't support video.
</video>
```

### Downloadable Files

```markdown
[Download PDF Guide](assets/pdfs/character-guide.pdf)
[Download Save File](assets/downloads/savegame.zip)
```

---

## Creating Links Between Pages

### Wiki-style Links (Recommended)

Quartz uses Obsidian-style wiki links:

```markdown
<!-- Link to another page -->
[[Baldur's Gate Review]]

<!-- Link with custom text -->
[[baldurs-gate-review|Read our BG review]]

<!-- Link to a heading on another page -->
[[Baldur's Gate Review#Character Creation]]

<!-- Link to heading with custom text -->
[[baldurs-gate-review#combat|Combat Tips]]
```

### Standard Markdown Links

```markdown
[Baldur's Gate Review](baldurs-gate-review.md)
[Combat Guide](guides/combat.md)
```

### External Links

```markdown
[Official Website](https://www.example.com)
[External Resource](https://en.wikipedia.org/wiki/CRPG)
```

### Link Best Practices

1. **Use wiki-style links** for internal pages (Quartz handles them better)
2. **Link to related content** to create a knowledge graph
3. **Use descriptive link text** instead of "click here"
4. **Check for broken links** regularly

---

## Using Tags and Categories

### Adding Tags

Tags help organize and categorize content. Add them in frontmatter:

```yaml
---
title: "Baldur's Gate Review"
tags:
  - reviews
  - baldurs-gate
  - bioware
  - classic-crpg
  - fantasy
---
```

### Tag Naming Conventions

- **Use lowercase** for consistency: `baldurs-gate` not `Baldurs-Gate`
- **Use hyphens** for multi-word tags: `character-creation` not `character_creation`
- **Be specific**: `turn-based-combat` instead of just `combat`
- **Avoid redundancy**: Don't use both `bg` and `baldurs-gate`

### Common Tag Categories

**By Game:**
- `baldurs-gate`, `planescape-torment`, `fallout`, `arcanum`

**By Type:**
- `reviews`, `guides`, `news`, `analysis`, `opinion`

**By Topic:**
- `character-creation`, `combat`, `story`, `graphics`, `mods`

**By Era:**
- `classic-crpg`, `modern-crpg`, `retro`

**By Mechanics:**
- `turn-based`, `real-time`, `tactical`, `party-based`

### Viewing Tagged Content

Quartz automatically creates tag pages. Users can click on any tag to see all related content.

### Creating Category Pages

Create a dedicated index for categories:

```markdown
---
title: "Reviews"
description: "All CRPG reviews"
---

# CRPG Reviews

Browse all our game reviews below:

(Content with the "reviews" tag will be automatically listed)
```

---

## Content Organization

### File Naming

- **Use lowercase** with hyphens: `baldurs-gate-review.md`
- **Be descriptive**: `character-creation-guide.md` not `guide1.md`
- **Avoid special characters**: Use only letters, numbers, and hyphens

### Folder Structure

Organize content logically:

```
quartz/content/
├── index.md                 # Homepage
├── reviews/
│   ├── index.md            # Reviews landing page
│   ├── baldurs-gate.md
│   ├── planescape-torment.md
│   └── fallout-2.md
├── guides/
│   ├── index.md            # Guides landing page
│   ├── character-creation/
│   │   ├── index.md
│   │   ├── fighters.md
│   │   └── mages.md
│   └── combat-strategies.md
├── news/
│   └── index.md
└── about.md
```

### Creating Index Pages

Each folder should have an `index.md`:

```markdown
---
title: "Reviews"
description: "All CRPG game reviews"
---

# CRPG Reviews

Welcome to our collection of classic and modern CRPG reviews.

## Latest Reviews

- [[Baldur's Gate Review]]
- [[Planescape Torment Review]]
- [[Fallout 2 Review]]

## Review Categories

Browse reviews by era:
- [[Classic CRPGs]]
- [[Modern CRPGs]]
```

---

## Publishing Your Changes

### Local Editing Workflow

1. **Edit content** in your markdown editor
2. **Preview locally** (see Developer Guide for setup)
3. **Commit changes** to Git
4. **Push to GitHub**
5. **Automatic deployment** via GitHub Actions

### Using Git (Command Line)

```bash
# Navigate to the Quartz directory
cd /home/user/Quartz/quartz

# Check what files changed
git status

# Stage your changes
git add content/your-new-file.md

# Commit with a descriptive message
git commit -m "Add Baldur's Gate review"

# Push to GitHub
git push origin main
```

### Using Obsidian (Optional)

Obsidian is a popular markdown editor that works great with Quartz:

1. Open the `quartz/content/` folder as an Obsidian vault
2. Edit files with live preview
3. Use graph view to see connections
4. Commit changes via Obsidian Git plugin

### Publishing Checklist

Before publishing:

- [ ] Frontmatter is complete
- [ ] All images load correctly
- [ ] Internal links work
- [ ] External links are valid
- [ ] Spelling and grammar checked
- [ ] Tags are appropriate
- [ ] Draft status removed (if applicable)

### Review Process

For collaborative sites:

1. Create a feature branch
2. Make your changes
3. Create a pull request
4. Wait for review
5. Merge after approval

---

## Tips and Best Practices

### Writing Tips

1. **Be concise** - Get to the point quickly
2. **Use headers** - Break content into scannable sections
3. **Add context** - Link to related articles
4. **Include examples** - Show, don't just tell
5. **Update dates** - Use `updated:` frontmatter for revisions

### Maintenance

1. **Review old content** periodically
2. **Update broken links**
3. **Refresh outdated information**
4. **Add new tags** as the site grows

### Accessibility

1. **Use descriptive alt text** for images
2. **Maintain heading hierarchy** (don't skip levels)
3. **Use descriptive link text**
4. **Ensure good color contrast**

---

## Common Questions

### How do I preview my changes?

See the [Developer Guide](DEVELOPER_GUIDE.md) for setting up local preview.

### Can I use HTML in Markdown?

Yes! Quartz supports inline HTML for advanced formatting:

```html
<div class="custom-class">
  Custom HTML content
</div>
```

### How do I add a table of contents?

Quartz automatically generates a table of contents for each page based on headers.

### Can I schedule posts for future publication?

Not directly. You can use `draft: true` and manually publish on the desired date.

### How do I redirect old URLs?

Use the `aliases` frontmatter field:

```yaml
---
title: "New Page Title"
aliases:
  - old-url-slug
  - another-old-slug
---
```

---

## Getting Help

- **Documentation Issues**: File a GitHub issue
- **Quartz Questions**: Check [Quartz documentation](https://quartz.jzhao.xyz)
- **Markdown Help**: See [Markdown Guide](https://www.markdownguide.org)

---

**Last Updated**: 2025-10-24
