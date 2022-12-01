import { token_check } from './modules/constant-token-checker.js';

token_check('#', '/index.html');

const editBtn = document.querySelector('.edit-btn');
const textBoxes = document.querySelectorAll('textarea');

editBtn.addEventListener('click', () => {
  textBoxes.forEach((box) => {
    box.classList.toggle('editable');
  });
});
