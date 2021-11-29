import createMarkupSingleMovie from './markupSingleMovie';
import api from './api-service';
const refs = {
  gallery: document.querySelector('.movies-gallery'),
  modalwrap: document.querySelector('.output-js'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
  backdrop: document.querySelector('.backdrop')
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

refs.closeModalBtn.addEventListener('click', toggleModal);
refs.gallery.addEventListener('click', onCardClick);
refs.backdrop.addEventListener('click', (e) =>{
  if(e.target.className.includes('backdrop')){
    toggleModal();
  }
});
window.addEventListener('keydown', handleEscPress);