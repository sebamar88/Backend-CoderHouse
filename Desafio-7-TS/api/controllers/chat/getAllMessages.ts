var chatModel = require("../../../models/chat");
import { Request, Response } from "express";

module.exports = (req: Request, res: Response) =>
  chatModel
    .list()
    .then((messages: Object) => res.status(200).json(messages))
    .catch((err: String) => res.status(404).json(err));
