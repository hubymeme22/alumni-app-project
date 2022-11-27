import { token_check } from './modules/constant-token-checker.js';
import { getAlumni, searchAlumni } from './modules/data-retriever.js';

token_check('#', '/index.html');

const CONTENT_CONTAINER = document.querySelector('.content-container');

let temp = document.getElementById('alumni-template');

function createClone(data) {
  const clone = document.importNode(temp.content, true);

  // Alumni Info
  const name = clone.querySelector('.name');
  const email = clone.querySelector('.email');
  const dept = clone.querySelector('.dept');
  const course = clone.querySelector('.course');
  const stats = clone.querySelector('.stats');

  // Social Links
  const facebook = clone.querySelector('a.facebook');
  const twitter = clone.querySelector('a.twitter');
  const linkedIn = clone.querySelector('a.linkedin');
  const github = clone.querySelector('a.github');

  name.textContent += data.name;
  email.textContent += data.email;
  dept.textContent += 'CICS'; // Hardcoded :)
  course.textContent += data.course_id;
  stats.textContent += data.employmentStatus;

  facebook.href = data.links.facebook;
  twitter.href = data.links.twitter;
  linkedIn.href = data.links.linkedin;
  github.href = data.links.github;

  CONTENT_CONTAINER.appendChild(clone);
}

const searchBar = document.getElementById('searchBar');
const searchBarForm = document.querySelector('.search-bar');

searchBarForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

searchBar.addEventListener('input', () => {
  let name = searchBar.value;
  if (name.trim() == '') {
    renderAllAlumni();
    return;
  }

  searchAlumni(name, (response) => {
    const info = response.data;
    CONTENT_CONTAINER.innerHTML = '';
    info.forEach((alumni) => {
      createClone(alumni);
    });
  });
});

function renderAllAlumni() {
  CONTENT_CONTAINER.innerHTML = '';
  getAlumni((response) => {
    console.log(response);
    const info = response.data;
    info.forEach((alumni) => {
      createClone(alumni);
    });
  });
}

// Driver Code
renderAllAlumni();
