const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las peticiones POST
app.use(express.json());

// Servir archivos estáticos (CSS, JavaScript, imágenes)
app.use(express.static('public'));

// Rutas para la API (vehiculos, conductores, rutas, detallesRuta)
const vehiculosRoutes = require('./routes/vehiculosRoutes');
const conductoresRoutes = require('./routes/conductoresRoutes');
const rutasRoutes = require('./routes/rutasRoutes');
const detallesRutaRoutes = require('./routes/detallesRutaRoutes');

app.use('/api', vehiculosRoutes);
app.use('/api', conductoresRoutes);
app.use('/api', rutasRoutes);
app.use('/api', detallesRutaRoutes);

// Rutas para servir los archivos HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/vehiculos/', (req, res) => {
    res.sendFile(__dirname + '/public/vehiculos/index.html');
});

app.get('/conductores/', (req, res) => {
    res.sendFile(__dirname + '/public/conductores/index.html');
});

app.get('/rutas/', (req, res) => {
    res.sendFile(__dirname + '/public/rutas/index.html');
});

app.get('/rutas/ruta.html', (req, res) => {
    res.sendFile(__dirname + '/public/rutas/ruta.html');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
