// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXm94BhjzBp-_5oYyIdKVeJnmwsb0K9E8",
  authDomain: "react-ex-cde1a.firebaseapp.com",
  projectId: "react-ex-cde1a",
  storageBucket: "react-ex-cde1a.appspot.com",
  messagingSenderId: "1029423812785",
  appId: "1:1029423812785:web:347d4158b44396b548d290",
  measurementId: "G-CX58L63QG9",
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();
