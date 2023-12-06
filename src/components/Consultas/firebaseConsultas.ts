import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

import { app } from '../../firebaseApp'

const db = getFirestore(app);
const consultasColRef = collection(db, 'consultas');

export default consultasColRef;