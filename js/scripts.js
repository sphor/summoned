const serverURL = 'http://localhost:3000'; // Change this to your actual server URL if it's hosted elsewhere

// script.js
fetch('summoned-api-server/config.js')
  .then(response => response.text())
  .then(data => {
    // Use regular expressions or parsing logic to extract the API key
    const riotApiKey = /const riotApiKey = '(.*?)';/.exec(data)[1];
    // Now you can use the API key in your code
    console.log(riotApiKey); // Outputs: YOUR_RIOT_API_KEY
    // You can proceed with your logic here, such as fetching summoner data
  })
  .catch(error => console.error('Error loading config:', error));


async function fetchSummonerInfo() {
    const summonerName = document.getElementById('summonerName').value.trim();
    const summonerInfoDiv = document.getElementById('summonerInfo');
    summonerInfoDiv.innerHTML = ''; // Clear previous content

    try {
        const summonerInfoResponse = await fetch(`${serverURL}/summoner-info/${encodeURIComponent(summonerName)}`);
        const summonerInfo = await summonerInfoResponse.json();

        if (summonerInfo) {
            // Display summoner basic info
            const summonerInfoHTML = `
                <div class="summoner">
                    <div><strong>Summoner Name:</strong> ${summonerInfo.name}</div>
                    <div><strong>Level:</strong> ${summonerInfo.summonerLevel}</div>
                    <div><strong>Profile Icon ID:</strong> ${summonerInfo.profileIconId}</div>
                    <div><strong>Account ID:</strong> ${summonerInfo.accountId}</div>
                    <div><strong>Summoner ID:</strong> ${summonerInfo.id}</div>
                    <div><strong>PUUID:</strong> ${summonerInfo.puuid}</div>
                </div>
            `;
            summonerInfoDiv.innerHTML = summonerInfoHTML;
        } else {
            summonerInfoDiv.textContent = 'Summoner not found.';
        }
    } catch (error) {
        console.error('Error fetching summoner info:', error);
        summonerInfoDiv.textContent = 'Error fetching summoner info. Please try again later.';
    }
}
