// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth" // <-- ✅ ESTE FALTABA
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIOWWsUJDzifon_fysx0Zcv-TJgoCyXxU",
  authDomain: "more-fit01.firebaseapp.com",
  projectId: "more-fit01",
  storageBucket: "more-fit01.firebasestorage.app",
  messagingSenderId: "519284430657",
  appId: "1:519284430657:web:2678c080056cbcdccbb3c0",
  measurementId: "G-BY8Q72QYMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }