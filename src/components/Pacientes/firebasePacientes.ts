import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

import { app } from '../../firebaseApp'

const db = getFirestore(app);
const pacientesColRef = collection(db, 'pacientes');

export default pacientesColRef;