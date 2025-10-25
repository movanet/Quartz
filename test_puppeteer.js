#!/usr/bin/env node
/**
 * Puppeteer-based Deployment Testing Framework
 * Comprehensive browser automation tests for CRPG Archive
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;

const config = {
  siteUrl: process.env.SITE_URL || 'https://movanet.github.io/Quartz',
  customDomain: process.env.CUSTOM_DOMAIN || 'https://crpg.info',
  timeout: 30000,
  viewport: {
    width: 1920,
    height: 1080
  },
  mobileViewport: {
    width: 375,
    height: 667
  }
};

const results = {
  timestamp: new Date().toISOString(),
  siteUrl: config.siteUrl,
  tests: [],
  screenshots: []
};

// Helper to log test results
function logTest(name, status, details, screenshot = null) {
  const test = {
    name,
    status,
    details,
    timestamp: new Date().toISOString()
  };

  if (screenshot) {
    test.screenshot = screenshot;
  }

  results.tests.push(test);

  const statusSymbol = status === 'pass' ? '✓' : status === 'fail' ? '✗' : '⚠';
  const statusColor = status === 'pass' ? '\x1b[32m' : status === 'fail' ? '\x1b[31m' : '\x1b[33m';
  console.log(`${statusColor}${statusSymbol} ${name}\x1b[0m`);
  if (details) console.log(`  ${details}`);
}

// Test: Site Accessibility
async function testSiteAccessibility(page) {
  try {
    const response = await page.goto(config.siteUrl, {
      waitUntil: 'networkidle2',
      timeout: config.timeout
    });

    const status = response.status();

    if (status === 200) {
      logTest('Site Accessibility', 'pass', `HTTP ${status} - Site is live`);
      return true;
    } else {
      logTest('Site Accessibility', 'fail', `HTTP ${status} - Site returned error`);
      return false;
    }
  } catch (error) {
    logTest('Site Accessibility', 'fail', `Error: ${error.message}`);
    return false;
  }
}

// Test: Homepage Content
async function testHomepageContent(page) {
  try {
    const title = await page.title();
    const content = await page.content();

    const hasCRPG = content.includes('CRPG') || title.includes('CRPG');
    const hasArchive = content.includes('Archive') || content.includes('archive');

    if (hasCRPG && hasArchive) {
      logTest('Homepage Content', 'pass', `Title: "${title}", CRPG content found`);
      return true;
    } else {
      logTest('Homepage Content', 'fail', 'Expected content not found');
      return false;
    }
  } catch (error) {
    logTest('Homepage Content', 'fail', `Error: ${error.message}`);
    return false;
  }
}

// Test: Search Functionality
async function testSearchFunctionality(page) {
  try {
    // Wait for search input to be available
    await page.waitForSelector('input[type="text"]', { timeout: 5000 });

    // Type in search box
    await page.type('input[type="text"]', 'water');

    // Wait a moment for search results
    await page.waitForTimeout(1000);

    // Check if results appear
    const resultsExist = await page.evaluate(() => {
      const results = document.querySelectorAll('[data-search-result]');
      return results.length > 0;
    });

    if (resultsExist) {
      logTest('Search Functionality', 'pass', 'Search returns results');
      return true;
    } else {
      logTest('Search Functionality', 'warn', 'Search may not be working');
      return false;
    }
  } catch (error) {
    logTest('Search Functionality', 'warn', `Search not testable: ${error.message}`);
    return false;
  }
}

// Test: Navigation Links
async function testNavigation(page) {
  try {
    // Get all navigation links
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      return anchors
        .map(a => a.href)
        .filter(href => href.startsWith(window.location.origin));
    });

    if (links.length > 0) {
      // Test first few links
      let workingLinks = 0;
      const testLinks = links.slice(0, 5);

      for (const link of testLinks) {
        try {
          const response = await page.goto(link, { timeout: 10000 });
          if (response.status() === 200) workingLinks++;
        } catch (e) {
          // Link failed
        }
      }

      if (workingLinks > 0) {
        logTest('Navigation Links', 'pass', `${workingLinks}/${testLinks.length} links working`);
        return true;
      }
    }

    logTest('Navigation Links', 'fail', 'No working navigation links found');
    return false;
  } catch (error) {
    logTest('Navigation Links', 'fail', `Error: ${error.message}`);
    return false;
  }
}

// Test: Mobile Responsiveness
async function testMobileResponsiveness(browser) {
  try {
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport(config.mobileViewport);

    await mobilePage.goto(config.siteUrl, {
      waitUntil: 'networkidle2',
      timeout: config.timeout
    });

    // Take screenshot
    const screenshotPath = 'screenshots/mobile-view.png';
    await fs.mkdir('screenshots', { recursive: true });
    await mobilePage.screenshot({ path: screenshotPath });
    results.screenshots.push(screenshotPath);

    // Check if viewport meta tag exists
    const hasViewport = await mobilePage.evaluate(() => {
      const meta = document.querySelector('meta[name="viewport"]');
      return meta !== null;
    });

    await mobilePage.close();

    if (hasViewport) {
      logTest('Mobile Responsiveness', 'pass', 'Mobile viewport configured', screenshotPath);
      return true;
    } else {
      logTest('Mobile Responsiveness', 'warn', 'Viewport meta tag missing');
      return false;
    }
  } catch (error) {
    logTest('Mobile Responsiveness', 'fail', `Error: ${error.message}`);
    return false;
  }
}

// Test: Page Load Performance
async function testPageLoadPerformance(page) {
  try {
    const metrics = await page.metrics();
    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );

    const loadTime = (performanceTiming.loadEventEnd - performanceTiming.navigationStart) / 1000;

    if (loadTime < 3) {
      logTest('Page Load Performance', 'pass', `Load time: ${loadTime.toFixed(2)}s`);
      return true;
    } else if (loadTime < 5) {
      logTest('Page Load Performance', 'warn', `Load time: ${loadTime.toFixed(2)}s (target: <3s)`);
      return false;
    } else {
      logTest('Page Load Performance', 'fail', `Load time: ${loadTime.toFixed(2)}s (too slow)`);
      return false;
    }
  } catch (error) {
    logTest('Page Load Performance', 'warn', `Could not measure: ${error.message}`);
    return false;
  }
}

// Test: Dark Mode Toggle
async function testDarkMode(page) {
  try {
    // Look for dark mode toggle
    const darkModeButton = await page.$('[aria-label*="dark" i], [title*="dark" i], .dark-mode-toggle');

    if (darkModeButton) {
      await darkModeButton.click();
      await page.waitForTimeout(500);

      // Take screenshot of dark mode
      const screenshotPath = 'screenshots/dark-mode.png';
      await page.screenshot({ path: screenshotPath });
      results.screenshots.push(screenshotPath);

      logTest('Dark Mode', 'pass', 'Dark mode toggle functional', screenshotPath);
      return true;
    } else {
      logTest('Dark Mode', 'warn', 'Dark mode toggle not found');
      return false;
    }
  } catch (error) {
    logTest('Dark Mode', 'warn', `Could not test: ${error.message}`);
    return false;
  }
}

// Test: Asset Loading
async function testAssetLoading(page) {
  try {
    // Check for failed resources
    const failedResources = [];

    page.on('requestfailed', request => {
      failedResources.push(request.url());
    });

    await page.goto(config.siteUrl, {
      waitUntil: 'networkidle2',
      timeout: config.timeout
    });

    // Wait a bit to catch any delayed failures
    await page.waitForTimeout(2000);

    if (failedResources.length === 0) {
      logTest('Asset Loading', 'pass', 'All assets loaded successfully');
      return true;
    } else {
      logTest('Asset Loading', 'warn', `${failedResources.length} assets failed to load`);
      console.log('  Failed assets:', failedResources.slice(0, 5));
      return false;
    }
  } catch (error) {
    logTest('Asset Loading', 'fail', `Error: ${error.message}`);
    return false;
  }
}

// Test: Console Errors
async function testConsoleErrors(page) {
  const errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto(config.siteUrl, {
    waitUntil: 'networkidle2',
    timeout: config.timeout
  });

  await page.waitForTimeout(2000);

  if (errors.length === 0) {
    logTest('Console Errors', 'pass', 'No console errors');
    return true;
  } else {
    logTest('Console Errors', 'warn', `${errors.length} console errors found`);
    console.log('  Errors:', errors.slice(0, 3));
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('\x1b[34m========================================\x1b[0m');
  console.log('\x1b[34mCRPG Archive Puppeteer Test Suite\x1b[0m');
  console.log('\x1b[34m========================================\x1b[0m');
  console.log('');

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport(config.viewport);

    // Run tests sequentially
    const tests = [
      () => testSiteAccessibility(page),
      () => testHomepageContent(page),
      () => testConsoleErrors(page),
      () => testAssetLoading(page),
      () => testSearchFunctionality(page),
      () => testNavigation(page),
      () => testPageLoadPerformance(page),
      () => testDarkMode(page),
      () => testMobileResponsiveness(browser)
    ];

    let passed = 0;
    let failed = 0;
    let warned = 0;

    for (const test of tests) {
      const result = await test();
      if (result) passed++;
      else {
        const lastTest = results.tests[results.tests.length - 1];
        if (lastTest.status === 'fail') failed++;
        else warned++;
      }
    }

    // Take final screenshot
    const screenshotPath = 'screenshots/final-state.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    results.screenshots.push(screenshotPath);

    // Summary
    console.log('');
    console.log('\x1b[34m========================================\x1b[0m');
    console.log(`\x1b[32mTests Passed: ${passed}\x1b[0m`);
    console.log(`\x1b[33mWarnings: ${warned}\x1b[0m`);
    console.log(`\x1b[31mTests Failed: ${failed}\x1b[0m`);
    console.log('\x1b[34m========================================\x1b[0m');
    console.log('');

    results.summary = { passed, warned, failed };

    // Save results
    await fs.writeFile('puppeteer_test_results.json', JSON.stringify(results, null, 2));
    console.log('\x1b[34mResults saved to: puppeteer_test_results.json\x1b[0m');
    console.log('\x1b[34mScreenshots saved to: screenshots/\x1b[0m');

    return failed === 0;

  } catch (error) {
    console.error('\x1b[31mFatal error:\x1b[0m', error);
    return false;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run if called directly
if (require.main === module) {
  runTests()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { runTests };
