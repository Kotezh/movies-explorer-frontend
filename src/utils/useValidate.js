import { useEffect, useState } from 'react';
import validator from 'validator';
import { validatorConfig } from './constants';

const useValidate = (values) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(true);
    for (const key in values) {
      if (key === 'email' && (!values[key] || !validator.isEmail(values[key]))) {
        setIsValid(false);
      } else if (key !== 'email') {
        if (
          validatorConfig[key] &&
          values[key].length < validatorConfig[key].minLength
        ) {
          setIsValid(false);
        }
        if (
          validatorConfig[key] &&
          values[key].length > validatorConfig[key].maxLength
        ) {
          setIsValid(false);
        }
        if (values[key]) {
          const regexp = new RegExp(validatorConfig[key].pattern);
          if (!regexp.test(values[key])) setIsValid(false);
        }
      }
    }
  }, [values]);

  return isValid;
};

export default useValidate;
