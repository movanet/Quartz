# Contributing to CRPG.info

Thank you for your interest in contributing to CRPG.info! This document provides guidelines and best practices for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Content Guidelines](#content-guidelines)
- [Style Guide](#style-guide)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:
- Experience level
- Background
- Identity
- Nationality

### Expected Behavior

- Be respectful and considerate in all interactions
- Provide constructive feedback
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other contributors

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Spam or unsolicited promotion
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- Node.js 22+ installed
- Git configured with your GitHub account
- Familiarity with Markdown
- Basic understanding of Git workflows

### Setup Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Quartz.git
   cd Quartz
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/Quartz.git
   ```

4. **Initialize submodules**:
   ```bash
   git submodule update --init --recursive
   ```

5. **Install dependencies**:
   ```bash
   cd quartz
   npm install
   ```

6. **Start local server**:
   ```bash
   npx quartz build --serve
   ```

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

#### Content Contributions
- Adding new CRPG articles, reviews, or guides
- Updating existing content with new information
- Fixing typos or improving clarity
- Adding images, screenshots, or diagrams

#### Technical Contributions
- Bug fixes
- Performance improvements
- Feature enhancements
- Documentation improvements

#### Community Contributions
- Answering questions in discussions
- Reviewing pull requests
- Improving documentation
- Reporting bugs

### Finding Something to Work On

- Check the [Issues](https://github.com/OWNER/Quartz/issues) page
- Look for issues labeled `good first issue` or `help wanted`
- Propose new features in Discussions
- Review existing pull requests

## Content Guidelines

### Adding New Content

#### File Organization

Place content in appropriate directories:
```
quartz/content/
├── games/              # Individual game pages
├── genres/             # Genre overviews
├── developers/         # Developer profiles
├── guides/             # How-to guides and tutorials
└── reviews/            # Game reviews
```

#### Naming Conventions

- Use lowercase with hyphens: `baldurs-gate.md`
- Be descriptive: `ultima-underworld-walkthrough.md`
- Avoid special characters except hyphens
- Keep names concise but clear

#### File Structure

Every content file should include:

```markdown
---
title: Baldur's Gate
description: An epic fantasy RPG that defined a generation
tags:
  - crpg
  - fantasy
  - bioware
  - d&d
date: 1998-12-21
---

# Baldur's Gate

Opening paragraph with hook and overview...

## Sections

### Subsection
```

### Required Frontmatter

All content files must include:
- `title`: The page title
- `description`: Brief summary (for SEO and previews)
- `tags`: Relevant tags for categorization

Optional frontmatter:
- `date`: Publication or release date
- `author`: Content author
- `draft`: Set to `true` to hide from publication

### Content Quality Standards

#### Accuracy
- Verify facts before publishing
- Cite sources when appropriate
- Update outdated information
- Use reliable references

#### Writing Style
- Write in clear, accessible English
- Use active voice where possible
- Break up long paragraphs
- Use headings to structure content
- Include examples and context

#### Completeness
- Cover the topic thoroughly
- Link to related content
- Include relevant images or screenshots
- Add references or further reading

### Image Guidelines

#### Image Requirements
- Format: PNG, JPG, or WebP
- Maximum size: 2MB per image
- Resolution: Appropriate for content (screenshots: 1920x1080 max)
- Alt text: Always include descriptive alt text

#### Image Placement
Place images in:
- `quartz/content/assets/` for content-specific images
- `quartz/quartz/static/` for site-wide assets

#### Image Usage
```markdown
![Descriptive alt text](./assets/image-name.png)
```

### Linking Guidelines

#### Internal Links
```markdown
# Obsidian-style (preferred)
[[Other Page]]
[[Other Page|Custom Link Text]]

# Markdown-style
[Link Text](./other-page.md)
[Link Text](../folder/page.md)
```

#### External Links
```markdown
[External Site](https://example.com)
```

#### Best Practices
- Use descriptive link text (not "click here")
- Link to relevant internal pages
- Check that all links work
- Use relative paths for internal links

## Style Guide

### Markdown Formatting

#### Headings
```markdown
# H1 - Page Title (use once per page)
## H2 - Major Sections
### H3 - Subsections
#### H4 - Minor Subsections
```

#### Emphasis
```markdown
*italic* or _italic_
**bold** or __bold__
***bold italic***
`inline code`
```

#### Lists
```markdown
# Unordered
- Item 1
- Item 2
  - Nested item

# Ordered
1. First item
2. Second item
   1. Nested item
```

#### Code Blocks
````markdown
```javascript
const example = "code";
```
````

#### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

#### Blockquotes
```markdown
> This is a quote
> spanning multiple lines
```

### Writing Style

#### Tone
- Professional yet accessible
- Enthusiastic but not hyperbolic
- Objective in reviews and analysis
- Respectful of different opinions

#### Grammar and Spelling
- Use American English spelling
- Check grammar with a tool like Grammarly
- Proofread before submitting
- Use proper punctuation

#### Terminology
- Define acronyms on first use: "CRPG (Computer Role-Playing Game)"
- Use consistent terminology throughout
- Link to glossary entries when appropriate

## Pull Request Process

### Before Submitting

1. **Test locally**:
   ```bash
   cd quartz
   npx quartz build --serve
   ```

2. **Verify**:
   - All links work
   - Images load correctly
   - No broken formatting
   - Site builds without errors

3. **Check your changes**:
   ```bash
   git status
   git diff
   ```

### Creating a Pull Request

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/descriptive-name
   ```

2. **Make your changes**:
   - Edit files in `quartz/content/`
   - Follow the style guide
   - Test locally

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: Brief description of changes"
   ```

   Commit message format:
   - `Add: New content or features`
   - `Update: Changes to existing content`
   - `Fix: Bug fixes or corrections`
   - `Docs: Documentation updates`
   - `Style: Formatting changes`

4. **Push to your fork**:
   ```bash
   git push origin feature/descriptive-name
   ```

5. **Open a Pull Request**:
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New content
- [ ] Content update
- [ ] Bug fix
- [ ] Feature enhancement
- [ ] Documentation

## Checklist
- [ ] Tested locally
- [ ] All links work
- [ ] Images included (if applicable)
- [ ] Follows style guide
- [ ] No broken formatting
- [ ] Descriptive commit messages

## Screenshots (if applicable)
Add screenshots of changes

## Additional Notes
Any additional context
```

### Review Process

1. **Automated checks** run first (build, deploy test)
2. **Maintainer review** within 2-7 days
3. **Feedback and revisions** if needed
4. **Approval and merge** when ready
5. **Automatic deployment** to live site

### After Merge

- Your changes deploy automatically
- Check the live site to verify
- Close any related issues
- Update your local repository:
  ```bash
  git checkout main
  git pull upstream main
  ```

## Testing

### Local Testing Checklist

Before submitting a PR, verify:

- [ ] Site builds without errors
- [ ] All new pages render correctly
- [ ] Navigation works properly
- [ ] Search includes new content
- [ ] Links are not broken
- [ ] Images display properly
- [ ] Mobile view looks good
- [ ] Dark mode works correctly

### Testing Commands

```bash
# Build and serve locally
cd quartz
npx quartz build --serve

# Build only (check for errors)
npx quartz build

# Type checking (if modified TypeScript)
npm run check
```

### Reporting Bugs

When reporting bugs, include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser and OS information
- Error messages or logs

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Pull Requests**: Code and content contributions

### Getting Help

If you need help:
1. Check the [README](./README.md) and this guide
2. Search existing issues and discussions
3. Ask in GitHub Discussions
4. Reach out to maintainers

### Recognition

Contributors are recognized through:
- GitHub contributor statistics
- Acknowledgment in release notes
- Mention in significant contributions

## Additional Resources

### Documentation
- [Quartz Documentation](https://quartz.jzhao.xyz/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Docs](https://docs.github.com/)

### Tools
- [Obsidian](https://obsidian.md/) - Markdown editor with preview
- [VS Code](https://code.visualstudio.com/) - Code editor
- [Git](https://git-scm.com/) - Version control

### Learning Resources
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Markdown Tutorial](https://www.markdowntutorial.com/)
- [Quartz Guide](https://quartz.jzhao.xyz/getting-started)

## Questions?

If you have questions about contributing, please:
- Open a discussion on GitHub
- Review the README for basic setup
- Check the Quartz documentation

Thank you for contributing to CRPG.info! Your efforts help preserve and celebrate the rich history of classic computer role-playing games.

---

Last updated: 2025-10-24
