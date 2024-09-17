// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
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

const firestore = getFirestore(app);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { firestore, auth, analytics };
