const express = require('express');
const bodyParser = require('body-parser');
const { handleCheckUserCommand } = require('./src/bot/chatbot'); // Command handling
const { loadConfig } = require('./src/config/config'); // Load configuration settings
const fetch = require('node-fetch');  // For posting back to GitHub

const app = express();
const port = 3000;  // Port for the server

// Middleware to parse incoming JSON payloads from GitHub
app.use(bodyParser.json());

// Endpoint to receive webhook events from GitHub
app.post('/github-webhook', async (req, res) => {
    const event = req.headers['x-github-event']; // GitHub event type
    const payload = req.body;  // GitHub webhook payload

    console.log('Incoming webhook payload:', payload); // Debug: log the incoming data

    // Only process 'issue_comment' events
    if (event === 'issue_comment' && payload.action === 'created') {
        const comment = payload.comment.body;  // Comment body
        const username = payload.comment.user.login;  // GitHub username
        const repo = payload.repository.name;  // Repo name

        console.log('Received comment:', comment); // Debug: log the comment content

        // Check if the comment starts with '/check-user'
        if (comment.startsWith('/check-user')) {
            const config = loadConfig();  // Load config for rules (from config.yml)
            const userData = {
                username,
                repo,
                forked: payload.repository.fork,  // Whether the repo is forked
            };

            // Generate response using chatbot logic
            const responseMessage = await handleCheckUserCommand(username, repo, config);

            // Post the response back to GitHub as a comment
            await postComment(payload.issue.url, responseMessage);

            // Respond to GitHub with a success message
            res.status(200).send('Command processed');
        } else {
            res.status(200).send('No relevant command');
        }
    } else {
        res.status(200).send('Not an issue comment event');
    }
});

// Function to post a comment back to GitHub
async function postComment(issueUrl, message) {
    const token = 'your-github-token';  // Your hardcoded GitHub token

    // GitHub API URL to post comments
    const url = `${issueUrl}/comments`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: message }),
    });

    if (response.ok) {
        console.log('Comment posted successfully');
    } else {
        console.error('Failed to post comment:', response.statusText);
    }
}

// Start the Express server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
