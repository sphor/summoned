// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = require('./config');

app.use(cors());

app.get('/summoner-info/:summonerName', async (req, res) => {
    const summonerName = req.params.summonerName;
    try {
        const response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}?api_key=${API_KEY}`);
        const summonerInfo = await response.json();
        res.json(summonerInfo);
    } catch (error) {
        console.error('Error fetching summoner info:', error);
        res.status(500).json({ error: 'Error fetching summoner info.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});