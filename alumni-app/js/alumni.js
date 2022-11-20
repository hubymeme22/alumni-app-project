import { token_check } from './modules/constant-token-checker.js';
import { getAlumni } from './modules/data-retriever.js';

token_check('#', '/index.html');

const CONTENT_CONTAINER = document.querySelector('.content-container');

let temp = document.getElementById('alumni-template');

function createClone(data) {
  const clone = document.importNode(temp.content, true);

  const name = clone.querySelector('.name');
  const email = clone.querySelector('.email');
  const dept = clone.querySelector('.dept');
  const course = clone.querySelector('.course');
  const stats = clone.querySelector('.stats');

  name.textContent += data.name;
  email.textContent += data.email;
  dept.textContent += 'CICS';
  course.textContent += data.course_id;
  stats.textContent += data.employmentStatus;

  // TODO: Connect social accounts
  CONTENT_CONTAINER.appendChild(clone);
}

getAlumni(response => {
  const info = response.data;
  info.forEach(alumni => {
    createClone(alumni);
  });
});
