const fs = require("fs");

interface Container {
  path: string;
}

/* It's a class that has a constructor that takes a path to a JSON file, and two methods that either
get all the items in the JSON file or delete all the items in the JSON file. */
class Container {
  constructor(path: string) {
    this.path = path;
  }
  async getAllItems() {
    const data = await fs.promises.readFile(
      this.path,
      "utf8",
      function (err: string, data: string) {
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
    fs.writeFileSync(this.path, JSON.stringify(json), function (err: string) {
      if (err) throw err;
      console.log("File is saved.");
    });
  }
}

module.exports = Container;
