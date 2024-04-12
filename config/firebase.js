import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0qACh6LN5bgGV2hVOufAE87q9n2Zum2Y",
  authDomain: "diakszov.firebaseapp.com",
  projectId: "diakszov",
  storageBucket: "diakszov.appspot.com",
  messagingSenderId: "781655515173",
  appId: "1:781655515173:web:19b2423d93a5e0717c5fcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);