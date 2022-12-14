import { token_check } from './modules/constant-token-checker.js';
import { checkGender } from './modules/check-gender.js';
import { getProfileData } from './modules/data-retriever.js';
import { updateProfileData } from './modules/data-updater.js';

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
const allTextBoxes = [facebook, twitter, linkedIn, github];

// Event Listeners
username.addEventListener('input', (e) => {
  if (username.value.length < 1) {
    username.value = '@';
  }
});

editBtn.addEventListener('click', () => {
  btnContainer.classList.remove('hide');
  editBtn.classList.add('hide');

  textBoxes.forEach((box) => {
    box.classList.add('editable');
    box.readOnly = false;
  });
});

saveBtn.addEventListener('click', () => {
  btnContainer.classList.add('hide');
  editBtn.classList.remove('hide');

  textBoxes.forEach((box) => {
    box.classList.remove('editable');
    box.readOnly = true;
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

let sampleData = {
  username: 'genderbender',
  name: 'Erwin De Chavez',
  sex: 'Male',
  links: {
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    github: '#',
  },
};

function generateInfo(user) {
  // Get data from database and adjust DOM elements contents
  const accepted = (response) => {
    // modify data, otherwise, use pseudo userdata
    if (response['status'] == 'ok') user = response['data'];

    profileImg.src = checkGender(user.sex);
    username.textContent = `@${user.username}`;

    // Adjust links
    facebook.value = checkLink(user.links.facebook);
    twitter.value = checkLink(user.links.twitter);
    linkedIn.value = checkLink(user.links.linkedin);
    github.value = checkLink(user.links.github);

    // adjust userdata
    document.getElementById('fullname').innerText = user.name;

    // update local user data
    sampleData = response['data'];
  };

  getProfileData(accepted);
}

function collectData() {
  const user = username.value.split('@');
  const links = [];
  // filter
  allTextBoxes.forEach((box) => {
    if (box.value.trim() == '') {
      links.push('');
    } else {
      links.push(box.value);
    }
  });

  return {
    username: user[1],
    sex: 'Male',
    links: links,
  };
}

function checkLink(link) {
  return link == '#' ? '' : link;
}

function saveData() {
  const data = collectData();

  const params = {
    id: sampleData['id'],
    username: data.username,
    facebook: data.links[0],
    twitter: data.links[1],
    linkedin: data.links[2],
    github: data.links[3],
  };
  updateProfileData(params);
}

// Driver Code
generateInfo(sampleData);

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('editable')) return;

  if (e.target.classList.contains('user-links')) {
    const link = e.target;

    if (link.value.length <= 0) return;

    const url = `https://${link.id}.com/${link.value}`;
    window.open(url);
  }
});
