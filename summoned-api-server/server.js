// server.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/lastGame', async (req, res) => {
    const { summonerName } = req.body;
    const apiKey = process.env.LOL_API_KEY;

    try {
        const summonerResponse = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`);
        const summonerData = await summonerResponse.json();
        const summonerId = summonerData.id;

        const matchHistoryResponse = await fetch(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerId}?api_key=${apiKey}`);
        const matchHistoryData = await matchHistoryResponse.json();
        const matches = matchHistoryData.matches;

        const lastMatchId = matches[0].gameId;

        const matchDetailsResponse = await fetch(`https://na1.api.riotgames.com/lol/match/v4/matches/${lastMatchId}?api_key=${apiKey}`);
        const matchDetailsData = await matchDetailsResponse.json();

        res.json({
            gameMode: matchDetailsData.gameMode,
            queueType: matchDetailsData.queueType
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
