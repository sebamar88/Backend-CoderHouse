import express, { Request, Response, Express } from "express";
// require the knex package
const knex = require("knex");
import { Server, Socket } from "socket.io";

const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
require("dotenv").config();
const routes = require("./api/routes");
const app = express();
const http = require("http").Server(app);
const io = new Server(http);
const Container = require("./utils/classes/Container");
const container = new Container("./utils/classes/Container");

app.use(express.static("public"));
app.use("/static", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("add.hbs");
});

io.on("connection", (socket) => {
  socket.on("add product", (msg) => {
    io.emit("add product", msg);
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

app.get("/products", async (req, res) => {
  res.render("index.hbs", { products: await container.getAllItems() });
});

app.use("/api", routes);

// Listen on port 8080
http.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
