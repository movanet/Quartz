# CRPG.info Frontmatter Templates

**Analysis Date:** October 25, 2025
**Analyst:** Agent 1 - Content Extraction & Analysis
**Project:** CRPG.info Archival Project
**Target Platform:** Quartz

---

## Table of Contents
1. [Overview](#overview)
2. [Template Definitions](#template-definitions)
3. [Field Specifications](#field-specifications)
4. [Content Type Templates](#content-type-templates)
5. [Quartz Directory Structure](#quartz-directory-structure)
6. [Tagging Taxonomy](#tagging-taxonomy)

---

## Overview

### Purpose
These frontmatter templates are designed for archiving CRPG.info content in Quartz (Obsidian-compatible static site generator). Each template captures essential metadata while remaining compatible with Obsidian's Markdown format.

### Design Principles
1. **Consistency:** Standard fields across all content types
2. **Extensibility:** Type-specific fields for different content
3. **Searchability:** Rich metadata for filtering and discovery
4. **Attribution:** Clear source and authorship tracking
5. **Quartz Compatibility:** Leverages Quartz features (tags, dates, aliases)

### Standard Field Definitions

**Core Fields (All Content Types):**
- `title`: Content title (string)
- `date`: Publication/creation date (YYYY-MM-DD)
- `source_url`: Original URL (string)
- `archive_date`: Date archived (YYYY-MM-DD)
- `content_type`: Type of content (enum)
- `language`: Content language (ISO 639-1 code)
- `tags`: Topic tags (array)

**Optional Fields (Common):**
- `author`: Author name(s) (string or array)
- `description`: Brief summary (string, 100-200 chars)
- `aliases`: Alternative titles (array)
- `draft`: Draft status (boolean, default false)

---

## Template Definitions

### 1. Blog Post Template

**Use Case:** Individual blog posts from blog.crpg.info
**Estimated Quantity:** 900+ posts

```yaml
---
title: "Post Title Here"
date: YYYY-MM-DD
source_url: "http://blog.crpg.info/YYYY/MM/post-slug.html"
archive_date: YYYY-MM-DD
content_type: blog_post
language: en

# Author Information
author:
  - "Author Name"

# Classification
tags:
  - water
  - governance
  - regulation
  # Additional topic tags

# Optional Metadata
description: "Brief summary of the post content (100-200 characters)"
original_publish_year: YYYY
updated_date: YYYY-MM-DD # If post was updated

# Content Characteristics
word_count: 1500 # Estimated
has_images: true # Boolean
has_pdf_links: false # Boolean
has_external_links: true # Boolean

# Quality Indicators
ai_generated: false # True if #robotpost
peer_reviewed: false # True if academic publication
research_output: false # True if research report

# Related Content
related_projects:
  - AIIRA
  # Project tags if applicable
related_reports: []
  # Links to associated research reports

# Preservation Metadata
extraction_method: web_scraping
content_complete: true
images_preserved: true
links_verified: false

# Aliases and SEO
aliases:
  - "Alternative Title 1"
  - "Indonesian Title" # If bilingual
---
```

**Example (Filled):**
```yaml
---
title: "Water Allocation Issues Under Law 17/2019"
date: 2021-01-28
source_url: "http://blog.crpg.info/2021/01/water-allocation-issues-under-law-172019.html"
archive_date: 2025-10-25
content_type: blog_post
language: en

author:
  - "Movanet"

tags:
  - water
  - regulation
  - indonesia
  - policy-brief
  - water-law

description: "Policy brief addressing five water allocation issues under Indonesian water law including drinking water prioritization and groundwater management"

original_publish_year: 2021
word_count: 2000
has_images: true
has_pdf_links: true
has_external_links: true

ai_generated: false
peer_reviewed: false
research_output: true

related_projects:
  - water-governance

extraction_method: web_scraping
content_complete: true
images_preserved: true
links_verified: true

aliases:
  - "Policy Brief 01/2021"
---
```

---

### 2. Research Report Template

**Use Case:** Major research publications (PDFs and web pages)
**Estimated Quantity:** 10-15 major reports

```yaml
---
title: "Research Report Title"
date: YYYY-MM-DD # Publication date
source_url: "https://crpg.info/research/report-slug/"
archive_date: YYYY-MM-DD
content_type: research_report
language: en

# Author and Organization
author:
  - "Lead Author"
  - "Co-Author 1"
  - "Co-Author 2"
organization: "Center for Regulation, Policy and Governance"

# Partners and Funding
partners:
  - "UNESCO Centre for Water Law, Policy and Science"
  - "University of Dundee"
funding:
  - "Australia Indonesia Infrastructure Initiative (INDII)"
grant_id: "AIIRA-2016" # If applicable

# Classification
tags:
  - research-report
  - water-governance
  - community-based-services
  - regulatory-framework

# Report Metadata
report_type: "Research Report" # or "Policy Brief", "Working Paper", etc.
report_series: "AIIRA Research" # If part of a series
report_number: "2016-01" # If applicable
publication_status: "Published" # or "Draft", "Final"

# Content Details
description: "Comprehensive research report examining regulatory frameworks for community-based water and sanitation in Indonesia"
abstract: "Full abstract text here..."
keywords:
  - water governance
  - community-based services
  - regulatory frameworks
  - Indonesia
  - sustainability

# Geographic and Temporal Scope
geographic_focus:
  - Indonesia
  - East Nusa Tenggara
  - East Java
study_period: "2015-2016"
field_sites:
  - Maukaro
  - Pulau Ende
  - Lamongan

# Document Information
page_count: 120
isbn: "" # If applicable
doi: "" # If applicable

# Asset Links
pdf_url: "https://cloud.crpg.info/docs/aiirareport8072016_2.pdf"
pdf_size_mb: 8.5
supplementary_materials:
  - "Field Study Photos"
  - "Survey Data"
  - "Annexes"

# Citation
citation: "Al'Afghani, M.M., et al. (2016). The Role of Regulatory Frameworks in Ensuring The Sustainability of Community-Based Water and Sanitation. CRPG/UNESCO/INDII."

# Preservation Metadata
extraction_method: pdf_download
content_complete: true
pdf_preserved: true
ocr_performed: false # If scanned PDF

aliases:
  - "AIIRA Report 2016"
  - "Community Water Sustainability Study"
---
```

---

### 3. Policy Brief Template

**Use Case:** Short policy analysis documents
**Estimated Quantity:** 10-15 briefs

```yaml
---
title: "Policy Brief Title"
date: YYYY-MM-DD
source_url: "http://blog.crpg.info/YYYY/MM/policy-brief-slug.html"
archive_date: YYYY-MM-DD
content_type: policy_brief
language: en # or id for Indonesian

# Author Information
author:
  - "Author Name"
organization: "Center for Regulation, Policy and Governance"

# Classification
tags:
  - policy-brief
  - water-allocation
  - regulation
  - indonesia

# Brief Metadata
brief_number: "01/2021" # Policy Brief number
brief_series: "Water Policy Briefs"
target_audience: "Policymakers, regulators, water sector stakeholders"

# Content Details
description: "Policy brief examining key issues in water allocation under Indonesian law"
key_findings:
  - "Finding 1 summary"
  - "Finding 2 summary"
  - "Finding 3 summary"
recommendations:
  - "Recommendation 1"
  - "Recommendation 2"

# Policy Context
related_legislation:
  - "Law 17/2019 (Water Resources)"
  - "Job Creation Law"
policy_area: "Water Resources Management"
geographic_focus:
  - Indonesia

# Document Information
page_count: 8
word_count: 3000

# Asset Links
pdf_url: "" # If separate PDF exists
has_infographics: true

# Preservation Metadata
extraction_method: web_scraping
content_complete: true

aliases:
  - "PB 01/2021"
---
```

---

### 4. Knowledge Base Article Template

**Use Case:** Articles from knowledge.crpg.info
**Estimated Quantity:** 50-100 articles

```yaml
---
title: "Article Title"
date: YYYY-MM-DD # Last updated date
source_url: "https://knowledge.crpg.info/en/topic-slug"
archive_date: YYYY-MM-DD
content_type: knowledge_article
language: en # or id

# Classification
tags:
  - esg
  - sustainability
  - regulation
  - indonesia

# Article Metadata
article_type: "Regulatory Overview" # or "Analysis", "Guide", "Framework"
topic_area: "ESG Regulations"
regulatory_focus:
  - Environmental compliance
  - Corporate governance
  - Social responsibility

# Content Details
description: "Comprehensive overview of ESG regulations and sustainability frameworks in Indonesia"
keywords:
  - ESG
  - environmental governance
  - corporate responsibility
  - Indonesian regulation

# Related Content
related_topics:
  - HREDD
  - Water Law
  - Environmental Governance
related_legislation:
  - "List of relevant laws"

# Multilingual
has_translation: true # If id version exists
translation_url: "https://knowledge.crpg.info/id/topic-slug"

# Preservation Metadata
extraction_method: web_scraping
content_complete: true
internal_links_preserved: true

aliases:
  - "ESG in Indonesia"
---
```

---

### 5. Team Profile Template

**Use Case:** Individual researcher/team member pages
**Estimated Quantity:** 15-20 profiles

```yaml
---
title: "Person Name"
date: YYYY-MM-DD # Profile creation/update date
source_url: "https://crpg.info/person-slug/"
archive_date: YYYY-MM-DD
content_type: team_profile
language: en

# Person Information
full_name: "Full Name with Credentials"
role: "Director" # or "Researcher", "Secretary", etc.
credentials:
  - "PhD"
  - "LLM"
affiliation: "Center for Regulation, Policy and Governance"

# Classification
tags:
  - team
  - researcher
  - water-governance

# Profile Details
bio: "Brief professional biography"
expertise:
  - Water governance
  - Regulatory frameworks
  - Environmental law
education:
  - "PhD, University Name, Year"
  - "Master's, University Name, Year"

# Academic Profile
orcid: "" # If available
google_scholar: "URL" # Scholar profile
academia_edu: "URL" # Academia.edu profile
research_gate: "URL" # ResearchGate profile

# Publications (Selected)
selected_publications:
  - "Publication 1 citation"
  - "Publication 2 citation"

# Projects
projects:
  - AIIRA
  - OGP-IRM
  - POPs Regulation

# Contact (if public)
email: "email@crpg.info" # Only if publicly listed

# Preservation Metadata
extraction_method: web_scraping
content_complete: true
photo_preserved: true

aliases:
  - "Person Name (alternate spelling)"
---
```

---

### 6. Project Page Template

**Use Case:** Major project pages (AIIRA, WASH, OGP, etc.)
**Estimated Quantity:** 5-10 projects

```yaml
---
title: "Project Name"
date: YYYY-MM-DD # Project start or page creation date
source_url: "https://crpg.info/project-slug/"
archive_date: YYYY-MM-DD
content_type: project_page
language: en

# Classification
tags:
  - project
  - water-governance
  - research

# Project Metadata
project_name: "Full Project Title"
project_acronym: "AIIRA"
project_status: "Completed" # or "Ongoing", "Planned"
start_date: YYYY-MM-DD
end_date: YYYY-MM-DD
duration: "24 months"

# Organization
lead_organization: "Center for Regulation, Policy and Governance"
partners:
  - "Partner Organization 1"
  - "Partner Organization 2"
funding_source:
  - "Funding Organization"
grant_amount: "USD 100,000" # If public

# Project Details
description: "Brief project description"
objectives:
  - "Objective 1"
  - "Objective 2"
geographic_scope:
  - Indonesia
  - East Nusa Tenggara
  - East Java

# Outputs
deliverables:
  - "Research Report"
  - "Policy Briefs"
  - "Workshop Series"
publications:
  - "[[Link to Research Report]]"
  - "[[Link to Policy Brief]]"

# Team
project_team:
  - "[[Team Member 1]]"
  - "[[Team Member 2]]"

# Preservation Metadata
extraction_method: web_scraping
content_complete: true
related_files_preserved: true

aliases:
  - "AIIRA"
  - "Australia Indonesia Infrastructure Research Award"
---
```

---

### 7. Event/Symposium Template

**Use Case:** Conference, webinar, workshop pages
**Estimated Quantity:** 5-10 events

```yaml
---
title: "Event Name"
date: YYYY-MM-DD # Event date
source_url: "https://crpg.info/event-slug/"
archive_date: YYYY-MM-DD
content_type: event_page
language: en

# Classification
tags:
  - event
  - symposium
  - wash
  - water-governance

# Event Metadata
event_name: "Indonesian Water, Sanitation and Hygiene Symposium 2023"
event_acronym: "IsWASH 2023"
event_type: "Symposium" # or "Webinar", "Workshop", "Conference"
event_date: YYYY-MM-DD
event_end_date: YYYY-MM-DD # If multi-day
event_location: "City, Country"
event_format: "Hybrid" # or "In-person", "Virtual"

# Organization
organizers:
  - "Bappenas"
  - "CRPG"
  - "University Partners"
sponsors:
  - "Sponsor 1"

# Event Details
description: "Brief event description"
theme: "Event theme or tagline"
topics:
  - Water governance
  - Sanitation
  - Climate resilience
target_participants: "Researchers, policymakers, practitioners"
participant_count: 200 # If known

# Outputs
proceedings_url: "https://crpg.info/wp-content/uploads/.../proceedings.pdf"
presentations: []
  # Links to presentation files
recordings: []
  # Links to video recordings

# Preservation Metadata
extraction_method: web_scraping
content_complete: true
proceedings_preserved: true

aliases:
  - "IsWASH 2023"
---
```

---

### 8. AI-Generated Content Template

**Use Case:** AI-generated blog posts (2023 experimental content)
**Estimated Quantity:** 5-10 posts

```yaml
---
title: "Post Title (Robot Post)"
date: YYYY-MM-DD
source_url: "http://blog.crpg.info/2023/MM/post-slug.html"
archive_date: YYYY-MM-DD
content_type: blog_post
language: id # Most AI posts in Indonesian

# Author Information
author:
  - "Movanet"
ai_generated: true
ai_model: "GPT 3.5"

# Classification
tags:
  - robotpost
  - ai-generated
  - climate-change # or other topics

# Content Warning
content_warning: "This content was automatically generated by AI. No editing or factual checking has been made by CRPG, and as such, it may contain inaccuracies."
editorial_disclaimer: "AI-generated content, experimental, not fact-checked"

# Content Details
description: "AI-generated content about [topic]"
word_count: 1000
has_images: false # Typically no custom images

# Quality Indicators
fact_checked: false
peer_reviewed: false
editorial_oversight: false

# Preservation Metadata
extraction_method: web_scraping
content_complete: true
preserve_as_historical: true # Keep as example of 2023 AI experimentation

aliases:
  - "Robot Post - [Topic]"
---
```

---

## Field Specifications

### Required vs. Optional Fields

**Always Required:**
- `title`
- `date`
- `source_url`
- `archive_date`
- `content_type`
- `language`
- `tags` (at least one tag)

**Conditionally Required:**
- `author` (required for blog posts, research reports, policy briefs)
- `organization` (required for official publications)
- `pdf_url` (required if content is PDF-based)

**Optional but Recommended:**
- `description`
- `keywords`/`key_findings`/`objectives` (depending on type)
- `related_projects`/`related_topics`
- `preservation_metadata` fields

### Data Types and Formats

**Dates:**
- Format: `YYYY-MM-DD` (ISO 8601)
- Example: `2021-01-28`
- Partial dates: Use `YYYY` or `YYYY-MM` if full date unknown

**URLs:**
- Always use full URLs (include protocol)
- Preserve original URLs in `source_url`
- Use relative paths in content body if linking within archive

**Arrays:**
```yaml
tags:
  - tag1
  - tag2
  - tag3
```

**Nested Objects:**
```yaml
author:
  - name: "Author Name"
    affiliation: "Organization"
    orcid: "0000-0000-0000-0000"
```

**Boolean:**
```yaml
ai_generated: true
peer_reviewed: false
```

**Numbers:**
```yaml
page_count: 120
word_count: 3500
pdf_size_mb: 8.5
```

### Language Codes
- `en` - English
- `id` - Bahasa Indonesia
- `en-id` - Mixed (if substantial content in both languages)

### Content Type Enumeration
```
- blog_post
- research_report
- policy_brief
- knowledge_article
- team_profile
- project_page
- event_page
- homepage
- archive_page
- tag_page
```

---

## Quartz Directory Structure

### Recommended Organization

```
content/
├── index.md (Main archive homepage)
├── about/
│   ├── organization.md
│   └── team/
│       ├── mohamad-mova-alafghani.md
│       ├── dyah-paramita.md
│       └── ...
├── research/
│   ├── index.md (Research overview)
│   ├── reports/
│   │   ├── 2016-aiira-water-sanitation.md
│   │   ├── 2017-pops-regulation-indonesia.md
│   │   ├── 2023-iswash-proceedings.md
│   │   └── ...
│   └── policy-briefs/
│       ├── 2021-water-allocation-law-17-2019.md
│       └── ...
├── projects/
│   ├── aiira.md
│   ├── wash-symposium.md
│   ├── ogp-irm.md
│   └── koneksi.md
├── blog/
│   ├── index.md (Blog homepage)
│   ├── 2006/
│   ├── 2007/
│   │   ├── water-privatization-tanzania.md
│   │   ├── nanotechnology-regulation.md
│   │   └── ...
│   ├── ...
│   ├── 2021/
│   │   ├── water-allocation-issues.md
│   │   ├── risk-based-regulation-critique.md
│   │   └── ...
│   ├── 2022/
│   │   └── webinar-swa-mam.md
│   └── 2023/
│       ├── nine-water-governance-articles.md
│       ├── climate-change-disasters-robotpost.md
│       └── ...
├── knowledge-base/
│   ├── index.md (KB homepage)
│   ├── esg/
│   │   ├── overview.md
│   │   └── ...
│   ├── hredd/
│   ├── water-law/
│   ├── environmental-governance/
│   └── public-health/
├── assets/
│   ├── pdfs/
│   │   ├── research-reports/
│   │   ├── policy-briefs/
│   │   └── presentations/
│   └── images/
│       ├── blog/
│       ├── team/
│       └── projects/
└── topics/
    ├── water-governance.md (Topic index)
    ├── regulation.md
    ├── environment.md
    └── ...
```

### File Naming Conventions

**Blog Posts:**
```
YYYY-MM-slug-title.md
Examples:
- 2021-01-water-allocation-issues.md
- 2023-07-nine-water-governance-articles.md
- 2010-03-bonn-charter-drinking-water.md
```

**Research Reports:**
```
YYYY-project-short-title.md
Examples:
- 2016-aiira-water-sanitation.md
- 2017-pops-regulation-indonesia.md
- 2023-iswash-proceedings.md
```

**Other Content:**
```
descriptive-slug.md
Examples:
- mohamad-mova-alafghani.md (team)
- aiira.md (project)
- esg-overview.md (knowledge)
```

---

## Tagging Taxonomy

### Primary Topic Tags

**Core Research Areas:**
- `water-governance`
- `water-law`
- `sanitation`
- `environmental-regulation`
- `regulation`
- `governance`
- `transparency`
- `human-rights`

**Methodologies:**
- `risk-based-regulation`
- `community-based-services`
- `regulatory-framework`
- `policy-analysis`

**Technology & Innovation:**
- `nanotechnology` (historical)
- `legal-technology`
- `ai-generated`

**Geographic:**
- `indonesia`
- `east-nusa-tenggara`
- `east-java`
- `jakarta`

**Institutional:**
- `ogp` (Open Government Partnership)
- `wash` (Water, Sanitation, Hygiene)
- `aiira`
- `unesco`

### Secondary Tags

**Content Type Tags:**
- `research-report`
- `policy-brief`
- `blog-post`
- `knowledge-article`
- `robotpost`

**Quality Indicators:**
- `peer-reviewed`
- `fact-checked`
- `ai-generated`

**Special Collections:**
- `featured`
- `high-priority`
- `multilingual`

### Tag Hierarchy (for Quartz tag pages)

```
Topics
├── Water & Sanitation
│   ├── water-governance
│   ├── water-law
│   ├── sanitation
│   ├── drinking-water
│   └── wastewater
├── Environment
│   ├── environmental-regulation
│   ├── climate-change
│   ├── pops
│   ├── pcb
│   └── waste-management
├── Governance & Policy
│   ├── regulation
│   ├── governance
│   ├── transparency
│   ├── accountability
│   └── ogp
├── Legal & Rights
│   ├── human-rights
│   ├── corporate-law
│   ├── constitutional-law
│   └── investment-law
└── Technology & Innovation
    ├── nanotechnology
    ├── legal-technology
    └── ai-in-law
```

---

## Special Handling Notes

### Bilingual Content

For content with both English and Indonesian versions:

**Option 1: Separate Files**
```
content/blog/2021/2021-01-water-allocation-issues-en.md
content/blog/2021/2021-01-water-allocation-issues-id.md
```

Frontmatter:
```yaml
# English version
has_translation: true
translation_url: "[[2021-01-water-allocation-issues-id]]"
language: en

# Indonesian version
has_translation: true
translation_url: "[[2021-01-water-allocation-issues-en]]"
language: id
```

**Option 2: Single File with Language Sections**
```yaml
language: en-id
primary_language: en
has_indonesian_sections: true
```

### PDF-Primary Content

For content primarily distributed as PDF:

```yaml
content_source: pdf
pdf_url: "assets/pdfs/research-reports/2023-iswash-proceedings.pdf"
pdf_extracted: true # If text extracted from PDF
ocr_performed: false # If scanned
page_preview: "assets/images/pdf-previews/2023-iswash-cover.jpg"
```

### External Links Preservation

```yaml
external_links:
  - url: "https://www.academia.edu/12345"
    type: "academic_paper"
    status: "verified" # or "broken"
    wayback_url: "https://web.archive.org/..." # If archived
```

---

## Usage Examples

### Creating New Blog Post Entry

1. **Extract metadata from blog.crpg.info post**
2. **Create markdown file:** `content/blog/2021/2021-01-water-allocation-issues.md`
3. **Add frontmatter:**
```yaml
---
title: "Water Allocation Issues Under Law 17/2019"
date: 2021-01-28
source_url: "http://blog.crpg.info/2021/01/water-allocation-issues.html"
archive_date: 2025-10-25
content_type: blog_post
language: en
author:
  - "Movanet"
tags:
  - water-governance
  - water-law
  - indonesia
  - policy-brief
description: "Policy brief on water allocation issues under Indonesian Law 17/2019"
---
```
4. **Add content below frontmatter**

### Creating Research Report Entry

1. **Download PDF and extract metadata**
2. **Create markdown file:** `content/research/reports/2016-aiira-water-sanitation.md`
3. **Add comprehensive frontmatter with all research fields**
4. **Include abstract and key findings**
5. **Link to preserved PDF:** `[Download Full Report](../../assets/pdfs/research-reports/2016-aiira-report.pdf)`

---

## Validation Checklist

Before finalizing any content entry:

- [ ] All required fields present
- [ ] Dates in YYYY-MM-DD format
- [ ] URLs are complete and valid
- [ ] At least one tag applied
- [ ] Language code correct
- [ ] Content type matches template
- [ ] Author information complete
- [ ] Description under 200 characters
- [ ] File name follows naming convention
- [ ] PDF links verified (if applicable)
- [ ] Images preserved (if applicable)
- [ ] Related content linked
- [ ] Preservation metadata complete

---

## Summary

### Templates Created
1. ✅ Blog Post Template
2. ✅ Research Report Template
3. ✅ Policy Brief Template
4. ✅ Knowledge Base Article Template
5. ✅ Team Profile Template
6. ✅ Project Page Template
7. ✅ Event/Symposium Template
8. ✅ AI-Generated Content Template

### Directory Structure Defined
- ✅ Quartz-compatible organization
- ✅ Year-based blog archive
- ✅ Topic-based research organization
- ✅ Asset management structure

### Tagging System Established
- ✅ Primary topic taxonomy
- ✅ Content type tags
- ✅ Quality indicators
- ✅ Geographic tags
- ✅ Project/institutional tags

---

**Templates Status:** Complete and ready for Agent 2 implementation
**Compatibility:** Quartz v4, Obsidian, standard Markdown
**Prepared for:** Agent 2 (Content Processing) and Agent 4 (Quartz Conversion)
