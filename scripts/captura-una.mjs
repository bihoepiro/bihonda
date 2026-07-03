import puppeteer from 'puppeteer-core';

const [, , url, sel, out, offset = '0', vw = '1440', vh = '900'] = process.argv;
const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
const page = await browser.newPage();
await page.setViewport({ width: Number(vw), height: Number(vh) });
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await new Promise((r) => setTimeout(r, 1200));
await page.evaluate((s) => {
  document.querySelector('html').style.scrollBehavior = 'auto';
  document.getElementById(s)?.scrollIntoView();
}, sel);
await page.evaluate((px) => window.scrollBy(0, px), Number(offset));
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: out });
await page.close();
await browser.disconnect();
console.log('ok');
