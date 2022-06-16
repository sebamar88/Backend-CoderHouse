const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../../FirebaseKey.json");

/* Initializing the app with the service account. */
initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();
