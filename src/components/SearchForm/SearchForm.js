import React, { useState } from "react";
import "./SearchForm.css";
import searchIcon from "../../images/search-icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { KEYWORD_ERROR_TEXT } from "../../utils/constants";

export default function SearchForm({ hasMovies, onSearchSubmit, isSearchError }) {
  const [searchValue, setSearchValue] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);

  function handleSearchChange(evt) {
    setSearchValue(evt.target.value);
  }

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    onSearchSubmit(searchValue, isShortFilm);
  }

  function handleFilterShorts() {
    setIsShortFilm(!isShortFilm);
    if (hasMovies || (!hasMovies && isShortFilm)) {
      onSearchSubmit(searchValue, !isShortFilm);
    }
  }

  return (
    <div className="search">
      <div className="search__wrapper">
        <form className="search__form" onSubmit={handleSearchSubmit} noValidate>
          <fieldset className="search__fieldset">
            <img src={searchIcon} alt="иконка" className="search__icon" />
            <label htmlFor="search" className="search__input-label">
              <input
                id="search"
                type="text"
                name="search"
                value={searchValue}
                onChange={handleSearchChange}
                minLength="1"
                maxLength="300"
                className="search__input"
                pattern="^.+$"
                placeholder="Фильм"
                required
              />
              <span
                className={`search__error ${isSearchError && "search__error_visible"
                  }`}
                id="search-error"
              >
                {KEYWORD_ERROR_TEXT}
              </span>
            </label>
            <button className="search__button" type="submit">
              Найти
            </button>
          </fieldset>
          <div className="search__vertical-line"></div>
          <FilterCheckbox onFilterShorts={handleFilterShorts} />
        </form>
      </div>
    </div>
  );
}
