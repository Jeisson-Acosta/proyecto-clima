
const urlBase = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'af599b2ae1b7210bb85bdc4950616ad3';
const ciudadInput = document.querySelector('#ciudad-a-buscar');
const buscar = document.querySelector('#buscar');
const divInfoClima = document.querySelector('.info-clima');

let difKelvin = 273.15;

function obtenerClima(){

    let ciudadBusqueda = ciudadInput.value

    if (ciudadInput){
        fetchClima(ciudadBusqueda)
    }else{

        alert('Ingresa una ciudad')
    }
}

function fetchClima(ciudadBusqueda){

    fetch(`${urlBase}weather?q=${ciudadBusqueda}&appid=${apiKey}&lang=es`)
    .then(response => response.json())
    .then(response => mostrarClima(response))
}

function mostrarClima(response){

    divInfoClima.innerHTML = '';
    const ciudad = response.name;
    const pais = response.sys.country;
    const temperatura = Math.floor(response.main.temp - difKelvin);
    const humedad = response.main.humidity;
    const icono = response.weather[0].icon;
    const descripcion = response.weather[0].description;

    //INSERTAR LA INFORMACIÓN EN EL HTML
    const ciudadAInsertar = document.createElement('h2');
    ciudadAInsertar.textContent = `${ciudad}, ${pais}`;
    divInfoClima.appendChild(ciudadAInsertar);

    const temperaturaAInsertar = document.createElement('p');
    temperaturaAInsertar.textContent = `Temperatura: ${temperatura}°C`;
    divInfoClima.appendChild(temperaturaAInsertar);

    const humedadAInsertar = document.createElement('p');
    humedadAInsertar.textContent = `Humedad: ${humedad}%`;
    divInfoClima.appendChild(humedadAInsertar);

    const iconoAInsertar = document.createElement('img');
    iconoAInsertar.src = `http://openweathermap.org/img/wn/${icono}@2x.png`;
    divInfoClima.appendChild(iconoAInsertar);

    const descripcionAInsertar = document.createElement('p');
    descripcionAInsertar.textContent = `Descripción: ${descripcion}`;
    divInfoClima.appendChild(descripcionAInsertar);
    
}

buscar.addEventListener('click', obtenerClima)

fetch(`${urlBase}weather?q=London&appid=${apiKey}`)
    .then(response => response.json())
    .then(response => {console.log(response);})

//onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}