import React from 'react';
import { useLocation } from 'react-router-dom';
import successImg from '../../images/icon-success.svg';
import errorImg from '../../images/icon-error.svg';
import './InfoTooltip.css';
import Preloader from '../Preloader/Preloader';
import {
  PROFILE_ERROR_TEXT,
  SUCCESS_PROFILE_TEXT,
  REGISTRATON_ERROR_TEXT,
  SUCCESS_REG_TEXT,
} from '../../utils/constants';

export default function InfoTooltip({ isOpen, onClose, success, isLoading }) {
  const location = useLocation();
  const openedClass = isOpen || isLoading ? 'popup_opened' : '';

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <section
      className={`popup popup_type_${
        success ? 'tooltip-success' : 'tooltip-error'
      } ${openedClass}`}
      onClick={handleOverlayClick}
    >
      {isLoading && <Preloader />}
      {isOpen && (
        <div className='popup__container'>
          <button
            type='reset'
            aria-label='Close'
            className='popup__close'
            onClick={onClose}
          ></button>
          <div className='popup__tooltip'>
            <img
              className='popup__tooltip-icon'
              src={success ? successImg : errorImg}
              alt='Иконка'
            />
            <p className='popup__tooltip-text'>
              {success
                ? location.pathname === '/profile'
                  ? SUCCESS_PROFILE_TEXT
                  : SUCCESS_REG_TEXT
                : location.pathname === '/profile'
                ? PROFILE_ERROR_TEXT
                : REGISTRATON_ERROR_TEXT}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
