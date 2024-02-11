async function getLastGame() {
    const summonerName = document.getElementById('summonerName').value;
    const apiKey = process.env.LOL_API_KEY; // Accessing the API key from environment variable

    if (!apiKey) {
        console.error('API key not provided. Please set the LOL_API_KEY environment variable.');
        return;
    }

    // Fetch summoner ID
    const summonerResponse = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`);
    const summonerData = await summonerResponse.json();
    const summonerId = summonerData.id;

    // Fetch match history
    const matchHistoryResponse = await fetch(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerId}?api_key=${apiKey}`);
    const matchHistoryData = await matchHistoryResponse.json();
    const matches = matchHistoryData.matches;

    // Get the ID of the last match played
    const lastMatchId = matches[0].gameId;

    // Fetch match details
    const matchDetailsResponse = await fetch(`https://na1.api.riotgames.com/lol/match/v4/matches/${lastMatchId}?api_key=${apiKey}`);
    const matchDetailsData = await matchDetailsResponse.json();

    // Display the last game played
    const lastGameDiv = document.getElementById('lastGame');
    lastGameDiv.innerHTML = `
        <h2>Last Game Played:</h2>
        <p>Game Mode: ${matchDetailsData.gameMode}</p>
        <p>Game Type: ${matchDetailsData.queueType}</p>
    `;
}
