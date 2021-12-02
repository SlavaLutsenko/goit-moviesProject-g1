import api from './api-service';
import getMovie from './getMovie';
const pagList = document.querySelector('.pagination-list');
const pagLeft = document.querySelector('.pagination-row-left');
const pagRight = document.querySelector('.pagination-row-right');

pagList.addEventListener('click', paginFunc);
function paginFunc(ev) {
  const pagValue = +ev.target.dataset.pagnumber;
  if (!pagValue) return;
  api.changePage(pagValue);
  getMovie();
}
pagLeft.addEventListener('click', onLeftClick);
pagRight.addEventListener('click', onRightClick);

function onLeftClick(ev) {
  api.changePage(api.page - 1);
  getMovie();
}
function onRightClick(ev) {
  api.changePage(api.page + 1);
  getMovie();
}
window.addEventListener('resize', ev => {
  renderNumberPag(api.page, api.totalPages);
});

function renderNumberPag(currentPage, maxPage) {
  const isMobile = window.innerWidth < 768;
  let arr = [];
  if (maxPage <= 5 || (maxPage <= 9 && !isMobile)) {
    for (let i = 1; i <= maxPage; i++) {
      arr.push(getItemHtml(i, i === api.page));
    }
    pagList.innerHTML = arr.join('');
    return;
  }

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

  if (leftItemsLength > 4 && !isMobile) {
    arr.push(getItemHtml(1));
    arr.push(getItemHtml('...', false, 'prev'));
  }
  for (let i = leftItems; i >= 0; i--) {
    arr.push(getItemHtml(currentPage - i, currentPage - i === api.page));
  }

  for (let i = 1; i <= rightItems; i++) {
    arr.push(getItemHtml(+currentPage + i));
  }

  if (rightItemsLength > 4 && !isMobile) {
    arr.push(getItemHtml('...', false, 'next'));
    arr.push(getItemHtml(maxPage));
  }

  pagList.innerHTML = arr.join('');
  const dotsLeft = document.querySelector('[data-pagnumber="prev"]');
  const dotsRight = document.querySelector('[data-pagnumber="next"]');
  if (dotsLeft) {
    dotsLeft.addEventListener('click', ev => {
      renderNumberPag(+currentPage - 5, maxPage);
    });
  }
  if (dotsRight) {
    dotsRight.addEventListener('click', ev => {
      renderNumberPag(+currentPage + 5, maxPage);
    });
  }
}

function getItemHtml(value, isActive = false, dataValue) {
  return `<li class="pagination-item">
<button class="pagination-btn ${isActive ? 'pagination-btn__active' : ''}" data-pagnumber="${
    dataValue || value
  }" type="button">${value}</button>
</li>`;
}

export { renderNumberPag };
