const express = require("express");

const app = express();

const path = "./text.json";

const Container = require("./Container");

app.get("/products", async (req, res) => {
  const container = new Container(path);
  const data = await container.getAllItems();
  res.json(data);
});

app.get("/randomProduct", async (req, res) => {
  const container = new Container(path);
  const data = await container.getAllItems();
  const randomData = data[Math.floor(Math.random() * data.length)];
  res.json(randomData);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
