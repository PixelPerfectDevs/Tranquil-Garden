// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyf-U_-OCMiLWegAdexkZ3LCSG5dGDOhY",
  authDomain: "tranquil-garden-09.firebaseapp.com",
  projectId: "tranquil-garden-09",
  storageBucket: "tranquil-garden-09.appspot.com",
  messagingSenderId: "478891741080",
  appId: "1:478891741080:web:d5247ca212308f721525ed",
  measurementId: "G-ZFLLSKNPHE"
};

let app
// Initialize Firebase
app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app