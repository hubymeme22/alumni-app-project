import { token_check } from './modules/constant-token-checker.js';

// token_check('#', '/index.html');

// dummy data

const CONTENT_CONTAINER = document.querySelector('.content-container');

let temp = document.getElementById('alumni-template');

function createClone() {
  const clone = document.importNode(temp.content, true);
  CONTENT_CONTAINER.appendChild(clone);

  const infos = clone.querySelectorAll('.infos > li');
  infos.forEach(info => console.log(info.textContent));
}

createClone();
createClone();
createClone();
createClone();
createClone();
createClone();
createClone();
createClone();
