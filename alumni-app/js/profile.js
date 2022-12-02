import { token_check } from './modules/constant-token-checker.js';

token_check('#', '/index.html');

const editBtn = document.querySelector('.edit-btn');
const textBoxes = document.querySelectorAll('textarea');

editBtn.addEventListener('click', () => {
  if (!editBtn.classList.contains('save')) {
    editBtn.classList.add('save');
    editBtn.textContent = 'Save';
  } else {
    editBtn.classList.remove('save');
    editBtn.textContent = 'Edit Profile';
  }

  textBoxes.forEach((box) => {
    box.classList.toggle('editable');
  });
});
