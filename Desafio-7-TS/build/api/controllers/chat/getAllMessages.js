"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chatModel = require("../../../models/chat");
module.exports = (req, res) => chatModel
    .list()
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(404).json(err));
