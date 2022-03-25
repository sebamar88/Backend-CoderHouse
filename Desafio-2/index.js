const fs = require("fs");
const path = "./text.json";

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

/* fs.writeFile(path, JSON.stringify(obj), function (err) {
  if (err) throw err;
  console.log("File is saved.");
}); */

const getAllItems = async () => {
  const data = await fs.promises.readFile(path, "utf8", function (err, data) {
    if (err) throw err;
    const json = JSON.parse(data);
    return json;
  });
  return JSON.parse(data);
};

const saveItem = async (obj) => {
  const json = await getAllItems();
  const id = json.length + 1;
  obj.id = id;
  json.push(obj);
  fs.writeFileSync(path, JSON.stringify(json), function (err) {
    if (err) throw err;
  });
  console.log("File is saved with id " + id);
};

const getItemById = (id) => {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) throw err;
    const json = JSON.parse(data);
    const item = json.find((item) => item.id === id);
    if (typeof item === "undefined") {
      console.log(null);
    } else {
      console.log(item);
    }
  });
};

const deleteItemById = async (id) => {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) throw err;
    const json = JSON.parse(data);
    const newArray = json.filter((item) => item.id !== id);

    fs.writeFileSync(path, JSON.stringify(newArray), function (err) {
      if (err) throw err;
      console.log("File is saved.");
    });
  });
};

const deleteAllItems = async () => {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) throw err;
    const json = JSON.parse(data);
    for (let i = json.length; i > 0; i--) {
      json.pop();
    }
    fs.writeFileSync(path, JSON.stringify(json), function (err) {
      if (err) throw err;
      console.log("File is saved.");
    });
  });
};

/* saveItem({
  title: "Nike Shoes",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
}).then(() => {
  getAllItems().then((data) => {
    console.log(data);
  });
}); */

getItemById(2);

/* deleteItemById(2);

deleteAllItems(); */
