const productsDb = require("../config/mariabd");

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
