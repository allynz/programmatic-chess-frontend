// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore";
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

export function getProblemDocument(documentId: string) {
    //console.log("docId Problem", documentId);
    return doc(db, 'Problems', documentId);
}

export function getSolvedProblemsDocument(documentId: string) {
    return doc(db, 'SolvedProblems', documentId);
}

const provider = new GoogleAuthProvider();
const auth = getAuth();
export const authenticate = () => {
    //console.log("here");
    // can we have sign in again with new user? dosen't seem to work directly
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            //console.log(user);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

export const logout = () => {
    signOut(auth)
        .then((result) => {
            //console.log("Signed out");
        }).catch((err) => {
            //console.log("error");
        });
}

// does it update the clients automatically? hmm, check it if a const var is fine on it's clients
// we prob need to use it like this only, as on checking deep, seems we should only use ()=>void for (user)=>{} block
export const currentUserObserver = (updateUser: (user: User | null) => void): any => {
    onAuthStateChanged(auth, user => updateUser(user));
}

export const getCurrentUser = () => {
    return auth?.currentUser;
}
