"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../FirebaseKey.json");
initializeApp({
    credential: cert(serviceAccount),
});
exports.db = getFirestore();
