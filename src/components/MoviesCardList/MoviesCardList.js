import React from 'react';
import './MoviesCardList.css';
import {movieList} from '../../utils/test-db';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ onClick, onDelete }) {
  return (
    <section className="movies-section">
      <div className="movies-section__list">
        {movieList.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            onClick={onClick}
            onDelete={onDelete}
          />
        ))}
      </div>
      <button className="movies-section__btn-more">Ещё</button>
    </section>
    )
};