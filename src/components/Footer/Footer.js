import React from 'react';
import { useLocation } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  const location = useLocation();
  const isPageWithHeader = ['/', '/movies', '/saved-movies'].includes(location.pathname);
  const year = new Date().getFullYear();
  return (<>{isPageWithHeader ?
    <div className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__wrapper">
        <p className="footer__copyright">&copy; {year}</p>
        <ul className="footer__list">
          <li className="footer__item">
            <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer noopener">Яндекс.Практикум</a>
          </li>
          <li className="footer__item">
            <a className="footer__link" href="https://github.com" target="_blank" rel="noreferrer noopener">Github</a>
          </li>
          <li className="footer__item">
          <a className="footer__link" href="https://www.facebook.com" target="_blank" rel="noreferrer noopener">Facebook</a>
          </li>
        </ul>
      </div>
    </div>
    : <></>
}</>)
};