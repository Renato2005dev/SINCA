import { useEffect, useState } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importamos TODAS tus pantallas
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import VoiceAssistant from '../pages/VoiceAssistant';
import Accessibility from '../pages/Accessibility'; 
import LecturaAccesible from '../pages/LecturaAccesible'; 
import ReadingMask from '../components/ReadingMask';

function AppRouter() {
  
  // Memoria del tamaño de letra
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
    <>
    <BrowserRouter>
    {readingMask && <ReadingMask />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Aquí están todas tus rutas restauradas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/asistente" element={<VoiceAssistant />} />
        <Route path="/accesibilidad" element={<Accessibility />} />
        <Route path="/lectura" element={<LecturaAccesible />} />
        
        {/* Ruta de seguridad: si escriben mal la URL, los manda al Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default AppRouter;