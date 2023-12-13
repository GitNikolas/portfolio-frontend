import { React, useEffect, useState } from 'react';
import '../Movies/movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useForm } from '../UseForm/UseForm';
import { getUserFilms } from '../../utils/MainApi';
import { shortFilmDuration } from "../../utils/constants";

function SavedMovies() {
  const [isLoading, setIsLoading] = useState(false);

  const [ movieData, setMovieData ] = useState(null);

  const [ errorMessage, setErrorMessage ] = useState('');

  const [ filmsNotFound, setFilmsNotFound ] = useState(false);

  const { values, isChecked, setIsChecked, handleChange } = useForm();

  async function getMovies() {
    try{
      setIsLoading(true);
      let films = await getUserFilms();
      setMovieData(films);
    }
    catch(err) {
      console.error(err);
    }
    finally{
      setIsLoading(false);
    }
  }

  async function submitSearchForm({ values, isChecked }) {
    const result = await getUserFilms();
    setMovieData(result);
    setFilmsNotFound(false);
    if (!values.name) {
      if (isChecked) {
        const shortFilm = result.filter((film) => film.duration <= shortFilmDuration);
        setMovieData(shortFilm);
        if (shortFilm.length === 0) {
          setMovieData(shortFilm);
          return setFilmsNotFound(true);
        }
        return setMovieData(shortFilm);
      }
      return
    }

    const filter = result.filter(item => item.nameRU.toLowerCase().includes(values.name.toLowerCase())|| item.nameEN.toLowerCase().includes(values.name.toLowerCase()));
    if (isChecked) {
      const shortFilm = filter.filter((film) => film.duration <= shortFilmDuration);
      if (shortFilm.length === 0) {
        setFilmsNotFound(true);
      }
      return setMovieData(shortFilm);
    }
    if (filter.length === 0) {
      setFilmsNotFound(true);
    }
    setMovieData(filter);
  }

  function clearError() {
    setErrorMessage('');
  }

useEffect(() => {
  submitSearchForm({ values, isChecked });
}, [isChecked])

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

      <div className='movies__content'>

        {isLoading && <Preloader />}

        { filmsNotFound && <h2 className='movies__not-found-title'> Ничего не найдено </h2> }

        <MoviesCardList
        movieData={movieData}
        setMovieData={setMovieData} />

      </div>

    </section>
  );
}

export default SavedMovies;
