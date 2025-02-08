// controller/detallesRutaController.js
const DetalleRuta = require('../models/detallesRutaModel');
const detallesRutaModel = require('../models/detallesRutaModel'); // Asumiendo que tienes un archivo para manejar la lectura/escritura de detalles de rutas

// Obtener todos los detalles de ruta (para una ruta específica)
function getAllDetallesRuta(req, res) {
    try {
        const rutaId = req.params.rutaId;
        const detalles = detallesRutaModel.getDetallesRuta(rutaId);
        res.json(detalles);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los detalles de la ruta" });
    }
}

// Obtener detalle de ruta por ID
function getDetalleRutaById(req, res) {
    try {
        const rutaId = req.params.rutaId;
        const detalleId = req.params.id;
        const detalles = detallesRutaModel.getDetallesRuta(rutaId);
        const detalle = detalles.find(d => d.id === detalleId);

        if (!detalle) {
            return res.status(404).json({ message: 'Detalle de ruta no encontrado' });
        }
        res.json(detalle);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el detalle de la ruta" });
    }
}

// Crear nuevo detalle de ruta
function createDetalleRuta(req, res) {
    try {
        const rutaId = req.params.rutaId;
        const detalleData = req.body;
        if (!detalleData.latitud || !detalleData.longitud || !detalleData.direccion || !detalleData.numeroPaquete) {
            return res.status(400).json({ error: "Datos del detalle de ruta inválidos o incompletos" });
        }

        const detalles = detallesRutaModel.getDetallesRuta(rutaId);

        const newDetalleRuta = new DetalleRuta(
            rutaId,  // Asignar el ID de la ruta al detalle
            detalleData.latitud,
            detalleData.longitud,
            detalleData.direccion,
            detalleData.numeroPaquete
        );

        newDetalleRuta.id = detalles.length > 0 ? Math.max(...detalles.map(d => d.id)) + 1 : 1;
        detalles.push(newDetalleRuta);
        detallesRutaModel.saveDetallesRuta(rutaId, detalles); // Pasar el ID de la ruta al guardar
        res.status(201).json(newDetalleRuta);
    } catch (error) {
        console.error("Error al crear el detalle de la ruta:", error);
        res.status(500).json({ message: "Error al crear el detalle de la ruta", error: error.message });
    }
}

// Actualizar detalle de ruta
function updateDetalleRuta(req, res) {
    try {
        const rutaId = req.params.rutaId;
        const detalleId = req.params.id;
        const detalles = detallesRutaModel.getDetallesRuta(rutaId);
        const detalleIndex = detalles.findIndex(d => d.id === detalleId);

        if (detalleIndex === -1) {
            return res.status(404).json({ message: "Detalle de ruta no encontrado" });
        }

        const updateData = req.body;
        const currentDetalle = detalles[detalleIndex];

        detalles[detalleIndex] = {
            ...currentDetalle,
            latitud: updateData.latitud || currentDetalle.latitud,
            longitud: updateData.longitud || currentDetalle.longitud,
            direccion: updateData.direccion || currentDetalle.direccion,
            numeroPaquete: updateData.numeroPaquete || currentDetalle.numeroPaquete
        };

        detallesRutaModel.saveDetallesRuta(rutaId, detalles);
        res.json(detalles[detalleIndex]);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el detalle de la ruta" });
    }
}

// Eliminar detalle de ruta
function deleteDetalleRuta(req, res) {
    try {
        const rutaId = req.params.rutaId;
        const detalleId = req.params.id;
        const detalles = detallesRutaModel.getDetallesRuta(rutaId);
        const newDetalles = detalles.filter(d => d.id !== detalleId);

        if (newDetalles.length === detalles.length) {
            return res.status(404).json({ message: 'Detalle de ruta no encontrado' });
        }

        detallesRutaModel.saveDetallesRuta(rutaId, newDetalles);
        res.json({ message: 'Detalle de ruta eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el detalle de la ruta" });
    }
}

module.exports = {
    getAllDetallesRuta,
    getDetalleRutaById,
    createDetalleRuta,
    updateDetalleRuta,
    deleteDetalleRuta
};
