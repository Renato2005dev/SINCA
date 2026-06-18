import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiUploadCloud2Line,
  RiMicLine,
  RiPauseCircleLine,
  RiPlayCircleLine,
  RiStopCircleLine,
  RiDeleteBinLine,
  RiDownload2Line,
  RiClosedCaptioningFill,
  RiFileTextLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import { useAccessibility } from "../hooks/useAccessibility"; // 👈 SOLO AGREGAR ESTO

const useTranscriptor = (nombreArchivo) => {
  const recognitionRef = useRef(null);
  const activoRef = useRef(false);
  const pausadoRef = useRef(false);

  const [texto, setTexto] = useState("");
  const [actual, setActual] = useState("");
  const [activo, setActivo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [estado, setEstado] = useState("Detenido");

  const iniciar = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Tu navegador no permite reconocimiento de voz.");
      return;
    }

    if (activo) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setActivo(true);
      setPausado(false);
      setEstado("Escuchando...");
      activoRef.current = true;
      pausadoRef.current = false;
    };

    recognition.onresult = (event) => {
      let final = "";
      let temporal = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const resultado = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          final += resultado + " ";
        } else {
          temporal += resultado;
        }
      }

      if (final) {
        setTexto((prev) => prev + final);
        setActual("");
      } else {
        setActual(temporal);
      }
    };

    recognition.onerror = () => {
      setEstado("Error con el micrófono");
      setActivo(false);
      setPausado(false);
      activoRef.current = false;
      pausadoRef.current = false;
    };

    recognition.onend = () => {
      if (activoRef.current && !pausadoRef.current) {
        try {
          recognition.start();
        } catch {
          // evita reinicio duplicado
        }
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const pausar = () => {
    recognitionRef.current?.stop();
    setActivo(false);
    setPausado(true);
    setEstado("Pausado");
    activoRef.current = false;
    pausadoRef.current = true;
  };

  const reanudar = () => iniciar();

  const detener = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setActivo(false);
    setPausado(false);
    setActual("");
    setEstado("Detenido");
    activoRef.current = false;
    pausadoRef.current = false;
  };

  const limpiar = () => {
    setTexto("");
    setActual("");
    setEstado("Texto limpiado");
  };

  const descargar = () => {
    if (!texto.trim()) {
      alert("No hay texto para descargar.");
      return;
    }

    const blob = new Blob([texto], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${nombreArchivo}_sinca.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return {
    texto,
    actual,
    activo,
    pausado,
    estado,
    iniciar,
    pausar,
    reanudar,
    detener,
    limpiar,
    descargar,
  };
};

const BotonesControl = ({ transcriptor }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {transcriptor.activo && (
        <button
          onClick={transcriptor.pausar}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-yellow-600 text-white font-bold hover:bg-yellow-700"
        >
          <RiPauseCircleLine />
          Pausar
        </button>
      )}

      {transcriptor.pausado && (
        <button
          onClick={transcriptor.reanudar}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#27500A] text-white font-bold hover:bg-[#3B6D11]"
        >
          <RiPlayCircleLine />
          Reanudar
        </button>
      )}

      {(transcriptor.activo || transcriptor.pausado) && (
        <button
          onClick={transcriptor.detener}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-red-700 text-white font-bold hover:bg-red-800"
        >
          <RiStopCircleLine />
          Detener
        </button>
      )}

      <button
        onClick={transcriptor.limpiar}
        className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-100"
      >
        <RiDeleteBinLine />
        Limpiar
      </button>

      <button
        onClick={transcriptor.descargar}
        className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#27500A] text-[#27500A] font-bold hover:bg-green-50"
      >
        <RiDownload2Line />
        Descargar
      </button>
    </div>
  );
};

const Multimedia = () => {
  const navigate = useNavigate();
  const { tema } = useAccessibility(); // 👈 SOLO AGREGAR ESTO

  const mediaRef = useRef(null);

  const [archivo, setArchivo] = useState(null);
  const [archivoURL, setArchivoURL] = useState("");
  const [tipoArchivo, setTipoArchivo] = useState("");

  const transcriptorArchivo = useTranscriptor("archivo_multimedia");
  const transcriptorVoz = useTranscriptor("microfono_directo");

  // 👇 AGREGAR ESTAS CLASES (no eliminar nada)
  const temaClases = {
    normal: "bg-gray-100 text-[#343A40]",
    oscuro: "bg-gray-900 text-white",
    alto: "bg-black text-yellow-400",
  };

  const headerClases = {
    normal: "bg-white border-b-2 border-[#165c36]",
    oscuro: "bg-gray-800 border-b-2 border-gray-700",
    alto: "bg-black border-b-2 border-yellow-500",
  };

  const cardClases = {
    normal: "bg-white border border-gray-200",
    oscuro: "bg-gray-800 border border-gray-700",
    alto: "bg-black border border-yellow-500",
  };

  const tituloClases = {
    normal: "text-black",
    oscuro: "text-white",
    alto: "text-yellow-400",
  };

  const cargarArchivo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.includes("video") && !file.type.includes("audio")) {
      alert("Selecciona un archivo MP4 o MP3 válido.");
      return;
    }

    setArchivo(file);
    setArchivoURL(URL.createObjectURL(file));
    setTipoArchivo(file.type);
    transcriptorArchivo.limpiar();
  };

  const eliminarArchivo = () => {
    mediaRef.current?.pause();
    setArchivo(null);
    setArchivoURL("");
    setTipoArchivo("");
    transcriptorArchivo.detener();
    transcriptorArchivo.limpiar();
  };

  const handlePlay = () => {
    transcriptorArchivo.iniciar();
  };

  const handlePause = () => {
    transcriptorArchivo.pausar();
  };

  const handleEnded = () => {
    transcriptorArchivo.detener();
  };

  const textoArchivo = `${transcriptorArchivo.texto} ${transcriptorArchivo.actual}`.trim();
  const textoVoz = `${transcriptorVoz.texto} ${transcriptorVoz.actual}`.trim();

  const estadoArchivoColor = transcriptorArchivo.activo
    ? "text-green-700"
    : transcriptorArchivo.pausado
    ? "text-yellow-700"
    : "text-gray-500";

  const estadoVozColor = transcriptorVoz.activo
    ? "text-green-700"
    : transcriptorVoz.pausado
    ? "text-yellow-700"
    : "text-gray-500";

  return (
    <div className={`min-h-screen ${temaClases[tema] || temaClases.normal} flex flex-col font-sans`}>
      <header className={`flex justify-between items-center px-8 py-3 ${headerClases[tema]} w-full`}>
        <div className={`${tema === "alto" ? "text-yellow-400" : tema === "oscuro" ? "text-white" : "text-[#165c36]"} font-bold text-xl flex items-center gap-2`}>
          <span className="text-3xl">❉</span>
          SINCA
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className={`${tema === "alto" ? "text-yellow-400" : tema === "oscuro" ? "text-white" : "text-[#165c36]"} flex items-center gap-2 text-base font-bold hover:underline`}
        >
          <RiArrowLeftLine className="w-5 h-5" />
          Volver al Inicio
        </button>
      </header>

      <main className="flex justify-center px-4 py-8 flex-1">
        <section className="w-full max-w-5xl space-y-6">
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-9 h-9 rounded-lg bg-[#27500A] flex items-center justify-center shrink-0 hover:bg-[#3B6D11]"
            >
              <RiArrowLeftLine className="w-5 h-5 text-white" />
            </button>

            <div>
              <h1 className={`text-xl font-bold ${tituloClases[tema]}`}>
                Módulo Multimedia Accesible
              </h1>
              <p className={`text-sm ${tema === "alto" ? "text-yellow-300" : tema === "oscuro" ? "text-gray-400" : "text-gray-500"}`}>
                Sube MP4/MP3 o usa el micrófono directo para transcribir voz en tiempo real.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className={`${cardClases[tema]} rounded-2xl shadow-sm p-5 space-y-5`}>
              <div>
                <h2 className={`text-lg font-bold ${tituloClases[tema]}`}>
                  Subtítulos para archivo MP4 o MP3
                </h2>
                <p className={`text-sm ${tema === "alto" ? "text-yellow-300" : tema === "oscuro" ? "text-gray-400" : "text-gray-500"}`}>
                  Al reproducir el archivo, el micrófono se activa automáticamente.
                </p>
              </div>

              {!archivoURL && (
                <label className={`border-2 border-dashed border-[#165c36] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition ${tema === "alto" ? "hover:bg-gray-900" : tema === "oscuro" ? "hover:bg-gray-700" : "hover:bg-green-50"}`}>
                  <RiUploadCloud2Line className="text-5xl text-[#165c36] mb-2" />
                  <span className={`font-bold ${tituloClases[tema]}`}>
                    Seleccionar archivo multimedia
                  </span>
                  <span className={`text-sm ${tema === "alto" ? "text-yellow-300" : tema === "oscuro" ? "text-gray-400" : "text-gray-500"}`}>
                    Formatos permitidos: MP4 o MP3
                  </span>

                  <input
                    type="file"
                    accept="video/mp4,audio/mp3,audio/mpeg"
                    onChange={cargarArchivo}
                    className="hidden"
                  />
                </label>
              )}

              {archivoURL && (
                <>
                  <div className={`flex justify-between items-center ${tema === "alto" ? "bg-black border-yellow-500" : tema === "oscuro" ? "bg-gray-700" : "bg-gray-50"} border rounded-xl px-4 py-3`}>
                    <div>
                      <p className={`font-bold ${tituloClases[tema]}`}>{archivo?.name}</p>
                      <p className={`text-sm font-semibold ${estadoArchivoColor}`}>
                        Estado: {transcriptorArchivo.estado}
                      </p>
                    </div>

                    <button
                      onClick={eliminarArchivo}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-700 text-white font-bold hover:bg-red-800"
                    >
                      <RiCloseCircleLine />
                      Quitar
                    </button>
                  </div>

                  {tipoArchivo.includes("video") && (
                    <video
                      ref={mediaRef}
                      src={archivoURL}
                      controls
                      onPlay={handlePlay}
                      onPause={handlePause}
                      onEnded={handleEnded}
                      className="w-full rounded-xl border border-gray-300"
                    />
                  )}

                  {tipoArchivo.includes("audio") && (
                    <div className={`${tema === "alto" ? "bg-black" : "bg-gray-900"} rounded-xl p-6`}>
                      <audio
                        ref={mediaRef}
                        src={archivoURL}
                        controls
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onEnded={handleEnded}
                        className="w-full"
                      />
                    </div>
                  )}

                  <div className={`border rounded-xl p-4 ${tema === "alto" ? "bg-black border-yellow-500" : tema === "oscuro" ? "bg-gray-700" : "bg-gray-50"} min-h-40`}>
                    <div className="flex items-center gap-2 mb-2 font-bold">
                      <RiClosedCaptioningFill className="text-[#165c36]" />
                      <span className={tituloClases[tema]}>Subtítulos generados</span>
                    </div>

                    <p className={`whitespace-pre-line text-sm ${tema === "alto" ? "text-yellow-300" : tema === "oscuro" ? "text-gray-300" : "text-gray-700"}`}>
                      {textoArchivo ||
                        "Los subtítulos aparecerán aquí cuando reproduzcas el archivo."}
                    </p>
                  </div>

                  <BotonesControl transcriptor={transcriptorArchivo} />
                </>
              )}
            </div>

            <div className={`${cardClases[tema]} rounded-2xl shadow-sm p-5 space-y-5`}>
              <div>
                <h2 className={`text-lg font-bold ${tituloClases[tema]}`}>
                  Micrófono directo
                </h2>
                <p className={`text-sm ${tema === "alto" ? "text-yellow-300" : tema === "oscuro" ? "text-gray-400" : "text-gray-500"}`}>
                  Presiona el ícono central y SINCA transcribirá lo que digas.
                </p>
              </div>

              <button
                onClick={() =>
                  transcriptorVoz.activo
                    ? transcriptorVoz.pausar()
                    : transcriptorVoz.iniciar()
                }
                className={`mx-auto w-36 h-36 rounded-full flex items-center justify-center shadow-lg border-4 transition-all ${
                  transcriptorVoz.activo
                    ? "bg-green-700 border-green-300 scale-105 animate-pulse"
                    : "bg-[#27500A] border-green-100 hover:bg-[#3B6D11]"
                }`}
              >
                <RiMicLine className="text-7xl text-white" />
              </button>

              <p className={`text-center font-bold ${estadoVozColor}`}>
                Estado: {transcriptorVoz.estado}
              </p>

              <div className={`border rounded-xl p-4 ${tema === "alto" ? "bg-black border-yellow-500" : tema === "oscuro" ? "bg-gray-700" : "bg-gray-50"} min-h-40`}>
                <div className="flex items-center gap-2 mb-2 font-bold">
                  <RiFileTextLine className="text-[#165c36]" />
                  <span className={tituloClases[tema]}>Transcripción del micrófono</span>
                </div>

                <p className={`whitespace-pre-line text-sm ${tema === "alto" ? "text-yellow-300" : tema === "oscuro" ? "text-gray-300" : "text-gray-700"}`}>
                  {textoVoz || "Aquí aparecerá lo que hables por el micrófono."}
                </p>
              </div>

              <BotonesControl transcriptor={transcriptorVoz} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Multimedia;