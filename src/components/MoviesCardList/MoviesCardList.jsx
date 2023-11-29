import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './movies__card-list.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreButton from '../UI/More-button/MoreButton';
import { deleteFilm } from '../../utils/MainApi';
import InfoTooltip from '../Popups/InfoTooltip/InfoTooltip';
import { desktopSize, tabSize, mobileSize, zeroSize, desktopSizeIncrement,
tabSizeIncrement, mobileSizeIncrement, zeroSizeIncrement, desktopDefaultCards,
tabDefaultCards, mobileDefaultCards, zeroSizeDefaultCards } from '../../utils/constants';

function MoviesCardList({ movieData, savedMovieData, setMovieData }) {
  let location = useLocation();

  const [ amountCards, setAmountCards ] = useState(0);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [serverError, setServerError] = useState('');

  function getMoreCards() {
    if(screenWidth >= desktopSize) {
      setAmountCards(amountCards + desktopSizeIncrement)
    }
    else if(screenWidth >= tabSize) {
      setAmountCards(amountCards + tabSizeIncrement)
    }
    else if(screenWidth >= mobileSize){
      setAmountCards(amountCards + mobileSizeIncrement)
    }
    else if(screenWidth >= zeroSize){
      setAmountCards(amountCards + zeroSizeIncrement)
    }
  }

  async function handleCardDelete(cardId) {
    try{
      let response = await deleteFilm(cardId);
      if(response.ok){
        setMovieData((state) => state.filter(item => item.movieId !== cardId));
      }
      else {
        throw new Error('Произошла ошибка, попробуйте выполнить запрос позже')
      }
    }
    catch(err){
      console.error(err.message);
      setServerError(err.message);
      return err;
    }
  }

  useEffect(() => {
    if(location.pathname === '/movies'){
      function handleResize (event) {
        setScreenWidth(event.target.innerWidth);
      }
      setAmountCards(0);
      if(screenWidth >= desktopSize) {
        setAmountCards(desktopDefaultCards)
      }
      else if(screenWidth >= tabSize) {
        setAmountCards(tabDefaultCards)
      }
      else if(screenWidth >= mobileSize){
        setAmountCards(mobileDefaultCards)
      }
      else if(screenWidth >= zeroSize){
        setAmountCards(zeroSizeDefaultCards)
      }
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }
    else {
      setAmountCards(Infinity);
    }

  }, [screenWidth, movieData])

  return (
    <>
      {serverError && <InfoTooltip
      serverError={serverError}
      setServerError={setServerError}/>}

      <ul className='movies__card-list list-style'>
        {movieData && movieData.slice(0, amountCards).map(item =>
          <MoviesCard
            data={item}
            key={item.id || item.movieId}
            savedMovieData={savedMovieData}
            handleCardDelete={handleCardDelete}
          />)}

      </ul>
      {movieData && (amountCards && location.pathname === '/movies') && amountCards < movieData.length && <MoreButton onClick={getMoreCards} />}
    </>
  );
}

export default MoviesCardList;
