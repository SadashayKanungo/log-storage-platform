// app.js (Express server)

const express = require('express');
const path = require('path');
const fs = require('fs');
const mustache = require('mustache');
const bodyParser = require('body-parser');
const db = require("./db");

const app = express();
const port = 3000;
db.connect();

// Dummy logs data
const logsData = [
    { level: "INFO", message: "Log message 1", resourceId: "123456", timestamp: "2023-11-18 12:30:45", traceId: "abc123", spanId: "def456", commit: "Initial commit", metadata: { parentResourceId: "789012" } },
    { level: "ERROR", message: "Log message 2", resourceId: "789012", timestamp: "2023-11-18 13:15:20", traceId: "xyz789", spanId: "uvw321", commit: "Bug fix", metadata: { parentResourceId: "345678" } }
    // Add more log entries as needed with actual data
];
const logsCount = 2;

// Read the Mustache template file
const resultsTemplate = fs.readFileSync(path.join(__dirname, '../public', 'results.mustache'), 'utf-8');

// Use body-parser middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', async (req, res) => {
    try{
        await db.ingest(req.body);
        res.status(200).send();
    } catch(error){
        res.status(500).send();
    }
});

app.get('/query', async (req, res) => {
    try{
        let results = await db.search(req.query);
        const renderedHTML = mustache.render(resultsTemplate, {logsCount: results.length, logsData: results});
        res.send(renderedHTML); 
    } catch(error){
        console.log(error);
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
