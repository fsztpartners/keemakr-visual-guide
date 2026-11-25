const fs = require('node:fs');

const systemChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executablePath = process.env.CHROME_PATH || (fs.existsSync(systemChrome) ? systemChrome : undefined);

// With no system Chrome, use the browser installed by `npx playwright install chromium`.
exports.launchOptions = { headless: true, ...(executablePath ? { executablePath } : {}) };
