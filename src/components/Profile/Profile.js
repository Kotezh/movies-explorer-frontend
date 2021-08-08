import React, { useState, useContext, useEffect } from "react";
import "./Profile.css";
import { validatorConfig, PATTERN_NAME_ERROR_TEXT } from "../../utils/constants";
import useValidate from "../../utils/useValidate";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({ onSignOut, onUpdateUser, apiErrorText, isError }) {
  const currentUser = useContext(CurrentUserContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [name, setName] = useState(currentUser.name);
  const [baseUserName, setBaseUserName] = useState(currentUser.name);
  const email = currentUser.email;

  const isValid = useValidate({ name: name });

  useEffect(() => {
    setIsButtonDisabled(name === baseUserName);
  }, [name, baseUserName]);

  useEffect(() => {
    setName(currentUser.name);
    setBaseUserName(currentUser.name);
  }, [currentUser.name]);

  function handleChangeInput(e) {
    setName(e.target.value );
  }

  function handleUpdateUser(evt) {
    evt.preventDefault();
    onUpdateUser(name, email);
  }

  return (
    <main className="profile">
      <section className="profile__section">
        <h2 className="profile__title">Привет, {baseUserName}!</h2>
        <form
          noValidate
          onSubmit={handleUpdateUser}
          className="profile__form"
          name="profile-form"
        >
          <label className="profile__form-label">
            Имя
            <input
              name="name"
              placeholder="Введите имя"
              id="name"
              type="text"
              className="profile__input"
              value={name}
              onChange={handleChangeInput}
              required
              minLength={validatorConfig.name.minLength}
              maxLength={validatorConfig.name.maxLength}
              pattern={validatorConfig.name.pattern}
            />
          </label>
          <span className={`profile__input-error ${!isValid && "profile__input-error_visible"}`} id="name-error">
              {PATTERN_NAME_ERROR_TEXT}
            </span>
          <label className="profile__form-label">
            E-mail
            <input
              name="email"
              placeholder="Email"
              id="email"
              type="email"
              className="profile__input"
              value={email}
              onChange={handleChangeInput}
              required
              disabled={true}
              minLength="2"
              maxLength="200"
              pattern=".{2,}@.{2,}\.[a-zA-Z0-9]{2,29}$"
            />
          </label>
          <span
            className={`profile__error ${isError && "profile__error_visible"
              }`}
            id="profile-error"
          >
            {apiErrorText}
          </span>
          <button
            name="edit"
            type="submit"
            className={`profile__btn profile__btn_type_submit ${(!isValid || isButtonDisabled) && "profile__btn_type_disabled"
              }`}
            value="Редактировать"
            disabled={!isValid || isButtonDisabled}
          >
            Редактировать
          </button>
        </form>
        <button
          name="logout"
          type="submit"
          className="profile__btn profile__btn_type_logout"
          value="Выйти из аккаунта"
          onClick={onSignOut}
        >
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}
