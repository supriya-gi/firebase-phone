// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJaanp8Nxh685KxaEmMOnlQnWC7aI3arw",
  authDomain: "optregistraion.firebaseapp.com",
  projectId: "optregistraion",
  storageBucket: "optregistraion.appspot.com",
  messagingSenderId: "915046674413",
  appId: "1:915046674413:web:4e77439e0765de7ef001e4",
  measurementId: "G-D51ET85QHJ",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
