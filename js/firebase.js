import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdor9eF1ToeoFbIrYX9VpH6H1FHplG1VY",
  authDomain: "twitter-9c1c3.firebaseapp.com",
  projectId: "twitter-9c1c3",
  storageBucket: "twitter-9c1c3.appspot.com",
  messagingSenderId: "212816426980",
  appId: "1:212816426980:web:fb7eb1a0bfbbdd84ab39f1",
  measurementId: "G-9KWRSCKLH0",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
