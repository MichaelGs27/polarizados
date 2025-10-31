require('dotenv').config();
const express = require('express');
// Se importan las rutas de la API
const promotionsRoutes = require('./routes/promotions.routes');
const servicesRoutes = require('./routes/services.routes');
const testimoniesRoutes = require('./routes/testimonies.routes');
const portfolioRoutes = require('./routes/portfolio.routes');
const usersRoutes = require('./routes/users.routes');
const documenttypesRoutes = require('./routes/documenttypes.routes');
const faqRoutes = require('./routes/Faq.routes');
const vehicletypesRoutes = require('./routes/vehicletypes.routes');
const vehiclesRoutes = require('./routes/vehicles.routes');
const appointmentsRoutes = require('./routes/appointments.routes');
const servicetypesRoutes = require('./routes/servicetypes.routes');

// Inicialización de Express y configuración de puerto
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar cuerpos JSON (necesario para POST/PUT)
app.use(express.json());

// Middleware de Logging: Registra el método y URL de cada solicitud
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Middleware CORS: Permite que otros dominios (frontends) accedan a la API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

// Ruta de estado/salud para verificación de disponibilidad
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API OK', timestamp: new Date() });
});

// Montaje de las rutas específicas con el prefijo /api/
app.use('/api/promotions', promotionsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/testimonies', testimoniesRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/documenttypes', documenttypesRoutes);
app.use('/api/Faq', faqRoutes);
app.use('/api/vehicletypes', vehicletypesRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/servicetypes', servicetypesRoutes);

// Manejo de rutas no encontradas (404 Not Found)
// Debe ir después de todas las rutas válidas
app.use((req, res) => {
    res.status(404).json({
        message: `Error 404: No se puede encontrar ${req.originalUrl} en esta API.`
    });
});

// Manejo global de errores (500 Internal Server Error)
// Middleware de 4 parámetros para capturar errores lanzados en las rutas
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Registra el error interno en la consola del servidor para depuración
    console.error(`[ERROR ${statusCode}]: ${err.message}`, err);

    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Error interno del servidor'
    });
});
// Inicio del servidor

app.listen(PORT, () => {
    console.log('=================================');
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log('=================================');
});

module.exports = app;