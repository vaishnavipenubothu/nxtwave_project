const puppeteer = require('puppeteer');
const path = require('path');

async function captureApp() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1800, deviceScaleFactor: 1.5 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 });

  const appShot = path.join(__dirname, 'app_preview.png');
  await page.screenshot({ path: appShot, fullPage: true });
  console.log('Saved app_preview.png');

  await browser.close();
}

captureApp().catch(console.error);
