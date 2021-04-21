const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();

module.exports = app;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/random", async (req, res, next) => {
  try {
    const { lng, lat } = req.query;

    const foodQuery = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const foodData = await foodQuery.json();
    const foodName = foodData.meals[0].strMeal

    let venuesReturned = 0
    let fetchRes;

    while (venuesReturned === 0) {
      let data = await fetch(
        `https://api.foursquare.com/v2/venues/explore?query=${foodName}&intent=checkin&v=20190709&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&ll=${lat},${lng}&limit=15&radius=1500`
      );
      fetchRes = await data.json();
      venuesReturned = fetchRes.response.totalResults;
    }
    console.log()

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
