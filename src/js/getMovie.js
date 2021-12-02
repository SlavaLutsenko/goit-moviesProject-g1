import api from './api-service';
import Notiflix from 'notiflix';
import makeMoviesMarkup from './make-markup';
const pagCont = document.querySelector('.pagination-container');
const gall = document.querySelector('.movies-gallery');
const imgBlank = document.querySelector('.blank-img');

export default function getMovie() {
  api.getGenres().then(data => {
    const normGen = data.genres.reduce((acc, { id, name }) => {
      return { ...acc, [id]: name };
    }, {});

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
          genre_ids: movie.genre_ids
            .map(el => {
              return (el = normGen[el]);
            })
            .slice(0, 2),
        };
      });
      makeMoviesMarkup(normMovies).then(() => {
        if (pagCont.style.display === 'flex') return;
        pagCont.style.display = 'flex';
      });
    });
  });
}
