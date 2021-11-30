import api from './api-service';
const gall = document.querySelector('.movies-gallery');

export default async function makeMoviesMarkup(movies) {
  // const dataFmMGEN = movies.map(el => el.genre_ids.map(el => el).join(' '));
  // console.log(dataFmMGEN);
  // const arrGenres = [];
  // console.log('arrGenres:', arrGenres);
  // const genres = api.getGenres().then(data => {
  //   data.genres.map(el => arrGenres.push(el));
  //   return data.genres;
  // });
  //массив объектов

  const normalizedMovies = movies.map(({ title, release_date, poster_path, id, genre_ids }) => {
    const releaseYear = new Date(release_date).getFullYear();
    // let poster = emptyImg;
    // if (poster_path) {
    //   poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
    // }
    return { title, releaseYear, poster_path, id };
  });
  console.log(normalizedMovies);
  return Promise.all(
    normalizedMovies.map(({ title, releaseYear, poster_path, id }) => {
      const imgL = document.createElement('img');
      imgL.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
      imgL.classList.add('movies');
      imgL.dataset.id = id;
      return new Promise(res => {
        imgL.onload = () => res({ title, releaseYear, imgL });
      });
    }),
  ).then(arr => {
    gall.innerHTML = arr
      .map(
        ({ title, releaseYear, imgL }) => `<div class="movies-card">
      ${imgL.outerHTML}
      <p class="movies_name">
        ${title} <br/>
        <span class="genre">Drama | ${releaseYear}</span>
      </p></div>`,
      )
      .join('');
  });
}
