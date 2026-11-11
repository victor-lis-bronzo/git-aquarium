import type { EcosystemState, FishEntity } from '../../types.js';
import { SeededRNG } from '../../engine/prng.js';

const symbolFor = (species: FishEntity['species']): string =>
  species === 'angelfish' ? '#angelfish' : species === 'corydoras' ? '#corydoras' : '#cardinalTetra';

export function renderFauna(width: number, height: number, state: EcosystemState, fish: FishEntity[]): string {
  const bodies = fish.map((f) => {
    const transform = `translate(${f.x.toFixed(2)} ${f.y.toFixed(2)}) scale(${(f.direction * f.scale).toFixed(3)} ${f.scale.toFixed(3)}) rotate(${f.pitchAngle.toFixed(2)})`;
    return `<g transform="${transform}" opacity="${f.opacity.toFixed(3)}"><g class="fish" style="--dur:${f.swimDurationSec.toFixed(2)};--delay:${f.swimDelaySec.toFixed(2)};--dx:${f.driftX.toFixed(2)};--dy:${f.bobY.toFixed(2)}"><use href="${symbolFor(f.species)}" /></g></g>`;
  }).join('');

  const rng = new SeededRNG(`${state.seed}:fauna`);
  const particles = Array.from({ length: state.nutrientParticlesCount }, () => {
    const x = rng.range(12, width - 12).toFixed(2);
    const y = rng.range(8, 42).toFixed(2);
    const r = rng.range(0.8, 1.8).toFixed(2);
    return `<circle class="nutrient" cx="${x}" cy="${y}" r="${r}" fill="#ffd38a" opacity="0.85" style="--sink:${rng.range(6, 12).toFixed(2)}"/>`;
  }).join('');

  const bubbles = Array.from({ length: state.bubbleStreamsCount }, (_, idx) => {
    const streamX = ((idx + 1) / (state.bubbleStreamsCount + 1)) * width;
    return Array.from({ length: 10 }, () => {
      const y = rng.range(height * 0.7, height - 6).toFixed(1);
      const r = rng.range(0.8, 2.5).toFixed(2);
      return `<circle class="bubble" cx="${(streamX + rng.gaussian(0, 6)).toFixed(1)}" cy="${y}" r="${r}" fill="rgba(219,236,255,0.58)" style="--rise:${rng.range(4.5, 10).toFixed(2)}"/>`;
    }).join('');
  }).join('');

  return `<g id="fauna">${particles}${bodies}${bubbles}</g>`;
}
