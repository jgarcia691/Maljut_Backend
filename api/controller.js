import { consultarAsistente, obtenerInformacionBasica, validarConsulta } from './service.js';

class MaljutController {
    
    /**
     * Endpoint principal para consultar al asistente virtual
     * POST /api/chat
     */
    async chat(req, res) {
        try {
            const { message } = req.body;
            
            // Validar que se proporcione un mensaje
            if (!message || typeof message !== 'string' || message.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'El mensaje es requerido y debe ser una cadena de texto válida'
                });
            }

            // Validar que la consulta sea apropiada
            if (!validarConsulta(message)) {
                return res.status(400).json({
                    success: false,
                    error: 'Consulta no permitida'
                });
            }

            // Obtener respuesta del asistente virtual
            const respuesta = await consultarAsistente(message.trim());

            res.json({
                success: true,
                data: {
                    message: message,
                    response: respuesta,
                    timestamp: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error('Error en chat controller:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor',
                message: error.message
            });
        }
    }

    /**
     * Endpoint para obtener información básica de Maljut Pizzas
     * GET /api/info
     */
    async getInfo(req, res) {
        try {
            const info = obtenerInformacionBasica();
            
            res.json({
                success: true,
                data: {
                    ...info,
                    timestamp: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error('Error en getInfo controller:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor',
                message: error.message
            });
        }
    }

    /**
     * Endpoint de salud del servidor
     * GET /api/health
     */
    async health(req, res) {
        try {
            res.json({
                success: true,
                data: {
                    status: 'OK',
                    service: 'MaljutBot API',
                    timestamp: new Date().toISOString(),
                    uptime: process.uptime()
                }
            });

        } catch (error) {
            console.error('Error en health controller:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor'
            });
        }
    }

    /**
     * Endpoint para obtener estadísticas básicas (placeholder)
     * GET /api/stats
     */
    async getStats(req, res) {
        try {
            // Placeholder para futuras estadísticas
            const stats = {
                totalConsultas: 0,
                consultasHoy: 0,
                consultasExitosas: 0,
                consultasFallidas: 0
            };

            res.json({
                success: true,
                data: {
                    ...stats,
                    timestamp: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error('Error en getStats controller:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor',
                message: error.message
            });
        }
    }

    /**
     * Endpoint para manejar errores 404 en la API
     */
    async notFound(req, res) {
        res.status(404).json({
            success: false,
            error: 'Endpoint no encontrado',
            path: req.originalUrl,
            availableEndpoints: [
                'POST /api/chat - Consultar al asistente virtual',
                'GET /api/info - Información básica de Maljut Pizzas',
                'GET /api/health - Estado del servidor',
                'GET /api/stats - Estadísticas básicas'
            ]
        });
    }
}

export default new MaljutController();
