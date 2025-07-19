import express from 'express';
import maljutController from './controller.js';

const router = express.Router();

/**
 * Middleware para logging de peticiones
 */
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
});

/**
 * Middleware para validar JSON en peticiones POST
 */
router.use((req, res, next) => {
    if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
        return res.status(400).json({
            success: false,
            error: 'Content-Type debe ser application/json'
        });
    }
    next();
});

/**
 * Ruta principal de la API
 * GET /api
 */
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Bienvenido a la API de MaljutBot',
        version: '1.0.0',
        endpoints: {
            chat: {
                method: 'POST',
                path: '/api/chat',
                description: 'Consultar al asistente virtual de Maljut Pizzas',
                body: {
                    message: 'string (requerido)'
                }
            },
            info: {
                method: 'GET',
                path: '/api/info',
                description: 'Obtener información básica de Maljut Pizzas'
            },
            health: {
                method: 'GET',
                path: '/api/health',
                description: 'Verificar el estado del servidor'
            },
            stats: {
                method: 'GET',
                path: '/api/stats',
                description: 'Obtener estadísticas básicas del servicio'
            }
        },
        timestamp: new Date().toISOString()
    });
});

/**
 * Endpoint principal para consultar al asistente virtual
 * POST /api/chat
 */
router.post('/chat', maljutController.chat);

/**
 * Endpoint para obtener información básica de Maljut Pizzas
 * GET /api/info
 */
router.get('/info', maljutController.getInfo);

/**
 * Endpoint de salud del servidor
 * GET /api/health
 */
router.get('/health', maljutController.health);

/**
 * Endpoint para estadísticas básicas
 * GET /api/stats
 */
router.get('/stats', maljutController.getStats);

/**
 * Middleware para manejar rutas no encontradas en la API
 */
router.use('*', maljutController.notFound);

export default router;
