import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiArrowDownSLine,
  RiLogoutBoxRLine,
  RiSettings3Line,
  RiMicLine,
  RiBookOpenLine,
  RiMovieLine,
  RiShieldCheckLine,
} from "react-icons/ri";

import portadaImg from "../assets/portada.jpg";
import accesibilidadImg from "../assets/accesibilidad.png";
import autonomiaImg from "../assets/autonomia.png";
import transcripcionImg from "../assets/transcripcion.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const irModulo = (ruta) => {
    setOpenMenu(false);
    navigate(ruta);
  };

  const modulos = [
    {
      titulo: "Configuración de Accesibilidad",
      descripcion:
        "Personaliza tamaño de texto, apariencia, subtítulos y modo cognitivo simplificado.",
      icono: <RiSettings3Line />,
      ruta: "/accesibilidad",
    },
    {
      titulo: "Asistente de Voz",
      descripcion:
        "Convierte voz a texto para facilitar la comunicación en tiempo real.",
      icono: <RiMicLine />,
      ruta: "/asistente",
    },
    {
      titulo: "Lectura Accesible",
      descripcion:
        "Permite leer información con apoyo visual, auditivo y controles claros.",
      icono: <RiBookOpenLine />,
      ruta: "/lectura",
    },
    {
      titulo: "Módulo Multimedia",
      descripcion:
        "Trabaja con subtítulos, transcripciones y contenido audiovisual accesible.",
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
    <div className="min-h-screen bg-[#F4F5F7] text-[#343A40] flex flex-col font-sans">
      <header className="flex justify-between items-center px-8 py-3 border-b-2 border-[#165c36] bg-white w-full sticky top-0 z-50">
        <div className="text-[#165c36] font-bold text-xl flex items-center gap-2">
          <span className="text-3xl">❉</span>
          SINCA
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="text-[#165c36] font-bold hover:underline flex items-center gap-1"
            >
              Módulos
              <RiArrowDownSLine className="text-xl" />
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {modulos.map((modulo) => (
                  <button
                    key={modulo.ruta}
                    onClick={() => irModulo(modulo.ruta)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3"
                  >
                    <span className="text-[#165c36] text-xl">
                      {modulo.icono}
                    </span>
                    {modulo.titulo}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/login")}
            className="text-[#165c36] font-bold hover:underline flex items-center gap-1"
          >
            <RiLogoutBoxRLine />
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <section className="max-w-6xl mx-auto space-y-8">
          <div className="bg-gradient-to-r from-white to-green-50 border border-gray-200 rounded-3xl p-8 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 bg-white text-[#165c36] px-4 py-2 rounded-full font-bold text-sm mb-4 border border-green-100 shadow-sm">
                  <RiShieldCheckLine />
                  Plataforma inclusiva
                </span>

                <p className="text-sm uppercase tracking-widest text-[#165c36] font-bold mb-2">
                  Sistema Inclusivo de Comunicación y Accesibilidad
                </p>

                <h1 className="text-5xl font-extrabold text-[#165c36] mb-4 leading-tight">
                  Bienvenido a SINCA
                </h1>

                <p className="text-[#343A40] text-lg mb-6 max-w-xl">
                  Una plataforma inclusiva diseñada para mejorar la
                  comunicación y el acceso a la información de personas con
                  discapacidad visual, auditiva, motora y adultos mayores.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("/accesibilidad")}
                    className="bg-[#165c36] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#27500A] transition"
                  >
                    Configurar accesibilidad
                  </button>

                  <button
                    onClick={() => navigate("/multimedia")}
                    className="bg-white text-[#165c36] px-6 py-3 rounded-xl font-bold border border-[#165c36] hover:bg-green-50 transition"
                  >
                    Ir a multimedia
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="bg-white rounded-full p-6 shadow-md border border-green-100">
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
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center gap-4"
              >
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="w-16 h-16 object-contain"
                />

                <div>
                  <h3 className="font-bold text-black">{item.titulo}</h3>
                  <p className="text-sm text-gray-600">{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black mb-2">
              Módulos principales
            </h2>
            <p className="text-gray-600 mb-5">
              Elige una herramienta para comenzar a usar SINCA.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {modulos.map((modulo) => (
                <button
                  key={modulo.ruta}
                  onClick={() => navigate(modulo.ruta)}
                  className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:border-[#0056B3] hover:shadow-lg hover:-translate-y-1 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-[#165c36] flex items-center justify-center text-3xl mb-4">
                    {modulo.icono}
                  </div>

                  <h3 className="text-lg font-bold text-black mb-2">
                    {modulo.titulo}
                  </h3>

                  <p className="text-sm text-gray-600">{modulo.descripcion}</p>
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