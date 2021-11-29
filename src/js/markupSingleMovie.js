export default function createMarkupSingleMovie({
  poster_path,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
}) {
  const movie_genres = genres.map(genre => genre.name).join(' '); //TODO: убрать запятые -> поставить пробел

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
}
