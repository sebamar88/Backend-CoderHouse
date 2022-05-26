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
const schema = new Schema({
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
schema.statics.removeById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchAndDelete = yield this.deleteOne({ _id: id });
            if (searchAndDelete.deletedCount === 0)
                throw new Error("Product not found");
            return `Product with id: ${id} deleted!`;
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
schema.statics.findById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield this.findOne({ _id: id });
            if (!product)
                throw new Error("Product not found");
            return product;
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
schema.statics.findAll = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield this.find();
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
schema.statics.createProduct = function (product) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = uuidv4();
            product.sku = id;
            const newProduct = new this(product);
            return yield newProduct.save();
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
schema.statics.updateProduct = function (id, product) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield this.findByIdAndUpdate(id, {
                $set: product,
            }, { new: true });
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
const Product = mongoose_1.default.model("Products", schema);
module.exports = Product;
