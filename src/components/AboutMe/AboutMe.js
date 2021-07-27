import React from 'react';
import './AboutMe.css';
import profilePhoto from '../../images/avatar.jpg';

export default function AboutMe() {
  return (
    <div className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__wrapper">
        <div className="about-me__info">
          <h3 className="about-me__subtitle">Надежда</h3>
          <p className="about-me__text">Фронтенд-разработчик, 33 года</p>
          <p className="about-me__description">
            Я родилась в Ленинграде, живу в Москве, окончила СПбГТИ(ТУ) в 2011 году, у меня 2 высших образования: инженер-химик и экономист. Я люблю слушать музыку, а ещё увлекаюсь вязанием.
            Недавно начала кодить. С 2015 года работала в компании «Горэлтех», которая производит взрывозащищенное оборудование.
            После того, как прошла курс по веб-разработке, ушла с предыдущей работы и нахожусь в поиске новой.
          </p>
          <ul className="about-me__list">
            <li className="about-me__item">
              <a className="about-me__link" href="https://github.com/Kotezh" target="_blank" rel="noreferrer noopener">Github</a>
            </li>
            <li className="about-me__item">
            <a className="about-me__link" href="https://www.facebook.com/nadine.kotegova" target="_blank" rel="noreferrer noopener">Facebook</a>
            </li>
          </ul>
        </div>
        <img className="about-me__photo" src={profilePhoto} alt="Фото студента" />
      </div>
    </div>
  );
}
