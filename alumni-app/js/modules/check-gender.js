// Illustrations and Icons URL
const path = '../assets/illustrations/';

const maleIcon = `${path}male-avatar.png`;
const femaleIcon = `${path}female-avatar.png`;

function checkGender(sex) {
  if (sex.toUpperCase() == 'MALE') {
    return maleIcon;
  } else if (sex == 'Female') {
    return femaleIcon;
  }
}

export { checkGender };
