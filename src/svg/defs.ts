import type { EcosystemState } from '../types.js';

export function renderDefs(state: EcosystemState): string {
  const tannin = state.tanninDepth.toFixed(3);
  const caustics = state.causticIntensity.toFixed(3);
  return `
  <defs>
    <linearGradient id="bgWater" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2e2a1f" />
      <stop offset="40%" stop-color="#2b2016" />
      <stop offset="100%" stop-color="#1a130c" />
    </linearGradient>
    <radialGradient id="tanninVignette" cx="50%" cy="35%" r="85%">
      <stop offset="0%" stop-color="rgba(118,78,34,${(0.12 + Number(tannin) * 0.12).toFixed(3)})" />
      <stop offset="100%" stop-color="rgba(20,12,6,${(0.42 + Number(tannin) * 0.4).toFixed(3)})" />
    </radialGradient>
    <linearGradient id="sunbeam" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(255,218,156,${(0.25 * Number(caustics)).toFixed(3)})" />
      <stop offset="100%" stop-color="rgba(255,218,156,0)" />
    </linearGradient>
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="1.8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <symbol id="cardinalTetra" viewBox="-30 -12 60 24">
      <ellipse cx="0" cy="0" rx="22" ry="8" fill="#c83737" />
      <rect x="-22" y="-5" width="44" height="4" rx="2" fill="#39a7ff" />
      <polygon points="22,0 30,-5 30,5" fill="#d24848" />
    </symbol>
    <symbol id="angelfish" viewBox="-20 -26 40 52">
      <ellipse cx="0" cy="2" rx="12" ry="17" fill="#d8d2c6" />
      <polygon points="0,-26 -7,-9 7,-9" fill="#e9e4da" />
      <polygon points="0,26 -6,10 6,10" fill="#e9e4da" />
      <rect x="-10" y="-5" width="20" height="2" fill="#67604d" opacity="0.45"/>
    </symbol>
    <symbol id="corydoras" viewBox="-24 -8 48 16">
      <ellipse cx="0" cy="0" rx="16" ry="6" fill="#8a7a5f" />
      <polygon points="16,0 24,-4 24,4" fill="#77684f" />
      <line x1="-14" y1="0" x2="-22" y2="4" stroke="#b8a780" stroke-width="1" />
      <line x1="-14" y1="0" x2="-22" y2="-4" stroke="#b8a780" stroke-width="1" />
    </symbol>
  </defs>`;
}
