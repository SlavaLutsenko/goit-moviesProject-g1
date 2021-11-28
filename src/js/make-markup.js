export default function makeMoviesMarkup(movies) {
  const normalizedMovies = movies.map(({ title, release_date, poster_path, id}) => {
    const releaseYear = new Date(release_date).getFullYear();
    // let poster = emptyImg;
    // if (poster_path) {
    //   poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
    // }
    return { title, releaseYear, poster_path, id };
  });
  const markup = normalizedMovies
    .map(({ title, releaseYear, poster_path, id}) => {
      return `<div class="movies-card">
      <img class="movies" src="https://image.tmdb.org/t/p/w500${poster_path}" data-id="${id}" [data-modal-open]>
      <p class="movies_name">
        ${title} <br/>
        <span class="genre">Drama | ${releaseYear}</span>
      </p></div>`;
    })
    .join('');
  return markup;
}
