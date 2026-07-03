import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const cssPath = 'public/fonts/bunny.css';
let css = readFileSync(cssPath, 'utf8');
const urls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.bunny\.net[^)'" ]+)\)/g)].map(m => m[1]))];
console.log(`descargando ${urls.length} archivos...`);
let ok = 0;
for (const url of urls) {
  const name = url.split('/').pop().replace(/[^A-Za-z0-9._-]/g, '');
  try {
    execFileSync('curl.exe', ['-s', '--max-time', '40', '-o', `public/fonts/${name}`, url], { stdio: 'inherit' });
    css = css.replaceAll(url, `/fonts/${name}`);
    ok++;
  } catch {
    console.log('fallo: ' + url);
  }
}
writeFileSync('public/fonts/fonts.css', css);
console.log(`listo: ${ok}/${urls.length}`);
