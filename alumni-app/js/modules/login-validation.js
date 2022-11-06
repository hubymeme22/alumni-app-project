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

function validateAccount() {
  // Prevent if empty
  if (username.value.trim() == '' || password.value.trim() == '') {
    loginError.textContent = '* Must fill all inputs *';
    loginError.classList.remove('hide');
    return;
  }

  // Enter to landing page if credential matched the database
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
