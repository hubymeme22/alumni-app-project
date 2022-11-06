// Signup validation module

// Input Fields
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('pass');
const confirmPassword = document.getElementById('cpass');

// Error messages tags
const userError = document.querySelector('.user-msg');
const emailError = document.querySelector('.email-msg');
const passError = document.querySelector('.pass-msg');
const cpassError = document.querySelector('.cpass-msg');

// All fields
const formInputs = document.querySelectorAll('#signup-form input');
const formErrors = document.querySelectorAll('#signup-form .error');

// Event Listener
// Remove error if emptyy and not on focus
formInputs.forEach((input, index) => {
  input.addEventListener('focusout', e => {
    if (input.value.trim() == '') {
      formErrors[index].textContent = '';
    }
  });
});

function ifEmpty(inputField, errorField) {
  if (inputField.value.trim() == '') {
    errorField.textContent = '* Must not be empty';
  } else {
    errorField.textContent = '';
  }
}

// Validation function
function checkPattern(value, pattern) {
  pattern = new RegExp(pattern);
  return pattern.test(value);
}

function validateUsername() {
  ifEmpty(username, userError);
}

function validateEmail() {
  if (email.value.trim() == '') {
    emailError.textContent = '* Must not be empty';
  } else if (email.validity.typeMismatch) {
    emailError.textContent = '* Must be a valid email address';
  } else {
    emailError.textContent = '';
  }
}

function validatePassword() {
  let passwordValue = password.value;
  let errorMsg = '';

  if (passwordValue) {
    // Check length
    if (passwordValue.length < 8) {
      errorMsg += '* Must contain atleast 8 characters\r\n';
    } else {
      errorMsg += '';
    }

    // Uppercase Validation
    let uppercase = '(?=.*[A-Z])';
    if (!checkPattern(passwordValue, uppercase)) {
      errorMsg += '* Must contain atleast 1 uppercase letter\r\n';
    } else {
      errorMsg += '';
    }

    // Lowercase Validation
    let lowercase = '(?=.*[a-z])';
    if (!checkPattern(passwordValue, lowercase)) {
      errorMsg += '* Must contain atleast 1 lowercase letter\r\n';
    } else {
      errorMsg += '';
    }

    // Number Validation
    let numberRegex = '(?=.*[0-9])';
    if (!checkPattern(passwordValue, numberRegex)) {
      errorMsg += '* Must contain atleast one number';
    } else {
      errorMsg += '';
    }

    passError.setAttribute('style', 'white-space: pre');
    passError.innerHTML = errorMsg;
  } else if (passwordValue.trim() == '') {
    passError.textContent = '* Must not be empty';
  } else {
    passError.textContent = '';
  }
}

function checkPassword() {
  if (confirmPassword.value != password.value) {
    cpassError.textContent = '* Password does not match';
  } else if (confirmPassword.value == '') {
    cpassError.textContent = '* Must not be empty';
  } else {
    cpassError.textContent = '';
  }
}

// Submit functions
function registerAccount() {
  validateUsername();
  validateEmail();
  validatePassword();
  checkPassword();

  // Check if every input field is valid
  let isValid = false;
  formErrors.forEach(error => {
    if (error.textContent == '') {
      isValid = true;
    } else {
      isValid = false;
    }
  });

  if (isValid === false) return;

  const account = getAllInputValues();
  resetForm();

  /* 
    TODO: Send to Database for checking
    ? If approved, continue to questionnaire page
  */
}

function getAllInputValues() {
  const account = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  return account;
}

function resetForm() {
  formInputs.forEach(input => {
    input.value = '';
  });
}

export {
  validateUsername,
  validateEmail,
  validatePassword,
  checkPassword,
  registerAccount,
};
