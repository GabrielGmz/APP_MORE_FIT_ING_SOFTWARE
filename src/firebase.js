import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getFunctions } from "firebase/functions";


const firebaseConfig = {
  apiKey: "AIzaSyDIOWWsUJDzifon_fysx0Zcv-TJgoCyXxU",
  authDomain: "more-fit01.firebaseapp.com",
  projectId: "more-fit01",
  storageBucket: "more-fit01.firebasestorage.app",
  messagingSenderId: "519284430657",
  appId: "1:519284430657:web:2678c080056cbcdccbb3c0",
  measurementId: "G-BY8Q72QYMF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const functions = getFunctions(app)


const googleProvider = new GoogleAuthProvider();


const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export { auth, db, functions, analytics, googleProvider, signInWithGoogle };
export default app;