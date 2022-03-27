const fs = require("fs");
const path = "./text.json";
const Container = require("./Container");

try {
  if (!fs.existsSync(path)) {
    fs.open(path, "w", function (err, file) {
      if (err) throw err;
      console.log("File is opened in write mode.");
    });
  }
} catch (error) {
  console.log(error);
}

let obj = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
];

// En caso de borrar todos los items comentar el motodo de borrado,
// descomentar la siguiente funcion y correr Node index.js

/* fs.writeFile(path, JSON.stringify(obj), function (err) {
  if (err) throw err;
  console.log("File is saved.");
}); */


const container = new Container(path);

/* container.getAllItems().then((data) => {
  console.log(data);
}
); */

/* container.saveItem({
  title: "Nike Shoes",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
}) */

/* container.getItemById(2); */

/* container.deleteItemById(2).then(() => {
  container.getAllItems().then((data) => {
    console.log(data);
  });
}); */

/* container.deleteAllItems().then(() => {
  container.getAllItems().then((data) => {
    console.log(data);
  });
}); */