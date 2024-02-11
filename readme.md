# Project Details

This project is built using Node/Express as the backend, and vanilla Javascript/HTML as the frontend.  

## Instantiation
Create a config.js file within the /summoned-api-server folder to store League of Legends API key
```
const riotApiKey = 'XXXXX-XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXX';

module.exports = riotApiKey;
```

## Express Server
Start express server from within the \summoned-api-server folder:\
`node server.js`

Note: Any changes made to the server.js file require a stop/start cycle on the server.

## Frontend
Open index.html in your browser

Your Express server should now be running and listening for requests on http://localhost:3000. You can now make requests to your server to retrieve the last game played using the League of Legends API. Make sure to handle CORS (Cross-Origin Resource Sharing) if your frontend is hosted on a different domain.