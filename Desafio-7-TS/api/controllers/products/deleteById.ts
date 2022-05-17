var productsModel = require("../../../models/products");
import { Request, Response } from "express";

module.exports = (req: Request, res: Response) => {
  return productsModel
    .remove(req.params.id)
    .then((product: object) => res.status(200).json(product))
    .catch((err: string) => res.status(500).json(err));
};
