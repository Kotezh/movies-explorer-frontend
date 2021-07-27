import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { REQUEST_ERROR_TEXT } from "../../utils/constants";
import Logo from "../Logo/Logo";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    if (e.target.name === "user-name") {
      setUserName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsError(true);
  }

  return (
    <main className="signup">
      <section className="signup__section">
        <header className="signup__header-logo">
          <Logo />
        </header>
        <h2 className="signup__title">Добро пожаловать!</h2>
        <form
          noValidate
          className="signup__form"
          name="signup-form"
          onSubmit={handleSubmit}
        >
          <fieldset className="signup__form-fieldset">
            <label className="signup__form-label">Имя</label>
            <input
              name="user-name"
              // placeholder="Имя"
              id="user-name"
              type="text"
              className="signup__input"
              value={userName}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="40"
              pattern="^[a-zA-Zа-яёА-ЯЁ0-9]{2,29}$"
              autoComplete="off"
            />
            <span className="signup__input-error" id="user-name-error">
              Некорректный формат имени
            </span>

            <label className="signup__form-label">E-mail</label>
            <input
              name="email"
              // placeholder="Email"
              id="email"
              type="email"
              className="signup__input"
              value={email}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="40"
              pattern="^(\w+([-.]\w+)*@\w+(\.\w{2,})+)$"
              autoComplete="off"
            />
            <span className="signup__input-error" id="email-error">
              Некорректный формат email
            </span>

            <label className="signup__form-label">Пароль</label>
            <input
              name="password"
              // placeholder=""
              id="password"
              type="password"
              className="signup__input"
              value={password}
              onChange={handleChange}
              required
              minLength="8"
              maxLength="200"
              pattern="[a-zA-Z0-9]{8,}"
              autoComplete="off"
            />
            <span className="signup__input-error" id="password-error">
              Строчные и прописные латинские буквы, цифры. Минимум 8 символов
            </span>
          </fieldset>

          <span
            className={`signup__error ${isError && "signup__error_visible"}`}
            id="signup-error"
          >
            {REQUEST_ERROR_TEXT}
          </span>

          <button
            name="submit"
            type="submit"
            className="signup__btn signup__btn_type_submit"
            value="Зарегистрироваться"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="signup__form-link-wrapper">
          Уже зарегистрированы?
          <Link to="/signin" className="signup__form-link">
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}
