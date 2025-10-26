#!/usr/bin/env node
/**
 * Local Site Testing with Puppeteer
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const baseDir = 'file:///' + path.resolve(__dirname, 'quartz/public').replace(/\\/g, '/');

const results = {
  timestamp: new Date().toISOString(),
  baseUrl: baseDir,
  tests: []
};

async function testPage(page, pagePath, testName) {
  const url = `${baseDir}/${pagePath}`;
  console.log(`\nTesting: ${testName}`);
  console.log(`  URL: ${url}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
    const title = await page.title();
    const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 200));

    console.log(`  ✓ Title: ${title}`);
    console.log(`  ✓ Content preview: ${bodyText.substring(0, 100)}...`);

    results.tests.push({
      name: testName,
      url: url,
      status: 'pass',
      title: title
    });

    return true;
  } catch (error) {
    console.log(`  ✗ Error: ${error.message}`);
    results.tests.push({
      name: testName,
      url: url,
      status: 'fail',
      error: error.message
    });
    return false;
  }
}

async function run() {
  console.log('=== Local Quartz Site Testing ===\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Test homepage
  await testPage(page, 'index.html', 'Homepage');

  // Test people pages
  await testPage(page, 'people/mohamad-mova-alafghani.html', 'Mohamad Mova Page');
  await testPage(page, 'people/dyah-paramita.html', 'Dyah Paramita Page');
  await testPage(page, 'people/feril-hariat.html', 'Feril Hariat Page');

  // Test program pages
  await testPage(page, 'aiira/index.html', 'AIIRA Program');
  await testPage(page, 'ehrdd/index.html', 'EHRDD Program');
  await testPage(page, 'wash/index.html', 'WASH Program');

  // Test other pages
  await testPage(page, 'about-us/profile.html', 'About Us');
  await testPage(page, 'publications/index.html', 'Publications');
  await testPage(page, 'research/index.html', 'Research');

  // Check if assets exist
  console.log('\n=== Checking Assets ===');
  const assetChecks = [
    'assets/2023/07/Corporate-Profile-CRPG-2023.pdf',
    'assets/2018/12/lj.png',
    'assets/2023/10/Workshop-Pembuka-kegiatan-KONEKSI.jpg'
  ];

  for (const asset of assetChecks) {
    const assetPath = path.join(__dirname, 'quartz/public', asset);
    if (fs.existsSync(assetPath)) {
      console.log(`  ✓ ${asset}`);
      results.tests.push({ name: `Asset: ${asset}`, status: 'pass' });
    } else {
      console.log(`  ✗ ${asset} MISSING`);
      results.tests.push({ name: `Asset: ${asset}`, status: 'fail' });
    }
  }

  await browser.close();

  // Summary
  console.log('\n=== Test Summary ===');
  const passed = results.tests.filter(t => t.status === 'pass').length;
  const failed = results.tests.filter(t => t.status === 'fail').length;
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${results.tests.length}`);

  // Save results
  fs.writeFileSync(
    path.join(__dirname, 'local_test_results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n✓ Results saved to local_test_results.json');

  return failed === 0;
}

run().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
