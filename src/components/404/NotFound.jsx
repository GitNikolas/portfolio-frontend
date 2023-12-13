import { React } from 'react';
import { Link } from 'react-router-dom';
import './not-found.css';

function NotFound() {

  return (
    <section className='not-found'>
      <h2
      className='not-found__title'
      >404</h2>
      <p
      className='not-found__subtitle'
      >Страница не найдена</p>

      <Link
      to='/'
      className='link not-found__link'
      >
      Назад
      </Link>
    </section>
  );
}

export default NotFound;
