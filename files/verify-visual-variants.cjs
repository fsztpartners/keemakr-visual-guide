const { launchOptions } = require('./browser-options.cjs');
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const browser = await chromium.launch(launchOptions);
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const url = pathToFileURL(path.join(__dirname, 'Keemakr business operator explained.html')).href;
    await page.goto(url + '#clinic-day');
    assert.equal(await page.evaluate(() => window.__KEE_EXPLAINER__.getState().sceneId), 'booking');
    const definitions = await page.evaluate(() => JSON.parse(document.querySelector('#scene-data').textContent).scenes.map(s => ({ id: s.id, variants: Object.keys(s.variants), mermaid: s.mermaid })));
    const expectedMedia = await page.evaluate(() => { const d = JSON.parse(document.querySelector('#scene-data').textContent); return { mermaid: Object.keys(d.mermaid).length, images: d.media.length, gifs: d.media.filter(m => !!m.gif).length }; });
    let variantCount = 0, steps = 0;
    const mermaidViews = new Set();
    for (const definition of definitions) {
      await page.evaluate(id => window.__KEE_EXPLAINER__.showScene(id), definition.id);
      for (const variant of definition.variants) {
        assert.equal(await page.evaluate(key => window.__KEE_EXPLAINER__.setVariant(key), variant), true);
        const state = await page.evaluate(() => window.__KEE_EXPLAINER__.getState());
        for (let step = 0; step < state.stepCount; step++) {
          await page.evaluate(i => { const a = window.__KEE_EXPLAINER__; a.setStep(i); a.seek(0.5); }, step);
          assert.ok((await page.locator('#step-caption').innerText()).trim().length > 0);
          assert.equal(await page.locator('#stage-visual svg').count(), 1);
          steps++;
        }
        variantCount++;
      }
      if (definition.mermaid) {
        await page.locator('#mermaid-drawer').evaluate(el => el.open = true);
        assert.equal(await page.locator('#mermaid-visual svg').count(), 1);
        assert.match(await page.locator('#mermaid-source').textContent(), /flowchart|sequenceDiagram/);
        mermaidViews.add(definition.mermaid);
      }
    }
    assert.equal(mermaidViews.size, expectedMedia.mermaid);
    let packIdentityChecks = 0;
    const hasPackChain = definitions.some(d => d.id === 'pack-capabilities');
    if (hasPackChain) {
      for (const [choice, identity] of [['book', 'clinicos/clinic.book'], ['sales_source', 'sales/practices.source']]) {
        await page.evaluate(key => { const a = window.__KEE_EXPLAINER__; a.showScene('pack-capabilities'); a.setVariant(key); }, choice);
        for (const scene of ['capability-contract', 'capability-wiring', 'capability-lifecycle', 'registries']) {
          await page.evaluate(id => window.__KEE_EXPLAINER__.showScene(id), scene);
          assert.equal(await page.evaluate(() => window.__KEE_EXPLAINER__.getState().selectedAction), choice);
          assert.ok((await page.locator('#pack-identity').textContent()).includes(identity));
          packIdentityChecks++;
        }
        await page.evaluate(() => window.__KEE_EXPLAINER__.showScene('capability-examples'));
        assert.match(await page.locator('#pack-identity').textContent(), /clinicos/);
        assert.doesNotMatch(await page.locator('#pack-identity').textContent(), /sales\//);
      }
    }
    await page.evaluate(() => { const a = window.__KEE_EXPLAINER__; a.showScene('registries'); a.setStep(0); });
    const node = page.locator('#stage-visual [role="button"]').first();
    await node.focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#node-inspector').isVisible(), true);
    await page.locator('#close-inspector').click();
    await page.locator('#step-next').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => window.__KEE_EXPLAINER__.getState().stepIndex), 1);
    await page.locator('#replay').click();
    assert.equal(await page.evaluate(() => window.__KEE_EXPLAINER__.getState().stepIndex), 0);
    await page.locator('#play').click();
    await page.waitForTimeout(180);
    assert.equal(await page.evaluate(() => window.__KEE_EXPLAINER__.getState().playing), true);
    await page.locator('#play').click();
    assert.equal(await page.evaluate(() => window.__KEE_EXPLAINER__.getState().playing), false);
    await page.locator('#speed').selectOption('1200');
    await page.evaluate(() => { const a = window.__KEE_EXPLAINER__; a.setStep(a.getState().stepCount - 1); });
    await page.locator('#play').click();
    await page.waitForFunction(() => !window.__KEE_EXPLAINER__.getState().playing, { timeout: 5000 });
    await page.locator('#media-gallery').evaluate(el => el.open = true);
    await page.locator('#media-gallery').scrollIntoViewIfNeeded();
    assert.equal(await page.locator('#media-gallery img').count(), expectedMedia.images);
    assert.equal(await page.locator('[data-media-play]').count(), expectedMedia.gifs);
    const gifButtons = page.locator('[data-media-play]');
    await gifButtons.nth(0).click();
    assert.match(await page.locator('[data-media="0"]').getAttribute('src'), /^data:image\/gif/);
    await gifButtons.nth(1).click();
    assert.equal(await gifButtons.nth(0).getAttribute('aria-pressed'), 'false');
    assert.equal(await gifButtons.nth(1).getAttribute('aria-pressed'), 'true');
    await page.locator('#media-gallery').evaluate(el => el.open = false);
    await page.waitForFunction(() => [...document.querySelectorAll('[data-media-play]')].every(b => b.getAttribute('aria-pressed') !== 'true'));
    assert.ok(await page.locator('#media-gallery img').evaluateAll(images => images.every(i => i.src.startsWith('data:image/png'))));
    const decodedMedia = await page.evaluate(async () => {
      const data = JSON.parse(document.querySelector('#scene-data').textContent);
      const decoded = [];
      for (const media of data.media) for (const kind of ['still', 'gif']) if (media[kind]) {
        const image = new Image(); image.src = media[kind]; await image.decode();
        decoded.push({ title: media.title, kind, width: image.naturalWidth, height: image.naturalHeight });
      }
      return decoded;
    });
    await page.emulateMedia({ media: 'print' });
    assert.equal(await page.locator('.print-only svg:visible').count(), definitions.length);
    assert.deepEqual(errors, []);
    const report = { variantsChecked: variantCount, variantStepsChecked: steps, mermaidDiagrams: mermaidViews.size, pngStills: expectedMedia.images, gifLoops: expectedMedia.gifs, packIdentityChecks, decodedMedia, keyboardInspectorAndSteps: true, finitePlayPauseReplay: true, oneGifAtATime: true, galleryCloseStopsMotion: true, oldClinicDayLink: true, printedScenes: definitions.length, errors };
    fs.writeFileSync(path.join(__dirname, 'visual-guide-variant-checks.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
