var productsModel = require("../../../models/products");
import { Request, Response } from "express";

let title: string, price: number, thumbnail: string;

const updateProduct = (req: Request, res: Response) => {
  const product = ({ title, price, thumbnail } = req.body);
  return productsModel
    .updateItem(req.params.id, product)
    .then((product: Object) => res.status(200).json(product))
    .catch((err: string) => res.status(500).json(err));
};

module.exports = updateProduct;
