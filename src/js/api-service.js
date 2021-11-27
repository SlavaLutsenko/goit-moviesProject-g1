// All fetch logic collected here
export default class ApiService {
  BASE_URL = 'https://api.themoviedb.org/3';
  API_KEY = '87f9885ae1efa5e26738121aab64796c';
  constructor() {
    this.inputText = '';
    this.page = 1;
  }

  // Fetch Movies instantly
  fetchMovies() {
    return fetch(`${this.BASE_URL}/trending/movie/week?api_key=${this.API_KEY}&page=${this.page}`)
      .then(data => {
        if (data.ok) {
          return data.json();
        }
        return Promise.reject(new Error('Error'));
      })
      .then(data => data.results);
  }

  // Search & fetch Movies with header input
  searchMovies() {
    return fetch(
      `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.inputText}`,
    )
      .then(data => {
        if (data.ok) {
          return data.json();
        }
        return Promise.reject(new Error('Error'));
      })
      .then(data => data.results);
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get inputValue() {
    return this.inputText;
  }
  set inputValue(newInputValue) {
    this.inputText = newInputValue;
  }
}
