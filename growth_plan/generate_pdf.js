const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  console.log('🚀 Launching Puppeteer to generate pixel-perfect 5-slide PDF...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  // 16:9 Widescreen Presentation Resolution
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  const htmlPath = path.join(__dirname, 'slides_template.html');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

  console.log(`📄 Loading template: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Wait for webfonts to render cleanly
  await page.evaluateHandle('document.fonts.ready');

  const outputPath = path.join(__dirname, 'NxtWave_Growth_Plan_5_Slides.pdf');

  console.log(`🖨️ Printing PDF to: ${outputPath}`);
  await page.pdf({
    path: outputPath,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log('✅ 5-Slide PDF successfully generated!');
}

generatePDF().catch(err => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
