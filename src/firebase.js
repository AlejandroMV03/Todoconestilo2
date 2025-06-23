import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3TzMNNlwGi4lgQ6rXA1aWt9c0l-TNgZg",
  authDomain: "todoconestilo.firebaseapp.com",
  projectId: "todoconestilo",
  storageBucket: "todoconestilo.firebasestorage.app",
  messagingSenderId: "336328542398",
  appId: "1:336328542398:web:b36a14e1540701e5f0f6ef"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error al configurar persistencia:", error);
});

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export { auth, provider, db };
