const randomQuery = () => {
    let cuisines = [
      "Sushi",
      "Vegetarian",
      "Vegan",
      "Ramen",
      "Curry",
      "Korean Cuisine",
      "Vietnamese Cuisine",
      "Chinese Cuisine",
      "Shanghainese Cuisine",
      "Taiwanese Cuisine",
      "Thai Cuisine",
      "Indian Cuisine",
      "Mexican Cuisine",
      "Jamaican Cuisine",
      "Italian Cuisine",
      "French Cuisine",
      "German Cuisine",
      "Mediterranean Cuisine",
      "Greek Cuisine",
      "Moroccan Cuisine",
      "Filipino Cuisine",
      "Hawaiian",
      "Burgers",
      "Lobster",
      "Fried Chicken",
      "Poke",
      "Pizza"
    ];

    let randomInt = Math.floor(Math.random() * Math.floor(cuisines.length));

    return cuisines[randomInt];
  };

module.exports = randomQuery;