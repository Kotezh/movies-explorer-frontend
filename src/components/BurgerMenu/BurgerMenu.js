import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './BurgerMenu.css';
import AccountButton from '../AccountButton/AccountButton';

export default function BurgerMenu({ onClose, isOpen }) {
  const openedClass = isOpen ? 'burger-menu_opened' : '';
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }
  const location = useLocation();

  return (
    <section
      className={`burger-menu ${openedClass}`}
      onClick={handleOverlayClick}
    >
      <div className='burger-menu__container'>
        <button
          type='reset'
          aria-label='Close'
          className='burger-menu__close'
          onClick={onClose}
        ></button>
        <div className='burger-menu__links'>
          <NavLink
            exact
            to={{
              pathname: '/',
              state: { from: location.pathname },
            }}
            onClick={onClose}
            activeClassName='burger-menu__link_active'
            className='burger-menu__link'
          >
            Главная
          </NavLink>
          <NavLink
            to={{ pathname: '/movies', state: { from: location.pathname } }}
            onClick={onClose}
            activeClassName='burger-menu__link_active'
            className='burger-menu__link'
          >
            Фильмы
          </NavLink>
          <NavLink
            to={{
              pathname: '/saved-movies',
              state: { from: location.pathname },
            }}
            onClick={onClose}
            activeClassName='burger-menu__link_active'
            className='burger-menu__link '
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <AccountButton onClose={onClose} />
      </div>
    </section>
  );
}
