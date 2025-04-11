// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Configuración de Firebase
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
const db = getFirestore(app);

// Manejar envío del formulario de registro
document.getElementById("registerForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Evitar la recarga de la página

  // Capturar datos del formulario
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Crear un ID único para el usuario
    const idUsuario = Date.now().toString(); 
    // Guardar datos en Firestore
    await setDoc(doc(db, "usuarios", idUsuario), {
      nombreUsuario: name,
      email: email,
      contraseña: password,
      creadoEn: new Date(),
      contadorTweets: 0,
      contadorSeguidores: 0,
      contadorSiguiendo: 0,
    });

    // Mostrar confirmación al usuario
    alert("¡Usuario registrado exitosamente!");
    document.getElementById("registerForm").reset(); // Limpiar el formulario
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    alert("Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.");
  }
});
