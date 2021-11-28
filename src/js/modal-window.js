(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    body: document.querySelector('body'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    refs.body.classList.toggle('no-scroll');
    console.log('Button open');

    window.addEventListener('keydown', handleEscPress);
  }

  const handleEscPress = function (e) {
    // console.log(e.code);
    if (e.code === 'Escape') {
      refs.modal.classList.add('is-hidden');
      window.removeEventListener('keydown', handleEscPress);
    }
  };
})();


BASE_URL = 'https://api.themoviedb.org/3';
API_KEY = '87f9885ae1efa5e26738121aab64796c';

const refs = {
  gallery: document.querySelector('.movies-gallery'),
  modalwrap: document.querySelector('.output-js'),
};

//ПОЛУЧИЛА ID
const onCardClick = e => {
  if (e.target.tagName !== 'IMG') {
    return;
  }
  const movie = e.target;
  console.log(movie);
  const CARD_ID = Number(movie.dataset.id);
  getMovieData(CARD_ID);
};

refs.gallery.addEventListener('click', onCardClick);

//ЗАПРОС
function getMovieData(id) {
  return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    .then(data => {
      if (data.ok) {
        return data.json();
      }
      return Promise.reject(new Error('Error'));
    })
    .then(data => {
      const markup = createMarkup(data);
      refs.modalwrap.innerHTML = markup;
    });
}

// ПО ПОЛУЧИННЫМ ДАННЫМ ДЕЛАЮ РАЗМЕТКУ
const createMarkup = ({
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) => {
  const movie_genres = genres.map(genre => genre.name).join(' ');
  const movie_popularity = popularity.toFixed(1);
  const movie_title = original_title.toUpperCase();
  return `
    <img class="modal-content__img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}" />
    <div class="wrap">
      <h1 class="modal-content__title">${original_title}</h1>
      <div class="info-wrap modal-content__info-wrap">
        <ul class="category-list">
          <li class="category-list__item">Vote / Votes</li>
          <li class="category-list__item">Popularity</li>
          <li class="category-list__item">Original Title</li>
          <li class="category-list__item">Genre</li>
        </ul>
        <ul class="category-value-list modal-content__category-value-list">
          <li class="category-value-list__item"><span class="category-value-list__item_bg-color">${vote_average}</span
              class=""><span class="category-value-list__item_font-color"> / </span> ${vote_count} </li>
          <li class="category-value-list__item">${movie_popularity}</li>
          <li class="category-value-list__item">${movie_title}</li>
          <li class="category-value-list__item">${movie_genres}</li>
        </ul>
      </div>
      <h2 class="modal-content__subtitle">About</h2>
      <p class="modal-content__description">${overview}</p>
      <div class="btn-wrap content__btn-wrap">
          <button class="btn-wrap__btn active" data-action="">add to Watched</button>
          <button class="btn-wrap__btn " data-action="">add to queue</button>
        </div>
    `;
};