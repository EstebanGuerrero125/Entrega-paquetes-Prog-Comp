// controller/rutasController.js
const Ruta = require('../models/rutasModel');
const rutasModel = require('../models/rutasModel'); // Asumiendo que tienes un archivo para manejar la lectura/escritura de rutas
const fs = require('fs');
const dataFilePath = './data/rutas.json';

// Obtener todas las rutas
function getAllRutas(req, res) {
    try {
        const rutas = rutasModel.getRutas();
        res.json(rutas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las rutas" });
    }
}

// Obtener ruta por ID
function getRutaById(req, res) {
    try {
        const rutas = rutasModel.getRutas();
        const ruta = rutas.find(r => r.id === req.params.id);

        if (!ruta) {
            return res.status(404).json({ message: 'Ruta no encontrada' });
        }
        res.json(ruta);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la ruta" });
    }
}

// Crear nueva ruta
function createRuta(req, res) {
    try {
        const rutaData = req.body;
        if (!rutaData.conductor || !rutaData.vehiculo || !rutaData.fecha) {
            return res.status(400).json({ error: "Datos de la ruta inválidos o incompletos" });
        }

        const rutas = rutasModel.getRutas();

        const newRuta = new Ruta(
            rutaData.conductor,
            rutaData.vehiculo,
            rutaData.fecha
        );

        newRuta.id = rutas.length > 0 ? Math.max(...rutas.map(r => r.id)) + 1 : 1;  // Asignar un ID
        rutas.push(newRuta);
        rutasModel.saveRutas(rutas);
        res.status(201).json(newRuta);
    } catch (error) {
        console.error("Error al crear la ruta:", error);
        res.status(500).json({ message: "Error al crear la ruta", error: error.message });
    }
}

// Actualizar ruta
function updateRuta(req, res) {
    try {
        const rutas = rutasModel.getRutas();
        const rutaIndex = rutas.findIndex(r => r.id === parseInt(req.params.id));

        if (rutaIndex === -1) {
            return res.status(404).json({ message: "Ruta no encontrada" });
        }

        const updateData = req.body;
        const currentRuta = rutas[rutaIndex];

        rutas[rutaIndex] = {
            ...currentRuta,
            conductor: updateData.conductor || currentRuta.conductor,
            vehiculo: updateData.vehiculo || currentRuta.vehiculo,
            fecha: updateData.fecha || currentRuta.fecha
        };

        rutasModel.saveRutas(rutas);
        res.json(rutas[rutaIndex]);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la ruta" });
    }
}

// Eliminar ruta
function deleteRuta(req, res) {
    try {
        const rutas = rutasModel.getRutas();
        const newRutas = rutas.filter(r => r.id !== parseInt(req.params.id));

        if (newRutas.length === rutas.length) {
            return res.status(404).json({ message: 'Ruta no encontrada' });
        }

        rutasModel.saveRutas(newRutas);
        res.json({ message: 'Ruta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la ruta" });
    }
}

// Buscar rutas (por conductor, vehículo, fecha)
function searchRutas(req, res) {
    try {
        const rutas = rutasModel.getRutas();
        let resultados = rutas;

        if (req.query.conductor) {
            resultados = resultados.filter(r => r.conductor === req.query.conductor);
        }
        if (req.query.vehiculo) {
            resultados = resultados.filter(r => r.vehiculo === req.query.vehiculo);
        }
        if (req.query.fecha) {
            resultados = resultados.filter(r => r.fecha === req.query.fecha);
        }

        res.json(resultados);
    } catch (error) {
        res.status(500).json({ message: "Error en la búsqueda de rutas" });
    }
}

module.exports = {
    getAllRutas,
    getRutaById,
    createRuta,
    updateRuta,
    deleteRuta,
    searchRutas
};
