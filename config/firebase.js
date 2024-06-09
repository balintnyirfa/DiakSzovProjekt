import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCw_ENbF5DP8rQMb7WTT7chZrZ7IVvFWts",
  authDomain: "diakmester.firebaseapp.com",
  projectId: "diakmester",
  storageBucket: "diakmester.appspot.com",
  messagingSenderId: "248229998680",
  appId: "1:248229998680:web:74a0926770ada85b24da2d",
  measurementId: "G-552JYFPX9G"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});