const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON
const filePath = path.join(__dirname, '../data/conductores.json');

// Leer datos del JSON con manejo de errores
function getConductores() {
    try {
        if (!fs.existsSync(filePath)) {
            return []; // Retorna un array vacío si el archivo no existe
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error al leer el archivo de conductores:", error);
        return [];
    }
}

// Guardar datos en el JSON con manejo de errores
function saveConductores(conductores) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(conductores, null, 2), 'utf-8');
        console.log("Datos de conductores guardados correctamente");
    } catch (error) {
        console.error("Error al guardar los datos de conductores:", error);
    }
}

module.exports = {
    getConductores,
    saveConductores
};
