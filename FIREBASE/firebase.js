import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRi68HNDsbPzHdmVcTxptCKNLmYBwg_hk",
  authDomain: "conexion-4bdde.firebaseapp.com",
  projectId: "conexion-4bdde",
  storageBucket: "conexion-4bdde.firebasestorage.app",
  messagingSenderId: "955927876774",
  appId: "1:955927876774:web:11884f21ef07b9d5891067",
  measurementId: "G-FF7BFVMWRY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)