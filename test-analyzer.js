const { analyzeUserActivity } = require('./src/logic/activityAnalyzer');
const { loadConfig } = require('./src/config/config');

// Example user data and configuration
const userData = {
    username: 'bitflicker64', // GitHub username
    repo: 'shelll', // Repo to analyze
    forked: true,        // Whether they forked the repo
};

const config = loadConfig(); // Load the config from config.yml

async function testActivityAnalyzer() {
    const result = await analyzeUserActivity(userData, config);
    console.log(result);
}
 
testActivityAnalyzer();
