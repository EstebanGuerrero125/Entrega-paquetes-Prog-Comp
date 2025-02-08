const express = require('express');
const router = express.Router();
const conductoresController = require('../controller/conductoresController');

// Obtener todos los conductores
router.get('/conductores', conductoresController.getAllConductores);

// Obtener conductor por ID
router.get('/conductores/:id', conductoresController.getConductorById);

// Crear nuevo conductor
router.post('/conductores', conductoresController.createConductor);

// Actualizar conductor
router.put('/conductores/:id', conductoresController.updateConductor);

// Eliminar conductor
router.delete('/conductores/:id', conductoresController.deleteConductor);

module.exports = router;
