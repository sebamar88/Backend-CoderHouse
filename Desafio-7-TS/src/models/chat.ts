const db = require("../config/sqlite");

const list = () => db("chat").select("email", "message", "time");

export interface IMessage {
  email: string;
  message: string;
  time: string;
}

const create = (obj: IMessage) => db("chat").insert(obj);

module.exports = {
  list,
  create,
};
