import { useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importamos TODAS tus pantallas
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import VoiceAssistant from '../pages/VoiceAssistant';
import Accessibility from '../pages/Accessibility'; 
import LecturaAccesible from '../pages/LecturaAccesible'; 

// 👇 1. IMPORTAMOS EL LECTOR AQUÍ
import LectorAccesible from '../components/LectorAccesible';

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

  return (
    <BrowserRouter>
      {/* 👇 2. ENVOLVEMOS TODAS LAS RUTAS CON EL ID GLOBAL AQUÍ */}
      <div id="contenido-principal" className="min-h-screen relative">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Aquí están todas tus rutas restauradas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/asistente" element={<VoiceAssistant />} />
          <Route path="/accesibilidad" element={<Accessibility />} />
          <Route path="/lectura" element={<LecturaAccesible />} />
          
          {/* Ruta de seguridad */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

        {/* 👇 3. EL LECTOR FLOTANTE SE QUEDA AQUÍ ABAJO */}
        <div className="fixed bottom-6 right-6 z-50">
          <LectorAccesible />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;