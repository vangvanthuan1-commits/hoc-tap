import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase client identifiers are public. Authentication and Firestore rules protect learning data.
export const firebaseConfig = {
  apiKey: "AIzaSyDmR8hI0aWZeqFPyPLqszL3QwkeFCvg41U",
  authDomain: "hoc-tap-8c6f7.firebaseapp.com",
  projectId: "hoc-tap-8c6f7",
  storageBucket: "hoc-tap-8c6f7.firebasestorage.app",
  messagingSenderId: "735553994487",
  appId: "1:735553994487:web:511a02fea5e0aca2361df2",
  measurementId: "G-5FSQF58RME",
};
export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
// Analytics is deliberately not initialized: it is not needed for personal progress sync.
