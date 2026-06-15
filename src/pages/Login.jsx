import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { RiArrowLeftLine, RiEyeOffLine, RiEyeLine } from 'react-icons/ri';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, correo, contraseña);
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Correo o contraseña incorrectos. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* HEADER COMPACTO */}
      <header className="flex justify-between items-center px-8 py-3 border-b-2 border-[#165c36]">
        <div className="text-[#165c36] font-bold text-xl flex items-center gap-2">
          <Link to="/home">
          <span className="text-3xl">❉</span> SINCA
          </Link>
        </div>
        <button onClick={() => navigate('/home')} className="text-[#165c36] flex items-center gap-2 text-base font-bold hover:underline transition-all">
          <RiArrowLeftLine className="w-5 h-5" /> Volver
        </button>
      </header>

      {/* CONTENEDOR CENTRAL COMPACTO */}
      <main className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        
        {/* CAJA VERDE AJUSTADA */}
        <div className="bg-[#165c36] w-[450px] max-w-[95vw] h-auto rounded-[30px] p-10 shadow-2xl flex flex-col justify-center">
          
          <div className="text-center mb-6">
            <div className="text-white text-6xl mb-2 flex justify-center">❉</div>
            <h2 className="text-white text-3xl font-extrabold tracking-wide">Iniciar Sesión</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 w-full px-2">
            
            <div className="w-full">
              <label className="block text-white text-sm font-semibold mb-1 ml-4">Correo electrónico:</label>
              <input 
                type="email" 
                className="w-full h-12 bg-white text-gray-900 rounded-full px-6 text-base outline-none focus:ring-4 focus:ring-green-300 transition-all box-border placeholder:text-gray-400"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="ejemplo@correo.com"
                required 
              />
            </div>

            <div className="w-full">
              <label className="block text-white text-sm font-semibold mb-1 ml-4">Contraseña:</label>
              <div className="relative w-full">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full h-12 bg-white text-gray-900 rounded-full px-6 text-base outline-none pr-12 focus:ring-4 focus:ring-green-300 transition-all box-border placeholder:text-gray-400"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  placeholder="••••••••"
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors p-1"
                >
                  {showPassword ? <RiEyeLine size={22} /> : <RiEyeOffLine size={22} />}
                </button>
              </div>
            </div>

            <div className="flex items-center ml-4 pt-1">
              <input type="checkbox" id="recordarme" className="mr-3 accent-[#165c36] w-4 h-4 cursor-pointer" />
              <label htmlFor="recordarme" className="text-white text-sm cursor-pointer select-none">Recordarme</label>
            </div>

            <div className="flex justify-center pt-4">
              <button type="submit" className="bg-white text-[#165c36] font-black rounded-full h-12 px-14 text-lg hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105 active:scale-95">
                Iniciar Sesión
              </button>
            </div>
          </form>

          <div className="flex justify-between items-center mt-6 px-2 text-white text-sm">
            <a href="#" className="hover:underline opacity-90 transition-opacity">¿Olvidó su contraseña?</a>
            <Link to="/register" className="hover:underline font-bold text-base">Regístrate</Link>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Login;