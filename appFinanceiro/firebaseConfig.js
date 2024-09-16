// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkwmGu9yrBbRqAg8brolRJxVJr-XG14W4",
  authDomain: "projetofinanceiro-476a5.firebaseapp.com",
  projectId: "projetofinanceiro-476a5",
  storageBucket: "projetofinanceiro-476a5.appspot.com",
  messagingSenderId: "103838415951",
  appId: "1:103838415951:web:b77b28789c70739bebfe3a",
  measurementId: "G-ERMJWQ0CS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };
export const auth = getAuth(app);