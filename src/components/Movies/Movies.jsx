import { React } from 'react';
import './movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useSearchForm } from '../UseSearchForm/UseSearchForm';

function Movies() {

  const {isLoading, searchResult, savedFilmsId, errorMessage,
    filmsNotFound, values, submitSearchForm, isChecked, setIsChecked,
    handleChange, clearError, setErrorMessage} = useSearchForm();

  return (
    <section className='movies'>
      <SearchForm
      submitSearchForm = {submitSearchForm}
      errorMessage = {errorMessage}
      setErrorMessage = {setErrorMessage}
      clearError = {clearError}
      values = {values}
      isChecked = {isChecked}
      handleChange = {handleChange}
      setIsChecked = {setIsChecked}
      isLoading = {isLoading}
      />
      {isLoading && <Preloader />}

      <div className='movies__content'>

        { filmsNotFound ? <h2 className='movies__not-found-title'> Ничего не найдено </h2>
        : <MoviesCardList movieData={searchResult} savedMovieData={savedFilmsId}/> }

      </div>

    </section>
  );
}

export default Movies;
