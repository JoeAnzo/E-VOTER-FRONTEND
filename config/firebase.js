
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-e3d50.firebaseapp.com",
  projectId: "react-e3d50",
  storageBucket: "react-e3d50.firebasestorage.app",
  messagingSenderId: "320748860525",
  appId: "1:320748860525:web:1f0d0265e13b8b354cfb64",
  measurementId: "G-M65VYWY9CY"
};

// Initialize Firebasenp
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);