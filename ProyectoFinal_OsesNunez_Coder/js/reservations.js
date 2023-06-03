const currentUser = JSON.parse(localStorage.getItem('current-user'));

$(document).ready(function() {
    loadReservations();
});

function loadReservations() {
    // Remove any edit
    localStorage.removeItem('editReserv');    

    // Check Reservations
    const reservationsStorage = JSON.parse(localStorage.getItem('reservations'));
    const reservationsContainer = document.getElementById('contenedor');

    if (reservationsStorage !== null && 
        reservationsStorage.length > 0) {
        var reservNumber = 0;
        reservationsStorage.forEach(reservation => {
            reservNumber++;
            const card = reservationCard(reservation, reservNumber);
            reservationsContainer.appendChild(card);
        }); 
    } else {
        const cardError = document.createElement('div');
        cardError.className = 'col-12 col-sm-6 col-md-4 reservas';
    
        const h3Error = document.createElement('h3');
        h3Error.textContent = 'No hay Reservaciones';

        cardError.appendChild(h3Error);
        reservationsContainer.appendChild(cardError);
    }
}

function reservationCard(reservation, reservNumber) {
    const card = document.createElement('div');
    card.className = 'col-12 col-sm-6 col-md-4 reservas';
    
    const h3 = document.createElement('h3');
    h3.textContent = 'Reserva #' + reservNumber;

    const divCard = document.createElement('div');
    divCard.className = 'card';

    // Card Body 
    const divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.textContent = 'Reserva #' + reservNumber;

    const ul = document.createElement('ul');
    ul.className = 'list-group list-group-flush text-start';

    // Body li
    const liName = document.createElement('li');
    liName.className = 'list-group-item';
    liName.textContent = "Nombre: ";
    const spanName = document.createElement('span');
    spanName.textContent = reservation['Nombre'];
    liName.appendChild(spanName);
    ul.appendChild(liName);

    const liModelo = document.createElement('li');
    liModelo.className = 'list-group-item';
    liModelo.textContent = "Modelo: ";
    const spanModelo = document.createElement('span');
    spanModelo.textContent = reservation['Modelo'];
    liModelo.appendChild(spanModelo);
    ul.appendChild(liModelo);

    const liRecepcion = document.createElement('li');
    liRecepcion.className = 'list-group-item';
    liRecepcion.textContent = "Lugar de recepción: ";
    const spanRecepcion = document.createElement('span');
    spanRecepcion.textContent = reservation['LugarRecepción'];
    liRecepcion.appendChild(spanRecepcion);
    ul.appendChild(liRecepcion);

    const liEntrega = document.createElement('li');
    liEntrega.className = 'list-group-item';
    liEntrega.textContent = "Lugar de entrega: ";
    const spanEntrega = document.createElement('span');
    spanEntrega.textContent = reservation['LugarEntrega'];
    liEntrega.appendChild(spanEntrega);
    ul.appendChild(liEntrega);

    const liExtras = document.createElement('li');
    liExtras.className = 'list-group-item';
    liExtras.textContent = "Extras: ";
    const spanExtras = document.createElement('span');
    spanExtras.textContent = reservation['ExtrasDesc'];
    liExtras.appendChild(spanExtras);
    ul.appendChild(liExtras);

    const liCostos = document.createElement('li');
    liCostos.className = 'list-group-item';
    liCostos.style = 'text-align: center; margin: 5px 0; font-weight: 700;';
    liCostos.textContent = "Costo Total: ";
    const spanCostos = document.createElement('span');
    spanCostos.textContent = '$' + reservation['Costototal'];
    liCostos.appendChild(spanCostos);
    ul.appendChild(liCostos);

    // Actions
    const editBtn =  document.createElement('a');
    editBtn.className = 'card-link';
    editBtn.textContent = 'Editar';
    editBtn.href = "index.html";
    editBtn.onclick = function() {
        editReserv(reservNumber);
      };

    const deleteBtn =  document.createElement('a');
    deleteBtn.className = 'card-link';
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.href = "#";
    deleteBtn.onclick = function() {
        deleteReserv(reservNumber);
      };

    divCardBody.appendChild(h5);
    divCardBody.appendChild(ul);
    divCardBody.appendChild(editBtn);
    divCardBody.appendChild(deleteBtn);
    divCard.appendChild(divCardBody);
    card.appendChild(h3);
    card.appendChild(divCard);
    return card;
}

function deleteReserv(reservNumber) {
    const reservationsMemory = JSON.parse(localStorage.getItem('reservations'));
    const indexDel = reservNumber - 1;
    delete reservationsMemory[indexDel];
    var filteredArray = reservationsMemory.filter(function(element) {
        return element !== null;
      });
    // Delete current
    localStorage.removeItem('reservations');
    // Save New
    localStorage.setItem('reservations', JSON.stringify(filteredArray));

    // Rebuild 
    location.reload();
}

function editReserv (reservNumber) {
    var idxReserv = reservNumber - 1;
    localStorage.setItem('editReserv', JSON.stringify(idxReserv));
}
