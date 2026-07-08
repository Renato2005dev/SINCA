import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializamos Gemini con tu llave gratuita del archivo .env
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export const preguntarIA = async (mensaje) => {
  try {
    // Usamos el modelo rápido y gratuito, y le damos la misma instrucción que tenía tu equipo
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Responde siempre en español."
    });

    const result = await model.generateContent(mensaje);
    const response = await result.response;
    
    return response.text() || "No hubo respuesta.";
    
  } catch (error) {
    console.error("ERROR IA:", error);
    return "Error al conectar con IA";
  }
};