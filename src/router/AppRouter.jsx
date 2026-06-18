import { useEffect, useState } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importamos TODAS tus pantallas base
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import VoiceAssistant from '../pages/VoiceAssistant';
import Accessibility from '../pages/Accessibility'; 

// Importaciones de Renato y Daylee (Accesibilidad)
import ReadingMask from '../components/ReadingMask';
import LectorAccesible from '../components/LectorAccesible';

// Importaciones de Tifany (Nuevas pantallas)
import Multimedia from "../pages/Multimedia";
import Dashboard from '../pages/Dashboard';

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

  // 👇 UN SOLO RETURN LIMPIO Y ORDENADO CON TODO INTEGRADO
  return (
    <BrowserRouter>
      {/* Componente de Daylee agregado antes del contenedor principal */}
      {readingMask && <ReadingMask />}
      
      {/* Tu contenedor principal para el lector */}
      <div id="contenido-principal" className="min-h-screen relative">
        <Routes>
          {/* Mantenemos el redireccionamiento al Login por seguridad */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          {/* Rutas de la aplicación base */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/asistente" element={<VoiceAssistant />} />
          <Route path="/accesibilidad" element={<Accessibility />} />
          
          {/* 👇 Las nuevas rutas agregadas por Tifany */}
          <Route path="/multimedia" element={<Multimedia />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Ruta de seguridad */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

        {/* Tu lector flotante */}
        <div className="fixed bottom-6 right-6 z-50">
          <LectorAccesible />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;