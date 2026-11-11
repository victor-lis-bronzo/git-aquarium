import { describe, expect, it } from 'vitest';
import { deriveEcosystemState } from '../src/engine/ecosystem.js';
import { MOCK_DATASETS } from '../src/github/mock-data.js';

describe('deriveEcosystemState', () => {
  it('maps dormant users to dormant tier with no fish', () => {
    const state = deriveEcosystemState(MOCK_DATASETS.dormant, 'seed');
    expect(state.tier).toBe('dormant');
    expect(state.cardinalTetraCount).toBe(0);
    expect(state.angelfishCount).toBe(0);
  });

  it('maps thriving data to frenzy tier and feeding frenzy vitality', () => {
    const state = deriveEcosystemState(MOCK_DATASETS.thriving, 'seed');
    expect(state.tier).toBe('frenzy');
    expect(state.vitality).toBe('feeding_frenzy');
    expect(state.cardinalTetraCount).toBeGreaterThanOrEqual(36);
    expect(state.cardinalTetraCount).toBeLessThanOrEqual(50);
    expect(state.angelfishCount).toBeGreaterThanOrEqual(2);
  });
});
