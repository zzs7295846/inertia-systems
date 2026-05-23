import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-ccORTsx7cuqk234fxo1FKqwdXEvuegQ",
  authDomain: "inertis-systemsv2.firebaseapp.com",
  projectId: "inertis-systemsv2",
  storageBucket: "inertis-systemsv2.firebasestorage.app",
  messagingSenderId: "52504389884",
  appId: "1:52504389884:web:b954a1ee64df37eb273a5f",
  measurementId: "G-PHTJ4QF5F5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
