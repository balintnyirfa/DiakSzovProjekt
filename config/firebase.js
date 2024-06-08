// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebase } from '@react-native-firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw_ENbF5DP8rQMb7WTT7chZrZ7IVvFWts",
  authDomain: "diakmester.firebaseapp.com",
  projectId: "diakmester",
  storageBucket: "diakmester.appspot.com",
  messagingSenderId: "248229998680",
  appId: "1:248229998680:web:74a0926770ada85b24da2d",
  measurementId: "G-552JYFPX9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;