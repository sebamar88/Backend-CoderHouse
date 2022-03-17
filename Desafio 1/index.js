class User {
  constructor(name, lastname, books, pets) {
    return {
      name: name,
      lastname: lastname,
      books: [books],
      pets: [pets],
      getFullName: function () {
        return `${name} ${lastname}`;
      },
      addPet: function (pet) {
        pets.push(pet);
      },
      countPets: function () {
        return pets.length;
      },
      addBook: function (book, author) {
        books.push({ book: book, author: author });
      },
      getBookNames: function () {
        return books.map((book) => book.book);
      },
    };
  }
}

const user = new User(
  "John",
  "Doe",
  [
    { book: "El Hobbit", author: "Tolkien" },
    { book: "Harry Potter", author: "Roling" },
  ],
  ["cat", "dog"]
);

console.log(user.getFullName());
console.log(user.countPets());
console.log(user.getBookNames());

user.addBook("El señor de los anillos", "Tolkien");
user.addBook("El señor de los anillos 2", "Tolkien");
user.addBook("El señor de los anillos 3", "Tolkien");
user.addBook("El principito", "Saint-Exupéry");
user.addPet("bird");

console.log(user.countPets());
console.log(user.getBookNames());
