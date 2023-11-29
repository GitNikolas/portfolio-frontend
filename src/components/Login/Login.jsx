import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import SubmitButton from '../UI/Submit-button/SubmitButton';
import { useFormWithValidation } from '../UseForm/UseForm';
import { login } from '../../utils/MainApi';

function Login({ checkToken, isAuthorized }) {

  const { values, errors, isValid, serverMessage, setserverMessage, handleChange } = useFormWithValidation();
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);

  async function handleLogin(event) {
    try {
      event.preventDefault();
      setIsLoading(true);
      let res= await login(values);
      if(!res.ok){
        throw new Error(res);
      }
      await checkToken();
    }
    catch (err) {
      setIsLoading(false);
      setserverMessage(err.message);
      console.error(err);
    }
  }

  useEffect(() => {
    if(isAuthorized){
      navigate('/movies');
    }
  }, [isAuthorized])

  return (
    <section className='login'>

      <form
        onBlur={handleChange}
        onSubmit={handleLogin}
        noValidate
      >

        <fieldset
        className='login__form'
        disabled={isLoading ? true : false}
        >

          <Link to='/' className="logo" />
          <p
            className='login__title'
          >Рады видеть!</p>

          <div className='login__field'>
            <p className='login__caption'>E-mail</p>
            <input
              className='login__input'
              required={true}
              type='email'
              name='email'
              onChange={handleChange}
              value={values.email || ''}
            />
            <span className='login__input-error'>{errors.email}</span>
          </div>

          <div className='login__field'>
            <p className='login__caption'>Пароль</p>
            <input
              type='password'
              className='login__input'
              required={true}
              name='password'
              onChange={handleChange}
              value={values.password || ''}
            />
            <span className='login__input-error'>{errors.password}</span>
          </div>

          <span
            className='login__error'
          >{serverMessage}</span>

          <SubmitButton
            disabled={isValid ? false : true}
          >
            Войти
          </SubmitButton>

        </fieldset>

      </form>

      <p className='login__caption'>
        Ещё не зарегистрированы?
        <Link
        to='/signup'
        className='login__login-link'>Регистрация</Link>
        </p>


    </section>
  );
}

export default Login;
