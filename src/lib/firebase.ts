import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsGDjn1xW3eLv9A0aCh4SU38TSWs_AQJ8",
  authDomain: "studio-flora-order-form.firebaseapp.com",
  projectId: "studio-flora-order-form",
  storageBucket: "studio-flora-order-form.firebasestorage.app",
  messagingSenderId: "854842806611",
  appId: "1:854842806611:web:30a6aa7bb90276d18451a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;