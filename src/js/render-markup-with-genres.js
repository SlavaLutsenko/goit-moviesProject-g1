import api from './api-service';
export default function renderMarkupWithGenres(results) {
  const dirgenre = document.querySelectorAll('.dirgenre');
  const arrGenres = [];
  api.getGenres().then(data => {
    data.genres.map(el => arrGenres.push(el));
    let normalizedGenres = arrGenres.map(el => el);

    const arrMovGenFmData = results.map(el => el.genre_ids);
    const newa = arrMovGenFmData.map(el => {
      if (el.length === 0) return;
      return el.flatMap(element => {
        return normalizedGenres.filter(genre => genre.id === element).map(el => el.name);
      });
    });
    for (let i = 0; i < dirgenre.length; i += 1) {
      if (newa[i] === undefined) {
        dirgenre[i].textContent = 'No genres';
      } else {
        dirgenre[i].textContent = newa[i].slice(0, 2).join(', ');
      }
    }
  });
}
