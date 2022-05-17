"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productsModel = require("../../../models/products");
module.exports = (req, res) => productsModel
    .listProducts()
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500).json(err));
