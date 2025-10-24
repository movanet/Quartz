# CRPG.info - Classic RPG Resource

Welcome to the CRPG.info repository! This is the source repository for [crpg.info](https://crpg.info), a comprehensive resource for Classic Computer Role-Playing Games.

## About This Project

CRPG.info is built using [Quartz v4](https://quartz.jzhao.xyz/), a modern static site generator that transforms Markdown files into a beautiful, interconnected digital garden. The site is hosted on GitHub Pages and automatically deploys when changes are pushed to the main branch.

### Key Features

- **Digital Garden Structure**: Interconnected notes with bidirectional linking
- **Fast Search**: Built-in search functionality for quick navigation
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Mode**: Automatic theme switching based on user preference
- **RSS Feed**: Subscribe to updates via RSS
- **Site Map**: Automatic sitemap generation for SEO

## Repository Structure

```
/home/user/Quartz/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── quartz/                     # Quartz static site generator (submodule)
│   ├── content/                # Markdown content files
│   ├── quartz/                 # Quartz core engine
│   │   └── static/             # Static assets (images, CNAME, etc.)
│   ├── quartz.config.ts        # Site configuration
│   └── quartz.layout.ts        # Layout configuration
├── claudable/                  # Claudable integration (submodule)
├── firecrawl/                  # Web scraping utilities (submodule)
├── scrape_crpg.py             # Content scraping script
├── CNAME                       # Domain configuration
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- **Node.js**: Version 22 or higher (check with `node --version`)
- **npm**: Version 10.9.2 or higher (check with `npm --version`)
- **Git**: For version control

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Quartz
   ```

2. **Initialize submodules**:
   ```bash
   git submodule update --init --recursive
   ```

3. **Install dependencies**:
   ```bash
   cd quartz
   npm install
   ```

4. **Start the local development server**:
   ```bash
   npx quartz build --serve
   ```

   The site will be available at `http://localhost:8080`

5. **Make changes**:
   - Edit Markdown files in `quartz/content/`
   - The site will automatically rebuild and refresh

### Creating and Editing Content

#### Adding a New Page

1. Create a new Markdown file in `quartz/content/`:
   ```bash
   touch quartz/content/your-page-name.md
   ```

2. Add frontmatter and content:
   ```markdown
   ---
   title: Your Page Title
   description: A brief description of the page
   tags:
     - rpg
     - classic
   ---

   # Your Page Title

   Your content here...
   ```

#### Linking Between Pages

Use standard Markdown links or Obsidian-style wikilinks:
```markdown
[Link Text](./other-page.md)
[[Other Page]]
```

#### Adding Images

1. Place images in `quartz/content/assets/` or `quartz/quartz/static/`
2. Reference them in your Markdown:
   ```markdown
   ![Alt text](./assets/image.png)
   ```

#### Organizing Content

- Use folders to organize related content
- Add tags in frontmatter for better categorization
- Create index pages for major sections

### Configuration

#### Site Configuration (`quartz/quartz.config.ts`)

The main configuration file controls:
- Site title and metadata
- Theme colors (light and dark mode)
- Analytics integration
- Search behavior
- Plugin configuration

Example modification:
```typescript
pageTitle: "CRPG.info",
baseUrl: "crpg.info",
theme: {
  typography: {
    header: "Cinzel",
    body: "Lora",
    code: "JetBrains Mono",
  },
  // ...
}
```

#### Layout Configuration (`quartz/quartz.layout.ts`)

Controls the page layout structure, including:
- Header components
- Sidebar content
- Footer elements
- Page-specific layouts

## Deployment

### Automatic Deployment

The site automatically deploys to GitHub Pages when you push to the main branch. The deployment process:

1. **Trigger**: Push to main/master branch
2. **Build**: GitHub Actions runs the Quartz build process
3. **Deploy**: Built site is published to GitHub Pages
4. **Live**: Changes appear at https://crpg.info

### GitHub Actions Workflow

The deployment workflow (`.github/workflows/deploy.yml`):
- Checks out the repository with submodules
- Sets up Node.js environment
- Caches dependencies for faster builds
- Installs npm packages
- Builds the Quartz site
- Deploys to GitHub Pages

### Manual Deployment

If needed, you can manually trigger deployment:
1. Go to the "Actions" tab in GitHub
2. Select "Deploy Quartz to GitHub Pages"
3. Click "Run workflow"

## GitHub Pages Configuration

### Required Settings

1. **Enable GitHub Pages**:
   - Repository Settings → Pages
   - Source: GitHub Actions

2. **Custom Domain**:
   - The CNAME file configures the custom domain `crpg.info`
   - Ensure DNS records point to GitHub Pages:
     ```
     A record: 185.199.108.153
     A record: 185.199.109.153
     A record: 185.199.110.153
     A record: 185.199.111.153
     ```

3. **HTTPS**:
   - Enable "Enforce HTTPS" in repository settings
   - GitHub automatically provisions SSL certificate

## Development Workflow

### Recommended Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test locally**:
   ```bash
   cd quartz
   npx quartz build --serve
   ```

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

4. **Push to GitHub**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request** for review

6. **Merge to main** to trigger deployment

### Testing Before Deployment

Always test your changes locally before pushing:

```bash
cd quartz
npx quartz build --serve
```

Visit `http://localhost:8080` and verify:
- All pages render correctly
- Links work as expected
- Images load properly
- Search functionality works
- No broken links or missing assets

## Troubleshooting

### Common Issues

**Build fails with "Module not found"**
```bash
cd quartz
rm -rf node_modules package-lock.json
npm install
```

**Changes not appearing on live site**
- Check GitHub Actions logs for build errors
- Verify the workflow completed successfully
- Clear browser cache (Ctrl+Shift+R)

**Local server not starting**
```bash
# Check Node.js version
node --version  # Should be 22+

# Reinstall dependencies
cd quartz
npm ci
```

**Links not working**
- Use relative paths: `./page.md` or `[[Page]]`
- Ensure file extensions are correct
- Check that linked files exist

### Getting Help

- Check the [Quartz Documentation](https://quartz.jzhao.xyz/)
- Review GitHub Actions logs for deployment issues
- Join the [Quartz Discord Community](https://discord.gg/cRFFHYye7t)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on:
- Code of conduct
- How to submit changes
- Content standards
- Review process

## Project Components

### Submodules

This project includes several submodules:

- **quartz**: The core Quartz static site generator
- **claudable**: AI-assisted content management tools
- **firecrawl**: Web scraping utilities for content migration

### Scripts

- `scrape_crpg.py`: Python script for scraping and converting legacy CRPG content

## Maintenance

### Updating Quartz

To update to the latest version of Quartz:

```bash
cd quartz
git fetch origin
git merge origin/v4
cd ..
git add quartz
git commit -m "Update Quartz to latest version"
```

### Dependency Updates

Regularly update npm dependencies:

```bash
cd quartz
npm update
npm audit fix
```

## Performance Optimization

- Images are automatically optimized during build
- CSS and JavaScript are minified
- Site uses Service Workers for offline functionality
- CDN caching for fonts and assets

## Analytics

The site uses Plausible Analytics (privacy-friendly) configured in `quartz.config.ts`. No cookies, no personal data tracking.

## License

This project uses Quartz v4, which is licensed under the MIT License. See the Quartz repository for details.

Content on CRPG.info may have different licensing terms depending on the source.

## Support

For issues specific to this repository:
- Open an issue on GitHub
- Contact the maintainers

For Quartz-specific questions:
- Visit [Quartz Documentation](https://quartz.jzhao.xyz/)
- Join the [Quartz Discord](https://discord.gg/cRFFHYye7t)

---

Built with [Quartz v4](https://quartz.jzhao.xyz/) | Hosted on [GitHub Pages](https://pages.github.com/)
