import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyAtTNvve2hi1u-tUkiuQPXSakqN2fD1qPM",
    authDomain: "share-final.firebaseapp.com",
    projectId: "share-final",
    storageBucket: "share-final.appspot.com",
    messagingSenderId: "1020188920715",
    appId: "1:1020188920715:web:3677797637aef9a912bd8e"
  });
 
// Firebase storage reference
export const storage = getStorage(app);
