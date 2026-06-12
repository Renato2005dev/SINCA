
import { useState } from "react";
import { RiSettings3Line } from "react-icons/ri";

const Header = ({ apariencia }) => {
  const [isActive, setIsActive] = useState(false);

  const headerClases = {
    normal: "bg-white border-gray-200",
    oscuro: "bg-gray-900 border-gray-700",
    alto: "bg-black border-yellow-500",
  };

  const textClases = {
    normal: "text-[#27500A]",
    oscuro: "text-green-400",
    alto: "text-yellow-400",
  };

  const buttonClases = {
    normal: "text-gray-500 hover:text-[#27500A]",
    oscuro: "text-gray-400 hover:text-green-400",
    alto: "text-yellow-400 hover:text-yellow-300",
  };

  return (
    <header className={`flex items-center justify-between px-6 py-3 border-b ${headerClases[apariencia]}`}>
      <div className="flex items-center gap-2">
        {/* Imagen del logo */}
        <img 
          src="/rutadellogo.png"
          alt="Logo SINCA"
          className="w-8 h-8"
        />
        
        <span className={`font-bold text-xl ${textClases[apariencia]}`}>
          SINCA
        </span>
      </div>

      <button
        onClick={() => setIsActive(!isActive)}
        className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg
          ${isActive ? "bg-[#27500A] text-white" : buttonClases[apariencia]}
        `}
        aria-label="Ir a configuración"
      >
        <span>Configuración</span>
        <RiSettings3Line className="w-5 h-5" />
      </button>
    </header>
  );
};

export default Header;
