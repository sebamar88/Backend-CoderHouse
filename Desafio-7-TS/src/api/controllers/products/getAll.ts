var productsModel = require("../../../models/products");
import { Request, Response } from "express";

module.exports = (req: Request, res: Response) =>
  productsModel
    .listProducts()
    .then((products: Object) => res.status(200).json(products))
    .catch((err: string) => res.status(500).json(err));
