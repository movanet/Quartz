# Asset Placement Guide
# How to Integrate Assets into Quartz Markdown Content

**Date:** October 25, 2025
**Agent:** Agent 3 - Asset Management & Database
**Version:** 1.0
**Audience:** Content authors, markdown editors

---

## Purpose

This guide explains how to properly reference and integrate assets (images, PDFs, videos) into Quartz markdown content pages. Follow these guidelines to ensure assets display correctly and maintain proper organization.

---

## Quick Reference

### Basic Image

```markdown
![Alt text describing the image](../assets/images/category/filename.jpg)
```

### Image with Caption

```markdown
![Alt text](../assets/images/category/filename.jpg)
*Figure 1: Caption text describing the image*
```

### Downloadable PDF

```markdown
Download: [Document Title](../assets/pdfs/category/filename.pdf)
```

### Embedded Video (YouTube)

```markdown
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video Title" frameborder="0" allowfullscreen>
</iframe>
```

---

## Image Integration

### Standard Image Syntax

```markdown
![Alt text](../assets/images/blog/2023/blog-2023-07-water-governance.jpg)
```

**Components:**
- `![...]` - Markdown image syntax
- `Alt text` - Descriptive text for accessibility (required)
- `../assets/images/` - Relative path from content directory
- `category/filename.jpg` - Asset location

### Image with Title Attribute

```markdown
![Water infrastructure](../assets/images/general/water/water-infrastructure-pipe-system.jpg "Water distribution system in urban area")
```

The title attribute (in quotes) shows on hover.

### Responsive Image (HTML)

For better control over responsive display:

```html
<img src="../assets/images/research/aiira-2016/aiira-2016-field-study-water-tank-01.jpg"
     alt="Community water storage tank from AIIRA research"
     width="100%"
     style="max-width: 800px; height: auto;">
```

### Image with Caption

```markdown
![IsWASH 2023 symposium participants](../assets/images/events/symposiums/event-2023-03-iswash-symposium-group-photo.jpg)
*Group photo from the Indonesian Water, Sanitation and Hygiene Symposium, March 2023*
```

### Multiple Images (Gallery Style)

```markdown
### AIIRA Field Study Photos

![Water tank system](../assets/images/research/aiira-2016/aiira-2016-field-study-water-tank-01.jpg)
*Figure 1: Community water tank in East Nusa Tenggara*

![Community meeting](../assets/images/research/aiira-2016/aiira-2016-field-study-meeting-02.jpg)
*Figure 2: Stakeholder consultation with community members*

![Water treatment](../assets/images/research/aiira-2016/aiira-2016-field-study-treatment-03.jpg)
*Figure 3: Local water treatment facility*
```

### Centered Image

```html
<div style="text-align: center;">
  <img src="../assets/images/logos/crpg/logo-crpg-primary.png"
       alt="CRPG logo"
       width="300">
</div>
```

---

## PDF and Document Integration

### Download Link

```markdown
Download the full report: [IsWASH 2023 Proceedings](../assets/pdfs/proceedings/conferences/2023-iswash-proceedings.pdf) (PDF, 3.7 MB)
```

### Styled Download Button

```html
<a href="../assets/pdfs/research-papers/2016-aiira/2016-aiira-water-sanitation-regulatory-frameworks.pdf"
   style="padding: 10px 20px; background-color: #e51d1d; color: white; text-decoration: none; border-radius: 5px;">
   Download AIIRA Report (PDF, 7 MB)
</a>
```

### Document Citation with Link

```markdown
For more details, see the policy brief:

> Al'Afghani, M.M. (2021). *Policy Brief 01/2021: Water Allocation Issues Under Law 17/2019*.
> Center for Regulation Policy and Governance.
> [Download PDF](../assets/pdfs/policy-briefs/2021/2021-pb-01-water-allocation-law-17-2019.pdf)
```

### Multiple Document Links

```markdown
## Related Publications

- [AIIRA Research Report 2016](../assets/pdfs/research-papers/2016-aiira/2016-aiira-water-sanitation-regulatory-frameworks.pdf) - Regulatory frameworks for community water systems (PDF, 7 MB)
- [POPs Regulation Report 2017](../assets/pdfs/research-papers/2017-pops/2017-pops-regulation-indonesia-main-report.pdf) - Persistent organic pollutants regulation (PDF, 12 MB)
- [IsWASH 2023 Proceedings](../assets/pdfs/proceedings/conferences/2023-iswash-proceedings.pdf) - Symposium proceedings (PDF, 3.7 MB)
```

### Embedded PDF Viewer (Advanced)

```html
<object data="../assets/pdfs/policy-briefs/2021/2021-pb-01-water-allocation-law-17-2019.pdf"
        type="application/pdf"
        width="100%"
        height="600px">
  <p>Your browser does not support embedded PDFs.
     <a href="../assets/pdfs/policy-briefs/2021/2021-pb-01-water-allocation-law-17-2019.pdf">Download the PDF</a>
  </p>
</object>
```

---

## Video Integration

### YouTube Embed (Standard)

```html
<iframe width="560" height="315"
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="Webinar: SWA & MAM Jejaring AMPL Kickoff"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
</iframe>
```

### YouTube Responsive Embed

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          src="https://www.youtube.com/embed/VIDEO_ID"
          title="Video Title"
          frameborder="0"
          allowfullscreen>
  </iframe>
</div>
```

### Video Link (No Embed)

```markdown
Watch the webinar recording: [WASH Webinar - SWA & MAM Kickoff](https://www.youtube.com/watch?v=VIDEO_ID) (YouTube)
```

---

## Logos and Branding

### Header Logo

```html
<img src="../assets/images/logos/crpg/logo-crpg-primary.svg"
     alt="CRPG - Center for Regulation Policy and Governance"
     height="60">
```

### Partner Logos Row

```html
<div style="display: flex; gap: 20px; align-items: center; justify-content: center;">
  <img src="../assets/images/logos/partners/logo-unesco-partner.png" alt="UNESCO" height="50">
  <img src="../assets/images/logos/partners/logo-unido-partner.png" alt="UNIDO" height="50">
  <img src="../assets/images/logos/partners/logo-bappenas-partner.png" alt="Bappenas" height="50">
</div>
```

---

## Team Photos

### Individual Team Member

```markdown
## Mohamad Mova Al'Afghani, PhD
**Director**

<img src="../assets/images/team/core/team-mohamad-mova-alafghani.jpg"
     alt="Mohamad Mova Al'Afghani"
     width="200"
     style="border-radius: 50%;">

Dr. Al'Afghani is the Director of CRPG and leads research on water governance and regulatory frameworks in Indonesia.
```

### Team Grid

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; text-align: center;">
  <div>
    <img src="../assets/images/team/core/team-mohamad-mova-alafghani.jpg"
         alt="Mohamad Mova Al'Afghani"
         width="150"
         style="border-radius: 50%;">
    <p><strong>Mohamad Mova Al'Afghani</strong><br>Director</p>
  </div>
  <div>
    <img src="../assets/images/team/core/team-dyah-paramita.jpg"
         alt="Dyah Paramita"
         width="150"
         style="border-radius: 50%;">
    <p><strong>Dyah Paramita</strong><br>Secretary</p>
  </div>
</div>
```

---

## Path Reference Guide

### Understanding Relative Paths

When writing content in `quartz/content/`:

```
quartz/content/
├── research/
│   └── aiira.md        ← Content file location
└── assets/
    └── pdfs/
        └── research-papers/
            └── 2016-aiira/
                └── file.pdf    ← Asset location
```

From `research/aiira.md`, reference the asset:
```markdown
![Image](../assets/pdfs/research-papers/2016-aiira/file.pdf)
```

`../` goes up one level from `research/` to `content/`, then `assets/...`

### Common Path Examples

**From blog post in root:**
```markdown
<!-- From: content/blog-post.md -->
![Image](../assets/images/blog/2023/image.jpg)
```

**From nested research page:**
```markdown
<!-- From: content/research/projects/aiira.md -->
![Image](../../assets/images/research/aiira-2016/photo.jpg)
```

**From about page:**
```markdown
<!-- From: content/about.md -->
![Team photo](../assets/images/team/core/member.jpg)
```

---

## Asset Reference Patterns

### Research Project Page

```markdown
---
title: "AIIRA Research Project"
date: 2016-08-07
topics: [water, sanitation, regulation]
---

# The Role of Regulatory Frameworks in Community-Based Water and Sanitation

![Community water system](../assets/images/research/aiira-2016/aiira-2016-field-study-water-tank-01.jpg)
*Community water tank system in East Nusa Tenggara*

## Overview

This research examines regulatory frameworks for sustainable community-based water and sanitation systems in Indonesia.

## Download the Full Report

The complete research report is available for download:

📄 [AIIRA Research Report (PDF, 7 MB)](../assets/pdfs/research-papers/2016-aiira/2016-aiira-water-sanitation-regulatory-frameworks.pdf)

## Field Study Photos

![Field study](../assets/images/research/aiira-2016/aiira-2016-field-study-community-meeting-02.jpg)
*Stakeholder consultation with community members*

## Partners

<div style="display: flex; gap: 20px; align-items: center;">
  <img src="../assets/images/logos/partners/logo-unesco-partner.png" alt="UNESCO" height="40">
  <span>UNESCO Centre for Water Law, Policy and Science</span>
</div>
```

### Blog Post Template

```markdown
---
title: "9 Indonesia Water Governance Articles You Should Read"
date: 2023-07-02
author: Movanet
topics: [water, governance, Indonesia]
---

![Water governance concept](../assets/images/blog/2023/blog-2023-07-water-governance-featured.jpg)

# 9 Indonesia Water Governance Articles You Should Read

This curated collection highlights essential readings on water governance in Indonesia...

## 1. First Article Title

Description of the article...

[Read the full article](external-link-here)

## 2. Second Article Title

...
```

### Event/Symposium Page

```markdown
---
title: "IsWASH 2023 - Indonesian Water, Sanitation and Hygiene Symposium"
date: 2023-03-20
event_date: March 20-21, 2023
location: Jakarta, Indonesia
---

# IsWASH 2023 Symposium

![IsWASH group photo](../assets/images/events/symposiums/event-2023-03-iswash-symposium-group-photo.jpg)
*Participants of IsWASH 2023 Symposium*

## About the Symposium

The Indonesian Water, Sanitation and Hygiene Symposium 2023 brought together...

## Photo Gallery

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
  <img src="../assets/images/events/symposiums/event-2023-03-iswash-symposium-keynote.jpg"
       alt="Keynote presentation">
  <img src="../assets/images/events/symposiums/event-2023-03-iswash-symposium-panel-discussion.jpg"
       alt="Panel discussion">
  <img src="../assets/images/events/symposiums/event-2023-03-iswash-symposium-group-photo.jpg"
       alt="Group photo">
</div>

## Proceedings

Download the full symposium proceedings:

📄 [IsWASH 2023 Proceedings](../assets/pdfs/proceedings/conferences/2023-iswash-proceedings.pdf) (PDF, 3.7 MB)
```

---

## Best Practices

### 1. Always Use Alt Text

```markdown
<!-- Good -->
![Water infrastructure system](../assets/images/...)

<!-- Bad -->
![](../assets/images/...)
```

Alt text is essential for:
- Accessibility (screen readers)
- SEO
- Fallback when image doesn't load

### 2. Include File Size for Downloads

```markdown
<!-- Good -->
[Download Report](../assets/pdfs/report.pdf) (PDF, 3.7 MB)

<!-- Acceptable but less helpful -->
[Download Report](../assets/pdfs/report.pdf)
```

### 3. Use Relative Paths

```markdown
<!-- Good -->
![Image](../assets/images/photo.jpg)

<!-- Bad - Absolute path won't work -->
![Image](/Users/name/quartz/content/assets/images/photo.jpg)
```

### 4. Optimize Images Before Use

- Resize large images (max 1920px width)
- Compress to reasonable file size (<500 KB for featured)
- Use appropriate format (JPEG for photos, PNG for graphics)

### 5. Provide Context

```markdown
<!-- Good - With caption -->
![Group photo](../assets/images/event.jpg)
*Participants at IsWASH 2023 Symposium, Jakarta*

<!-- Less helpful -->
![Group photo](../assets/images/event.jpg)
```

### 6. Test Links

Always verify asset links work:
- Build Quartz locally: `npx quartz build --serve`
- Navigate to content page
- Verify images display
- Test PDF downloads

### 7. Consistent Styling

Use consistent image widths and styling across similar content:

```html
<!-- Standard research image -->
<img src="../assets/..." alt="..." width="100%" style="max-width: 800px;">

<!-- Team photo -->
<img src="../assets/..." alt="..." width="200" style="border-radius: 50%;">
```

---

## Troubleshooting

### Image Not Displaying

**Check:**
1. Path is correct (relative to content file)
2. Filename matches exactly (case-sensitive)
3. Image file exists in assets directory
4. File extension is correct (.jpg not .JPG)

**Common fixes:**
```markdown
<!-- Wrong -->
![Image](assets/images/photo.jpg)

<!-- Right -->
![Image](../assets/images/photo.jpg)
```

### PDF Download Not Working

**Check:**
1. File exists in specified location
2. Path is relative (starts with ../)
3. No special characters in filename
4. File extension is .pdf (lowercase)

### Broken Relative Path

**Count directory levels:**
```
content/research/projects/page.md → ../../assets/...
content/research/page.md → ../assets/...
content/page.md → ../assets/...
```

Each `../` goes up one level.

---

## Asset Integration Checklist

Before publishing content with assets:

- [ ] All images have descriptive alt text
- [ ] Relative paths are correct
- [ ] Images are optimized (<500 KB for featured)
- [ ] PDF links include file size
- [ ] Captions provided where helpful
- [ ] Tested locally in Quartz build
- [ ] All links verified working
- [ ] Responsive on mobile
- [ ] Accessibility checked
- [ ] Metadata accurate in asset database

---

## Additional Resources

- **ASSET_CATALOG.md** - Browse available assets
- **ASSET_MANAGEMENT_GUIDE.md** - How to add new assets
- **Quartz Documentation** - https://quartz.jzhao.xyz/
- **Markdown Guide** - https://www.markdownguide.org/

---

**Guide Version:** 1.0
**Last Updated:** October 25, 2025
**For:** Quartz v4 Static Site

Happy content creation!
