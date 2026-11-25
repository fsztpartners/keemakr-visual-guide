const { chromium } = require('/Users/sobingt/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const directory = __dirname;
  const target = path.join(directory, 'Keemakr business operator explained.html');
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  const remoteRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (/^https?:/.test(request.url())) remoteRequests.push(request.url());
  });
  await page.goto(pathToFileURL(target).href);
  const inspect = () => ({
    title: document.title,
    words: document.body.textContent.trim().split(/\s+/).length,
    headings: Array.from(document.querySelectorAll('h2')).map(node => node.textContent.trim()),
    diagrams: document.querySelectorAll('svg').length,
    disclosures: document.querySelectorAll('details').length,
    duplicateIds: Array.from(document.querySelectorAll('[id]')).map(node => node.id).filter((id, index, ids) => ids.indexOf(id) !== index),
    unnamedInputs: Array.from(document.querySelectorAll('input:not([type="hidden"]),select,textarea')).filter(node => !node.labels?.length && !node.getAttribute('aria-label') && !node.getAttribute('aria-labelledby')).map(node => node.id || node.outerHTML.slice(0, 120)),
    brokenAnchors: Array.from(document.querySelectorAll('a[href^="#"]')).map(a => a.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1)))),
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    controls: Array.from(document.querySelectorAll('button,input,select')).map(el => ({tag: el.tagName, id: el.id, text: (el.textContent || '').trim().slice(0, 80), type: el.type, label: el.getAttribute('aria-label')})),
  });
  const desktop = await page.evaluate(inspect);
  await page.screenshot({ path: path.join(directory, 'guide-desktop.png') });
  await page.setViewportSize({ width: 390, height: 844 });
  const mobile = await page.evaluate(inspect);
  await page.screenshot({ path: path.join(directory, 'guide-mobile.png') });
  const noScript = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noScript.newPage();
  await staticPage.goto(pathToFileURL(target).href);
  const staticContent = await staticPage.evaluate(inspect);
  const result = { desktop, mobile, staticContent, errors, remoteRequests };
  fs.writeFileSync(path.join(directory, 'guide-browser-checks.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
  if (errors.length || desktop.brokenAnchors.length || desktop.duplicateIds.length || desktop.unnamedInputs.length || mobile.horizontalOverflow || remoteRequests.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
