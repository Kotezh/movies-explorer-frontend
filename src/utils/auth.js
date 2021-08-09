import { BASE_URL } from './constants';
import {
  AUTH_ERROR_TEXT,
  EMAIL_ERROR_TEXT,
  REGISTRATON_ERROR_TEXT,
  INTERNAL_SERVER_ERROR_TEXT,
  CREDENTIALS_ERROR_TEXT,
  TOKEN_ERROR_TEXT,
} from './constants';

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 500) {
        throw Error(INTERNAL_SERVER_ERROR_TEXT);
      } else if (res.status === 409) {
        throw Error(EMAIL_ERROR_TEXT);
      } else {
        throw Error(REGISTRATON_ERROR_TEXT);
      }
    }
  });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 500) {
        throw Error(INTERNAL_SERVER_ERROR_TEXT);
      } else if (res.status === 401) {
        throw Error(CREDENTIALS_ERROR_TEXT);
      } else {
        throw Error(AUTH_ERROR_TEXT);
      }
    }
  });
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 500) {
        throw Error(INTERNAL_SERVER_ERROR_TEXT);
      } else if (res.status === 401) {
        throw Error(TOKEN_ERROR_TEXT);
      } else {
        throw Error(AUTH_ERROR_TEXT);
      }
    }
  });
};
