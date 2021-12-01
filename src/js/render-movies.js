import api from './api-service';
import makeMoviesMarkup from './make-markup';
import renderMarkupWithGenres from './render-markup-with-genres';
import Notiflix from 'notiflix';

const searchInput = document.querySelector('#header-contain-input');
// How to handle input event in header Section
const handleSearch = ev => {
  api.inputText = event.target.value;
  api.fetchMovies().then(results => {
    if (results.length === 0) {
      Notiflix.Notify.failure('Search result not successful. Enter the correct movie name');
    }
    makeMoviesMarkup(results).then(() => {
      renderMarkupWithGenres(results);
    });
  });
  if (event.target.value === '') {
    Notiflix.Notify.info('Just enter movie name 😉');
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
      makeMoviesMarkup(results).then(() => {
        renderMarkupWithGenres(results);
      });
    })
    .catch(err => handleError(err));
};

// Render movies into movies-gallery on the main page
getMovies();
