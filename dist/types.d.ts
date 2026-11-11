export interface ContributionDay {
    date: string;
    contributionCount: number;
}
export interface GitHubMetrics {
    username: string;
    accountCreatedAt: string;
    accountAgeYears: number;
    totalContributionsAllTime: number;
    totalCommitsAllTime: number;
    totalPRsMerged: number;
    totalIssues: number;
    totalStars: number;
    totalRepositories: number;
    last30DaysContributions: number;
    last7DaysContributions: number;
    last48HoursContributions: number;
    currentStreak: number;
    longestStreakRecent: number;
    dailyHistory: ContributionDay[];
}
export type BiotopeTier = 'dormant' | 'survival' | 'healthy' | 'thriving' | 'frenzy';
export type VitalityState = 'starving' | 'calm' | 'active' | 'feeding_frenzy';
export interface EcosystemState {
    seed: string;
    tier: BiotopeTier;
    vitality: VitalityState;
    hardscapeMaturity: number;
    primaryRootsCount: number;
    echinodorusCount: number;
    vallisneriaCount: number;
    pistiaCount: number;
    catappaLeafCount: number;
    tanninDepth: number;
    causticIntensity: number;
    cardinalTetraCount: number;
    angelfishCount: number;
    corydorasCount: number;
    nutrientParticlesCount: number;
    bubbleStreamsCount: number;
    swimSpeedMultiplier: number;
    schoolTightness: number;
}
export interface Point2D {
    x: number;
    y: number;
}
export interface FishEntity {
    id: string;
    species: 'cardinal_tetra' | 'angelfish' | 'corydoras';
    x: number;
    y: number;
    z: number;
    scale: number;
    opacity: number;
    direction: 1 | -1;
    pitchAngle: number;
    swimDurationSec: number;
    swimDelaySec: number;
    driftX: number;
    bobY: number;
}
export interface DriftwoodBranch {
    id: string;
    layer: 'back' | 'mid' | 'front';
    d: string;
    barkHighlights: string[];
    color: string;
    opacity: number;
}
export interface PlantCluster {
    id: string;
    species: 'echinodorus' | 'vallisneria' | 'pistia';
    layer: 'back' | 'mid' | 'front';
    x: number;
    y: number;
    scale: number;
    opacity: number;
    swayDurationSec: number;
    swayDelaySec: number;
    leaves: Array<{
        d: string;
        veinD?: string;
        fill: string;
    }>;
}
export interface AquariumRenderInput {
    width: number;
    height: number;
    metrics: GitHubMetrics;
    ecosystem: EcosystemState;
}
