const express = require("express");
require("dotenv").config();
const routes = require("./api/routes");
const path = "./text.json";
const Container = require("./utils/classes/Container");
const container = new Container(path);
// Create Express App
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/static", express.static(__dirname + "/public"));

app.set("views", "./views");

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("add.pug");
});

app.get("/products", async (req, res) => {
  res.render("index.pug", { products: await container.getAllItems() });
});

app.use("/api", routes);

// Listen on port 8080
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
