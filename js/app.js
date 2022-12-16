import { insert, read } from './firestore.js';

const user_form = document.getElementById('register-form');

const firstname_input = document.getElementById('first_name');
const lastname_input = document.getElementById('last_name');
const phone_input = document.getElementById('phone');
const email_input = document.getElementById('email');
const password_input = document.getElementById('password');

const db_btn = document.getElementById('db-button');

const AlreadyRegisteredError = new Error(
  'Este correo ya está registrado en FisiHacks!!!'
);

const alertPlaceholder = document.getElementById('alertPlaceholder');

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

  const firstname = firstname_input.value;
  const lastname = lastname_input.value;
  const phone = phone_input.value;
  const email = email_input.value;
  const password = password_input.value;

  const m_form = {
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    email: email,
    password: password,
  };

  let valid_form = true;
  try {
    const response = await read('users');
    try {
      response.forEach((doc) => {
        if (email === doc.data().email) {
          valid_form = false;
          throw AlreadyRegisteredError;
        }
      });
    } catch (error) {
      alert(error.message, 'danger');
    }
  } catch (error) {
    alert(error);
  }
  try {
    if (valid_form) {
      await insert('users', m_form);
      alert('Registro exitoso! :)', 'success');
    }
  } catch (error) {
    alert(error);
  }
}

async function print_db() {
  const response = await read('users');
  try {
    response.forEach((doc) => {
      console.log(doc.data());
    });
  } catch (error) {
    console.log(error.message);
  }
}

user_form.addEventListener('submit', add_form);
db_btn.addEventListener('click', print_db);
