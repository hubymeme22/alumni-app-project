const background = document.querySelector('.background');
const leftPart = document.querySelector('.left');
const rightPart = document.querySelector('.right');

background.classList.add('show');
leftPart.classList.add('adjust');
rightPart.classList.add('adjust');

// animate splash screen
setTimeout(() => {
  background.classList.add('show');
  setTimeout(() => {
    leftPart.classList.add('adjust');
    rightPart.classList.add('adjust');
  }, 300);
}, 750);

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

const newAccount = document.getElementById('create-acc');
const alreadyAcc = document.getElementById('login-acc');

newAccount.onclick = () => {
  leftPart.classList.add('switch');
  rightPart.classList.add('switch');

  // change content
  setTimeout(() => {
    loginForm.classList.add('hide');
    signupForm.classList.remove('hide');
  }, 150);
};

alreadyAcc.onclick = () => {
  leftPart.classList.remove('switch');
  rightPart.classList.remove('switch');

  setTimeout(() => {
    loginForm.classList.remove('hide');
    signupForm.classList.add('hide');
  }, 150);
};
