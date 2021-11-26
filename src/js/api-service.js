export default class ApiService {
  BASE_URL = 'https://api.themoviedb.org/3';
  #page = 1;
  fetchMovies() {
    const queryParams = new URLSearchParams({
      api_key: '87f9885ae1efa5e26738121aab64796c',
      page: this.#page,
    });
    return fetch(`${this.BASE_URL}/movie/upcoming?${queryParams}`)
      .then(data => {
        if (data.ok) {
          return data.json();
        }
        return Promise.reject(new Error('Error'));
      })
      .then(data => data.results);
  }
}

const gall = document.querySelector('.movies-gallery');
console.log(gall);
const api = new ApiService();

const getMovies = () => {
  api.fetchMovies().then(res => {
    console.log(res);
    makeMoviesMarkup(res);
    renderMovies(res);
  });
  // .catch(err => handleError(err));
};

const makeMoviesMarkup = movies => {
  const normalizedMovies = movies.map(({ title, release_date, poster_path }) => {
    const releaseYear = new Date(release_date).getFullYear();
    // let poster = emptyImg;
    // if (poster_path) {
    //   poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
    // }
    return { title, releaseYear, poster_path };
  });
  const markup = normalizedMovies
    .map(({ title, releaseYear, poster_path }) => {
      return `<div class="movies-card">
      <img class="movies" src="https://image.tmdb.org/t/p/w500${poster_path}">
      <p class="movies_name">
        ${title} <br/>
        <span class="genre">Drama | ${releaseYear}</span>
      </p></div>`;
    })
    .join('');
  return markup;
};

const renderMovies = res => {
  const markup = makeMoviesMarkup(res);
  console.log(markup);
  gall.innerHTML = markup;
  // console.log(markup);
  // return markup;
};
getMovies();
