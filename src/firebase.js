import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Obligatorio para registrar usuarios
import { getAnalytics } from "firebase/analytics"; // Para estadísticas (viene por defecto)

const firebaseConfig = {
  apiKey: "AIzaSyBgBWJ-lePOosVy3mcWcdDsU3fZcPKDFao", // ¡Tu llave correcta!
  authDomain: "sinca-20d6d.firebaseapp.com",
  projectId: "sinca-20d6d",
  storageBucket: "sinca-20d6d.firebasestorage.app",
  messagingSenderId: "514091043092",
  appId: "1:514091043092:web:842634b6ae9fb9cac69a01",
  measurementId: "G-7DBQZ9KV6B"
};

// Inicializamos los servicios de Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportamos 'auth' para que Login.jsx y Register.jsx puedan usarlo
export const auth = getAuth(app);