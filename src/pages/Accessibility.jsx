import { RiArrowLeftLine, RiBrainLine, RiClosedCaptioningFill, RiContrastFill, RiMoonFill, RiRefreshLine, RiSunLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Toggle = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full ${checked ? "bg-[#27500A]" : "bg-gray-300"}`}
  >
    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ${checked ? "translate-x-6" : "translate-x-1"}`} />
  </button>
);

const Accessibility = () => {
  // 👇 1. INICIAMOS LEYENDO LA MEMORIA DEL NAVEGADOR
  const [sliderValue, setSliderValue] = useState(() => Number(localStorage.getItem("sinca-fontSize")) || 16);
  const [apariencia, setApariencia] = useState(() => localStorage.getItem("sinca-theme") || "normal");
  const [subtitulos, setSubtitulos] = useState(() => localStorage.getItem("sinca-subs") === "true" || true);
  const [modoSimple, setModoSimple] = useState(() => localStorage.getItem("sinca-modo") === "true" || true);
  
  const navigate = useNavigate();

  const MIN = 12, MAX = 32;
  const percent = ((sliderValue - MIN) / (MAX - MIN)) * 100;

  // 👇 2. AL DAR CLIC EN "APLICAR", GUARDAMOS EL TAMAÑO
  const handleAplicar = () => {
    document.documentElement.style.fontSize = `${sliderValue}px`;
    localStorage.setItem("sinca-fontSize", sliderValue);
    alert("Tamaño de texto aplicado y guardado.");
  };

  // 👇 3. AL ELEGIR UN TEMA, LO GUARDAMOS
const handleTemaChange = (nuevoTema) => {
    setApariencia(nuevoTema);
    localStorage.setItem("sinca-theme", nuevoTema);
    document.body.setAttribute('data-theme', nuevoTema); // Cambia el color de toda la web
  };

  // Funciones para los Toggles
  const handleSubtitulosChange = (valor) => {
    setSubtitulos(valor);
    localStorage.setItem("sinca-subs", valor);
  };

  const handleModoChange = (valor) => {
    setModoSimple(valor);
    localStorage.setItem("sinca-modo", valor);
  };
  
 const handleReset = () => {
    setSliderValue(16);
    setApariencia("normal");
    setSubtitulos(true);
    setModoSimple(true);
    document.documentElement.style.fontSize = "16px";
    document.body.removeAttribute('data-theme'); // Quita el modo oscuro/alto contraste
    localStorage.clear();
  };

  // Clases dinámicas
  const temaClases = {
    normal: "bg-gray-100 text-gray-900",
    oscuro: "bg-gray-900 text-white",
    alto: "bg-black text-yellow-400",
  };
  const cardClases = {
    normal: "bg-white border-gray-200",
    oscuro: "bg-gray-800 border-gray-700",
    alto: "bg-gray-950 border-yellow-500",
  };
  const muted = {
    normal: "text-gray-500",
    oscuro: "text-gray-400",
    alto: "text-yellow-300",
  };

  const tema = temaClases[apariencia];
  const card = cardClases[apariencia];
  const textMuted = muted[apariencia];

  return (
    <div className={`min-h-screen ${tema} flex flex-col font-sans`}>
      
      <header className={`flex justify-between items-center px-8 py-3 border-b-2 ${apariencia === "alto" ? "border-yellow-500 bg-black" : apariencia === "oscuro" ? "border-gray-700 bg-gray-900" : "border-[#165c36] bg-white"} w-full transition-colors`}>
        <div className={`${apariencia === "alto" ? "text-yellow-400" : apariencia === "oscuro" ? "text-white" : "text-[#165c36]"} font-bold text-xl flex items-center gap-2`}>
          <span className="text-3xl">❉</span> SINCA
        </div>
        <button onClick={() => navigate('/dashboard')} className={`${apariencia === "alto" ? "text-yellow-400" : apariencia === "oscuro" ? "text-white" : "text-[#165c36]"} flex items-center gap-2 text-base font-bold hover:underline transition-all`}>
          <RiArrowLeftLine className="w-5 h-5" /> Volver al Inicio
        </button>
      </header>

      <div className="flex justify-center px-4 py-8 flex-1">
        <div className="w-full max-w-2xl space-y-4">
          
          <div className="flex items-start gap-3">
            <button onClick={() => navigate('/home')} className="w-9 h-9 rounded-lg bg-[#27500A] flex items-center justify-center shrink-0 mt-0.5 hover:bg-[#3B6D11]">
              <RiArrowLeftLine className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-xl font-bold">Configuración de Accesibilidad</h1>
              <p className={`text-sm mt-0.5 ${textMuted}`}>Personaliza SINCA para que se adapte perfectamente a tus necesidades.</p>
            </div>
          </div>

          <div className={`border rounded-xl p-5 ${card}`}>
            <h2 className="text-sm font-semibold mb-4 text-[#27500A]">Tamaño de texto</h2>
            <p className={`text-xs font-medium mb-3 ${textMuted}`}>Tamaño actual</p>
            
            <div className="flex items-center gap-3 mb-1">
              <span className={`text-base font-bold w-5 text-center ${textMuted}`}>A</span>
              <button onClick={() => setSliderValue(v => Math.max(MIN, v - 1))} className="w-7 h-7 rounded-md bg-[#27500A] flex items-center justify-center hover:bg-[#3B6D11]">
                <span className="text-white font-bold text-base">−</span>
              </button>
              
              <div className="relative flex-1 h-5 flex items-center">
                <div className="absolute w-full h-1.5 bg-gray-300 rounded-full" />
                <div className="absolute h-1.5 bg-[#27500A] rounded-full" style={{ width: `${percent}%` }} />
                <input type="range" min={MIN} max={MAX} value={sliderValue} onChange={e => setSliderValue(Number(e.target.value))} className="absolute w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="absolute w-5 h-5 bg-[#27500A] rounded-full border-2 border-white shadow-md pointer-events-none" style={{ left: `calc(${percent}% - 10px)` }} />
              </div>
              
              <button onClick={() => setSliderValue(v => Math.min(MAX, v + 1))} className="w-7 h-7 rounded-md bg-[#27500A] flex items-center justify-center hover:bg-[#3B6D11]">
                <span className="text-white font-bold text-base">+</span>
              </button>
              <span className="text-2xl font-bold w-6 text-center">A</span>
            </div>
            
            <p className="text-sm font-medium my-4">Vista previa de tamaño de texto</p>
            <div className={`border rounded-lg p-4 min-h-22.5 ${apariencia === "normal" ? "bg-gray-50" : apariencia === "oscuro" ? "bg-gray-900" : "bg-gray-950"}`}>
              <p style={{ fontSize: `${sliderValue}px` }}>
                Este es un ejemplo de como se verá el texto en la aplicación con el tamaño seleccionado
              </p>
            </div>
            
            <div className="flex justify-end mt-3">
              <button onClick={handleAplicar} className="px-5 py-2 rounded-lg border border-[#27500A] text-[#27500A] text-sm font-bold hover:bg-[#EAF3DE]">
                Aplicar
              </button>
            </div>
          </div>

          {/* 👇 USAMOS handleTemaChange AQUÍ 👇 */}
          <div className={`border rounded-xl p-5 ${card}`}>
            <h2 className="text-sm font-semibold mb-1 text-[#27500A]">Apariencia</h2>
            <p className={`text-sm mb-4 ${textMuted}`}>Elige el modo visual para mejor visibilidad</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => handleTemaChange("normal")} className={`flex flex-col items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-semibold border-2 ${apariencia === "normal" ? "bg-white border-gray-900 text-gray-900" : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"}`}>
                <RiSunLine className="w-5 h-5" /> Normal
              </button>
              <button onClick={() => handleTemaChange("oscuro")} className={`flex flex-col items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-semibold border-2 ${apariencia === "oscuro" ? "bg-gray-900 border-gray-900 text-white" : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"}`}>
                <RiMoonFill className={`w-5 h-5 ${apariencia === "oscuro" ? "text-yellow-400" : ""}`} /> Oscuro
              </button>
              <button onClick={() => handleTemaChange("alto")} className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold border-2 ${apariencia === "alto" ? "bg-black border-yellow-400 text-yellow-400" : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"}`}>
                <RiContrastFill className={`w-5 h-5 ${apariencia === "alto" ? "text-yellow-400" : ""}`} /> Alto contraste
              </button>
            </div>
          </div>

          <div className={`border rounded-xl p-5 ${card}`}>
            <h2 className="text-sm font-semibold mb-3 text-[#27500A]">Subtítulos Automático</h2>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${apariencia === "normal" ? "bg-green-100" : "bg-green-700"}`}>
                <RiClosedCaptioningFill className={`w-5 h-5 ${textMuted}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Activar subtítulos</p>
              </div>
              <Toggle checked={subtitulos} onChange={handleSubtitulosChange} />
            </div>
          </div>

          <div className={`border rounded-xl p-5 ${card}`}>
            <h2 className="text-sm font-semibold mb-3 text-[#27500A]">Modo cognitivo simplificado</h2>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${apariencia === "normal" ? "bg-green-100" : "bg-green-700"}`}>
                <RiBrainLine className={`w-5 h-5 ${textMuted}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Modo simplificado</p>
              </div>
              <Toggle checked={modoSimple} onChange={handleModoChange} />
            </div>
          </div>

          <div className="flex justify-end pb-2">
            <button onClick={handleReset} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium ${apariencia === "normal" ? "border-gray-300 text-gray-600" : "border-gray-600 text-gray-300"}`}>
              <RiRefreshLine className="w-4 h-4" /> Restablecer todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;