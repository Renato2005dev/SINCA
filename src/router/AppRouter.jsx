import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pantallas base
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import VoiceAssistant from '../pages/VoiceAssistant';
import Accessibility from '../pages/Accessibility';

// Accesibilidad (Renato y Daylee)
import ReadingMask from '../components/ReadingMask';
import LectorAccesible from '../components/LectorAccesible';

// Pantallas nuevas
import Multimedia from "../pages/Multimedia";
import Dashboard from '../pages/Dashboard';
import Perfil from '../pages/Perfil';
import Traductor from '../pages/Traductor';

function AppRouter() {

  // Memoria del tamaño de letra y del tema visual
  useEffect(() => {
    const savedFontSize = localStorage.getItem("sinca-fontSize");
    if (savedFontSize) {
      document.documentElement.style.fontSize = `${savedFontSize}px`;
    }
    const savedTheme = localStorage.getItem("sinca-theme");
    if (savedTheme) {
      document.body.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const [readingMask, setReadingMask] = useState(false);
  useEffect(() => {
    const sync = () => {
      setReadingMask(
        localStorage.getItem("sinca-reading-mask") === "true"
      );
    };
    sync();
    window.addEventListener("reading-mask-change", sync);
    return () =>
      window.removeEventListener("reading-mask-change", sync);
  }, []);

  return (
    <BrowserRouter>
      {/* Componente de Daylee agregado antes del contenedor principal */}
      {readingMask && <ReadingMask />}

      <div id="contenido-principal" className="min-h-screen relative">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Rutas de la aplicación base */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/asistente" element={<VoiceAssistant />} />
          <Route path="/accesibilidad" element={<Accessibility />} />
          <Route path="/traductor" element={<Traductor />} />

          {/* Rutas agregadas por Tifany */}
          <Route path="/multimedia" element={<Multimedia />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />

          {/* Ruta de seguridad */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

        {/* Lector flotante */}
        <div className="fixed bottom-6 right-6 z-50">
          <LectorAccesible />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;