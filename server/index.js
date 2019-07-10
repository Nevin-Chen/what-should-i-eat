const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const fetch = require("node-fetch");
const randomQuery = require("../server/utilities");
require("dotenv").config();

module.exports = app;

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/random", async (req, res, next) => {
  try {
    const { lng, lat } = req.query;
    const query = randomQuery();

    const data = await fetch(
      `https://api.foursquare.com/v2/venues/explore?query=${query}&intent=checkin&v=20190709&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&ll=${lat},${lng}`
    );
    const fetchRes = await data.json();

    res.json(fetchRes);
  } catch (error) {
    console.error(error);
  }
});

app.get("/:queryParam", async (req, res, next) => {
  try {
    const { lng, lat } = req.query;
    const query = req.params.queryParam;
    
    const data = await fetch(
      `https://api.foursquare.com/v2/venues/explore?query=${query}&intent=checkin&v=20190709&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&ll=${lat},${lng}`
    );
    const fetchRes = await data.json();

    res.json(fetchRes);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
