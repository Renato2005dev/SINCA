import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine } from 'react-icons/ri';
import '../assets/css/estilos.css'; 

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(true);
  const [transcript] = useState("Quiero un resumen de las noticial del canal 4.");
  const navigate = useNavigate();

  // Función para pausar/reanudar la animación y grabación
  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* HEADER COORDINADO CON EL LOGO */}
      <header className="flex justify-between items-center px-8 py-3 border-b-2 border-[#165c36] bg-white w-full">
        <div className="text-[#165c36] font-bold text-xl flex items-center gap-2">
          <span className="text-3xl">❉</span> SINCA
        </div>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="text-[#165c36] flex items-center gap-2 text-base font-bold hover:underline transition-all"
        >
          <RiArrowLeftLine className="w-5 h-5" /> Volver al Inicio
        </button>
      </header>

     {/* CONTENIDO DEL ASISTENTE */}
      <div id="contenido-principal" className="asistente-container flex-1 flex flex-col items-center pt-10">
        
        <h3 className="estado-texto font-bold text-xl mb-12">
          {isListening ? 'Estado: Escuchando...' : 'Estado: Pausado'}
        </h3>
        
        {/* Círculo central con el micrófono y las ondas animadas */}
        <div className="mic-wrapper my-10">
          {/* Las ondas solo se renderizan si está escuchando */}
          {isListening && (
            <>
              <div className="onda onda-1"></div>
              <div className="onda onda-2"></div>
              <div className="onda onda-3"></div>
            </>
          )}
          <button 
            className="mic-btn"
            onClick={toggleListening}
            aria-label="Micrófono"
          >
            🎤 
          </button>
        </div>

        {/* Caja verde de texto transcrito */}
        <div className="transcript-box mt-10">
          <p>"{transcript}"</p>
        </div>

        {/* Botones inferiores */}
        <div className="asistente-acciones mt-10">
          <button className="btn-cancelar" onClick={() => navigate('/home')}>Cancelar</button>
          <button className="btn-enviar">Enviar</button>
        </div>

      </div>
    </div>
  );
};

export default VoiceAssistant;