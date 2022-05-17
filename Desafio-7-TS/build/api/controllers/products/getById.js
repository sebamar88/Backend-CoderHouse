"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productsModel = require("../../../models/products");
const getById = (req, res) => productsModel
    .list({ id: req.params.id })
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json(err));
module.exports = getById;
