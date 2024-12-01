const multer = require('multer');

const fireBaseStorage = require('multer-firebase-storage');
const Firebase = require('./firebase.config');
const serviceAccount = require('../firebase_dummy.json');

const storage = fireBaseStorage({
    credentials: Firebase.credential.cert(serviceAccount),
    storageBucket: "fir-5a5b1.appspot.com"
})


const upload = multer({
    storage: storage,
})



module.exports = upload;