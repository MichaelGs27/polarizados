const express = require('express');
const promocionRoutes = require('./routes/promocion.routes');
const servicioRoutes = require('./routes/servicio.routes');
const testimonioRoutes = require('./routes/testimonio.routes');
const portafolioRoutes = require('./routes/portafolio.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const tiposDocRoutes = require('./routes/TiposDoc.routes');
const faqRoutes = require('./routes/Faq.routes'); 
const tipoVehiculoRoutes = require('./routes/tipoVehiculo.routes');
const vehiculoRoutes = require('./routes/vehiculo.routes');
const citaRoutes = require('./routes/cita.routes');
const tipoServicioRoutes = require('./routes/tipoServicio.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Prefijo de la API y montaje de las rutas
app.use('/api/promociones', promocionRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/testimonios', testimonioRoutes);
app.use('/api/portafolio',portafolioRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tiposdoc', tiposDocRoutes);
app.use('/api/faq', faqRoutes); 
app.use('/api/tipoVehiculos', tipoVehiculoRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/tiposservicios', tipoServicioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
