import React from 'react';
import successImg from '../../images/icon-success.svg';
import errorImg from '../../images/icon-error.svg';
import './InfoTooltip.css';
import Preloader from '../Preloader/Preloader';

export default function InfoTooltip({ isOpen, onClose, success, isLoading }) {
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
                ? 'Вы успешно зарегистрировались!'
                : 'Что-то пошло не так! Попробуйте ещё раз.'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
