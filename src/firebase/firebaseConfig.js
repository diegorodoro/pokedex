// import { initializeApp } from "firebase/app";
// import {getFirestore} from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export default db;

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8hVTUNBWbyyHP2LKW1KU_Mx4MsBvW2Ck",
  authDomain: "pkdx2-fc343.firebaseapp.com",
  projectId: "pkdx2-fc343",
  storageBucket: "pkdx2-fc343.appspot.com",
  messagingSenderId: "602980844753",
  appId: "1:602980844753:web:beff31e4cc840ca5c8b1f0",
  measurementId: "G-PKXB6DN893"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)