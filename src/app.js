const express = require('express');
const promocionRoutes = require('./routes/promocion.routes');
const servicioRoutes = require('./routes/servicio.routes');
const testimonioRoutes = require('./routes/testimonio.routes');
const portafolioRoutes = require('./routes/portafolio.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const tiposDocRoutes = require('./routes/TiposDoc.routes');
const faqRoutes = require('./routes/Faq.routes'); 
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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
