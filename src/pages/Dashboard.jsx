import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiArrowDownSLine,
  RiLogoutBoxRLine,
  RiSettings3Line,
  RiMicLine,
  RiBookOpenLine,
  RiMovieLine,
  RiHome4Line,
} from "react-icons/ri";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const fontSize = localStorage.getItem("sinca-fontSize") || "16";
  const theme = localStorage.getItem("sinca-theme") || "normal";
  const subtitulos = localStorage.getItem("sinca-subs") === "true";
  const modoSimple = localStorage.getItem("sinca-modo") === "true";

  const irModulo = (ruta) => {
    setOpenMenu(false);
    navigate(ruta);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-[#343A40] flex flex-col font-sans">
      <header className="flex justify-between items-center px-8 py-3 border-b-2 border-[#165c36] bg-white w-full">
        <div className="text-[#165c36] font-bold text-xl flex items-center gap-2">
          <span className="text-3xl">❉</span>
          SINCA
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-[#165c36] font-bold hover:underline flex items-center gap-1"
          >
            <RiHome4Line />
            Inicio
          </button>

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
                <button
                  onClick={() => irModulo("/accesibilidad")}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3"
                >
                  <RiSettings3Line className="text-[#165c36]" />
                  Configuración de Accesibilidad
                </button>

                <button
                  onClick={() => irModulo("/asistente")}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3"
                >
                  <RiMicLine className="text-[#165c36]" />
                  Asistente de Voz
                </button>

                <button
                  onClick={() => irModulo("/lectura")}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3"
                >
                  <RiBookOpenLine className="text-[#165c36]" />
                  Lectura Accesible
                </button>

                <button
                  onClick={() => irModulo("/multimedia")}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3"
                >
                  <RiMovieLine className="text-[#165c36]" />
                  Módulo Multimedia
                </button>
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
        <section className="max-w-5xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-6">
            <h1 className="text-3xl font-bold text-black mb-3">
              Bienvenido a SINCA
            </h1>

            <p className="text-[#343A40] text-lg max-w-3xl">
              Plataforma inclusiva diseñada para mejorar la comunicación y el
              acceso a la información de personas con discapacidad visual,
              auditiva, motora y adultos mayores.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-[#165c36] mb-4">
              Perfil de accesibilidad activo
            </h2>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="border rounded-xl p-4 bg-gray-50">
                <p className="font-bold text-black">Tamaño de texto</p>
                <p>{fontSize}px</p>
              </div>

              <div className="border rounded-xl p-4 bg-gray-50">
                <p className="font-bold text-black">Tema visual</p>
                <p>{theme}</p>
              </div>

              <div className="border rounded-xl p-4 bg-gray-50">
                <p className="font-bold text-black">Subtítulos</p>
                <p>{subtitulos ? "Activados" : "Desactivados"}</p>
              </div>

              <div className="border rounded-xl p-4 bg-gray-50">
                <p className="font-bold text-black">Modo simple</p>
                <p>{modoSimple ? "Activado" : "Desactivado"}</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-black mb-4">
            Módulos principales
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => navigate("/accesibilidad")}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:border-[#0056B3] hover:shadow-md transition"
            >
              <RiSettings3Line className="text-4xl text-[#165c36] mb-3" />
              <h3 className="text-xl font-bold text-black mb-2">
                Configuración de Accesibilidad
              </h3>
              <p>
                Personaliza tamaño de texto, apariencia, subtítulos y modo
                cognitivo simplificado.
              </p>
            </button>

            <button
              onClick={() => navigate("/asistente")}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:border-[#0056B3] hover:shadow-md transition"
            >
              <RiMicLine className="text-4xl text-[#165c36] mb-3" />
              <h3 className="text-xl font-bold text-black mb-2">
                Asistente de Voz
              </h3>
              <p>
                Convierte voz a texto para facilitar la comunicación en tiempo
                real.
              </p>
            </button>

            <button
              onClick={() => navigate("/lectura")}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:border-[#0056B3] hover:shadow-md transition"
            >
              <RiBookOpenLine className="text-4xl text-[#165c36] mb-3" />
              <h3 className="text-xl font-bold text-black mb-2">
                Lectura Accesible
              </h3>
              <p>
                Permite leer información con apoyo visual, auditivo y controles
                claros.
              </p>
            </button>

            <button
              onClick={() => navigate("/multimedia")}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:border-[#0056B3] hover:shadow-md transition"
            >
              <RiMovieLine className="text-4xl text-[#165c36] mb-3" />
              <h3 className="text-xl font-bold text-black mb-2">
                Módulo Multimedia
              </h3>
              <p>
                Permite trabajar con subtítulos, descripciones y contenido
                audiovisual accesible.
              </p>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;