"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require("fs");
class Container {
    constructor(path) {
        this.path = path;
    }
    getAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fs.promises.readFile(this.path, "utf8", function (err, data) {
                if (err)
                    throw err;
                return JSON.parse(data);
            });
            return JSON.parse(data);
        });
    }
    deleteAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const json = yield this.getAllItems();
            for (let i = json.length; i > 0; i--) {
                json.pop();
            }
            fs.writeFileSync(this.path, JSON.stringify(json), function (err) {
                if (err)
                    throw err;
                console.log("File is saved.");
            });
        });
    }
}
module.exports = Container;
