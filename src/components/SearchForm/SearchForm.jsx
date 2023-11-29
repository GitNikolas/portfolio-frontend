import React from 'react';
import SearchButton from '../UI/Search-button/Search-button';
import Tumbler from '../UI/Tumbler/Tumbler';
import './search-form.css';

function SearchForm({ values, isChecked, handleChange, setIsChecked, submitSearchForm,
  errorMessage, clearError, setErrorMessage, isLoading }) {

  function onSubmit(event) {
    event.preventDefault();
    if(!values.name){
      return setErrorMessage('Нужно ввести ключевое слово');
    }
    submitSearchForm({ values, isChecked });
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        onClick={clearError}
        noValidate
      >
        <fieldset className='search-form'
          disabled={isLoading ? true : false}
        >
          <div className='search-form__search'>
            <div className='search-form__container'>
              <input
                className='search-form__input'
                placeholder='Фильм'
                name='name'
                value={values.name || ''}
                onChange={handleChange}
                required={true}
              />
              <SearchButton type='submit'>Найти</SearchButton>
            </div>
          </div>

          <div
            className='search-form__filter'
          >
            <Tumbler
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
            <p>Короткометражки</p>
          </div>
        </fieldset>
      </form>
      {errorMessage !== '' && <span
        className='search-form__error'
      >{errorMessage}</span>}
    </>
  );
}

export default SearchForm;
