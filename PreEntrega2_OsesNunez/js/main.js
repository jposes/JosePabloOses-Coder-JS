//Simulador de un Rent a Car
//Debemos generar un script para un Rent a Car
/* El mismo tiene que: 
- Mostrar un mensaje de bienvenida al usuario consultandole su nombre
- En pantalla mostrar las siguientes opciones: 
 Seleccione el modelo de vehiculo que necesita:
  a- Sedans
  b- SUV
  c- 4x4
  d- Special 4x4

 Guardar la seleccion del usuario y continuar

- Mostrarle la siguiente pregunta:

  a- Cuanto dias necesita alquilar el vehiculo?

  Guardar la seleccion del usuario y continuar

- Pedirle al usuario que ingrese lugar de recibir y entregar:

  Guardar lo que ingreso el usuario y continuar

- Mostrarle las siguientes extras:

  a- GPS
  b- Asientos para niños 
  c- Seguro adicional

  Mostrarle la seleccion al usuario y continuar


- Mostrarle al usuario en pantalla la seleccion de vehiculo que hizo + los dias a alquilar el vehiculo + el lugar de entrega  y preguntarle si esta correcto, si esta correcto mostrarle un mensaje diciendo "¡Gracias por elegir nuestro servicio! ¡Disfruta de tu viaje!", sino esta correcto devolver al usuario al punto 2 para volver a empezar

- por ultimo mostrarle al usuario la opcion de buscar vehiculo por modelo o por precio

- Final del script

*/

let nombre = prompt("Bienvenido a nuestro servicio de Rent a Car! Ingresa tu nombre por favor:");
alert("¡Hola " + nombre + "! Bienvenido/a a nuestro Rent a Car.");

const vehiculos = [
  {modelo: "Sedans", costoPorDia: 100,},
  {modelo: "SUV", costoPorDia: 200,},
  {modelo: "4x4", costoPorDia: 350,},
  {modelo: "Special 4x4", costoPorDia: 400,},
];

const extras = [
  {nombre: "GPS", costoPorDia: 50},
  {nombre: "Asientos para niños", costoPorDia: 30},
  {nombre: "Seguro adicional", costoPorDia: 100},
];

class AlquilerVehiculo {
  constructor(dias, vehiculo, extras) {
    this.dias = dias;
    this.vehiculo = vehiculo;
    this.extras = extras;
    this.costoTotal = dias * vehiculo.costoPorDia + extras.reduce((total, extra) => total + extra.costoPorDia, 0);
  }
}

function alquilarVehiculo() {
  let modelo = "";
  let seleccionUsuario;

  while (!modelo) {
    seleccionUsuario = prompt(
      "Seleccione el modelo de vehículo que necesita:\n" +
        "a- Sedans - costo por dia $100\n" +
        "b- SUV - costo por dia $200\n" +
        "c- 4x4 - costo por dia $350\n" +
        "d- Special 4x4 - costo por dia $400"
    );
    switch (seleccionUsuario) {
      case "a":
        modelo = vehiculos[0];
        break;
      case "b":
        modelo = vehiculos[1];
        break;
      case "c":
        modelo = vehiculos[2];
        break;
      case "d":
        modelo = vehiculos[3];
        break;
    }
  }

  let dias;

  while (!dias) {
    seleccionUsuario = prompt("¿Cuántos días necesita alquilar el vehículo?");

    if (!seleccionUsuario || isNaN(seleccionUsuario)) {
      alert("Lo siento, '" + seleccionUsuario + "' no es un número válido.");
    } else {
      dias = seleccionUsuario;
    }
  }
  
  let lugarRecibe = prompt("Ingrese el lugar donde recibirá el vehículo:");
  
  let lugarEntrega = prompt("Ingrese el lugar donde entregará el vehículo:");

  let extrasSeleccionados = [];
  while (seleccionUsuario !== null) {
    seleccionUsuario = prompt(
      "¿Desea agregar alguno de los siguientes extras?\n" +
        "a- GPS - costo por dia $50\n" +
        "b- Asientos para niños - costo por dia $30\n" +
        "c- Seguro adicional - costo por dia $100\n" +
        "Presione cancelar para continuar sin extras o agregue la letra correspondiente al extra que desea seleccionar."
    );
    switch (seleccionUsuario) {
      case "a":
        extrasSeleccionados.push(extras[0]);
        break;
      case "b":
        extrasSeleccionados.push(extras[1]);
        break;
      case "c":
        extrasSeleccionados.push(extras[2]);
        break;
      case null:
        break;
      default:
        alert("Lo siento, '" + seleccionUsuario + "' no es una opción válida.");
        break;
    }
  }
  alert("Extras seleccionados: " + extrasSeleccionados.map(extra => extra.nombre).join(", "));

  const alquiler = new AlquilerVehiculo(dias, modelo, extrasSeleccionados);

  alquiler.lugarRecibe = lugarRecibe;
  
  alquiler.lugarEntrega = lugarEntrega;

  return alquiler;
}

let alquiler = alquilarVehiculo();
let confirmacion = false;

while (!confirmacion) {
  const seleccionUsuario = prompt(
    nombre + " ha seleccionado un " +  alquiler.vehiculo.modelo +  " para alquilar durante " + alquiler.dias +  " días. El costo total será $" +  alquiler.costoTotal + " " + "El vehículo deberá ser recogido en " + alquiler.lugarRecibe + " y entregado en " + alquiler.lugarEntrega + " (Si selecciono alguna o varias extras se incluyen en el precio final)"  +  ". ¿Está seguro de realizar la compra? Responde 'si' o 'no'" );
  if (seleccionUsuario?.toLowerCase() === "si") {
    confirmacion = true;
    alert(nombre + " ¡Gracias por elegir nuestro servicio! ¡Disfruta de tu viaje!");
  } else if (seleccionUsuario?.toLowerCase() === "no") {
    alquiler = alquilarVehiculo();
  }
} 

buscarVehiculos();

function buscarVehiculos() {
  const seleccionUsuario = prompt(
    "¿Desea buscar vehículos por modelo o por costo por día?\n" +
    "a- Modelo\n" +
    "b- Costo por día"
  );
  switch (seleccionUsuario) {
    case "a":
      const modeloBusqueda = prompt("Ingrese el modelo de vehículo que desea buscar:");
      const vehiculosPorModelo = vehiculos.filter(vehiculo => vehiculo.modelo.toLowerCase().includes(modeloBusqueda.toLowerCase()));
      alert("Los vehículos encontrados con el modelo '" + modeloBusqueda + "' son:\n" + vehiculosPorModelo.map(vehiculo => vehiculo.modelo).join(", "));
      break;
    case "b":
      const costoBusqueda = parseInt(prompt("Ingrese el costo por día máximo que está dispuesto a pagar:"));
      const vehiculosPorCosto = vehiculos.filter(vehiculo => vehiculo.costoPorDia <= costoBusqueda);
      alert("Los vehículos encontrados con un costo por día menor o igual a $" + costoBusqueda + " son: \n" + vehiculosPorCosto.map(vehiculo => vehiculo.modelo).join(", "));
      break;
    default:
      alert("Lo siento, '" + seleccionUsuario + "' no es una opción válida.");
      break;
  }
} 

 