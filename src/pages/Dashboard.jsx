import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useAccessibility } from "../hooks/useAccessibility";
import { getEmojiPorFoto } from "../avatares";

import {
  RiArrowDownSLine,
  RiLogoutBoxRLine,
  RiSettings3Line,
  RiMicLine,
  RiMovieLine,
  RiShieldCheckLine,
  RiAccessibilityLine,
  RiTeamFill,
  RiEyeLine,
  RiVolumeUpFill,
  RiUser3Line,
  RiHandCoinLine,
} from "react-icons/ri";

import portadaImg from "../assets/portada.jpg";
import accesibilidadImg from "../assets/accesibilidad.png";
import autonomiaImg from "../assets/autonomia.png";
import transcripcionImg from "../assets/transcripcion.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const { tema, modoSimple } = useAccessibility();

  const [openMenu, setOpenMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: "", foto: "" });

  const temaClases = {
    normal: "bg-[#F4F5F7] text-[#343A40]",
    oscuro: "bg-gray-900 text-white",
    alto: "bg-black text-yellow-400",
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login", { replace: true });
      } else {
        setUsuario({
          nombre: user.displayName || "Usuario SINCA",
          foto: user.photoURL || "",
        });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const emojiActual = getEmojiPorFoto(usuario.foto);
  const primerNombre = usuario.nombre.split(" ")[0];

  const irModulo = (ruta) => {
    setOpenMenu(false);
    setOpenUserMenu(false);
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
      titulo: "Módulo Multimedia",
      descripcion:
        "Trabaja con subtítulos, transcripciones y contenido audiovisual accesible.",
      icono: <RiMovieLine />,
      ruta: "/multimedia",
    },
    {
      titulo: "Traductor 3D",
      descripcion:
        "Escribe un texto y un avatar 3D lo traducirá a lenguaje de señas en tiempo real.",
      icono: <RiHandCoinLine />,
      ruta: "/traductor",
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

  const pasos = [
    {
      numero: "1",
      titulo: "Elige tu perfil",
      descripcion:
        "Selecciona el tipo de apoyo que necesitas: visual, auditivo, motor o cognitivo.",
    },
    {
      numero: "2",
      titulo: "Ajusta la plataforma",
      descripcion:
        "Personaliza texto, contraste, voz y subtítulos según tu comodidad.",
    },
    {
      numero: "3",
      titulo: "Navega con autonomía",
      descripcion:
        "Usa los módulos de SINCA con una experiencia adaptada a ti.",
    },
  ];

  const estilosGlobales = (
    <style>
      {`
        @keyframes sincaFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(18px, -26px) scale(1.07); }
        }

        @keyframes sincaOrbit {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(6deg); }
        }

        @keyframes sincaRing {
          0% { transform: scale(1); opacity: .8; }
          100% { transform: scale(2); opacity: 0; }
        }

        .sinca-blob {
          animation: sincaFloat 14s ease-in-out infinite;
        }

        .sinca-orbit {
          animation: sincaOrbit 9s ease-in-out infinite;
        }

        .sinca-ring {
          animation: sincaRing 2.2s ease-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .sinca-blob,
          .sinca-orbit,
          .sinca-ring {
            animation: none !important;
          }
        }
      `}
    </style>
  );
  

  /* DISEÑO NORMAL: cuando el modo simplificado está DESACTIVADO */
  if (!modoSimple) {
    return (
      <div
        className={`min-h-screen overflow-x-hidden font-sans ${
          tema === "alto"
            ? "bg-black text-yellow-400"
            : tema === "oscuro"
              ? "bg-gray-950 text-white"
              : "bg-[#F6F8F6] text-[#152B1E]"
        }`}
      >
        {estilosGlobales}

        <header className="fixed top-4 inset-x-4 md:top-6 md:inset-x-12 z-50">
          <div
            className={`max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-5 md:px-7 py-3 border backdrop-blur-xl shadow-lg ${
              tema === "alto"
                ? "bg-black border-yellow-500"
                : tema === "oscuro"
                  ? "bg-gray-900/90 border-gray-700"
                  : "bg-white/80 border-[#12492F]/10 shadow-[#12492F]/5"
            }`}
          >
            <div
              className={`flex items-center gap-2 font-extrabold text-lg ${
                tema === "alto"
                  ? "text-yellow-400"
                  : tema === "oscuro"
                    ? "text-white"
                    : "text-[#12492F]"
              }`}
            >
              <span className="text-2xl">❉</span>
              SINCA
            </div>

            <nav
              className={`hidden md:flex items-center gap-8 font-semibold text-sm ${
                tema === "alto"
                  ? "text-yellow-400"
                  : tema === "oscuro"
                    ? "text-white"
                    : "text-[#12492F]"
              }`}
            >
              <a href="#modulos" className="hover:opacity-75 transition">
                Módulos
              </a>
              <a href="#como-funciona" className="hover:opacity-75 transition">
                Cómo funciona
              </a>
              <a href="#testimonios" className="hover:opacity-75 transition">
                Testimonios
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <div className="relative md:hidden">
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    tema === "alto"
                      ? "text-yellow-400"
                      : tema === "oscuro"
                        ? "text-white"
                        : "text-[#12492F]"
                  }`}
                >
                  Módulos
                  <RiArrowDownSLine className="text-xl" />
                </button>

                {openMenu && (
                  <div
                    className={`absolute right-0 mt-4 w-72 border rounded-2xl shadow-xl overflow-hidden ${
                      tema === "alto"
                        ? "bg-black border-yellow-500"
                        : tema === "oscuro"
                          ? "bg-gray-900 border-gray-700"
                          : "bg-white border-gray-100"
                    }`}
                  >
                    {modulos.map((modulo) => (
                      <button
                        key={modulo.ruta}
                        onClick={() => irModulo(modulo.ruta)}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition ${
                          tema === "alto"
                            ? "text-yellow-400 hover:bg-gray-900"
                            : tema === "oscuro"
                              ? "text-white hover:bg-gray-800"
                              : "text-[#12492F] hover:bg-[#EAF6EE]"
                        }`}
                      >
                        <span className="text-xl">{modulo.icono}</span>
                        {modulo.titulo}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={`hidden sm:block w-px h-8 ${
                  tema === "oscuro"
                    ? "bg-gray-700"
                    : tema === "alto"
                      ? "bg-yellow-600"
                      : "bg-[#12492F]/15"
                }`}
              />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenUserMenu(!openUserMenu);
                    setOpenMenu(false);
                  }}
                  className={`flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full transition ${
                    tema === "oscuro"
                      ? "hover:bg-gray-800"
                      : tema === "alto"
                        ? "hover:bg-gray-900"
                        : "hover:bg-[#EAF6EE]"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full overflow-hidden border-2 flex items-center justify-center shrink-0 ${
                      tema === "alto"
                        ? "border-yellow-500 bg-black"
                        : tema === "oscuro"
                          ? "border-gray-600 bg-gray-800"
                          : "border-[#12492F] bg-[#EAF6EE]"
                    }`}
                  >
                    {emojiActual ? (
                      <span className="text-xl">{emojiActual}</span>
                    ) : usuario.foto ? (
                      <img
                        src={usuario.foto}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <RiUser3Line
                        className={`text-lg ${
                          tema === "alto"
                            ? "text-yellow-400"
                            : tema === "oscuro"
                              ? "text-white"
                              : "text-[#12492F]"
                        }`}
                      />
                    )}
                  </div>

                  <div className="leading-tight hidden md:block text-left">
                    <p
                      className={`text-[11px] ${
                        tema === "alto"
                          ? "text-yellow-300"
                          : tema === "oscuro"
                            ? "text-gray-400"
                            : "text-gray-500"
                      }`}
                    >
                      ¡Bienvenido/a!
                    </p>
                    <p
                      className={`font-bold text-sm ${
                        tema === "alto"
                          ? "text-yellow-400"
                          : tema === "oscuro"
                            ? "text-white"
                            : "text-[#12492F]"
                      }`}
                    >
                      {primerNombre}
                    </p>
                  </div>

                  <RiArrowDownSLine
                    className={`text-lg transition-transform ${
                      tema === "alto"
                        ? "text-yellow-400"
                        : tema === "oscuro"
                          ? "text-white"
                          : "text-[#12492F]"
                    } ${openUserMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {openUserMenu && (
                  <div
                    className={`absolute right-0 mt-3 w-56 border rounded-xl shadow-lg z-50 overflow-hidden ${
                      tema === "oscuro"
                        ? "bg-gray-900 border-gray-700"
                        : tema === "alto"
                          ? "bg-black border-yellow-500"
                          : "bg-white border-gray-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setOpenUserMenu(false);
                        navigate("/perfil");
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 ${
                        tema === "alto"
                          ? "text-yellow-400 hover:bg-gray-900"
                          : tema === "oscuro"
                            ? "text-white hover:bg-gray-800"
                            : "text-[#343A40] hover:bg-gray-100"
                      }`}
                    >
                      <RiUser3Line
                        className={`text-lg ${
                          tema === "alto"
                            ? "text-yellow-400"
                            : tema === "oscuro"
                              ? "text-white"
                              : "text-[#12492F]"
                        }`}
                      />
                      Mi Perfil
                    </button>

                    <button
                      type="button"
                      onClick={cerrarSesion}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 text-red-600 border-t ${
                        tema === "oscuro"
                          ? "border-gray-700 hover:bg-red-950"
                          : tema === "alto"
                            ? "border-yellow-700 hover:bg-red-950"
                            : "border-gray-100 hover:bg-red-50"
                      }`}
                    >
                      <RiLogoutBoxRLine className="text-lg" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <section className="relative overflow-hidden pt-24 md:pt-28 px-4 md:px-12 pb-10">
          {tema === "normal" && (
            <>
              <div className="sinca-blob absolute w-80 h-80 bg-[#6CC28E]/40 rounded-full -top-20 -left-16 blur-3xl pointer-events-none"></div>
              <div className="sinca-blob absolute w-64 h-64 bg-[#F2A93B]/30 rounded-full bottom-0 right-[12%] blur-3xl pointer-events-none [animation-delay:3s]"></div>
              <div className="sinca-blob absolute w-52 h-52 bg-[#12492F]/10 rounded-full top-1/3 -right-16 blur-3xl pointer-events-none [animation-delay:6s]"></div>
            </>
          )}

          <div
            className={`relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center rounded-[28px] p-8 md:p-14 shadow-xl ${
              tema === "alto"
                ? "bg-black border border-yellow-500"
                : tema === "oscuro"
                  ? "bg-gray-900 border border-gray-700"
                  : "bg-gradient-to-br from-[#EAF6EE] to-white shadow-[#12492F]/5"
            }`}
          >
            <div>
              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-sm mb-5 border ${
                  tema === "alto"
                    ? "bg-black text-yellow-400 border-yellow-500"
                    : tema === "oscuro"
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-white text-[#12492F] border-[#12492F]/15"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#3F9A66] animate-pulse"></span>
                Plataforma inclusiva
              </div>

              <p
                className={`uppercase tracking-widest text-xs font-bold mb-3 ${
                  tema === "alto" ? "text-yellow-400" : "text-[#3F9A66]"
                }`}
              >
                Sistema inclusivo de comunicación y accesibilidad
              </p>

              <h1
                className={`font-extrabold text-4xl md:text-5xl leading-tight mb-5 ${
                  tema === "alto"
                    ? "text-yellow-400"
                    : tema === "oscuro"
                      ? "text-white"
                      : "text-[#0B2F1E]"
                }`}
              >
                ¡Bienvenid@{primerNombre ? ` ${primerNombre}` : ""} a SINCA!
              </h1>

              <p
                className={`text-[15.5px] leading-relaxed max-w-md mb-8 ${
                  tema === "alto"
                    ? "text-yellow-300"
                    : tema === "oscuro"
                      ? "text-gray-300"
                      : "text-[#4B5D53]"
                }`}
              >
                Una plataforma inclusiva diseñada para mejorar la comunicación y
                el acceso a la información de personas con discapacidad visual,
                auditiva, motora y adultos mayores.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/accesibilidad")}
                  className={`flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    tema === "alto"
                      ? "bg-yellow-400 text-black"
                      : "bg-[#12492F] text-white shadow-[#12492F]/25"
                  }`}
                >
                  <RiSettings3Line />
                  Configurar accesibilidad
                </button>

                <button
                  onClick={() => navigate("/multimedia")}
                  className={`flex items-center gap-2 border-2 font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                    tema === "alto"
                      ? "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                      : tema === "oscuro"
                        ? "border-white text-white hover:bg-white hover:text-black"
                        : "border-[#12492F] text-[#12492F] hover:bg-[#12492F] hover:text-white"
                  }`}
                >
                  <RiMovieLine />
                  Ir a multimedia
                </button>
              </div>

              <div
                className={`flex flex-wrap items-center gap-6 mt-9 ${
                  tema === "alto"
                    ? "text-yellow-400"
                    : tema === "oscuro"
                      ? "text-white"
                      : "text-[#0B2F1E]"
                }`}
              >
                <div>
                  <p className="font-extrabold text-2xl">4</p>
                  <p className="text-xs opacity-70 font-medium">
                    Perfiles de accesibilidad
                  </p>
                </div>

                <div className="hidden sm:block w-px h-9 bg-current opacity-20"></div>

                <div>
                  <p className="font-extrabold text-2xl">3</p>
                  <p className="text-xs opacity-70 font-medium">
                    Módulos principales
                  </p>
                </div>

                <div className="hidden sm:block w-px h-9 bg-current opacity-20"></div>

                <div>
                  <p className="font-extrabold text-2xl">100%</p>
                  <p className="text-xs opacity-70 font-medium">Adaptable</p>
                </div>
              </div>
            </div>

            <div className="relative h-72 md:h-80 flex items-center justify-center">
              <div
                className={`w-56 h-56 md:w-64 md:h-64 rounded-[26px] shadow-2xl flex items-center justify-center p-6 ${
                  tema === "alto"
                    ? "bg-black border border-yellow-500"
                    : tema === "oscuro"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white shadow-[#12492F]/15"
                }`}
              >
                <img
                  src={portadaImg}
                  alt="Ilustración de accesibilidad e inclusión digital"
                  className="w-full h-full object-contain"
                />
              </div>

              <div
                className={`sinca-orbit absolute top-2 left-2 md:left-4 w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                  tema === "oscuro"
                    ? "bg-transparent border-2 border-white/70 text-white shadow-none"
                    : tema === "alto"
                      ? "bg-transparent border-2 border-yellow-400 text-yellow-400 shadow-none"
                      : "bg-[#EAF6EE] text-[#12492F] shadow-lg shadow-[#12492F]/10"
                }`}
              >
                <RiEyeLine />
              </div>

              <div
                className={`sinca-orbit absolute top-4 right-0 md:right-2 w-14 h-14 rounded-full flex items-center justify-center text-2xl [animation-duration:11s] [animation-direction:reverse] ${
                  tema === "oscuro"
                    ? "bg-transparent border-2 border-white/70 text-white shadow-none"
                    : tema === "alto"
                      ? "bg-transparent border-2 border-yellow-400 text-yellow-400 shadow-none"
                      : "bg-[#EAF6EE] text-[#12492F] shadow-lg shadow-[#12492F]/10"
                }`}
              >
                <RiVolumeUpFill />
              </div>

              <div
                className={`sinca-orbit absolute bottom-4 left-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl [animation-duration:10s] ${
                  tema === "oscuro"
                    ? "bg-transparent border-2 border-white/70 text-white shadow-none"
                    : tema === "alto"
                      ? "bg-transparent border-2 border-yellow-400 text-yellow-400 shadow-none"
                      : "bg-[#EAF6EE] text-[#12492F] shadow-lg shadow-[#12492F]/10"
                }`}
              >
                <RiAccessibilityLine />
              </div>

              <div
                className={`sinca-orbit absolute bottom-2 right-2 md:right-6 w-14 h-14 rounded-full flex items-center justify-center text-2xl [animation-duration:8s] [animation-direction:reverse] ${
                  tema === "oscuro"
                    ? "bg-transparent border-2 border-white/70 text-white shadow-none"
                    : tema === "alto"
                      ? "bg-transparent border-2 border-yellow-400 text-yellow-400 shadow-none"
                      : "bg-[#EAF6EE] text-[#12492F] shadow-lg shadow-[#12492F]/10"
                }`}
              >
                <RiTeamFill />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-12 py-10 grid md:grid-cols-3 gap-6">
          {beneficios.map((item) => (
            <div
              key={item.titulo}
              className={`rounded-2xl p-6 flex gap-4 shadow-sm transition-all duration-300 hover:-translate-y-2 ${
                tema === "alto"
                  ? "bg-black border border-yellow-500"
                  : tema === "oscuro"
                    ? "bg-gray-900 border border-gray-700"
                    : "bg-white shadow-[#12492F]/5 hover:shadow-xl hover:shadow-[#12492F]/10"
              }`}
            >
              <div className="w-12 h-12 min-w-12 rounded-xl bg-[#EAF6EE] flex items-center justify-center">
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="w-8 h-8 object-contain"
                />
              </div>

              <div>
                <h3
                  className={`font-bold mb-1 ${
                    tema === "alto"
                      ? "text-yellow-400"
                      : tema === "oscuro"
                        ? "text-white"
                        : "text-[#0B2F1E]"
                  }`}
                >
                  {item.titulo}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    tema === "alto"
                      ? "text-yellow-300"
                      : tema === "oscuro"
                        ? "text-gray-400"
                        : "text-[#4B5D53]"
                  }`}
                >
                  {item.descripcion}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section id="modulos" className="max-w-6xl mx-auto px-4 md:px-12 py-10">
          <div className="mb-8">
            <h2
              className={`font-extrabold text-2xl md:text-3xl mb-2 ${
                tema === "alto"
                  ? "text-yellow-400"
                  : tema === "oscuro"
                    ? "text-white"
                    : "text-[#0B2F1E]"
              }`}
            >
              Módulos principales
            </h2>

            <p
              className={`text-sm ${
                tema === "alto"
                  ? "text-yellow-300"
                  : tema === "oscuro"
                    ? "text-gray-400"
                    : "text-[#4B5D53]"
              }`}
            >
              Elige una herramienta para comenzar a usar SINCA.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {modulos.map((modulo) => (
              <button
                key={modulo.ruta}
                onClick={() => navigate(modulo.ruta)}
                className={`group rounded-2xl p-7 relative overflow-hidden text-left border-2 transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                  tema === "alto"
                    ? "bg-black border-yellow-500"
                    : tema === "oscuro"
                      ? "bg-gray-900 border-gray-700 hover:border-gray-500"
                      : "bg-white border-transparent hover:shadow-2xl hover:shadow-[#12492F]/15 hover:border-[#3F9A66]/30"
                }`}
              >
                <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3F9A66] to-[#F2A93B] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>

                <div className="w-14 h-14 rounded-2xl bg-[#EAF6EE] text-[#3F9A66] flex items-center justify-center mb-5 text-3xl transition-transform duration-300 group-hover:scale-110">
                  {modulo.icono}
                </div>

                <h3
                  className={`font-bold text-lg mb-2 ${
                    tema === "alto"
                      ? "text-yellow-400"
                      : tema === "oscuro"
                        ? "text-white"
                        : "text-[#0B2F1E]"
                  }`}
                >
                  {modulo.titulo}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    tema === "alto"
                      ? "text-yellow-300"
                      : tema === "oscuro"
                        ? "text-gray-400"
                        : "text-[#4B5D53]"
                  }`}
                >
                  {modulo.descripcion}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section
          id="como-funciona"
          className="max-w-6xl mx-auto px-4 md:px-12 py-14"
        >
          <div className="text-center mb-10">
            <h2
              className={`font-extrabold text-2xl md:text-3xl mb-2 ${
                tema === "alto"
                  ? "text-yellow-400"
                  : tema === "oscuro"
                    ? "text-white"
                    : "text-[#0B2F1E]"
              }`}
            >
              ¿Cómo funciona?
            </h2>

            <p
              className={`text-sm max-w-lg mx-auto ${
                tema === "alto"
                  ? "text-yellow-300"
                  : tema === "oscuro"
                    ? "text-gray-400"
                    : "text-[#4B5D53]"
              }`}
            >
              Tres pasos simples para adaptar la plataforma a tus necesidades.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-7 left-[16.5%] right-[16.5%] h-0.5 bg-[#12492F]/10"></div>

            {pasos.map((paso) => (
              <div key={paso.numero} className="relative text-center px-4">
                <div
                  className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center font-bold mb-4 relative z-10 shadow-lg ${
                    tema === "alto"
                      ? "bg-yellow-400 text-black"
                      : "bg-[#12492F] text-white shadow-[#12492F]/25"
                  }`}
                >
                  {paso.numero}
                </div>

                <h3
                  className={`font-bold mb-2 ${
                    tema === "alto"
                      ? "text-yellow-400"
                      : tema === "oscuro"
                        ? "text-white"
                        : "text-[#0B2F1E]"
                  }`}
                >
                  {paso.titulo}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    tema === "alto"
                      ? "text-yellow-300"
                      : tema === "oscuro"
                        ? "text-gray-400"
                        : "text-[#4B5D53]"
                  }`}
                >
                  {paso.descripcion}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="testimonios"
          className="max-w-6xl mx-auto px-4 md:px-12 py-14"
        >
          <div
            className={`rounded-[28px] p-10 md:p-14 relative overflow-hidden ${
              tema === "alto"
                ? "bg-black text-yellow-400 border border-yellow-500"
                : tema === "oscuro"
                  ? "bg-gray-900 text-white border border-gray-700"
                  : "bg-[#12492F] text-white"
            }`}
          >
            <span className="absolute -top-8 -left-4 text-white/10 text-[140px] leading-none">
              “
            </span>

            <div className="relative max-w-2xl mx-auto text-center">
              <span className="text-3xl mb-4 inline-block">❉</span>

              <p className="text-xl md:text-2xl leading-snug mb-6 font-semibold">
                SINCA facilita la navegación con herramientas de accesibilidad,
                subtítulos y apoyo mediante voz.
              </p>

              <p className="text-sm opacity-70 font-semibold">
                Plataforma inclusiva — Módulo multimedia
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#12492F]/10 mt-6">
          <div className="max-w-6xl mx-auto px-4 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div
              className={`flex items-center gap-2 font-extrabold ${
                tema === "alto"
                  ? "text-yellow-400"
                  : tema === "oscuro"
                    ? "text-white"
                    : "text-[#12492F]"
              }`}
            >
              <span>❉</span>
              SINCA
            </div>

            <p
              className={`text-xs ${
                tema === "alto"
                  ? "text-yellow-300"
                  : tema === "oscuro"
                    ? "text-gray-400"
                    : "text-[#4B5D53]"
              }`}
            >
              © 2026 SINCA — Sistema Inclusivo de Comunicación y Accesibilidad
            </p>
          </div>
        </footer>
      </div>
    );
  }

  /* DISEÑO SIMPLIFICADO: cuando el modo simplificado está ACTIVADO */
  return (
    <div
      className={`min-h-screen ${
        temaClases[tema] || temaClases.normal
      } flex flex-col font-sans`}
    >
      {estilosGlobales}

      <header
        className={`flex justify-between items-center px-8 py-3 border-b-2 ${
          tema === "alto"
            ? "border-yellow-500 bg-black"
            : tema === "oscuro"
              ? "border-gray-700 bg-gray-900"
              : "border-[#165c36] bg-white"
        } w-full sticky top-0 z-50`}
      >
        <div
          className={`${
            tema === "alto"
              ? "text-yellow-400"
              : tema === "oscuro"
                ? "text-white"
                : "text-[#165c36]"
          } font-bold text-xl flex items-center gap-2`}
        >
          <span className="text-3xl">❉</span>
          SINCA
        </div>

        <div className="flex items-center gap-4">

          {/* MENÚ DE MÓDULOS */}
          <div className="relative">
            <button
              onClick={() => {
                setOpenMenu(!openMenu);
                setOpenUserMenu(false);
              }}
              className={`${
                tema === "alto"
                  ? "text-yellow-400"
                  : tema === "oscuro"
                    ? "text-white"
                    : "text-[#165c36]"
              } font-bold hover:underline flex items-center gap-1`}
            >
              Módulos
              <RiArrowDownSLine className={`text-xl transition-transform ${openMenu ? "rotate-180" : ""}`} />
            </button>

            {openMenu && (
              <div
                className={`absolute right-0 mt-3 w-72 ${
                  tema === "oscuro"
                    ? "bg-gray-800 border-gray-700"
                    : tema === "alto"
                      ? "bg-black border-yellow-500"
                      : "bg-white border-gray-200"
                } border rounded-xl shadow-lg z-50 overflow-hidden`}
              >
                {modulos.map((modulo) => (
                  <button
                    key={modulo.ruta}
                    onClick={() => irModulo(modulo.ruta)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 ${
                      tema === "alto"
                        ? "text-yellow-400 hover:bg-gray-900"
                        : tema === "oscuro"
                          ? "text-white hover:bg-gray-700"
                          : "hover:bg-gray-100"
                    }`}
                  >
                    <span
                      className={`${
                        tema === "alto" ? "text-yellow-400" : "text-[#165c36]"
                      } text-xl`}
                    >
                      {modulo.icono}
                    </span>
                    {modulo.titulo}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DIVISOR */}
          <div
            className={`w-px h-8 ${
              tema === "oscuro"
                ? "bg-gray-700"
                : tema === "alto"
                  ? "bg-yellow-600"
                  : "bg-gray-200"
            }`}
          />

          {/* MENÚ DE USUARIO */}
          <div className="relative">
            <button
              onClick={() => {
                setOpenUserMenu(!openUserMenu);
                setOpenMenu(false);
              }}
              className={`flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full transition ${
                tema === "oscuro"
                  ? "hover:bg-gray-800"
                  : tema === "alto"
                    ? "hover:bg-gray-900"
                    : "hover:bg-green-50"
              }`}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#165c36] flex items-center justify-center bg-green-50 shrink-0">
                {emojiActual ? (
                  <span className="text-xl">{emojiActual}</span>
                ) : usuario.foto ? (
                  <img
                    src={usuario.foto}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <RiUser3Line className="text-lg text-[#165c36]" />
                )}
              </div>

              <div className="leading-tight hidden sm:block text-left">
                <p
                  className={`text-[11px] ${
                    tema === "alto"
                      ? "text-yellow-300"
                      : tema === "oscuro"
                        ? "text-gray-400"
                        : "text-gray-500"
                  }`}
                >
                  ¡Bienvenido/a!
                </p>
                <p
                  className={`font-bold text-sm ${
                    tema === "alto"
                      ? "text-yellow-400"
                      : tema === "oscuro"
                        ? "text-white"
                        : "text-[#165c36]"
                  }`}
                >
                  {primerNombre}
                </p>
              </div>

              <RiArrowDownSLine
                className={`text-lg transition-transform ${
                  tema === "alto"
                    ? "text-yellow-400"
                    : tema === "oscuro"
                      ? "text-white"
                      : "text-[#165c36]"
                } ${openUserMenu ? "rotate-180" : ""}`}
              />
            </button>

            {openUserMenu && (
              <div
                className={`absolute right-0 mt-3 w-56 border rounded-xl shadow-lg z-50 overflow-hidden ${
                  tema === "oscuro"
                    ? "bg-gray-800 border-gray-700"
                    : tema === "alto"
                      ? "bg-black border-yellow-500"
                      : "bg-white border-gray-200"
                }`}
              >
                <button
                  onClick={() => {
                    setOpenUserMenu(false);
                    navigate("/perfil");
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 ${
                    tema === "alto"
                      ? "text-yellow-400 hover:bg-gray-900"
                      : tema === "oscuro"
                        ? "text-white hover:bg-gray-700"
                        : "text-[#343A40] hover:bg-gray-100"
                  }`}
                >
                  <RiUser3Line
                    className={`text-lg ${
                      tema === "alto" ? "text-yellow-400" : "text-[#165c36]"
                    }`}
                  />
                  Mi Perfil
                </button>

                <button
                  onClick={cerrarSesion}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 text-red-600 border-t ${
                    tema === "oscuro"
                      ? "border-gray-700 hover:bg-red-950"
                      : tema === "alto"
                        ? "border-yellow-700 hover:bg-red-950"
                        : "border-gray-100 hover:bg-red-50"
                  }`}
                >
                  <RiLogoutBoxRLine className="text-lg" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <section className="max-w-6xl mx-auto space-y-8">
          <div
            className={`${
              tema === "oscuro"
                ? "bg-gray-800 border-gray-700"
                : tema === "alto"
                  ? "bg-black border-yellow-500"
                  : "bg-gradient-to-r from-white to-green-50 border-gray-200"
            } border rounded-3xl p-8 shadow-sm overflow-hidden`}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span
                  className={`inline-flex items-center gap-2 ${
                    tema === "alto"
                      ? "bg-black text-yellow-400 border-yellow-500"
                      : tema === "oscuro"
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-[#165c36] border-green-100"
                  } px-4 py-2 rounded-full font-bold text-sm mb-4 border shadow-sm`}
                >
                  <RiShieldCheckLine />
                  Plataforma inclusiva
                </span>

                <p
                  className={`text-sm uppercase tracking-widest ${
                    tema === "alto" ? "text-yellow-400" : "text-[#165c36]"
                  } font-bold mb-2`}
                >
                  Sistema Inclusivo de Comunicación y Accesibilidad
                </p>

                <h1
                  className={`text-5xl font-extrabold ${
                    tema === "alto"
                      ? "text-yellow-400"
                      : tema === "oscuro"
                        ? "text-white"
                        : "text-[#165c36]"
                  } mb-4 leading-tight`}
                >
                  ¡Bienvenid@{primerNombre ? ` ${primerNombre}` : ""} a SINCA!
                </h1>

                <p
                  className={`${
                    tema === "alto"
                      ? "text-yellow-300"
                      : tema === "oscuro"
                        ? "text-gray-300"
                        : "text-[#343A40]"
                  } text-lg mb-6 max-w-xl`}
                >
                  Una plataforma inclusiva diseñada para mejorar la comunicación
                  y el acceso a la información de personas con discapacidad
                  visual, auditiva, motora y adultos mayores.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("/accesibilidad")}
                    className={`${
                      tema === "alto"
                        ? "bg-yellow-400 text-black"
                        : "bg-[#165c36] text-white"
                    } px-6 py-3 rounded-xl font-bold hover:bg-[#27500A] transition`}
                  >
                    Configurar accesibilidad
                  </button>

                  <button
                    onClick={() => navigate("/multimedia")}
                    className={`${
                      tema === "alto"
                        ? "bg-black text-yellow-400 border-yellow-400"
                        : tema === "oscuro"
                          ? "bg-gray-800 text-white border-gray-600"
                          : "bg-white text-[#165c36] border-[#165c36]"
                    } px-6 py-3 rounded-xl font-bold border hover:bg-green-50 transition`}
                  >
                    Ir a multimedia
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <div
                  className={`${
                    tema === "alto"
                      ? "bg-black border-yellow-500"
                      : tema === "oscuro"
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-green-100"
                  } rounded-full p-6 shadow-md border`}
                >
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
                className={`${
                  tema === "oscuro"
                    ? "bg-gray-800 border-gray-700"
                    : tema === "alto"
                      ? "bg-black border-yellow-500"
                      : "bg-white border-gray-200"
                } rounded-2xl border p-5 shadow-sm flex items-center gap-4`}
              >
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="w-16 h-16 object-contain"
                />

                <div>
                  <h3
                    className={`font-bold ${
                      tema === "alto"
                        ? "text-yellow-400"
                        : tema === "oscuro"
                          ? "text-white"
                          : "text-black"
                    }`}
                  >
                    {item.titulo}
                  </h3>

                  <p
                    className={`text-sm ${
                      tema === "alto"
                        ? "text-yellow-300"
                        : tema === "oscuro"
                          ? "text-gray-400"
                          : "text-gray-600"
                    }`}
                  >
                    {item.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2
              className={`text-2xl font-bold ${
                tema === "alto"
                  ? "text-yellow-400"
                  : tema === "oscuro"
                    ? "text-white"
                    : "text-black"
              } mb-2`}
            >
              Módulos principales
            </h2>

            <p
              className={`${
                tema === "alto"
                  ? "text-yellow-300"
                  : tema === "oscuro"
                    ? "text-gray-400"
                    : "text-gray-600"
              } mb-5`}
            >
              Elige una herramienta para comenzar a usar SINCA.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {modulos.map((modulo) => (
                <button
                  key={modulo.ruta}
                  onClick={() => navigate(modulo.ruta)}
                  className={`${
                    tema === "oscuro"
                      ? "bg-gray-800 border-gray-700"
                      : tema === "alto"
                        ? "bg-black border-yellow-500"
                        : "bg-white border-gray-200"
                  } border rounded-2xl p-6 text-left shadow-sm hover:border-[#0056B3] hover:shadow-lg hover:-translate-y-1 transition`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${
                      tema === "alto"
                        ? "bg-black border-yellow-500"
                        : tema === "oscuro"
                          ? "bg-gray-700"
                          : "bg-green-50"
                    } text-[#165c36] flex items-center justify-center text-3xl mb-4`}
                  >
                    {modulo.icono}
                  </div>

                  <h3
                    className={`text-lg font-bold ${
                      tema === "alto"
                        ? "text-yellow-400"
                        : tema === "oscuro"
                          ? "text-white"
                          : "text-black"
                    } mb-2`}
                  >
                    {modulo.titulo}
                  </h3>

                  <p
                    className={`text-sm ${
                      tema === "alto"
                        ? "text-yellow-300"
                        : tema === "oscuro"
                          ? "text-gray-400"
                          : "text-gray-600"
                    }`}
                  >
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