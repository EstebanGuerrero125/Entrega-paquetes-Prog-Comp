const express = require('express');
const router = express.Router();
const detallesRutaController = require('../controller/detallesRutaController');

// Obtener todos los detalles de ruta (para una ruta específica)
router.get('/:rutaId/detalles', detallesRutaController.getAllDetallesRuta);

// Obtener detalle de ruta por ID
router.get('/:rutaId/detalles/:id', detallesRutaController.getDetalleRutaById);

// Crear nuevo detalle de ruta
router.post('/:rutaId/detalles', detallesRutaController.createDetalleRuta);

// Actualizar detalle de ruta
router.put('/:rutaId/detalles/:id', detallesRutaController.updateDetalleRuta);

// Eliminar detalle de ruta
router.delete('/:rutaId/detalles/:id', detallesRutaController.deleteDetalleRuta);

module.exports = router;
