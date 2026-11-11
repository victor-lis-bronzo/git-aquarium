import type { GitHubMetrics } from '../types.js';

const buildHistory = (days: number, base: number): GitHubMetrics['dailyHistory'] => {
  const out: GitHubMetrics['dailyHistory'] = [];
  const start = new Date();
  start.setUTCDate(start.getUTCDate() - days + 1);
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    out.push({ date: d.toISOString().slice(0, 10), contributionCount: base });
  }
  return out;
};

export const MOCK_DATASETS: Record<'dormant' | 'moderate' | 'thriving', GitHubMetrics> = {
  dormant: {
    username: 'dormant-user',
    accountCreatedAt: '2019-01-03T00:00:00.000Z',
    accountAgeYears: 7,
    totalContributionsAllTime: 420,
    totalCommitsAllTime: 260,
    totalPRsMerged: 34,
    totalIssues: 19,
    totalStars: 12,
    totalRepositories: 9,
    last30DaysContributions: 0,
    last7DaysContributions: 0,
    last48HoursContributions: 0,
    currentStreak: 0,
    longestStreakRecent: 2,
    dailyHistory: buildHistory(90, 0)
  },
  moderate: {
    username: 'moderate-user',
    accountCreatedAt: '2018-06-02T00:00:00.000Z',
    accountAgeYears: 8,
    totalContributionsAllTime: 5420,
    totalCommitsAllTime: 3500,
    totalPRsMerged: 520,
    totalIssues: 240,
    totalStars: 670,
    totalRepositories: 65,
    last30DaysContributions: 42,
    last7DaysContributions: 8,
    last48HoursContributions: 3,
    currentStreak: 11,
    longestStreakRecent: 29,
    dailyHistory: buildHistory(90, 2)
  },
  thriving: {
    username: 'thriving-user',
    accountCreatedAt: '2016-04-20T00:00:00.000Z',
    accountAgeYears: 10,
    totalContributionsAllTime: 21980,
    totalCommitsAllTime: 14000,
    totalPRsMerged: 2100,
    totalIssues: 980,
    totalStars: 3200,
    totalRepositories: 180,
    last30DaysContributions: 160,
    last7DaysContributions: 18,
    last48HoursContributions: 9,
    currentStreak: 37,
    longestStreakRecent: 71,
    dailyHistory: buildHistory(90, 6)
  }
};
