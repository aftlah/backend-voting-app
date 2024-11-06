const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let voteCount = { option1: 0, option2: 0 };
let hasVoted = new Set();

const candidates = [
    { id: 1, name: "Alice Johnson", nim: "12345678", role: "Ketua", photo: "https://via.placeholder.com/100" },
    { id: 2, name: "Charlie Brown", nim: "23456789", role: "Wakil Ketua", photo: "https://via.placeholder.com/100" },
    { id: 3, name: "Bob Smith", nim: "34567890", role: "Ketua", photo: "https://via.placeholder.com/100" },
    { id: 4, name: "Daisy Miller", nim: "45678901", role: "Wakil Ketua", photo: "https://via.placeholder.com/100" },
];

const options = [
    { id: 1, ketua: candidates[0], wakil: candidates[1] },
    { id: 2, ketua: candidates[2], wakil: candidates[3] },
];

app.post('/api/authenticate', (req, res) => {
    const { email, secretCode } = req.body;
    const emailPattern = /^(\d{10})@student\.budiluhur\.ac\.id$/;
    const match = emailPattern.exec(email);
    if (match?.[1]?.length === 10 && secretCode === "123") {
        res.json({ success: true, message: "Authentication successful" });
    } else {
        res.status(401).json({ success: false, message: "Invalid email or secret code" });
    }
});

app.post('/api/vote', (req, res) => {
    const { optionId, email } = req.body;
    if (hasVoted.has(email)) {
        res.status(400).json({ success: false, message: "You have already voted" });
    } else {
        voteCount[`option${optionId}`]++;
        hasVoted.add(email);
        res.json({ success: true, message: "Vote recorded successfully" });
    }
});

app.get('/api/results', (req, res) => {
    res.json(voteCount);
});

app.get('/api/candidates', (req, res) => {
    res.json(candidates);
});

app.get('/api/options', (req, res) => {
    res.json(options);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});