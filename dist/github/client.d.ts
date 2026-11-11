import type { GitHubMetrics } from '../types.js';
export declare function requestGraphQL<T>(token: string, query: string, variables: Record<string, unknown>): Promise<T>;
export declare function fetchGitHubMetrics(token: string, username: string, now?: Date): Promise<GitHubMetrics>;
