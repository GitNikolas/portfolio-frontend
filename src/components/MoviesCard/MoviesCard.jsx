import { React, useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './movies-card.css'
import { postFilm, deleteFilm } from '../../utils/MainApi';
import { shortFilmDuration }  from '../../utils/constants';

function MoviesCard({ data, savedMovieData, handleCardDelete }) {

  const [isLiked, setIsLiked] = useState(false);

  let location = useLocation();

  function toggleLike() {
    if(isLiked) {
      setIsLiked(!isLiked);
      return deleteFilm(data.id);
    }
    setIsLiked(!isLiked);
    return postFilm(data);
  }

  function handleDeleteFilm() {
    if(data.id){
      return handleCardDelete(data.id)
    }
    else{
      return handleCardDelete(data.movieId)
    }
  }

  function checkIsLiked() {
    let check = savedMovieData.some(item => item === data.id);
    setIsLiked(check);
  }

  useEffect(() => {
    if(savedMovieData){
      checkIsLiked();
    }
  }, [savedMovieData])

  return (
    <li
    className='movies-card'
    >
      <Link
      to={data.trailerLink}
      target='_blank'
      >
        <img
        className='movies-card__image'
        src={data.image.url ? `https://api.nomoreparties.co/${data.image.url}` : `${data.image}`}
        alt='фотография'
        />
      </Link>

      <div
      className='movies-card__caption'
      >
      <p
      className='movies-card__subtitle'
      >{data.nameRU}</p>

      { location.pathname === '/movies' && <button
      className={`movies-card__like ${ isLiked ? 'movies-card__like_active' : '' }`}
      onClick={toggleLike}
      ></button>}

      { location.pathname === '/saved-movies' && <button
      className={`movies-card__delete`}
      onClick={handleDeleteFilm}
      ></button>}
      </div>

      <p
      className='movies-card__duration'
      >{ data.duration > shortFilmDuration ?  `${Math.round(data.duration/60)}ч ${data.duration%60}м` : `${data.duration%60}м`}</p>
    </li>
  );
}

export default MoviesCard;
