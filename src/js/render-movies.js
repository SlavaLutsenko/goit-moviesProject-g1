import api from './api-service';
import makeMoviesMarkup from './make-markup';
// const api = new ApiService();
import Notiflix from 'notiflix';

const searchInput = document.querySelector('#header-contain-input');
// How to handle input event in header Section
const handleSearch = ev => {
  api.inputText = event.target.value;
  api.fetchMovies().then(results => {
    if (results.length === 0) {
      Notiflix.Notify.failure('Search result not successful. Enter the correct movie name');
    }
    makeMoviesMarkup(results);
  });
  if (event.target.value === '') {
    Notiflix.Notify.info('Just enter name movie 😉');
  }
  getMovies();
};

// Event Listener on header input for search & render movies
searchInput.addEventListener('input', handleSearch);

// Function for creating movies on first loading of the web-page
const getMovies = () => {
  api
    .fetchMovies()
    .then(results => {
      makeMoviesMarkup(results);
    })
    .catch(err => handleError(err));
};

// Render movies into movies-gallery on the main page

getMovies();
