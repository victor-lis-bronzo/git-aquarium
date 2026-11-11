import { describe, expect, it } from 'vitest';
import { renderAquariumSvg } from '../src/svg/renderer.js';
import { deriveEcosystemState } from '../src/engine/ecosystem.js';
import { MOCK_DATASETS } from '../src/github/mock-data.js';

describe('renderAquariumSvg', () => {
  it('emits a valid viewBox and no NaN coordinates', () => {
    const metrics = MOCK_DATASETS.moderate;
    const ecosystem = deriveEcosystemState(metrics, 'svg-seed');
    const svg = renderAquariumSvg({ width: 960, height: 320, metrics, ecosystem });

    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg.includes('viewBox="0 0 960 320"')).toBe(true);
    expect(svg.includes('id="fauna"')).toBe(true);
    expect(svg.includes('id="flora"')).toBe(true);
    expect(svg.includes('NaN')).toBe(false);
  });
});
