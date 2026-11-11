import { USER_METRICS_QUERY } from './queries.js';
const API_URL = 'https://api.github.com/graphql';
const dayDiff = (from, to) => Math.max(0, Math.round((to.getTime() - from.getTime()) / 86400000));
const sumHistory = (history, days) => history.slice(-days).reduce((acc, d) => acc + d.contributionCount, 0);
const computeStreak = (history) => {
    let current = 0;
    for (let i = history.length - 1; i >= 0; i--) {
        if (history[i].contributionCount <= 0)
            break;
        current++;
    }
    let longest = 0;
    let run = 0;
    for (const day of history) {
        if (day.contributionCount > 0) {
            run++;
            longest = Math.max(longest, run);
        }
        else {
            run = 0;
        }
    }
    return { currentStreak: current, longestStreakRecent: longest };
};
export async function requestGraphQL(token, query, variables) {
    let attempt = 0;
    let backoffMs = 350;
    while (attempt < 3) {
        attempt++;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'git-aquarium'
            },
            body: JSON.stringify({ query, variables })
        });
        if (response.status >= 500 && attempt < 3) {
            await new Promise((resolve) => setTimeout(resolve, backoffMs));
            backoffMs *= 2;
            continue;
        }
        if (!response.ok) {
            throw new Error(`GitHub GraphQL request failed: HTTP ${response.status}`);
        }
        const payload = (await response.json());
        if (payload.errors?.length) {
            throw new Error(payload.errors.map((e) => e.message).join('; '));
        }
        if (!payload.data) {
            throw new Error('GitHub GraphQL request returned no data');
        }
        return payload.data;
    }
    throw new Error('GitHub GraphQL request retries exhausted');
}
export async function fetchGitHubMetrics(token, username, now = new Date()) {
    const data = await requestGraphQL(token, USER_METRICS_QUERY, { login: username });
    const user = data.user;
    const days = user.contributionsCollection.contributionCalendar.weeks.flatMap((w) => w.contributionDays);
    const dailyHistory = days.slice(-90).map((d) => ({ date: d.date, contributionCount: d.contributionCount }));
    const accountCreatedAt = user.createdAt;
    const accountAgeYears = Number((dayDiff(new Date(accountCreatedAt), now) / 365.2425).toFixed(2));
    const totalContributionsAllTime = user.contributionsCollection.contributionCalendar.totalContributions;
    const totalCommitsAllTime = user.contributionsCollection.totalCommitContributions;
    const totalPRsMerged = user.pullRequests.totalCount;
    const totalIssues = user.contributionsCollection.totalIssueContributions;
    const totalStars = user.repositoriesContributedTo.nodes.reduce((acc, repo) => acc + (repo?.stargazerCount ?? 0), 0);
    const totalRepositories = user.repositories.totalCount;
    const last30DaysContributions = sumHistory(dailyHistory, 30);
    const last7DaysContributions = sumHistory(dailyHistory, 7);
    const last48HoursContributions = sumHistory(dailyHistory, 2);
    const { currentStreak, longestStreakRecent } = computeStreak(dailyHistory);
    return {
        username: user.login,
        accountCreatedAt,
        accountAgeYears,
        totalContributionsAllTime,
        totalCommitsAllTime,
        totalPRsMerged,
        totalIssues,
        totalStars,
        totalRepositories,
        last30DaysContributions,
        last7DaysContributions,
        last48HoursContributions,
        currentStreak,
        longestStreakRecent,
        dailyHistory
    };
}
//# sourceMappingURL=client.js.map