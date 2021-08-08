import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { validatorConfig, PATTERN_EMAIL_ERROR_TEXT, PATTERN_NAME_ERROR_TEXT, PATTERN_PASSWORD_ERROR_TEXT } from "../../utils/constants";
import useValidate from "../../utils/useValidate";
import Logo from "../Logo/Logo";

export default function Register({ apiErrorText, onRegister, isError }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const isValid = useValidate(values);

  function handleChangeInput(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.name, values.email, values.password);
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
              name="name"
              placeholder="Введите имя"
              id="name"
              type="text"
              className="signup__input"
              value={values?.name}
              onChange={handleChangeInput}
              required
              minLength={validatorConfig.name.minLength}
              maxLength={validatorConfig.name.maxLength}
              pattern={validatorConfig.name.pattern}
              autoComplete="off"
            />
            <span className="signup__input-error" id="name-error">
             {PATTERN_NAME_ERROR_TEXT}
            </span>

            <label className="signup__form-label">E-mail</label>
            <input
              name="email"
              placeholder="Введите свой Email"
              id="email"
              type="email"
              className="signup__input"
              value={values?.email}
              onChange={handleChangeInput}
              required
              minLength={validatorConfig.email.minLength}
              maxLength={validatorConfig.email.maxLength}
              pattern={validatorConfig.email.pattern}
              autoComplete="off"
            />
            <span className="signup__input-error" id="email-error">
              {PATTERN_EMAIL_ERROR_TEXT}
            </span>

            <label className="signup__form-label">Пароль</label>
            <input
              name="password"
              placeholder="Придумайте пароль"
              id="password"
              type="password"
              className="signup__input"
              value={values?.password}
              onChange={handleChangeInput}
              required
              minLength={validatorConfig.password.minLength}
              maxLength={validatorConfig.password.maxLength}
              pattern={validatorConfig.password.pattern}
              autoComplete="off"
            />
            <span className="signup__input-error" id="password-error">
             {PATTERN_PASSWORD_ERROR_TEXT}
            </span>
          </fieldset>

          <span
            className={`signup__error ${isError && "signup__error_visible"}`}
            id="signup-error"
          >
            {apiErrorText}
          </span>

          <button
            name="submit"
            type="submit"
            className={`signup__btn signup__btn_type_submit ${
              !isValid && "signup__btn_type_disabled"
            }`}
            value="Зарегистрироваться"
            disabled={!isValid}
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
