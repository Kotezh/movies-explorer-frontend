import { MOVIES_URL } from "./constants";

class MoviesApi {
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

  getMovies() {
    return fetch(`${this.url}/beatfilm-movies`, {
      headers: this.headers,
    }).then(this._parseResponse);
  }
}

const config = {
  baseUrl: MOVIES_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const moviesApi = new MoviesApi(config);

export default moviesApi;
