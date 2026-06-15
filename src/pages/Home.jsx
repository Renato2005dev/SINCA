
import '../assets/css/estilos.css';

// IMPORTAMOS LAS IMÁGENES
import heroImg from '../assets/hero-img.png';
import inclusionImg from '../assets/inclusion.png';
import accesibilidadImg from '../assets/accesibilidad.png';
import autonomiaImg from '../assets/autonomia.png';
import transcripcionImg from '../assets/transcripcion.png';
// 👇 Nuevas imágenes importadas
import personalizacionImg from '../assets/personalizacion.png'; 
import disenoInclusivoImg from '../assets/diseño.png';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home-container">
      
      {/* BARRA DE NAVEGACIÓN */}
      <nav className="home-nav">
        <div className="nav-logo">
          <Link to="/home">
          <h2><span className="logo-icon">❉</span> SINCA</h2>
          </Link>
        </div>
        <ul className="nav-links">
          <li><a href="#que-busca">¿Qué busca?</a></li>
          <li><a href="#funcionalidad">Funcionalidad</a></li>
          <li><a href="#contactos">Contactos</a></li>
        </ul>
      </nav>

      {/* SECCIÓN HERO (Bienvenida) */}
      <header className="home-hero">
        <div className="hero-texto">
          <h1 className="titulo-principal">
            <span className="texto-verde">¡Bienvenid@</span><br/>
            <span className="texto-verde">a SINCA!</span>
          </h1>
          <p className="subtitulo-hero">"Pensado para todos, creado para ayudarte"</p>
          <div className="hero-botones">
            <Link to="/login" >
            <button className="btn-oscuro">Iniciar Sesión</button>
            </Link>
            <Link to="/register">
            <button className="btn-oscuro">Regístrate</button>
            </Link>
          </div>
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
        
        {/* BLOQUE 1: Transcripción (Imagen Izquierda, Texto Derecha) */}
        {/* BLOQUE 1: Transcripción (Imagen Izquierda, Texto Derecha) */}
        <div className="contenedor-funcionalidad" style={{ marginBottom: '4rem' }}>
          <div className="funcionalidad-imagen">
            
            {/* La etiqueta de apertura del Link */}
            <Link to="/asistente">
              
              {/* La imagen está ADENTRO */}
              <img 
                src={transcripcionImg} 
                alt="Transcripción de audio" 
                className="img-funcionalidad" 
                style={{ cursor: 'pointer' }}
              />
              
            {/* La etiqueta de cierre del Link */}
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

        {/* Separador visual opcional como en Figma */}
        <hr style={{ borderTop: '2px solid #165c36', marginBottom: '4rem' }} />

        {/* BLOQUE 2: Personalización "Aa" (Texto Izquierda, Imagen Derecha) */}
        {/* BLOQUE 2: Personalización "Aa" (Texto Izquierda, Imagen Derecha) */}
        <div className="contenedor-funcionalidad" style={{ marginBottom: '4rem' }}>
          <div className="funcionalidad-texto">
            <div className="item-funcion">
              <h4>Opciones de personalización de tamaño de texto y contraste visual:</h4>
              <p>Los usuarios podrán adaptar la interfaz según sus necesidades visuales, ajustando colores, contraste y tamaño de letras para una experiencia más cómoda y accesible.</p>
            </div>
          </div>

          <div className="funcionalidad-imagen">
            
            {/* 👇 Envolvemos la imagen con el Link hacia /accesibilidad */}
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

        {/* BLOQUE 3: Diseño Inclusivo (Imagen Izquierda, Texto Derecha) */}
        {/* BLOQUE 3: Diseño Inclusivo (Imagen Izquierda, Texto Derecha) */}
        <div className="contenedor-funcionalidad">
          <div className="funcionalidad-imagen">
            
            {/* 👇 Envolvemos la imagen con el Link hacia /lectura */}
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