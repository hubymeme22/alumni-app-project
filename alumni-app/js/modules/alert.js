//
const notFoundImg = '../../assets/illustrations/not-found.png';
const constructionImg = '../../assets/illustrations/under-construction.png';

function underConstruction(container) {
  const img = document.createElement('img');
  const h1 = document.createElement('h1');

  img.src = constructionImg;
  img.classList.add('alert');

  h1.textContent = 'Under Construction';

  container.innerHTML = '';
  container.classList.add('center-all-col');
  container.appendChild(img);
  container.appendChild(h1);
}

function noAlumniFound(container) {
  const img = document.createElement('img');
  const h1 = document.createElement('h1');

  img.src = notFoundImg;
  h1.textContent = 'No Alumni Found';

  container.innerHTML = '';
  container.classList.add('alert');
  container.appendChild(img);
  container.appendChild(h1);
}

export { underConstruction, noAlumniFound };
