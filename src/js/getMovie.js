import api from './api-service';
import Notiflix from 'notiflix';
import makeMoviesMarkup from './make-markup';
const pagCont = document.querySelector('.pagination-container');
const gall = document.querySelector('.movies-gallery');
const imgBlank = document.querySelector('.blank-img');

export default function getMovie() {
  api.fetchMovies().then(results => {
    if (results.length === 0) {
      gall.innerHTML = '';
      imgBlank.classList.remove('blank-img');
      pagCont.style.display = 'none';
      Notiflix.Notify.failure('Search result not successful. Enter the correct movie name');
      return;
    }
    const normMovies = results.map(movie => {
      return {
        ...movie,
        genre_ids: movie.genre_ids.slice(0, 2).map(el => api.genresVal[el]),
      };
    });
    makeMoviesMarkup(normMovies).then(() => {
      if (pagCont.style.display === 'flex') return;
      pagCont.style.display = 'flex';
    });
  });
}
