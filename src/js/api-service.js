export default class ApiService {
  BASE_URL = 'https://api.themoviedb.org/3';
  API_KEY = '87f9885ae1efa5e26738121aab64796c';
  constructor() {
    this.inputText = '';
    this.page = 1;
  }

  // Fetch Movies instantly
  fetchMovies() {
    return fetch(`${this.BASE_URL}/trending/movie/week?api_key=${this.API_KEY}&page=${this.page}`)
      .then(data => {
        if (data.ok) {
          return data.json();
        }
        return Promise.reject(new Error('Error'));
      })
      .then(data => data.results);
  }

  // Search Movies with input
  searchMovies() {
    return fetch(
      `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.inputText}`,
    )
      .then(data => {
        if (data.ok) {
          return data.json();
        }
        return Promise.reject(new Error('Error'));
      })
      .then(data => data.results);
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get inputValue() {
    return this.inputText;
  }
  set inputValue(newInputValue) {
    this.inputText = newInputValue;
  }
}

const gall = document.querySelector('.movies-gallery');
const api = new ApiService();
const searchInput = document.querySelector('#header-contain-input');

const handleSearch = ev => {
  api.inputText = event.target.value;
  api.searchMovies().then(res => {
    makeMoviesMarkup(res);
    renderMovies(res);
  });
  if (event.target.value === '') getMovies();
};
searchInput.addEventListener('input', handleSearch);

const getMovies = () => {
  api.fetchMovies().then(res => {
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
  gall.innerHTML = markup;
};

getMovies();
