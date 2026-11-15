// Chrome DevTools Protocol: kiểm tra trang cục bộ, không cần cài thư viện.
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
const profile = await mkdtemp(join(tmpdir(), 'ancu-layout-'));
const browser = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-sandbox',
  '--allow-file-access-from-files', '--remote-debugging-port=0', '--user-data-dir=' + profile,
  'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
let sequence = 0;
const pending = new Map();
const errors = [];
function cdp(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error('CDP timeout: ' + method)); }, 20000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  assert(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
try {
  let port;
  for (let i = 0; i < 80; i++) {
    try { port = (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; break; }
    catch { await pause(100); }
  }
  assert(port, 'Chrome did not start');
  const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  socket = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const request = pending.get(message.id);
      if (request) { clearTimeout(request.timer); pending.delete(message.id); message.error ? request.reject(message.error) : request.resolve(message.result); }
    } else if (message.method === 'Runtime.exceptionThrown') {
      errors.push(message.params.exceptionDetails.text + ': ' + (message.params.exceptionDetails.exception?.description || ''));
    }
  };
  await cdp('Page.enable');
  await cdp('Runtime.enable');
  const output = join(root, 'artifacts/layout-qa');
  await mkdir(output, { recursive: true });
  for (const page of ['index (1).html', 'du-an-nghi-duong.html']) {
    for (const width of [375, 768, 1440]) {
      await cdp('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false });
      await cdp('Page.navigate', { url: pathToFileURL(join(root, page)).href });
      for (let i = 0; i < 100; i++) {
        if (await evaluate(`document.readyState === 'complete' && document.querySelector('.back-to-top') !== null`)) break;
        await pause(100);
      }
      await evaluate('document.fonts.ready.then(() => true)');
      await pause(800);
      const metrics = await evaluate(`({width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        fonts: [...document.fonts].map(f=>({family:f.family,status:f.status})),
        badText: /\uFFFD|Ã£|á»/.test(document.body.textContent),
        brokenImages: [...document.images].filter(i=>i.complete&&!i.naturalWidth).length})`);
      assert.equal(metrics.width, width);
      assert(metrics.scrollWidth <= width + 1, JSON.stringify(metrics));
      assert(metrics.fonts.some(font => font.family === 'Be Vietnam Local' && font.status === 'loaded'));
      assert.equal(metrics.badText, false, 'Corrupted UTF-8 text');
      const capture = await cdp('Page.captureScreenshot', { format: 'png' });
      await writeFile(join(output, `${width}-${page}.png`), Buffer.from(capture.data, 'base64'));
      if (width === 375) {
        if (page === 'du-an-nghi-duong.html') {
          assert(await evaluate(`document.querySelector('.menu-toggle').click(); document.querySelector('#menu').hidden === false`));
          assert(await evaluate(`document.querySelector('#menu a').click(); true`));
          // Navigation returns home; reopen resort for form checks.
          await cdp('Page.navigate', { url: pathToFileURL(join(root, page)).href });
          for (let i = 0; i < 80; i++) {
            if (await evaluate(`document.readyState === 'complete' && !!document.querySelector('#interest-form')`)) break;
            await pause(100);
          }
          assert(await evaluate(`document.querySelector('#message').value='Tôi muốn tìm hiểu không gian xanh'; document.querySelector('#interest-form').requestSubmit(); !document.querySelector('#draft-area').hidden && document.querySelector('#draft').value.includes('không gian xanh')`));
        } else {
          assert(await evaluate(`document.querySelector('.mobile-toggle').click(); document.querySelector('#nav').classList.contains('open')`));
          assert(await evaluate(`document.querySelector('nav a[href="du-an-nghi-duong.html"]') !== null`));
          assert(await evaluate(`document.querySelector('[data-save]').click(); document.querySelector('#savedCount').textContent === '1'`));
        }
      }
      console.log('PASS', page, width + 'px', JSON.stringify(metrics));
    }
  }
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert(await evaluate(`getComputedStyle(document.documentElement).scrollBehavior === 'auto' && getComputedStyle(document.querySelector('.hero-copy')).animationName === 'none'`));
  assert.deepEqual(errors, [], 'Uncaught JavaScript errors');
  console.log('PASS: mobile menu, saved listing, draft form, reduced motion, no uncaught JavaScript errors.');
} finally {
  if (socket?.readyState === WebSocket.OPEN) {
    try { await cdp('Browser.close'); } catch {}
    socket.close();
  }
  browser.kill();
  await pause(500);
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
}
