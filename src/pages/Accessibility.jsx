import {
  RiArrowLeftLine,
  RiBrainLine,
  RiContrastFill,
  RiMoonFill,
  RiQrScanLine,
  RiRefreshLine,
  RiSunLine,
} from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccessibility } from "../hooks/useAccessibility";

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-300 ${
      checked ? "bg-[#3F9A66]" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const Accessibility = () => {
  const navigate = useNavigate();

  const {
    tema,
    cambiarTema,
    fontSize,
    cambiarFontSize,
    modoSimple,
    cambiarModoSimple,
    readingMask,
    cambiarReadingMask,
    resetearAccesibilidad,
  } = useAccessibility();

  const [sliderValue, setSliderValue] = useState(fontSize);

  const MIN = 12;
  const MAX = 32;
  const percent = ((sliderValue - MIN) / (MAX - MIN)) * 100;
  const sizePercent = Math.round((sliderValue / 16) * 100);

  const handleAplicar = () => {
    cambiarFontSize(sliderValue);
    alert("Tamaño de texto aplicado y guardado.");
  };

  const handleTemaChange = (nuevoTema) => {
    cambiarTema(nuevoTema);
  };

  const handleModoChange = (valor) => {
    cambiarModoSimple(valor);
  };

  const handleReadingMaskChange = (valor) => {
    cambiarReadingMask(valor);
  };

  const handleReset = () => {
    setSliderValue(16);
    resetearAccesibilidad();
  };

  const temaClases = {
    normal: "bg-gray-100 text-gray-900",
    oscuro: "bg-gray-900 text-white",
    alto: "bg-black text-yellow-400",
  };

  const cardClases = {
    normal: "bg-white border-gray-200",
    oscuro: "bg-gray-800 border-gray-700",
    alto: "bg-black border-yellow-500",
  };

  const muted = {
    normal: "text-gray-500",
    oscuro: "text-gray-400",
    alto: "text-yellow-300",
  };

  const temaClase = temaClases[tema] || temaClases.normal;
  const card = cardClases[tema] || cardClases.normal;
  const textMuted = muted[tema] || muted.normal;

  const estilosGlobales = (
    <style>
      {`
        @keyframes sincaFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(18px, -24px) scale(1.06); }
        }

        @keyframes sincaSpinSlow {
          to { transform: rotate(360deg); }
        }

        @keyframes sincaPulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.7); opacity: .4; }
        }

        .sinca-blob {
          animation: sincaFloat 14s ease-in-out infinite;
          filter: blur(60px);
        }

        .sinca-spin-slow {
          animation: sincaSpinSlow 18s linear infinite;
        }

        .sinca-pulse-dot {
          animation: sincaPulseDot 1.6s ease-in-out infinite;
        }

        .sinca-texture {
          background-image: radial-gradient(circle at 1px 1px, rgba(18,73,47,0.06) 1px, transparent 0);
          background-size: 22px 22px;
        }

        @media (prefers-reduced-motion: reduce) {
          .sinca-blob,
          .sinca-spin-slow,
          .sinca-pulse-dot {
            animation: none !important;
          }
        }
      `}
    </style>
  );

  const aparienciaOpciones = [
    {
      valor: "normal",
      titulo: "Normal",
      icono: <RiSunLine className="w-6 h-6" />,
    },
    {
      valor: "oscuro",
      titulo: "Oscuro",
      icono: <RiMoonFill className="w-6 h-6" />,
    },
    {
      valor: "alto",
      titulo: "Alto contraste",
      icono: <RiContrastFill className="w-6 h-6" />,
    },
  ];

  if (!modoSimple) {
    return (
      <div
        className={`min-h-screen overflow-x-hidden font-sans sinca-texture ${
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
            className={`max-w-5xl mx-auto flex items-center justify-between rounded-2xl px-5 md:px-7 py-3 border backdrop-blur-xl shadow-lg ${
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

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className={`flex items-center gap-1.5 text-sm font-bold transition-transform duration-300 hover:-translate-x-1 ${
                tema === "alto"
                  ? "text-yellow-400"
                  : tema === "oscuro"
                    ? "text-white"
                    : "text-[#12492F]"
              }`}
            >
              <RiArrowLeftLine className="w-5 h-5" />
              Volver al Inicio
            </button>
          </div>
        </header>

        {tema === "normal" && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="sinca-blob absolute w-72 h-72 bg-[#6CC28E]/25 rounded-full top-24 -left-20" />
            <div className="sinca-blob absolute w-56 h-56 bg-[#F2A93B]/20 rounded-full top-[45%] -right-16 [animation-delay:4s]" />
            <div className="sinca-blob absolute w-44 h-44 bg-sky-300/15 rounded-full top-[30%] right-[8%] [animation-delay:8s]" />
          </div>
        )}

        <main className="relative max-w-5xl mx-auto px-4 md:px-6 pt-28 md:pt-32 pb-24">
          <section
            className={`relative overflow-hidden rounded-[24px] p-7 md:p-9 mb-8 shadow-xl ${
              tema === "alto"
                ? "bg-black border border-yellow-500"
                : tema === "oscuro"
                  ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700"
                  : "bg-gradient-to-br from-[#12492F] via-[#12492F] to-[#3F9A66]/80 shadow-[#12492F]/20"
            }`}
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-[#F2A93B]/20 blur-2xl" />

            <RiBrainLine className="sinca-spin-slow absolute -right-4 -bottom-6 text-white/10 text-[150px]" />

            <div className="relative flex items-start gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-11 h-11 min-w-11 rounded-xl bg-white/15 backdrop-blur border border-white/20 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-x-1 hover:bg-white/25"
              >
                <RiArrowLeftLine className="w-5 h-5" />
              </button>

              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/20 rounded-full px-3 py-1 text-[11px] font-bold text-white mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2A93B] sinca-pulse-dot" />
                  Configuración activa
                </div>

                <h1 className="font-extrabold text-2xl md:text-3xl text-white">
                  Configuración de Accesibilidad
                </h1>

                <p className="text-sm text-white/75 mt-1 max-w-md">
                  Personaliza SINCA para que se adapte perfectamente a tus
                  necesidades.
                </p>
              </div>

              <div className="hidden md:flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 rounded-xl px-4 py-2">
                  <span className="text-[#F2A93B] text-lg">⚡</span>
                  <span className="text-xs font-bold text-white">
                    Ajustes disponibles
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section
            className={`relative overflow-hidden rounded-2xl p-6 md:p-8 mb-6 border shadow-sm transition-shadow duration-300 hover:shadow-xl ${
              tema === "alto"
                ? "bg-black border-yellow-500"
                : tema === "oscuro"
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-white shadow-[#12492F]/5 hover:shadow-[#12492F]/10"
            }`}
          >
            <span className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-[#F2A93B] to-orange-400" />
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br from-[#F2A93B]/25 to-transparent pointer-events-none" />

            <div className="relative flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F2A93B] to-orange-400 flex items-center justify-center shadow-md shadow-orange-300/30">
                  <span className="text-white font-extrabold text-xl">A</span>
                </div>

                <h2
                  className={`font-bold text-lg ${
                    tema === "alto"
                      ? "text-yellow-400"
                      : tema === "oscuro"
                        ? "text-white"
                        : "text-[#0B2F1E]"
                  }`}
                >
                  Tamaño de texto
                </h2>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  tema === "alto"
                    ? "bg-black border border-yellow-500 text-yellow-400"
                    : tema === "oscuro"
                      ? "bg-gray-800 text-white"
                      : "bg-[#EAF6EE] text-[#12492F]"
                }`}
              >
                {sizePercent}%
              </span>
            </div>

            <p
              className={`text-xs mb-5 ml-14 ${
                tema === "alto"
                  ? "text-yellow-300"
                  : tema === "oscuro"
                    ? "text-gray-400"
                    : "text-[#4B5D53]"
              }`}
            >
              Ajusta el tamaño del texto en toda la aplicación.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-bold opacity-60">A</span>

              <button
                type="button"
                onClick={() => setSliderValue((v) => Math.max(MIN, v - 1))}
                className="w-9 h-9 rounded-lg bg-[#12492F] text-white flex items-center justify-center font-bold transition-transform duration-200 hover:scale-110 active:scale-95"
              >
                −
              </button>

              <div className="relative flex-1 h-6 flex items-center">
                <div
                  className={`absolute w-full h-1.5 rounded-full ${
                    tema === "oscuro" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />

                <div
                  className="absolute h-1.5 bg-gradient-to-r from-[#3F9A66] to-[#F2A93B] rounded-full"
                  style={{ width: `${percent}%` }}
                />

                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div
                  className="absolute w-6 h-6 bg-[#12492F] rounded-full border-4 border-white shadow-md pointer-events-none"
                  style={{ left: `calc(${percent}% - 12px)` }}
                />
              </div>

              <button
                type="button"
                onClick={() => setSliderValue((v) => Math.min(MAX, v + 1))}
                className="w-9 h-9 rounded-lg bg-[#12492F] text-white flex items-center justify-center font-bold transition-transform duration-200 hover:scale-110 active:scale-95"
              >
                +
              </button>

              <span
                className={`text-xl font-bold ${
                  tema === "alto"
                    ? "text-yellow-400"
                    : tema === "oscuro"
                      ? "text-white"
                      : "text-[#0B2F1E]"
                }`}
              >
                A
              </span>
            </div>

            <p
              className={`text-xs mb-2 ${
                tema === "alto"
                  ? "text-yellow-300"
                  : tema === "oscuro"
                    ? "text-gray-400"
                    : "text-[#4B5D53]"
              }`}
            >
              Vista previa de tamaño de texto
            </p>

            <div
              className={`border rounded-xl p-5 transition-all duration-300 ${
                tema === "alto"
                  ? "bg-black border-yellow-500"
                  : tema === "oscuro"
                    ? "bg-gray-950 border-gray-700"
                    : "bg-gradient-to-br from-[#EAF6EE] to-white border-[#12492F]/10"
              }`}
            >
              <p
                style={{ fontSize: `${sliderValue}px` }}
                className="leading-relaxed transition-all duration-300"
              >
                Este es un ejemplo de cómo se verá el texto en la aplicación con
                el tamaño seleccionado.
              </p>
            </div>

            <div className="flex justify-end mt-5">
              <button
                type="button"
                onClick={handleAplicar}
                className="flex items-center gap-2 bg-gradient-to-r from-[#12492F] to-[#3F9A66] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-[#12492F]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span>✓</span>
                Aplicar
              </button>
            </div>
          </section>

          <section
            className={`relative overflow-hidden rounded-2xl p-6 md:p-8 mb-6 border shadow-sm transition-shadow duration-300 hover:shadow-xl ${
              tema === "alto"
                ? "bg-black border-yellow-500"
                : tema === "oscuro"
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-white shadow-[#12492F]/5 hover:shadow-[#12492F]/10"
            }`}
          >
            <span className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-sky-400 to-blue-500" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-gradient-to-br from-sky-300/25 to-transparent pointer-events-none" />

            <div className="relative flex items-center gap-3 mb-1">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-md shadow-sky-300/40">
                <RiContrastFill className="w-6 h-6 text-white" />
              </div>

              <h2
                className={`font-bold text-lg ${
                  tema === "alto"
                    ? "text-yellow-400"
                    : tema === "oscuro"
                      ? "text-white"
                      : "text-[#0B2F1E]"
                }`}
              >
                Apariencia
              </h2>
            </div>

            <p
              className={`text-xs mb-5 ml-14 ${
                tema === "alto"
                  ? "text-yellow-300"
                  : tema === "oscuro"
                    ? "text-gray-400"
                    : "text-[#4B5D53]"
              }`}
            >
              Elige el modo visual para mejor visibilidad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {aparienciaOpciones.map((opcion) => {
                const activo = tema === opcion.valor;

                return (
                  <button
                    key={opcion.valor}
                    type="button"
                    onClick={() => handleTemaChange(opcion.valor)}
                    className={`relative border-2 rounded-xl py-6 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${
                      activo
                        ? tema === "alto"
                          ? "bg-black border-yellow-400 text-yellow-400 shadow-lg shadow-yellow-500/10"
                          : tema === "oscuro"
                            ? "bg-gray-950 border-white text-white shadow-lg shadow-black/20"
                            : "bg-white border-[#12492F] text-[#0B2F1E] shadow-lg shadow-[#12492F]/15"
                        : tema === "alto"
                          ? "bg-black border-yellow-500/40 text-yellow-300 hover:border-yellow-400"
                          : tema === "oscuro"
                            ? "bg-gray-950 border-gray-700 text-gray-400 hover:border-gray-500"
                            : "bg-white border-[#12492F]/10 text-[#5B6B62] hover:border-[#3F9A66]/40"
                    }`}
                  >
                    {activo && opcion.valor === "normal" && (
                      <span className="absolute -top-2.5 bg-[#3F9A66] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        Recomendado
                      </span>
                    )}

                    <span
                      className={
                        activo
                          ? tema === "normal"
                            ? "text-[#F2A93B]"
                            : tema === "alto"
                              ? "text-yellow-400"
                              : "text-white"
                          : ""
                      }
                    >
                      {opcion.icono}
                    </span>

                    <span
                      className={`text-sm ${activo ? "font-bold" : "font-semibold"}`}
                    >
                      {opcion.titulo}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <section
              className={`relative overflow-hidden rounded-2xl p-6 border shadow-sm transition-shadow duration-300 hover:shadow-xl ${
                tema === "alto"
                  ? "bg-black border-yellow-500"
                  : tema === "oscuro"
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-white shadow-[#12492F]/5 hover:shadow-[#12492F]/10"
              }`}
            >
              <span className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-violet-400 to-purple-500" />
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-violet-300/25 to-transparent pointer-events-none" />

              <div className="relative flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md shadow-violet-300/40">
                  <RiBrainLine className="w-6 h-6 text-white" />
                </div>

                <h2
                  className={`font-bold text-base ${
                    tema === "alto"
                      ? "text-yellow-400"
                      : tema === "oscuro"
                        ? "text-white"
                        : "text-[#0B2F1E]"
                  }`}
                >
                  Modo cognitivo simplificado
                </h2>
              </div>

              <div
                className={`relative flex items-center justify-between rounded-xl px-5 py-4 ${
                  tema === "alto"
                    ? "bg-black border border-yellow-500"
                    : tema === "oscuro"
                      ? "bg-gray-950 border border-gray-700"
                      : "bg-violet-50 hover:bg-violet-100/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                      tema === "oscuro" ? "bg-gray-900" : "bg-white"
                    }`}
                  >
                    <RiBrainLine className="w-5 h-5 text-violet-500" />
                  </div>

                  <span
                    className={`font-semibold text-sm ${
                      tema === "alto"
                        ? "text-yellow-400"
                        : tema === "oscuro"
                          ? "text-white"
                          : "text-[#0B2F1E]"
                    }`}
                  >
                    Modo simplificado
                  </span>
                </div>

                <Toggle checked={modoSimple} onChange={handleModoChange} />
              </div>
            </section>

            <section
              className={`relative overflow-hidden rounded-2xl p-6 border shadow-sm transition-shadow duration-300 hover:shadow-xl ${
                tema === "alto"
                  ? "bg-black border-yellow-500"
                  : tema === "oscuro"
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-white shadow-[#12492F]/5 hover:shadow-[#12492F]/10"
              }`}
            >
              <span className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-teal-400 to-cyan-500" />
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-teal-300/25 to-transparent pointer-events-none" />

              <div className="relative flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md shadow-teal-300/40">
                  <RiQrScanLine className="w-6 h-6 text-white" />
                </div>

                <h2
                  className={`font-bold text-base ${
                    tema === "alto"
                      ? "text-yellow-400"
                      : tema === "oscuro"
                        ? "text-white"
                        : "text-[#0B2F1E]"
                  }`}
                >
                  Máscara de lectura
                </h2>
              </div>

              <div
                className={`relative flex items-center justify-between rounded-xl px-5 py-4 ${
                  tema === "alto"
                    ? "bg-black border border-yellow-500"
                    : tema === "oscuro"
                      ? "bg-gray-950 border border-gray-700"
                      : "bg-teal-50 hover:bg-teal-100/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                      tema === "oscuro" ? "bg-gray-900" : "bg-white"
                    }`}
                  >
                    <RiQrScanLine className="w-5 h-5 text-teal-500" />
                  </div>

                  <span
                    className={`font-semibold text-sm ${
                      tema === "alto"
                        ? "text-yellow-400"
                        : tema === "oscuro"
                          ? "text-white"
                          : "text-[#0B2F1E]"
                    }`}
                  >
                    Activar guía de lectura
                  </span>
                </div>

                <Toggle
                  checked={readingMask}
                  onChange={handleReadingMaskChange}
                />
              </div>
            </section>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className={`flex items-center gap-2 border font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                tema === "alto"
                  ? "bg-black border-yellow-500 text-yellow-400"
                  : tema === "oscuro"
                    ? "bg-gray-900 border-gray-700 text-gray-300"
                    : "bg-white border-[#12492F]/15 text-[#12492F] hover:border-[#12492F]/30"
              }`}
            >
              <RiRefreshLine className="w-4 h-4" />
              Restablecer todo
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${temaClase} flex flex-col font-sans`}>
      {estilosGlobales}

      <header
        className={`flex justify-between items-center px-8 py-3 border-b-2 ${
          tema === "alto"
            ? "border-yellow-500 bg-black"
            : tema === "oscuro"
              ? "border-gray-700 bg-gray-900"
              : "border-[#165c36] bg-white"
        } w-full transition-colors`}
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

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className={`${
            tema === "alto"
              ? "text-yellow-400"
              : tema === "oscuro"
                ? "text-white"
                : "text-[#165c36]"
          } flex items-center gap-2 text-base font-bold hover:underline transition-all`}
        >
          <RiArrowLeftLine className="w-5 h-5" />
          Volver al Inicio
        </button>
      </header>

      <div className="flex justify-center px-4 py-8 flex-1">
        <div className="w-full max-w-2xl space-y-4">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-9 h-9 rounded-lg bg-[#27500A] flex items-center justify-center shrink-0 mt-0.5 hover:bg-[#3B6D11]"
            >
              <RiArrowLeftLine className="w-5 h-5 text-white" />
            </button>

            <div>
              <h1 className="text-xl font-bold">
                Configuración de Accesibilidad
              </h1>
              <p className={`text-sm mt-0.5 ${textMuted}`}>
                Personaliza SINCA para que se adapte perfectamente a tus
                necesidades.
              </p>
            </div>
          </div>

          <div className={`border rounded-xl p-5 ${card}`}>
            <h2 className="text-sm font-semibold mb-4 text-[#27500A]">
              Tamaño de texto
            </h2>

            <p className={`text-xs font-medium mb-3 ${textMuted}`}>
              Tamaño actual
            </p>

            <div className="flex items-center gap-3 mb-1">
              <span
                className={`text-base font-bold w-5 text-center ${textMuted}`}
              >
                A
              </span>

              <button
                type="button"
                onClick={() => setSliderValue((v) => Math.max(MIN, v - 1))}
                className="w-7 h-7 rounded-md bg-[#27500A] flex items-center justify-center hover:bg-[#3B6D11]"
              >
                <span className="text-white font-bold text-base">−</span>
              </button>

              <div className="relative flex-1 h-5 flex items-center">
                <div className="absolute w-full h-1.5 bg-gray-300 rounded-full" />

                <div
                  className="absolute h-1.5 bg-[#27500A] rounded-full"
                  style={{ width: `${percent}%` }}
                />

                <input
                  type="range"
                  min={MIN}
                  max={MAX}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div
                  className="absolute w-5 h-5 bg-[#27500A] rounded-full border-2 border-white shadow-md pointer-events-none"
                  style={{ left: `calc(${percent}% - 10px)` }}
                />
              </div>

              <button
                type="button"
                onClick={() => setSliderValue((v) => Math.min(MAX, v + 1))}
                className="w-7 h-7 rounded-md bg-[#27500A] flex items-center justify-center hover:bg-[#3B6D11]"
              >
                <span className="text-white font-bold text-base">+</span>
              </button>

              <span className="text-2xl font-bold w-6 text-center">A</span>
            </div>

            <p className="text-sm font-medium my-4">
              Vista previa de tamaño de texto
            </p>

            <div
              className={`border rounded-lg p-4 min-h-[90px] ${
                tema === "normal"
                  ? "bg-gray-50"
                  : tema === "oscuro"
                    ? "bg-gray-900"
                    : "bg-black"
              }`}
            >
              <p style={{ fontSize: `${sliderValue}px` }}>
                Este es un ejemplo de cómo se verá el texto en la aplicación con
                el tamaño seleccionado.
              </p>
            </div>

            <div className="flex justify-end mt-3">
              <button
                type="button"
                onClick={handleAplicar}
                className="px-5 py-2 rounded-lg border border-[#27500A] text-[#27500A] text-sm font-bold hover:bg-[#EAF3DE]"
              >
                Aplicar
              </button>
            </div>
          </div>

          <div className={`border rounded-xl p-5 ${card}`}>
            <h2 className="text-sm font-semibold mb-1 text-[#27500A]">
              Apariencia
            </h2>

            <p className={`text-sm mb-4 ${textMuted}`}>
              Elige el modo visual para mejor visibilidad
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleTemaChange("normal")}
                className={`flex flex-col items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-semibold border-2 ${
                  tema === "normal"
                    ? "bg-white border-gray-900 text-gray-900"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                }`}
              >
                <RiSunLine className="w-5 h-5" />
                Normal
              </button>

              <button
                type="button"
                onClick={() => handleTemaChange("oscuro")}
                className={`flex flex-col items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-semibold border-2 ${
                  tema === "oscuro"
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                }`}
              >
                <RiMoonFill
                  className={`w-5 h-5 ${
                    tema === "oscuro" ? "text-yellow-400" : ""
                  }`}
                />
                Oscuro
              </button>

              <button
                type="button"
                onClick={() => handleTemaChange("alto")}
                className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold border-2 ${
                  tema === "alto"
                    ? "bg-black border-yellow-400 text-yellow-400"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                }`}
              >
                <RiContrastFill
                  className={`w-5 h-5 ${
                    tema === "alto" ? "text-yellow-400" : ""
                  }`}
                />
                Alto contraste
              </button>
            </div>
          </div>

          <div className={`border rounded-xl p-5 ${card}`}>
            <h2 className="text-sm font-semibold mb-3 text-[#27500A]">
              Modo cognitivo simplificado
            </h2>

            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  tema === "normal" ? "bg-green-100" : "bg-green-700"
                }`}
              >
                <RiBrainLine className={`w-5 h-5 ${textMuted}`} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold">Modo simplificado</p>
              </div>

              <Toggle checked={modoSimple} onChange={handleModoChange} />
            </div>
          </div>

          <div className={`border rounded-xl p-5 ${card}`}>
            <h2 className="text-sm font-semibold mb-3 text-[#27500A]">
              Máscara de lectura
            </h2>

            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  tema === "normal" ? "bg-green-100" : "bg-green-700"
                }`}
              >
                <RiQrScanLine className={`w-5 h-5 ${textMuted}`} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold">Activar guía de lectura</p>
              </div>

              <Toggle
                checked={readingMask}
                onChange={handleReadingMaskChange}
              />
            </div>
          </div>

          <div className="flex justify-end pb-2">
            <button
              type="button"
              onClick={handleReset}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium ${
                tema === "normal"
                  ? "border-gray-300 text-gray-600"
                  : "border-gray-600 text-gray-300"
              }`}
            >
              <RiRefreshLine className="w-4 h-4" />
              Restablecer todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
