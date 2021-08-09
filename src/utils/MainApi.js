import {
  BASE_URL,
  MOVIES_URL,
  PROFILE_ERROR_TEXT,
  INTERNAL_SERVER_ERROR_TEXT,
} from './constants';

class MainApi {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      headers: this.headers,
      credentials: 'include',
    }).then(this._parseResponse);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
      credentials: 'include',
    }).then(this._parseResponse);
  }

  updateUserInfo(name, email) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 500) {
          throw Error(INTERNAL_SERVER_ERROR_TEXT);
        } else {
          throw Error(PROFILE_ERROR_TEXT);
        }
      }
    });
  }

  saveMovie(movie) {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        movieId: movie.id,
        thumbnail: MOVIES_URL + movie.image.formats.thumbnail.url,
        trailer: movie.trailerLink,
        image: MOVIES_URL + movie.image.url,
        description: movie.description,
        year: movie.year,
        duration: movie.duration,
        director: movie.director,
        country: movie.country,
      }),
    }).then(this._parseResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this.url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    }).then(this._parseResponse);
  }
}

const config = {
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const mainApi = new MainApi(config);

export default mainApi;
