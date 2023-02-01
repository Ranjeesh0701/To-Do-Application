import firebase from "@firebase/app-compat";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmJ7JzgB711BlKEVZdIiIdnmXJove9t5s",
  authDomain: "to-do-app-9aeb3.firebaseapp.com",
  projectId: "to-do-app-9aeb3",
  storageBucket: "to-do-app-9aeb3.appspot.com",
  messagingSenderId: "542693972261",
  appId: "1:542693972261:web:fc2836d11f7049a6c962cc",
  measurementId: "G-HV5HC5T460"
};

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();

const FieldValue = firebase.firestore.FieldValue;

export {db, auth, FieldValue};