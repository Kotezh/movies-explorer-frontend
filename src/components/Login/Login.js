import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import {
  validatorConfig,
  PATTERN_EMAIL_ERROR_TEXT,
  PATTERN_PASSWORD_ERROR_TEXT,
} from '../../utils/constants';
import useValidate from '../../utils/useValidate';
import Logo from '../Logo/Logo';

export default function Login({ apiErrorText, onLogin, isError }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const isValid = useValidate(values);

  function handleChangeInput(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <main className='signin'>
      <section className='signin__section'>
        <header className='signin__header-logo'>
          <Logo />
        </header>
        <h2 className='signin__title'>Рады видеть!</h2>
        <form
          noValidate
          className='signin__form'
          name='signin-form'
          onSubmit={handleSubmit}
        >
          <fieldset className='signin__form-fieldset'>
            <label className='signin__form-label'>E-mail</label>
            <input
              name='email'
              placeholder='Введите Email'
              id='email'
              type='email'
              className='signin__input'
              value={values?.email}
              onChange={handleChangeInput}
              required
              minLength={validatorConfig.email.minLength}
              maxLength={validatorConfig.email.maxLength}
              pattern={validatorConfig.email.pattern}
              autoComplete='off'
            />
            <span className='signin__input-error' id='email-error'>
              {PATTERN_EMAIL_ERROR_TEXT}
            </span>
            <label className='signin__form-label'>Пароль</label>
            <input
              name='password'
              placeholder='Введите пароль'
              id='password'
              type='password'
              className='signin__input'
              value={values?.password}
              onChange={handleChangeInput}
              required
              minLength={validatorConfig.password.minLength}
              maxLength={validatorConfig.password.maxLength}
              pattern={validatorConfig.password.pattern}
              autoComplete='off'
            />
            <span className='signin__input-error' id='password-error'>
              {PATTERN_PASSWORD_ERROR_TEXT}
            </span>
          </fieldset>
          <span
            className={`signin__error ${isError && 'signin__error_visible'}`}
            id='signin-error'
          >
            {apiErrorText}
          </span>
          <button
            name='submit'
            type='submit'
            className={`signin__btn signin__btn_type_submit ${
              !isValid && 'signin__btn_type_disabled'
            }`}
            value='Войти'
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
        <p className='signin__form-link-wrapper'>
          Ещё не зарегистрированы?
          <Link to='/signup' className='signin__form-link'>
            Регистрация
          </Link>
        </p>
      </section>
    </main>
  );
}
