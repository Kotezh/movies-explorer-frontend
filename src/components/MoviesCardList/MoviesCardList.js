import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  DESKTOP_ROW_AMOUNT,
  DESKTOP_CARDS_AMOUNT,
  TABLET_ROW_AMOUNT,
  TABLET_CARDS_AMOUNT,
  MOBILE_CARDS_AMOUNT,
  MOBILE_ROW_AMOUNT,
  NOT_FOUND_ERROR_TEXT,
  ANY_ERROR_TEXT,
} from '../../utils/constants';

export default function MoviesCardList({
  searchedMovies,
  onMovieSave,
  onMovieDelete,
  savedMovies,
  isNoData,
  isMobile,
  isTablet,
  isError,
}) {
  const location = useLocation();
  const [movies, setMovies] = useState(searchedMovies);
  const [moviesAmountRow, setMoviesAmountRow] = useState(rowAmount());
  const [moviesAmount, setMoviesAmount] = useState(cardsAmount());

  // resize
  function rowAmount() {
    if (isMobile) {
      return MOBILE_ROW_AMOUNT;
    } else if (isTablet) {
      return TABLET_ROW_AMOUNT;
    } else {
      return DESKTOP_ROW_AMOUNT;
    }
  }

  function cardsAmount() {
    if (isMobile) {
      return MOBILE_CARDS_AMOUNT;
    } else if (isTablet) {
      return TABLET_CARDS_AMOUNT;
    } else {
      return DESKTOP_CARDS_AMOUNT;
    }
  }

  function resize() {
    setMoviesAmountRow(rowAmount());
  }

  function resetResizeTimer() {
    let resizeTimer = false;

    function setResizeTimer() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 1500);
    }
    return setResizeTimer;
  }

  window.addEventListener('resize', resetResizeTimer());
  // ===============================================================

  useEffect(() => {
    if (location.pathname === '/movies') {
      const newMovies = searchedMovies.map((m) => {
        const movie = { ...m };
        movie.isSaved = savedMovies.map((s) => s.movieId).includes(m.id);
        movie._id = savedMovies.find((s) => s.movieId === m.id)?._id;
        return movie;
      });
      setMovies(newMovies);
    }
    if (location.pathname === '/saved-movies') {
      setMovies(searchedMovies);
    }
  }, [location.pathname, searchedMovies, savedMovies]);

  function handleClickMore() {
    const moviesCount = moviesAmount;
    setMoviesAmount(moviesCount + moviesAmountRow);
  }

  return (
    <section className='movies-section'>
      <div className='movies-section__list'>
        {isError ? (
          <span className='movies-section__error'>{ANY_ERROR_TEXT}</span>
        ) : isNoData ? (
          <span className='movies-section__no-data'>
            {NOT_FOUND_ERROR_TEXT}
          </span>
        ) : (
          movies
            .filter((movie, index) => index < moviesAmount)
            .map((movie) => (
              <MoviesCard
                key={movie.id || movie.movieId}
                movie={movie}
                onMovieSave={onMovieSave}
                onMovieDelete={onMovieDelete}
              />
            ))
        )}
      </div>
      {movies?.length > moviesAmount &&
        !isError &&
        location.pathname === '/movies' && (
          <button
            onClick={handleClickMore}
            className='movies-section__btn-more'
          >
            Ещё
          </button>
        )}
    </section>
  );
}
