import type { EcosystemState } from '../../types.js';
import { SeededRNG } from '../../engine/prng.js';

export function renderFlora(width: number, height: number, state: EcosystemState): string {
  const rng = new SeededRNG(`${state.seed}:flora`);

  const vallisneria = Array.from({ length: state.vallisneriaCount }, () => {
    const x = rng.range(10, width - 10);
    const h = rng.range(height * 0.18, height * 0.42);
    const ctrl = rng.range(-18, 18);
    const sway = rng.range(5, 11).toFixed(2);
    return `<path class="plant" style="--sway:${sway};--sdelay:${(-rng.range(0, 8)).toFixed(2)}" d="M ${x.toFixed(1)} ${height - 8} Q ${(x + ctrl).toFixed(1)} ${(height - h * 0.7).toFixed(1)} ${x.toFixed(1)} ${(height - h).toFixed(1)}" stroke="#4e7e4c" stroke-width="1.8" fill="none" opacity="0.56"/>`;
  }).join('');

  const swords = Array.from({ length: state.echinodorusCount }, () => {
    const x = rng.range(28, width - 28);
    const y = height - rng.range(20, 32);
    const scale = rng.range(0.7, 1.18);
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${scale.toFixed(2)})" opacity="0.74"><g class="plant" style="--sway:${rng.range(6, 11).toFixed(2)};--sdelay:${(-rng.range(0, 6)).toFixed(2)}"><path d="M0 0 C-8 -20 -10 -38 0 -56 C10 -38 8 -20 0 0" fill="#5b8e50"/><path d="M-4 0 C-12 -16 -13 -31 -3 -45 C1 -30 0 -16 -4 0" fill="#6ca35c"/></g></g>`;
  }).join('');

  const pistia = Array.from({ length: state.pistiaCount }, () => {
    const x = rng.range(24, width - 24);
    const y = rng.range(6, 20);
    const s = rng.range(0.6, 1.05);
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})" opacity="0.9"><ellipse cx="0" cy="0" rx="11" ry="6" fill="#7ea867"/><path d="M0 5 C-2 18 2 24 0 38" stroke="#9d8a63" stroke-width="1" fill="none" opacity="0.6"/></g>`;
  }).join('');

  return `<g id="flora">${vallisneria}${swords}${pistia}</g>`;
}
