import { mkdir, cp } from 'node:fs/promises';

await mkdir('public', { recursive: true });
for (const path of ['index (1).html', 'du-an-nghi-duong.html', 'assets']) {
  await cp(path, `public/${path}`, { recursive: true });
}
await cp('index (1).html', 'public/index.html');
console.log('Prepared An Cu pages and assets in public/');