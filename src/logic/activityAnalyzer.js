const { getUserContributions, getUserIssues } = require('../api/github');
const { getRepoActivity } = require('../api/ecosystem');

// Analyze user activity based on the config rules
function analyzeUserActivity(userData, config) {
    const { minComments, inactiveDays, forkRequired } = config;

    // Get comments for the user in the repo
    const comments = getUserIssues(userData.repo, userData.username);
    // Get contributions (commits) from the user in the repo
    const commits = getUserContributions(userData.repo, userData.username);
    // Get overall activity data from ecosyste.ms (e.g., activity across repos)
    const activity = getRepoActivity(userData.username);

    let status = 'active';

    // Check for inactivity (if no comments, and last activity is too old)
    const lastActivityDate = new Date(activity.lastActivity);
    const now = new Date();
    const inactivityDuration = (now - lastActivityDate) / (1000 * 3600 * 24); // days

    if (comments.length < minComments || inactivityDuration > inactiveDays) {
        status = 'inactive';
    }

    // Check if the user has forked the repo (if required by config)
    if (forkRequired && !userData.forked) {
        status = 'inactive';
    }

    return {
        status,           // Active or inactive
        comments,         // Comments made by the user
        commits,          // Commits made by the user
        activity,         // Overall activity (mocked data)
    };
}

module.exports = { analyzeUserActivity };
