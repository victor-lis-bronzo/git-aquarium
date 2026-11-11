import type { EcosystemState } from '../../types.js';
import { SeededRNG } from '../../engine/prng.js';

export function renderSubstrate(width: number, height: number, state: EcosystemState): string {
  const rng = new SeededRNG(`${state.seed}:substrate`);
  const yBase = height * 0.8;

  const pebbles = Array.from({ length: 28 }, (_, i) => {
    const x = rng.range(10, width - 10).toFixed(1);
    const y = rng.range(yBase + 4, height - 6).toFixed(1);
    const r = rng.range(0.8, 2.6).toFixed(2);
    const c = i % 2 === 0 ? '#2f2b27' : '#4e463f';
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="0.75" />`;
  }).join('');

  const leaves = Array.from({ length: state.catappaLeafCount }, () => {
    const x = rng.range(22, width - 22).toFixed(1);
    const y = rng.range(yBase + 5, height - 4).toFixed(1);
    const w = rng.range(8, 16).toFixed(1);
    return `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="3.4" fill="#6c4e31" opacity="0.6" />`;
  }).join('');

  return `
  <g id="substrate">
    <path d="M0 ${yBase} Q ${width * 0.25} ${yBase - 10}, ${width * 0.5} ${yBase + 2} T ${width} ${yBase - 8} L ${width} ${height} L 0 ${height} Z" fill="#d2c09b" opacity="0.88"/>
    <path d="M0 ${yBase + 8} Q ${width * 0.3} ${yBase + 4}, ${width * 0.64} ${yBase + 11} T ${width} ${yBase + 6} L ${width} ${height} L 0 ${height} Z" fill="#bea77f" opacity="0.78"/>
    ${pebbles}
    ${leaves}
  </g>`;
}
