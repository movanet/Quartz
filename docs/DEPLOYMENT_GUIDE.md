# Deployment Guide - GitHub Pages

Complete guide for deploying the crpg.info site to GitHub Pages using GitHub Actions.

## Table of Contents

- [Overview](#overview)
- [GitHub Pages Setup](#github-pages-setup)
- [GitHub Actions Workflow](#github-actions-workflow)
- [Deployment Process](#deployment-process)
- [Domain Configuration](#domain-configuration)
- [SSL/HTTPS Setup](#sslhttps-setup)
- [Rollback Procedures](#rollback-procedures)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Troubleshooting Deployments](#troubleshooting-deployments)

---

## Overview

### Deployment Architecture

```
Local Changes → Git Push → GitHub → GitHub Actions → Build → GitHub Pages → Live Site
```

**Components:**
- **Source**: Markdown content in `content/` directory
- **Build**: Quartz generates static HTML/CSS/JS
- **Deploy**: GitHub Actions publishes to `gh-pages` branch
- **Host**: GitHub Pages serves the site

**Deployment Triggers:**
- Push to `main` branch
- Manual workflow dispatch
- Pull request merges

---

## GitHub Pages Setup

### 1. Repository Configuration

**Option A: User/Organization Site**

Repository name: `username.github.io`
- URL: `https://username.github.io`
- Simpler setup, no base path needed

**Option B: Project Site**

Repository name: `crpg-info`
- URL: `https://username.github.io/crpg-info`
- Requires base URL configuration

### 2. Enable GitHub Pages

1. Go to repository **Settings**
2. Navigate to **Pages** section
3. Under **Source**, select:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Click **Save**

### 3. Configure Quartz Base URL

Update `quartz.config.ts`:

```typescript
configuration: {
  pageTitle: "CRPG.info",
  baseUrl: "username.github.io/crpg-info",  // or just "username.github.io"
  // ... rest of config
}
```

### 4. Create CNAME File (for custom domain)

If using a custom domain like `crpg.info`:

```bash
# Create CNAME in quartz/static/
echo "crpg.info" > quartz/static/CNAME
```

This file will be copied to the `gh-pages` branch during deployment.

---

## GitHub Actions Workflow

### Workflow File Location

Create `.github/workflows/deploy.yml` in your repository root:

```yaml
name: Deploy Quartz to GitHub Pages

on:
  # Trigger on push to main branch
  push:
    branches:
      - main

  # Allow manual trigger
  workflow_dispatch:

# Required permissions
permissions:
  contents: read
  pages: write
  id-token: write

# Prevent concurrent deployments
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      # 1. Checkout repository
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Fetch all history for git dates

      # 2. Setup Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      # 3. Cache dependencies
      - name: Cache dependencies
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      # 4. Install dependencies
      - name: Install dependencies
        run: |
          cd quartz
          npm ci

      # 5. Build Quartz
      - name: Build Quartz
        run: |
          cd quartz
          npx quartz build

      # 6. Upload artifact
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./quartz/public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-22.04
    needs: build

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Alternative: Deploy to gh-pages Branch

If you prefer the traditional gh-pages branch approach:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-22.04

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: |
          cd quartz
          npm ci

      - name: Build site
        run: |
          cd quartz
          npx quartz build

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./quartz/public
          publish_branch: gh-pages
          force_orphan: true
          user_name: 'github-actions[bot]'
          user_email: 'github-actions[bot]@users.noreply.github.com'
```

### Workflow Customization

**Build on specific paths only:**

```yaml
on:
  push:
    branches: [ main ]
    paths:
      - 'quartz/content/**'
      - 'quartz/quartz.config.ts'
      - 'quartz/quartz.layout.ts'
```

**Scheduled rebuilds (for updated dates):**

```yaml
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday at midnight
```

**Pull request previews:**

```yaml
on:
  pull_request:
    branches: [ main ]

jobs:
  preview:
    runs-on: ubuntu-22.04
    steps:
      # ... build steps ...
      - name: Deploy preview
        uses: rossjrw/pr-preview-action@v1
        with:
          source-dir: ./quartz/public
```

---

## Deployment Process

### Automated Deployment

**Standard workflow:**

1. Make changes to content or configuration
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Add new review"
   git push origin main
   ```
3. GitHub Actions automatically triggers
4. Build completes in 2-5 minutes
5. Site updates automatically

### Manual Deployment

Trigger deployment without code changes:

1. Go to **Actions** tab in GitHub
2. Select **Deploy Quartz to GitHub Pages** workflow
3. Click **Run workflow**
4. Select branch (usually `main`)
5. Click **Run workflow** button

### Deployment Status

**Check deployment status:**

1. **Actions Tab**: View running/completed workflows
2. **Environments**: See deployment history
3. **Commit Status**: Green checkmark indicates success

**GitHub CLI:**
```bash
# View latest workflow runs
gh run list --workflow=deploy.yml

# View specific run details
gh run view <run-id>

# Watch a running deployment
gh run watch
```

---

## Domain Configuration

### Custom Domain Setup (crpg.info)

#### Step 1: Configure DNS

Add the following DNS records with your domain registrar:

**For apex domain (crpg.info):**

```
Type    Name    Value                   TTL
A       @       185.199.108.153         3600
A       @       185.199.109.153         3600
A       @       185.199.110.153         3600
A       @       185.199.111.153         3600
```

**For www subdomain:**

```
Type    Name    Value                      TTL
CNAME   www     username.github.io         3600
```

**Example (Cloudflare):**
- Navigate to DNS settings
- Add A records pointing to GitHub's IPs
- Add CNAME for www
- Disable Cloudflare proxy (orange cloud) initially

**Example (Namecheap):**
- Advanced DNS settings
- Add A Records with GitHub IPs
- Add CNAME Record for www

#### Step 2: Add Custom Domain in GitHub

1. Go to repository **Settings → Pages**
2. Under **Custom domain**, enter: `crpg.info`
3. Click **Save**
4. GitHub will verify DNS configuration
5. Wait for DNS propagation (can take up to 48 hours)

#### Step 3: Verify CNAME File

Ensure `CNAME` file exists in `quartz/static/CNAME`:

```
crpg.info
```

This file must be present in the deployed site.

### Subdomain Setup

For `blog.crpg.info`:

1. Add CNAME record:
   ```
   Type    Name    Value                   TTL
   CNAME   blog    username.github.io      3600
   ```

2. Configure in GitHub Pages settings:
   - Custom domain: `blog.crpg.info`

### DNS Propagation Check

```bash
# Check DNS resolution
dig crpg.info +short
dig www.crpg.info +short

# Check from different servers
nslookup crpg.info 8.8.8.8
```

---

## SSL/HTTPS Setup

### Enable HTTPS

GitHub Pages provides free SSL via Let's Encrypt:

1. Go to **Settings → Pages**
2. Wait for custom domain verification
3. Check **Enforce HTTPS** checkbox
4. Wait for certificate provisioning (can take 1 hour)

### Certificate Renewal

GitHub automatically renews SSL certificates. No action needed.

### Force HTTPS

After HTTPS is enabled, configure redirects:

**In workflow (automatic):**
GitHub Pages automatically redirects HTTP to HTTPS when "Enforce HTTPS" is enabled.

**Verify HTTPS:**
```bash
curl -I https://crpg.info
# Should return 200 OK

curl -I http://crpg.info
# Should return 301 redirect to https
```

### SSL Troubleshooting

**Certificate not provisioning:**
1. Verify DNS is correct
2. Remove and re-add custom domain
3. Wait 1 hour
4. Check GitHub Pages status: https://www.githubstatus.com/

**Mixed content warnings:**
1. Ensure all assets use HTTPS
2. Update image URLs in content
3. Check external resources

---

## Rollback Procedures

### Quick Rollback to Previous Deployment

**Method 1: Revert Commit**

```bash
# Find the commit to revert to
git log --oneline

# Revert to specific commit
git revert <commit-hash>
git push origin main

# Or reset to previous commit (destructive)
git reset --hard <commit-hash>
git push --force origin main
```

**Method 2: Redeploy Previous Version**

```bash
# Checkout previous commit
git checkout <commit-hash>

# Create new branch
git checkout -b rollback-temp

# Force push to main (triggers deployment)
git push --force origin rollback-temp:main
```

**Method 3: Manual Deployment of gh-pages**

```bash
# If using gh-pages branch approach
git checkout gh-pages
git reset --hard <previous-commit>
git push --force origin gh-pages
```

### Deployment Rollback Workflow

Create `.github/workflows/rollback.yml`:

```yaml
name: Rollback Deployment

on:
  workflow_dispatch:
    inputs:
      commit_sha:
        description: 'Commit SHA to rollback to'
        required: true

jobs:
  rollback:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout specific commit
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event.inputs.commit_sha }}
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install and build
        run: |
          cd quartz
          npm ci
          npx quartz build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./quartz/public
```

Usage:
1. Go to Actions → Rollback Deployment
2. Enter commit SHA to rollback to
3. Run workflow

### Emergency Procedures

**Site is down completely:**

1. Check GitHub Pages status
2. Verify custom domain configuration
3. Check DNS records
4. Review latest deployment logs
5. Rollback to last known good commit

**Broken content but site loads:**

1. Identify problematic commit
2. Revert specific files:
   ```bash
   git checkout <previous-commit> -- path/to/file.md
   git commit -m "Revert broken content"
   git push
   ```

**Build failures:**

1. Check Actions logs for errors
2. Test build locally
3. Fix issues
4. Push fix or rollback

---

## Monitoring and Maintenance

### Deployment Monitoring

**GitHub Actions Notifications:**

Enable notifications in GitHub settings:
- Settings → Notifications → Actions
- Choose email/web notifications for failures

**Status Badges:**

Add to README.md:
```markdown
![Deploy Status](https://github.com/username/crpg-info/actions/workflows/deploy.yml/badge.svg)
```

### Analytics Integration

**Google Analytics:**

Update `quartz.config.ts`:
```typescript
analytics: {
  provider: "google",
  tagId: "G-XXXXXXXXXX"
}
```

**Plausible Analytics:**

```typescript
analytics: {
  provider: "plausible"
}
```

### Uptime Monitoring

**Recommended services:**
- UptimeRobot (free tier available)
- Pingdom
- StatusCake
- Better Uptime

**Setup:**
1. Create account
2. Add monitor for `https://crpg.info`
3. Set check interval (5 minutes)
4. Configure alerts (email, Slack)

### Performance Monitoring

**Lighthouse CI:**

Add to workflow:

```yaml
- name: Run Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      https://crpg.info
    uploadArtifacts: true
```

**Core Web Vitals:**

Monitor via:
- Google Search Console
- PageSpeed Insights
- Chrome User Experience Report

### Regular Maintenance

**Weekly:**
- Check deployment status
- Review analytics
- Monitor uptime reports

**Monthly:**
- Update dependencies:
  ```bash
  npm update
  npm audit fix
  ```
- Review and update content
- Check for broken links

**Quarterly:**
- Review and optimize images
- Audit site performance
- Update documentation

---

## Troubleshooting Deployments

### Build Failures

**Error: "npm install failed"**

```yaml
# Solution: Use npm ci instead
- name: Install dependencies
  run: npm ci
```

**Error: "Module not found"**

```bash
# Check package.json dependencies
# Ensure all imports are correct
# Clear cache and reinstall locally
rm -rf node_modules package-lock.json
npm install
```

**Error: "Build timed out"**

```yaml
# Increase timeout
jobs:
  build:
    timeout-minutes: 20  # Default is 360
```

### Deployment Failures

**Error: "403 Permission denied"**

Check workflow permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

**Error: "Page build failed"**

1. Check GitHub Pages settings
2. Verify branch is `gh-pages`
3. Check for Jekyll conflicts (add `.nojekyll` file):
   ```bash
   touch quartz/static/.nojekyll
   ```

### DNS Issues

**Domain not resolving:**

```bash
# Check DNS records
dig crpg.info +trace

# Flush local DNS cache
sudo systemd-resolve --flush-caches  # Linux
dscacheutil -flushcache  # macOS
ipconfig /flushdns  # Windows
```

**Certificate issues:**

1. Verify DNS is correct
2. Remove and re-add custom domain in GitHub
3. Wait for certificate provisioning
4. Check https://www.githubstatus.com/

### Content Issues

**Links broken after deployment:**

Check base URL in `quartz.config.ts` matches your setup:
```typescript
baseUrl: "crpg.info"  // No https://, no trailing slash
```

**Images not loading:**

1. Verify images are in `content/assets/`
2. Check paths in markdown
3. Ensure images are committed to git
4. Check browser console for 404 errors

**Styles not applying:**

1. Hard refresh browser (Ctrl+Shift+R)
2. Check for CSS errors in build logs
3. Verify custom CSS syntax
4. Clear CDN cache if using one

---

## Best Practices

### Deployment Strategy

1. **Test locally** before pushing
2. **Use feature branches** for major changes
3. **Review build logs** after deployment
4. **Monitor site** after deployment
5. **Keep rollback plan** ready

### Security

1. **Never commit secrets** to repository
2. **Use GitHub Secrets** for sensitive data
3. **Enable branch protection** on main
4. **Require PR reviews** for changes
5. **Keep dependencies updated**

### Performance

1. **Optimize images** before adding
2. **Enable CDN caching**
3. **Monitor build times**
4. **Use incremental builds** when possible
5. **Minimize plugin usage**

---

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Quartz Deployment Guide](https://quartz.jzhao.xyz/hosting)

---

**Last Updated**: 2025-10-24
