import { token_check } from './modules/constant-token-checker.js';
import { checkGender } from './modules/check-gender.js';

token_check('#', '/index.html');
const btnContainer = document.querySelector('.btns');

const editBtn = document.getElementById('edit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const saveBtn = document.getElementById('save-btn');
const textBoxes = document.querySelectorAll('textarea');

editBtn.addEventListener('click', () => {
  btnContainer.classList.remove('hide');
  editBtn.classList.add('hide');

  textBoxes.forEach((box) => {
    box.classList.add('editable');
  });
});

saveBtn.addEventListener('click', () => {
  btnContainer.classList.add('hide');
  editBtn.classList.remove('hide');

  textBoxes.forEach((box) => {
    box.classList.remove('editable');
  });
});

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

function generateInfo(user) {
  // Get data from database and adjust DOM elements contents
  profileImg.src = checkGender(user.sex);

  username.textContent = `@${user.firstName} ${user.lastName}`;
  // facebook.textContent =
}

const sampleData = {
  username: 'genderbender',
  email: 'sample@gmail.com',
  firstName: 'Paul',
  lastName: 'Enriquez',
  sex: 'male',
};

// facebook.addEventListener('click', () => {
//   if (facebook.value.trim() != '') {
//     facebookLink.href = facebook.value;
//     facebookLink.textContent = facebook.value;
//     facebook.classList.add('hide');
//   } else {
//     facebook.classList.remove('hide');
//   }
// });
