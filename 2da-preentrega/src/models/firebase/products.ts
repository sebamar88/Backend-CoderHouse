import { db } from "../../config/firebase";
import { IProduct } from "../../utils/types/products";
import { v4 as uuidv4 } from "uuid";

const prodCollection = db.collection("products");

/**
 * It returns a promise that resolves to an array of products
 * @returns An array of objects.
 */
async function findAll() {
  const products = await prodCollection.get();
  return products.docs.map((doc: any) => doc.data());
}

/**
 * Find a product by its id and return the product's data.
 * @param {string} id - string - the id of the product you want to find
 * @returns The data() method returns a DocumentData object, which contains all the fields in the
 * document.
 */
async function findById(id: string) {
  const product = await prodCollection.doc(id).get();
  return product.data();
}

/**
 * It takes a product object, adds a unique sku to it, and then adds it to the database.
 * @param {IProduct} product - IProduct
 * @returns The newProduct object is being returned.
 */
async function createProduct(product: IProduct) {
  const newProduct = {
    ...product,
    sku: uuidv4(),
  };
  await prodCollection
    .add(newProduct)
    .then((docRef: any) => {
      newProduct.id = docRef.id;
    })
    .catch((error: any) => {
      console.error("Error adding document: ", error);
    });
  return newProduct;
}

/**
 * This function takes an id and a product, and updates the product with the given id.
 * @param {string} id - string - the id of the product to update
 * @param {IProduct} product - IProduct = {
 * @returns The product object.
 */
async function updateProduct(id: string, product: IProduct) {
  await prodCollection
    .doc(id)
    .update(product)
    .catch((error: any) => {
      console.error("Error updating document: ", error);
    });
  return product;
}

/**
 * Delete a product from the database by its id.
 * @param {string} id - string - The id of the product to delete
 */
async function deleteProduct(id: string) {
  await prodCollection
    .doc(id)
    .delete()
    .catch((error: any) => {
      console.error("Error deleting document: ", error);
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
