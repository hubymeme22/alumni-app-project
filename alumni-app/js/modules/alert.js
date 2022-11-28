//
const notFoundImg = '../../assets/illustrations/not-found.png';
const constructionImg = '../../assets/illustrations/under-construction.png';

function underConstruction(container) {
  const img = document.createElement('img');
  img.src = constructionImg;
  img.classList.add('alert');
  container.innerHTML = '';
  container.classList.add('center-all');
  container.appendChild(img);
}

function noAlumniFound(container) {
  const img = document.createElement('img');
  const h1 = document.createElement('h1');

  img.src = notFoundImg;
  // img.classList.add('alert');
  h1.textContent = 'No Alumni Found';

  container.innerHTML = '';
  container.classList.add('alert');
  container.appendChild(img);
  container.appendChild(h1);
}

export { underConstruction, noAlumniFound };
