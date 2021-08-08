import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { MOVIES_URL } from "../../utils/constants";

export default function MoviesCard({ movie, onMovieSave, onMovieDelete }) {
  const location = useLocation();

  const movieSavedClassName =
    location.pathname === "/movies"
      ? `card__pseudo-item ${
          movie.isSaved
            ? "card__pseudo-item_checked"
            : "card__pseudo-item_unchecked"
        }`
      : "card__pseudo-item card__pseudo-item_delete";

  const duration = `${Math.floor(movie.duration / 60)}ч${movie.duration % 60}м`;
  const trailerUrl =
    location.pathname === "/movies"
      ? movie.trailerLink
      : movie.trailer;
  const imageUrl =
    location.pathname === "/movies"
      ? MOVIES_URL + movie.image.url
      : movie.image;

  // const trailerUrl =
  //   MOVIES_URL + movie.image.formats.thumbnail.url || movie.trailerLink;
  // const imageUrl = MOVIES_URL + movie.image.url || movie.image;

  const handleMovieAction = () => {
    if (movieSavedClassName === "card__pseudo-item card__pseudo-item_checked") {
      onMovieDelete(movie);
    } else if (
      movieSavedClassName === "card__pseudo-item card__pseudo-item_unchecked"
    ) {
      onMovieSave(movie);
    } else if (
      movieSavedClassName === "card__pseudo-item card__pseudo-item_delete"
    ) {
      onMovieDelete(movie);
    }
  };

  return (
    <div className="card">
      <a
        href={trailerUrl}
        target="_blank"
        rel="noreferrer"
        className="card__link"
      >
        <img className="card__image" src={imageUrl} alt={movie.nameRU} />
      </a>
      <div className="card__caption-wrapper">
        <h3 className="card__title">{movie.nameRU}</h3>
        <p className="card__duration">{duration}</p>
        <label
          htmlFor={`saved-movie-${movie.id || movie.movieId}`}
          className="card__checkbox-label"
        >
          <input
            type="checkbox"
            id={`saved-movie-${movie.id || movie.movieId}`}
            // checked={movie.isSaved}
            name={`saved-movie-${movie.id || movie.movieId}`}
            value={true}
            className="card__checkbox"
            onChange={handleMovieAction}
            defaultChecked={movie.isSaved}
          />
          <span className={movieSavedClassName}></span>
        </label>
      </div>
    </div>
  );
}
