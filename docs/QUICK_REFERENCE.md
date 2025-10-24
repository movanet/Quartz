# Quick Reference - CRPG.info Quartz Site

Quick reference guide for common tasks, commands, and workflows.

## Table of Contents

- [Essential Commands](#essential-commands)
- [File Structure](#file-structure)
- [Markdown Cheatsheet](#markdown-cheatsheet)
- [Frontmatter Reference](#frontmatter-reference)
- [Git Workflows](#git-workflows)
- [Common Tasks](#common-tasks)
- [Troubleshooting Quick Fixes](#troubleshooting-quick-fixes)
- [Useful Links](#useful-links)

---

## Essential Commands

### Development

```bash
# Navigate to Quartz directory
cd /home/user/Quartz/quartz

# Install dependencies
npm install

# Start development server (http://localhost:8080)
npx quartz build --serve

# Start on different port
npx quartz build --serve --port 3000

# Build only (no server)
npx quartz build

# Clean build
rm -rf public/ .quartz-cache/
npx quartz build --serve
```

### Git Commands

```bash
# Check status
git status

# Stage files
git add .
git add specific-file.md

# Commit
git commit -m "Your commit message"

# Push to GitHub (triggers deployment)
git push origin main

# Pull latest changes
git pull origin main

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- filename.md
```

### GitHub CLI

```bash
# View workflow runs
gh run list

# Watch current deployment
gh run watch

# Create pull request
gh pr create --title "PR title" --body "Description"

# View repository
gh repo view --web
```

### Content Management

```bash
# Create new content file
touch quartz/content/reviews/new-review.md

# Find content
find quartz/content -name "*.md"

# Search in content
grep -r "search term" quartz/content/

# Count files
find quartz/content -name "*.md" | wc -l
```

---

## File Structure

### Project Layout

```
/home/user/Quartz/
├── quartz/                          # Main Quartz installation
│   ├── content/                     # 📝 Your content goes here
│   │   ├── index.md                # Homepage
│   │   ├── assets/                 # Images, PDFs, files
│   │   │   ├── images/
│   │   │   ├── pdfs/
│   │   │   └── downloads/
│   │   └── crpg/                   # Main content
│   │       ├── reviews/
│   │       ├── guides/
│   │       └── news/
│   ├── quartz/                      # Quartz source code
│   │   ├── components/             # React components
│   │   ├── plugins/                # Content processors
│   │   └── styles/                 # CSS files
│   ├── public/                      # 🏗️ Build output (generated)
│   ├── static/                      # Static files (favicon, CNAME)
│   ├── .github/workflows/          # GitHub Actions
│   ├── quartz.config.ts            # ⚙️ Main config
│   ├── quartz.layout.ts            # 📐 Layout config
│   └── package.json                # Dependencies
├── docs/                            # 📚 Documentation
│   ├── USER_GUIDE.md
│   ├── DEVELOPER_GUIDE.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── MIGRATION_NOTES.md
│   ├── QUICK_REFERENCE.md
│   └── README.md
└── scrape_crpg.py                  # Content scraping script
```

### Key Files

| File | Purpose | Edit? |
|------|---------|-------|
| `quartz.config.ts` | Main configuration | ✅ Yes |
| `quartz.layout.ts` | Page layout | ✅ Yes |
| `content/**/*.md` | Your content | ✅ Yes |
| `static/CNAME` | Custom domain | ✅ Yes |
| `.github/workflows/deploy.yml` | Deployment | ✅ Yes |
| `public/` | Build output | ❌ No (auto-generated) |
| `node_modules/` | Dependencies | ❌ No (auto-installed) |

---

## Markdown Cheatsheet

### Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`
==Highlighted text==
```

### Headers

```markdown
# H1 - Page Title
## H2 - Section
### H3 - Subsection
#### H4 - Minor heading
```

### Lists

```markdown
# Unordered
- Item 1
- Item 2
  - Nested item

# Ordered
1. First
2. Second
3. Third

# Tasks
- [x] Done
- [ ] Todo
```

### Links

```markdown
# Wiki-style (recommended for internal)
[[Page Name]]
[[page-name|Custom Text]]
[[page#heading|Link to Section]]

# Standard markdown
[Link Text](https://example.com)
[Internal](other-page.md)
```

### Images

```markdown
![Alt text](assets/images/image.jpg)
![Alt text](assets/images/image.jpg "Caption")
```

### Code Blocks

````markdown
```javascript
console.log("Hello, World!");
```

```python
def hello():
    print("Hello, World!")
```
````

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Callouts

```markdown
> [!note] Note Title
> Note content here

> [!tip] Pro Tip
> Helpful advice

> [!warning] Warning
> Important notice

> [!example] Example
> Example content
```

### Blockquotes

```markdown
> Quote text
>
> Multiple paragraphs

> Nested quotes
>> Like this
```

### Horizontal Rule

```markdown
---
```

---

## Frontmatter Reference

### Minimal Frontmatter

```yaml
---
title: "Page Title"
---
```

### Complete Frontmatter

```yaml
---
title: "Baldur's Gate Review"
description: "Complete review of the classic CRPG"
tags:
  - reviews
  - baldurs-gate
  - bioware
  - classic-crpg
date: 2025-10-24
updated: 2025-10-24
author: "Your Name"
draft: false
aliases:
  - bg-review
  - baldurs-gate-1-review
---
```

### Common Fields

| Field | Type | Example | Required |
|-------|------|---------|----------|
| `title` | String | "Page Title" | ✅ Yes |
| `description` | String | "Brief description" | Recommended |
| `tags` | Array | [tag1, tag2] | Optional |
| `date` | Date | 2025-10-24 | Optional |
| `updated` | Date | 2025-10-24 | Optional |
| `author` | String | "Name" | Optional |
| `draft` | Boolean | true/false | Optional |
| `aliases` | Array | [alt-url] | Optional |

---

## Git Workflows

### Quick Content Update

```bash
# 1. Make changes to content files
# 2. Commit and push
git add content/reviews/new-review.md
git commit -m "Add Baldur's Gate review"
git push origin main
# 3. GitHub Actions automatically deploys
```

### Feature Branch Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-guide

# 2. Make changes
# Edit files...

# 3. Commit changes
git add .
git commit -m "Add character creation guide"

# 4. Push branch
git push origin feature/new-guide

# 5. Create PR on GitHub
gh pr create --title "Add character guide" --body "New guide"

# 6. After review, merge on GitHub
```

### Fix Mistakes

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Discard changes to specific file
git checkout -- filename.md

# Amend last commit message
git commit --amend -m "Better commit message"

# Revert a specific commit
git revert <commit-hash>
```

### Sync with Remote

```bash
# Pull latest changes
git pull origin main

# Pull and rebase
git pull --rebase origin main

# Fetch without merging
git fetch origin
git diff origin/main
```

---

## Common Tasks

### Add New Page

```bash
# 1. Create file
touch quartz/content/reviews/game-name.md

# 2. Add frontmatter and content
cat > quartz/content/reviews/game-name.md << 'EOF'
---
title: "Game Name Review"
tags: [reviews, game-name]
date: 2025-10-24
---

# Game Name Review

Your content here...
EOF

# 3. Test locally
cd quartz
npx quartz build --serve

# 4. Commit and push
git add content/reviews/game-name.md
git commit -m "Add Game Name review"
git push origin main
```

### Add Images

```bash
# 1. Copy image to assets
cp ~/Downloads/screenshot.jpg quartz/content/assets/images/screenshots/

# 2. Reference in markdown
echo "![Screenshot](assets/images/screenshots/screenshot.jpg)" >> content/page.md

# 3. Optimize (optional)
npm install -g sharp-cli
sharp -i screenshot.jpg -o screenshot-opt.jpg --quality 85

# 4. Commit
git add content/assets/images/screenshots/screenshot.jpg
git add content/page.md
git commit -m "Add screenshot to page"
git push origin main
```

### Update Site Configuration

```bash
# 1. Edit config
nano quartz/quartz.config.ts

# 2. Test locally
npx quartz build --serve

# 3. Commit
git add quartz.config.ts
git commit -m "Update site configuration"
git push origin main
```

### Update Theme Colors

```typescript
// In quartz.config.ts, find theme.colors section
theme: {
  colors: {
    lightMode: {
      light: "#ffffff",      // Background
      secondary: "#3b82f6",  // Links
      tertiary: "#10b981",   // Accents
    },
    darkMode: {
      light: "#1a1a1a",
      secondary: "#60a5fa",
      tertiary: "#34d399",
    },
  },
}
```

### Create Tag Index

```bash
# Tags are automatically indexed by Quartz
# Manual tag page (optional):
cat > quartz/content/tags/index.md << 'EOF'
---
title: "Browse by Tag"
---

# Browse by Tag

Explore content by category:

- [[tags/reviews|Reviews]]
- [[tags/guides|Guides]]
- [[tags/news|News]]
EOF
```

### Check Deployment Status

```bash
# View recent deployments
gh run list --workflow=deploy.yml --limit 5

# View specific run
gh run view <run-id>

# Watch current deployment
gh run watch
```

### Rollback Deployment

```bash
# Find commit to rollback to
git log --oneline -10

# Reset to that commit
git reset --hard <commit-hash>

# Force push (triggers redeployment)
git push --force origin main
```

---

## Troubleshooting Quick Fixes

### Build Fails Locally

```bash
# Clear cache and rebuild
rm -rf public/ .quartz-cache/ node_modules/
npm install
npx quartz build --serve
```

### Port Already in Use

```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Or use different port
npx quartz build --serve --port 3000
```

### Links Not Working

```bash
# Check link format
# ✅ Correct: [[page-name]]
# ❌ Wrong: [page-name](page-name.md)

# Verify file exists
ls quartz/content/page-name.md
```

### Images Not Loading

```bash
# Check path
# ✅ Correct: assets/images/photo.jpg
# ❌ Wrong: /assets/images/photo.jpg
# ❌ Wrong: ../assets/images/photo.jpg

# Verify file exists
ls quartz/content/assets/images/photo.jpg

# Check file is committed
git status
```

### GitHub Actions Failing

```bash
# View error logs
gh run view --log

# Common fixes:
# 1. Check package.json exists
# 2. Verify workflow file syntax
# 3. Check permissions in workflow
# 4. Clear Actions cache (in GitHub UI)
```

### Site Not Updating After Push

```bash
# 1. Check Actions ran successfully
gh run list --limit 1

# 2. Check deployment completed
gh run view --log

# 3. Hard refresh browser
# Ctrl+Shift+R (Windows/Linux)
# Cmd+Shift+R (Mac)

# 4. Check DNS cache
# May take time for DNS to propagate
```

### CSS Not Applying

```bash
# 1. Clear Quartz cache
rm -rf .quartz-cache/ public/

# 2. Rebuild
npx quartz build --serve

# 3. Hard refresh browser
# Ctrl+Shift+R
```

---

## Useful Links

### Documentation

- [Full User Guide](USER_GUIDE.md)
- [Developer Guide](DEVELOPER_GUIDE.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Migration Notes](MIGRATION_NOTES.md)

### External Resources

- [Quartz Documentation](https://quartz.jzhao.xyz)
- [Quartz GitHub](https://github.com/jackyzha0/quartz)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org)
- [Obsidian Help](https://help.obsidian.md)

### Tools

- [GitHub CLI](https://cli.github.com)
- [Markdown Preview](https://markdownlivepreview.com)
- [HTML to Markdown](https://www.convertsimple.com/convert-html-to-markdown/)
- [Image Optimizer](https://squoosh.app)

### Project Links

- Repository: `https://github.com/username/crpg-info`
- Live Site: `https://crpg.info`
- Actions: `https://github.com/username/crpg-info/actions`

---

## Environment Variables

### Local Development

```bash
# Set in .env file or export
export QUARTZ_PORT=8080
export DEBUG=quartz:*
```

### GitHub Actions Secrets

Configure in repository Settings → Secrets:

- `GITHUB_TOKEN` (auto-provided)
- `CLOUDFLARE_API_TOKEN` (if using Cloudflare)
- `CLOUDFLARE_ACCOUNT_ID` (if using Cloudflare)

---

## Keyboard Shortcuts

### In Browser (Development)

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+R` | Hard refresh (clear cache) |
| `F12` | Open DevTools |
| `Ctrl+F` | Search in page |
| `Ctrl+P` | Print preview |

### In VS Code

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+V` | Markdown preview |
| `Ctrl+K V` | Markdown preview side-by-side |
| `Ctrl+Shift+F` | Search in all files |
| `Ctrl+P` | Quick file open |
| `Ctrl+`` | Toggle terminal |

---

## Quick Configuration Reference

### Update Site Title

```typescript
// quartz.config.ts
configuration: {
  pageTitle: "CRPG.info",
  pageTitleSuffix: " | Classic RPG Resource",
}
```

### Update Footer Links

```typescript
// quartz.layout.ts
footer: Component.Footer({
  links: {
    "GitHub": "https://github.com/username/crpg-info",
    "About": "/about",
    "Contact": "/contact",
  },
}),
```

### Enable/Disable Features

```typescript
// quartz.config.ts
configuration: {
  enableSPA: true,           // Single-page app mode
  enablePopovers: true,      // Link preview popovers
}
```

### Change Analytics

```typescript
// quartz.config.ts
analytics: {
  provider: "plausible",  // or "google", "umami", etc.
  tagId: "G-XXXXXXXXXX"   // for Google Analytics
}
```

---

## Performance Tips

### Optimize Images

```bash
# Install sharp
npm install -g sharp-cli

# Compress JPEG
sharp -i input.jpg -o output.jpg --quality 85

# Convert to WebP
sharp -i input.jpg -o output.webp --format webp

# Resize
sharp -i input.jpg -o output.jpg --width 1920
```

### Speed Up Builds

```typescript
// Disable OG images during development
// In quartz.config.ts
emitters: [
  // Plugin.CustomOgImages(),  // Comment out
]
```

### Reduce Repository Size

```bash
# Check repository size
du -sh .git/

# Clean git history (careful!)
git gc --aggressive --prune=now

# Use Git LFS for large files
git lfs install
git lfs track "*.pdf"
git lfs track "*.zip"
```

---

## Cheat Codes

### Quick Deploy

```bash
# One-liner to commit and deploy
git add . && git commit -m "Update content" && git push origin main
```

### Quick Preview

```bash
# Start server in one command
cd /home/user/Quartz/quartz && npx quartz build --serve
```

### Find and Replace in All Files

```bash
# Find
grep -r "old text" quartz/content/

# Replace
find quartz/content/ -name "*.md" -exec sed -i 's/old text/new text/g' {} +
```

### Count Words in Content

```bash
# Total words in all markdown files
find quartz/content/ -name "*.md" -exec cat {} + | wc -w
```

### List All Tags Used

```bash
# Extract all tags from frontmatter
grep -h "^  - " quartz/content/**/*.md | sort -u
```

---

**Last Updated**: 2025-10-24
**Quick Tip**: Bookmark this page for fast reference!
