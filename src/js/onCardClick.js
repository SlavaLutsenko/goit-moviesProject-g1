import createMarkupSingleMovie from './markupSingleMovie';
import api from './api-service';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
// Клик по карточке фильма

// достать фильмы "В очереди" из LocalStorage
const getMoviesFromQueue = () => JSON.parse(localStorage.getItem('QUEUE')) || [];
// достать фильмы "Просмотренные" из LocalStorage
const getMoviesFromWatched = () => JSON.parse(localStorage.getItem('WATCHED')) || [];

const refs = {
  gallery: document.querySelector('.movies-gallery'),
  modalwrap: document.querySelector('.output-js'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
  backdrop: document.querySelector('.backdrop-container'),
};

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
}
export default async function onCardClick(e, data) {
  toggleModal();
  // Создать разметку в модалке для одного фильма
  const markup = createMarkupSingleMovie(data);
  refs.modalwrap.innerHTML = markup;
  // Слушатели событий для кнопок в модалке
  const btnTreiler = document.querySelector('.modal-content__trailer-btn');
  const btnQueue = document.querySelector('[data-action="queue"]');
  const btnWatched = document.querySelector('[data-action="watched"]');

  const watchedArr = JSON.parse(localStorage.getItem('WATCHED')) || [];
  const isWatched = watchedArr.find(el => {
    return el.id === data.id;
  });
  isWatched && (btnWatched.innerHTML = 'REMOVE FROM WATCHED');
  const QueueArr = JSON.parse(localStorage.getItem('QUEUE')) || [];
  const isQueue = QueueArr.find(el => {
    return el.id === data.id;
  });
  isQueue && (btnQueue.innerHTML = 'REMOVE FROM QUEUE');

  function handleWatchLibrary() {
    const watched = getMoviesFromWatched();
    const isIncluded = watched.find(el => el.id === data.id);
    if (!isIncluded) {
      localStorage.setItem('WATCHED', JSON.stringify([...watched, data]));
      btnWatched.innerHTML = 'REMOVE FROM WATCHED';
    } else {
      localStorage.setItem('WATCHED', JSON.stringify(watched.filter(el => el.id !== data.id)));
      btnWatched.innerHTML = 'ADD TO WATCHED';
    }
  }

  function handleQueueLibrary() {
    const queue = getMoviesFromQueue();
    const isIncluded = queue.find(el => el.id === data.id);
    if (!isIncluded) {
      localStorage.setItem('QUEUE', JSON.stringify([...queue, data]));
      btnQueue.innerHTML = 'REMOVE FROM QUEUE';
    } else {
      localStorage.setItem('QUEUE', JSON.stringify(queue.filter(el => el.id !== data.id)));
      btnQueue.innerHTML = 'ADD TO QUEUE';
    }
  }

  function openTpailerFunc(ev) {
    const arrTrail = api.fetchTreiler(data.id).then(res => {
      const resultsV = res.videos.results;
      const oneArr = resultsV.find(el => el.site === 'YouTube');
      const keyV = oneArr.key;
      basicLightbox
        .create(
          `<div class="frame-cont"><iframe class="iframe-tr" cellspacing="0" src="https://www.youtube.com/embed/${keyV}"
               title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write;
               encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`,
        )
        .show();
    });
  }

  btnWatched.addEventListener('click', handleWatchLibrary);
  btnQueue.addEventListener('click', handleQueueLibrary);
  btnTreiler.addEventListener('click', openTpailerFunc);
}
