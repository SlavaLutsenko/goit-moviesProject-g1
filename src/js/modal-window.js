import api from './api-service';
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
    refs.body.classList.toggle('no-scroll');
    window.removeEventListener('keydown', handleEscPress);
  }
};

refs.closeModalBtn.addEventListener('click', function () {
  if (this.hasAttribute('data-modal-close')) {
    toggleModal();
    window.removeEventListener('keydown', handleEscPress);
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
  window.addEventListener('keydown', handleEscPress);
});

refs.backdrop.addEventListener('click', e => {
  if (e.target.matches('.backdrop-container')) {
    toggleModal();
    window.removeEventListener('keydown', handleEscPress);
  }
});
