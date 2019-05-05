const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();

module.exports = app;

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/:queryParam", async (req, res, next) => {
  try {
    const query = req.params.queryParam
    let parameters;
    if (query === 'McDonalds') {
        parameters = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        query: req.params.queryParam,
        v: 20180323,
        radius: 40,
        limit: 50,
        near: "New York, NY"
        };
    } else {
        parameters = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            query: req.params.queryParam,
            v: 20180323,
            radius: 10,
            limit: 15,
            near: "Financial District, NY"
        };
    }

    const data = await fetch(
      "https://api.foursquare.com/v2/venues/explore?" +
        new URLSearchParams(parameters)
    );

    const fetchRes = await data.json();

    res.json(fetchRes);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
