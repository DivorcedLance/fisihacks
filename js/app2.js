import { insert, read } from './firestore.js';

const user_form = document.getElementById('login-form');

const email_input = document.getElementById('email');
const password_input = document.getElementById('password');

let s_email = 'error';

const NotRegisteredError = new Error(
  'Este correo no está registrado en FisiHacks. Registrate!!!'
);

const PasswordError = new Error('Contraseña incorrecta');

const alertPlaceholder = document.getElementById('alertPlaceholder');

function redirect() {
  setTimeout(myURL, 0);
}

function myURL() {
  document.location.href = 'index-authorized.html';
}

const alert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" id='alert1' role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('');

  alertPlaceholder.append(wrapper);

  setTimeout(function () {
    let bsAlert = new bootstrap.Alert(document.getElementById('alert1'));
    bsAlert.close();
  }, 4000);
};

async function add_form(e) {
  e.preventDefault();

  let email = email_input.value;
  const password = password_input.value;

  let valid_form = false;
  try {
    const response = await read('users');
    try {
      response.forEach((doc) => {
        if (email === doc.data().email) {
          valid_form = true;
          if (password === doc.data().password) {
            alert('Ingreso exitoso! :)', 'success');
            redirect();
          } else {
            throw PasswordError;
          }
        }
      });
      if (!valid_form) {
        throw NotRegisteredError;
      }
    } catch (error) {
      alert(error.message, 'danger');
    }
  } catch (error) {
    alert(error);
  }
}

user_form.addEventListener('submit', add_form);
