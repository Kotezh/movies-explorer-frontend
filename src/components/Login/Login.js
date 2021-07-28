import "./Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { REQUEST_ERROR_TEXT } from "../../utils/constants";
import Logo from "../Logo/Logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    if (e.target.name === "email") {
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
    <main className="signin">
      <section className="signin__section">
        <header className="signin__header-logo">
          <Logo />
        </header>
        <h2 className="signin__title">Рады видеть!</h2>

        <form
          noValidate
          className="signin__form"
          name="signin-form"
          onSubmit={handleSubmit}
        >
          <fieldset className="signin__form-fieldset">
            <label className="signin__form-label">E-mail</label>
            <input
              name="email"
              placeholder="Введите Email"
              id="email"
              type="email"
              className="signin__input"
              value={email}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="40"
              pattern="^(\w+([-.]\w+)*@\w+(\.\w{2,})+)$"
              autoComplete="off"
            />
            <span className="signin__input-error" id="email-error">
              Некорректный формат email
            </span>

            <label className="signin__form-label">Пароль</label>
            <input
              name="password"
              placeholder="Введите пароль"
              id="password"
              type="password"
              className="signin__input"
              value={password}
              onChange={handleChange}
              required
              minLength="8"
              maxLength="200"
              pattern="[a-zA-Z0-9]{8,}"
              autoComplete="off"
            />
            <span className="signin__input-error" id="password-error">
              Строчные и прописные латинские буквы, цифры. Минимум 8 символов
            </span>
          </fieldset>

          <span
            className={`signin__error ${isError && "signin__error_visible"}`}
            id="signin-error"
          >
            {REQUEST_ERROR_TEXT}
          </span>

          <button
            name="submit"
            type="submit"
            className="signin__btn signin__btn_type_submit"
            value="Войти"
          >
            Войти
          </button>
        </form>
        <p className="signin__form-link-wrapper">
          Ещё не зарегистрированы?
          <Link to="/signup" className="signin__form-link">
            Регистрация
          </Link>
        </p>
      </section>
    </main>
  );
}
