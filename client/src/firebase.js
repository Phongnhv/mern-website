// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbVwUjY40Zpov46aT1_RxiwIi6X2v-kTw",
  authDomain: "projectii-4f4f0.firebaseapp.com",
  projectId: "projectii-4f4f0",
  storageBucket: "projectii-4f4f0.appspot.com",
  messagingSenderId: "819125072776",
  appId: "1:819125072776:web:890aa66d0db76448ec003d",
  measurementId: "G-J49XGJJP2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
