const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: "https://preeminent-taiyaki-d9fcc3.netlify.app",
    methods: ["GET", "POST"]
}));

app.use(express.json());
app.use(express.static('.'));

app.post('/api/groq', async (req, res) => {
    console.log("Using key:", process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.substring(0, 10) + "..." : "UNDEFINED");

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.GROQ_API_KEY
        },
        body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log('Server running on https://teach-it-back.onrender.com'));