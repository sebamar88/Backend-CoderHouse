"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chatModel = require("../../../models/chat");
let email, message, time;
const saveMessage = (req, res) => {
    const msg = ({ email, message, time } = req.body);
    return chatModel
        .create(msg)
        .then((messageRes) => res.status(200).json(messageRes))
        .catch((err) => res.status(404).json(err));
};
module.exports = saveMessage;
