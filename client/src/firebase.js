import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDNm9_lbGsLIP3_fpUuElsF4FvuUAX1as",
  authDomain: "smmry-48961.firebaseapp.com",
  projectId: "smmry-48961",
  storageBucket: "smmry-48961.appspot.com",
  messagingSenderId: "34226164901",
  appId: "1:34226164901:web:b80f32d4ba8c181ab0694c",
  measurementId: "G-5R28VTFCW6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
