import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: " ", //removed for security issues
  authDomain: " ", //removed for security issues
  projectId: " ", //removed for security issues
  storageBucket: " ", //removed for security issues
  messagingSenderId: " ", //removed for security issues
  appId: " " //removed for security issues
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const registrosColRef = collection(db, 'registros');

export default registrosColRef;