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
const firebase_1 = require("../../config/firebase");
const uuid_1 = require("uuid");
const prodCollection = firebase_1.db.collection("products");
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield prodCollection.get();
        return products.docs.map((doc) => doc.data());
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield prodCollection.doc(id).get();
        return product.data();
    });
}
function createProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const newProduct = Object.assign(Object.assign({}, product), { sku: (0, uuid_1.v4)() });
        yield prodCollection
            .add(newProduct)
            .then((docRef) => {
            newProduct.id = docRef.id;
        })
            .catch((error) => {
            console.error("Error adding document: ", error);
        });
        return newProduct;
    });
}
function updateProduct(id, product) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prodCollection
            .doc(id)
            .update(product)
            .catch((error) => {
            console.error("Error updating document: ", error);
        });
        return product;
    });
}
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prodCollection
            .doc(id)
            .delete()
            .catch((error) => {
            console.error("Error deleting document: ", error);
        });
    });
}
const Products = {
    findAll,
    findById,
    createProduct,
    updateProduct,
    deleteProduct,
};
module.exports = Products;
