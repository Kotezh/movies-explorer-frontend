import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://kotezh.github.io/how-to-learn/'
            target='_blank'
            rel='noreferrer noopener'
          >
            Статичный сайт
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://kotezh.github.io/russian-travel/'
            target='_blank'
            rel='noreferrer noopener'
          >
            Адаптивный сайт
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://kotezh.mesto.nomoredomains.monster/'
            target='_blank'
            rel='noreferrer noopener'
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </div>
  );
}
