
// Importamos la pantalla que queremos ver directamente
import VoiceAssistant from './pages/VoiceAssistant';
// import Login from './pages/Login'; // Puedes descomentar esta si luego quieres ver el login

function App() {
  return (
    <>
      {/* Mostramos el componente a la fuerza, sin usar rutas */}
      <VoiceAssistant /> 
    </>
  );
}

export default App;