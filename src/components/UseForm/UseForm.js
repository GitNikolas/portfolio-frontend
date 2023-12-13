import React, { useCallback, useEffect } from "react";
import validator from 'validator';

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});
  const [ isChecked, setIsChecked ] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };

  return {values, setValues, isChecked, setIsChecked, handleChange};
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [ serverMessage, setserverMessage ] = React.useState('');
   const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  function resetServerError() {
    setserverMessage('');
  }

  function checkEmailValidity(value) {
    let checkEmail = validator.isEmail(value);
    if(!checkEmail) {
      setErrors({ email: 'Введите корректный email-адрес, пример: example@mail.com'})
      return setIsValid(false);
    }
    setIsValid(true);
    setErrors('');
  }

  useEffect(() => {
    if(values.email){
      checkEmailValidity(values.email);
    }
  }, [values.email])

  return { values, setValues, errors, isValid, serverMessage, setserverMessage, handleChange, resetForm, resetServerError};
}
