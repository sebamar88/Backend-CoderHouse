"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productsModel = require("../../../models/products");
let title, price, thumbnail;
const saveProduct = (req, res) => {
    const product = ({ title, price, thumbnail } = req.body);
    return productsModel
        .createProduct(product)
        .then((product) => res.status(200).json(product))
        .catch((err) => res.status(500).json(err));
};
module.exports = saveProduct;
