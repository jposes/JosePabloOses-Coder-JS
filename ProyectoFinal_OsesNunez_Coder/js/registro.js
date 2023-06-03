const formRegister = document.querySelector("#formReg");
const userReg = document.querySelector("#userReg");
const passReg = document.querySelector("#passReg");
const btnRegistrar = document.querySelector("#Registrar");

let usuarios;

usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

class Usuario {
    constructor(usuario, password) {
        this.usuario = usuario;
        this.pass = password;
    }
}

function guardarUsuario(arr, usuario) {
    return arr.push(usuario);
}

function guardarEnLS(arr) {
    return localStorage.setItem('usuarios', JSON.stringify(arr));
}

formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = new Usuario(userReg.value,passReg.value);
    guardarUsuario(usuarios, newUser);
    guardarEnLS(usuarios);
    console.log(localStorage.getItem('usuarios'));
    window.location.href = 'login.html';
});