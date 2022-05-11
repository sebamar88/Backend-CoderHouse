const fs = require("fs");

class Container {
  constructor(path) {
    this.path = path;
  }
  async getAllItems() {
    const data = await fs.promises.readFile(
      this.path,
      "utf8",
      function (err, data) {
        if (err) throw err;
        return JSON.parse(data);
      }
    );
    return JSON.parse(data);
  }

  async deleteAllItems() {
    const json = await this.getAllItems();
    for (let i = json.length; i > 0; i--) {
      json.pop();
    }
    fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
      if (err) throw err;
      console.log("File is saved.");
    });
  }
  async createNewUser(obj) {
    const json = await this.getAllItems();
    const id = json.length + 1;
    obj.id = id;
    obj.isAdmin = false;
    const registeredUser = json.some((item) => item.user === obj.user);
    if (registeredUser) {
      return "User already exists";
    } else {
      json.push(obj);
    }
    fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
      if (err) throw err;
    });
    return "User created!";
  }
}

module.exports = Container;
