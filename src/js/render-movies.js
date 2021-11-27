import ApiService from './api-service';
import makeMoviesMarkup from './make-markup';
const api = new ApiService();

const gall = document.querySelector('.movies-gallery');
const searchInput = document.querySelector('#header-contain-input');
// How to handle input event in header Section
const handleSearch = ev => {
  api.inputText = event.target.value;
  api.searchMovies().then(res => {
    makeMoviesMarkup(res);
    renderMovies(res);
  });
  if (event.target.value === '') getMovies();
};

// Event Listener on header input for search & render movies
searchInput.addEventListener('input', handleSearch);

// Function for creating movies on first loading of the web-page
const getMovies = () => {
  api
    .fetchMovies()
    .then(res => {
      makeMoviesMarkup(res);
      renderMovies(res);
    })
    .catch(err => handleError(err));
};

// Render movies into movies-gallery on the main page
const renderMovies = res => {
  const markup = makeMoviesMarkup(res);
  gall.innerHTML = markup;
};

getMovies();
