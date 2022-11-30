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
  
  // throw data to database :>
  console.log(toBeVerified)

  clearAll()
});

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
    education: document.querySelector('input[name="education"]:checked').value,
    employment: document.querySelector('input[name="employment"]:checked').value,
  };
}
