const express = require("express");
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
require("dotenv").config();
const routes = require("./api/routes");
const path = "./text.json";
const Container = require("./utils/classes/Container");
const container = new Container(path);
const app = express();

app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get("/", async (req, res) => {
  res.render("index.hbs", { products: await container.getAllItems() });
});

app.get("/add-product", (req, res) => {
  res.render("add.hbs");
});

app.use("/api", routes);

// Listen on port 8080
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});