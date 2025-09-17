const express = require('express');
const promocionRoutes = require('./routes/promocion.routes');
const servicioRoutes = require('./routes/servicio.routes');
const testimonioRoutes = require('./routes/testimonio.routes');
const portafolioRoutes = require('./routes/portafolio.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Prefijo de la API y montaje de las rutas
app.use('/api/promociones', promocionRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/testimonios', testimonioRoutes);
app.use('/api/portafolio',portafolioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
