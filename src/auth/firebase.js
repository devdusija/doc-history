// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyZHTSGBG9tK7db_OPvajanV_C9ihfifI",
  authDomain: "doc-histor-dev.firebaseapp.com",
  projectId: "doc-histor-dev",
  storageBucket: "doc-histor-dev.appspot.com",
  messagingSenderId: "149260638352",
  appId: "1:149260638352:web:d212eec421831545596015",
  measurementId: "G-BHEFWZQKTB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
const analytics = getAnalytics(app);
export const storage = getStorage(app);
