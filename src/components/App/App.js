import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { ESC_KEYCODE, MAGIC_ERROR_TEXT } from '../../utils/constants';
import * as auth from '../../utils/auth';
import { useMediaQuery } from 'react-responsive';

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [isError, setIsError] = useState(false);
  const [apiErrorText, setApiErrorText] = useState('');
  const [movies, setMovies] = useState(
    localStorage.getItem('movies')
      ? JSON.parse(localStorage.getItem('movies'))
      : []
  );
  const [savedMovies, setSavedMovies] = useState(
    localStorage.getItem('savedMovies')
      ? JSON.parse(localStorage.getItem('savedMovies'))
      : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('isLoggedIn') || false
  );
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  const location = useLocation().pathname;
  const isMobile = useMediaQuery({ maxWidth: 630 });
  const isTablet = useMediaQuery({ maxWidth: 930 });

  useEffect(() => {
    setIsError(false);
    setIsLoading(false);
    const locationFrom = history.location.state?.from || '';
    if (
      (location === '/movies' &&
        ['/saved-movies', '/profile'].includes(locationFrom)) ||
      (location === '/saved-movies' &&
        ['/movies', '/profile'].includes(locationFrom))
    ) {
      localStorage.removeItem('search');
      localStorage.removeItem('isShortFilm');
    }
  }, [location, history]);

  useEffect(() => {
    auth
      .checkToken()
      .then((user) => {
        setCurrentUser(user.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        localStorage.removeItem('isLoggedIn');
        setLoggedIn(false);
      });
  }, [history]);

  function getAllMovies() {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((moviesLoaded) => {
        setMovies(moviesLoaded);
        localStorage.setItem('movies', JSON.stringify(moviesLoaded));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getSavedMovies() {
    setIsLoading(true);
    mainApi
      .getSavedMovies()
      .then((userMovies) => {
        setSavedMovies(
          userMovies.data.filter((s) => s.owner === currentUser._id)
        );
        localStorage.setItem(
          'savedMovies',
          JSON.stringify(
            userMovies.data.filter((s) => s.owner === currentUser._id)
          )
        );
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getUserInfo() {
    setIsLoading(true);
    mainApi
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user.data);
        setLoggedIn(true);
        !localStorage.getItem('isLoggedIn') && history.push('/movies');
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((addedMovie) => {
        setIsError(false);
        localStorage.setItem(
          'savedMovies',
          JSON.stringify([...savedMovies, addedMovie.data])
        );
        setSavedMovies([...savedMovies, addedMovie.data]);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }

  function handleMovieDelete(userMovie) {
    const id = userMovie.movieId || userMovie.id;
    mainApi
      .deleteMovie(userMovie._id)
      .then(() => {
        setIsError(false);
        localStorage.setItem(
          'savedMovies',
          JSON.stringify(savedMovies.filter((m) => m.movieId !== id))
        );
        setSavedMovies(savedMovies.filter((m) => m.movieId !== id));
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }

  function handleEscClose(evt) {
    const key = evt.keyCode;
    if (key === ESC_KEYCODE) {
      closeAll();
    }
  }

  function handleBurgerClick() {
    setIsBurgerOpen(true);
    document.addEventListener('keydown', handleEscClose);
  }

  function closeAll() {
    setIsBurgerOpen(false);
    setIsInfoTooltipOpen(false);
    document.removeEventListener('keydown', handleEscClose);
  }

  function handleUpdateUser(name, email) {
    setIsLoading(true);
    mainApi
      .updateUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData.data);
        setApiErrorText('');
        setIsError(false);
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        if (err.message === 'Failed to fetch') {
          setApiErrorText(MAGIC_ERROR_TEXT);
        } else {
          setApiErrorText(err.message);
        }
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then(() => {
        setIsSuccess(true);
        handleLogin(email, password);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        if (err.message === 'Failed to fetch') {
          setApiErrorText(MAGIC_ERROR_TEXT);
        } else {
          setApiErrorText(err.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((data) => {
        console.log(data);
        if (data.token === 'ok') {
          getUserInfo();
          setLoggedIn(true);
          localStorage.setItem('isLoggedIn', 'true');
          setCurrentUser({ email: email });
          setIsError(false);
          setApiErrorText('');
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        if (err.message === 'Failed to fetch') {
          setApiErrorText(MAGIC_ERROR_TEXT);
        } else {
          setApiErrorText(err.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogout() {
    auth
      .logout()
      .then((res) => {
        if (res.logout === 'ok') {
          setLoggedIn(false);
          localStorage.clear();
          setMovies([]);
          setSavedMovies([]);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        {isBurgerOpen && <BurgerMenu onClose={closeAll} />}
        <Header
          onClose={closeAll}
          isOpen={isBurgerOpen}
          onBurgerClick={handleBurgerClick}
          isTablet={isTablet}
          isMobile={isMobile}
          loggedIn={loggedIn}
        />
        <Switch>
          <Route path='/' exact>
            <Main />
          </Route>
          <ProtectedRoute
            exact
            path='/movies'
            component={Movies}
            isError={isError}
            isLoading={isLoading}
            loggedIn={loggedIn}
            onMovieSave={handleSaveMovie}
            onMovieDelete={handleMovieDelete}
            movies={movies}
            savedMovies={savedMovies}
            isMobile={isMobile}
            isTablet={isTablet}
            getAllMovies={getAllMovies}
            getSavedMovies={getSavedMovies}
          />
          <ProtectedRoute
            exact
            path='/saved-movies'
            component={SavedMovies}
            isError={isError}
            isLoading={isLoading}
            loggedIn={loggedIn}
            onMovieDelete={handleMovieDelete}
            movies={movies}
            savedMovies={savedMovies}
            isMobile={isMobile}
            isTablet={isTablet}
            getSavedMovies={getSavedMovies}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            onSignOut={handleLogout}
            loggedIn={loggedIn}
            setUserData={setCurrentUser}
            isLoading={isLoading}
            onUpdateUser={handleUpdateUser}
            apiErrorText={apiErrorText}
            isError={isError}
            success={isSuccess}
          />
          <Route path='/signup'>
            <Register
              onRegister={handleRegister}
              apiErrorText={apiErrorText}
              isLoading={isLoading}
              isError={isError}
            />
          </Route>
          <Route path='/signin'>
            <Login
              onLogin={handleLogin}
              isError={isError}
              apiErrorText={apiErrorText}
              isLoading={isLoading}
            />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          onClose={closeAll}
          isOpen={isInfoTooltipOpen}
          success={isSuccess}
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
