const yaml = require('js-yaml');
const fs = require('fs');

// Load configuration from YAML file
function loadConfig() {
    try {
        const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
        return config.rules;  // Return the rules defined in the YAML file
    } catch (e) {
        console.error('Error loading config:', e);
        return null;
    }
}

module.exports = { loadConfig };
