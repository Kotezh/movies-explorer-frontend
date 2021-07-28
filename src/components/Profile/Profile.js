import React, { useState } from "react";
import "./Profile.css";
import { REQUEST_ERROR_TEXT } from "../../utils/constants";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const email = "test@email.ru";
  const [userName, setUserName] = useState("Надежда");
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  function handleChange(e) {
    e.preventDefault();
    setUserName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsError(true);
  }

  function handleTest(e) {
    e.preventDefault();
    history.push('/');
  }

  return (
    <main className="profile">
      <section className="profile__section">
        <h2 className="profile__title">Привет, {userName}!</h2>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="profile__form"
          name="profile-form"
        >
          <label className="profile__form-label">
            Имя
            <input
              name="user-name"
              placeholder="Введите имя"
              id="user-name"
              type="text"
              className="profile__input"
              value={userName}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="200"
              pattern="^[a-zA-Zа-яёА-ЯЁ0-9]{2,29}$"
            />
          </label>
          <label className="profile__form-label">
            E-mail
            <input
              name="email"
              placeholder="Email"
              id="email"
              type="email"
              className="profile__input"
              value={email}
              onChange={handleChange}
              required
              disabled={true}
              minLength="2"
              maxLength="200"
              pattern=".{2,}@.{2,}\.[a-zA-Z0-9]{2,29}$"
            />
          </label>
          <span
            className={`profile__error ${isError && "profile__error_visible"}`}
            id="profile-error"
          >
            {REQUEST_ERROR_TEXT}
          </span>
          <button
            name="submit"
            type="submit"
            className="profile__btn profile__btn_type_submit"
            value="Редактировать"
          >
            Редактировать
          </button>
        </form>
        <button
          name="logout"
          type="submit"
          className="profile__btn profile__btn_type_logout"
          value="Выйти из аккаунта"
          onClick={handleTest}
        >
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}
