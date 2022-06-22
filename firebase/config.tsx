// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, collection, CollectionReference, getFirestore } from "firebase/firestore";
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

export function getCollection(collectionName: string) {
    //console.log(db);
    //console.log(collection(db, collectionName));
    return collection(db, collectionName);
}

/*
From the docs: https://firebase.google.com/docs/firestore/query-data/get-data
Note: If there is no document at the location referenced by docRef, the resulting document will be empty and calling exists on it will return false.
 */
export function getDocument(documentId: string) {
    return doc(db, 'Submissions', documentId);
}

