// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nub-webcarselling.firebaseapp.com",
  projectId: "nub-webcarselling",
  storageBucket: "nub-webcarselling.firebasestorage.app",
  messagingSenderId: "800016358381",
  appId: "1:800016358381:web:be5b1ef3fc39fad56e25e4",
  measurementId: "G-S7CTYNWERF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage=getStorage(app);