const express = require('express');
const usuariosRoutes = require('./routes/usuarios.routes');
const tiposDocRoutes = require('./routes/TiposDoc.routes');
const faqRoutes = require('./routes/Faq.routes'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Prefijo de la API y montaje de las rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tiposdoc', tiposDocRoutes);
app.use('/api/faq', faqRoutes); 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});