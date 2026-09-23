import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_bKQWJQUKsvDpUkA_CmTDke1T9Fd5m7g",
  authDomain: "darazclone-4c1a8.firebaseapp.com",
  projectId: "darazclone-4c1a8",
};

const app = initializeApp(firebaseConfig);
export const socialAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
