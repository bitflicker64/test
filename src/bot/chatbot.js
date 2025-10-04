const { getUserData, getUserContributions, getUserIssues } = require('../api/github'); // GitHub API calls
const { analyzeUserActivity } = require('../logic/activityAnalyzer'); // Logic to analyze user activity

// Function to handle the `/check-user` command
async function handleCheckUserCommand(username, repo, config) {
    // Fetch user data from GitHub
    const userData = await getUserData(username);  // Get user profile info (bio, repos, etc.)
    const userContributions = await getUserContributions(repo, username);  // Get user commits in repo
    const userIssues = await getUserIssues(repo, username);  // Get user comments on issues in repo

    // Analyze the user's activity based on the config rules
    const activity = analyzeUserActivity(userData, config);

    // Generate a response message summarizing the user's activity
    return `**@${username} Summary:**
- Forked Repo: ${userData.forked ? '✅' : '❌'}
- Opened PRs: ${userContributions.length > 0 ? '✅' : '❌'}
- Last Comment: ${userIssues.length > 0 ? userIssues[0].created_at : 'N/A'}
- Activity: ${activity.status}`;
}

module.exports = { handleCheckUserCommand };
