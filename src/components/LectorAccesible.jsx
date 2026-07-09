import { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';

const LectorAccesible = () => {
  const { tema } = useAccessibility();

  // Estados para la lectura global
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Estado para el Modo Cursor
  const [modoCursorActivo, setModoCursorActivo] = useState(() => {
    return localStorage.getItem('sinca-cursor') === 'true';
  });
  
  // Opciones generales
  const [velocidad, setVelocidad] = useState(() => {
    return Number(localStorage.getItem('sinca-velocidad')) || 1;
  });
  const [minimizdo, setMinimizado] = useState(false);

  // Referencia para la lectura global
  const globalUtteranceRef = useRef(null);

  // 👇 CLASES PARA LOS TEMAS
  const cardClases = {
    normal: "bg-white border-gray-200",
    oscuro: "bg-gray-800 border-gray-700",
    alto: "bg-black border-yellow-500",
  };

  const textClases = {
    normal: "text-gray-500",
    oscuro: "text-gray-400",
    alto: "text-yellow-300",
  };


  const headerClases = {
    normal: "bg-[#165c36] text-white",
    oscuro: "bg-gray-900 text-white border-b border-gray-700",
    alto: "bg-black text-yellow-400 border-b border-yellow-500",
  };

  const buttonClases = {
    normal: "bg-[#165c36] text-white hover:bg-[#0f4427]",
    oscuro: "bg-gray-700 text-white hover:bg-gray-600",
    alto: "bg-yellow-500 text-black hover:bg-yellow-400",
  };

  // ---------------------------------------------------------
  // LÓGICA 1: LECTURA GLOBAL (Botones Play / Pausa / Stop)
  // ---------------------------------------------------------
  
  const detenerLecturaGlobal = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const iniciarLecturaGlobal = () => {
    // Si estaba pausado, simplemente reanudamos
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    // Si el modo cursor está activo, lo apagamos para que no interfieran
    if (modoCursorActivo) {
      setModoCursorActivo(false);
      localStorage.setItem('sinca-cursor', 'false');
    }

    // Cortamos cualquier lectura previa
    detenerLecturaGlobal();

    const contenedor = document.getElementById('contenido-principal');
    const textoActual = contenedor ? contenedor.innerText : "No hay contenido principal detectado.";

    globalUtteranceRef.current = new SpeechSynthesisUtterance(textoActual);
    globalUtteranceRef.current.lang = 'es-ES';
    globalUtteranceRef.current.rate = velocidad;

    globalUtteranceRef.current.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(globalUtteranceRef.current);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pausarLecturaGlobal = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  // ---------------------------------------------------------
  // LÓGICA 2: LECTURA POR CURSOR (Hover-to-Speech)
  // ---------------------------------------------------------
  useEffect(() => {
    const contenedor = document.getElementById('contenido-principal');

    const manejarHover = (e) => {
      if (!modoCursorActivo) return;

      const etiquetasValidas = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'BUTTON', 'A', 'LI', 'LABEL'];

      if (etiquetasValidas.includes(e.target.tagName)) {
        e.stopPropagation();
        const texto = e.target.innerText || e.target.textContent;
        
        if (texto && texto.trim() !== "") {
          window.speechSynthesis.cancel(); // Corta el audio anterior al mover el ratón
          
          const cursorUtterance = new SpeechSynthesisUtterance(texto);
          cursorUtterance.lang = 'es-ES';
          cursorUtterance.rate = velocidad;
          window.speechSynthesis.speak(cursorUtterance);
        }
      }
    };

    if (modoCursorActivo && contenedor) {
      contenedor.addEventListener('mouseover', manejarHover);
    }

    return () => {
      if (contenedor) {
        contenedor.removeEventListener('mouseover', manejarHover);
      }
    };
  }, [modoCursorActivo, velocidad]);

  // Si activamos el modo cursor, detenemos la lectura global automáticamente
  const toggleModoCursor = () => {
    if (!modoCursorActivo) {
      detenerLecturaGlobal();
    } else {
      window.speechSynthesis.cancel(); // Silencia al apagar el modo
    }
    const nuevoEstado = !modoCursorActivo;
    setModoCursorActivo(nuevoEstado);
    localStorage.setItem('sinca-cursor', String(nuevoEstado));
  };

  // Actualizar velocidad en tiempo real si está leyendo globalmente
  useEffect(() => {
    if (globalUtteranceRef.current && isPlaying && !isPaused) {
       globalUtteranceRef.current.rate = velocidad;
    }
    localStorage.setItem('sinca-velocidad', String(velocidad));
  }, [velocidad]);

  // Limpieza total al desmontar el componente
  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  // ---------------------------------------------------------
  // INTERFAZ DE USUARIO (UI)
  // ---------------------------------------------------------
  
  if (minimizdo) {
    return (
      <button 
        onClick={() => setMinimizado(false)}
        className={`${buttonClases[tema]} p-4 rounded-full shadow-lg transition-all flex items-center justify-center`}
        title="Abrir Asistente de Lectura"
      >
        <span className="text-2xl" role="img" aria-label="speaker">🔊</span>
      </button>
    );
  }

  return (
    <div className={`w-80 border rounded-xl shadow-2xl overflow-hidden font-sans ${cardClases[tema]}`}>
      
      {/* Cabecera */}
      <div className={`px-4 py-3 flex justify-between items-center ${headerClases[tema]}`}>
        <h3 className={`font-semibold flex items-center gap-2 ${tema === "alto" ? "text-yellow-400" : "text-white"}`}>
          <span role="img" aria-label="accessibility">♿</span> Asistente de Lectura
        </h3>
        <button 
          onClick={() => setMinimizado(true)}
          className={`${tema === "alto" ? "text-yellow-400 hover:text-yellow-300" : "text-white hover:text-gray-300"} focus:outline-none`}
          title="Minimizar panel"
        >
          ✖
        </button>
      </div>

      <div className="p-5">
        
        {/* SECCIÓN 1: LECTURA GLOBAL */}
        <div className="mb-6">
          <p className={`text-xs ${textClases[tema]} mb-2 font-medium uppercase tracking-wider`}>
            Lectura de Pantalla Completa
          </p>
          <div className="flex gap-2">
            {!isPlaying || isPaused ? (
              <button 
                onClick={iniciarLecturaGlobal}
                className={`flex-1 ${tema === "alto" ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-blue-600 text-white hover:bg-blue-700"} py-2 px-3 rounded-md transition font-medium text-sm flex justify-center items-center gap-1`}
              >
                {isPaused ? '▶ Reanudar' : '▶ Leer Todo'}
              </button>
            ) : (
              <button 
                onClick={pausarLecturaGlobal}
                className="flex-1 bg-amber-500 text-white py-2 px-3 rounded-md hover:bg-amber-600 transition font-medium text-sm flex justify-center items-center gap-1"
              >
                ⏸ Pausar
              </button>
            )}
            
            <button 
              onClick={detenerLecturaGlobal}
              disabled={!isPlaying}
              className={`${tema === "alto" ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} py-2 px-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm`}
              title="Detener"
            >
              ⏹
            </button>
          </div>
        </div>

        <hr className={`${tema === "alto" ? "border-yellow-500" : tema === "oscuro" ? "border-gray-700" : "border-gray-100"} mb-4`} />

        {/* SECCIÓN 2: LECTURA POR CURSOR */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className={`text-xs ${textClases[tema]} font-medium uppercase tracking-wider`}>
              Lectura al pasar el ratón
            </p>
          </div>
          
          <button 
            onClick={toggleModoCursor}
            className={`w-full py-2.5 px-4 rounded-md transition font-medium text-sm flex justify-between items-center border ${
              modoCursorActivo 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : `${tema === "alto" ? "bg-black border-yellow-500 text-yellow-400" : tema === "oscuro" ? "bg-gray-700 border-gray-600 text-gray-300" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"}`
            }`}
          >
            <span className="flex items-center gap-2">
              <span>🖱️</span> Modo Cursor
            </span>
            
            {/* Toggle visual */}
            <div className={`w-10 h-5 rounded-full relative transition-colors ${modoCursorActivo ? 'bg-green-500' : 'bg-gray-300'}`}>
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${modoCursorActivo ? 'translate-x-5' : 'translate-x-1'}`}></div>
            </div>
          </button>
          {modoCursorActivo && (
            <p className={`text-xs ${tema === "alto" ? "text-yellow-400" : "text-green-600"} mt-2`}>
              Mueve el ratón sobre los textos para escuchar.
            </p>
          )}
        </div>

        <hr className={`${tema === "alto" ? "border-yellow-500" : tema === "oscuro" ? "border-gray-700" : "border-gray-100"} mb-4`} />

        {/* SECCIÓN 3: CONFIGURACIÓN */}
        <div>
          <div className="flex justify-between mb-1">
            <label className={`text-xs font-medium ${textClases[tema]}`}>
              Velocidad de voz
            </label>
            <span className={`text-xs font-bold ${tema === "alto" ? "text-yellow-400" : "text-[#165c36]"}`}>
              {velocidad}x
            </span>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.1" 
            value={velocidad} 
            onChange={(e) => setVelocidad(parseFloat(e.target.value))}
            className="w-full accent-[#165c36] cursor-pointer"
            style={{
              accentColor: tema === "alto" ? "#facc15" : "#165c36",
            }}
          />
          <div className={`flex justify-between text-[10px] ${textClases[tema]} mt-1 uppercase`}>
            <span>Lento</span>
            <span>Rápido</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LectorAccesible;