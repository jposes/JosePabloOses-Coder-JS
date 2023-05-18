const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

const users = JSON.parse(localStorage.getItem('usuarios')) || [];

// Usuario prueba
users.push({  
  usuario: 'jose123', 
  pass: '1234' 
});
localStorage.setItem('usuarios', JSON.stringify(users));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find((user) => user.usuario === username && user.pass === password);

  if (user) {
    localStorage.setItem('current-user', JSON.stringify(user));
    window.location.href = 'index.html';
  } else {
    errorMessage.style.display = 'block';
  }
});