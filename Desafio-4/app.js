const express = require("express");
require("dotenv").config();
const routes = require("./api/routes");

// Create Express App
const app = express();

app.use("/api", routes);

// Listen on port 8080
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
