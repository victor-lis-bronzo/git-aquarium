import type { BiotopeTier, EcosystemState, GitHubMetrics, VitalityState } from '../types.js';

const clamp = (v: number, min: number, max: number): number => Math.min(max, Math.max(min, v));

const tierFrom30Day = (n: number): BiotopeTier => {
  if (n === 0) return 'dormant';
  if (n <= 15) return 'survival';
  if (n <= 50) return 'healthy';
  if (n <= 120) return 'thriving';
  return 'frenzy';
};

const vitalityFromRecent = (last7: number, streak: number): VitalityState => {
  if (last7 === 0) return 'starving';
  if (last7 >= 10) return 'feeding_frenzy';
  if (last7 >= 5 || streak >= 7) return 'active';
  return 'calm';
};

export function deriveEcosystemState(metrics: GitHubMetrics, seed: string): EcosystemState {
  const tier = tierFrom30Day(metrics.last30DaysContributions);
  const vitality = vitalityFromRecent(metrics.last7DaysContributions, metrics.currentStreak);

  const career = clamp(
    (metrics.totalContributionsAllTime / 6000 + metrics.accountAgeYears / 8 + metrics.totalStars / 2000) / 3,
    0,
    1
  );

  const productivity = clamp(
    (metrics.totalRepositories / 60 + metrics.totalPRsMerged / 1200 + metrics.totalStars / 3000) / 3,
    0,
    1
  );

  const cardinalTetraCount = (() => {
    const n = metrics.last30DaysContributions;
    if (n === 0) return 0;
    if (n <= 15) return clamp(3 + Math.round((n / 15) * 3), 3, 6);
    if (n <= 50) return clamp(7 + Math.round(((n - 16) / 34) * 11), 7, 18);
    if (n <= 120) return clamp(19 + Math.round(((n - 51) / 69) * 16), 19, 35);
    return clamp(36 + Math.round(Math.log2(n - 120 + 1) * 4), 36, 50);
  })();

  const angelfishCount = metrics.last30DaysContributions >= 121 ? 2 + (metrics.last30DaysContributions > 220 ? 1 : 0) : metrics.last30DaysContributions >= 51 ? 1 : 0;

  const corydorasCount = metrics.last30DaysContributions >= 121 ? 2 + (metrics.last48HoursContributions > 0 ? 1 : 0) : metrics.last48HoursContributions > 0 ? 2 : 0;

  const starvationPenalty = vitality === 'starving' ? 0.2 : 0;
  const murkBonus = tier === 'dormant' ? 0.2 : 0;

  return {
    seed,
    tier,
    vitality,
    hardscapeMaturity: clamp(0.1 + career * 0.9, 0.1, 1),
    primaryRootsCount: Math.round(clamp(2 + career * 4, 2, 6)),
    echinodorusCount: Math.round(clamp(3 + productivity * 11, 3, 14)),
    vallisneriaCount: Math.round(clamp(8 + productivity * 27, 8, 35)),
    pistiaCount: Math.round(clamp(4 + productivity * 12, 4, 16)),
    catappaLeafCount: Math.round(clamp(6 + (career + productivity) * 9, 6, 24)),
    tanninDepth: clamp(0.9 - career * 0.45 + murkBonus, 0.3, 0.9),
    causticIntensity: clamp(0.15 + (1 - murkBonus) * (career * 0.7), 0.15, 0.85),
    cardinalTetraCount,
    angelfishCount,
    corydorasCount,
    nutrientParticlesCount: vitality === 'feeding_frenzy' ? 15 + Math.round(cardinalTetraCount * 0.6) : 0,
    bubbleStreamsCount: Math.round(clamp(1 + (productivity + career) * 2.5, 1, 6)),
    swimSpeedMultiplier: vitality === 'starving' ? 0.4 : vitality === 'calm' ? 0.8 : vitality === 'active' ? 1.25 : 1.8,
    schoolTightness: clamp(vitality === 'feeding_frenzy' ? 0.9 : vitality === 'active' ? 0.7 : vitality === 'calm' ? 0.45 : 0.2, 0.2, 0.95)
  };
}
