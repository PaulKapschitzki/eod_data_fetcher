// Erforderliche Module importieren
const express = require("express");
const cors = require('cors'); // Importiere das cors-Modul für Cross-Origin Resource Sharing
const path = require('path'); // // Die `path`-Bibliothek wird benötigt, um Pfadoperationen durchzuführen

// Erstelle eine Express-Anwendung
const app = express();

// Definiere den Port
const PORT = 3000;

// Middleware verwenden, um Cors zu aktivieren
app.use(cors());

// Middleware, um statische Dateien aus dem "public" Verzeichnis zu servieren
app.use(express.static(path.join(__dirname, "public")));

// Definiere eine GET-Route für den Endpunkt "/", um die index.html Datei zu servieren
app.get("/", (req, res) => {
  // Sende die index.html Datei als Antwort
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Definiere eine Route für GET-Anfragen auf '/tickers'
app.get("/tickers", async (req, res) => {
  try {
    // API-URL für NYSE-Ticker
    const urlNyse = "https://eodhd.com/api/exchange-symbol-list/NYSE?delisted=1&api_token=66112e15926fc3.23171860&fmt=json";
    // API-URL für NASDAQ-Ticker
    const urlNasdaq = "https://eodhd.com/api/exchange-symbol-list/NASDAQ?delisted=1&api_token=66112e15926fc3.23171860&fmt=json";
    
    // Tickerdaten von der API abrufen
    const response = await fetch(urlNyse);
    const data = await response.json();

    // Tickerdaten verarbeiten und in ein Array von <li>-Elementen konvertieren
    const tickerListItems = data.map(ticker => `<li>${ticker.Code} - ${ticker.Name}</li>`);

    // Erfolgreiche Antwort mit den <li>-Elementen als JSON an den Client senden
    // res.status(200).json({ tickers: tickerListItems });

    // Erfolgreiche Antwort mit den <li>-Elementen als HTML-String an den Client senden
    // Alle <li>-Elemente in einen einzigen HTML-String zusammenführen
    const tickerListHTML = tickerListItems.join('');
    res.status(200).send(tickerListHTML);
  } catch (error) {
    // Fehlerbehandlung bei API-Anfragefehlern
    console.error("Error fetching ticker data:", error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
});

// Definiere eine Route für GET-Anfragen auf der Wurzel-URL ('/')
// app.get('/', async (req, res) => {
//   try {
//     // Dynamisches Importieren von node-fetch
//     const fetch = await import('node-fetch');

//     // URL für die externe API - Get list of all Exchanges of EOD API
//     const url = "https://eodhd.com/api/exchanges-list/?api_token=66112e15926fc3.23171860&fmt=json";

//     // Optionen für die fetch-Anfrage
//     const options = {
//       method: "GET", // GET-Anfrage
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     // API-Anfrage senden und auf die Antwort warten
//     const response = await fetch.default(url, options);

//     // Wenn die Antwort erfolgreich ist, JSON-Daten extrahieren
//     if (response.ok) {
//       const data = await response.json();

//       // Erfolgreiche Antwort mit JSON-Daten an den Client senden
//       res.status(200).json(data);
//     } else {
//       // Bei einem Fehler in der API-Antwort entsprechend reagieren
//       res.status(response.status).json({ error: 'Error fetching data from API.' });
//     }
//   } catch (err) {
//     // Fehler beim Abrufen der API-Daten abfangen und entsprechend reagieren
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error.' });
//   }
// });

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