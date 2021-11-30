import { renderNumberPag } from './pagination.js';

const pagLeft = document.querySelector('.pagination-row-left');
const pagRight = document.querySelector('.pagination-row-right');
// All fetch logic collected here
class ApiService {
  BASE_URL = 'https://api.themoviedb.org/3';
  API_KEY = '87f9885ae1efa5e26738121aab64796c';
  constructor() {
    this.inputText = '';
    this.page = 1;
    this.totalPages = null;
  }
  // Fetch Movies instantly
  fetchMovies() {
    let urlBase = this.inputText
      ? `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&language=en-US&page=${
          this.page
        }&include_adult=false&query=${encodeURIComponent(this.inputText)}`
      : `${this.BASE_URL}/trending/movie/week?api_key=${this.API_KEY}&page=${this.page}`;

    return fetch(urlBase)
      .then(data => {
        if (data.ok) {
          return data.json();
        }
        return Promise.reject(new Error('Error'));
      })
      .then(data => {
        if (data.total_pages !== this.totalPages) {
          this.totalPages = data.total_pages;
        }
        renderNumberPag(this.page, this.totalPages);
        return data.results;
      });
  }
  getMovieData(id) {
    return fetch(`${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}`).then(data => {
      if (data.ok) {
        return data.json();
      }
      return Promise.reject(new Error('Error'));
    });
  }
  /* Kate start */
  getGenres() {
    return fetch(`${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}`).then(data => {
      if (data.ok) {
        return data.json();
      }
      return Promise.reject(new Error('Error'));
    });
  }
  /* Kate end */

  // Search & fetch Movies with header input
  // searchMovies() {
  //   return fetch(
  //     `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.inputText}`,
  //   )
  //     .then(data => {
  //       if (data.ok) {
  //         return data.json();
  //       }
  //       return Promise.reject(new Error('Error'));
  //     })
  //     .then(data => data.results);
  // }

  get inputValue() {
    return this.inputText;
  }
  set inputValue(newInputValue) {
    this.inputText = newInputValue;
  }
  changePage(newPage) {
    if (newPage === 1) {
      pagLeft.disabled = true;
    } else if (pagLeft.disabled) {
      pagLeft.disabled = false;
    }
    if (newPage === this.totalPages) {
      pagRight.disabled = true;
    } else if (pagRight.disabled) {
      pagRight.disabled = false;
    }
    this.page = newPage;
  }
}

const api = new ApiService();
export default api;
