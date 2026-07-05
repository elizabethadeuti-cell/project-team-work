// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFAya8sn60IyLbdVU0rnuaW-7bBEsjs0M",
  authDomain: "react-authentication-84207.firebaseapp.com",
  projectId: "react-authentication-84207",
  storageBucket: "react-authentication-84207.firebasestorage.app",
  messagingSenderId: "149205279035",
  appId: "1:149205279035:web:0633e42194288e889d971e",
  measurementId: "G-4SPWH9CNZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();



