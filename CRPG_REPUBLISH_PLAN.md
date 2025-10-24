# Comprehensive Plan: Republish crpg.info as GitHub Pages using Quartz

## Project Overview
Transform crpg.info website into a static GitHub Pages site using Quartz static site generator, enabling version control, easy updates, and free hosting.

## Architecture

### Technology Stack
- **Static Site Generator**: Quartz v4 (already cloned)
- **Content Format**: Markdown with frontmatter
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Development Tools**:
  - Claudable (for UI building)
  - Firecrawl (for content extraction)
  - MCP Context7 (for documentation reference)
  - MCP Sequential Thinking (for problem-solving)

## Phase 1: Content Acquisition & Conversion

### Task 1.1: Extract Website Content
**Objective**: Get all content from crpg.info in a usable format

**Options** (in order of preference):
1. **Database/CMS Export** (if owner has access)
   - WordPress: Use Export tool or WP-CLI
   - Ghost: Use built-in export feature
   - Direct database dump

2. **Firecrawl/Scraping** (if public access)
   - Use Firecrawl self-hosted instance with Docker
   - Alternative: Manual wget mirroring on local machine
   - Parse HTML and convert to markdown

3. **Manual Content Migration**
   - Copy-paste critical pages
   - Recreate structure manually

**Deliverables**:
- Raw content files (HTML/JSON/Markdown)
- Asset inventory (images, PDFs, downloads)
- Site structure map

### Task 1.2: Convert to Markdown
**Objective**: Transform all content to Quartz-compatible markdown

**Tools**:
- html2text for HTML conversion
- Custom Python script (scrape_crpg.py - already created)
- Pandoc for complex conversions

**Process**:
1. Parse HTML structure
2. Extract metadata (title, date, author, categories)
3. Convert content to markdown
4. Add Quartz frontmatter
5. Organize into directory structure

**Deliverables**:
- Markdown files in `quartz/content/`
- Proper frontmatter for all pages
- Internal links updated to markdown format

### Task 1.3: Asset Migration
**Objective**: Download and organize all media assets

**Process**:
1. Download images, PDFs, videos
2. Organize in `quartz/content/assets/`
3. Update asset references in markdown files
4. Optimize images for web delivery

**Deliverables**:
- All assets in version control
- Updated markdown with correct asset paths

## Phase 2: Quartz Configuration & Customization

### Task 2.1: Configure Quartz
**Objective**: Set up Quartz with appropriate settings for crpg.info

**Files to Configure**:
- `quartz.config.ts`: Site metadata, plugins, build options
- `quartz.layout.ts`: Page layout, components
- `package.json`: Dependencies

**Key Settings**:
```typescript
// quartz.config.ts
configuration: {
  pageTitle: "CRPG.info",
  baseUrl: "username.github.io/crpg-info",
  analytics: {
    provider: 'google',
    tagId: 'G-XXXXXXXXXX'
  }
}
```

**Deliverables**:
- Configured quartz.config.ts
- Custom layout if needed
- Theme selection/customization

### Task 2.2: Theme & Styling
**Objective**: Match or improve upon original crpg.info design

**Options**:
1. Use default Quartz theme
2. Customize CSS variables
3. Create custom theme with Claudable

**Process**:
1. Analyze original site design
2. Select/create color scheme
3. Configure typography
4. Add custom CSS if needed

**Deliverables**:
- Custom CSS files
- Theme configuration
- Brand assets (logo, favicon)

### Task 2.3: Navigation & Features
**Objective**: Set up site navigation and Quartz features

**Components to Configure**:
- Graph view for content connections
- Search functionality
- Table of contents
- Backlinks
- Tag pages
- Explorer (file tree)

**Deliverables**:
- Configured navigation
- Enabled Quartz features
- Custom components if needed

## Phase 3: GitHub Repository Setup

### Task 3.1: Create GitHub Pages Repository
**Objective**: Set up repository for hosting

**Process**:
1. Create new repository: `username.github.io` or `crpg-info`
2. Initialize with README
3. Add .gitignore for Node.js
4. Set up branch structure (main for content, gh-pages for build)

**Deliverables**:
- GitHub repository created
- Repository settings configured
- Branch protection rules set

### Task 3.2: Configure GitHub Actions
**Objective**: Automate Quartz build and deployment

**Workflow File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy Quartz to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build Quartz
        run: npx quartz build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

**Deliverables**:
- GitHub Actions workflow file
- Successful build pipeline
- Automated deployment

### Task 3.3: Domain Configuration
**Objective**: Point crpg.info to GitHub Pages

**Process**:
1. Add CNAME file to repository
2. Configure DNS records:
   - A records pointing to GitHub Pages IPs
   - CNAME for www subdomain
3. Enable HTTPS in GitHub Pages settings

**DNS Records**:
```
Type  Name  Value
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   username.github.io
```

**Deliverables**:
- CNAME file in repository
- DNS configured
- HTTPS enabled

## Phase 4: Testing & Optimization

### Task 4.1: Content Review
**Objective**: Verify all content migrated correctly

**Checklist**:
- [ ] All pages accessible
- [ ] Images loading correctly
- [ ] Links working (internal and external)
- [ ] Formatting preserved
- [ ] Code blocks rendering
- [ ] Tables displaying properly

**Deliverables**:
- Content audit report
- Issue list
- Fixes implemented

### Task 4.2: Performance Optimization
**Objective**: Ensure fast page loads

**Optimizations**:
- Image optimization (WebP, compression)
- Minify CSS/JS
- Enable caching headers
- CDN for assets (jsDelivr, Cloudflare)
- Lazy loading for images

**Deliverables**:
- Lighthouse score > 90
- Optimized assets
- Fast page load times

### Task 4.3: SEO Setup
**Objective**: Maintain/improve search rankings

**Tasks**:
- Add meta descriptions to all pages
- Configure sitemap.xml
- Set up robots.txt
- Verify Open Graph tags
- Submit to Google Search Console
- Create redirects from old URLs if needed

**Deliverables**:
- SEO metadata in frontmatter
- sitemap.xml generated
- robots.txt configured
- Search Console verified

## Phase 5: Launch & Maintenance

### Task 5.1: Soft Launch
**Objective**: Test live site with limited audience

**Process**:
1. Deploy to staging URL
2. Share with beta testers
3. Collect feedback
4. Make adjustments

**Deliverables**:
- Staging site live
- Feedback collected
- Issues resolved

### Task 5.2: Production Launch
**Objective**: Switch crpg.info to new GitHub Pages site

**Process**:
1. Final content review
2. Update DNS to point to GitHub Pages
3. Monitor for issues
4. Announce to users

**Deliverables**:
- Production site live
- DNS propagated
- Announcement made

### Task 5.3: Documentation
**Objective**: Create guides for content updates

**Documents**:
- Content contribution guide
- Markdown formatting reference
- Deployment process
- Troubleshooting guide

**Deliverables**:
- README.md with setup instructions
- CONTRIBUTING.md
- Documentation site

## Phase 6: Ongoing Maintenance

### Task 6.1: Content Updates
**Process**:
1. Create markdown file or edit existing
2. Add frontmatter
3. Commit to repository
4. GitHub Actions auto-deploys

### Task 6.2: Monitoring
**Tools**:
- Google Analytics for traffic
- GitHub Issues for bug tracking
- Uptime monitoring (UptimeRobot)

### Task 6.3: Backup Strategy
**Backup Points**:
- Git history (content)
- GitHub repository
- Periodic exports
- Asset backups

## Parallel Execution Strategy

### Agent Orchestration
Using main Claude Code agent as orchestrator with specialized sub-agents:

**Agent 1: Content Migration Agent**
- Focus: Extract and convert crpg.info content
- Tools: Firecrawl, html2text, scraping scripts
- Output: Markdown files with frontmatter

**Agent 2: Quartz Configuration Agent**
- Focus: Configure and customize Quartz
- Tools: Context7 MCP for Quartz docs
- Output: Configured quartz.config.ts, theme files

**Agent 3: GitHub Setup Agent**
- Focus: Repository setup and CI/CD
- Tools: GitHub CLI, git
- Output: Repository with GitHub Actions

**Agent 4: Testing & QA Agent**
- Focus: Validate migration, test functionality
- Tools: Lighthouse, link checkers
- Output: Test reports, issue list

**Agent 5: Documentation Agent**
- Focus: Create guides and documentation
- Tools: Markdown, Claudable for docs site
- Output: README, CONTRIBUTING, user guides

### Execution Plan
1. **Parallel Phase 1**: Agents 1, 2, 3 work simultaneously
   - Agent 1: Content extraction
   - Agent 2: Quartz setup
   - Agent 3: GitHub repository creation

2. **Sequential Phase 2**: Agent 1 → Agent 2 integration
   - Move converted content into configured Quartz

3. **Parallel Phase 3**: Agents 2, 3, 5 work simultaneously
   - Agent 2: Theme customization
   - Agent 3: GitHub Actions setup
   - Agent 5: Documentation writing

4. **Sequential Phase 4**: Agent 4 validates
   - Test build
   - Content verification
   - Performance check

5. **Final Phase**: Main orchestrator deploys
   - Review all agent outputs
   - Final integration
   - Production deployment

## Tools & Resources

### MCP Servers
- **Context7**: Real-time documentation for Quartz, GitHub Pages
- **Sequential Thinking**: Problem-solving for complex migration issues

### Development Tools
- **Claudable**: Build custom UI components if needed
- **Firecrawl**: Web scraping and content extraction
- **GitHub CLI**: Repository management
- **Node.js**: Run Quartz build

### Monitoring & Analytics
- Google Analytics
- Google Search Console
- GitHub Insights
- Lighthouse CI

## Success Criteria

- [ ] All crpg.info content migrated to markdown
- [ ] Site builds successfully with Quartz
- [ ] GitHub Pages deployment working
- [ ] All links functional
- [ ] Images and assets loading
- [ ] SEO maintained or improved
- [ ] Page load time < 2 seconds
- [ ] Mobile responsive
- [ ] Search functionality working
- [ ] Documentation complete
- [ ] Automated deployment pipeline functional

## Risk Mitigation

**Risk 1: Content Access Denied**
- Mitigation: Use multiple extraction methods, contact site owner

**Risk 2: Complex Dynamic Features**
- Mitigation: Recreate with static alternatives, JavaScript widgets

**Risk 3: Large Asset Files**
- Mitigation: Use Git LFS, external CDN for large files

**Risk 4: SEO Loss During Migration**
- Mitigation: Maintain URL structure, 301 redirects, sitemap

**Risk 5: Build Failures**
- Mitigation: Test locally first, incremental migrations, CI/CD testing

## Timeline Estimate

- Phase 1: 2-4 hours (depends on content volume)
- Phase 2: 1-2 hours
- Phase 3: 1 hour
- Phase 4: 2-3 hours
- Phase 5: 1 hour
- **Total**: 7-11 hours

With parallel agent execution: **4-6 hours**

## Next Steps

1. ✅ Install MCP servers (context7, sequential-thinking)
2. ✅ Create comprehensive plan (this document)
3. 🔄 Launch parallel agents for execution
4. ⏳ Monitor progress and coordinate
5. ⏳ Final integration and deployment
