const apiKey = "pk.99b11b386bdb98032e2484cebf760601"
const puntoInicial = {latitud: 4.757786586246297, longitud: -74.04488664305592 }
const puntoIntermedio = {latitud: 4.593078, longitud: -74.125206 }
const puntoFinal = {latitud: 4.579345, longitud: -74.156994}

const url = `https://us1.locationiq.com/v1/directions/driving/${puntoInicial.longitud},${puntoInicial.latitud};${puntoIntermedio.longitud},${puntoIntermedio.latitud};${puntoFinal.longitud},${puntoFinal.latitud}?key=${apiKey}&steps=true&alternatives=true&geometries=polyline&overview=full&geometries=geojson`

var mapa = L.map("mapContainer").setView([4.65, -74.12], 11)
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?", {}).addTo(mapa)

axios.get(url)
    .then(response => {
        ruta = response.data.routes
        distancia = ruta[0].distance
        duracion = ruta[0].duration
        
        console.log("Distancia", distancia)
        console.log("Duracion", duracion)

        const puntosRuta = ruta[0].geometry.coordinates.map(coord => [coord[1], coord[0]])
        L.polyline(puntosRuta, {
            color: "red"
        }).addTo(mapa)
    })

L.marker([puntoInicial.latitud, puntoInicial.longitud]).addTo(mapa)
L.marker([puntoIntermedio.latitud, puntoIntermedio.longitud]).addTo(mapa)
L.marker([puntoFinal.latitud, puntoFinal.longitud]).addTo(mapa)