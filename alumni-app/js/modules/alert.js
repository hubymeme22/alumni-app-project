//
const searchingImg = '../../assets/illustrations/search.png';
const constructionImg = '../../assets/illustrations/under-construction.png';

function underConstruction(container) {
  const img = document.createElement('img');
  img.src = constructionImg;
  img.classList.add('alert');
  container.innerHTML = '';
  container.classList.add('center-all');
  container.appendChild(img);
}

export { underConstruction };
