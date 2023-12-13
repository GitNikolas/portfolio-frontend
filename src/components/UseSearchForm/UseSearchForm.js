import { React, useState, useEffect } from "react";
import { useForm } from "../UseForm/UseForm";
import { getFilms }  from '../../utils/MoviesApi';
import { getUserFilms } from '../../utils/MainApi';
import { shortFilmDuration } from "../../utils/constants";

export function useSearchForm () {

  const [ isLoading, setIsLoading ] = useState(false);

  const [ searchResult, setSearchResult ] = useState(null);

  const [ savedFilmsId, setSavedFilmsId ] = useState(null);

  const [ errorMessage, setErrorMessage ] = useState('');

  const [ filmsNotFound, setFilmsNotFound ] = useState(false);

  const { values, setValues, isChecked, setIsChecked, handleChange } = useForm();

  async function submitSearchForm({ values, isChecked }) {
    try {
      localStorage.setItem('values', JSON.stringify(values));
      localStorage.setItem('isChecked', JSON.stringify(isChecked));
      setIsLoading(true);
      setFilmsNotFound(false);
      const filmList = await getFilms();
      const result = filmList.filter(item => item.nameRU.toLowerCase().includes(values.name.toLowerCase())
      || item.nameEN.toLowerCase().includes(values.name.toLowerCase()) );
      if(isChecked) {
        const shortFilm = result.filter((film) => film.duration <= shortFilmDuration);
        if(shortFilm.length === 0){
          setFilmsNotFound(true);
        }
        return setSearchResult(shortFilm);
      }
      if(result.length === 0){
        setFilmsNotFound(true);
      }
      return setSearchResult(result);
    }
    catch(err) {
      console.log(err);
      setErrorMessage(err);
      console.error(err);
      return err;
    }
    finally{
      setIsLoading(false);
    }
  }

  function clearError() {
    setErrorMessage('');
  }

  async function getSavedFilms() {
    let films = await getUserFilms();
    if(films) {
      setSavedFilmsId(films.map(item => item.movieNumber));
    }
  }

  useEffect(() => {
    getSavedFilms();
    if(localStorage.movies){
      let movies = JSON.parse( localStorage.movies );
      setSearchResult(movies);
    }
    if(localStorage.values){
      let fieldValues = JSON.parse(localStorage.values);
      setValues(fieldValues);
    }
    if(localStorage.isChecked){
      let checked = JSON.parse(localStorage.isChecked);
      setIsChecked(checked);
    }
  }, [])

  useEffect(() => {
    if(searchResult && values.name && !filmsNotFound) {
      submitSearchForm({ values, isChecked })
    }
  }, [isChecked])

  useEffect(() => {
    if(searchResult){
      localStorage.setItem('movies', JSON.stringify(searchResult));
    }
  }, [searchResult])

  return { isLoading, searchResult, savedFilmsId, errorMessage,
    filmsNotFound, values, submitSearchForm, isChecked, setIsChecked,
    handleChange, clearError, setErrorMessage }
}

