export const ESC_KEYCODE = 27;
export const DESKTOP_CARDS_AMOUNT = 16;
export const TABLET_CARDS_AMOUNT = 8;
export const MOBILE_CARDS_AMOUNT = 5;
export const DESKTOP_ROW_AMOUNT = 4;
export const TABLET_ROW_AMOUNT = 2;
export const MOBILE_ROW_AMOUNT = 2;
export const SHORTS_DURATION = 40;

export const MOVIES_URL = 'https://api.nomoreparties.co';
export const BASE_URL = 'https://api.kotezh.diploma.nomoredomains.monster';

export const INTERNAL_SERVER_ERROR_TEXT = 'На сервере произошла ошибка.';
export const PATTERN_NAME_ERROR_TEXT = 'Некорректный формат имени';
export const PATTERN_EMAIL_ERROR_TEXT = 'Некорректный формат email';
export const PATTERN_PASSWORD_ERROR_TEXT =
  'Строчные и прописные латинские буквы, цифры. Минимум 8 символов.';
export const PROFILE_ERROR_TEXT = 'При обновлении профиля произошла ошибка.';
export const SUCCESS_PROFILE_TEXT = 'Данные успешно обновлены';
export const SUCCESS_REG_TEXT = 'Вы успешно зарегистрировались!';
export const EMAIL_ERROR_TEXT = 'Пользователь с таким email уже существует.';
export const REGISTRATON_ERROR_TEXT =
  'При регистрации пользователя произошла ошибка.';
export const CREDENTIALS_ERROR_TEXT = 'Вы ввели неправильный логин или пароль.';
export const AUTH_ERROR_TEXT = 'При авторизации произошла ошибка.';
export const TOKEN_ERROR_TEXT = 'Необходима авторизация';
export const MAGIC_ERROR_TEXT =
  'При выполнении запроса произошла непредвиденная ошибка';
export const NOT_FOUND_ERROR_TEXT = 'Ничего не найдено';
export const KEYWORD_ERROR_TEXT = 'Нужно ввести ключевое слово';
export const ANY_ERROR_TEXT =
  'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';

export const validatorConfig = {
  name: {
    minLength: 2,
    maxLength: 40,
    pattern: '^[a-zA-Zа-яёА-ЯЁ0-9 -]{2,29}$',
  },
  email: {
    minLength: 2,
    maxLength: 40,
    pattern: '^(\\w+([-.]\\w+)*@\\w+(\\.\\w{2,})+)$',
  },
  password: {
    minLength: 8,
    maxLength: 200,
    pattern: '[a-zA-Z0-9]{8,}',
  },
};
