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


app.get('/recent-games/:summonerName', async (req, res) => {
    const summonerName = req.params.summonerName;
    try {
        const summonerResponse = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}?api_key=${API_KEY}`);
        const summonerData = await summonerResponse.json();
        const accountId = summonerData.accountId;
        
        const matchlistResponse = await fetch(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=10&api_key=${API_KEY}`);
        const matchlistData = await matchlistResponse.json();

        res.json(matchlistData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching recent games.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
