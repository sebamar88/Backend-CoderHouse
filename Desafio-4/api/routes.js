const express = require("express");
const { Router } = express;
const bodyParser = require("body-parser");

// Products Controllers
const getAll = require("./controllers/products/getAll");
const getById = require("./controllers/products/getById");
const save = require("./controllers/products/saveProduct");
const update = require("./controllers/products/updateProduct");
const deleteById = require("./controllers/products/deleteById");

// create application/json parser
const jsonParser = bodyParser.json();

const router = new Router();

// Products Routes
router.get("/products", getAll);
router.get("/products/:id", getById);
router.post("/products", jsonParser, save);
router.put("/products/:id", jsonParser, update);
router.delete("/products/:id", jsonParser, deleteById);

module.exports = router;
