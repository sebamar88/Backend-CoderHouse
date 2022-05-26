"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const { NODE_ENV, PORT } = require("../config.js");
const handlebars = require("express-handlebars").create({
    defaultLayout: "main",
});
const trim = NODE_ENV.trim();
let Products;
if (trim === "mongo") {
    require(`./config/mongo`);
    require("./models/mongo/products");
    Products = require("./models/mongo/products");
}
else {
    require(`./config/firebase`);
    require("./models/firebase/products");
    Products = require("./models/firebase/products");
}
const routes = require("./api/routes");
const app = (0, express_1.default)();
const http = require("http").Server(app);
const io = new socket_io_1.Server(http);
app.use(express_1.default.static("public"));
app.use("/static", express_1.default.static(__dirname + "/public"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.get("/", (_req, res) => {
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
app.get("/products", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Products.findAll();
        console.log(products);
        res.render("index.hbs", { products });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
app.use("/api", routes);
// Listen on port 8080
http.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
