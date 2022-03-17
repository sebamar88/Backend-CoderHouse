var UserTS = /** @class */ (function () {
    function UserTS(name, lastname, books, pets) {
        this.name = name;
        this.lastname = lastname;
        this.books = books;
        this.pets = pets;
    }
    UserTS.prototype.getFullName = function () {
        return "".concat(this.name, " ").concat(this.lastname);
    };
    UserTS.prototype.addPet = function (pet) {
        this.pets.push(pet);
    };
    UserTS.prototype.countPets = function () {
        return this.pets.length;
    };
    UserTS.prototype.addBook = function (book, author) {
        this.books.push({ book: book, author: author });
    };
    UserTS.prototype.getBookNames = function () {
        return this.books.map(function (bk) { return bk.book; });
    };
    return UserTS;
}());
var user = new UserTS("John", "Doe", [
    { book: "El Hobbit", author: "Tolkien" },
    { book: "Harry Potter", author: "Roling" },
], ["cat", "dog"]);
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
