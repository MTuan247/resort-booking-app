const admin = require('firebase-admin');

module.exports = {
  apiKey: "AIzaSyC4wJ9zkqvbL7XfsK8bkAx6npVxA_rvb1I",
  authDomain: "travel-web-app-6fd3b.firebaseapp.com",
  projectId: "travel-web-app-6fd3b",
  storageBucket: "travel-web-app-6fd3b.appspot.com",
  messagingSenderId: "278171779911",
  appId: "1:278171779911:web:957cab9419fd440bb48262",
  measurementId: "G-2ZSXV1F7JL",
  credential: admin.credential.cert(require('../../env/firebase_credential.json'))
}