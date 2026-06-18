import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; 
import { useAccessibility } from "../hooks/useAccessibility";

import {
  RiArrowDownSLine,
  RiLogoutBoxRLine,
  RiSettings3Line,
  RiMicLine,
  RiMovieLine,
  RiShieldCheckLine,
} from "react-icons/ri";

import portadaImg from "../assets/portada.jpg";
import accesibilidadImg from "../assets/accesibilidad.png";
import autonomiaImg from "../assets/autonomia.png";
import transcripcionImg from "../assets/transcripcion.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const { tema } = useAccessibility();
  const [openMenu, setOpenMenu] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');

  const temaClases = {
    normal: "bg-[#F4F5F7] text-[#343A40]",
    oscuro: "bg-gray-900 text-white",
    alto: "bg-black text-yellow-400",
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login', { replace: true });
      } else {
        const nombreCompleto = user.displayName;
        const primerNombre = nombreCompleto ? nombreCompleto.split(' ')[0] : '';
        setNombreUsuario(primerNombre);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const irModulo = (ruta) => {
    setOpenMenu(false);
    navigate(ruta);
  };

  const modulos = [
    {
      titulo: "Configuración de Accesibilidad",
      descripcion: "Personaliza tamaño de texto, apariencia, subtítulos y modo cognitivo simplificado.",
      icono: <RiSettings3Line />,
      ruta: "/accesibilidad",
    },
    {
      titulo: "Asistente de Voz",
      descripcion: "Convierte voz a texto para facilitar la comunicación en tiempo real.",
      icono: <RiMicLine />,
      ruta: "/asistente",
    },
    {
      titulo: "Módulo Multimedia",
      descripcion: "Trabaja con subtítulos, transcripciones y contenido audiovisual accesible.",
      icono: <RiMovieLine />,
      ruta: "/multimedia",
    },
  ];

  const beneficios = [
    {
      titulo: "Accesibilidad visual",
      descripcion: "Ajustes de lectura, contraste y tamaño de texto.",
      imagen: accesibilidadImg,
    },
    {
      titulo: "Autonomía digital",
      descripcion: "Herramientas simples para usar la web con mayor facilidad.",
      imagen: autonomiaImg,
    },
    {
      titulo: "Comunicación inclusiva",
      descripcion: "Apoyo mediante voz, subtítulos y transcripciones.",
      imagen: transcripcionImg,
    },
  ];

  return (
    <div className={`min-h-screen ${temaClases[tema] || temaClases.normal} flex flex-col font-sans`}>
      <header className={`flex justify-between items-center px-8 py-3 border-b-2 ${tema === "alto" ? "border-yellow-500 bg-black" : tema === "oscuro" ? "border-gray-700 bg-gray-900" : "border-[#165c36] bg-white"} w-full sticky top-0 z-50`}>
        <div className={`${tema === "alto" ? "text-yellow-400" : tema === "oscuro" ? "text-white" : "text-[#165c36]"} font-bold text-xl flex items-center gap-2`}>
          <span className="text-3xl">❉</span>
          SINCA
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className={`${tema === "alto" ? "text-yellow-400" : tema === "oscuro" ? "text-white" : "text-[#165c36]"} font-bold hover:underline flex items-center gap-1`}
            >
              Módulos
              <RiArrowDownSLine className="text-xl" />
            </button>

            {openMenu && (
              <div className={`absolute right-0 mt-3 w-72 ${tema === "oscuro" ? "bg-gray-800 border-gray-700" : tema === "alto" ? "bg-black border-yellow-500" : "bg-white border-gray-200"} border rounded-xl shadow-lg z-50 overflow-hidden`}>
                {modulos.map((modulo) => (
                  <button
                    key={modulo.ruta}
                    onClick={() => irModulo(modulo.ruta)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 ${tema === "alto" ? "text-yellow-400 hover:bg-gray-900" : tema === "oscuro" ? "text-white hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    <span className={`${tema === "alto" ? "text-yellow-400" : "text-[#165c36]"} text-xl`}>
                      {modulo.icono}
                    </span>
                    {modulo.titulo}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={`${tema === "alto" ? "text-yellow-400" : tema === "oscuro" ? "text-white" : "text-[#165c36]"} font-bold hover:underline flex items-center gap-1`}
          >
            <RiLogoutBoxRLine />
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <section className="max-w-6xl mx-auto space-y-8">
          <div className={`${tema === "oscuro" ? "bg-gray-800 border-gray-700" : tema === "alto" ? "bg-black border-yellow-500" : "bg-gradient-to-r from-white to-green-50 border-gray-200"} border rounded-3xl p-8 shadow-sm overflow-hidden`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className={`inline-flex items-center gap-2 ${tema === "alto" ? "bg-black text-yellow-400 border-yellow-500" : tema === "oscuro" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-[#165c36] border-green-100"} px-4 py-2 rounded-full font-bold text-sm mb-4 border shadow-sm`}>
                  <RiShieldCheckLine />
                  Plataforma inclusiva
                </span>

                <p className={`text-sm uppercase tracking-widest ${tema === "alto" ? "text-yellow-400" : "text-[#165c36]"} font-bold mb-2`}>
                  Sistema Inclusivo de Comunicación y Accesibilidad
                </p>

                <h1 className={`text-5xl font-extrabold ${tema === "alto" ? "text-yellow-400" : "text-[#165c36]"} mb-4 leading-tight`}>
                  ¡Bienvenid@{nombreUsuario ? ` ${nombreUsuario}` : ''} a SINCA!
                </h1>

                <p className={`${tema === "alto" ? "text-yellow-300" : tema === "oscuro" ? "text-gray-300" : "text-[#343A40]"} text-lg mb-6 max-w-xl`}>
                  Una plataforma inclusiva diseñada para mejorar la comunicación y el acceso a la información de personas con discapacidad visual, auditiva, motora y adultos mayores.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("/accesibilidad")}
                    className={`${tema === "alto" ? "bg-yellow-400 text-black" : "bg-[#165c36] text-white"} px-6 py-3 rounded-xl font-bold hover:bg-[#27500A] transition`}
                  >
                    Configurar accesibilidad
                  </button>

                  <button
                    onClick={() => navigate("/multimedia")}
                    className={`${tema === "alto" ? "bg-black text-yellow-400 border-yellow-400" : tema === "oscuro" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-[#165c36] border-[#165c36]"} px-6 py-3 rounded-xl font-bold border hover:bg-green-50 transition`}
                  >
                    Ir a multimedia
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <div className={`${tema === "alto" ? "bg-black border-yellow-500" : tema === "oscuro" ? "bg-gray-700 border-gray-600" : "bg-white border-green-100"} rounded-full p-6 shadow-md border`}>
                  <img
                    src={portadaImg}
                    alt="Ilustración de accesibilidad e inclusión digital"
                    className="w-full max-w-md object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {beneficios.map((item) => (
              <div
                key={item.titulo}
                className={`${tema === "oscuro" ? "bg-gray-800 border-gray-700" : tema === "alto" ? "bg-black border-yellow-500" : "bg-white border-gray-200"} rounded-2xl border p-5 shadow-sm flex items-center gap-4`}
              >
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="w-16 h-16 object-contain"
                />

                <div>
                  <h3 className={`font-bold ${tema === "alto" ? "text-yellow-400" : "text-black"}`}>{item.titulo}</h3>
                  <p className={`text-sm ${tema === "alto" ? "text-yellow-300" : tema === "oscuro" ? "text-gray-400" : "text-gray-600"}`}>{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className={`text-2xl font-bold ${tema === "alto" ? "text-yellow-400" : "text-black"} mb-2`}>
              Módulos principales
            </h2>
            <p className={`${tema === "alto" ? "text-yellow-300" : tema === "oscuro" ? "text-gray-400" : "text-gray-600"} mb-5`}>
              Elige una herramienta para comenzar a usar SINCA.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {modulos.map((modulo) => (
                <button
                  key={modulo.ruta}
                  onClick={() => navigate(modulo.ruta)}
                  className={`${tema === "oscuro" ? "bg-gray-800 border-gray-700" : tema === "alto" ? "bg-black border-yellow-500" : "bg-white border-gray-200"} border rounded-2xl p-6 text-left shadow-sm hover:border-[#0056B3] hover:shadow-lg hover:-translate-y-1 transition`}
                >
                  <div className={`w-12 h-12 rounded-xl ${tema === "alto" ? "bg-black border-yellow-500" : tema === "oscuro" ? "bg-gray-700" : "bg-green-50"} text-[#165c36] flex items-center justify-center text-3xl mb-4`}>
                    {modulo.icono}
                  </div>

                  <h3 className={`text-lg font-bold ${tema === "alto" ? "text-yellow-400" : "text-black"} mb-2`}>
                    {modulo.titulo}
                  </h3>

                  <p className={`text-sm ${tema === "alto" ? "text-yellow-300" : tema === "oscuro" ? "text-gray-400" : "text-gray-600"}`}>
                    {modulo.descripcion}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;