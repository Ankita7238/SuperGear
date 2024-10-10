import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Correct import

const firebaseConfig = {
  apiKey: "AIzaSyA0OcEl8g3K3xfF1RglI3_y_wDvY8keunY",
  authDomain: "supergear-e595a.firebaseapp.com",
  projectId: "supergear-e595a",
  storageBucket: "supergear-e595a.appspot.com",
  messagingSenderId: "503586895475",
  appId: "1:503586895475:web:3c7daa0224c7fe66ac1c06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(); // Correct usage of getAuth
export const db = getFirestore();
export const storage = getStorage();
