import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdor9eF1ToeoFbIrYX9VpH6H1FHplG1VY",
  authDomain: "twitter-9c1c3.firebaseapp.com",
  projectId: "twitter-9c1c3",
  storageBucket: "twitter-9c1c3.appspot.com",
  messagingSenderId: "212816426980",
  appId: "1:212816426980:web:fb7eb1a0bfbbdd84ab39f1",
  measurementId: "G-9KWRSCKLH0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Al enviar el formulario de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Capturar datos del formulario
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Buscar usuario en Firestore con el email y contraseña proporcionados
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("email", "==", email), where("contraseña", "==", password)); 
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Usuario encontrado
      alert("¡Inicio de sesión exitoso!");

      // Guardar el email en sessionStorage
      sessionStorage.setItem("userEmail", email);
  
      // Redirigir a la página de inicio
      window.location.href = "home.html";
    } else {
      alert("Correo o contraseña incorrectos. Intenta nuevamente.");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.");
  }
});
