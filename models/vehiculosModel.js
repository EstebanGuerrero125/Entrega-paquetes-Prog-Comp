const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON
const filePath = path.join(__dirname, '../data/vehiculos.json');

// Leer datos del JSON con manejo de errores
function getVehiculos() {
    try {
        if (!fs.existsSync(filePath)) {
            return []; // Retorna un array vacío si el archivo no existe
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error al leer el archivo de vehículos:", error);
        return [];
    }
}

// Guardar datos en el JSON con manejo de errores
function saveVehiculos(vehiculos) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(vehiculos, null, 2), 'utf-8');
        console.log("Datos de vehículos guardados correctamente");
    } catch (error) {
        console.error("Error al guardar los datos de vehículos:", error);
    }
}

module.exports = {
    getVehiculos,
    saveVehiculos
};
