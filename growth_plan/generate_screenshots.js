const puppeteer = require('puppeteer');
const path = require('path');

async function generateScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const htmlPath = path.join(__dirname, 'slides_template.html');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  const slides = await page.$$('.slide');
  console.log(`📸 Found ${slides.length} slides to capture...`);

  for (let i = 0; i < slides.length; i++) {
    const slidePath = path.join(__dirname, `slide_${i + 1}.png`);
    await slides[i].screenshot({ path: slidePath });
    console.log(`Saved slide_${i + 1}.png`);
  }

  await browser.close();
}

generateScreenshots().catch(console.error);
