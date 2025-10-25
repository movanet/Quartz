#!/usr/bin/env node
/**
 * CRPG.info Design Capture Tool
 * Uses Puppeteer to capture the original website design
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;

const config = {
  targetUrl: 'https://crpg.info',
  outputDir: 'design_capture',
  viewport: {
    width: 1920,
    height: 1080
  }
};

const results = {
  timestamp: new Date().toISOString(),
  url: config.targetUrl,
  design: {},
  colors: [],
  fonts: [],
  layout: {},
  components: []
};

// Capture design elements
async function captureDesign(page) {
  console.log('Capturing design elements...');

  try {
    // Extract colors
    const colors = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const colorSet = new Set();

      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        colorSet.add(styles.color);
        colorSet.add(styles.backgroundColor);
        colorSet.add(styles.borderColor);
      });

      return Array.from(colorSet).filter(c => c && c !== 'rgba(0, 0, 0, 0)');
    });

    results.colors = colors;
    console.log(`  Found ${colors.length} unique colors`);

    // Extract fonts
    const fonts = await page.evaluate(() => {
      const fontSet = new Set();
      const elements = document.querySelectorAll('*');

      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        fontSet.add(styles.fontFamily);
      });

      return Array.from(fontSet);
    });

    results.fonts = fonts;
    console.log(`  Found ${fonts.length} unique fonts`);

    // Extract layout structure
    const layout = await page.evaluate(() => {
      return {
        header: {
          exists: !!document.querySelector('header'),
          height: document.querySelector('header')?.offsetHeight || 0
        },
        sidebar: {
          exists: !!document.querySelector('aside, .sidebar, #sidebar'),
          width: document.querySelector('aside, .sidebar, #sidebar')?.offsetWidth || 0
        },
        footer: {
          exists: !!document.querySelector('footer'),
          height: document.querySelector('footer')?.offsetHeight || 0
        },
        main: {
          exists: !!document.querySelector('main, .main, #main'),
          width: document.querySelector('main, .main, #main')?.offsetWidth || 0
        }
      };
    });

    results.layout = layout;
    console.log('  Layout structure captured');

    // Extract navigation structure
    const navigation = await page.evaluate(() => {
      const nav = document.querySelector('nav, .nav, .navigation');
      if (!nav) return null;

      const links = Array.from(nav.querySelectorAll('a')).map(a => ({
        text: a.textContent.trim(),
        href: a.href
      }));

      return {
        type: nav.tagName.toLowerCase(),
        classes: nav.className,
        links: links
      };
    });

    results.navigation = navigation;
    console.log(`  Navigation captured: ${navigation?.links?.length || 0} links`);

    // Extract main content structure
    const contentStructure = await page.evaluate(() => {
      const main = document.querySelector('main, .main, #main, article, .content');
      if (!main) return null;

      return {
        tagName: main.tagName,
        classes: main.className,
        children: Array.from(main.children).map(child => ({
          tag: child.tagName,
          class: child.className,
          id: child.id
        }))
      };
    });

    results.contentStructure = contentStructure;
    console.log('  Content structure captured');

    return true;
  } catch (error) {
    console.error('  Error capturing design:', error.message);
    return false;
  }
}

// Capture CSS
async function captureCSS(page) {
  console.log('Capturing CSS...');

  try {
    const css = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets);
      const cssRules = [];

      sheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          rules.forEach(rule => {
            if (rule.cssText) {
              cssRules.push(rule.cssText);
            }
          });
        } catch (e) {
          // Cross-origin stylesheets
        }
      });

      return cssRules.join('\n\n');
    });

    await fs.mkdir(config.outputDir, { recursive: true });
    await fs.writeFile(`${config.outputDir}/extracted_styles.css`, css);
    console.log(`  CSS saved to ${config.outputDir}/extracted_styles.css`);

    return true;
  } catch (error) {
    console.error('  Error capturing CSS:', error.message);
    return false;
  }
}

// Capture HTML structure
async function captureHTML(page) {
  console.log('Capturing HTML structure...');

  try {
    const html = await page.content();
    await fs.writeFile(`${config.outputDir}/page_structure.html`, html);
    console.log(`  HTML saved to ${config.outputDir}/page_structure.html`);

    return true;
  } catch (error) {
    console.error('  Error capturing HTML:', error.message);
    return false;
  }
}

// Capture screenshots
async function captureScreenshots(page) {
  console.log('Capturing screenshots...');

  try {
    await fs.mkdir(config.outputDir, { recursive: true });

    // Full page screenshot
    await page.screenshot({
      path: `${config.outputDir}/full_page.png`,
      fullPage: true
    });
    console.log('  Full page screenshot saved');

    // Desktop viewport
    await page.screenshot({
      path: `${config.outputDir}/desktop_view.png`
    });
    console.log('  Desktop screenshot saved');

    // Mobile viewport
    await page.setViewport({ width: 375, height: 667 });
    await page.screenshot({
      path: `${config.outputDir}/mobile_view.png`
    });
    console.log('  Mobile screenshot saved');

    // Tablet viewport
    await page.setViewport({ width: 768, height: 1024 });
    await page.screenshot({
      path: `${config.outputDir}/tablet_view.png`
    });
    console.log('  Tablet screenshot saved');

    // Reset viewport
    await page.setViewport(config.viewport);

    return true;
  } catch (error) {
    console.error('  Error capturing screenshots:', error.message);
    return false;
  }
}

// Main function
async function captureWebsiteDesign() {
  console.log('==============================================');
  console.log('CRPG.info Design Capture Tool');
  console.log('==============================================\n');

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport(config.viewport);

    console.log(`Navigating to ${config.targetUrl}...`);
    await page.goto(config.targetUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    console.log('Page loaded successfully\n');

    // Capture all design elements
    await captureDesign(page);
    await captureCSS(page);
    await captureHTML(page);
    await captureScreenshots(page);

    // Save results
    await fs.writeFile(
      `${config.outputDir}/design_analysis.json`,
      JSON.stringify(results, null, 2)
    );

    console.log('\n==============================================');
    console.log('Design Capture Complete!');
    console.log('==============================================');
    console.log(`\nResults saved to: ${config.outputDir}/`);
    console.log('Files created:');
    console.log('  - design_analysis.json (design elements)');
    console.log('  - extracted_styles.css (CSS rules)');
    console.log('  - page_structure.html (HTML structure)');
    console.log('  - full_page.png (full page screenshot)');
    console.log('  - desktop_view.png (desktop screenshot)');
    console.log('  - mobile_view.png (mobile screenshot)');
    console.log('  - tablet_view.png (tablet screenshot)');

    return true;
  } catch (error) {
    console.error('\nError:', error.message);
    return false;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run if called directly
if (require.main === module) {
  captureWebsiteDesign()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { captureWebsiteDesign };
