import { createServer } from 'node:http';
import { parse } from 'node:url';
import { renderAquariumSvg } from '../src/svg/renderer.js';
import { deriveEcosystemState } from '../src/engine/ecosystem.js';
import { fetchGitHubMetrics } from '../src/github/client.js';
import { MOCK_DATASETS } from '../src/github/mock-data.js';

const PORT = 5173;
const TOKEN = process.env.GITHUB_TOKEN || '';

const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Git Aquarium - Simulador Local</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0d1117;
      color: #c9d1d9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      padding: 30px 20px;
    }
    h1 {
      font-size: 24px;
      margin-bottom: 8px;
      color: #58a6ff;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    p.subtitle {
      color: #8b949e;
      margin-bottom: 24px;
      font-size: 14px;
    }
    .card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      max-width: 1020px;
      width: 100%;
    }
    .preview-container {
      background: #05070a;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #30363d;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 320px;
      position: relative;
    }
    .preview-container img, .preview-container object {
      width: 100%;
      height: auto;
      display: block;
    }
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 20px;
      align-items: center;
      justify-content: space-between;
    }
    .btn-group {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    button {
      background: #21262d;
      color: #c9d1d9;
      border: 1px solid #363b42;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    button:hover {
      background: #30363d;
      border-color: #8b949e;
    }
    button.active {
      background: #1f6feb;
      border-color: #388bfd;
      color: #ffffff;
    }
    .info-badge {
      font-size: 12px;
      color: #8b949e;
      background: #0d1117;
      padding: 6px 12px;
      border-radius: 20px;
      border: 1px solid #30363d;
    }
  </style>
</head>
<body>
  <h1>🐟 Git Aquarium - Biótopo Amazônico</h1>
  <p class="subtitle">Simulador e visualizador em tempo real dos ecossistemas SVG</p>

  <div class="card">
    <div class="preview-container">
      <object id="aquariumObject" data="/api/aquarium.svg?user=victor-lis-bronzo" type="image/svg+xml" width="960" height="320"></object>
    </div>

    <div class="controls">
      <div class="btn-group">
        <button id="btn-live" class="active" onclick="switchPreset('user', 'victor-lis-bronzo')">🌊 Seu Perfil (@victor-lis-bronzo)</button>
        <button id="btn-thriving" onclick="switchPreset('mock', 'thriving')">🌿 Thriving (Super Ativo)</button>
        <button id="btn-moderate" onclick="switchPreset('mock', 'moderate')">🍃 Moderate (Equilibrado)</button>
        <button id="btn-dormant" onclick="switchPreset('mock', 'dormant')">🍂 Dormant (Inativo)</button>
      </div>
      <div>
        <button onclick="randomizeSeed()">🎲 Sortear Novo Seed</button>
      </div>
    </div>
  </div>

  <script>
    let currentType = 'user';
    let currentValue = 'victor-lis-bronzo';
    let currentSeed = Date.now().toString();

    function updateSvg() {
      const obj = document.getElementById('aquariumObject');
      obj.data = '/api/aquarium.svg?' + currentType + '=' + currentValue + '&seed=' + currentSeed;
    }

    function switchPreset(type, val) {
      currentType = type;
      currentValue = val;
      document.querySelectorAll('.btn-group button').forEach(b => b.classList.remove('active'));
      if (type === 'user') document.getElementById('btn-live').classList.add('active');
      if (val === 'thriving') document.getElementById('btn-thriving').classList.add('active');
      if (val === 'moderate') document.getElementById('btn-moderate').classList.add('active');
      if (val === 'dormant') document.getElementById('btn-dormant').classList.add('active');
      updateSvg();
    }

    function randomizeSeed() {
      currentSeed = Math.random().toString(36).substring(2, 9);
      updateSvg();
    }
  </script>
</body>
</html>`;

const server = createServer(async (req, res) => {
  const parsed = parse(req.url || '/', true);

  if (parsed.pathname === '/' || parsed.pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML);
    return;
  }

  if (parsed.pathname === '/api/aquarium.svg' || parsed.pathname === '/aquarium.svg') {
    try {
      const mockMode = parsed.query.mock as 'dormant' | 'moderate' | 'thriving' | undefined;
      const user = (parsed.query.user as string) || '';
      const seed = (parsed.query.seed as string) || 'default-seed';

      let metrics;
      if (mockMode && MOCK_DATASETS[mockMode]) {
        metrics = MOCK_DATASETS[mockMode];
      } else if (user && TOKEN) {
        metrics = await fetchGitHubMetrics(TOKEN, user);
      } else {
        metrics = MOCK_DATASETS.thriving;
      }

      const ecosystem = deriveEcosystemState(metrics, seed);
      const svg = renderAquariumSvg({
        width: 960,
        height: 320,
        metrics,
        ecosystem
      });

      res.writeHead(200, {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'no-store'
      });
      res.end(svg);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(String(err));
    }
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  process.stdout.write(`Simulator server running at http://localhost:${PORT}\n`);
});
