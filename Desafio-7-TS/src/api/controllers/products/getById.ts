var productsModel = require("../../../models/products");
import { IProduct } from "../../../models/products";
import { Request, Response } from "express";

const getById = (req: Request, res: Response) =>
  productsModel
    .list({ id: req.params.id })
    .then((product: IProduct) => res.status(200).json(product))
    .catch((err: string) => res.status(500).json(err));

module.exports = getById;
