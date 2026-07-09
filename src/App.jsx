// En tu archivo App.jsx
import AppRouter from './router/AppRouter'; // O donde tengas tu Router
import LectorAccesible from './components/LectorAccesible';

function App() {
  return (
    // ESTE ES EL ID CLAVE que ahora envuelve todo tu proyecto
    <div id="contenido-principal" className="min-h-screen relative">
      
      {/* Tu enrutador que carga Home, Login, etc. */}
      <AppRouter />

      {/* Tu Lector Global Flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        <LectorAccesible />
      </div>
      
    </div>
  );
}

export default App;