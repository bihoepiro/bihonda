import puppeteer from 'puppeteer-core';

const OUT = process.argv[2] || '.';
const SECCIONES = ['hero', 'plot-twists', 'familia', 'sobrinos', 'infancia', 'la-salle', 'data-science', 'amigos-ds', 'trabajo', 'viajes', 'gustos', 'final'];

// edge debe estar ya corriendo con --remote-debugging-port=9222
const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));

for (const id of SECCIONES) {
  await page.evaluate((sel) => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    document.getElementById(sel)?.scrollIntoView();
  }, id);
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: `${OUT}/sec-${id}.png` });
  console.log('ok ' + id);
}
await browser.close();
