import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { IProduct } from "../../utils/types/products";
import { ICart } from "../../utils/types/cart";

/* Creating a new schema for the product model. */
const prodSchema = new Schema(
  {
    title: String,
    price: Number,
    thumbnail: String,
    description: String,
    sku: String,
    stock: Number,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

/* Creating a new schema for the cart model. */
const schema = new Schema(
  {
    products: {
      type: [prodSchema],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

/* A static method that deletes a cart. */
schema.statics.removeCart = async function (id: string): Promise<ICart> {
  try {
    const cart = await this.findOne({ _id: id });
    if (!cart) throw new Error("Cart not found");
    const deletedCart = await this.deleteOne({ _id: id });
    if (deletedCart.deletedCount === 0) throw new Error("Cart not found");
    return cart;
  } catch (error: any) {
    throw new Error(error);
  }
};

/* Adding products to the cart. */
schema.statics.addProductsToCart = async function (
  cartId: string,
  products: IProduct[]
): Promise<ICart> {
  try {
    const cart = await this.findOne({ _id: cartId });
    if (!cart) throw new Error("Cart not found");
    const newProducts = cart.products.concat(products);
    return await this.findOneAndUpdate(
      { _id: cartId },
      { products: newProducts },
      { new: true }
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

/* Creating a new cart with the products passed in. */
schema.statics.createNewCart = async function (
  products: IProduct[]
): Promise<ICart> {
  try {
    const newCart = new this({ products });
    return await newCart.save();
  } catch (error: any) {
    throw new Error(error);
  }
};

/* A static method that deletes products from a cart. */
schema.statics.deleteProductsFromCart = async function (
  cartId: string,
  products: IProduct[]
): Promise<ICart> {
  try {
    const cart = await this.findOne({ _id: cartId });
    if (!cart) throw new Error("Cart not found");
    const newProducts = cart.products.filter(
      (product: IProduct) => !products.includes(product)
    );
    return await this.findOneAndUpdate(
      { _id: cartId },
      { products: newProducts },
      { new: true }
    );
  } catch (error: any) {
    throw new Error(error);
  }
};

/* A static method that returns the products from a cart. */
schema.statics.getProductsFromCart = async function (
  cartId: string
): Promise<ICart> {
  try {
    const cart = await this.findOne({ _id: cartId });
    if (!cart) throw new Error("Cart not found");
    return cart.products;
  } catch (error: any) {
    throw new Error(error);
  }
};

const Cart = mongoose.model("Carts", schema);

module.exports = Cart;
