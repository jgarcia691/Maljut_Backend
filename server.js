import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Configuración de variables de entorno
dotenv.config();

// Configuración de __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importar rutas
import apiRoutes from './api/routes.js';

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (si los hay)
app.use(express.static(join(__dirname, 'public')));

// Rutas de la API
app.use('/api', apiRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'Backend Maljut funcionando correctamente',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Iniciar servidor
// app.listen(PORT, () => {
//   console.log(`🚀 Servidor iniciado en el puerto ${PORT}`);
//   console.log(`📡 API disponible en: http://localhost:${PORT}/api`);
//   console.log(`🌐 Servidor web en: http://localhost:${PORT}`);
// });

export default app;
