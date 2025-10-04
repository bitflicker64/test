// src/api/ecosystem.js
async function getRepoActivity(username) {
    // Mocked response for testing purposes
    return {
        username,
        lastActivity: new Date().toISOString(), // Use the current time for testing
        repoActivity: [
            { repo: "repo1", contributions: 5 },
            { repo: "repo2", contributions: 2 },
        ],
    };
}

module.exports = { getRepoActivity };
