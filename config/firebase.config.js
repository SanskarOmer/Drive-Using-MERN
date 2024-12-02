const Firebase = require('firebase');
const serviceAccount = require('../firebase_dummy.json');
const { storage } = require('firebase-admin');

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: "fir-5a5b1.appspot.com"


});

module.exports = Firebase;