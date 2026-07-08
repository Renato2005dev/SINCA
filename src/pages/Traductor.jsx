import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiSendPlaneFill, RiVoiceprintLine } from 'react-icons/ri';
import { OrbitControls, useGLTF, Center, Environment, useAnimations } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

// 1. EL "CEREBRO" DEL TRADUCTOR (Fuera de los componentes)
const diccionarioSenas = {
  // Saludos
  "hola": "hola",
  "buenos": "hola",
  "saludos": "hola",
  
  // Identidad
  "yo": "yo",
  "soy": "yo",
  "me": "yo",
  "mi": "yo",
  "nombre": "yo", 
  
  // Estados
  "bien": "feliz",
  "feliz": "feliz",
  "alegre": "feliz"
};

// 2. COMPONENTE AVATAR (Ahora es dinámico)
// 2. COMPONENTE AVATAR (Arquitectura desacoplada)
// 2. COMPONENTE AVATAR (Arquitectura de Transferencia de Texturas)
function Avatar({ palabra }) {
  const avatarOriginal = useGLTF('/models/avatar.glb');
  const archivoModelo = palabra ? `/models/${palabra}.glb` : '/models/hola.glb';
  const modeloAnimado = useGLTF(archivoModelo);

  const { ref, actions } = useAnimations(modeloAnimado.animations);

  useEffect(() => {
    // Transferencia de materiales inteligente
    modeloAnimado.scene.traverse((parte) => {
      if (parte.isMesh) {
        // Quitamos el posible prefijo 'mixamorig:' para comparar nombres
        const nombreLimpio = parte.name.replace('mixamorig:', '');
        const parteOriginal = avatarOriginal.scene.getObjectByName(nombreLimpio);
        
        if (parteOriginal && parteOriginal.material) {
          parte.material = parteOriginal.material;
        }
      }
    });
  }, [modeloAnimado.scene, avatarOriginal.scene]);

 useEffect(() => {  
    if (!actions || Object.keys(actions).length === 0) return;

    if (palabra) {
      console.log(`¡Animando todas las piezas de: ${palabra}.glb!`);
      // Recorremos y reproducimos TODAS las pistas de animación a la vez
      Object.values(actions).forEach(action => {
        if (action) action.reset().fadeIn(0.2).play();
      });
    } else {
      // Detenemos todas las pistas suavemente
      Object.values(actions).forEach(action => {
        if (action) action.fadeOut(0.5);
      });
    }
  }, [palabra, actions]);

  return (
    <Center>
      <primitive ref={ref} object={modeloAnimado.scene} scale={0.01} position={[0, -1, 0]} />
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

    // Separamos la frase en palabras y limpiamos comas/puntos
    const palabrasLimpias = textoIn.toLowerCase().replace(/[,.]/g, '').split(' ');
    
    // AQUÍ OCURRE LA MAGIA DEL DICCIONARIO:
    // Filtramos la frase para quedarnos solo con las animaciones que sí tenemos
    const palabrasAnimables = palabrasLimpias
      .map(palabra => diccionarioSenas[palabra]) // Busca el alias (ej: "soy" -> "yo")
      .filter(alias => alias !== undefined);     // Descarta las palabras que no existen en el diccionario

    console.log("Cola de archivos a reproducir:", palabrasAnimables);
    
    if (palabrasAnimables.length > 0) {
      setColaPalabras(palabrasAnimables);
    } else {
      // Si el diccionario no entendió nada de la frase, avisa al usuario
      setEstaTraduciendo(false);
      alert("Lo siento, aún no tengo animaciones guardadas para esas palabras.");
    }
  };

  // MOTOR DE SECUENCIA
  useEffect(() => {
    if (colaPalabras.length > 0) {
      const palabraEnTurno = colaPalabras[0];
      setPalabraActual(palabraEnTurno);

      const timer = setTimeout(() => {
        setColaPalabras((colaAnterior) => colaAnterior.slice(1));
      }, 2000); 

      return () => clearTimeout(timer);
    } else {
      setPalabraActual('');
      setEstaTraduciendo(false);
    }
  }, [colaPalabras]);

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col font-sans">
      
      {/* HEADER */}
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

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
        
        {/* COLUMNA IZQUIERDA */}
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

        {/* COLUMNA DERECHA: Escenario 3D */}
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