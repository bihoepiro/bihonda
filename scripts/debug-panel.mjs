import puppeteer from 'puppeteer-core';

const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 60000 });
await page.evaluate(() => {
  document.querySelector('html').style.scrollBehavior = 'auto';
  document.getElementById('infancia')?.scrollIntoView();
  window.scrollBy(0, 1050);
});
await new Promise((r) => setTimeout(r, 2500));
const info = await page.evaluate(() => {
  const seccion = document.getElementById('infancia');
  const figs = [...seccion.querySelectorAll('.dos-columnas figure')];
  return figs.map((f) => {
    const r = f.getBoundingClientRect();
    const cs = getComputedStyle(f);
    const img = f.querySelector('img');
    return {
      rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      opacity: cs.opacity,
      transform: cs.transform.slice(0, 60),
      img: img ? img.src.split('/').pop() : '(sin img)',
    };
  });
});
console.log(JSON.stringify(info, null, 2));
await page.close();
await browser.disconnect();
