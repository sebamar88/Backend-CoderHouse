/**
 * IProduct is an object with a title, price, thumbnail, description, stock, created_at, and updated_at
 * properties, where title, price, thumbnail, description, and stock are required, and the rest are
 * optional.
 * @property {string} id - The product's unique identifier.
 * @property {string} title - The title of the product.
 * @property {number} price - number;
 * @property {string} thumbnail - string;
 * @property {string} description - string;
 * @property {string} sku - The product's SKU (Stock Keeping Unit)
 * @property {number} stock - number;
 * @property {Date} created_at - The date the product was created
 * @property {Date} updated_at - Date
 */
export type IProduct = {
  id?: string;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  sku?: string;
  stock: number;
  created_at?: Date;
  updated_at?: Date;
};
