const firebaseConfig = require('../config/firebase.config');

const admin = require('firebase-admin');

// Initialize firebase admin SDK
admin.initializeApp(firebaseConfig);
// Cloud storage
const storage = admin.storage();
const bucket = storage.bucket();

bucket.makePublic();

module.exports = {
  bucket
}