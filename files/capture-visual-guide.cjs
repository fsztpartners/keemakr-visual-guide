const { launchOptions } = require('./browser-options.cjs');
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { execFileSync } = require('node:child_process');

(async () => {
  const directory = __dirname;
  const mediaDirectory = path.join(directory, 'visual-media');
  fs.mkdirSync(mediaDirectory, { recursive: true });
  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(path.join(directory, 'Keemakr business operator explained.html')).href);
  await page.waitForFunction(() => !!window.__KEE_EXPLAINER__);
  await page.addStyleTag({ content: '*{transition:none!important;animation:none!important}' });
  const planPath = process.argv[2] || path.join(directory, 'visual-capture-plan.json');
  const specifications = JSON.parse(fs.readFileSync(planPath, 'utf8'));
  const manifestPath = path.join(directory, 'visual-media.json');
  const manifest = process.argv.includes('--append') && fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : [];
  for (const specification of specifications) {
    await page.evaluate(id => { window.__KEE_EXPLAINER__.showScene(id); window.__KEE_EXPLAINER__.pause(); }, specification.scene);
    const state = await page.evaluate(() => window.__KEE_EXPLAINER__.getState());
    const stepCount = Math.min(specification.stepLimit ?? state.stepCount, state.stepCount);
    const slug = String(state.sceneId).replace(/[^a-z0-9-]/gi, '-');
    const stillPath = path.join(mediaDirectory, slug + '.png');
    await page.evaluate(index => { const a = window.__KEE_EXPLAINER__; a.setStep(index); a.seek(1); }, stepCount - 1);
    await page.locator('#stage-visual').screenshot({ path: stillPath });
    const entry = { title: specification.title, alt: specification.alt, scene: state.sceneId, still: path.relative(directory, stillPath).split(path.sep).join('/') };
    if (specification.animate) {
      const frameDirectory = path.join(mediaDirectory, slug + '-frames');
      fs.mkdirSync(frameDirectory, { recursive: true });
      const frames = [];
      for (let step = 0; step < stepCount; step++) {
        await page.evaluate(index => window.__KEE_EXPLAINER__.setStep(index), step);
        for (let tick = 0; tick <= 6; tick++) {
          await page.evaluate(progress => window.__KEE_EXPLAINER__.seek(progress), tick / 6);
          const frame = path.join(frameDirectory, String(frames.length).padStart(3, '0') + '.png');
          await page.locator('#stage-visual').screenshot({ path: frame });
          frames.push({ path: frame, duration: tick === 6 ? 650 : 100 });
        }
      }
      const gifPath = path.join(mediaDirectory, slug + '.gif');
      const framesPath = path.join(frameDirectory, 'frames.json');
      fs.writeFileSync(framesPath, JSON.stringify(frames));
      execFileSync('python3', ['-c',
        'from PIL import Image, ImageChops\nimport json,sys\nrows=json.load(open(sys.argv[1]))\nframes=[]\nfor row in rows:\n im=Image.open(row["path"]).convert("RGB")\n im.thumbnail((900,650))\n frames.append(im)\nassert any(ImageChops.difference(frames[0],im).getbbox() for im in frames[1:]), "No changing animation frames"\nframes[0].save(sys.argv[2],save_all=True,append_images=frames[1:],duration=[r["duration"] for r in rows],loop=0,optimize=True,disposal=2)\n',
        framesPath, gifPath,
      ]);
      entry.gif = path.relative(directory, gifPath).split(path.sep).join('/');
    }
    const prior = manifest.findIndex(item => item.scene === entry.scene);
    if (prior >= 0) manifest[prior] = entry;
    else manifest.push(entry);
    console.log('Captured', state.sceneId, state.stepCount, 'steps', entry.gif ? 'PNG + GIF' : 'PNG');
  }
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
