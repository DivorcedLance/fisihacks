import { insert, read } from './firestore.js';

const course_form = document.getElementById('course-form');

const email_input = document.getElementById('email');
const course_input = document.getElementById('course');
const drive_input = document.getElementById('drive');
const description_input = document.getElementById('description');

const alertPlaceholder = document.getElementById('alertPlaceholder');

const NotRegisteredError = new Error(
  'Este correo no está registrado en FisiHacks. Registrate!!!'
);

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

  const email = email_input.value;
  const course = course_input.value;
  const drive = drive_input.value;
  const description = description_input.value;

  const m_form = {
    email: email,
    course: course,
    drive: drive,
    description: description,
    phone: '',
    firstname: '',
    lastname: '',
  };

  let valid_form = false;
  try {
    const response = await read('users');
    try {
      response.forEach((doc) => {
        if (email === doc.data().email) {
          m_form.phone = doc.data().phone;
          m_form.firstname = doc.data().firstname;
          m_form.lastname = doc.data().lastname;
          valid_form = true;
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
  try {
    if (valid_form) {
      await insert('class-orders', m_form);
      alert('Te contactaremos pronto!!!', 'success');
      const course_form = document.getElementById('course-form');
      course_form.reset();
    }
  } catch (error) {
    alert(error);
  }
}

course_form.addEventListener('submit', add_form);
