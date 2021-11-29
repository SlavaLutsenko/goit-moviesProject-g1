import createMarkupSingleMovie from './markupSingleMovie';
import api from './api-service';
const refs = {
  gallery: document.querySelector('.movies-gallery'),
  modalwrap: document.querySelector('.output-js'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  out: document.querySelector('.test-markup'), //! изменить куда добавлять
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
};

// Закрытие и открытие модалки по клику
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.gallery.addEventListener('click', onCardClick);
function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
}
// Закрытие модалки по кнопке ESC
const handleEscPress = function (e) {
  if (e.code === 'Escape') {
    refs.modal.classList.add('is-hidden');
    refs.body.classList.toggle('no-scroll');
  }
};
window.addEventListener('keydown', handleEscPress);
// Логика получения id по клику на карточку фильма и
// отрисовка данных в модалке
function onCardClick(e) {
  if (e.target.tagName !== 'IMG') {
    return;
  }
  toggleModal();
  const movie = e.target;
  const CARD_ID = Number(movie.dataset.id);

  api.getMovieData(CARD_ID).then(data => {
    const markup = createMarkupSingleMovie(data);
    refs.modalwrap.innerHTML = markup;
  });
}
