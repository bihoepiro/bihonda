import puppeteer from 'puppeteer-core';

const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
const page = await browser.newPage();
const logs = [];
page.on('console', (m) => logs.push(`${m.type()}: ${m.text().slice(0, 300)}`));
page.on('pageerror', (e) => logs.push(`PAGEERROR: ${String(e).slice(0, 500)}`));
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 60000 });
await page.evaluate(() => {
  document.querySelector('html').style.scrollBehavior = 'auto';
  document.getElementById('infancia')?.scrollIntoView();
  window.scrollBy(0, 1050);
});
await new Promise((r) => setTimeout(r, 2500));
const html = await page.evaluate(() => {
  const col = document.querySelector('#infancia .dos-columnas > div:last-child');
  return col ? col.innerHTML.slice(0, 600) : '(no existe la columna)';
});
console.log('LOGS:\n' + logs.filter((l) => !l.startsWith('debug')).join('\n').slice(0, 2000));
console.log('\nPANEL HTML:\n' + html);
await page.close();
await browser.disconnect();
