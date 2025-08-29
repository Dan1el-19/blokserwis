// Lightweight dev server emulating Firebase Hosting rewrites / cleanUrls
// Usage: npm run dev
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { createReadStream, existsSync } from 'node:fs';

const publicDir = path.resolve('./public');
const port = process.env.PORT || 5173;

// Map pretty routes to actual files (based on firebase.json rewrites)
const prettyMap = new Map([
  ['/domofony-lodz', 'domofony_lodz.html'],
  ['/wideodomofony-lodz', 'wideodomofony_lodz.html'],
  ['/monitoring-lodz', 'monitoring_lodz.html'],
  ['/naprawa-monitoringu-lodz', 'naprawa_monitoringu_lodz.html'],
  ['/naprawa-wideodomofonow-lodz', 'naprawa_wideodomofonow_lodz.html'],
  ['/konserwacja-domofonow-lodz', 'konserwacja_domofonow_lodz.html'],
  ['/montaz-wideodomofonow-lodz', 'montaz_wideodomofonow_lodz.html'],
  ['/serwis-domofonow-lodz', 'serwis_domofonow_lodz.html'],
  ['/serwis-wideodomofonow-lodz', 'serwis_wideodomofonow_lodz.html'],
  ['/kontakt', 'kontakt.html'],
  ['/uslugi', 'uslugi.html'],
  ['/realizacje', 'realizacje.html'],
  ['/zaufalinam', 'zaufalinam.html'],
  ['/', 'index.html']
]);

function resolvePath(urlPath) {
  // Strip query/hash
  const clean = urlPath.split('?')[0].split('#')[0];

  // Exact pretty route
  if (prettyMap.has(clean)) return path.join(publicDir, prettyMap.get(clean));

  // If request looks like a file (has extension) serve directly
  if (/\.[a-zA-Z0-9]+$/.test(clean)) {
    return path.join(publicDir, clean.replace(/^\//, ''));
  }

  // Try cleanUrls behavior: /foo -> /foo.html
  const candidate = path.join(publicDir, clean.replace(/^\//, '') + '.html');
  if (existsSync(candidate)) return candidate;

  // 404 fallback
  return path.join(publicDir, '404.html');
}

const server = http.createServer(async (req, res) => {
  try {
    const filePath = resolvePath(req.url || '/');
    const ext = path.extname(filePath).toLowerCase();

    const contentType = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.webp': 'image/webp'
    }[ext] || 'application/octet-stream';

    // Cache headers (simplified vs firebase.json)
    if (/(\.jpg|\.jpeg|\.gif|\.png|\.svg|\.webp|\.js|\.css|\.woff2?)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    } else if (ext === '.html' || ext === '.json') {
      res.setHeader('Cache-Control', 'no-cache');
    }

    res.setHeader('Content-Type', contentType);
    const s = createReadStream(filePath);
    s.on('error', () => {
      res.statusCode = 500;
      res.end('Internal server error');
    });
    s.pipe(res);
  } catch (e) {
    res.statusCode = 500;
    res.end('Internal server error');
  }
});

server.listen(port, () => {
  console.log(`Dev server running at http://localhost:${port}`);
});
