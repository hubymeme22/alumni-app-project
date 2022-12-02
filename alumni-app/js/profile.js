import { token_check } from './modules/constant-token-checker.js';
import { checkGender } from './modules/check-gender.js';

token_check('#', '/index.html');

const btnContainer = document.querySelector('.btns');

const editBtn = document.getElementById('edit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const saveBtn = document.getElementById('save-btn');
const textBoxes = document.querySelectorAll('textarea');

// DOM Elements
const profileImg = document.getElementById('profile-img');

const username = document.getElementById('username');

const facebook = document.getElementById('facebook');
const twitter = document.getElementById('twitter');
const linkedIn = document.getElementById('linkedin');
const github = document.getElementById('github');

// links
const facebookLink = document.getElementById('facebook-link');
const twitterLink = document.getElementById('twitter-link');
const linkedInLink = document.getElementById('linkedin-link');
const githubLink = document.getElementById('github-link');

const allLinks = [facebookLink, twitterLink, linkedInLink, githubLink];
const allTextBoxes = [facebook, twitter, linkedIn, github];

// Event Listeners
editBtn.addEventListener('click', () => {
  btnContainer.classList.remove('hide');
  editBtn.classList.add('hide');

  textBoxes.forEach((box) => {
    box.classList.add('editable');
  });

  editData();
});

saveBtn.addEventListener('click', () => {
  btnContainer.classList.add('hide');
  editBtn.classList.remove('hide');

  textBoxes.forEach((box) => {
    box.classList.remove('editable');
  });

  saveData();
});

cancelBtn.addEventListener('click', () => {
  btnContainer.classList.add('hide');
  editBtn.classList.remove('hide');

  textBoxes.forEach((box) => {
    box.classList.remove('editable');
  });
});

function generateInfo(user) {
  // Get data from database and adjust DOM elements contents
  profileImg.src = checkGender(user.sex);
  username.textContent = `${user.username}`;
}

const sampleData = {
  username: 'genderbender',
  sex: 'Male',
  links: {
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    github: '#',
  },
};

generateInfo(sampleData);

function collectData() {
  return {
    username: username.value,
    sex: 'Male',
    links: [facebook.value, twitter.value, linkedIn.value, github.value],
  };
}

function saveData() {
  const data = collectData();

  console.log(allTextBoxes[1]);
  for (let i = 0; i < 4; i++) {
    if (data.links[i] != '' || data.links[i] != '#') {
      allTextBoxes[i].classList.add('hide');
      allLinks[i].classList.remove('hide');
      allLinks[i].href = `https://${data.links[i]}`;
      allLinks[i].textContent = data.links[i];
    }

    if (data.links[i] == '') {
      allTextBoxes[i].classList.remove('hide');
    }
  }
}

function editData() {
  showTextBoxes();
}

function showTextBoxes() {
  allLinks.forEach((link) => {
    link.classList.add('hide');
  });

  allTextBoxes.forEach((box) => {
    box.classList.remove('hide');
  });
}
