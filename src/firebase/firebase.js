import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "necessi-7f51b.firebaseapp.com",
  projectId: "necessi-7f51b",
  storageBucket: import.meta.env.VITE_APP_BUCKET_NAME,
  messagingSenderId: "653422975335",
  appId: "1:653422975335:web:fd414e24986b82822bf7c2",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, storage };
