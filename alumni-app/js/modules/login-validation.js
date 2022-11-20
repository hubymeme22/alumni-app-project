import { request_POST } from "./modified.js";
import { md5 } from "./md5.js";

// Login validation module
const username = document.getElementById('login-username');
const password = document.getElementById('login-password');

const loginError = document.getElementById('login-error');

document.addEventListener('input', () => {
  if (username.value.trim() != '' && password.value.trim() != '') {
    loginError.classList.add('hide');
    loginError.textContent = '';
  }
});

// function if the account is validated
function validatedResponse(response) {
  if (!response['verified']) {
    invalidUsername('Account not verified');
    return;
  }

  if (response['token'] == 'null') {
    invalidUsername('Invalid Account');
    console.log('invalid username');
    return;
  }

  if (response['token'] == 'session_error') {
    alert('error in session');
    return;
  }

  // save the token and id on cookie
  document.cookie = `token=${response['token']}; path=/`;
  window.localStorage.setItem('id', response['id']);
  window.localStorage.setItem('new_id', response['id']);

  // redirect to landing page
  window.location.href = '/pages/home.html';

}

// function if the account is no
function invalidResponse(error) {
  console.log(error);
}

function validateAccount() {
  // Prevent if empty
  if (username.value.trim() == '' || password.value.trim() == '') {
    loginError.textContent = '* Must fill all inputs *';
    loginError.classList.remove('hide');
    return;
  }

  // Enter to landing page if credential matched the database
  request_POST('/api/login.php', {'username': username.value, 'password': md5(password.value)}, validatedResponse, invalidResponse);
}

// Error function
function invalidUsername(message) {
  // if (username not in database or somethin) {}
  loginError.classList.remove('hide');
  loginError.textContent = message;
}

function invalidPassword() {
  // if (password does not match password in database) {}
  loginError.textContent = '';
}

export { validateAccount };
