
import { useNavigate } from 'react-router-dom';
import { RiFontColor, RiAlignJustify, RiVolumeUpFill, RiShareBoxFill, RiArrowLeftLine } from 'react-icons/ri';

const LecturaAccesible = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* HEADER COORDINADO CON EL LOGO */}
      <header className="flex justify-between items-center px-8 py-3 border-b-2 border-[#165c36] bg-white w-full">
        <div className="text-[#165c36] font-bold text-xl flex items-center gap-2">
          <span className="text-3xl">❉</span> SINCA
        </div>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="text-[#165c36] flex items-center gap-2 text-base font-bold hover:underline transition-all"
        >
          <RiArrowLeftLine className="w-5 h-5" /> Volver al Inicio
        </button>
      </header>
      
      {/* CONTENIDO CENTRAL */}
      <div className="flex justify-center px-6 py-16">
        <div className="w-full max-w-4xl space-y-8 pl-10">
          
          {/* Textos principales */}
          <div className="space-y-6 text-gray-700 text-xl font-medium leading-relaxed">
            <p>
              La lectura accesible transforma la manera en que interactuamos con la información.
            </p>
            <p>
              Esta aplicación está diseñada para ofrecer una experiencia cómoda, clara y personalizada para cada persona.
            </p>
            <p>
              Puedes ajustar el contraste, escuchar el contenido y adaptar la presentación de texto según tus necesidades visuales.
            </p>
          </div>

          {/* Fila de 4 botones pequeños */}
          <div className="flex gap-10 pt-10 pb-4">
            <button className="w-14 h-14 bg-[#75b283] rounded-lg border-2 border-gray-600 flex items-center justify-center hover:bg-[#5b9669] transition-colors shadow-sm">
              <RiFontColor className="w-7 h-7 text-[#1a2b4c]" />
            </button>
            <button className="w-14 h-14 bg-[#75b283] rounded-lg border-2 border-gray-600 flex items-center justify-center hover:bg-[#5b9669] transition-colors shadow-sm">
              <RiAlignJustify className="w-7 h-7 text-[#1a2b4c]" />
            </button>
            <button className="w-14 h-14 bg-[#75b283] rounded-lg border-2 border-gray-600 flex items-center justify-center hover:bg-[#5b9669] transition-colors shadow-sm">
              <RiVolumeUpFill className="w-7 h-7 text-[#1a2b4c]" />
            </button>
            <button className="w-14 h-14 bg-[#75b283] rounded-lg border-2 border-gray-600 flex items-center justify-center hover:bg-[#5b9669] transition-colors shadow-sm">
              <RiShareBoxFill className="w-7 h-7 text-[#1a2b4c]" />
            </button>
          </div>

          {/* Botón grande "Escuchar Contenido" */}
          <div className="pt-8">
            <button className="bg-[#2e8b3e] text-white px-8 py-4 rounded-lg flex items-center gap-4 hover:bg-[#257231] transition-colors font-bold text-lg shadow-md">
              <div className="bg-[#3b5998] p-1.5 rounded-md">
                <RiVolumeUpFill className="w-6 h-6 text-white" />
              </div>
              Escuchar Contenido
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LecturaAccesible;