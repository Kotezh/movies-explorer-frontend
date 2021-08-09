import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

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
          .filter((m) => (m.duration <= 40 ? true : !isShortFilm))
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
