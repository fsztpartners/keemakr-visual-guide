const { chromium } = require('/Users/sobingt/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const checks = [];
  const record = label => checks.push(label);
  await page.goto(pathToFileURL(path.join(__dirname, 'Keemakr business operator explained.html')).href);
  assert.equal(await page.locator('.chapter').count(), 24);
  await page.locator('#chapter-search').fill('impossiblequeryzxq');
  assert.equal(await page.locator('.chapter:visible').count(), 0);
  assert.equal(await page.locator('#no-results').isVisible(), true);
  await page.locator('#clear-search').click();
  assert.equal(await page.locator('.chapter:visible').count(), 24);
  await page.locator('#chapter-search').fill('latency');
  assert.ok(await page.locator('.chapter:visible').count() > 0);
  await page.locator('#clear-search').click();
  record('Chapter search, no-results feedback and clear restore');

  await page.locator('#detail-toggle').click();
  assert.equal(await page.locator('details.engineering[open]').count(), 24);
  await page.locator('#detail-toggle').click();
  assert.equal(await page.locator('details.engineering[open]').count(), 0);
  record('All 24 engineering disclosures open and close');

  const architecture = page.locator('[data-arch]');
  await architecture.nth(3).focus();
  await page.keyboard.press('Enter');
  assert.equal(await architecture.nth(3).getAttribute('aria-pressed'), 'true');
  assert.ok((await page.locator('#arch-explanation').innerText()).length > 20);
  record('Architecture selection works from keyboard');

  await page.locator('#pack-view').selectOption('sales');
  assert.equal(await page.locator('[data-pack="clinic"]').isVisible(), false);
  assert.equal(await page.locator('[data-pack="sales"]').isVisible(), true);
  await page.locator('#pack-view').selectOption('all');
  record('Clinic and sales inventory selection');

  for (const kind of ['clinic', 'sales']) {
    for (const [scenario, expected] of [['success', /Step 6 of 6/], ['approval', /Waiting for human review/], ['timeout', /Outcome uncertain/], ['denied', /Authority denied/]]) {
      await page.locator('#journey-kind').selectOption(kind);
      await page.locator('#journey-scenario').selectOption(scenario);
      while (!(await page.locator('#step-next').isDisabled())) await page.locator('#step-next').click();
      assert.match(await page.locator('#step-readout').innerText(), expected);
      while (!(await page.locator('#step-prev').isDisabled())) await page.locator('#step-prev').click();
      assert.match(await page.locator('#step-readout').innerText(), /Step 1 of 6/);
    }
  }
  record('Eight journey/outcome combinations and backward navigation');

  for (const [key, value] of Object.entries({ intake: 100, contextA: 200, contextB: 300, model: 400, tool: 500, verify: 600, output: 700, human: 2 })) await page.locator('#lat-' + key).fill(String(value));
  const result = await page.locator('#latency-result').innerText();
  assert.match(result, /serial context 2,800 ms/);
  assert.match(result, /overlapped context 2,600 ms/);
  assert.match(result, /difference 200 ms/);
  assert.match(result, /122,600 ms/);
  await page.locator('#lat-intake').fill('-50');
  assert.match(await page.locator('#latency-result').innerText(), /nonnegative/);
  await page.locator('#latency-form button[type="reset"]').click();
  await page.waitForFunction(() => document.querySelector('#latency-result').textContent.includes('4,750 ms'));
  await page.locator('#latency-form').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(__dirname, 'guide-latency.png') });
  record('Critical-path arithmetic, separate human wait, invalid input and reset');

  await page.locator('#gap-severity').selectOption('High');
  assert.ok(await page.locator('.gap:visible').count() > 0);
  assert.equal(await page.locator('.gap[data-severity="Medium"]:visible').count(), 0);
  await page.locator('#gap-type').selectOption('Missing verification');
  assert.ok(await page.locator('.gap:visible').count() > 0);
  assert.equal(await page.locator('.gap:not([data-type="Missing verification"]):visible').count(), 0);
  const phase = page.locator('[data-phase="speed"]');
  await phase.click();
  assert.equal(await phase.getAttribute('aria-pressed'), 'true');
  assert.match(await page.locator('#phase-readout').innerText(), /dominant wait/);
  record('Gap priority/type intersection and roadmap selection');

  await page.locator('#chapter-search').fill('impossiblequeryzxq');
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  await page.emulateMedia({ media: 'print' });
  assert.equal(await page.locator('.chapter:visible').count(), 24);
  assert.equal(await page.locator('details.engineering[open]').count(), 24);
  assert.equal(await page.locator('.gap:visible').count(), 16);
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  await page.emulateMedia({ media: 'screen' });
  assert.equal(await page.locator('details.engineering[open]').count(), 0);
  await page.locator('#clear-search').click();
  record('Print includes filtered chapters, all gap records and engineering details; screen state restores');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('#latency-form').scrollIntoViewIfNeeded();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await page.screenshot({ path: path.join(__dirname, 'guide-mobile-latency.png') });
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  record('Mobile calculator layout and reduced motion');
  assert.deepEqual(errors, []);
  const report = { passed: checks.length, checks, errors };
  fs.writeFileSync(path.join(__dirname, 'guide-interaction-checks.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
