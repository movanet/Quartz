# CRPG.info Migration Guide for Site Owners

**Version:** 1.0
**Date:** October 24, 2025
**Purpose:** Guide for CRPG website administrators to facilitate migration to Quartz/GitHub Pages

---

## Table of Contents

1. [Introduction](#introduction)
2. [Why Migrate?](#why-migrate)
3. [What You Need to Do](#what-you-need-to-do)
4. [Step-by-Step Export Instructions](#step-by-step-export-instructions)
5. [What Happens Next?](#what-happens-next)
6. [Timeline](#timeline)
7. [FAQs](#faqs)
8. [Contact Information](#contact-information)

---

## Introduction

This guide explains how to export your WordPress content to enable migration to a modern, high-performance static site platform called Quartz, hosted on GitHub Pages.

**Important**: This process is **safe** and **non-destructive**. Your current website will remain fully operational throughout. We will only be creating copies of your content.

---

## Why Migrate?

### Benefits of Moving to Quartz on GitHub Pages

#### 1. Performance
- **Current:** Page loads in 2-3 seconds
- **After Migration:** Page loads in 100-300ms (10x faster)
- Better user experience, especially on mobile devices
- Improved search engine rankings due to speed

#### 2. Security
- **Current:** WordPress requires constant security updates, vulnerable to attacks
- **After Migration:** Static site = no database, no PHP, no vulnerabilities
- Zero maintenance for security patches
- No risk of hacking, SQL injection, or malware

#### 3. Cost Savings
- **Current:** ~$600-2,500/year (hosting, security, maintenance, backups)
- **After Migration:** ~$15/year (domain only)
- Free hosting on GitHub's infrastructure
- No server costs, no plugin costs, no security costs

#### 4. Reliability
- **Current:** 99.0-99.5% uptime (typical shared hosting)
- **After Migration:** 99.9%+ uptime (GitHub infrastructure)
- Automatic backups (Git version control)
- Disaster recovery built-in

#### 5. Modern Features
- Version control: Complete history of all changes
- Collaboration: Multiple team members can contribute
- Better mobile experience
- Faster search functionality
- Improved SEO

#### 6. Future-Proof
- No vendor lock-in (all content is plain text Markdown)
- Easy to migrate elsewhere if needed in future
- Content preserved in human-readable format
- Modern developer workflow

### What You're NOT Losing

✅ **All content** (posts, pages, research papers)
✅ **All images and files** (PDFs, documents)
✅ **URL structure** (can be preserved exactly)
✅ **SEO rankings** (maintained through redirects)
✅ **Design/branding** (can be replicated or improved)

---

## What You Need to Do

We need three things from you:

### 1. WordPress Content Export (Required)
A complete export of all posts, pages, and metadata from WordPress.

**Time Required:** 5-10 minutes
**Technical Difficulty:** Easy (step-by-step instructions below)

### 2. Media Library Access (Required)
Access to your images, PDFs, and other uploaded files.

**Time Required:** 10-20 minutes
**Technical Difficulty:** Easy to Moderate (instructions below)

### 3. Additional Information (Optional but Helpful)
Information about custom features, plugins, or special content types.

**Time Required:** 5 minutes
**Technical Difficulty:** Easy (questionnaire provided)

---

## Step-by-Step Export Instructions

### Method 1: WordPress Built-in Exporter (Recommended)

#### Step 1: Access WordPress Admin

1. Go to your WordPress admin URL: `https://crpg.info/wp-admin`
2. Enter your username and password
3. You should see the WordPress dashboard

#### Step 2: Navigate to Export Tool

1. In the left sidebar, hover over **"Tools"**
2. Click **"Export"**
3. You should see the "Export" page

![WordPress Export Menu](/assets/images/migration-guide/wordpress-export-menu.png)
*Location of Export tool in WordPress admin*

#### Step 3: Select Export Options

On the Export page, you'll see several options:

1. Select: **"All content"** (radio button)
   - This exports posts, pages, comments, custom fields, terms, navigation menus, and custom posts

2. Click the blue button: **"Download Export File"**

![WordPress Export Options](/assets/images/migration-guide/wordpress-export-options.png)
*Select "All content" and click Download Export File*

#### Step 4: Save the File

1. Your browser will download a file named something like:
   - `crpg.wordpress.2024-10-24.xml`
   - or `crpg.info.wordpress.2024-10-24.xml`

2. **Save this file** in a safe location

3. **Important:** Do NOT open or edit this file

#### Step 5: Send the File

**Option A - Email (if file is under 25MB):**
```
To: [migration-team-email]
Subject: CRPG.info WordPress Export
Attachment: [the XML file]
```

**Option B - Cloud Storage (for large files):**
1. Upload to Google Drive, Dropbox, or similar
2. Create a sharing link (view-only access)
3. Email the link to: [migration-team-email]

### Method 2: Media Library Export

#### Option A: FTP/SFTP Access (Preferred)

If you have FTP/SFTP credentials for your hosting:

1. **Connect using FTP client** (FileZilla, Cyberduck, etc.)
2. **Navigate to:** `/wp-content/uploads/`
3. **Download the entire uploads folder**
4. **Compress to ZIP:** Right-click → "Compress"
5. **Upload to cloud storage** and share link with migration team

**FTP Credentials Location:**
- Usually in hosting control panel (cPanel, Plesk)
- Or in confirmation email from hosting provider
- Contact your hosting provider if you don't have them

#### Option B: Plugin-Based Export (Alternative)

If FTP is not available, use a plugin:

1. **Install Plugin:** "Export Media Library"
   - Go to: Plugins → Add New
   - Search: "Export Media Library"
   - Click: Install Now → Activate

2. **Run Export:**
   - Go to: Tools → Export Media Library
   - Click: "Export All Media"
   - Download generated ZIP file

3. **Send File:**
   - Upload to cloud storage and share link

#### Option C: Request from Hosting Provider

Contact your hosting provider and request:
```
Hi [Hosting Provider],

Could you please provide a backup of the /wp-content/uploads/
directory for crpg.info? We need this for a website migration project.

Thank you!
```

### Method 3: Additional Information Questionnaire

Please answer these questions to help us understand your website better:

#### Website Structure
1. **What types of content do you have?**
   - [ ] Blog posts
   - [ ] Static pages (About, Contact, etc.)
   - [ ] Research papers/publications
   - [ ] Events
   - [ ] Staff/team profiles
   - [ ] Other: _______________

2. **Do you use any custom post types?**
   - [ ] Yes → Please list: _______________
   - [ ] No
   - [ ] Not sure

3. **Important plugins affecting content:**
   - [ ] Contact form (Which one? _______)
   - [ ] Event calendar (Which one? _______)
   - [ ] PDF embedder (Which one? _______)
   - [ ] Other important plugins: _______________

#### Features & Functionality
4. **What features are essential to preserve?**
   - [ ] Contact forms
   - [ ] Search functionality
   - [ ] Document downloads (PDFs)
   - [ ] Image galleries
   - [ ] Comments on blog posts
   - [ ] Newsletter signup
   - [ ] Social media integration
   - [ ] Other: _______________

5. **Do you have subdomains?**
   - [ ] blog.crpg.info → [ ] Active [ ] Inactive
   - [ ] knowledge.crpg.info → [ ] Active [ ] Inactive
   - [ ] Other: _______________ → [ ] Active [ ] Inactive

#### Users & Permissions
6. **Who needs to update content after migration?**
   - Number of content editors: _____
   - Technical comfort level: [ ] Beginner [ ] Intermediate [ ] Advanced
   - Preferred editing method: [ ] Web interface [ ] Git/GitHub [ ] Either

#### Design & Branding
7. **Design preferences:**
   - [ ] Keep current design as closely as possible
   - [ ] Open to modern redesign while keeping branding
   - [ ] Complete redesign (we can discuss options)

8. **Essential design elements to preserve:**
   - [ ] Logo
   - [ ] Color scheme
   - [ ] Typography/fonts
   - [ ] Layout structure
   - [ ] Other: _______________

#### Analytics & SEO
9. **Do you use analytics?**
   - [ ] Google Analytics (Account ID: _______)
   - [ ] Other analytics: _______________
   - [ ] No analytics currently

10. **Important pages for SEO:**
    - List your top 5 most-visited pages: _______________

---

## What Happens Next?

### Our Process

Once you provide the WordPress export and media files:

#### Week 1: Content Processing
- We parse the WordPress export
- Convert content to Markdown format
- Organize files in proper directory structure
- Map metadata to new frontmatter format

#### Week 2: Asset Migration
- Download and organize all images and PDFs
- Optimize images for web (compression, format conversion)
- Update all file references in content
- Test all downloads and media

#### Week 3: Site Development
- Configure Quartz with your branding
- Set up navigation and structure
- Implement search functionality
- Create custom templates as needed

#### Week 4: Quality Assurance
- Review every page for accuracy
- Test all internal links
- Verify all images and PDFs work
- Check mobile responsiveness
- Test search functionality

#### Week 5: Review & Feedback
- **You review the new site** (staging environment)
- Provide feedback on any issues
- We make necessary adjustments
- Final approval from your team

#### Week 6: Launch
- Deploy to GitHub Pages
- Configure custom domain (crpg.info)
- Set up redirects from old URLs
- Update DNS records
- Monitor for any issues

### Your Involvement Required

**Time Investment from Your Team:**

- **Week 1:** 1-2 hours (provide exports and information)
- **Week 5:** 3-5 hours (review new site, provide feedback)
- **Week 6:** 1 hour (DNS update, final approval)

**Total:** ~5-8 hours over 6 weeks

---

## Timeline

| Week | Activities | Your Involvement |
|------|-----------|------------------|
| 1 | Content processing | Provide WordPress export ✓ |
| 2 | Asset migration | Provide media files ✓ |
| 3 | Site development | None (we're working) |
| 4 | Quality assurance | None (we're testing) |
| 5 | Review & feedback | Review site, provide feedback ✓ |
| 6 | Launch | DNS update, final approval ✓ |

**Total Timeline:** 6 weeks from receiving your export

**Accelerated Option:** Can be compressed to 3-4 weeks if needed

---

## FAQs

### General Questions

**Q: Will my current website go offline during migration?**
**A:** No. Your current WordPress site remains fully operational until the new site is ready and you approve the launch.

**Q: Can I continue updating the WordPress site during migration?**
**A:** Yes, but please inform us of any major changes so we can incorporate them into the new site.

**Q: What if I change my mind halfway through?**
**A:** No problem. Your current site is untouched. You can stop the migration at any time.

**Q: Will my Google rankings be affected?**
**A:** No. We'll implement proper redirects to maintain SEO. Your rankings should be preserved or even improve due to better performance.

### Technical Questions

**Q: Can I edit content after migration without knowing code?**
**A:** Yes. We'll provide:
1. Web-based editor (GitHub's interface - very user-friendly)
2. Desktop app (Obsidian - works like Microsoft Word)
3. Training documentation
4. Video tutorials

**Q: What happens to my WordPress site after migration?**
**A:** You can keep it as a backup initially, then decommission it once you're satisfied with the new site. This saves hosting costs.

**Q: Can I migrate my blog.crpg.info and knowledge.crpg.info subdomains too?**
**A:** Yes! We can migrate all subdomains. Just include them in the export.

**Q: What about contact forms?**
**A:** We'll integrate a modern form solution (e.g., Formspree, Netlify Forms, or similar) that works seamlessly with static sites.

**Q: Can I still have a search function?**
**A:** Yes. Quartz includes built-in search that's actually faster than WordPress search.

**Q: What about comments on blog posts?**
**A:** We can integrate comment systems like Giscus (GitHub-based) or other services. Existing comments from WordPress will be migrated.

### Content Questions

**Q: Can you migrate my WordPress comments?**
**A:** Yes, comments are included in the WordPress export and can be preserved. We'll discuss the best implementation for your needs.

**Q: What about my newsletter subscribers?**
**A:** Newsletter systems are typically separate (Mailchimp, etc.). Those are not affected by site migration.

**Q: Will downloadable PDFs still work?**
**A:** Yes, all PDFs and other downloadable files will be migrated and remain accessible at the same URLs (or redirected if URLs change).

### Cost Questions

**Q: What does the migration cost?**
**A:** [This depends on your arrangement - insert appropriate information]

**Q: What are the ongoing costs after migration?**
**A:**
- Domain registration: ~$15/year (same as now)
- GitHub Pages hosting: Free
- Total: ~$15/year (vs. $600-2,500/year currently)

**Q: Are there any hidden costs?**
**A:** No. GitHub Pages is free for public repositories. All tools we use are open-source and free.

### After Migration

**Q: How do I update content after migration?**
**A:** Three options:
1. **Easy:** Edit files directly on GitHub (web interface)
2. **Medium:** Use Obsidian app (works like Word)
3. **Advanced:** Use Git with your preferred editor

We'll provide training for all methods.

**Q: Can multiple people edit the site?**
**A:** Yes. GitHub supports unlimited collaborators. Each person can have appropriate permissions.

**Q: What if something breaks?**
**A:**
1. Git version control means we can restore any previous version instantly
2. We'll provide documentation and support
3. Active Quartz community for help

**Q: Can I hire someone else to maintain the site later?**
**A:** Yes. Since it's built with open-source tools (Quartz, Markdown, Git), any developer familiar with these technologies can help. No vendor lock-in.

---

## Technical Details (For Your IT Team)

If you have technical staff, they may want these details:

### Architecture
- **Static Site Generator:** Quartz (TypeScript-based, built on top of Astro)
- **Content Format:** Markdown with YAML frontmatter
- **Hosting:** GitHub Pages (Cloudflare CDN)
- **Version Control:** Git (GitHub)
- **Build Process:** Automated via GitHub Actions
- **Domain:** Custom domain via DNS CNAME record

### Export Format
- **WordPress Export:** WXR (WordPress eXtended RSS) XML format
- **Content Processing:** XML parsing → HTML to Markdown conversion
- **Frontmatter:** WordPress metadata mapped to YAML
- **Assets:** Downloaded via HTTP or FTP from wp-content/uploads

### Security Considerations
- **Static site:** No server-side execution, no database
- **HTTPS:** Automatic via GitHub Pages
- **DDoS Protection:** Cloudflare CDN
- **Content Security:** Branch protection, required reviews
- **Access Control:** GitHub team permissions and roles

### Performance Specs
- **Build Time:** ~1-3 minutes for full site
- **Page Load:** 100-300ms (first load), 10-50ms (cached)
- **CDN:** Global edge network
- **Bandwidth:** Unlimited
- **Storage:** 1GB soft limit (more than sufficient for most sites)

---

## Contact Information

### Primary Contact
**Migration Team Lead:**
[Name]
Email: [email]
Phone: [phone]

### Technical Support
**Developer:**
[Name]
Email: [email]

### Project Manager
**PM:**
[Name]
Email: [email]

### Best Ways to Reach Us
- **Email:** [primary-email] (response within 24 hours)
- **Phone:** [phone] (business hours: 9 AM - 5 PM WIB)
- **Video Call:** Available by appointment (Zoom/Google Meet)

---

## Ready to Start?

### Checklist

Before sending your export, make sure you have:

- [ ] WordPress XML export file (All content)
- [ ] Media library (via FTP download, plugin, or hosting provider)
- [ ] Completed questionnaire (above)
- [ ] List of any special requirements or concerns
- [ ] Contact information for follow-up questions

### Send Everything To

**Email:** [migration-email]

**Subject Line:** CRPG.info Migration - Export Files

**Include:**
1. WordPress XML export (attached or shared link)
2. Media library ZIP (shared link if large)
3. Completed questionnaire (in email body or attached)
4. Your preferred contact method and availability

---

## Thank You!

We appreciate your trust in us for this important project. Migrating your website is a significant decision, and we're committed to making the process smooth and the result exceptional.

The new Quartz-based site will provide faster performance, better security, and significant cost savings while maintaining all the content and functionality that make crpg.info valuable to your audience.

If you have any questions or concerns at any point, please don't hesitate to reach out.

**Looking forward to working with you!**

---

*This guide was prepared by the CRPG Migration Team on October 24, 2025.*

*Version 1.0 | [Download PDF Version](#) | [Print-Friendly Version](#)*
