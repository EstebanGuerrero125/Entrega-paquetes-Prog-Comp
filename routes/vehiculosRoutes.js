const express = require('express');
const router = express.Router();
const vehiculosController = require('../controller/vehiculosController');

// Obtener todos los vehículos
router.get('/vehiculos', vehiculosController.getAllVehiculos);

// Obtener vehículo por placa
router.get('/vehiculos/:placa', vehiculosController.getVehiculoByPlaca);

// Crear nuevo vehículo
router.post('/vehiculos', vehiculosController.createVehiculo);

// Actualizar vehículo
router.put('/vehiculos/:placa', vehiculosController.updateVehiculo);

// Eliminar vehículo
router.delete('/vehiculos/:placa', vehiculosController.deleteVehiculo);

module.exports = router;
