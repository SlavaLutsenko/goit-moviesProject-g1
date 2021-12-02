import api from './api-service';
import getMovie from './getMovie';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');
const searchInput = document.querySelector('#header-contain-input');

// How to handle input event in header Section
const handleSearch = ev => {
  console.log(ev.target.value);
  api.inputText = ev.target.value;

  getMovie();
  if (ev.target.value === '') {
    Notiflix.Notify.info('Just enter movie name 😉');
  }
};

// Event Listener on header input for search & render movies
searchInput.addEventListener('input', debounce(handleSearch, 500));

// Render movies into movies-gallery on the main page
getMovie();
