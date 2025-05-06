// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQiJ6kjyel13qQAYI6gEN3xKf4Mp5fCFs",
  authDomain: "shoppp-aa428.firebaseapp.com",
  projectId: "shoppp-aa428",
  storageBucket: "shoppp-aa428.firebasestorage.app",
  messagingSenderId: "653757442020",
  appId: "1:653757442020:web:8d2aed1d31b463cdcf89f1",
  measurementId: "G-X54W09SBZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);