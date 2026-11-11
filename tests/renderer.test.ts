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

  it('defines fish species as <g> elements instead of <symbol> to prevent 100% viewport scaling in browsers', () => {
    const metrics = MOCK_DATASETS.moderate;
    const ecosystem = deriveEcosystemState(metrics, 'svg-seed');
    const svg = renderAquariumSvg({ width: 960, height: 320, metrics, ecosystem });

    expect(svg).not.toMatch(/<symbol id="(cardinalTetra|angelfish|corydoras)"/);
    expect(svg).toMatch(/<g id="cardinalTetra">/);
    expect(svg).toMatch(/<g id="angelfish">/);
    expect(svg).toMatch(/<g id="corydoras">/);
  });

  it('uses valid CSS calc() for animation durations and nests fish animation within positioning group', () => {
    const metrics = MOCK_DATASETS.moderate;
    const ecosystem = deriveEcosystemState(metrics, 'svg-seed');
    const svg = renderAquariumSvg({ width: 960, height: 320, metrics, ecosystem });

    // Invalid CSS: var(--dur)s, var(--sway)s, var(--rise)s, var(--sink)s
    expect(svg).not.toMatch(/var\(--[a-zA-Z0-9]+\)s/);

    // Must use calc(var(--dur) * 1s)
    expect(svg).toMatch(/calc\(var\(--dur\) \* 1s\)/);
    expect(svg).toMatch(/calc\(var\(--sway\) \* 1s\)/);
    expect(svg).toMatch(/calc\(var\(--rise\) \* 1s\)/);
    expect(svg).toMatch(/calc\(var\(--sink\) \* 1s\)/);

    // Fish animation group must be nested inside positioning group to preserve coordinates
    expect(svg).toMatch(/<g transform="translate\([^"]+\) scale\([^"]+\) rotate\([^"]+\)" opacity="[^"]+"><g class="fish"/);
  });
});
