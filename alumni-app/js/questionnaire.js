import { signUp } from "./modules/data-retriever.js";

const form = document.getElementById('questionnaire');

// buttons
const clearBtn = document.getElementById('clearBtn');
const submitBtn = document.getElementById('submitBtn');

// All input fields
const ageInput = document.querySelector('input[type="number"]')

const inputs = document.querySelectorAll('input');
const radioBtns = document.querySelectorAll('input[type="radio"]');


// Event Listeners
const MINIMUM_AGE = 18;

ageInput.addEventListener('input', (e) => {
  if (ageInput.value < 18) {
    ageInput.value = MINIMUM_AGE;
  }
})

clearBtn.addEventListener('click', () => {
  clearAll();
});

questionnaire.addEventListener('submit', (e) => {
  e.preventDefault();

  const toBeVerified = getAllAnswers()
  
  /*
  TODO: throw data to database :>
  */

  const accepted = (data) => {
    if (data['existing']) {
      alert('Account Already Exists!')
      return;
    }

    if (data['status'] == 'created') {
      alert('Account Created!');
      window.location.replace('/index.html');
    }
  };

  const rejected = (error) => {
    alert('Error occured in server side');
    return;
  };

  console.log(toBeVerified)
  signUp(toBeVerified, accepted, rejected);
  clearAll()
});

// checks and loads all the data
// on the local storage
const email = window.localStorage.getItem('email');
const username = window.localStorage.getItem('username');
const password = window.localStorage.getItem('password');

if (email == null || username == null || password == null)
  window.location.replace('/index.html');

document.getElementById('email').value = email;

function clearAll() {
  inputs.forEach((input) => {
    input.value = '';
  });

  radioBtns.forEach((radio) => {
    radio.checked = false;
  });
}

function getAllAnswers() {
  return {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    age: document.getElementById('age').value,
    sex: document.getElementById('sex').value,
    course: document.getElementById('course').value,
    education: document.querySelector('input[name="education"]:checked').value,
    employment: document.querySelector('input[name="employment"]:checked').value,
    username: window.localStorage.getItem('username'),
    password: window.localStorage.getItem('password')
  };
}

// Retrieve courses to be displayed at questionnaire page

// Sample data
function getCourses() {
  return [
        {
        id: 1,
        course: 'Computer Science'
        },
        {
          id: 2,
          course: 'Information Technology'
        },
        {
          id: 3,
          course: 'Computer Engineer'
        }
  ]
}

const courseSelection = document.getElementById('course');
const courses = getCourses();

function addCourse(courseInfo) {
  const opt = document.createElement('option');
  opt.value = courseInfo.id;
  opt.textContent = courseInfo.course;
  courseSelection.appendChild(opt);
}

courses.forEach(course => {
  addCourse(course);
})