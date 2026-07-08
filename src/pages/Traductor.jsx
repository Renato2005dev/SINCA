import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiSendPlaneFill, RiVoiceprintLine } from 'react-icons/ri';
import { OrbitControls, useGLTF, Center, Environment, useAnimations } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

// 1. EL "CEREBRO" DEL TRADUCTOR
const diccionarioSenas = {
  "hola": "hola",
  "yo": "yo",
  "bien": "feliz",
  "prueba": "escena1" 
};

// 2. COMPONENTE AVATAR (Nuevo Método: Plask.ai)
function Avatar({ palabra }) {
  // Modelo por defecto al cargar la página
  const archivoModelo = palabra ? `/models/${palabra}.glb` : '/models/escena1.glb';
  const modeloAnimado = useGLTF(archivoModelo);

  const { ref, actions } = useAnimations(modeloAnimado?.animations || []);

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;

    // Detenemos cualquier animación que esté sonando
    Object.values(actions).forEach(action => action.stop());

    // Solo le damos PLAY si el usuario realmente escribió una palabra
    if (palabra) {
      Object.values(actions).forEach(action => {
        if (action) action.reset().fadeIn(0.2).play();
      });
    }
  }, [palabra, actions]);

  if (!modeloAnimado || !modeloAnimado.scene) return null; 

  return (
    <Center>
      {/* Escala correcta para modelos de Plask */}
      <primitive ref={ref} object={modeloAnimado.scene} scale={1} position={[0, -1, 0]} />
    </Center>
  );
}

// 3. COMPONENTE PRINCIPAL TRADUCTOR
const Traductor = () => {
  const navigate = useNavigate();
  const [textoIn, setTextoIn] = useState('');
  const [estaTraduciendo, setEstaTraduciendo] = useState(false);
  
  const [colaPalabras, setColaPalabras] = useState([]);
  const [palabraActual, setPalabraActual] = useState('');

  const handleTraducir = (e) => {
    e.preventDefault();
    if (!textoIn.trim()) return;
    
    setEstaTraduciendo(true);

    const palabrasLimpias = textoIn.toLowerCase().replace(/[,.]/g, '').split(' ');
    
    const palabrasAnimables = palabrasLimpias
      .map(palabra => diccionarioSenas[palabra]) 
      .filter(alias => alias !== undefined);     

    if (palabrasAnimables.length > 0) {
      setColaPalabras(palabrasAnimables);
    } else {
      setEstaTraduciendo(false);
      alert("Lo siento, aún no tengo animaciones guardadas para esas palabras.");
    }
  };

  useEffect(() => {
    if (colaPalabras.length > 0) {
      const palabraEnTurno = colaPalabras[0];
      setPalabraActual(palabraEnTurno);

      const timer = setTimeout(() => {
        setColaPalabras((colaAnterior) => colaAnterior.slice(1));
      }, 10000); 

      return () => clearTimeout(timer);
    } else {
      setPalabraActual('');
      setEstaTraduciendo(false);
    }
  }, [colaPalabras]);

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col font-sans">
      
      {/* HEADER RESTAURADO */}
      <header className="flex justify-between items-center px-8 py-3 border-b-2 border-[#165c36] bg-white sticky top-0 z-50">
        <div className="text-[#165c36] font-bold text-xl flex items-center gap-2">
          <span className="text-3xl">❉</span> SINCA
        </div>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="text-[#165c36] flex items-center gap-2 text-base font-bold hover:underline transition-all"
        >
          <RiArrowLeftLine className="w-5 h-5" /> Volver al Dashboard
        </button>
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
        
        {/* COLUMNA IZQUIERDA RESTAURADA */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <h1 className="text-2xl font-extrabold text-[#165c36] mb-2 flex items-center gap-2">
              <span className="text-3xl">🤟</span> Traductor 3D
            </h1>
            <p className="text-gray-600 mb-6 text-sm">
              Escribe un texto corto y nuestro avatar lo traducirá a lenguaje de señas básico.
            </p>

            <form onSubmit={handleTraducir} className="flex flex-col gap-4">
              <textarea
                className="w-full h-32 bg-gray-50 border border-gray-300 rounded-2xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#165c36] resize-none"
                placeholder="Ej: Hola, soy Renato y me siento bien"
                value={textoIn}
                onChange={(e) => setTextoIn(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={estaTraduciendo || !textoIn.trim()}
                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white transition-all shadow-md ${estaTraduciendo || !textoIn.trim() ? 'bg-gray-400' : 'bg-[#165c36] hover:bg-[#0f4427]'}`}
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

        {/* COLUMNA DERECHA RESTAURADA */}
        <div className="w-full md:w-2/3 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative min-h-[500px] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
          
          {palabraActual && (
            <div className="absolute top-4 bg-white/80 px-4 py-2 rounded-full font-bold text-[#165c36] z-10 shadow-sm">
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