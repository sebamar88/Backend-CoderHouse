var chatModel = require("../../../models/chat");
import { Request, Response } from "express";

let email: string, message: string, time: string;

const saveMessage = (req: Request, res: Response) => {
  const msg = ({ email, message, time } = req.body);
  return chatModel
    .create(msg)
    .then((messageRes: Object) => res.status(200).json(messageRes))
    .catch((err: String) => res.status(404).json(err));
};

module.exports = saveMessage;
