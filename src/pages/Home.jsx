import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Asegúrate de que esta ruta a firebase.js sea correcta
import "../assets/css/estilos.css";

import heroImg from "../assets/hero-img.png";
import inclusionImg from "../assets/inclusion.png";
import accesibilidadImg from "../assets/accesibilidad.png";
import autonomiaImg from "../assets/autonomia.png";
import transcripcionImg from "../assets/transcripcion.png";
import personalizacionImg from "../assets/personalizacion.png";
import disenoInclusivoImg from "../assets/diseño.png";

import {
  RiFacebookCircleFill,
  RiInstagramLine,
  RiYoutubeFill,
  RiLinkedinBoxFill,
  RiArrowRightSLine,
  RiMailLine,
  RiPhoneLine,
  RiCheckLine,
} from "react-icons/ri";

const Home = () => {
  const navigate = useNavigate();
  
  // 👇 PASO B.1: Creamos el estado para guardar el nombre del usuario
  const [nombreUsuario, setNombreUsuario] = useState(''); 

  // 1. EL GUARDIA DE SEGURIDAD: Vigila si el usuario está logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Si no hay usuario activo, lo manda al login. 
        navigate('/login', { replace: true });
      } else {
        // 👇 PASO B.2: Si hay usuario, extraemos su nombre de Firebase
        const nombreCompleto = user.displayName;
        const primerNombre = nombreCompleto ? nombreCompleto.split(' ')[0] : '';
        setNombreUsuario(primerNombre);
      }
    });

    // Limpiamos el vigilante si el componente se desmonta
    return () => unsubscribe();
  }, [navigate]);

  // 2. FUNCIÓN PARA CERRAR SESIÓN
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        {/* DISEÑO DE TIFANY PARA EL LOGO */}
        <div className="nav-logo">
          <span className="logo-icon">❉</span>
          <span>SINCA</span>
        </div>

        <ul className="nav-links flex items-center gap-6">
          <li><a href="#que-busca">¿Qué busca?</a></li>
          <li><a href="#funcionalidad">Funcionalidad</a></li>
          <li><a href="#contactos">Contactos</a></li>
          
          {/* BOTÓN DE CERRAR SESIÓN DE RENATO */}
          <li>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-full font-bold hover:bg-red-600 transition-colors text-sm shadow-md"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>

      <header className="home-hero">
        <div className="hero-texto">
          <h1 className="titulo-principal">
            {/* SALUDO DINÁMICO DE RENATO APLICADO AL DISEÑO */}
            <span className="texto-verde">
              ¡Bienvenid@{nombreUsuario ? ` ${nombreUsuario}` : ''}!
            </span><br/>
            <span className="texto-verde">a SINCA</span>
          </h1>

          <p className="subtitulo-hero">
            "Pensado para todos, creado para ayudarte"
          </p>
          
          {/* BOTONES DE INICIAR SESIÓN Y REGISTRO ELIMINADOS POR SEGURIDAD DE RENATO */}
        </div>

        <div className="hero-imagen">
          <img
            src={heroImg}
            alt="Ilustración de inclusión digital"
            className="img-hero"
          />
        </div>
      </header>

      {/* DISEÑO MEJORADO DE TIFANY PARA LAS SECCIONES */}
      <section id="que-busca" className="section-que-busca">
        <div className="section-header">
          <h2 className="titulo-seccion">¿Qué busca?</h2>
          <div className="linea-verde"></div>
          <p className="texto-descripcion">
            En SINCA creemos que la tecnología debe ser un puente hacia la
            inclusión, la comunicación y la igualdad de oportunidades para todos.
            Por eso, buscamos ofrecer herramientas digitales accesibles, fáciles
            de usar y adaptadas a diferentes necesidades.
          </p>
        </div>

        <div className="grid-tarjetas">
          <div className="tarjeta">
            <img src={inclusionImg} alt="Inclusión" className="img-tarjeta" />
            <h3>Fomentar la inclusión tecnológica</h3>
            <p>Impulsamos el acceso equitativo a la tecnología para todas las personas.</p>
          </div>

          <div className="tarjeta">
            <img src={accesibilidadImg} alt="Accesibilidad" className="img-tarjeta" />
            <h3>Promover la accesibilidad digital</h3>
            <p>Desarrollamos soluciones accesibles que eliminan barreras digitales.</p>
          </div>

          <div className="tarjeta">
            <img src={autonomiaImg} alt="Autonomía" className="img-tarjeta" />
            <h3>Mejorar la autonomía de los usuarios</h3>
            <p>Diseñamos herramientas que ayudan a las personas a ser más independientes.</p>
          </div>
        </div>
      </section>

      <section id="funcionalidad" className="section-funcionalidad">
        <div className="section-header">
          <h2 className="titulo-seccion">Funcionalidad</h2>
          <div className="linea-verde"></div>
          <p className="texto-descripcion">
            Estas son algunas de las funciones que podrá usar el usuario para
            mejorar su experiencia dentro de SINCA.
          </p>
        </div>

        <div className="grid-funcionalidad">
          {/* Envolvemos las tarjetas de Tifany con los Links de navegación de Renato */}
          <Link to="/asistente" className="card-funcion block hover:shadow-lg transition-shadow cursor-pointer">
            <span className="icono-card">🎙️</span>
            <img src={transcripcionImg} alt="Transcripción" />
            <h3>Transcripción inteligente</h3>
            <p><RiCheckLine className="inline" /> Transcribe audio y video en texto.</p>
            <p><RiCheckLine className="inline" /> Convierte voz a texto en tiempo real.</p>
          </Link>

          <Link to="/accesibilidad" className="card-funcion block hover:shadow-lg transition-shadow cursor-pointer">
            <span className="icono-card">Aa</span>
            <img src={personalizacionImg} alt="Personalización visual" />
            <h3>Personalización visual</h3>
            <p><RiCheckLine className="inline" /> Ajusta tamaño de texto y contraste.</p>
            <p><RiCheckLine className="inline" /> Adapta la interfaz a cada usuario.</p>
          </Link>

          <Link to="/lectura" className="card-funcion block hover:shadow-lg transition-shadow cursor-pointer">
            <span className="icono-card">♿</span>
            <img src={disenoInclusivoImg} alt="Diseño inclusivo" />
            <h3>Diseño inclusivo</h3>
            <p><RiCheckLine className="inline" /> Pensado para discapacidad visual, auditiva y motora.</p>
            <p><RiCheckLine className="inline" /> Interfaz clara, simple y accesible.</p>
          </Link>
        </div>
      </section>

      {/* FOOTER DE TIFANY */}
      <footer id="contactos" className="footer-sinca">
        <div className="footer-grid">
          <div>
            <h2 className="footer-logo">
              <span>❉</span> SINCA
            </h2>
            <p>
              Tecnología sin barreras, diseñada para todos. Promovemos la
              inclusión, la accesibilidad y la comunicación para construir un
              mundo digital más humano.
            </p>
          </div>

          <div>
            <h4>Navegación</h4>
            <ul>
              <li><a href="#"><RiArrowRightSLine /> Inicio</a></li>
              <li><a href="#funcionalidad"><RiArrowRightSLine /> Funcionalidad</a></li>
              <li><a href="#que-busca"><RiArrowRightSLine /> ¿Qué busca?</a></li>
              <li><a href="#contactos"><RiArrowRightSLine /> Contactos</a></li>
            </ul>
          </div>

          <div>
            <h4>Recursos</h4>
            <ul>
              <li><a href="#"><RiArrowRightSLine /> Declaración de accesibilidad</a></li>
              <li><a href="#"><RiArrowRightSLine /> Soporte</a></li>
              <li><a href="#"><RiArrowRightSLine /> Ayuda</a></li>
              <li><a href="#"><RiArrowRightSLine /> Preguntas frecuentes</a></li>
            </ul>
          </div>

          <div>
            <h4>Síguenos</h4>
            <div className="social-icons">
              <RiFacebookCircleFill />
              <RiInstagramLine />
              <RiYoutubeFill />
              <RiLinkedinBoxFill />
            </div>

            <h4 className="contacto-titulo">Contáctanos</h4>
            <p className="contacto-item"><RiMailLine /> info@sinca.com</p>
            <p className="contacto-item"><RiPhoneLine /> +51 987 654 321</p>
          </div>
        </div>

        <div className="footer-copy">
          © 2026 SINCA. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Home;