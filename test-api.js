const { getUserData, getUserContributions, getUserIssues } = require('./src/api/github');

// Test the functions
async function testAPIs() {
    const username = 'bitflicker64'; // Example GitHub user
    const repo = 'shelll'; // Example GitHub repository
    
    const userData = await getUserData(username);
    console.log('User Data:', userData);

    const userContributions = await getUserContributions(repo, username);
    console.log('User Contributions:', userContributions);

    const userIssues = await getUserIssues(repo, username);
    console.log('User Issues:', userIssues);

    const { loadConfig } = require('./src/config/config');

    const config = loadConfig();
    console.log('Loaded Config:', config);

}

testAPIs();
