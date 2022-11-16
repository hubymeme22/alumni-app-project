const menuBar = document.querySelector('.hamburger');
const navBar = document.querySelector('.nav-bar');
const closeBtn = document.querySelector('.close');

menuBar.addEventListener('click', () => {
  navBar.classList.add('show');
  menuBar.classList.add('hide');
  closeBtn.classList.remove('hide');
});

closeBtn.addEventListener('click', () => {
  navBar.classList.remove('show');
  menuBar.classList.remove('hide');
  closeBtn.classList.add('hide');
});

closeBtn.classList.add('hide');
