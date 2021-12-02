import createMarkupSingleMovie from './markupSingleMovie';
import api from './api-service';
import makeMoviesMarkup from './make-markup';
import onCardClick from './onCardClick';

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

refs.closeModalBtn.addEventListener('click', function () {
  if (this.hasAttribute('data-modal-close')) {
    toggleModal();
  }
});

refs.gallery.addEventListener('click', async e => {
  if (e.target.tagName !== 'IMG') {
    return;
  }
  const movie = e.target;
  const CARD_ID = Number(movie.dataset.id);
  const data = await api.getMovieData(CARD_ID).then(data => {
    return data;
  });
  onCardClick(e, data);
});

refs.backdrop.addEventListener('click', e => {
  if (e.target.matches('.backdrop-container')) {
    toggleModal();
  }
});

window.addEventListener('keydown', handleEscPress);
