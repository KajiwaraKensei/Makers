import firebase from "firebase";
import "firebase/auth";
const config = {
  apiKey: process.env.FIREBASE_CONFIG_API_KEY,
  authDomain: "template-2013.firebaseapp.com",
  databaseURL: "https://template-2013.firebaseio.com",
  projectId: "template-2013",
  storageBucket: "template-2013.appspot.com",
  messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export default firebase;
