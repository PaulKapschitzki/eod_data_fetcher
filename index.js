// Erforderliche Module importieren
const express = require("express");
const cors = require('cors'); // Importiere das cors-Modul für Cross-Origin Resource Sharing

// Erstelle eine Express-Anwendung
const app = express();

// Definiere den Port
const PORT = 3000;

// Middleware verwenden, um Cors zu aktivieren
app.use(cors());

// Definiere eine Route für GET-Anfragen auf der Wurzel-URL ('/')
app.get('/', async (req, res) => {
  try {
    // Dynamisches Importieren von node-fetch
    const fetch = await import('node-fetch');

    // URL für die externe API
    const url = "https://eodhd.com/api/exchanges-list/?api_token=66112e15926fc3.23171860&fmt=json";

    // Optionen für die fetch-Anfrage
    const options = {
      method: "GET", // GET-Anfrage
      headers: {
        "Content-Type": "application/json",
      },
    };

    // API-Anfrage senden und auf die Antwort warten
    const response = await fetch.default(url, options);

    // Wenn die Antwort erfolgreich ist, JSON-Daten extrahieren
    if (response.ok) {
      const data = await response.json();

      // Erfolgreiche Antwort mit JSON-Daten an den Client senden
      res.status(200).json(data);
    } else {
      // Bei einem Fehler in der API-Antwort entsprechend reagieren
      res.status(response.status).json({ error: 'Error fetching data from API.' });
    }
  } catch (err) {
    // Fehler beim Abrufen der API-Daten abfangen und entsprechend reagieren
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
});

// Server starten und auf Verbindungen auf dem angegebenen Port warten
app.listen(PORT, () => {
  console.log("The server is listening on " + PORT);
});

// const express = require("express");
// const app = express();
// const PORT = 3000;

// app.get('/', async (req, res) => {
//   // res.send("Hello there from get route!");
//   const url = "https://eodhd.com/api/exchanges-list/?api_token=66112e15926fc3.23171860&fmt=json";

//   const options = {
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   }

//   // promise syntax
//   // fetch(url, options)
//   //   .then(res => res.json())
//   //   .then(json => console.log(json))
//   //   .catch(err => console.error('error: ' + err));

//   // or this
//   try {
//     let response = await fetch(url, options);
//     response = await response.json();
//     res.status(200).json(response);
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({msg: 'Internal Server Error.'});
//   }
// });

// app.listen(PORT, () => {
//   console.log("The server is listening on " + PORT);
// });