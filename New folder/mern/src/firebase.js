// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWhZIXoS4AMtStwTheXkuAryCnPDrSLzA",
  authDomain: "mern-mano.firebaseapp.com",
  projectId: "mern-mano",
  storageBucket: "mern-mano.appspot.com",
  messagingSenderId: "837743577429",
  appId: "1:837743577429:web:edae106315de8d41cc47dc",
  measurementId: "G-FMFG1QBYXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
export default app;