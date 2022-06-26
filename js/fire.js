// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFtlm_kJyjP6GAtDE2M5L8ElzQRgvLXH8",
  authDomain: "world-of-words-5ccc9.firebaseapp.com",
  projectId: "world-of-words-5ccc9",
  storageBucket: "world-of-words-5ccc9.appspot.com",
  messagingSenderId: "261596113945",
  appId: "1:261596113945:web:94942a1c07e4a6b3e98e88",
  measurementId: "G-343N30BKBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

testData();

async function testData() {
    const playersRef = collection(db, "players");

    const querySnapshot = await getDocs(playersRef);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}
