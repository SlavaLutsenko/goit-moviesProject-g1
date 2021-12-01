import renderLibraryMarkup from './render-library-markup';
import createMarkupSingleMovie from './markupSingleMovie';
import Notiflix from 'notiflix';

const btnLibraryWatched = document.querySelector('.btn-library-watched');
const btnLibraryQueue = document.querySelector('.btn-library-queue');
const libraryGall = document.querySelector('.library-gallery');

const refs = {
  gallery: document.querySelector('.library-gallery'),
  modalwrap: document.querySelector('.output-js'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
  backdrop: document.querySelector('.backdrop'),
};

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
}

// Закрытие модалки по кнопке ESC
const handleEscPress = function (e) {
  console.log(e.code);
  if (e.code === 'Escape') {
    refs.modal.classList.add('is-hidden');
    // window.removeEventListener('keydown', handleEscPress); //!удаление слушателя
    refs.body.classList.toggle('no-scroll');
  }
};
refs.closeModalBtn.addEventListener('click', toggleModal);
window.addEventListener('keydown', handleEscPress);

renderWatchedMovies();

btnLibraryWatched.addEventListener('click', ev => {
  btnLibraryQueue.dataset.check = 'notok';
  toogleBtnsLibrary(btnLibraryWatched, btnLibraryQueue);
  libraryGall.innerHTML = '';
  renderWatchedMovies();
  // Notiflix.Notify.info('Hooray! You have some movies in collection.');
});

btnLibraryQueue.addEventListener('click', ev => {
  btnLibraryQueue.dataset.check = 'ok';
  toogleBtnsLibrary(btnLibraryQueue, btnLibraryWatched);
  btnLibraryWatched.classList.add('header-library-contain__link--inactive');
  libraryGall.innerHTML = '';
  renderQueueMovies();
});

// Достаем инфу из LocalStorage по фильмам "WATCHED"
function renderWatchedMovies() {
  const getMoviesFromWatched = () => JSON.parse(localStorage.getItem('WATCHED')) || [];
  const watchedArr = getMoviesFromWatched();
  if (watchedArr.length === 0) {
    return Notiflix.Notify.failure('No watched movies in your library.');
  } else {
    Notiflix.Notify.info(`Hooray! You have ${watchedArr.length} movies in collection.`);
    renderLibraryMarkup(watchedArr);
  }
  // console.log(watchedArr);
}

// Достаем инфу из LocalStorage по фильмам "QUEUE"
function renderQueueMovies() {
  const getMoviesFromQueue = () => JSON.parse(localStorage.getItem('QUEUE')) || [];
  const queuedArr = getMoviesFromQueue();
  if (queuedArr.length === 0) {
    return Notiflix.Notify.failure('Please select movies in order to add to your queue');
  } else {
    Notiflix.Notify.info(`Hooray! You have ${queuedArr.length} movies in collection.`);
    renderLibraryMarkup(queuedArr);
  }
}
function toogleBtnsLibrary(a, b) {
  a.classList.add('header-library-contain__link--active');
  b.classList.remove('header-library-contain__link--active');
}

// Логика модального окна Library
libraryGall.addEventListener('click', onCardClick);
function onCardClick(e) {
  if (e.target.tagName !== 'IMG') {
    return;
  }
  toggleModal();
  const movie = e.target;
  const CARD_ID = Number(movie.dataset.id);

  if (btnLibraryQueue.dataset.check !== 'ok') {
    const getMoviesFromWatched = () => JSON.parse(localStorage.getItem('WATCHED')) || [];
    const watchedArr = getMoviesFromWatched();
    const singleMov = watchedArr.filter(el => {
      return el.id === CARD_ID;
    });
    const res = createMarkupSingleMovie(...singleMov);
    refs.modalwrap.innerHTML = res;
  } else {
    const getMoviesFromQueue = () => JSON.parse(localStorage.getItem('QUEUE')) || [];
    const watchedArr = getMoviesFromQueue();
    const singleMov = watchedArr.filter(el => {
      return el.id === CARD_ID;
    });
    const res = createMarkupSingleMovie(...singleMov);
    refs.modalwrap.innerHTML = res;
  }
}

//     // Слушатели событий для кнопок в модалке
//     const btnQueue = document.querySelector('[data-action="queue"]');
//     const btnWatched = document.querySelector('[data-action="watched"]');
//     btnWatched.addEventListener('click', handleWatchLibrary);
//     btnQueue.addEventListener('click', handleQueueLibrary);
