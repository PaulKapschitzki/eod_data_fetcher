const express = require("express");
const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  // res.send("Hello there from get route!");
  const url = "https://eodhd.com/api/exchanges-list/?api_token=66112e15926fc3.23171860&fmt=json";

  const options = {
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }

  // promise syntax
  // fetch(url, options)
  //   .then(res => res.json())
  //   .then(json => console.log(json))
  //   .catch(err => console.error('error: ' + err));

  // or this
  try {
    let response = await fetch(url, options);
    response = await response.json();
    res.status(200).json(response);
  } catch(err) {
    console.log(err);
    res.status(500).json({msg: 'Internal Server Error.'});
  }
});

app.listen(PORT, () => {
  console.log("The server is listening on " + PORT);
});