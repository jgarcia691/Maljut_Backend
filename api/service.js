import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Validar que la API key esté configurada
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
    console.error('❌ ERROR: GOOGLE_API_KEY no está configurada en las variables de entorno');
    throw new Error('GOOGLE_API_KEY no está configurada. Por favor, configura la variable de entorno GOOGLE_API_KEY en tu plataforma de despliegue.');
}

// Configurar Google Generative AI
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

// Prompt del sistema para el asistente virtual de Maljut Pizzas
const SYSTEM_PROMPT = `Eres MaljutBot, el asistente virtual oficial de Maljut Pizzas. Tu función es ayudar a los clientes con información sobre nuestros productos, servicios y resolver sus dudas.

INSTRUCCIONES GENERALES:
- Siempre responde en español de manera amigable y profesional
- Mantén un tono cálido y acogedor, como si fueras parte de la familia Maljut
- Si no tienes información específica sobre algo, indícalo claramente y ofrece contactar con el equipo humano
- Prioriza la satisfacción del cliente

FUNCIONES PRINCIPALES:
1. Información sobre menú y productos
2. Horarios de atención
3. Proceso de pedidos
4. Información de contacto 
5. Resolver dudas generales sobre la empresa

TIPO DE RESPUESTA:
- Sé conciso pero completo
- Usa emojis ocasionalmente para hacer la conversación más amigable
- Si es necesario, sugiere contactar directamente con el restaurante para detalles específicos

IMPORTANTE: Si un cliente pregunta algo que no puedes responder con la información disponible, sugiere que se ponga en contacto directamente con Maljut Pizzas para obtener la información más actualizada.`;

/**
 * Función principal para consultar al asistente virtual de Maljut Pizzas
 * @param {string} userMessage - Mensaje del cliente
 * @returns {Promise<string>} Respuesta del asistente virtual
 */
async function consultarAsistente(userMessage) {
    try {
        // Verificar que la API key esté disponible
        if (!GOOGLE_API_KEY) {
            throw new Error('API key de Google no configurada');
        }

        // Obtener el modelo Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Crear el prompt completo
        const prompt = `${SYSTEM_PROMPT}\n\nCliente: ${userMessage}\n\nMaljutBot:`;

        // Generar respuesta
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error('Error al consultar el asistente virtual:', error);
        
        // Manejo específico de errores de la API
        if (error.message && error.message.includes('API key')) {
            throw new Error('Error de configuración: API key de Google inválida o no configurada. Por favor, verifica la configuración en Vercel.');
        } else if (error.message && error.message.includes('quota')) {
            throw new Error('Error de configuración: Cuota de API excedida. Por favor, contacta al administrador.');
        } else if (error.message && error.message.includes('network')) {
            throw new Error('Error de conexión con el servicio de IA. Por favor, intenta de nuevo más tarde.');
        } else if (error.message && error.message.includes('permission')) {
            throw new Error('Error de permisos: La API key no tiene permisos para acceder al servicio. Verifica la configuración.');
        } else {
            throw new Error(`Error del servicio: ${error.message || 'No se pudo procesar tu consulta en este momento. Por favor, intenta de nuevo más tarde.'}`);
        }
    }
}

/**
 * Función para obtener información básica del menú (placeholder)
 * @returns {Object} Información básica del menú
 */
function obtenerInformacionBasica() {
    return {
        nombre: "Maljut Pizzas",
        tipo: "Pizzería",
        servicios: ["Delivery", "Take away", "Comer en local"],
        horarios: "Por confirmar",
        contacto: "Por confirmar"
    };
}

/**
 * Función para validar si una consulta es apropiada para el asistente
 * @param {string} message - Mensaje del usuario
 * @returns {boolean} True si es apropiada
 */
function validarConsulta(message) {
    const palabrasInapropiadas = ['hack', 'crack', 'virus', 'malware', 'exploit'];
    const mensajeLower = message.toLowerCase();
    
    return !palabrasInapropiadas.some(palabra => mensajeLower.includes(palabra));
}

export {
    consultarAsistente,
    obtenerInformacionBasica,
    validarConsulta
};