import React, { useState } from "react";
import "./Navigation.css";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import AccountButton from "../AccountButton/AccountButton";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { ESC_KEYCODE } from "../../utils/constants";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  function handleEscClose(evt) {
    const key = evt.keyCode;
    if (key === ESC_KEYCODE) {
      closeAllPopups();
    }
  }
  function handleBurgerClick() {
    setIsOpen(true);
    document.addEventListener("keydown", handleEscClose);
  }

  function closeAllPopups() {
    setIsOpen(false);
    document.removeEventListener("keydown", handleEscClose);
  }

  return (
    <>
      {location.pathname === "/" && (
        <div className="navigation">
          <NavLink to="/signup" className="navigation__link">
            Регистрация
          </NavLink>
          <NavLink
            to="/signin"
            className="navigation__link navigation__link_green"
          >
            Войти
          </NavLink>
        </div>
      )}
      {(location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile") && !isMobile && (
        <>
          <div className="navigation">
            <NavLink
              to="/movies"
              activeClassName="navigation__link_active"
              className="navigation__link_movie"
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              activeClassName="navigation__link_active"
              className="navigation__link_movie "
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <AccountButton />
        </>
      )}
      {(location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile") &&
        isMobile && (
          <button
            className="navigation__burger-button"
            type="button"
            aria-label="Open"
            onClick={handleBurgerClick}
          ></button>
        )}
      <BurgerMenu isOpen={isOpen} onClose={closeAllPopups} />
    </>
  );
}
