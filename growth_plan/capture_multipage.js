const puppeteer = require('puppeteer');
const path = require('path');

async function captureMultiPage() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 920, deviceScaleFactor: 1.5 });

  // 1. Home Page - Dark Theme (Black)
  console.log('Capturing Home Page (Dark)...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, 'page_home_dark.png') });

  // 2. Toggle to Light Theme (White)
  console.log('Toggling to Light Theme...');
  await page.click('#theme-toggle-btn');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'page_home_light.png') });

  // 3. Curriculum Page (Light)
  console.log('Capturing Curriculum Page...');
  await page.goto('http://localhost:3000/curriculum', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, 'page_curriculum.png') });

  // 4. AI Project Matcher Page (Dark)
  console.log('Switching back to Dark and capturing Matcher...');
  await page.click('#theme-toggle-btn');
  await new Promise(r => setTimeout(r, 600));
  await page.goto('http://localhost:3000/matcher', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, 'page_matcher.png') });

  // 5. Register Page
  console.log('Capturing Register Page...');
  await page.goto('http://localhost:3000/register', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, 'page_register.png') });

  // 6. Analytics Page
  console.log('Capturing Analytics Page...');
  await page.goto('http://localhost:3000/analytics', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, 'page_analytics.png') });

  await browser.close();
  console.log('All multi-page and theme screenshots captured successfully!');
}

captureMultiPage().catch(console.error);
