# Backend Maljut

Backend para el proyecto Maljut con Express.js y integración con Google Gemini AI.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega tu `GOOGLE_API_KEY` de Google AI Studio

3. Iniciar el servidor:
```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

## Configuración de Google Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva API key
3. Agrega la key a tu archivo `.env`:
```
GOOGLE_API_KEY=tu_api_key_aqui
PORT=3000
```

## Estructura del Proyecto

```
Backend_Maljut/
├── api/
│   ├── controller.js    # Controladores de la API
│   ├── routes.js        # Definición de rutas
│   └── service.js       # Servicios (incluye Google Gemini)
├── server.js            # Servidor principal
├── package.json         # Dependencias del proyecto
└── README.md           # Este archivo
```

## Endpoints

- `GET /` - Ruta de prueba del servidor
- `GET /api` - Documentación de la API
- `POST /api/chat` - Consultar al asistente virtual
- `GET /api/info` - Información básica de Maljut Pizzas
- `GET /api/health` - Estado del servidor
- `GET /api/stats` - Estadísticas básicas

## Variables de Entorno

- `PORT` - Puerto del servidor (default: 3000)
- `GOOGLE_API_KEY` - API Key para Google Gemini

## Tecnologías

- Node.js
- Express.js
- Google Gemini AI
- CORS
- dotenv

## Ejemplo de uso

```bash
# Consultar al asistente virtual
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Cuál es tu menú?"}'
``` 