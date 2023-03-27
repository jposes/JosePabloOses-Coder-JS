//Simulador de un Rent a Car
//Debemos generar un script para un Rent a Car
/* El mismo tiene que: 
1- Mostrar un mensaje de bienvenida al usuario consultandole su nombre
2- En pantalla mostrar las siguientes opciones: 
 Seleccione el modelo de vehiculo que necesita:
  a- Sedans
  b- SUV
  c- 4x4
  d- Special 4x4

 Guardar la seleccion del usuario y continuar

3- Mostrarle la siguiente pregunta:

  a- Cuanto dias necesita alquilar el vehiculo?

Guardar la seleccion del usuario y continuar

4- Multiplicar los dias selecionados por el valor de $100 

5- Mostrarle al usuario en pantalla la seleccion de vehiculo que hizo + los dias a alquilar el vehiculo y preguntarle si esta correcto, si esta correcto mostrarle un mensaje diciendo "¡Gracias por elegir nuestro servicio! ¡Disfruta de tu viaje!", sino esta correcto devolver al usuario al punto 2 para volver a empezar

6- Final del script

*/


//1
let nombre = prompt("Bienvenido a nuestro servicio de Rent a Car! Ingresa tu nombre por favor:");
alert("¡Hola " + nombre + "! Bienvenido/a a nuestro Rent a Car.");

//2
let modelo = "";
let costoPorDia;
while (!modelo) {
  let seleccionUsuario = prompt(
    "Seleccione el modelo de vehículo que necesita:\n" +
      "a- Sedans\n" +
      "b- SUV\n" +
      "c- 4x4\n" +
      "d- Special 4x4"
  );
  switch (seleccionUsuario) {
    case "a":
      modelo = "Sedans";
      costoPorDia = 100;
      break;
    case "b":
      modelo = "SUV";
      costoPorDia = 200;
      break;
    case "c":
      modelo = "4x4";
      costoPorDia = 150;
      break;
    case "d":
      modelo = "Special 4x4";
      costoPorDia = 300;
      break;
  }
}

//3
let dias = "";

while (!dias) {
  let seleccionUsuario = prompt("¿Cuántos días necesita alquilar el vehículo?");

  if (!seleccionUsuario || isNaN(seleccionUsuario)) {
    alert("Lo siento, '" + seleccionUsuario + "' no es un número válido.");
  } else {
    dias = seleccionUsuario;
  }
}

//4
let costoTotal = dias * costoPorDia;

//5
let confirmacion = false;
while (!confirmacion) {
  let seleccionUsuario = prompt(
    nombre + " " + "has seleccionado un " +  modelo + " para alquilar durante " + dias + " días. El costo total será $" +  costoTotal +  ". ¿Está seguro de realizar la compra? Responde 'si' o 'no'"
  );
  if (seleccionUsuario.toLowerCase() === "si") {
    confirmacion = true;
    alert(nombre + " " + "¡Gracias por elegir nuestro servicio! ¡Disfruta de tu viaje!");
  } else if (seleccionUsuario.toLowerCase() === "no") {
    modelo = "";
    while (!modelo) {
      let newmodelo = prompt(
        "Seleccione el modelo de vehículo que necesita:\n" +
          "a- Sedans\n" +
          "b- SUV\n" +
          "c- 4x4\n" +
          "d- Special 4x4"
      );
      switch (newmodelo) {
        case "a":
          modelo = "Sedans";
          costoPorDia = 100;
          break;
        case "b":
          modelo = "SUV";
          costoPorDia = 200;
          break;
        case "c":
          modelo = "4x4";
          costoPorDia = 150;
          break;
        case "d":
          modelo = "Special 4x4";
          costoPorDia = 300;
          break;
      }
    }

    dias = "";
    while (!dias) {
      let seleccionUsuario = prompt("¿Cuántos días necesita alquilar el vehículo?");
    
      if (!seleccionUsuario || isNaN(seleccionUsuario)) {
        alert("Lo siento, '" + seleccionUsuario + "' no es un número válido.");
      } else {
        dias = seleccionUsuario;
      }
    }
    costoTotal = dias * costoPorDia;
  }
}

