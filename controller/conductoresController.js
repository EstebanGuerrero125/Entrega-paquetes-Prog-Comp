// controller/conductoresController.js
const Conductor = require('../models/conductoresModel');
const conductoresModel = require('../models/conductoresModel'); // Asumiendo que tienes un archivo para manejar la lectura/escritura de conductores
const fs = require('fs');
const dataFilePath = './data/conductores.json';

// Obtener todos los conductores
function getAllConductores(req, res) {
    try {
        const conductores = conductoresModel.getConductores();
        res.json(conductores);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los conductores" });
    }
}

// Obtener conductor por ID
function getConductorById(req, res) {
    try {
        const conductores = conductoresModel.getConductores();
        const conductor = conductores.find(c => c.id === req.params.id);

        if (!conductor) {
            return res.status(404).json({ message: 'Conductor no encontrado' });
        }
        res.json(conductor);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el conductor" });
    }
}

// Crear nuevo conductor
function createConductor(req, res) {
    try {
        const conductorData = req.body;
        if (!conductorData.id || !conductorData.nombres || !conductorData.apellidos) {
            return res.status(400).json({ error: "Datos del conductor inválidos o incompletos" });
        }

        const conductores = conductoresModel.getConductores();

        const newConductor = new Conductor(
            conductorData.id,
            conductorData.nombres,
            conductorData.apellidos,
            conductorData.numeroLicencia,
            conductorData.telefono,
            conductorData.correo
        );

        conductores.push(newConductor);
        conductoresModel.saveConductores(conductores);
        res.status(201).json(newConductor);
    } catch (error) {
        console.error("Error al crear el conductor:", error);
        res.status(500).json({ message: "Error al crear el conductor", error: error.message });
    }
}

// Actualizar conductor
function updateConductor(req, res) {
    try {
        const conductores = conductoresModel.getConductores();
        const conductorIndex = conductores.findIndex(c => c.id === req.params.id);

        if (conductorIndex === -1) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }

        const updateData = req.body;
        const currentConductor = conductores[conductorIndex];

        conductores[conductorIndex] = {
            ...currentConductor,
            nombres: updateData.nombres || currentConductor.nombres,
            apellidos: updateData.apellidos || currentConductor.apellidos,
            numeroLicencia: updateData.numeroLicencia || currentConductor.numeroLicencia,
            telefono: updateData.telefono || currentConductor.telefono,
            correo: updateData.correo || currentConductor.correo
        };

        conductoresModel.saveConductores(conductores);
        res.json(conductores[conductorIndex]);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el conductor" });
    }
}

// Eliminar conductor
function deleteConductor(req, res) {
    try {
        const conductores = conductoresModel.getConductores();
        const newConductores = conductores.filter(c => c.id !== req.params.id);

        if (newConductores.length === conductores.length) {
            return res.status(404).json({ message: 'Conductor no encontrado' });
        }

        conductoresModel.saveConductores(newConductores);
        res.json({ message: 'Conductor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el conductor" });
    }
}

module.exports = {
    getAllConductores,
    getConductorById,
    createConductor,
    updateConductor,
    deleteConductor
};
