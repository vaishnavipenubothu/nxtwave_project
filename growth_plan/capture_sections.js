const puppeteer = require('puppeteer');
const path = require('path');

async function captureSections() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 });

  // 1. Capture Hero Section
  const heroEl = await page.$('.hero-section');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(__dirname, 'output_hero.png') });
    console.log('Saved output_hero.png');
  }

  // 2. Capture Matcher Section
  const matcherEl = await page.$('#matcher');
  if (matcherEl) {
    await matcherEl.screenshot({ path: path.join(__dirname, 'output_matcher.png') });
    console.log('Saved output_matcher.png');
  }

  // 3. Fill and Submit Registration Form
  console.log('Submitting test registration...');
  await page.type('#input-name', 'Vaishnavi Penubothu');
  await page.type('#input-email', `vaishnavi_${Date.now()}@campus.edu`);
  await page.type('#input-phone', '+91 9876543210');
  await page.type('#input-college', 'JNTU Hyderabad');
  await page.click('#btn-submit-register');

  // Wait for submission response and referral card
  await new Promise(r => setTimeout(r, 1500));

  // 4. Capture Referral Dashboard
  const regArea = await page.$('#registration-area');
  if (regArea) {
    await regArea.screenshot({ path: path.join(__dirname, 'output_referral_dashboard.png') });
    console.log('Saved output_referral_dashboard.png');
  }

  // 5. Capture Live Growth Metrics Dashboard
  const metricsEl = await page.$('#growth-analytics');
  if (metricsEl) {
    await metricsEl.screenshot({ path: path.join(__dirname, 'output_growth_analytics.png') });
    console.log('Saved output_growth_analytics.png');
  }

  await browser.close();
  console.log('All section screenshots captured successfully!');
}

captureSections().catch(console.error);
