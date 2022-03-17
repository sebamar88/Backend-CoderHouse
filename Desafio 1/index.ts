class UserTS {
  name: String;
  lastname: String;
  books: { book: String; author: String }[];
  pets: String[];
  constructor(
    name: String,
    lastname: String,
    books: { book: String; author: String }[],
    pets: String[]
  ) {
    this.name = name;
    this.lastname = lastname;
    this.books = books;
    this.pets = pets;
  }
  getFullName() {
    return `${this.name} ${this.lastname}`;
  }
  addPet(pet: String) {
    this.pets.push(pet);
  }
  countPets() {
    return this.pets.length;
  }
  addBook(book: String, author: String) {
    this.books.push({ book: book, author: author });
  }
  getBookNames() {
    return this.books.map((bk) => bk.book);
  }
}

const user = new UserTS(
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
