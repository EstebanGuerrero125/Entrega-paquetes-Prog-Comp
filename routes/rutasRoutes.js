const express = require('express');
const router = express.Router();
const rutasController = require('../controller/rutasController');

// Obtener todas las rutas
router.get('/rutas', rutasController.getAllRutas);

// Obtener ruta por ID
router.get('/rutas/:id', rutasController.getRutaById);

// Crear nueva ruta
router.post('/rutas', rutasController.createRuta);

// Actualizar ruta
router.put('/rutas/:id', rutasController.updateRuta);

// Eliminar ruta
router.delete('/rutas/:id', rutasController.deleteRuta);

// Buscar rutas (por conductor, vehículo, fecha)
router.get('/rutas/search', rutasController.searchRutas);

module.exports = router;
