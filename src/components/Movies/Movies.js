import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { SHORTS_DURATION } from '../../utils/constants';
import { useHistory, useLocation } from 'react-router-dom';

export default function Movies({
  isError,
  onMovieSave,
  onMovieDelete,
  savedMovies,
  movies,
  isMobile,
  isTablet,
  getAllMovies,
  getSavedMovies,
}) {
  const [search, setSearch] = useState('');
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isNoData, setIsNoData] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const history = useHistory();
  const location = useLocation().pathname;

  useEffect(() => {
    const locationFrom = history.location.state?.from || '';
    if (
      (location === '/movies' &&
        ['/saved-movies', '/profile'].includes(locationFrom)) ||
      (location === '/saved-movies' &&
        ['/movies', '/profile'].includes(locationFrom))
    ) {
    } else {
      const searchValue = localStorage.getItem('search');
      const shortsCheckboxValue =
        localStorage.getItem('isShortFilm') === 'true';
      if (!!searchValue || shortsCheckboxValue) {
        setSearch(searchValue);
        setIsShortFilm(shortsCheckboxValue);
      }
    }
  }, [location, history]);

  function handleSearchClick(searchValue, shortsCheckboxValue) {
    setIsSearchError(false);
    if (!searchValue) {
      setIsSearchError(true);
    } else {
      setIsLoading(true);
      !movies.length && getAllMovies();
      !movies.length && getSavedMovies();
      setSearch(searchValue);
      setIsShortFilm(shortsCheckboxValue);
      localStorage.setItem('search', searchValue);
      localStorage.setItem(
        'isShortFilm',
        shortsCheckboxValue ? 'true' : 'false'
      );
    }
  }

  useEffect(() => {
    setIsLoading(true);
    if (search || isShortFilm) {
      setSearchedMovies(
        movies
          .filter(
            (m) =>
              m.nameRU?.toLowerCase().includes(search.toLowerCase()) ||
              m.nameEN?.toLowerCase().includes(search.toLowerCase())
          )
          .filter((m) => (m.duration <= SHORTS_DURATION ? true : !isShortFilm))
      );
    }
    setIsLoading(false);
  }, [movies, search, isShortFilm, isLoading]);

  useEffect(() => {
    if (!isError) {
      if (!searchedMovies.length && (search || isShortFilm)) {
        setIsNoData(true);
      } else {
        setIsNoData(false);
      }
    }
  }, [searchedMovies, search, isShortFilm, isError]);

  return (
    <div className='movies-page'>
      <SearchForm
        hasMovies={!!searchedMovies.length}
        isSearchError={isSearchError}
        onSearchSubmit={handleSearchClick}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          onMovieSave={onMovieSave}
          onMovieDelete={onMovieDelete}
          savedMovies={savedMovies}
          searchedMovies={searchedMovies}
          isNoData={isNoData}
          isMobile={isMobile}
          isTablet={isTablet}
          isError={isError}
        />
      )}
    </div>
  );
}
