import api from './api-service';
import makeMoviesMarkup from './make-markup';

const gall = document.querySelector('.movies-gallery');
const searchInput = document.querySelector('#header-contain-input');
const pagList = document.querySelector('.pagination-list');

pagList.addEventListener('click', paginFunc);
function paginFunc(ev) {
  const pagValue = ev.target.dataset.pagnumber;
  if (!pagValue) return;
  api.page = pagValue;
  api.fetchMovies().then(results => {
    makeMoviesMarkup(results);
  });
}

window.addEventListener('resize', ev => {
  renderNumberPag(api.page, api.totalPages);
});

function renderNumberPag(currentPage, maxPage) {
  const isMobile = window.innerWidth < 768;
  const leftItemsLength = currentPage - 1;
  const rightItemsLength = maxPage - currentPage;

  let leftItems = 2;
  let rightItems = 2;

  if (leftItemsLength < 2) {
    leftItems = leftItemsLength;
    rightItems += 2 - leftItemsLength;
  } else if (leftItemsLength < 5 && !isMobile) {
    leftItems = leftItemsLength;
    rightItems += 5 - leftItemsLength - 1;
  }
  if (rightItemsLength < 2) {
    rightItems = rightItemsLength;
    leftItems += 2 - rightItemsLength;
  } else if (rightItemsLength < 5 && !isMobile) {
    rightItems = rightItemsLength;
    leftItems += 5 - rightItemsLength - 1;
  }

  const arr = [];
  if (leftItemsLength > 4 && !isMobile) {
    arr.push(getItemHtml(1));
    arr.push(getItemHtml('...', false, 'prev'));
  }
  for (let i = leftItems; i >= 0; i--) {
    arr.push(getItemHtml(currentPage - i, !i));
  }

  for (let i = 1; i <= rightItems; i++) {
    arr.push(getItemHtml(+currentPage + i));
  }

  if (rightItemsLength > 4 && !isMobile) {
    arr.push(getItemHtml('...', false, 'next'));
    arr.push(getItemHtml(maxPage));
  }

  pagList.innerHTML = arr.join('');
}

function getItemHtml(value, isActive = false, dataValue) {
  return `<li class="pagination-item">
<button class="pagination-btn ${isActive ? 'pagination-btn__active' : ''}" data-pagnumber="${
    dataValue || value
  }" type="button">${value}</button>
</li>`;
}

export { renderNumberPag };
