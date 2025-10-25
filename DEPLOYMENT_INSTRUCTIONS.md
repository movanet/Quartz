# GitHub Pages Deployment Instructions

**Status:** ✅ Code committed and pushed to GitHub
**Repository:** https://github.com/movanet/Quartz
**Branch:** main
**Commit:** a00fb00

---

## Step 3: Enable GitHub Pages

### Method 1: Via GitHub Web Interface (Recommended)

1. **Navigate to Repository Settings**
   - Go to: https://github.com/movanet/Quartz
   - Click on **"Settings"** tab (top right)

2. **Access Pages Settings**
   - In the left sidebar, scroll down to **"Code and automation"** section
   - Click on **"Pages"**

3. **Configure Source**
   - Under **"Build and deployment"**
   - **Source:** Select **"GitHub Actions"** from dropdown
   - (The existing `.github/workflows/deploy.yml` will handle the build)

4. **Custom Domain (Optional)**
   - If using `crpg.info`:
     - Enter `crpg.info` in the **"Custom domain"** field
     - Click **"Save"**
     - Configure DNS records (see below)

5. **Enforce HTTPS**
   - Check the box ✅ **"Enforce HTTPS"**
   - Click **"Save"** if needed

6. **Verify Deployment**
   - Go to **"Actions"** tab
   - You should see the deployment workflow running
   - Wait for it to complete (green checkmark ✅)

### Method 2: Via GitHub CLI

```bash
# Enable GitHub Pages with GitHub Actions
gh repo edit movanet/Quartz --enable-pages --pages-source "github-actions"

# Set custom domain (optional)
gh repo edit movanet/Quartz --custom-domain "crpg.info"
```

---

## DNS Configuration (If Using Custom Domain)

### For crpg.info Domain

Add these DNS records in your domain registrar:

```
Type   Name   Value
------------------------------------------
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153

CNAME  www    movanet.github.io.
```

### DNS Propagation
- Changes may take 24-48 hours to propagate
- Use https://dnschecker.org to verify
- GitHub will provision SSL certificate automatically

---

## Verification Checklist

After enabling GitHub Pages, verify:

### 1. Deployment Status
- [ ] Go to **Actions** tab
- [ ] Check workflow "Deploy Quartz to GitHub Pages" completed successfully
- [ ] Green checkmark ✅ visible

### 2. Site Accessibility
- [ ] Visit deployment URL (check Actions or Pages settings for URL)
- [ ] Homepage loads correctly
- [ ] CRPG branding visible (red #e51d1d, orange #ed6600)

### 3. Content Verification
- [ ] Homepage displays welcome message
- [ ] Blog posts accessible at `/blog/`
- [ ] Assets loading (images, PDFs)
- [ ] Example: IsWASH 2023 PDF accessible

### 4. Feature Testing
- [ ] **Search** - Try searching for "water" or "governance"
- [ ] **Graph View** - Click graph icon, see content connections
- [ ] **Table of Contents** - Check on any blog post
- [ ] **Backlinks** - Verify related content links
- [ ] **Explorer** - Browse content tree in sidebar
- [ ] **Dark Mode** - Toggle theme switch
- [ ] **Mobile** - Test on mobile device or responsive view

### 5. Performance
- [ ] Page loads in < 2 seconds
- [ ] Search is fast and responsive
- [ ] Navigation is smooth

---

## Troubleshooting

### Issue: Deployment Workflow Fails

**Check:**
1. Go to Actions tab → Click failed workflow
2. Review error logs
3. Common issues:
   - Node.js version mismatch (should be 22)
   - Build errors in Quartz
   - Missing dependencies

**Solution:**
```bash
# Test build locally first
cd quartz
npx quartz build

# If successful locally, push again
git push origin main --force
```

### Issue: 404 Page Not Found

**Check:**
1. Verify GitHub Pages is enabled
2. Check deployment workflow completed
3. Verify source is set to "GitHub Actions"

**Solution:**
- Wait 5-10 minutes for deployment
- Clear browser cache (Ctrl+Shift+R)
- Check repository → Settings → Pages for status

### Issue: Assets Not Loading

**Check:**
1. Verify `quartz/content/assets/` directory pushed
2. Check asset paths in markdown files
3. Review browser console for 404 errors

**Solution:**
```bash
# Verify assets exist
ls -lh quartz/content/assets/

# Check file sizes
du -sh quartz/content/assets/

# Rebuild if needed
cd quartz
npx quartz build
```

### Issue: Custom Domain Not Working

**Check:**
1. DNS records configured correctly
2. DNS propagation complete (use dnschecker.org)
3. CNAME file exists in repository root

**Solution:**
```bash
# Verify CNAME file
cat CNAME
# Should contain: crpg.info

# Recreate if missing
echo "crpg.info" > CNAME
git add CNAME
git commit -m "Add CNAME for custom domain"
git push
```

---

## Expected URLs

### Default GitHub Pages
```
https://movanet.github.io/Quartz/
```

### With Custom Domain (after DNS configured)
```
https://crpg.info
https://www.crpg.info (redirects to main)
```

---

## Post-Deployment Tasks

### 1. Update README
- [ ] Add live site URL to README.md
- [ ] Update status badges if any
- [ ] Add deployment date

### 2. Announce
- [ ] Notify CRPG team
- [ ] Share with stakeholders
- [ ] Update social media/website links

### 3. Monitor
- [ ] Set up uptime monitoring (UptimeRobot, etc.)
- [ ] Configure analytics (if desired)
- [ ] Monitor GitHub Actions for failures

### 4. Backup
- [ ] Document current state
- [ ] Tag release version
- [ ] Export content periodically

---

## Maintenance

### Adding New Content

```bash
# 1. Create markdown file
vim quartz/content/blog/2025-new-post.md

# 2. Add frontmatter and content

# 3. Test locally
cd quartz
npx quartz build --serve
# Visit http://localhost:8080

# 4. Commit and push
git add quartz/content/blog/2025-new-post.md
git commit -m "Add new blog post"
git push origin main

# 5. Deployment is automatic via GitHub Actions
```

### Updating Configuration

```bash
# 1. Edit config
vim quartz/quartz.config.ts

# 2. Test build
cd quartz
npx quartz build

# 3. Commit and push
git add quartz/quartz.config.ts
git commit -m "Update Quartz configuration"
git push origin main
```

---

## Support & Resources

### Documentation
- **This Project**: See `/docs/` directory
- **Quartz Docs**: https://quartz.jzhao.xyz/
- **GitHub Pages**: https://docs.github.com/pages

### Logs & Monitoring
- **progress.json**: Real-time project status
- **GitHub Actions**: Build and deployment logs
- **Browser DevTools**: Console and Network tab for debugging

### Contact
- **Repository Issues**: https://github.com/movanet/Quartz/issues
- **CRPG Contact**: mova@crpg.info

---

## Success! 🎉

Once GitHub Pages is enabled and the deployment completes:

1. ✅ **153 blog posts** available online
2. ✅ **96 assets** (122 MB) accessible
3. ✅ **18 years** of research preserved
4. ✅ **Professional archive** with full search and navigation
5. ✅ **Sustainable platform** for future content

**The CRPG archive is now live and accessible to researchers, policymakers, and practitioners worldwide!**

---

**Generated:** October 25, 2025
**Status:** Ready for GitHub Pages activation
**Next Step:** Enable GitHub Pages in repository settings
