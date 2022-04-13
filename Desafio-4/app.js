const express = require("express");
require("dotenv").config();
const routes = require("./api/routes");
const bodyParser = require("body-parser");

// Create Express App
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", routes);

// Listen on port 8080
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
