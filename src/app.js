require('dotenv').config();
const express = require('express');
const cors = require('cors');

const tipoVehiculoRoutes = require('./routes/tipoVehiculo.routes');
const vehiculoRoutes = require('./routes/vehiculo.routes');
const citaRoutes = require('./routes/cita.routes');
const tipoServicioRoutes = require('./routes/tipoServicio.routes');


const app = express(); // ✅ Primero creas la app

// 🛠 Middlewares
app.use(cors());
app.use(express.json());

// 🛣 Rutas
app.use('/api/tipoVehiculos', tipoVehiculoRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/tiposservicios', tipoServicioRoutes);

// 🚀 Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});