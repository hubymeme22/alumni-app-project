import * as signup from './modules/signup-validation.js';
import * as login from './modules/login-validation.js';

const background = document.querySelector('.background');

// Containers
const leftPart = document.querySelector('.left');
const rightPart = document.querySelector('.right');

// Forms
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Switch buttons
const newAccount = document.getElementById('create-acc');
const alreadyAcc = document.getElementById('login-acc');

// Input Fields
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('pass');
const confirmPassword = document.getElementById('cpass');

// Buttons
const loginBtn = document.querySelector('.login-btn');
const signUpBtn = document.querySelector('.signup-btn');

// All fields
const allInputs = document.querySelectorAll('input');
const formErrors = document.querySelectorAll('.error');

// Event listeners
newAccount.addEventListener('click', switchToSignUp);
alreadyAcc.addEventListener('click', switchToLogin);

// Prevent foms from using form actions
loginForm.addEventListener('click', e => {
  e.preventDefault();
});

signupForm.addEventListener('click', e => {
  e.preventDefault();
});

// Signup form Validation
username.addEventListener('input', signup.validateUsername);
email.addEventListener('input', signup.validateEmail);
password.addEventListener('input', signup.validatePassword);
confirmPassword.addEventListener('input', signup.checkPassword);

// Buttons event listeners
loginBtn.addEventListener('click', login.validateAccount);
signUpBtn.addEventListener('click', signup.registerAccount);

// Functions
function switchToSignUp() {
  leftPart.classList.add('switch');
  rightPart.classList.add('switch');

  // change content
  setTimeout(() => {
    loginForm.classList.add('hide');
    signupForm.classList.remove('hide');
    resetAllForms();
  }, 150);
}

function switchToLogin() {
  leftPart.classList.remove('switch');
  rightPart.classList.remove('switch');

  setTimeout(() => {
    loginForm.classList.remove('hide');
    signupForm.classList.add('hide');
    resetAllForms();
  }, 150);
}

function resetAllForms() {
  allInputs.forEach(input => {
    input.value = '';
  });

  formErrors.forEach(error => {
    error.textContent = '';
  });
}

//* Driver code
// animate splash screen (desktop)
// Execute if in mobile device
if (window.matchMedia('(max-width: 600px)').matches) {
  setTimeout(() => {
    background.classList.add('show');
    rightPart.classList.add('decay');
  }, 750);
}
// Execute if in desktop
setTimeout(() => {
  background.classList.add('show');
  setTimeout(() => {
    leftPart.classList.add('adjust');
    rightPart.classList.add('adjust');
  }, 300);
}, 750);

// checks if the current token is vald then redirect
// to landing page if valid
token_check('/landing.html');
