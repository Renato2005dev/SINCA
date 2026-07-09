 import { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import {
  OrbitControls,
  useGLTF,
  Center,
  Environment,
  useAnimations,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAccessibility } from "../hooks/useAccessibility";

const duraciones = {
  escena1: 8000,
  escena2: 7000,
  escena3: 6000,
};

const diccionarioSenas = {
  "hola soy renato y estoy feliz de estar aca": "escena1",
  "me gusto mucho esta pagina": "escena2",
  "gracias por hacer esta pagina para personas sordas": "escena3",
};

function Avatar({ palabra }) {
  const archivoModelo = palabra ? `/models/${palabra}.glb` : "/models/escena1.glb";
  const modeloAnimado = useGLTF(archivoModelo);

  const { ref, actions } = useAnimations(modeloAnimado?.animations || []);

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;

    Object.values(actions).forEach((action) => action.stop());

    if (palabra) {
      Object.values(actions).forEach((action) => {
        if (action) action.reset().fadeIn(0.2).play();
      });
    }
  }, [palabra, actions]);

  if (!modeloAnimado || !modeloAnimado.scene) return null;

  return (
    <Center>
      <primitive
        ref={ref}
        object={modeloAnimado.scene}
        scale={2}
        position={[0, -1, 0]}
      />
    </Center>
  );
}

const Traductor = () => {
  const navigate = useNavigate();
  const { tema } = useAccessibility();

  const [textoIn, setTextoIn] = useState("");
  const [colaPalabras, setColaPalabras] = useState([]);

const palabraActual = colaPalabras[0] || "";
const estaTraduciendo = colaPalabras.length > 0;

  const esAlto = tema === "alto";
  const esOscuro = tema === "oscuro";

  const pageClass = esAlto
    ? "bg-black text-yellow-400"
    : esOscuro
      ? "bg-gray-950 text-white"
      : "bg-[#F4F5F7] text-[#343A40]";

  const headerClass = esAlto
    ? "bg-black border-yellow-500"
    : esOscuro
      ? "bg-gray-900 border-gray-700"
      : "bg-white border-[#165c36]";

  const greenText = esAlto
    ? "text-yellow-400"
    : esOscuro
      ? "text-white"
      : "text-[#165c36]";

  const mutedText = esAlto
    ? "text-yellow-300"
    : esOscuro
      ? "text-gray-300"
      : "text-gray-600";

  const cardClass = esAlto
    ? "bg-black border-yellow-500"
    : esOscuro
      ? "bg-gray-900 border-gray-700"
      : "bg-white border-gray-200";

  const textareaClass = esAlto
    ? "bg-black border-yellow-500 text-yellow-400 placeholder-yellow-300 focus:ring-yellow-400"
    : esOscuro
      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-white"
      : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[#165c36]";

  const avatarPanelClass = esAlto
    ? "bg-black border-yellow-500"
    : esOscuro
      ? "bg-gray-900 border-gray-700"
      : "bg-gradient-to-b from-gray-50 to-gray-200 border-gray-200";

  const handleTraducir = (e) => {
    e.preventDefault();
    if (!textoIn.trim()) return;

    

    const textoLimpio = textoIn.toLowerCase().replace(/[,.]/g, "").trim();

    if (diccionarioSenas[textoLimpio]) {
      setColaPalabras([diccionarioSenas[textoLimpio]]);
    } else {
      const palabras = textoLimpio.split(" ");
      const palabrasAnimables = palabras
        .map((p) => diccionarioSenas[p])
        .filter((alias) => alias !== undefined);

      if (palabrasAnimables.length > 0) {
        setColaPalabras(palabrasAnimables);
      } else {
        
        alert("No encontré esa seña o frase.");
      }
    }
  };

  useEffect(() => {
  if (colaPalabras.length === 0) return;

  const palabraEnTurno = colaPalabras[0];
  const tiempo = duraciones[palabraEnTurno] || 5000;

  const timer = setTimeout(() => {
    setColaPalabras((colaAnterior) => colaAnterior.slice(1));
  }, tiempo);

  return () => clearTimeout(timer);
}, [colaPalabras]);

  return (
    <div className={`min-h-screen flex flex-col font-sans ${pageClass}`}>
      <header
        className={`flex justify-between items-center px-8 py-3 border-b-2 sticky top-0 z-50 ${headerClass}`}
      >
        <div className={`${greenText} font-bold text-xl flex items-center gap-2`}>
          <span className="text-3xl">❉</span>
          SINCA
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className={`${greenText} flex items-center gap-2 text-base font-bold hover:underline transition-all`}
        >
          <RiArrowLeftLine className="w-5 h-5" />
          Volver al Dashboard
        </button>
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className={`p-6 rounded-3xl shadow-sm border ${cardClass}`}>
            <h1 className={`text-2xl font-extrabold mb-2 flex items-center gap-2 ${greenText}`}>
              <span className="text-3xl">🤟</span>
              Traductor 3D
            </h1>

            <p className={`${mutedText} mb-6 text-sm`}>
              Escribe un texto corto y nuestro avatar lo traducirá a lenguaje de
              señas básico.
            </p>

            <form onSubmit={handleTraducir} className="flex flex-col gap-4">
              <textarea
                className={`w-full h-32 border rounded-2xl p-4 focus:outline-none focus:ring-2 resize-none ${textareaClass}`}
                placeholder="Ej: Hola, soy Renato y me siento bien"
                value={textoIn}
                onChange={(e) => setTextoIn(e.target.value)}
              />

              <button
                type="submit"
                disabled={estaTraduciendo || !textoIn.trim()}
                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all shadow-md ${
                  estaTraduciendo || !textoIn.trim()
                    ? esAlto
                      ? "bg-yellow-900 text-yellow-300 border border-yellow-500 cursor-not-allowed"
                      : esOscuro
                        ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    : esAlto
                      ? "bg-yellow-400 text-black hover:bg-yellow-300"
                      : "bg-[#165c36] text-white hover:bg-[#0f4427]"
                }`}
              >
                {estaTraduciendo ? (
                  <span className="animate-pulse">Traduciendo...</span>
                ) : (
                  <>Traducir a Señas</>
                )}
              </button>
            </form>
          </div>
        </div>

        <div
          className={`w-full md:w-2/3 rounded-3xl shadow-sm border overflow-hidden relative min-h-125 flex items-center justify-center ${avatarPanelClass}`}
        >
          {palabraActual && (
            <div
              className={`absolute top-4 px-4 py-2 rounded-full font-bold z-10 shadow-sm ${
                esAlto
                  ? "bg-black text-yellow-400 border border-yellow-500"
                  : esOscuro
                    ? "bg-gray-800 text-white border border-gray-600"
                    : "bg-white/80 text-[#165c36]"
              }`}
            >
              Reproduciendo archivo: {palabraActual}.glb
            </div>
          )}

          <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 5, 2]} intensity={2} />
            <Environment preset="city" />
            <OrbitControls />

            <Suspense fallback={null}>
              <Avatar palabra={palabraActual} />
            </Suspense>
          </Canvas>
        </div>
      </main>
    </div>
  );
};

export default Traductor;