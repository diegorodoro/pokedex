import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8hVTUNBWbyyHP2LKW1KU_Mx4MsBvW2Ck",
    authDomain: "pkdx2-fc343.firebaseapp.com",
    projectId: "pkdx2-fc343",
    storageBucket: "pkdx2-fc343.appspot.com",
    messagingSenderId: "602980844753",
    appId: "1:602980844753:web:beff31e4cc840ca5c8b1f0",
    measurementId: "G-PKXB6DN893"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export {db,auth}