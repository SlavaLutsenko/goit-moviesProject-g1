import createMarkupSingleMovie from './markupSingleMovie';
import api from './api-service';
import makeMoviesMarkup from './make-markup';
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

// Закрытие модалки по кнопке ESC

const handleEscPress = function (e) {
  if (e.code === 'Escape') {
    refs.modal.classList.add('is-hidden');
    // window.removeEventListener('keydown', handleEscPress); //!удаление слушателя
    refs.body.classList.toggle('no-scroll');
  }
};

// достать фильмы "В очереди" из LocalStorage
const getMoviesFromQueue = () => JSON.parse(localStorage.getItem('QUEUE')) || [];
// достать фильмы "Просмотренные" из LocalStorage
const getMoviesFromWatched = () => JSON.parse(localStorage.getItem('WATCHED')) || [];

function onCardClick(e) {
  if (e.target.tagName !== 'IMG') {
    return;
  }
  toggleModal();

  const movie = e.target;
  const CARD_ID = Number(movie.dataset.id);

  api.getMovieData(CARD_ID).then(data => {
    function handleWatchLibrary() {
      const watched = getMoviesFromWatched();
      const isIncluded = watched.find(el => el.id === data.id);
      if (!isIncluded) {
        localStorage.setItem('WATCHED', JSON.stringify([...watched, data]));
      }
    }

    function handleQueueLibrary() {
      const queue = getMoviesFromQueue();
      const isIncluded = queue.find(el => el.id === data.id);
      if (!isIncluded) {
        localStorage.setItem('QUEUE', JSON.stringify([...queue, data]));
      }
    }

    // Создать разметку в модалке для одного фильма
    const markup = createMarkupSingleMovie(data);
    refs.modalwrap.innerHTML = markup;

    const btnTreiler = document.querySelector('.modal-content__trailer-btn');

    function openTpailerFunc(ev) {
      console.log('open');
      const arrTrail = api.fetchTreiler(CARD_ID).then(res => {
        const resultsV = res.videos.results;
        const oneArr = resultsV.find(el => el.site === 'YouTube');
        const keyV = oneArr.key;
        const markupV = `<div class="frame-cont"><iframe class="iframe-tr" cellspacing="0" src="https://www.youtube.com/embed/${keyV}" 
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
        encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
        refs.backdrop.innerHTML = markupV;
        return;
      });
    }

    // Слушатели событий для кнопок в модалке
    const btnQueue = document.querySelector('[data-action="queue"]');
    const btnWatched = document.querySelector('[data-action="watched"]');
    btnWatched.addEventListener('click', handleWatchLibrary);
    btnQueue.addEventListener('click', handleQueueLibrary);
    btnTreiler.addEventListener('click', openTpailerFunc);

    // Отправить фильмы "Очередь" в localStorage
  });
}

refs.closeModalBtn.addEventListener('click', function () {
  if (this.hasAttribute('data-modal-close')) {
    toggleModal();
  }
});

refs.gallery.addEventListener('click', onCardClick);

refs.backdrop.addEventListener('click', e => {
  if (e.target.matches('.backdrop-container')) {
    toggleModal();
  }
});

window.addEventListener('keydown', handleEscPress);
