"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../config/sqlite");
const list = () => db("chat").select("email", "message", "time");
const create = (obj) => db("chat").insert(obj);
module.exports = {
    list,
    create,
};
