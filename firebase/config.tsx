// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, CollectionReference, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD15zKufarEoNFYYw9_mhwUVWKwchXyK4w",
    authDomain: "programmatic-chess.firebaseapp.com",
    projectId: "programmatic-chess",
    storageBucket: "programmatic-chess.appspot.com",
    messagingSenderId: "763450155379",
    appId: "1:763450155379:web:097a8f0e09e930b4c52506",
    measurementId: "G-CS711QZNKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export function getFirestoreCollection(collectionName: string) {
    //console.log(db);
    //console.log(collection(db, collectionName));
    return collection(db, collectionName)
}

