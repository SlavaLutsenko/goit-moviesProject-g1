import api from './api-service';
import posterImg from '../images/blank.jpg';
const gall = document.querySelector('.movies-gallery');

export default async function makeMoviesMarkup(movies) {
  // `https://via.placeholder.com/300`;
  // let poster = `../images/blank.jpg`;
  const normalizedMovies = movies.map(({ title, release_date, poster_path, id, genre_ids, vote_average }) => {
    const releaseYear = new Date(release_date).getFullYear();
    let poster = posterImg;
    if (poster_path) {
      poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
    }
    return { title, releaseYear, poster, id, genre_ids, vote_average};
  });
  return Promise.all(
    normalizedMovies.map(({ title, releaseYear, poster, id, vote_average}) => {
      const imgL = document.createElement('img');
      imgL.src = poster;
      imgL.classList.add('movies');
      imgL.dataset.id = id;
      return new Promise(res => {
        imgL.onload = () => res({ title, releaseYear, imgL, vote_average});
      });
    }),
  ).then(arr => {
    gall.innerHTML = arr
      .map(
        ({ title, releaseYear, imgL, vote_average }) => `<div class="movies-card">
      ${imgL.outerHTML}
      <p class="movies_name">
        ${title}
        <span class="genre"><span class="dirgenre"></span> | ${releaseYear}</span>
        </span class="raiting">${vote_average}</span>
      </p></div>`,
      )
      .join('');
  });
}
