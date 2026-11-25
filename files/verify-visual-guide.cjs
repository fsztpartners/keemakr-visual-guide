const { launchOptions } = require('./browser-options.cjs');
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [], remoteRequests = [], scenes = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) remoteRequests.push(request.url()); });
  const url = pathToFileURL(path.join(__dirname, 'Keemakr business operator explained.html')).href;
  await page.goto(url);
  await page.waitForFunction(() => !!window.__KEE_EXPLAINER__);
  const initial = await page.evaluate(() => window.__KEE_EXPLAINER__.getState());
  assert.equal(initial.playing, false, 'Motion must be user-triggered');
  assert.ok(initial.sceneCount >= 12, 'Expected a substantial visual curriculum');
  const stage = await page.locator('#stage-visual').boundingBox();
  assert.ok(stage.y < 400, 'Primary diagram should appear above the fold');
  await page.screenshot({ path: path.join(__dirname, 'visual-guide-desktop.png') });
  for (let index = 0; index < initial.sceneCount; index++) {
    await page.evaluate(i => { const a = window.__KEE_EXPLAINER__; a.showScene(i); a.pause(); }, index);
    const state = await page.evaluate(() => window.__KEE_EXPLAINER__.getState());
    assert.ok(state.stepCount >= 4, state.sceneId + ' needs multiple explanatory steps');
    const steps = [];
    for (let step = 0; step < state.stepCount; step++) {
      await page.evaluate(i => { const a = window.__KEE_EXPLAINER__; a.setStep(i); a.seek(1); }, step);
      const snapshot = await page.evaluate(() => ({ state: window.__KEE_EXPLAINER__.getState(), drawing: document.querySelector('#stage-visual').innerHTML }));
      assert.equal(snapshot.state.stepIndex, step);
      assert.ok(snapshot.drawing.includes('<svg'), state.sceneId + ' should render an actual diagram');
      steps.push(snapshot.drawing);
    }
    assert.ok(new Set(steps).size > 1, state.sceneId + ' steps should change the diagram');
    await page.evaluate(() => window.__KEE_EXPLAINER__.setStep(0));
    await page.evaluate(() => window.__KEE_EXPLAINER__.seek(0));
    const before = await page.locator('#stage-visual').innerHTML();
    await page.evaluate(() => window.__KEE_EXPLAINER__.seek(0.8));
    const after = await page.locator('#stage-visual').innerHTML();
    scenes.push({ id: state.sceneId, steps: state.stepCount, seekChangesDrawing: before !== after });
  }
  const structure = await page.evaluate(() => ({
    duplicateIds: [...document.querySelectorAll('[id]')].map(n => n.id).filter((id, i, ids) => ids.indexOf(id) !== i),
    brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(h => h.length > 1 && !document.getElementById(decodeURIComponent(h.slice(1)))),
    unnamedControls: [...document.querySelectorAll('input:not([type="hidden"]),select,textarea')].filter(n => !n.labels?.length && !n.getAttribute('aria-label') && !n.getAttribute('aria-labelledby')).map(n => n.id),
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    images: [...document.images].map(i => ({ alt: i.alt, embedded: i.src.startsWith('data:'), complete: i.complete && i.naturalWidth > 0 })),
  }));
  assert.deepEqual(structure.duplicateIds, []);
  assert.deepEqual(structure.brokenAnchors, []);
  assert.deepEqual(structure.unnamedControls, []);
  assert.equal(structure.horizontalOverflow, false);
  assert.ok(scenes.filter(s => s.seekChangesDrawing).length >= 12, 'Most scenes need actual moving graphical state');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.__KEE_EXPLAINER__.showScene('registries'));
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await page.screenshot({ path: path.join(__dirname, 'visual-guide-mobile.png') });
  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(url);
  await reducedPage.evaluate(() => { const a = window.__KEE_EXPLAINER__; a.showScene('files'); a.setStep(2); });
  assert.equal(await reducedPage.evaluate(() => window.__KEE_EXPLAINER__.getState().stepIndex), 2);
  const staticContext = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await staticContext.newPage();
  await staticPage.goto(url);
  const noScript = await staticPage.evaluate(() => ({ visibleText: document.body.innerText.length, diagrams: document.querySelectorAll('svg').length, reference: !![...document.links].find(a => /technical(?:%20|\s)reference/i.test(a.getAttribute('href') || '')) }));
  assert.ok(noScript.visibleText > 500 && noScript.diagrams > 0 && noScript.reference);
  assert.deepEqual(errors, []);
  assert.deepEqual(remoteRequests, []);
  const report = { sceneCount: scenes.length, stepsChecked: scenes.reduce((n, s) => n + s.steps, 0), scenes, structure, noScript, errors, remoteRequests };
  fs.writeFileSync(path.join(__dirname, 'visual-guide-browser-checks.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
