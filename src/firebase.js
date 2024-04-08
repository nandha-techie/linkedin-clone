import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBtuSY6SLde0M2g1P8Exo5IG77EfIVsHmE",
    authDomain: "linkedin-clone-e3090.firebaseapp.com",
    projectId: "linkedin-clone-e3090",
    storageBucket: "linkedin-clone-e3090.appspot.com",
    messagingSenderId: "490625077927",
    appId: "1:490625077927:web:f01851f228b8112039c182"
  };
  
const firebaseApp = initializeApp(firebaseConfig);
// const signOutApp =  initializeServerApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);
export { db, auth };