import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ shorts, onFilterShorts }) {
  return (
    <label htmlFor="shorts" className="filter__checkbox-label">
      <input
        type="checkbox"
        id="shorts"
        name="shorts"
        value={shorts}
        className="filter__checkbox"
        onChange={onFilterShorts}
      />
      <span className="filter__pseudo-item"></span>
      <span className="filter__checkbox-text">Короткометражки</span>
    </label>
  );
}
