import type { AquariumRenderInput } from '../types.js';
import { generateFishEntities } from '../engine/schooling.js';
import { renderDefs } from './defs.js';
import { renderStyles } from './styles.js';
import { renderBackground } from './layers/background.js';
import { renderSubstrate } from './layers/substrate.js';
import { renderHardscape } from './layers/hardscape.js';
import { renderFlora } from './layers/flora.js';
import { renderFauna } from './layers/fauna.js';
import { renderHud } from './layers/hud.js';

export function renderAquariumSvg(input: AquariumRenderInput): string {
  const { width, height, metrics, ecosystem } = input;
  const fish = generateFishEntities({ width, height, ecosystem });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Amazonian Blackwater Biotope Aquarium for ${metrics.username}">
  ${renderDefs(ecosystem)}
  ${renderStyles()}
  ${renderBackground(width, height, ecosystem)}
  ${renderHardscape(width, height, ecosystem)}
  ${renderFlora(width, height, ecosystem)}
  ${renderSubstrate(width, height, ecosystem)}
  ${renderFauna(width, height, ecosystem, fish)}
  ${renderHud(width, height, metrics)}
</svg>`;
}
