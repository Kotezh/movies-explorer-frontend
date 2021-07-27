import React, { useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

export default function MoviesCard({ onMovieClick, movie }) {
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  const handleClick = () => {
    onMovieClick(movie);
  };
  const handleSave = () => {
    setIsSaved(!isSaved);
  };
  const movieSavedClassName = location.pathname === "/movies"
  ? `card__pseudo-item ${isSaved ? "card__pseudo-item_checked" : "card__pseudo-item_unchecked"}`
  : "card__pseudo-item card__pseudo-item_delete";

  return (
    <div className="card">
      <img
        className="card__image"
        src={movie.image}
        alt={movie.nameRu}
        onClick={handleClick}
      />
      <div className="card__caption-wrapper">
        <h2 className="card__title">{movie.nameRu}</h2>
        <p className="card__duration">{movie.duration}</p>
        <label
          htmlFor={`saved-movie-${movie.movieId}`}
          className="card__checkbox-label"
        >
          <input
            type="checkbox"
            id={`saved-movie-${movie.movieId}`}
            checked={isSaved}
            name={`saved-movie-${movie.movieId}`}
            value={true}
            className="card__checkbox"
            onChange={handleSave}
          />
          <span className={movieSavedClassName}></span>
        </label>
      </div>
    </div>
  );
}
