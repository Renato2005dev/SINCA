import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Asegúrate de que esta ruta a firebase.js sea correcta
import '../assets/css/estilos.css';

// IMPORTAMOS LAS IMÁGENES
import heroImg from '../assets/hero-img.png';
import inclusionImg from '../assets/inclusion.png';
import accesibilidadImg from '../assets/accesibilidad.png';
import autonomiaImg from '../assets/autonomia.png';
import transcripcionImg from '../assets/transcripcion.png';
import personalizacionImg from '../assets/personalizacion.png'; 
import disenoInclusivoImg from '../assets/diseño.png';

const Home = () => {
  const navigate = useNavigate();
  
  // 👇 PASO B.1: Creamos el estado para guardar el nombre del usuario
  const [nombreUsuario, setNombreUsuario] = useState(''); 

  // 1. EL GUARDIA DE SEGURIDAD: Vigila si el usuario está logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Si no hay usuario activo, lo manda al login. 
        // El "replace: true" borra el historial para que la flecha de retroceso no funcione.
        navigate('/login', { replace: true });
      } else {
        // 👇 PASO B.2: Si hay usuario, extraemos su nombre de Firebase
        // Solo tomamos el primer nombre para que se vea mejor (Ej: "Juan Pérez" -> "Juan")
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
      // Tras cerrar sesión, lo enviamos al login y borramos el historial
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <div className="home-container">
      
      {/* BARRA DE NAVEGACIÓN */}
      <nav className="home-nav">
        <div className="nav-logo">
          <h2><span className="logo-icon">❉</span> SINCA</h2>
        </div>
        
        {/* Usamos flex y items-center para alinear los enlaces con el botón nuevo */}
        <ul className="nav-links flex items-center gap-6">
          <li><a href="#que-busca">¿Qué busca?</a></li>
          <li><a href="#funcionalidad">Funcionalidad</a></li>
          <li><a href="#contactos">Contactos</a></li>
          
          {/* BOTÓN DE CERRAR SESIÓN EN LA NAVEGACIÓN */}
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

      {/* SECCIÓN HERO (Bienvenida) */}
      <header className="home-hero">
        <div className="hero-texto">
          <h1 className="titulo-principal">
            {/* 👇 PASO B.3: Mostramos el nombre dinámico aquí. 
                 Si no hay nombre, mostrará solo "¡Bienvenid@!" */}
            <span className="texto-verde">
              ¡Bienvenid@{nombreUsuario ? ` ${nombreUsuario}` : ''}!
            </span><br/>
            <span className="texto-verde">a SINCA</span>
          </h1>
          <p className="subtitulo-hero">"Pensado para todos, creado para ayudarte"</p>
          
        </div>
        <div className="hero-imagen">
          <img src={heroImg} alt="Ilustración de niños aprendiendo" className="img-hero" />
        </div>
      </header>

      {/* SECCIÓN: ¿QUÉ BUSCA? */}
      <section id="que-busca" className="section-que-busca">
        <h2 className="titulo-seccion">¿Qué busca?</h2>
        <p className="texto-descripcion">
          En SINCA creemos que la tecnología debe ser un puente hacia la inclusión, la comunicación y la igualdad de oportunidades para todos. SINCA creemos que la tecnología debe ser un puente hacia la inclusión, la comunicación y la igualdad de oportunidades para todos.
        </p>
        
        <div className="grid-tarjetas">
          <div className="tarjeta">
            <img src={inclusionImg} alt="Inclusión" className="img-tarjeta" />
            <p>Fomentar la inclusión tecnológica</p>
          </div>
          <div className="tarjeta">
            <img src={accesibilidadImg} alt="Accesibilidad" className="img-tarjeta" />
            <p>Promover la accesibilidad digital</p>
          </div>
          <div className="tarjeta">
            <img src={autonomiaImg} alt="Autonomía" className="img-tarjeta" />
            <p>Mejorar la autonomía de los usuarios</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN: FUNCIONALIDAD */}
      <section id="funcionalidad" className="section-funcionalidad">
        <h2 className="titulo-seccion">Funcionalidad</h2>
        <p className="texto-descripcion">Estas son algunas de las funciones que podrá hacer el usuario</p>
        
        {/* BLOQUE 1: Transcripción */}
        <div className="contenedor-funcionalidad" style={{ marginBottom: '4rem' }}>
          <div className="funcionalidad-imagen">
            <Link to="/asistente">
              <img 
                src={transcripcionImg} 
                alt="Transcripción de audio" 
                className="img-funcionalidad" 
                style={{ cursor: 'pointer' }}
              />
            </Link>
          </div>
          
          <div className="funcionalidad-texto">
            <div className="item-funcion">
              <h4>Transcripción de audio y video para mejorar la comprensión:</h4>
              <p>Permite convertir contenidos multimedia en texto de manera clara y organizada, facilitando el acceso a la información para personas con discapacidad auditiva o dificultades de comprensión.</p>
            </div>
            
            <div className="item-funcion">
              <h4>Conversión de voz a texto en tiempo real:</h4>
              <p>La aplicación transforma automáticamente las palabras habladas en texto instantáneo, mejorando la comunicación y permitiendo una interacción más accesible y dinámica.</p>
            </div>
          </div>
        </div>

        <hr style={{ borderTop: '2px solid #165c36', marginBottom: '4rem' }} />

        {/* BLOQUE 2: Personalización */}
        <div className="contenedor-funcionalidad" style={{ marginBottom: '4rem' }}>
          <div className="funcionalidad-texto">
            <div className="item-funcion">
              <h4>Opciones de personalización de tamaño de texto y contraste visual:</h4>
              <p>Los usuarios podrán adaptar la interfaz según sus necesidades visuales, ajustando colores, contraste y tamaño de letras para una experiencia más cómoda y accesible.</p>
            </div>
          </div>

          <div className="funcionalidad-imagen">
            <Link to="/accesibilidad">
              <img 
                src={personalizacionImg} 
                alt="Personalización de texto" 
                className="img-funcionalidad" 
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              />
            </Link>
          </div>
        </div>

        <hr style={{ borderTop: '2px solid #165c36', marginBottom: '4rem' }} />

        {/* BLOQUE 3: Diseño Inclusivo */}
        <div className="contenedor-funcionalidad">
          <div className="funcionalidad-imagen">
            <Link to="/lectura">
              <img 
                src={disenoInclusivoImg} 
                alt="Diseño Inclusivo" 
                className="img-funcionalidad" 
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              />
            </Link>
          </div>
          
          <div className="funcionalidad-texto">
            <div className="item-funcion">
              <h4>Diseño inclusivo pensado para personas con discapacidad visual, auditiva y motora:</h4>
              <p>La plataforma será desarrollada bajo principios de accesibilidad y usabilidad, asegurando que cualquier persona pueda interactuar de forma sencilla e intuitiva.</p>
            </div>
            
            <div className="item-funcion">
              <h4>Interfaz accesible y fácil de usar para todo tipo de usuarios:</h4>
              <p>Contará con una navegación simple, botones visibles y una estructura organizada que facilite el uso tanto para personas con discapacidad como para adultos mayores y usuarios con poca experiencia tecnológica.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ marginTop: '6rem', borderTop: '1px solid #ccc', paddingTop: '3rem', paddingBottom: '3rem', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#165c36', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '2rem' }}>❉</span> SINCA
          </h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '1rem' }}>Tecnología sin barreras, diseñada para todos.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '4rem', flex: 2, justifyContent: 'flex-end' }}>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Navegación</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Inicio</a></li>
              <li><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Funcionalidades</a></li>
              <li><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Sobre nosotros</a></li>
              <li><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Recursos</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Declaración de accesibilidad</a></li>
              <li><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Blog</a></li>
              <li><a href="#" style={{ color: '#333', textDecoration: 'none' }}>Soporte</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Síguenos</h4>
            <div style={{ display: 'flex', gap: '10px', fontSize: '1.2rem' }}>
              <span>𝕏</span>
              <span>📷</span>
              <span>▶️</span>
              <span>💼</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;