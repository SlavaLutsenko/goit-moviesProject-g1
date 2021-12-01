export default function renderLibraryMarkup(movArr) {
  const libraryGall = document.querySelector('.movies-gallery');
  const normalizedMovies = movArr.map(({ title, release_date, poster_path, id, vote_average}) => {
    const releaseYear = new Date(release_date).getFullYear();
    // let poster = emptyImg;
    // if (poster_path) {
    //   poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
    // }
    return { title, releaseYear, poster_path, id, vote_average};
  });
  const markup = normalizedMovies
    .map(({ title, releaseYear, poster_path, id, vote_average}) => {
      return `<div class="movies-card">
      <img class="movies" src="https://image.tmdb.org/t/p/w500${poster_path}" data-id="${id}">
      <p class="movies_name">
        ${title}
        <div class="movies_info">
          <span class="genre">Drama | ${releaseYear}</span>
          <span class="rating">${vote_average}</span>
        </div>
      </p></div>`;
    })
    .join('');
  libraryGall.insertAdjacentHTML('beforeend', markup);
}
