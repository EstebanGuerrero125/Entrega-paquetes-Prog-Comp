// controller/vehiculosController.js
const Vehiculo = require('../models/vehiculosModel');
const vehiculosModel = require('../models/vehiculosModel'); // Asumiendo que tienes un archivo para manejar la lectura/escritura de vehículos
const fs = require('fs');
const dataFilePath = './data/vehiculos.json';

// Obtener todos los vehículos
function getAllVehiculos(req, res) {
    try {
        const vehiculos = vehiculosModel.getVehiculos();
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los vehículos" });
    }
}

// Obtener vehículo por placa
function getVehiculoByPlaca(req, res) {
    try {
        const vehiculos = vehiculosModel.getVehiculos();
        const vehiculo = vehiculos.find(v => v.placa === req.params.placa);

        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json(vehiculo);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el vehículo" });
    }
}

// Crear nuevo vehículo
function createVehiculo(req, res) {
    try {
        const vehiculoData = req.body;
        if (!vehiculoData.placa || !vehiculoData.modelo || !vehiculoData.marca) {
            return res.status(400).json({ error: "Datos del vehículo inválidos o incompletos" });
        }

        const vehiculos = vehiculosModel.getVehiculos();

        const newVehiculo = new Vehiculo(
            vehiculoData.placa,
            vehiculoData.modelo,
            vehiculoData.color,
            vehiculoData.marca,
            vehiculoData.capacidadCarga
        );

        vehiculos.push(newVehiculo);
        vehiculosModel.saveVehiculos(vehiculos);
        res.status(201).json(newVehiculo);
    } catch (error) {
        console.error("Error al crear el vehículo:", error);
        res.status(500).json({ message: "Error al crear el vehículo", error: error.message });
    }
}

// Actualizar vehículo
function updateVehiculo(req, res) {
    try {
        const vehiculos = vehiculosModel.getVehiculos();
        const vehiculoIndex = vehiculos.findIndex(v => v.placa === req.params.placa);

        if (vehiculoIndex === -1) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }

        const updateData = req.body;
        const currentVehiculo = vehiculos[vehiculoIndex];

        vehiculos[vehiculoIndex] = {
            ...currentVehiculo,
            modelo: updateData.modelo || currentVehiculo.modelo,
            color: updateData.color || currentVehiculo.color,
            marca: updateData.marca || currentVehiculo.marca,
            capacidadCarga: updateData.capacidadCarga || currentVehiculo.capacidadCarga
        };

        vehiculosModel.saveVehiculos(vehiculos);
        res.json(vehiculos[vehiculoIndex]);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el vehículo" });
    }
}

// Eliminar vehículo
function deleteVehiculo(req, res) {
    try {
        const vehiculos = vehiculosModel.getVehiculos();
        const newVehiculos = vehiculos.filter(v => v.placa !== req.params.placa);

        if (newVehiculos.length === vehiculos.length) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }

        vehiculosModel.saveVehiculos(newVehiculos);
        res.json({ message: 'Vehículo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el vehículo" });
    }
}

module.exports = {
    getAllVehiculos,
    getVehiculoByPlaca,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo
};
