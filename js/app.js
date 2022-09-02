const conteiner = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const form = document.querySelector('#formulario');




window.addEventListener('load', () => {
    form.addEventListener('submit', buscarClima);

})

function buscarClima(e) {
    e.preventDefault();


    //Validar el formulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' && pais === '') {
        mostrarError('Todos los campos son requeridos');

        return;
    }

    //Consultar API
    consultarApi(ciudad, pais);

}

function consultarApi(ciudad, pais) {
    const appId = '08d73203f0202326693392f7daf12b03';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner();

    fetch(url)
        .then(response => response.json())
        .then(datos => {
            limpiarHTML();
            console.log(datos);
            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
                return;
            }



            //Imprime la respuesta en el HTML
            mostrarClima(datos);

        })
}

function mostrarClima(datos){
    const {name, main:{temp, temp_max, temp_min}} = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');


    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const temMax = document.createElement('p');
    temMax.innerHTML = `Max: ${max} &#8451;`;
    temMax.classList.add('text-xl');

    const temMin = document.createElement('p');
    temMin.innerHTML = `Min: ${min} &#8451;`;
    temMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(temMax);
    resultadoDiv.appendChild(temMin);
    resultadoDiv.appendChild(nombreCiudad); 

    resultado.appendChild(resultadoDiv);
    
}

function kelvinACentigrados(grados){
    return parseInt(grados - 273.15);
}

//const kelvinACentigrados = grados => {parseInt(grados - 273.15)};


function mostrarError(pMensaje) {
    
    const alerta = document.querySelector('.bg-red-100');


    if (!alerta) {
        //Crear Alerta 
        const alerta = document.createElement('div');


        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `<strong class="font-bold">Error</strong>
                        <span class="block">${pMensaje}</span> `;


        conteiner.appendChild(alerta);


        //Eliminar alerta depues de 5 segundos 
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }

}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


function Spinner() {

    limpiarHTML(); 

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
    
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  
  `;


  resultado.appendChild(divSpinner);
}