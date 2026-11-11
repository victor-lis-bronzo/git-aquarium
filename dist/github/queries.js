export const USER_METRICS_QUERY = `
query AquariumUserMetrics($login: String!) {
  user(login: $login) {
    login
    createdAt
    repositories(first: 1, ownerAffiliations: OWNER) {
      totalCount
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      contributionYears
    }
    pullRequests(states: MERGED) {
      totalCount
    }
    repositoriesContributedTo(contributionTypes: [COMMIT, PULL_REQUEST, ISSUE], first: 100, includeUserRepositories: true) {
      nodes {
        stargazerCount
      }
    }
  }
}
`;
//# sourceMappingURL=queries.js.map