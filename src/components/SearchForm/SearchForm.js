import React, { useState } from "react";
import "./SearchForm.css";
import searchIcon from "../../images/search-icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({ onSearch }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onSearch();
  }
  return (
    <div className="search">
      <div className="search__wrapper">
        <form className="search__form" onSubmit={handleSubmit}>
          <fieldset className="search__fieldset">
            <label htmlFor="search" className="search__input-label">
              <img src={searchIcon} alt="иконка" className="search__icon" />
              <input
                id="search"
                type="text"
                name="search"
                value={value}
                onChange={handleChange}
                minLength="2"
                maxLength="30"
                className="search__input"
                pattern="^[a-zA-Zа-яёА-ЯЁ0-9]{3,29}$"
                placeholder="Фильм"
                required
              />
            </label>
            <button className="search__button" type="submit">
              Найти
            </button>
          </fieldset>
          <div className="search__vertical-line"></div>
          <FilterCheckbox />
        </form>
      </div>
    </div>
  );
}
