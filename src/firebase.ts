// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "real-state-3c43e.firebaseapp.com",
  projectId: "real-state-3c43e",
  storageBucket: "real-state-3c43e.firebasestorage.app",
  messagingSenderId: "730708170651",
  appId: "1:730708170651:web:66403bedd315bc31b7333e"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);