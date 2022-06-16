import { db } from "../../config/firebase";
import { IProduct } from "../../utils/types/products";
import { ICart } from "../../utils/types/cart";

const cartsCollection = db.collection("carts");

/**
 * This function takes a string as an argument and returns a promise that resolves to an array of
 * products.
 * @param {string} id - string - the id of the cart
 * @returns An array of products.
 */
async function getProductsFromCart(id: string) {
  const product = await cartsCollection.doc(id).get();
  return product.data().products;
}

/**
 * It creates a new cart, adds it to the database, and returns the new cart.
 * @param {IProduct[]} products - IProduct[]
 * @returns A Promise&lt;ICart&gt;
 */
async function createNewCart(products: IProduct[]) {
  const newCart: ICart = {
    products,
  };
  await cartsCollection
    .add(newCart)
    .then((docRef: any) => {
      newCart.id = docRef.id;
    })
    .catch((error: any) => {
      console.error("Error adding document: ", error);
    });
  return newCart;
}

/**
 * It takes a cart id and an array of products, gets the cart from the database, concatenates the new
 * products to the existing products, removes duplicates, and updates the cart in the database.
 * @param {string} id - string - the id of the cart
 * @param {IProduct[]} product - IProduct[]
 * @returns An array of objects.
 */
async function addProductsToCart(id: string, product: IProduct[]) {
  const cart = await cartsCollection.doc(id).get();
  const cartProducts = cart.data().products;
  if (!cartProducts) throw new Error("Cart not found");
  const newProducts = cartProducts.concat(product);
  const key = "id";

  const arrayUniqueByKey = [
    ...new Map(newProducts.map((item: IProduct) => [item[key], item])).values(),
  ];
  await cartsCollection
    .doc(id)
    .update({ products: arrayUniqueByKey })
    .catch((error: any) => {
      console.error("Error updating document: ", error);
    });
  return arrayUniqueByKey;
}

/**
 * It deletes a document from the carts collection in Firestore.
 * @param {string} id - string - the id of the cart to delete
 */
async function deleteCart(id: string) {
  await cartsCollection
    .doc(id)
    .delete()
    .catch((error: any) => {
      console.error("Error deleting document: ", error);
    });
}

/**
 * It takes a cart id and an array of products, then it deletes the products from the cart
 * @param {string} id - string - the id of the cart
 * @param {IProduct[]} products - IProduct[]
 * @returns The newProducts array.
 */
async function deteleProductsFromCart(id: string, products: IProduct[]) {
  const cart = await cartsCollection.doc(id).get();
  const cartProducts = cart.data().products;

  if (!cartProducts) throw new Error("Cart not found");

  const newProducts = cartProducts.filter((product: IProduct) => {
    return !products.some((p: IProduct) => p.id === product.id);
  });

  await cartsCollection
    .doc(id)
    .update({ products: newProducts })
    .catch((error: any) => {
      console.error("Error updating document: ", error);
    });
  return newProducts;
}

const Cart = {
  getProductsFromCart,
  createNewCart,
  addProductsToCart,
  deleteCart,
  deteleProductsFromCart,
};

module.exports = Cart;
