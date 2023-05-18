const currentUser = JSON.parse(localStorage.getItem('current-user'));

if (currentUser) {
  const usernameElement = document.getElementById('username');
  usernameElement.textContent = currentUser.usuario;
} else {
  window.location.href = 'login.html';
}

const btnSearch = document.querySelector("#btnSearch"),
  inputIngreso = document.querySelector("#ingreso");
const contenedor = document.querySelector("#contenedor");


const vehiculos = [
  {id: 1, modelo: "Sedans", costoPorDia: 100, img: "01.jpg"},
  {id: 2, modelo: "SUV", costoPorDia: 200, img: "02.jpg"},
  {id: 3, modelo: "4x4", costoPorDia: 350, img: "03.jpg"},
  {id: 4, modelo: "Special 4x4", costoPorDia: 400, img: "04.jpg"},
];

const extras = [
  {nombre: "GPS", costoPorDia: 50},
  {nombre: "Asientos para niños", costoPorDia: 30},
  {nombre: "Seguro adicional", costoPorDia: 100},
];

//Filtro
function buscarServicio(arr, filtro) {
  const encontrado = arr.find((el) => {
    return el.modelo.includes(filtro);
  });
  return encontrado;
}
function filtrarServicio(arr, filtro) {
  const filtrado = arr.filter((el) => {
    return el.modelo.includes(filtro);
  });
  return filtrado;
}

function crearHtml(el) {
    contenedor.innerHTML = "";
    let html = `<div class="card">
                  <img src=" ./img/${el.img}" alt="${el.modelo}" class="img-fluid">
                  <hr>
                  <h3>${el.modelo}</h3>
                  <p>Precio: $${el.costoPorDia} </p>
                    <div class="card-action">
                      <label>
                        <input type="radio" name="alquiler" id="${el.id}">
                        Seleccionar
                      </label>
                    </div>
                </div>`;
      contenedor.innerHTML = html;
  }

btnSearch.addEventListener("click", () => {
  let encontrado = buscarServicio(vehiculos, inputIngreso.value);
  crearHtml(encontrado);
});

// Detalles de la Función
// Params: Objeto Vehiculo
// Description: Crea en el Dom cada una de las opciones de vehiculos disponible en el json File
function crearCard(vehiculo) {
  const card = document.createElement('div');
  card.className = 'card';
 
  const img = document.createElement('img');
  img.src = `${vehiculo["Image"]}`;
  img.alt = vehiculo["Type"];
  img.className = 'img-fluid';

  const hr = document.createElement('hr');

  const h3 = document.createElement('h3');
  h3.textContent = vehiculo["Type"];
  
  const p = document.createElement('p');
  p.textContent = `Precio: ${vehiculo["Price"]}`;

  const cardAction = document.createElement('div');
  cardAction.className = 'card-action';

  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'vehiculo';
  radio.value = vehiculo["Id"];

  const label = document.createElement('label');
  label.for = `vehiculo-${vehiculo["Id"]}`;
  label.textContent = 'Seleccionar';

  label.addEventListener('click', () => {
    modeloSeleccionado = vehiculo;
  });

  card.appendChild(img);
  card.appendChild(hr);
  card.appendChild(h3);
  card.appendChild(p);
  cardAction.appendChild(radio);
  cardAction.appendChild(label);
  card.appendChild(cardAction);
  return card;
}

// Cars Main Container
const vehiculosContainer = document.getElementById('vehiculos-container');

// Call Json File 
// Description: Hace una llamado al json "Cars" que contiene la información de los vehiculos
fetch("./json/cars.json")
  .then(response => response.json())
    .then(data => {
      data["cars"].forEach(vehiculo => {
        const card = crearCard(vehiculo);
        vehiculosContainer.appendChild(card);
      });
    })
.catch(error => {
  console.error('Error:', error);
});

const nombreInput = document.getElementById('nombre');
const usernameElement = document.getElementById('username');
const modeloInputs = document.getElementsByName('modelo');
const diasInput = document.getElementById('dias');
const dias = parseInt(diasInput.value);
const lugarRecibeInput = document.getElementById('lugarRecibe');
const lugarEntregaInput = document.getElementById('lugarEntrega');
const extrasInputs = document.getElementsByName('extra');
const alquilarButton = document.getElementById('alquilar');
const confirmacionDiv = document.getElementById('confirmacion');
const confirmacionDatosP = document.getElementById('confirmacion-datos');
const cancelarButton = document.getElementById('cancelar'); 

const confirmarButton = document.getElementById('confirmarButton');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('closeButton');
const message = document.getElementById('message');

  let modeloSeleccionado = 0;
  let extrasSeleccionados = [];

  modeloInputs.forEach((modeloInput) => {
    modeloInput.addEventListener('change', () => {
      modeloSeleccionado = parseInt(modeloInput.value);
      console.log(modeloSeleccionado);
    });
  });

  extrasInputs.forEach((extraInput) => {
    extraInput.addEventListener('change', () => {
      if (extraInput.checked) {
        extrasSeleccionados.push(parseInt(extraInput.value));
      } else {
        const index = extrasSeleccionados.indexOf(parseInt(extraInput.value));
        if (index > -1) {
          extrasSeleccionados.splice(index, 1);
        }
      }
    });
  });

alquilarButton.addEventListener('click', () => {
    const username = usernameElement.textContent;
    const dias = parseInt(diasInput.value);
    const lugarRecibe = lugarRecibeInput.value;
    const lugarEntrega = lugarEntregaInput.value;
    const vehiculoSeleccionado = modeloSeleccionado;
    const costoModelo = vehiculoSeleccionado.costoPorDia;
    console.log(costoModelo);
    const costoExtras = extrasSeleccionados.reduce(
      (acumulado, extra) =>
        acumulado +
        [50, 30, 100][extra] *
          (diasInput.value ? parseInt(diasInput.value) : 1),
      0,
    );
    const costoTotal = costoModelo * dias + costoExtras;
  
    confirmacionDatosP.innerText = `
      Nombre: ${username}
      Modelo: ${vehiculoSeleccionado.modelo} ($${costoModelo}/día)
      Días: ${dias}
      Lugar de recepción: ${lugarRecibe}
      Lugar de entrega: ${lugarEntrega}
      Extras: ${extrasSeleccionados
        .map((extra) => extrasInputs[extra].nextSibling.textContent.trim())
        .join(', ')}
      Costo total: $${costoTotal}
    `;
  
    confirmacionDiv.style.display = 'block';
  });

  cancelarButton.addEventListener('click', () => {
    confirmacionDiv.style.display = 'none';
  }); 

  confirmarButton.addEventListener('click', () => {
    message.textContent = '¡Gracias por alquilar con nosotros!';
    popup.style.display = 'block';
  });
  
  closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });


  // Date Picker Action
  $(document).ready(function() {
    $(function() {
        $("#datePicker1").datepicker({});
    });
  
    $(function() {
        $("#datePicker2").datepicker({});
    });
  
    $('#datePicker1').change(function() {
        startDate = $(this).datepicker('getDate');
        $("#datePicker2").datepicker("option", "minDate", startDate);
    })
  
    $('#datePicker2').change(function() {
        endDate = $(this).datepicker('getDate');
        $("#datePicker1").datepicker("option", "maxDate", endDate);
    })
  });
  
  // Funcion para determinar los dias de renta de un vehiculo
  function obtenerDias() {
     // Set Rent Days
      var fechaInicio = document.getElementById('datePicker1').value;
      var fechaFinal = document.getElementById('datePicker2').value;
      var dias = document.getElementById('dias');
      dias.value = CalcularDias(fechaInicio, fechaFinal);
  }

  function CalcularDias(fechaInicio, fechaFinal) {
    var inicio = new Date(fechaInicio);
    var final = new Date(fechaFinal);
  
    // Calcular diferencia
    var tiempoDiff = Math.abs(final - inicio);
  
    // Convertir la diferencia en dias
    var dias = Math.ceil(tiempoDiff / (1000 * 60 * 60 * 24));
  
    return dias;
  }
  
     


  /*


  // Example usage
var startDate = '05/17/2023';
var endDate = '05/20/2023';
var diasAlquiler = obtenerDias(startDate, endDate);
console.log('Days between the dates:', diasAlquiler);*/
