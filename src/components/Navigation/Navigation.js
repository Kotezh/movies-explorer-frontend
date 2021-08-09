import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';
import AccountButton from '../AccountButton/AccountButton';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function Navigation({
  onClose,
  isOpen,
  onBurgerClick,
  isTablet,
  isMobile,
  loggedIn,
}) {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && !loggedIn && (
        <div className='navigation'>
          <NavLink to='/signup' className='navigation__link'>
            Регистрация
          </NavLink>
          <NavLink
            to='/signin'
            className='navigation__link navigation__link_green'
          >
            Войти
          </NavLink>
        </div>
      )}
      {(location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile') &&
        !isTablet &&
        !isMobile &&
        loggedIn && (
          <>
            <div className='navigation'>
              <NavLink
                to='/movies'
                activeClassName='navigation__link_active'
                className='navigation__link_movie'
              >
                Фильмы
              </NavLink>
              <NavLink
                to='/saved-movies'
                activeClassName='navigation__link_active'
                className='navigation__link_movie '
              >
                Сохранённые фильмы
              </NavLink>
            </div>
            <AccountButton />
          </>
        )}
      {(location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile') &&
        (isTablet || isMobile) &&
        loggedIn && (
          <button
            className='navigation__burger-button'
            type='button'
            aria-label='Open'
            onClick={onBurgerClick}
          ></button>
        )}
      <BurgerMenu isOpen={isOpen} onClose={onClose} />
    </>
  );
}
