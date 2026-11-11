import type { EcosystemState, FishEntity } from '../types.js';
import { SeededRNG } from './prng.js';

const clamp = (v: number, min: number, max: number): number => Math.min(max, Math.max(min, v));

export interface SchoolingInput {
  width: number;
  height: number;
  ecosystem: EcosystemState;
}

export function generateFishEntities({ width, height, ecosystem }: SchoolingInput): FishEntity[] {
  const rng = new SeededRNG(ecosystem.seed);
  const fish: FishEntity[] = [];
  const centerY = height * 0.45;
  const amplitude = 40 - ecosystem.schoolTightness * 20;

  const add = (species: FishEntity['species'], count: number, yBias: number): void => {
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(1, count - 1);
      const x = width * 0.12 + t * width * 0.76 + rng.gaussian(0, (1 - ecosystem.schoolTightness) * 24);
      const y = centerY + Math.sin(t * Math.PI * 2 + rng.range(-0.8, 0.8)) * amplitude + yBias + rng.gaussian(0, 10);
      const z = clamp(rng.range(0.18, 0.95), 0, 1);
      fish.push({
        id: `${species}-${i}`,
        species,
        x: clamp(x, 24, width - 24),
        y: clamp(y, 22, height - 28),
        z,
        scale: clamp((species === 'angelfish' ? 0.95 : species === 'corydoras' ? 0.65 : 0.55) + z * 0.5 + rng.gaussian(0, 0.05), 0.35, 1.6),
        opacity: clamp(0.45 + z * 0.6 - ecosystem.tanninDepth * 0.2, 0.3, 1),
        direction: rng.next() > 0.5 ? 1 : -1,
        pitchAngle: clamp(rng.gaussian(0, 8), -18, 18),
        swimDurationSec: clamp(rng.range(7, 18) / ecosystem.swimSpeedMultiplier, 3.5, 26),
        swimDelaySec: -rng.range(0, 20),
        driftX: clamp(rng.range(8, 30) * ecosystem.swimSpeedMultiplier, 6, 38),
        bobY: clamp(rng.range(2, 8), 1.5, 9)
      });
    }
  };

  add('cardinal_tetra', ecosystem.cardinalTetraCount, ecosystem.vitality === 'starving' ? height * 0.2 : 0);
  add('angelfish', ecosystem.angelfishCount, -height * 0.08);
  add('corydoras', ecosystem.corydorasCount, height * 0.34);

  return fish.sort((a, b) => a.z - b.z);
}
