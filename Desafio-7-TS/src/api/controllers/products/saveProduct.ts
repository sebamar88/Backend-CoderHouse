var productsModel = require("../../../models/products");
import { Request, Response } from "express";

let title: string, price: number, thumbnail: string;

const saveProduct = (req: Request, res: Response) => {
  const product = ({ title, price, thumbnail } = req.body);
  return productsModel
    .createProduct(product)
    .then((product: Object) => res.status(200).json(product))
    .catch((err: string) => res.status(500).json(err));
};

module.exports = saveProduct;
