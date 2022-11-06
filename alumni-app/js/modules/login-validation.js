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
  if (response['token'] == 'null') {
    alert('nonexistent account');
    return;
  }

  if (response['token'] == 'session_error') {
    alert('error in session');
    return;
  }

  // save the token and id on cookie
  document.cookie = `token=${response['token']};`;
  window.localStorage.setItem('id', response['id']);
  window.localStorage.setItem('new_id', response['id']);

  // redirect to landing page
  window.location.href = '/landing.html';

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
function invalidUsername() {
  // if (username not in database or somethin) {}
  loginError.textContent = '';
}

function invalidPassword() {
  // if (password does not match password in database) {}
  loginError.textContent = '';
}

export { validateAccount };
