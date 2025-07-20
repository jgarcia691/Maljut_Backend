# Maljut Backend

Backend para el proyecto Maljut Pizzas con integración de Google Generative AI.

## 🚀 Despliegue en Vercel

### Configuración de Variables de Entorno

**IMPORTANTE**: Para que la aplicación funcione correctamente en Vercel, debes configurar las siguientes variables de entorno:

1. Ve al dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega la siguiente variable:

```
GOOGLE_API_KEY=tu_api_key_de_google_aqui
```

### Cómo obtener la API Key de Google:

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva API key
3. Copia la API key generada
4. Pégalo en la variable de entorno `GOOGLE_API_KEY` en Vercel

### Verificar la configuración:

Después de configurar la variable de entorno, puedes verificar que todo esté funcionando correctamente visitando:

```
https://tu-dominio.vercel.app/api/diagnostic
```

Este endpoint te mostrará:
- Si la API key está configurada
- La longitud de la API key
- El prefijo de la API key (para verificar que sea válida)
- El entorno de ejecución

## 📋 Endpoints disponibles

- `POST /api/chat` - Consultar al asistente virtual
- `GET /api/info` - Información básica de Maljut Pizzas
- `GET /api/health` - Estado del servidor
- `GET /api/stats` - Estadísticas básicas
- `GET /api/diagnostic` - Diagnóstico de configuración

## 🔧 Desarrollo local

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Crea un archivo `.env` con tu API key:
   ```
   GOOGLE_API_KEY=tu_api_key_aqui
   ```
4. Ejecuta el servidor: `npm run dev`

## 🐛 Solución de problemas

### Error: "API key de Google inválida"

Si recibes este error:

1. Verifica que la variable `GOOGLE_API_KEY` esté configurada en Vercel
2. Asegúrate de que la API key sea válida y tenga permisos para Google Generative AI
3. Verifica que no haya espacios extra en la API key
4. Usa el endpoint `/api/diagnostic` para verificar la configuración

### Error: "Cuota excedida"

- Verifica tu cuota en Google AI Studio
- Considera actualizar tu plan si es necesario

## 📦 Dependencias

- Express.js
- CORS
- dotenv
- @google/generative-ai 