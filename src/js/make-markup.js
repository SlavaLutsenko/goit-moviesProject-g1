import posterImg from '../images/blank.jpg';

const gall = document.querySelector('.movies-gallery');
const imgBlank = document.querySelector('.blank-img');

export default async function makeMoviesMarkup(movies) {
  if (movies.length === 0) {
    gall.innerHTML = '';
    imgBlank.classList.remove('blank-img');
    return;
  }
  imgBlank.classList.add('blank-img');
  const normalizedMovies = movies.map(
    ({ title, release_date, poster_path, id, genre_ids, vote_average }) => {
      const normGenr = genre_ids.join(', ');
      const releaseYear = new Date(release_date).getFullYear();
      let poster = posterImg;
      if (poster_path) {
        poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
      }
      return { title, releaseYear, poster, id, normGenr, vote_average };
    },
  );
  return Promise.all(
    normalizedMovies.map(({ title, releaseYear, poster, id, vote_average, normGenr }) => {
      const imgL = document.createElement('img');
      imgL.src = poster;
      imgL.classList.add('movies');
      imgL.dataset.id = id;
      return new Promise(res => {
        imgL.onload = () => res({ title, releaseYear, imgL, vote_average, normGenr });
      });
    }),
  ).then(arr => {
    gall.innerHTML = arr
      .map(
        ({ title, releaseYear, imgL, vote_average, normGenr }) => `<div class="movies-card">
      ${imgL.outerHTML}
      <p class="movies_name">
        ${title}
        <div class="movies_info">
          <span class="genre"><span class="dirgenre">${normGenr}</span> | ${releaseYear}</span>
          <span class="rait">${vote_average}</span>
        </div>
      </p></div>`,
      )
      .join('');
  });
}
