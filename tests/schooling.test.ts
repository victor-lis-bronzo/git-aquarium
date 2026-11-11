import { describe, expect, it } from 'vitest';
import { deriveEcosystemState } from '../src/engine/ecosystem.js';
import { generateFishEntities } from '../src/engine/schooling.js';
import { MOCK_DATASETS } from '../src/github/mock-data.js';

describe('generateFishEntities', () => {
  it('is deterministic for the same seed and dimensions', () => {
    const ecosystem = deriveEcosystemState(MOCK_DATASETS.moderate, 'same-seed');
    const first = generateFishEntities({ width: 960, height: 320, ecosystem });
    const second = generateFishEntities({ width: 960, height: 320, ecosystem });
    expect(first).toEqual(second);
  });

  it('keeps fish inside render bounds', () => {
    const ecosystem = deriveEcosystemState(MOCK_DATASETS.thriving, 'bounds');
    const fish = generateFishEntities({ width: 960, height: 320, ecosystem });
    expect(fish.length).toBeGreaterThan(0);
    for (const item of fish) {
      expect(item.x).toBeGreaterThanOrEqual(24);
      expect(item.x).toBeLessThanOrEqual(936);
      expect(item.y).toBeGreaterThanOrEqual(22);
      expect(item.y).toBeLessThanOrEqual(292);
    }
  });
});
