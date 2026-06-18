import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiAlignJustify,
  RiVolumeUpFill,
  RiShareBoxFill,
  RiArrowLeftLine,
} from "react-icons/ri";

const LecturaAccesible = () => {
  const navigate = useNavigate();

  const [texto, setTexto] = useState("");
  const [fontSize, setFontSize] = useState(28);
  const [contraste, setContraste] = useState(false);
  const [leyendo, setLeyendo] = useState(false);

  // LEER TEXTO ESCRITO
  const escucharTexto = () => {
    if (!texto.trim()) {
      alert("Escribe algo primero");
      return;
    }

    if (leyendo) {
      window.speechSynthesis.cancel();
      setLeyendo(false);
      return;
    }

    const voz = new SpeechSynthesisUtterance(texto);

    // Español
    voz.lang = "es-ES";

    // Buscar voz española
    const voces = window.speechSynthesis.getVoices();

    const vozEspanol =
      voces.find(v => v.lang.includes("es")) ||
      voces[0];

    if (vozEspanol) {
      voz.voice = vozEspanol;
    }

    voz.rate = 0.9;
    voz.pitch = 1;

    voz.onend = () => setLeyendo(false);

    window.speechSynthesis.speak(voz);

    setLeyendo(true);
  };

  const aumentar = () => {
    setFontSize((prev) => prev + 2);
  };

  const disminuir = () => {
    setFontSize((prev) =>
      prev > 16 ? prev - 2 : prev
    );
  };

  const compartir = async () => {
    if (!texto) return;

    await navigator.clipboard.writeText(texto);

    alert("Texto copiado");
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-all
      ${
        contraste
          ? "bg-black text-white"
          : "bg-white text-gray-800"
      }`}
    >
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-green-700">

        <div className="text-green-700 text-2xl font-bold">
          ❉ SINCA
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex gap-2 items-center text-green-700"
        >
          <RiArrowLeftLine />
          Volver al Inicio
        </button>

      </header>

      {/* CONTENIDO */}
      <div className="flex flex-col items-center p-10 gap-8">

        <h1 className="text-3xl font-bold">
          Lectura Accesible
        </h1>

        {/* AREA PARA ESCRIBIR */}
        <textarea
          value={texto}
          onChange={(e) =>
            setTexto(e.target.value)
          }
          placeholder="Escribe aquí..."
          style={{
            fontSize: `${fontSize}px`,
          }}
          className={`
            w-full
            max-w-5xl
            h-[350px]
            rounded-xl
            border
            p-8
            resize-none
            outline-none
            shadow-lg

            ${
              contraste
                ? "bg-black text-white"
                : "bg-white"
            }
          `}
        />

        {/* BOTONES */}
        <div className="flex gap-4 flex-wrap">

          <button
            onClick={aumentar}
            className="bg-green-500 text-white px-6 py-3 rounded"
          >
            A+
          </button>

          <button
            onClick={disminuir}
            className="bg-red-500 text-white px-6 py-3 rounded"
          >
            A-
          </button>

          <button
            onClick={() =>
              setContraste(!contraste)
            }
            className="bg-blue-500 text-white px-6 py-3 rounded"
          >
            <RiAlignJustify />
          </button>

          <button
            onClick={escucharTexto}
            className="bg-green-700 text-white px-6 py-3 rounded"
          >
            <RiVolumeUpFill />
          </button>

          <button
            onClick={compartir}
            className="bg-purple-600 text-white px-6 py-3 rounded"
          >
            <RiShareBoxFill />
          </button>

        </div>

        {/* BOTON GRANDE */}
        <button
          onClick={escucharTexto}
          className="bg-[#2e8b3e] text-white px-10 py-5 rounded-xl text-xl"
        >
          {leyendo
            ? "Detener Lectura"
            : "Escuchar Texto"}
        </button>

      </div>
    </div>
  );
};

export default LecturaAccesible;