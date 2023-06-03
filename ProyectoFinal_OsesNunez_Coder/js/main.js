// Project Variables
const currentUser = JSON.parse(localStorage.getItem('current-user'));
const editReserv = JSON.parse(localStorage.getItem('editReserv'));
const reservationsStorage = JSON.parse(localStorage.getItem('reservations'));
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
var jsonReservation = {};

if (currentUser) {
  const usernameElement = document.getElementById('username');
  usernameElement.textContent = currentUser.usuario;
} else {
  window.location.href = 'login.html';
}

const btnSearch = document.querySelector("#btnSearch"),
  inputIngreso = document.querySelector("#ingreso");
const contenedor = document.querySelector("#contenedor");

const extras = [
  {nombre: "GPS", costoPorDia: 50},
  {nombre: "Asientos para niños", costoPorDia: 30},
  {nombre: "Seguro adicional", costoPorDia: 100},
];


// Init Document
$(document).ready(function() {
// Cars Action
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

  modeloInputs.forEach((modeloInput) => {
    modeloInput.addEventListener('change', () => {
      modeloSeleccionado = parseInt(modeloInput.value);
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

  // Date Picker Action
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

 // Edit Reservation
  if (editReserv !== null) {
    editReservation();
  }
});


// Btns Actions
btnSearch.addEventListener("click", () => {
  let encontrado = buscarServicio(vehiculos, inputIngreso.value);
  crearHtml(encontrado);
});

cancelarButton.addEventListener('click', () => {
  confirmacionDiv.style.display = 'none';
}); 

confirmarButton.addEventListener('click', () => {
  message.textContent = '¡Gracias por alquilar con nosotros!';
  popup.style.display = 'block';

  // Save Reservation
  saveReservations();
});

closeButton.addEventListener('click', () => {
  popup.style.display = 'none';
  location.reload();
});

alquilarButton.addEventListener('click', () => {
  var AllowAlquiler = validarCampos();
  if (AllowAlquiler) {
    const username = usernameElement.textContent;
    const dias = parseInt(diasInput.value);
    const lugarRecibe = lugarRecibeInput.value;
    const lugarEntrega = lugarEntregaInput.value;
    const vehiculoSeleccionado = modeloSeleccionado;
    const costoModelo = vehiculoSeleccionado.Price;
    var fechaInicio = document.getElementById('datePicker1').value;
    var fechaFinal = document.getElementById('datePicker2').value;
    const costoExtras = extrasSeleccionados.reduce(
      (acumulado, extra) =>
        acumulado +
        [50, 30, 100][extra] *
          (diasInput.value ? parseInt(diasInput.value) : 1),
      0,
    );
    
    const costoTotal = (costoModelo * dias) + costoExtras;

    var extrasInfo = "";
    if (extrasSeleccionados.length > 0) {
      extrasInfo = extrasSeleccionados
      .map((extra) => extrasInputs[extra].nextSibling.textContent.trim())
      .join(', ');
    } else { extrasInfo = "Ninguno" }
  
    confirmacionDatosP.innerText = `
      Nombre: ${username}
      Modelo: ${vehiculoSeleccionado.Type} ($${costoModelo}/día)
      Días: ${dias}
      FechaInicio: ${fechaInicio}
      FechaFinal: ${fechaFinal}
      Lugar de recepción: ${lugarRecibe}
      Lugar de entrega: ${lugarEntrega}
      Extras: ${extrasInfo}
      Costo total: $${costoTotal}
    `;

    jsonReservation = {
      Nombre: username,
      ModeloId: vehiculoSeleccionado.Id,
      CostoDia: costoModelo,
      Modelo: vehiculoSeleccionado.Type,
      Días: dias,
      FechaInicio: fechaInicio,
      FechaFinal: fechaFinal,
      LugarRecepción: lugarRecibe,
      LugarEntrega: lugarEntrega,
      Extras: extrasSeleccionados,
      ExtrasDesc: extrasInfo,
      Costototal: costoTotal
    };

    confirmacionDiv.style.display = 'block';
  }
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
  p.textContent = `Precio: $${vehiculo["Price"]}`;

  const cardAction = document.createElement('div');
  cardAction.className = 'card-action';

  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'vehiculo';
  radio.value = vehiculo["Id"];

  //Reservation
  if (editReserv !== null && vehiculo["Id"] === reservationsStorage[editReserv]["ModeloId"]) {
    radio.checked = true;
    modeloSeleccionado = vehiculo;
  }

  const label = document.createElement('label');
  label.for = `vehiculo-${vehiculo["Id"]}`;
  label.textContent = 'Seleccionar';

  radio.addEventListener('click', () => {
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


// Función para determinar los dias de renta de un vehiculo
function obtenerDias() {
   // Set Rent Days
    var fechaInicio = document.getElementById('datePicker1').value;
    var fechaFinal = document.getElementById('datePicker2').value;
    var dias = document.getElementById('dias');
    
    //console.log(fechaInicio + "---" + fechaFinal );
    if (fechaInicio !== "" && fechaFinal !== "") {
      dias.value = CalcularDias(fechaInicio, fechaFinal);  
    } else { dias.value = ""; }
}


// Función para calcular los dias
function CalcularDias(fechaInicio, fechaFinal) {
  var inicio = new Date(fechaInicio);
  var final = new Date(fechaFinal);

  // Calcular diferencia
  var tiempoDiff = Math.abs(final - inicio);

  // Convertir la diferencia en dias
  var dias = Math.ceil(tiempoDiff / (1000 * 60 * 60 * 24));

  return dias;
}

/* Funcion para validar el action de Alquilar */
function validarCampos() {
  var validateAlquiler = false;
  var validateModelo = false;
  var validateDias = false;
  var validateLugarRecibido = false;
  var ValidateLugarEntrega = false;

  // Validar Selección de Modelo
  if (modeloSeleccionado !== 0) { validateModelo = true; } 
  else { validateModelo = false; } 

  // Validar Dias de Alquiler
  var diasSeleccionados = document.getElementById('dias').value;
  var diasError = document.getElementById('diasError');
  if (diasSeleccionados > 0) { 
    diasError.classList.remove('showError');
    diasError.classList.add('hideError')
    validateDias = true; 
  } 
  else { 
    diasError.classList.remove('hideError')
    diasError.classList.add('showError');
    validateDias = false; 
  } 

  // Validar Lugar de Recibido 
  var lugarRecibidoInfo = document.getElementById('lugarRecibe').value;
  var lugarRecibeError = document.getElementById('lugarRecibeError');
  if (lugarRecibidoInfo !== "") { 
    lugarRecibeError.classList.remove('showError');
    lugarRecibeError.classList.add('hideError')
    validateLugarRecibido = true; 
  } 
  else { 
    lugarRecibeError.classList.remove('hideError')
    lugarRecibeError.classList.add('showError');
    validateLugarRecibido = false; 
  } 

  // Validar Lugar de Entrega
  var lugarEntregaInfo = document.getElementById('lugarEntrega').value;
  var lugarEntregaError = document.getElementById('lugarEntregaError');
  if (lugarEntregaInfo !== "") {
     lugarEntregaError.classList.remove('showError');
     lugarEntregaError.classList.add('hideError')
     ValidateLugarEntrega = true; 
    } 
  else { 
    lugarEntregaError.classList.remove('hideError')
    lugarEntregaError.classList.add('showError');
    ValidateLugarEntrega = false; 
  } 

  if (validateModelo === true && 
      validateDias === true &&
      validateLugarRecibido === true &&
      ValidateLugarEntrega === true) 
  { validateAlquiler = true; } 
  else 
  { 
    validateAlquiler = false; 
  }

  return validateAlquiler;
} 

// Save Reservations
function saveReservations() {
  var jsonToSave = jsonReservation; 
  var localStorageJson = localStorage.getItem('reservations');
  if (localStorageJson !== null) {
    // Save Multiple 
    if (editReserv !== null) {
      var jsonArray = JSON.parse(localStorageJson);
      delete jsonArray[editReserv];
      var filteredArray = jsonArray.filter(function(element) {
        return element !== null;
      });
      
      
      
      filteredArray.push(jsonToSave);



      localStorage.setItem('reservations', JSON.stringify(filteredArray));
      localStorage.removeItem('editReserv');
    } else {
      var jsonArray = JSON.parse(localStorageJson);
      jsonArray.push(jsonToSave);
      localStorage.setItem('reservations', JSON.stringify(jsonArray));
    }
  } else {
    // Save First 
    localStorage.setItem('reservations', JSON.stringify([jsonToSave]));
  }
}

// Edit Reservation
function editReservation() {
  var diasReserv = document.getElementById('dias');
  var extra0 = document.getElementById('extra0'); 
  var extra1 = document.getElementById('extra1'); 
  var extra2 = document.getElementById('extra2'); 
  var fechaInicioReserv = document.getElementById('datePicker1');
  var fechaFinalReserv = document.getElementById('datePicker2');

  diasReserv.value = reservationsStorage[editReserv]["Días"];
  fechaInicioReserv.value = reservationsStorage[editReserv]["FechaInicio"];
  fechaFinalReserv.value = reservationsStorage[editReserv]["FechaFinal"];
  lugarRecibeInput.value = reservationsStorage[editReserv]["LugarRecepción"];
  lugarEntregaInput.value = reservationsStorage[editReserv]["LugarEntrega"];

  // Extras Data
  var extrasReserv = reservationsStorage[editReserv]["Extras"];
  if (extrasReserv.length > 0) {
    extrasReserv.forEach(extra => {
      if (extra === 0) { extra0.checked = true; }
      if (extra === 1) { extra1.checked = true; }
      if (extra === 2) { extra2.checked = true; }
    });
  }

}
