// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDguamG38t-nBGTgxfaIPFgNwRxqug7Sjs",
  authDomain: "fir-react-crud-df55f.firebaseapp.com",
  projectId: "fir-react-crud-df55f",
  storageBucket: "fir-react-crud-df55f.appspot.com",
  messagingSenderId: "341008988388",
  appId: "1:341008988388:web:0015d3331213dc839e14f1",
  measurementId: "G-5XC9MHNXNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const fireDb = getFirestore(app) 