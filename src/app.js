// app.js (Express server)

const express = require('express');
const path = require('path');
const fs = require('fs');
const mustache = require('mustache');

const app = express();
const port = 3000;

// Dummy logs data
const logsData = [
    { level: "INFO", message: "Log message 1", resourceId: "123456", timestamp: "2023-11-18 12:30:45", traceId: "abc123", spanId: "def456", commit: "Initial commit", metadata: { parentResourceId: "789012" } },
    { level: "ERROR", message: "Log message 2", resourceId: "789012", timestamp: "2023-11-18 13:15:20", traceId: "xyz789", spanId: "uvw321", commit: "Bug fix", metadata: { parentResourceId: "345678" } }
    // Add more log entries as needed with actual data
];
const logsCount = 2;

// Read the Mustache template file
const template = fs.readFileSync(path.join(__dirname, '../views', 'index.mustache'), 'utf-8');


// Endpoint to send logs data with rendered HTML
app.get('/', (req, res) => {
    // Render the Mustache template with logs data
    const renderedHTML = mustache.render(template, { logs: logsData, logsCount: logsCount });
    // Send the rendered HTML to the client
    res.send(renderedHTML);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
