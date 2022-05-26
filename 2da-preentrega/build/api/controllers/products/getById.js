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
Object.defineProperty(exports, "__esModule", { value: true });
const { NODE_ENV } = require("../../../../config");
const Product = NODE_ENV.trim() === "mongo"
    ? require("../../../models/mongo/products")
    : require("../../../models/firebase/products");
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield Product.findById(id);
        if (!product)
            throw new Error("Product not found");
        if (NODE_ENV.trim() === "mongo") {
            res.status(200).json(product._doc);
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json(error);
    }
});