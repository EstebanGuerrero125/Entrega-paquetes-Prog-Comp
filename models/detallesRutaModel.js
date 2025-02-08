const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON
const filePath = path.join(__dirname, '../data/rutas.json');

// Obtener detalles de ruta para una ruta específica
function getDetallesRuta(rutaId) {
    try {
        const rutas = getRutas(); // Usar la función getRutas de este mismo archivo
        const ruta = rutas.find(r => r.id === rutaId);

        if (!ruta) {
            console.log(`Ruta con ID ${rutaId} no encontrada`);
            return []; // Retorna un array vacío si la ruta no existe
        }

        return ruta.detalles || []; // Retorna los detalles de la ruta o un array vacío si no hay
    } catch (error) {
        console.error("Error al obtener los detalles de la ruta:", error);
        return [];
    }
}

// Guardar detalles de ruta para una ruta específica
function saveDetallesRuta(rutaId, detalles) {
    try {
        const rutas = getRutas();
        const rutaIndex = rutas.findIndex(r => r.id === rutaId);

        if (rutaIndex === -1) {
            console.log(`Ruta con ID ${rutaId} no encontrada para actualizar detalles`);
            return; // No hace nada si la ruta no existe
        }

        rutas[rutaIndex].detalles = detalles; // Actualiza los detalles de la ruta

        saveRutas(rutas); // Guarda todas las rutas (incluyendo la actualizada)
        console.log(`Detalles de la ruta ${rutaId} guardados correctamente`);
    } catch (error) {
        console.error("Error al guardar los detalles de la ruta:", error);
    }
}

// Función interna para leer las rutas (reutilizada para evitar duplicación)
function getRutas() {
    try {
        if (!fs.existsSync(filePath)) {
            return []; // Retorna un array vacío si el archivo no existe
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error al leer el archivo de rutas:", error);
        return [];
    }
}

// Función interna para guardar las rutas (reutilizada para evitar duplicación)
function saveRutas(rutas) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(rutas, null, 2), 'utf-8');
        console.log("Datos de rutas guardados correctamente");
    } catch (error) {
        console.error("Error al guardar los datos de rutas:", error);
    }
}

module.exports = {
    getDetallesRuta,
    saveDetallesRuta
};
