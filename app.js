// Führen Sie eine Anfrage an die /tickers-Route durch, um die Ticker abzurufen
fetch('/tickers')
  .then(response => response.json())
  .then(data => {
    // Erhalten Sie die Liste der Ticker aus der JSON-Antwort
    const tickerList = data.tickers;
    // Fügen Sie jeden Ticker als <li>-Element der ulist hinzu
    const tickerListElement = document.getElementById('tickerList');
    tickerList.forEach(ticker => {
      tickerListElement.innerHTML += ticker;
    });
  })
  .catch(error => {
    console.error('Error fetching ticker data:', error);
  });