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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const { v4: uuidv4 } = require("uuid");
const prodSchema = new Schema({
    title: String,
    price: Number,
    thumbnail: String,
    description: String,
    sku: String,
    stock: Number,
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
const schema = new Schema({
    products: {
        type: [prodSchema],
        default: [],
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
schema.statics.removeCart = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart = yield this.findOne({ _id: id });
            if (!cart)
                throw new Error("Cart not found");
            const deletedCart = yield this.deleteOne({ _id: id });
            if (deletedCart.deletedCount === 0)
                throw new Error("Cart not found");
            return cart;
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
schema.statics.addProductsToCart = function (cartId, products) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart = yield this.findOne({ _id: cartId });
            if (!cart)
                throw new Error("Cart not found");
            const newProducts = cart.products.concat(products);
            return yield this.findOneAndUpdate({ _id: cartId }, { products: newProducts }, { new: true });
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
schema.statics.createNewCart = function (products) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newCart = new this({ products });
            return yield newCart.save();
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
schema.statics.deleteProductsFromCart = function (cartId, products) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart = yield this.findOne({ _id: cartId });
            if (!cart)
                throw new Error("Cart not found");
            const newProducts = cart.products.filter((product) => !products.includes(product));
            return yield this.findOneAndUpdate({ _id: cartId }, { products: newProducts }, { new: true });
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
schema.statics.getProductsFromCart = function (cartId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart = yield this.findOne({ _id: cartId });
            if (!cart)
                throw new Error("Cart not found");
            return cart.products;
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
const Cart = mongoose_1.default.model("Carts", schema);
module.exports = Cart;
