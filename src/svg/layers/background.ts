import type { EcosystemState } from '../../types.js';

export function renderBackground(width: number, height: number, state: EcosystemState): string {
  const beams = Array.from({ length: 5 }, (_, i) => {
    const x = 70 + i * (width / 6);
    const w = 40 + i * 10;
    const h = height * 0.85;
    return `<polygon class="caustic" points="${x},0 ${x + w},0 ${x + w * 0.3},${h} ${x - w * 0.3},${h}" fill="url(#sunbeam)" opacity="${(state.causticIntensity * 0.5).toFixed(2)}"/>`;
  }).join('');

  return `
  <g id="background">
    <rect width="${width}" height="${height}" fill="url(#bgWater)"/>
    ${beams}
    <rect width="${width}" height="${height}" fill="url(#tanninVignette)"/>
    <rect y="0" width="${width}" height="12" fill="rgba(255,255,255,0.07)"/>
  </g>`;
}
