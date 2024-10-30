// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mernwebproject.firebaseapp.com",
  projectId: "mernwebproject",
  storageBucket: "mernwebproject.appspot.com",
  messagingSenderId: "466927721838",
  appId: "1:466927721838:web:926d6d689bb6475a83b57f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);