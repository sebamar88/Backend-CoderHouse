const productsDb = require("../config/mariabd");

export interface IProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const listProducts = (params = {}) =>
  productsDb("products")
    .where(params)
    .select("id", "title", "price", "thumbnail");

const createProduct = (obj: {}) => productsDb("products").insert(obj);

const updateItem = (id: number, obj: {}) =>
  productsDb("products").where({ id }).update(obj);

const remove = (id: number) => productsDb("products").where({ id }).del();

module.exports = {
  listProducts,
  createProduct,
  updateItem,
  remove,
};
