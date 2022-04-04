const express = require("express");
const getRandomItem = require("./utils/functions");
const path = "./text.json";

// Import Class and Instantiate
const Container = require("./utils/classes/Container");
const container = new Container(path);
// Data from text.json
const data = container.getAllItems();

const app = express();

app.get("/products", async (req, res) => {
  res.json(await data);
});

app.get("/randomProduct", async (req, res) => {
  res.json(getRandomItem(await data));
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
