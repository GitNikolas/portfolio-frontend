import { React, useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './profile.css';
import { signOut, patchUser } from '../../utils/MainApi';
import SubmitButton from '../UI/Submit-button/SubmitButton';
import { useFormWithValidation } from '../UseForm/UseForm';

function Profile({ logout }) {

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [ isEdit, setIsEdit ] = useState(false);

  const { values, setValues, errors, isValid, serverMessage, setserverMessage, handleChange, resetServerError } = useFormWithValidation();

  const [ isLoading, setIsLoading ] = useState(false);

  async function handleSignOut(event) {
    try {
      event.preventDefault();
      const response = await signOut();
      if(response.ok) {
        logout();
        localStorage.clear();
      }
      else {
        throw new Error (response);
      }
    }
    catch(err) {
      console.error(err.message);
    }
  }

  function handleProfileEdit() {
    setIsEdit(true);
    resetServerError();
  }

    async function handleSubmit(event) {
    try{
      event.preventDefault();
      setIsLoading(true);
      let response = await patchUser(values);
      if(response.ok){
        setCurrentUser(values);
        setserverMessage('Профиль успешно обновлён');
        setTimeout(resetServerError, 3000);
        setIsEdit(false);
      }
      else {
        setserverMessage(response);
      }
    }
    catch(err) {
      setserverMessage(err);
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setValues(currentUser);
  }, [])

  return (
    <section className='profile'>
      <p
        className='profile__title'
      >Привет, {currentUser.name}!</p>
      <form
        onBlur={handleChange}
        onSubmit={handleSubmit}
        noValidate
      >

        <fieldset
          className='profile__form'
          disabled={isLoading ? true : false}
        >

          <div className='profile__field'>
            Имя
            <input
              className='profile__input'
              name='name'
              value={values.name || ''}
              onChange={handleChange}
              disabled={isEdit ? false : true}
              required={true}
              minLength={2}
              maxLength={30}
            />
            <span className='profile__input-error'>{errors.name}</span>
          </div>


          <div className='profile__field'>
            Email
            <input
              className='profile__input'
              name='email'
              type='email'
              value={values.email || ''}
              onChange={handleChange}
              disabled={isEdit ? false : true}
              required={true}
            />
            <span className='profile__input-error'>{errors.email}</span>
          </div>

          <span
            className='profile__error'
          >{serverMessage}</span>

          {isEdit && <SubmitButton
            disabled={(isValid && (currentUser.name !== values.name || currentUser.email !== values.email)) ? false : true}
          >Сохранить</SubmitButton>}

          {!isEdit && <button
            className='profile__edit-button'
            onClick={handleProfileEdit}
          >Редактировать</button>}

          {!isEdit && <button
            className='profile__leave-button'
            onClick={handleSignOut}
          >Выйти из аккаунта</button>}

        </fieldset>

      </form>

    </section>
  );
}

export default Profile;
